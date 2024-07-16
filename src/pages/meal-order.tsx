import { useState, useMemo, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  createMealSchedule,
  getMealSchedules,
  getMeals,
  updateMealSchedule,
  deleteMealSchedule,
} from "@/services";
import {
  format,
  isBefore,
  startOfDay,
  endOfMonth,
  eachDayOfInterval,
  formatISO,
  parseISO,
  isSameDay,
} from "date-fns";
import { MealSchedule, Meal, DayOfWeek } from "@/types";

export default function MealOrder() {
  const [selectedDate, setSelectedDate] = useState(() =>
    formatISO(startOfDay(new Date()))
  );
  const queryClient = useQueryClient();

  // Queries
  const { data: meals = [], isLoading: isLoadingMeals } = useQuery<Meal[]>({
    queryKey: ["meals"],
    queryFn: getMeals,
  });

  const { data: mealSchedules = [], isLoading: isLoadingSchedules } = useQuery<
    MealSchedule[]
  >({
    queryKey: ["mealSchedules"],
    queryFn: getMealSchedules,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createMealSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mealSchedules"] });
    },
    onError: () => {},
  });

  const updateMutation = useMutation({
    mutationFn: updateMealSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mealSchedules"] });
    },
    onError: () => {},
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMealSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mealSchedules"] });
    },
    onError: () => {},
  });

  // Memoized values
  const mealPlan = useMemo(() => {
    return mealSchedules?.reduce((acc, schedule) => {
      const startDate = parseISO(schedule.startDate);
      const endDate = parseISO(schedule.endDate);
      const days = eachDayOfInterval({ start: startDate, end: endDate });
      days.forEach((day) => {
        acc[formatISO(startOfDay(day))] = schedule.mealId;
      });
      return acc;
    }, {} as Record<string, number>);
  }, [mealSchedules]);

  const getMealDescription = useCallback(
    (mealId: number) => {
      const meal = meals.find((m) => m.id === mealId);
      if (!meal) return "No Meal";
      return meal.mealItems.map((mealItem) => mealItem.item.name).join(", ");
    },
    [meals]
  );

  // Event handlers
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(formatISO(startOfDay(date)));
    }
  };

  const handleMealChange = (mealId: string) => {
    const today = startOfDay(new Date());
    const selectedDateObj = parseISO(selectedDate);

    if (isBefore(selectedDateObj, today)) {
      return;
    }

    const existingSchedule = mealSchedules.find(
      (schedule) =>
        isSameDay(parseISO(schedule.startDate), selectedDateObj) ||
        isSameDay(parseISO(schedule.endDate), selectedDateObj) ||
        (parseISO(schedule.startDate) <= selectedDateObj &&
          parseISO(schedule.endDate) >= selectedDateObj)
    );

    if (existingSchedule) {
      if (mealId === "No Meal") {
        deleteMutation.mutate(existingSchedule.id);
      } else {
        updateMutation.mutate({
          id: existingSchedule.id,
          mealId: Number(mealId),
          startDate: selectedDate,
          endDate: selectedDate,
        });
      }
    } else if (mealId !== "No Meal") {
      createMutation.mutate({
        mealId: Number(mealId),
        startDate: selectedDate,
        endDate: selectedDate,
      });
    }
  };

  const handleScheduleMonth = async () => {
    const startDate = parseISO(selectedDate);
    const endDate = endOfMonth(startDate);

    try {
      const daysOfWeek = Object.values(DayOfWeek);
      const schedules = daysOfWeek
        .map((day) => {
          const meal = meals.find((m) => m.dayOfWeek === day);
          return meal
            ? {
                mealId: meal.id,
                startDate: formatISO(startDate),
                endDate: formatISO(endDate),
              }
            : null;
        })
        .filter(
          (schedule): schedule is NonNullable<typeof schedule> =>
            schedule !== null
        );

      await Promise.all(
        schedules.map((schedule) => createMutation.mutateAsync(schedule))
      );
    } catch (error) {
      console.error("Error scheduling month:", error);
    }
  };

  if (isLoadingMeals || isLoadingSchedules) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex-1">
      <div className="max-w-4xl mx-auto p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Weekly Meal Schedule</h1>
          <Button variant="outline" onClick={handleScheduleMonth}>
            Schedule Meals for Month
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Calendar
              mode="single"
              selected={parseISO(selectedDate)}
              onSelect={handleDateChange}
              className="rounded-lg shadow-lg"
              modifiers={{
                booked: (date) =>
                  mealPlan[formatISO(startOfDay(date))] !== undefined,
              }}
              modifiersStyles={{
                booked: { fontWeight: "bold", textDecoration: "underline" },
              }}
            />
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>
                  Meal for {format(parseISO(selectedDate), "MMMM d, yyyy")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={mealPlan[selectedDate]?.toString() ?? "No Meal"}
                  onValueChange={handleMealChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="No Meal">No Meal</SelectItem>
                    {meals.map((meal) => (
                      <SelectItem key={meal.id} value={meal.id.toString()}>
                        {meal.dayOfWeek}: {getMealDescription(meal.id)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
