import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getItems, createMeal } from "@/services";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState, useCallback } from "react";
import { Item } from "@/types"; // Assuming you have a types file
import { useNavigate } from "react-router-dom";

const mealSchema = z.object({
  dayOfWeek: z.string(),
  itemIds: z.array(z.number()),
});

type MealFormValues = z.infer<typeof mealSchema>;

const mealDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
] as const;
type MealDay = (typeof mealDays)[number];

export default function SaveMeals() {
  const queryClient = useQueryClient();
  const [selectedDay, setSelectedDay] = useState<MealDay>(mealDays[0]);
  const navigate = useNavigate();

  const {
    data: itemsData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  const createMealMutation = useMutation({
    mutationFn: createMeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meals"] });
      form.reset(); // Reset form after successful submission
    },
    onError: (error) => {
      console.error("Failed to create meal:", error);
      // TODO: Implement proper error handling (e.g., show error message to user)
    },
  });

  const form = useForm<MealFormValues>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      dayOfWeek: selectedDay,
      itemIds: [],
    },
  });

  const handleDayChange = useCallback(
    (day: MealDay) => {
      setSelectedDay(day);
      form.setValue("dayOfWeek", day);
      form.setValue("itemIds", []);
    },
    [form]
  );

  const onSubmit = useCallback(
    (values: MealFormValues) => {
      if (values.itemIds.length > 3) {
        createMealMutation.mutate(values);
        navigate("/meals");
      }
    },
    [createMealMutation, navigate]
  );

  if (isPending) return <div className="text-center py-8">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-8 text-red-500">Error loading items</div>
    );

  return (
    <main className="flex-1">
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Meal Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Meal Schedule</h2>
            <div className="grid grid-cols-5 gap-4">
              {mealDays.map((day) => (
                <Button
                  key={day}
                  variant={selectedDay === day ? "default" : "outline"}
                  onClick={() => handleDayChange(day)}
                  className="w-full"
                >
                  {day}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">{selectedDay} Meal</h2>
            <Card>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent>
                    {itemsData?.map((item: Item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="itemIds"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 my-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(Number(item.id))}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...field.value, item.id]
                                    : field.value?.filter(
                                        (value) => value !== Number(item.id)
                                      );
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <Label htmlFor={String(item.id)}>
                                {item.name} - {item.category}
                              </Label>
                            </div>
                          </FormItem>
                        )}
                      />
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="ml-auto"
                      disabled={createMealMutation.isPending}
                    >
                      {createMealMutation.isPending ? "Saving..." : "Save Meal"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
