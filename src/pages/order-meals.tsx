// "use client";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

// export default function MealPlanComponent() {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [mealPlan, setMealPlan] = useState({});

//   useEffect(() => {
//     // Load initial meal plan data (you might want to fetch this from an API)
//     const initialMealPlan = {
//       "2024-07-13": "Chicken Salad",
//       "2024-07-14": "Beef Stir-Fry",
//       "2024-07-15": "No Meal",
//       "2024-07-16": "Vegetable Curry",
//       "2024-07-17": "Grilled Salmon",
//       "2024-07-18": "Pasta Primavera",
//       "2024-07-19": "Chicken Teriyaki",
//     };
//     setMealPlan(initialMealPlan);
//   }, []);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const handleMealChange = (date, meal) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     if (date < today) {
//       return;
//     }

//     setMealPlan((prevPlan) => ({
//       ...prevPlan,
//       [date.toISOString().slice(0, 10)]: meal,
//     }));
//   };

//   const handleScheduleMonth = () => {
//     const currentMonth = selectedDate.getMonth();
//     const currentYear = selectedDate.getFullYear();
//     const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
//     const newPlan = { ...mealPlan };

//     for (let i = 1; i <= daysInMonth; i++) {
//       const date = new Date(currentYear, currentMonth, i);
//       const dateString = date.toISOString().slice(0, 10);
//       if (!newPlan[dateString]) {
//         newPlan[dateString] = "No Meal";
//       }
//     }

//     setMealPlan(newPlan);
//   };

//   const mealOptions = [
//     "No Meal",
//     "Chicken Salad",
//     "Beef Stir-Fry",
//     "Vegetable Curry",
//     "Grilled Salmon",
//     "Pasta Primavera",
//     "Chicken Teriyaki",
//   ];

//   return (
//     <div className="max-w-4xl mx-auto p-6 sm:p-8">
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold">Weekly Meal Plan</h1>
//         <Button variant="outline" onClick={handleScheduleMonth}>
//           Schedule Meals for Month
//         </Button>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <Calendar
//             mode="single"
//             selected={selectedDate}
//             onSelect={handleDateChange}
//             className="rounded-lg shadow-lg"
//             modifiers={{
//               booked: (date) =>
//                 mealPlan[date.toISOString().slice(0, 10)] !== undefined,
//             }}
//             modifiersStyles={{
//               booked: { fontWeight: "bold", textDecoration: "underline" },
//             }}
//           />
//         </div>
//         <div>
//           <Card>
//             <CardHeader>
//               <CardTitle>
//                 Meal for {selectedDate.toLocaleDateString()}
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Select
//                 value={
//                   mealPlan[selectedDate.toISOString().slice(0, 10)] || "No Meal"
//                 }
//                 onValueChange={(value) => handleMealChange(selectedDate, value)}
//               >
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {mealOptions.map((meal) => (
//                     <SelectItem key={meal} value={meal}>
//                       {meal}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/components/MealOrderPage.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { getMealOrders, getMeals } from "@/services";

// const API_URL = import.meta.env.BASE_URL;

// const fetchMeals = async () => {
//   const response = await axios.get(`${API_URL}/meals`);
//   return response.data;
// };

// const fetchMealOrders = async (userId) => {
//   const response = await axios.get(`${API_URL}/meal-orders`, {
//     params: { userId },
//   });
//   return response.data.results;
// };

// const createMealOrder = async ({ userId, mealId, date }) => {
//   const response = await axios.post(`${API_URL}/meal-orders`, {
//     userId,
//     mealId,
//     date,
//   });
//   return response.data;
// };

// const updateMealOrder = async ({ id, mealId, date }) => {
//   const response = await axios.patch(`${API_URL}/meal-orders/${id}`, {
//     mealId,
//     date,
//   });
//   return response.data;
// };

// export default function MealOrderPage({ userId }) {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const queryClient = useQueryClient();

//   const { data: meals, isLoading: mealsLoading } = useQuery({
//     queryKey: ["meals"],
//     queryFn: getMeals,
//   });
//   const { data: mealOrders, isLoading: ordersLoading } = useQuery(
//     queryKey: ["mealOrders"],
//     queryFn: getMealOrders,
//   );

//   const createMutation = useMutation(createMealOrder, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["mealOrders", userId]);
//       toast({ title: "Meal order created successfully" });
//     },
//     onError: (error) => {
//       toast({
//         title: "Error creating meal order",
//         description: error.message,
//         variant: "destructive",
//       });
//     },
//   });

//   const updateMutation = useMutation(updateMealOrder, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["mealOrders", userId]);
//       toast({ title: "Meal order updated successfully" });
//     },
//     onError: (error) => {
//       toast({
//         title: "Error updating meal order",
//         description: error.message,
//         variant: "destructive",
//       });
//     },
//   });

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const handleMealChange = (mealId) => {
//     const dateString = selectedDate.toISOString().split("T")[0];
//     const existingOrder = mealOrders?.find(
//       (order) => order.date === dateString
//     );

//     if (existingOrder) {
//       updateMutation.mutate({ id: existingOrder.id, mealId, date: dateString });
//     } else {
//       createMutation.mutate({ userId, mealId, date: dateString });
//     }
//   };

//   const handleScheduleMonth = () => {
//     const currentMonth = selectedDate.getMonth();
//     const currentYear = selectedDate.getFullYear();
//     const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

//     for (let i = 1; i <= daysInMonth; i++) {
//       const date = new Date(currentYear, currentMonth, i);
//       const dateString = date.toISOString().split("T")[0];
//       const existingOrder = mealOrders?.find(
//         (order) => order.date === dateString
//       );

//       if (!existingOrder) {
//         createMutation.mutate({ userId, mealId: null, date: dateString });
//       }
//     }
//   };

//   if (mealsLoading || ordersLoading) return <div>Loading...</div>;

//   const mealOptions = [{ id: null, name: "No Meal" }, ...meals];

//   const selectedMealOrder = mealOrders?.find(
//     (order) => order.date === selectedDate.toISOString().split("T")[0]
//   );

//   return (
//     <div className="max-w-4xl mx-auto p-6 sm:p-8">
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold">Weekly Meal Plan</h1>
//         <Button variant="outline" onClick={handleScheduleMonth}>
//           Schedule Meals for Month
//         </Button>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <Calendar
//             mode="single"
//             selected={selectedDate}
//             onSelect={handleDateChange}
//             className="rounded-lg shadow-lg"
//             modifiers={{
//               booked: (date) =>
//                 mealOrders?.some(
//                   (order) => order.date === date.toISOString().split("T")[0]
//                 ),
//             }}
//             modifiersStyles={{
//               booked: { fontWeight: "bold", textDecoration: "underline" },
//             }}
//           />
//         </div>
//         <div>
//           <Card>
//             <CardHeader>
//               <CardTitle>
//                 Meal for {selectedDate.toLocaleDateString()}
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Select
//                 value={selectedMealOrder?.mealId?.toString() || ""}
//                 onValueChange={(value) =>
//                   handleMealChange(parseInt(value) || null)
//                 }
//                 disabled={selectedDate < new Date().setHours(0, 0, 0, 0)}
//               >
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {mealOptions.map((meal) => (
//                     <SelectItem key={meal.id} value={meal.id?.toString() || ""}>
//                       {meal.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
