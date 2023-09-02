describe("Post new page", () => {
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
        page.waitForSelector("[data-test=textarea-content]"),
        page.goto(`${TARGET_PAGE_URL}/posts/new`),
      ]);
    });
    test("set form elements [nbnNJ3T3ptEGR_fQItZpm]", async () => {
      const content = await page.$eval(
        "[data-test=textarea-content]",
        el => (el as HTMLInputElement).type
      );
      const value = await page.$eval(
        "[data-test=submit]",
        el => (el as HTMLInputElement).value
      );
      expect(content).toBe("textarea");
      expect(value).toBe("Post");
    });
    afterAll(async () => {
      await Promise.all([
        page.waitForSelector("[data-test=header-link-login]"),
        page.click("[data-test=header-link-logout]"),
      ]);
    });
  });

  describe("before sign in", () => {
    test("display sign in required error [f-m_Tsxw_JZMgr7axbxLc]", async () => {
      await Promise.all([
        page.waitForSelector("[data-test=form-heading]"),
        page.goto(`${TARGET_PAGE_URL}/posts/new`),
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
