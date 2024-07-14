import { Item, Meal, MealOrder, User } from "@/types";
import api from "./api";

export const register = (credentials: { email: string; password: string }) =>
  api.post("/auth/register", credentials);

export const login = (credentials: { email: string; password: string }) =>
  api.post("/auth/login", credentials);

export const createUser = (data: Omit<User, "id" | "isEmailVerified">) =>
  api.post<User>("/users", data).then((res) => res.data);

export const getUsers = () => api.get<User[]>("/users").then((res) => res.data);

export const getUser = (id: number) =>
  api.get<User>(`/users/${id}`).then((res) => res.data);

export const updateUser = (data: Partial<User>) =>
  api.patch<User>(`/users/${data.id}`, data).then((res) => res.data);

export const deleteUser = (id: string) =>
  api.delete(`/users/${id}`).then((res) => res.data);

export const getItems = () => api.get<Item[]>("/items").then((res) => res.data);

export const createItem = (data: Omit<Item, "id">) =>
  api.post<Item>("/items", data).then((res) => res.data);

export const updateItem = (data: Partial<Item>) =>
  api.patch<Item>(`/items/${data.id}`, data).then((res) => res.data);

export const deleteItem = (id: string) =>
  api.delete(`/items/${id}`).then((res) => res.data);

export const getMeals = () => api.get<Meal[]>("/meals").then((res) => res.data);

export const createMeal = (data: { dayOfWeek: string; itemIds: number[] }) =>
  api
    .post("/meals", { ...data, dayOfWeek: data.dayOfWeek.toUpperCase() })
    .then((res) => res.data);

export const updateMeal = (id: string, data: unknown) =>
  api.put(`/meals/${id}`, data).then((res) => res.data);

export const deleteMeal = (id: number) =>
  api.delete(`/meals/${id}`).then((res) => res.data);

export const getMealOrders = () =>
  api.get<MealOrder[]>("/meal-orders").then((res) => res.data);

export const createMealOrder = (orderData: Partial<MealOrder>) =>
  api.post<MealOrder>("/meal-orders", orderData).then((res) => res.data);

export const updateMealOrder = (id: string, orderData: Partial<MealOrder>) =>
  api.put<MealOrder>(`/meal-orders/${id}`, orderData).then((res) => res.data);

export const deleteMealOrder = (id: string) =>
  api.delete(`/meal-orders/${id}`).then((res) => res.data);
