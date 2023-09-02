describe("User edit page", () => {
  describe("sign in with correct user", () => {
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
        page.waitForSelector("[data-test=input-name]"),
        page.goto(`${TARGET_PAGE_URL}/users/1/edit`),
      ]);
    });
    test("set form values [j09d7KZm4iIOL7N6BAv6_]", async () => {
      const name = await page.$eval(
        "[data-test=input-name]",
        el => (el as HTMLInputElement).value
      );
      const email = await page.$eval(
        "[data-test=input-email]",
        el => (el as HTMLInputElement).value
      );
      const value = await page.$eval(
        "[data-test=submit]",
        el => (el as HTMLInputElement).value
      );
      expect(name).toBe("Ken the Ninja");
      expect(email).toBe("ninja@progate.com");
      expect(value).toBe("Save");
    });
    test("display image file input [jdrvS18jqzJJ5RcsFHKMQ]", async () => {
      const imageInputType = await page.$eval(
        "[data-test=input-image]",
        el => (el as HTMLInputElement).type
      );
      expect(imageInputType).toBe("file");
    });
    test("display no authorization error [opLjiQLEUJHJs471IpZjw]", async () => {
      await Promise.all([
        page.waitForSelector("[data-test=posts-container]"),
        page.goto(`${TARGET_PAGE_URL}/users/2/edit`),
      ]);
      const message = await page.$eval("[data-test=dialog]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(page.url()).toBe(`${TARGET_PAGE_URL}/posts`);
      expect(message).toBe("Unauthorized access");
    });
    afterAll(async () => {
      await Promise.all([
        page.waitForSelector("[data-test=header-link-login]"),
        page.click("[data-test=header-link-logout]"),
      ]);
    });
  });

  describe("before sign in", () => {
    test("display sign in required error [fQRz9xthPhsNUMqm24Wcs]", async () => {
      await Promise.all([
        page.waitForSelector("[data-test=form-heading]"),
        page.goto(`${TARGET_PAGE_URL}/posts/1/edit`),
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
