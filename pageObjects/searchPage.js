const { expect } = require("@playwright/test");
const fs = require("fs");
const basePage = "https://ananas.rs/";
const filePath = "Search-results.log";

export class SearchPage {
  agreeButton(page) {
    return page.getByRole("button", { name: "Slažem se" });
  }

  searhField(page) {
    return page.getByPlaceholder("Unesi pojam za pretragu...");
  }

  searchButton(page) {
    return page.getByLabel("Search");
  }

  nextButton(page) {
    return page.getByLabel("Next");
  }

  async waitForAgreeButtonToDisapear(page) {
    expect (
      this.agreeButton(page)).not.toBeVisible();
  }

  logToFile(message) {
    fs.appendFileSync(filePath, message + "\n", (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      }
    });
    console.log(message);
  }

  async navigateToBasePage(page) {
    await page.goto(basePage);
  }

  deleteFileIfExists() {
    try {
      fs.unlinkSync(filePath);
      console.log('File deleted successfully');
  } catch (err) {
      console.error('Error deleting the file:', err);
  }
  }

}
export const searchPage = new SearchPage();