import chrome from "chrome-aws-lambda";
import puppeteer, { Page } from "puppeteer-core";

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const isProd = process.env.VERCEL;

const getOption = async () => {
  return isProd
    ? {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      }
    : {
        args: [],
        executablePath: exePath,
        headless: true,
      };
};

export const fetchFontFamily = async (targetUrl: string) => {
  const option = await getOption();
  const browser = await puppeteer.launch(option);
  const page = await browser.newPage();

  await page.goto(targetUrl);

  const analyze = await page.evaluate(() => {
    const fontFamily = getComputedStyle(document.body).fontFamily;
    const styleSheets = Array.from(document.querySelectorAll("link"))
      .filter((link) => link.rel === "stylesheet")
      .map((link) => link.href);

    return { fontFamily, styleSheets };
  });

  await browser.close();

  return analyze;
};
