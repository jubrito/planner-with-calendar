import { ObjectType } from "../types/calendar/types";

export const isObject = (obj: unknown): obj is ObjectType => {
  if (typeof obj != "object" || typeof obj === null || obj == null)
    return false;

  // Ensure it is plain object, not subclass such ass Array and Date
  const prototype = Object.getPrototypeOf(obj);
  if (prototype !== Object.prototype) return false;

  for (const key in obj) {
    if (typeof key !== "string") return false;
  }

  return true;
};
