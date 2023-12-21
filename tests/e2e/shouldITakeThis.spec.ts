import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.getByLabel("Open Should I take this modal").click();
  await page.locator("#idealHourlyRate").fill("75");
  await page.locator("#gigPayment").click();
  await page.locator("#gigPayment").fill("300");
  await page.locator("#gigHours").click();
  await page.locator("#gigHours").fill("3");
  await page.locator("#mileage").click();
  await page.locator("#mileage").fill("8");
  await page.locator("#babysittingHours").click();
  await page.locator("#babysittingHours").fill("4");
  await page.locator("#babysittingHourlyRate").click();
  await page.locator("#babysittingHourlyRate").fill("15");
  await page.getByLabel("Submit to find out if you").click();
  await page.getByLabel("Click to see more details").click();
  await page.getByLabel("Go back to Home").click();
});

test("has title", async ({ page }) => {
  await page.goto("http://localhost:65411/");
  await page.goto("http://localhost:65411/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Gig-Guider/);
});

test("should I take this button", async ({ page }) => {
  await page.goto("http://localhost:65411/");
  // Click the should I take this button.
  await page.getByLabel("Open Should I take this modal").click();

  // Expects page to have a heading with the name of Should I Take This Gig.
  await expect(
    page.getByRole("heading", { name: "Should I Take This Gig?" })
  ).toBeVisible();
});

test("should I take this fields", async ({ page }) => {
  await page.goto("http://localhost:65411/");
  // Fill the form fields
  console.log("Filling in ideal hourly rate field...");
  await page.locator("#idealHourlyRate").fill("75");

  console.log("Filling in gig payment field...");
  await page.locator("#gigPayment").click();
  await page.locator("#gigPayment").fill("300");

  console.log("Filling in gig hours field...");
  await page.locator("#gigHours").click();
  await page.locator("#gigHours").fill("3");

  console.log("Filling in mileage field...");
  await page.locator("#mileage").click();
  await page.locator("#mileage").fill("8");

  console.log("Filling in babysitting hours field...");
  await page.locator("#babysittingHours").click();
  await page.locator("#babysittingHours").fill("4");

  console.log("Filling in babysitting hourly rate field...");
  await page.locator("#babysittingHourlyRate").click();
  await page.locator("#babysittingHourlyRate").fill("15");

  // Take screenshot of the completed form
  await page.screenshot({ path: "screenshot.png" });
});
