const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

// Ensure the media directory exists
const mediaDir = path.join(__dirname, "media");
if (!fs.existsSync(mediaDir)) {
	fs.mkdirSync(mediaDir);
}

(async function takeScreenshot() {
	// Launch the browser
	const browser = await puppeteer.launch({
		headless: false,
		args: ["--no-sandbox"],
	});

	try {
		// Open a new page
		const page = await browser.newPage();

		// Navigate to Google
		await page.goto("https://krishnavamshi-portfolio.netlify.app/");

		// Take a screenshot
		const screenshot = await page.screenshot({ encoding: "base64" });

		// Save the screenshot to the media folder
		fs.writeFileSync(
			path.join(mediaDir, new Date().getTime().toString() + ".png"),
			screenshot,
			"base64"
		);
		console.log("Screenshot saved to media/");
	} finally {
		// Close the browser
		await browser.close();
	}
})();
