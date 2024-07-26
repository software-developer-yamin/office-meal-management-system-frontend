import { getMealSchedules } from "@/services";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format, isEqual, parseISO } from "date-fns";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";

function formatDateRange(startDate: string, endDate: string) {
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  if (isEqual(start, end)) {
    return format(start, "MMMM d, yyyy");
  }

  if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    return `${format(start, "MMMM d")} - ${format(end, "d, yyyy")}`;
  }

  if (start.getFullYear() === end.getFullYear()) {
    return `${format(start, "MMMM d")} - ${format(end, "MMMM d, yyyy")}`;
  }

  return `${format(start, "MMMM d, yyyy")} - ${format(end, "MMMM d, yyyy")}`;
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-[200px]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ErrorDisplay({ error }: { error: Error }) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load meal schedules: {error.message}
        </AlertDescription>
      </Alert>
    </div>
  );
}

function NoDataDisplay() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            No meal schedules found.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function MealSchedule() {
  const {
    data: mealSchedules,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mealSchedules"],
    queryFn: () => getMealSchedules(),
  });

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay error={error} />;
  if (!mealSchedules || mealSchedules.length === 0) return <NoDataDisplay />;

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Meal Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Date</TableHead>
                    <TableHead className="w-[100px]">Day</TableHead>
                    <TableHead>Meal Items</TableHead>
                    <TableHead className="w-[200px]">User</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mealSchedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">
                        {formatDateRange(schedule.startDate, schedule.endDate)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {schedule.meal.dayOfWeek}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {schedule.meal.mealItems.map((item) => (
                            <Badge key={item.id} variant="outline">
                              {item.item.name}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{schedule.user.name || "N/A"}</p>
                          <p className="text-muted-foreground">
                            {schedule.user.email}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
