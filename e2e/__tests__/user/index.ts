describe("User index page", () => {
  describe("after sign in", () => {
    beforeAll(async () => {
      await Promise.all([
        page.waitForSelector("[data-test=input-email]"),
        page.goto(`${TARGET_PAGE_URL}/login`),
      ]);
      await page.type("[data-test=input-email]", "ninja@progate.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.waitForSelector("[data-test=header-link-logout]"),
        page.click("[data-test=submit]"),
      ]);
      await Promise.all([
        page.waitForSelector("[data-test=user-item-image]"),
        page.goto(`${TARGET_PAGE_URL}/users`),
      ]);
    });
    test("display user list [JDwQzgXC5CV2-6lfzRAEW]", async () => {
      const userImageCount = await page.$$eval(
        "[data-test=user-item-image]",
        els => els.length
      );
      const userLinkCount = await page.$$eval(
        "[data-test=user-item-link]",
        els => els.length
      );
      expect(userImageCount).toEqual(userLinkCount);
    });
    afterAll(async () => {
      await Promise.all([
        page.waitForSelector("[data-test=header-link-login]"),
        page.click("[data-test=header-link-logout]"),
      ]);
    });
  });
  describe("before sign in", () => {
    test("display sign in required error [dlTjyJ4m5iIgZBBhAur_V]", async () => {
      await Promise.all([
        page.waitForSelector("[data-test=form-heading]"),
        page.goto(`${TARGET_PAGE_URL}/users`),
      ]);
      const message = await page.$eval("[data-test=dialog]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(page.url()).toBe(`${TARGET_PAGE_URL}/login`);
      expect(message).toBe("You must be logged in");
      await Promise.all([
        page.waitForSelector("[data-test=form-heading]"),
        page.reload(),
      ]);
      expect(await page.$("[data-test=dialog]")).toBeNull();
    });
  });
});