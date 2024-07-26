import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMeals, deleteMeal } from "@/services";
import { TrashIcon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Meals() {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { toast } = useToast();

  const {
    data: mealsData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["meals"],
    queryFn: getMeals,
  });

  const deleteMealMutation = useMutation({
    mutationFn: (id: number) => deleteMeal(id),
    onMutate: (mealId: number) => {
      setDeleteId(mealId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meals"] });
      toast({
        title: "Meal deleted",
        description: "The meal has been successfully deleted.",
      });
    },
    onError: (error) => {
      console.error("Failed to delete meal:", error);
      toast({
        title: "Error",
        description: "Failed to delete the meal. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setDeleteId(null);
    },
  });

  const handleDelete = useCallback(
    (mealId: number) => {
      if (window.confirm("Are you sure you want to delete this meal?")) {
        deleteMealMutation.mutate(mealId);
      }
    },
    [deleteMealMutation]
  );

  const getCategoryVariant = useCallback(
    (category: string): "default" | "secondary" | "destructive" | "outline" => {
      switch (category.toUpperCase()) {
        case "PROTEIN":
          return "secondary";
        case "VEGETABLE":
          return "default";
        case "STARCH":
          return "destructive";
        default:
          return "outline";
      }
    },
    []
  );

  if (isPending) return <LoadingSpinner className="w-12 h-12" />;

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading meals. Please try again later.
      </div>
    );
  }

  return (
    <main className="flex-1">
      <section className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Meal Management</h1>
          <Link to="/add-meal">
            <Button>Add Meal</Button>
          </Link>
        </div>
        {mealsData && mealsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mealsData.map((meal) => (
              <Card key={meal.id}>
                <CardHeader>
                  <CardTitle>
                    {meal.dayOfWeek.charAt(0).toUpperCase() +
                      meal.dayOfWeek.slice(1).toLowerCase()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {meal.mealItems.map((mealItem) => (
                      <li
                        key={mealItem.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {mealItem.item.name}
                          </span>
                          <Badge
                            variant={getCategoryVariant(mealItem.item.category)}
                          >
                            {mealItem.item.category.toLowerCase()}
                          </Badge>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto"
                    onClick={() => handleDelete(meal.id)}
                    disabled={deleteId === meal.id}
                  >
                    {deleteId === meal.id ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <TrashIcon className="h-5 w-5" />
                    )}
                    <span className="sr-only">
                      {deleteId === meal.id
                        ? "Deleting Meal..."
                        : "Delete Meal"}
                    </span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            No meals found. Add a meal to get started.
          </div>
        )}
      </section>
    </main>
  );
}
