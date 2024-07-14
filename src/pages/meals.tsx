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
import { TrashIcon } from "lucide-react";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";

export default function Meals() {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

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
      setIsDeleting(mealId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meals"] });
    },
    onError: (error) => {
      console.error("Failed to delete meal:", error);
      // TODO: Implement proper error handling (e.g., show error message to user)
    },
    onSettled: () => {
      setIsDeleting(null);
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

  if (isPending) {
    return <div className="text-center py-8">Loading meals...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">Error loading meals</div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mealsData?.map((meal) => (
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
                  disabled={String(isDeleting) === String(meal.id)}
                >
                  <TrashIcon className="h-5 w-5" />
                  <span className="sr-only">
                    {isDeleting === meal.id
                      ? "Deleting Meal..."
                      : "Delete Meal"}
                  </span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
