describe("Unlike post", () => {
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
  test("the icon will turn white and the count will decrease by one [oqezHyX4muwkoVjyAaXuf]", async () => {
    await Promise.all([
      page.waitForSelector("[data-test=submit-unlike]"),
      page.goto(`${TARGET_PAGE_URL}/posts/5`),
    ]);
    await Promise.all([
      page.waitForSelector("[data-test=submit-like]"),
      page.click("[data-test=submit-unlike]"),
    ]);
    const icon = await page.$eval("[data-test=favorite-icon]", el =>
      (el as HTMLElement).innerText.trim()
    );
    const count = await page.$eval("[data-test=like-count]", el =>
      (el as HTMLElement).innerText.trim()
    );
    expect(icon).toBe("favorite_border");
    expect(count).toBe("2");
  });
  afterAll(async () => {
    await page.waitForSelector("[data-test=header-link-logout]"),
      await Promise.all([
        page.waitForSelector("[data-test=header-link-login]"),
        page.click("[data-test=header-link-logout]"),
      ]);
  });
});
