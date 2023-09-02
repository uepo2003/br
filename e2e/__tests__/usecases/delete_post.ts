describe("Post delete", () => {
  beforeAll(async () => {
    await Promise.all([
      page.waitForSelector("[data-test=input-email]"),
      page.waitForSelector("[data-test=submit]"),
      page.goto(`${TARGET_PAGE_URL}/login`),
    ]);
    await page.type("[data-test=input-email]", "baby@progate.com");
    await page.type("[data-test=input-password]", "password");
    await Promise.all([
      page.waitForSelector("[data-test=header-link-logout]"),
      page.click("[data-test=submit]"),
    ]);
    await Promise.all([
      page.waitForSelector("[data-test=submit-post-delete]"),
      page.goto(`${TARGET_PAGE_URL}/posts/4`),
    ]);
  });
  test("display post index page and dialog message [WBL_DAbxJG0KkpkqCR6tU]", async () => {
    await Promise.all([
      page.waitForSelector("[data-test=posts-container]"),
      page.click("[data-test=submit-post-delete]"),
    ]);
    const message = await page.$eval("[data-test=dialog]", el =>
      (el as HTMLElement).innerText.trim()
    );
    expect(message).toBe("Post successfully deleted");
    expect(page.url()).toBe(`${TARGET_PAGE_URL}/posts`);
    expect(await page.$("[data-test=post-4]")).toBeNull();
  });
  afterAll(async () => {
    await page.waitForSelector("[data-test=header-link-logout]"),
      await Promise.all([
        page.waitForSelector("[data-test=header-link-login]"),
        page.click("[data-test=header-link-logout]"),
      ]);
  });
});
