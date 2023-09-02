describe("Post index page", () => {
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
        page.waitForSelector("[data-test=post-item-content]"),
        page.goto(`${TARGET_PAGE_URL}/posts`),
      ]);
    });
    beforeEach(async () => {
      await Promise.all([
        page.waitForSelector("[data-test=post-item-content]"),
        page.goto(`${TARGET_PAGE_URL}/posts`),
      ]);
    });
    test("display post list in order of newest to oldest [SCv-J9Qt4YhMsKcjm8H3c]", async () => {
      const oldestContent = await page.$eval(
        "[data-test=posts-container]",
        el => {
          return (
            el.lastElementChild?.querySelector(
              "[data-test=post-item-content]"
            ) as HTMLElement
          ).innerText.trim();
        }
      );
      const secondOldestContent = await page.$eval(
        "[data-test=posts-container]",
        el => {
          return (
            el.lastElementChild?.previousElementSibling?.querySelector(
              "[data-test=post-item-content]"
            ) as HTMLElement
          ).innerText.trim();
        }
      );

      expect(oldestContent).toBe("Looking for a good book to read.");
      expect(secondOldestContent).toBe("Today's lunch was great!");
    });
    test("display search post input", async () => {
      expect(await page.$("[data-test=search-input]")).not.toBeNull();
    });
    test("display filtered post list with matching content to search text", async () => {
      await page.type("[data-test=search-input]", "for search test content");
      const length = await page.$$eval(
        "[data-test=posts-container] [data-test=post-item-content]",
        els => els.length
      );

      expect(length).toBe(2);
    });

    test("display filtered post list with matching name to search text", async () => {
      await page.type("[data-test=search-input]", "for search post");
      const length = await page.$$eval(
        "[data-test=posts-container] [data-test=post-item-user]",
        els => els.length
      );
      expect(length).toBe(3);
    });
    afterAll(async () => {
      await Promise.all([
        page.waitForSelector("[data-test=header-link-login]"),
        page.click("[data-test=header-link-logout]"),
      ]);
    });
  });
  describe("before sign in", () => {
    test("display sign in required error [P7BxdnkCZFHfjzswGUYLr]", async () => {
      await Promise.all([
        page.waitForSelector("[data-test=form-heading]"),
        page.goto(`${TARGET_PAGE_URL}/posts`),
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
