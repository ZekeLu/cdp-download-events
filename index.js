const puppeteer = require('puppeteer-core');

(async () => {
    const browser = await puppeteer.launch({executablePath: '/path/to/the/browser'});
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();
    await client.send('Browser.setDownloadBehavior', {
        behavior: 'allowAndName',
        downloadPath: '/tmp',
        eventsEnabled: true
    });
    try {
        await page.goto('https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Mac%2F878144%2FREVISIONS?generation=1619830882614039&alt=media');
    } catch (err) {
        // ignore net::ERR_ABORTED error
        console.log(err);
    }

    await browser.close();
})();
