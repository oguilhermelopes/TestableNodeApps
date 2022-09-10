import { expect, test } from "vitest";
import { getFutureDate } from "./get_future_date";

test('increase date with one year', () => {
  const year = new Date().getFullYear()
  expect(getFutureDate(`${year}-08-12`).getFullYear()).toEqual(2023)
})