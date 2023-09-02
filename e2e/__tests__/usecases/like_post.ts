describe("Like post", () => {
  beforeAll(async () => {
    await Promise.all([
      page.waitForSelector("[data-test=input-email]"),
      page.waitForSelector("[data-test=submit]"),
      page.goto(`${TARGET_PAGE_URL}/login`),
    ]);
    await page.type("[data-test=input-email]", "ninja@progate.com");
    await page.type("[data-test=input-password]", "password");
    await Promise.all([
      page.waitForSelector("[data-test=header-link-logout]"),
      page.click("[data-test=submit]"),
    ]);
  });
  test("the icon turns red and the count increases by one [InEnhMvZIOdGbyS_E3oNh]", async () => {
    await Promise.all([
      page.waitForSelector("[data-test=favorite-icon]"),
      page.goto(`${TARGET_PAGE_URL}/posts/3`),
    ]);
    await Promise.all([
      page.waitForSelector("[data-test=submit-unlike]"),
      page.click("[data-test=favorite-icon]"),
    ]);
    const icon = await page.$eval("[data-test=favorite-icon]", el =>
      (el as HTMLElement).innerText.trim()
    );
    const count = await page.$eval("[data-test=like-count]", el =>
      (el as HTMLElement).innerText.trim()
    );
    expect(icon).toBe("favorite");
    expect(count).toBe("4");
  });
  afterAll(async () => {
    await page.waitForSelector("[data-test=header-link-logout]"),
      await Promise.all([
        page.waitForSelector("[data-test=header-link-login]"),
        page.click("[data-test=header-link-logout]"),
      ]);
  });
});
