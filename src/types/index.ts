export type User = {
  id: number;
  email: string;
  name: string | null;
  role: "USER" | "ADMIN";
  isBanned: boolean;
  isEmailVerified?: boolean;
  password?: string;
};

export type Token = {
  token: string;
  expires: string;
};

export type Tokens = {
  access: Token;
  refresh: Token;
};

export type MealOrder = {
  id: string;
  userId: string;
  mealId: string;
  date: string;
};

export type MealSchedule = {
  id: number;
  mealId: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  meal: Meal;
  user: { name: string; email: string; id: number };
};

export type Meal = {
  id: number;
  dayOfWeek: DayOfWeek;
  createdAt: string;
  updatedAt: string;
  mealItems: MealItem[];
};

export type MealItem = {
  id: number;
  mealId: number;
  itemId: number;
  item: Item;
};

export type Item = {
  id: number;
  name: string;
  category: "PROTEIN" | "STARCH" | "VEGETABLE" | "OTHER";
  createdAt: string;
  updatedAt: string;
};

export enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
}
