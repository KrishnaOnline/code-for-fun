const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const mediaDir = path.join(__dirname, "media");
if (!fs.existsSync(mediaDir)) {
	fs.mkdirSync(mediaDir);
}
const login = async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	try {
		await page.goto("https://kwikskill-by-kkv.vercel.app/login");
		await page.type('input[name="email"]', "stud01@mail.com");
		await page.type('input[name="password"]', "123456");
		await page.click('button[type="submit"]');
		await page.waitForNavigation();
		// await page.screenshot(mediaDir, new Date().getTime().toString()+".png");
        const screenshot = await page.screenshot({ encoding: "base64" });
		fs.writeFileSync(
			path.join(mediaDir, new Date().getTime().toString() + ".png"),
			screenshot,
			"base64"
		);
		console.log("Screenshot taken after login and saved to media/");
	} catch (err) {
		console.log("Error during Logging in: ", err);
	} finally {
		await browser.close();
	}
};

login();
