import { Item, Meal, MealOrder, User } from "@/types";
import api from "./api";

export const register = (credentials: { email: string; password: string }) =>
  api.post("/auth/register", credentials);
export const login = (credentials: { email: string; password: string }) =>
  api.post("/auth/login", credentials);

export const createUser = (data: Omit<User, "id" | "isEmailVerified">) =>
  api.post("/users", data).then((res) => res.data);
export const getUsers = () => api.get<User[]>("/users").then((res) => res.data);
export const getUser = (id: number) =>
  api.get<User>(`/users/${id}`).then((res) => res.data);
export const updateUser = (data: User) =>
  api
    .patch<User>(`/users/${data.id}`, {
      name: data.name,
      role: data.role,
      isBanned: data.isBanned,
      email: data.email,
      password: data.password,
    })
    .then((res) => res.data);
export const deleteUser = (id: string) =>
  api.delete(`/users/${id}`).then((res) => res.data);

export const getItems = () => api.get<Item[]>("/items").then((res) => res.data);
export const createItem = (data: Omit<Item, "id">) =>
  api.post<Item>("/items", data).then((res) => res.data);
export const updateItem = (data: Partial<Item>) =>
  api
    .patch<Item>(`/items/${data.id}`, {
      name: data.name,
      category: data.category,
    })
    .then((res) => res.data);
export const deleteItem = (id: string) =>
  api.delete(`/items/${id}`).then((res) => res.data);

export const getMeals = () => api.get<Meal[]>("/meals").then((res) => res.data);
export const createMeal = (data: { dayOfWeek: string; itemIds: number[] }) =>
  api
    .post("/meals", { ...data, dayOfWeek: data.dayOfWeek.toLocaleUpperCase() })
    .then((res) => res.data);
export const updateMeal = (id: string, data: unknown) =>
  api.put(`/meals/${id}`, data);
export const deleteMeal = (id: number) => api.delete(`/meals/${id}`).then((res) => res.data);

export const getMealOrders = () => api.get<MealOrder[]>('/meal-orders').then((res) => res.data)
export const createMealOrder = (orderData: Partial<MealOrder>) => api.post<MealOrder>('/meal-orders', orderData)
export const updateMealOrder = (id: string, orderData: Partial<MealOrder>) => api.put<MealOrder>(`/meal-orders/${id}`, orderData)
export const deleteMealOrder = (id: string) => api.delete(`/meal-orders/${id}`)