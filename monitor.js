const puppeteer = require('puppeteer');
const CronJob = require('cron').CronJob;
const cheerio = require('cheerio');
const $ = require('cheerio');
const Discord = require('discord.js');
const client = new Discord.Client();

const hook = new Discord.WebhookClient("886487632157241374", "c5wqh7g99OTfDMlLkyP8Z1isrIkRxtrUfWFxjoknTc_UB3fE9ezyWwT0JixMYCiT8a2f")

// const instock_url = 'https://www.walmart.ca/en/ip/acer-238-full-hd-led-monitor-ka242y-bbmiix/6000203217515';
// const oos_url = 'https://www.walmart.ca/en/ip/-/6000195165105';

const instock_url = 'https://www.walmart.com/ip/Acer-32-Curved-1920x1080-HDMI-DP-165hz-1ms-Freesync-HD-LED-Gaming-Monitor-ED320QR-Sbiipx/763942438';
const oos_url = 'https://www.walmart.com/ip/SAMSUNG-27-Class-Curved-1920x1080-VGA-HDMI-60hz-4ms-AMD-FREESYNC-HD-LED-Monitor-LC27F396FHNXZA/117633165';

async function initBrowser() {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto(oos_url);
    return page;
}

async function checkStockOfProduct(page) {
    await page.reload();
    let content = await page.evaluate(() => document.body.innerHTML);
    let $ = cheerio.load(content);
    $("link[itemprop='availability']").each(function() {
        let result = $(this).attr('href').toLowerCase().includes("outofstock");
        if(result){
            console.log("OOS");
        } else {
            console.log("InStock");
        }
    })
}

async function monitor() {
    let page = await initBrowser();
    await checkStockOfProduct(page);
}

// monitor();

client.on("message", (message) => {
    message.channel.send("testing");
})

client.login("368632801500725250");