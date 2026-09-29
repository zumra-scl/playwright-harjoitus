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

test("tyhjää tehtävää ei voi lisätä", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page
    .getByRole("button", {
      name: "Lisää",
    })
    .click();

  await expect(page.getByText("Tehtävä ei voi olla tyhjä.")).toBeVisible();
});

test("käyttäjä voi lisätä kolme tehtävää", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const taskInput = page.getByLabel("Uusi tehtävä");

  await taskInput.fill("Opiskele JavaScriptia");
  await page
    .getByRole("button", {
      name: "Lisää",
    })
    .click();

  await taskInput.fill("Opiskele Node.js:ää");
  await page
    .getByRole("button", {
      name: "Lisää",
    })
    .click();

  await taskInput.fill("Opiskele Playwrightia");
  await page
    .getByRole("button", {
      name: "Lisää",
    })
    .click();

  await expect(page.getByText("Opiskele JavaScriptia")).toBeVisible();

  await expect(page.getByText("Opiskele Node.js:ää")).toBeVisible();

  await expect(page.getByText("Opiskele Playwrightia")).toBeVisible();

  const tasks = page.locator("#task-list li");

  await expect(tasks).toHaveCount(3);
});