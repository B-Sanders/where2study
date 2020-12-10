import puppeteer from 'puppeteer';

const UCSD_LIBRARY_URL = 'https://library.ucsd.edu/assets/availability/mobile/index.html';

async function scrapeUCSD() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(UCSD_LIBRARY_URL, {
        waitUntil: 'networkidle2',
    });
    const cards = await page.evaluate(() => {
        const data = [];
        document.querySelectorAll('.card').forEach((card) => {
            data.push(card.innerText.split('\n'));
        });
        return data;
    });
    await browser.close();
    return cards;
}

/* This line is just to show how the scraper works.  It returns a promise containing
    containing an array of arrays. The inner arrays are between length 3 and 4 depending
    on the location.  
    length 3 arrays are of the form: ["Price Center", "Not Busy", "5% full"]
    length 4 arrays are of the form: ["BLB Lab", "PCs & Macs", "Not Busy", "0% full (74 of 74 available)"]
*/

export default scrapeUCSD;