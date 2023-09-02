describe("Post create", () => {
  beforeAll(async () => {
    await Promise.all([
      page.waitForSelector("[data-test=input-email]"),
      page.waitForSelector("[data-test=submit]"),
      page.goto(`${TARGET_PAGE_URL}/login`),
    ]);
    await page.type("[data-test=input-email]", "8@progate.com");
    await page.type("[data-test=input-password]", "password");
    await Promise.all([
      page.waitForSelector("[data-test=header-link-logout]"),
      page.click("[data-test=submit]"),
    ]);
  });
  beforeEach(async () => {
    await Promise.all([
      page.waitForSelector("[data-test=textarea-content]"),
      page.goto(`${TARGET_PAGE_URL}/posts/new`),
    ]);
  });
  describe("submit success", () => {
    test("display post index page and dialog message [um_uej6dYy4jNAOecEUoc]", async () => {
      await page.type("[data-test=textarea-content]", "test content");
      await Promise.all([
        page.waitForSelector("[data-test=posts-container]"),
        page.click("[data-test=submit]"),
      ]);
      const content = await page.$eval("[data-test=posts-container]", el => {
        return (
          el.firstElementChild?.querySelector(
            "[data-test=post-item-content]"
          ) as HTMLElement
        ).innerText.trim();
      });
      const message = await page.$eval("[data-test=dialog]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(page.url()).toBe(`${TARGET_PAGE_URL}/posts`);
      expect(message).toBe("Post successfully created");
      expect(content).toBe("test content");
    });
    test("set default post content from storage", async () => {
      await page.type("[data-test=textarea-content]", "test content");
      await Promise.all([
        page.waitForSelector("[data-test=textarea-content]"),
        page.reload(),
      ]);
      let content = await page.$eval(
        "[data-test=textarea-content]",
        el => (el as HTMLTextAreaElement).value
      );
      expect(content).toBe("test content");
      // focus textarea
      await page.click("[data-test=textarea-content]");
      // clean storage
      while (content.length > 0) {
        await page.keyboard.press("Backspace");
        content = await page.$eval(
          "[data-test=textarea-content]",
          el => (el as HTMLTextAreaElement).value
        );
      }
    });
    test("reset storage after submission", async () => {
      await page.type("[data-test=textarea-content]", "test content");
      await Promise.all([
        page.waitForSelector("[data-test=posts-container]"),
        page.click("[data-test=submit]"),
      ]);
      await Promise.all([
        page.waitForSelector("[data-test=textarea-content]"),
        page.goto(`${TARGET_PAGE_URL}/posts/new`),
      ]);
      const content = await page.$eval(
        "[data-test=textarea-content]",
        el => (el as HTMLTextAreaElement).value
      );
      expect(content).toBe("");
    });
  });
  describe("submit failed", () => {
    test("display empty error message [ug76mtRMLDv30YJ_HdH87]", async () => {
      let inputValue = await page.$eval(
        "[data-test=textarea-content]",
        el => (el as HTMLTextAreaElement).value
      );
      // focus on the input field
      await page.click("[data-test=textarea-content]");
      while (inputValue.length > 0) {
        await page.keyboard.press("Backspace");
        inputValue = await page.$eval(
          "[data-test=textarea-content]",
          el => (el as HTMLTextAreaElement).value
        );
      }
      await Promise.all([
        page.waitForSelector("[data-test=error-content]"),
        page.click("[data-test=submit]"),
      ]);
      const content = await page.$eval("[data-test=error-content]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(content).toBe("Content can't be blank");
    });
  });
  afterAll(async () => {
    await page.waitForSelector("[data-test=header-link-logout]"),
      await Promise.all([
        page.waitForSelector("[data-test=header-link-login]"),
        page.click("[data-test=header-link-logout]"),
      ]);
  });
});
