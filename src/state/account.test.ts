import { assertEquals, assertThrows } from "@std/assert";
import { Account } from "./account.ts";

Deno.test("Init", () => {
  const account = new Account(100);
  assertEquals(account.balance, 100);
});

Deno.test("Spend sufficient funds", () => {
  const account = new Account(100);
  account.spend(50);
  assertEquals(account.balance, 50);
});

Deno.test("Spend insufficient funds", () => {
  const account = new Account(50);
  assertThrows(() => account.spend(100), "Insufficient funds");
});

Deno.test("Spend negative amount", () => {
  const account = new Account(100);
  assertThrows(() => account.spend(-10), "Spend amount must be positive");
});

Deno.test("Add positive income", () => {
  const account = new Account(100);
  account.addIncome(50);
  assertEquals(account.balance, 150);
});

Deno.test("Add negative income", () => {
  const account = new Account(100);
  assertThrows(() => account.addIncome(-10), "Income amount must be positive");
});

Deno.test("Journal records purchase", () => {
  const account = new Account(100);
  account.spend(25);
  const journal = account.getJournal();
  assertEquals(journal.length, 1);
  assertEquals(journal[0].type, "purchase");
  assertEquals(journal[0].amount, 25);
});

Deno.test("Journal records income", () => {
  const account = new Account(100);
  account.addIncome(25);
  const journal = account.getJournal();
  assertEquals(journal.length, 1);
  assertEquals(journal[0].type, "income");
  assertEquals(journal[0].amount, 25);
});

Deno.test("Multiple transactions", () => {
  const account = new Account(100);
  account.spend(20);
  account.addIncome(15);
  account.spend(10);
  const journal = account.getJournal();
  assertEquals(journal.length, 3);
  assertEquals(journal[0].type, "purchase");
  assertEquals(journal[0].amount, 20);
  assertEquals(journal[1].type, "income");
  assertEquals(journal[1].amount, 15);
  assertEquals(journal[2].type, "purchase");
  assertEquals(journal[2].amount, 10);
  assertEquals(account.balance, 85);
});
