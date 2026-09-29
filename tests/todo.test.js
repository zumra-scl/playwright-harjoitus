const { test, expect } = require("@playwright/test");
test("sivulla näkyy otsikko", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(
    page.getByRole("heading", {
      name: "Tehtävälista",
    }),
  ).toBeVisible();
});
test("lomakekenttä tyhjennetään tehtävän lisäämisen jälkeen", async ({
  page,
}) => {
  await page.goto("http://localhost:3000");

  const taskInput = page.getByLabel("Uusi tehtävä");

  await taskInput.fill("Osta kahvia");

  await page
    .getByRole("button", {
      name: "Lisää",
    })
    .click();

  await expect(taskInput).toHaveValue("");
});