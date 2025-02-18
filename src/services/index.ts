import { Item, Meal, MealOrder, MealSchedule, User } from "@/types";
import api from "./api";
import axios from "axios";

export const register = (credentials: { email: string; password: string }) =>
  axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
    credentials,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(res => res.data);

export const login = (credentials: { email: string; password: string }) =>
  axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.data);

export const createUser = (data: Omit<User, "id" | "isEmailVerified">) =>
  api.post<User>("/users", data).then((res) => res.data);

export const getUsers = () => api.get<User[]>("/users").then((res) => res.data);

export const getUser = (id: number) =>
  api.get<User>(`/users/${id}`).then((res) => res.data);

export const updateUser = (data: Partial<User>) =>
  api
    .patch<User>(`/users/${data.id}`, {
      name: data.name ?? null,
      email: data.email,
      role: data.role,
      isBanned: data.isBanned,
      isEmailVerified: data.isEmailVerified,
      password: data.password,
    })
    .then((res) => res.data);

export const deleteUser = (id: number) =>
  api.delete(`/users/${id}`).then((res) => res.data);

export const getItems = () =>
  api.get<Item[]>("/items?limit=20").then((res) => res.data);

export const createItem = (
  data: Omit<Item, "id" | "createdAt" | "updatedAt">
) => api.post<Item>("/items", data).then((res) => res.data);

export const updateItem = (data: Partial<Item>) =>
  api
    .patch<Item>(`/items/${data.id}`, {
      name: data.name,
      category: data.category,
    })
    .then((res) => res.data);

export const deleteItem = (id: number) =>
  api.delete(`/items/${id}`).then((res) => res.data);

export const getMeals = () => api.get<Meal[]>("/meals").then((res) => res.data);

export const createMeal = (data: { dayOfWeek: string; itemIds: number[] }) =>
  api
    .post("/meals", { ...data, dayOfWeek: data.dayOfWeek.toUpperCase() })
    .then((res) => res.data);

export const updateMeal = (id: number, data: unknown) =>
  api.put(`/meals/${id}`, data).then((res) => res.data);

export const deleteMeal = (id: number) =>
  api.delete(`/meals/${id}`).then((res) => res.data);

export const getMealOrders = () =>
  api.get<MealOrder[]>("/meal-orders").then((res) => res.data);

export const createMealOrder = (orderData: Partial<MealOrder>) =>
  api.post<MealOrder>("/meal-orders", orderData).then((res) => res.data);

export const updateMealOrder = (data: Partial<MealOrder>) =>
  api
    .patch<MealOrder>(`/meal-orders/${data.id}`, {
      userId: data.userId,
      mealId: data.mealId,
      date: data.date,
    })
    .then((res) => res.data);

export const deleteMealOrder = (id: string) =>
  api.delete(`/meal-orders/${id}`).then((res) => res.data);

export const getMealSchedules = (id?: number) =>
  api
    .get<MealSchedule[]>(
      id ? `/meal-schedules?userId=${id}` : `/meal-schedules`
    )
    .then((res) => res.data);

export const createMealSchedule = (
  data: Omit<MealSchedule, "id" | "createdAt" | "updatedAt" | "meal" | "user">
) => api.post<MealSchedule>("/meal-schedules", data).then((res) => res.data);

export const updateMealSchedule = (data: Partial<MealSchedule>) =>
  api
    .patch<MealSchedule>(`/meal-schedules/${data.id}`, {
      mealId: data.mealId,
      startDate: data.startDate,
      endDate: data.endDate,
    })
    .then((res) => res.data);

export const deleteMealSchedule = (id: number) =>
  api.delete(`/meal-schedules/${id}`).then((res) => res.data);
