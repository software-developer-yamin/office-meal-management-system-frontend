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

export type Item = {
  id: string;
  name: string;
  category: "PROTEIN" | "STARCH" | "VEGETABLE" | "OTHER"
};

export type Meal = {
  id: number;
  dayOfWeek: DayOfWeek;
  createdAt: string;
  updatedAt: string;
  mealItems: MealItem[];
}

export enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
}

export type MealItem = {
  id: number;
  mealId: number;
  itemId: number;
  item: Item;
}

export type MealOrder = {
  id: string
  userId: string
  mealId: string
  date: string
}