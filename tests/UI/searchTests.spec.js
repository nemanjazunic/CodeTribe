import { test, expect } from "@playwright/test";
import { searchPage } from "../../pageObjects/searchPage";

const keyword = "Lenovo";

test.describe("Search By Keyword UI Test Suite", () => {

test.beforeEach(async ({ page }) => {
  searchPage.navigateToBasePage(page);
  searchPage.agreeButton(page).click();

  expect(
    searchPage.waitForAgreeButtonToDisapear(page));
});

test("assertSearchResults", async ({ page }) => {
  searchPage.deleteFileIfExists();

  await searchPage.searhField(page).fill(keyword);
  await searchPage.searchButton(page).click();

  for (let pageNum = 1; pageNum <= 3; pageNum++) {
    searchPage.logToFile(`--- Checking page ${pageNum} ---`);

    await page.waitForSelector(".ais-Hits-item");

    const products = await page.$$(".ais-Hits-item");    

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const title = await product.$eval("h3", (el) => el.textContent.trim());

      expect(title).toBeTruthy();
      expect(title.toLowerCase()).toContain(keyword.toLowerCase());
     
      //onSearchPage.logToFile(`Product ${i + 1} Title: ${title}`);

      const price = await product.$eval(".sc-1arj7wv-2.iWtCrL", (el) =>
        el.textContent.trim()
      );

      expect(price).toBeTruthy();

      searchPage.logToFile(`Product ${i + 1} Price: ${price}`);

      const image = await page.$(`img[alt*=${keyword}]`);

      expect(image).toBeTruthy();

    }
    await searchPage.nextButton(page).click();
  }
})
});
