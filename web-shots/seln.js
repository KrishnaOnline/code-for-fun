const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");

// Ensure the media directory exists
const mediaDir = path.join(__dirname, "media");
if (!fs.existsSync(mediaDir)) {
	fs.mkdirSync(mediaDir);
}

(async function takeScreenshot() {
	// Set up Chrome options
	let options = new chrome.Options();
	options.addArguments("--disable-infobars");
	options.addArguments("--no-sandbox");

	// Build the WebDriver
	let driver = await new Builder()
		.forBrowser("chrome")
		.setChromeOptions(options)
		.build();

	try {
		// Navigate to Google
		await driver.get("https://google.com");

		// Take a screenshot
		let screenshot = await driver.takeScreenshot();

		// Save the screenshot to the media folder
		fs.writeFileSync(
			path.join(mediaDir, new Date().getTime().toString()+".png"),
			screenshot,
			"base64"
		);
		console.log("Screenshot saved to media/");
	} finally {
		// Quit the driver
		await driver.quit();
	}
})();