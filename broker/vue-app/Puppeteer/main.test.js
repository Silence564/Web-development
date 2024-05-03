const puppeteer = require("puppeteer")
const {describe, test, expect, it} = require("@jest/globals");

function getCostFromString(string){return parseFloat(string.split(' ')[1]);}
function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms));}

test("Headless test", async () => {
    const browser = await puppeteer.launch({
        headless: true
    }) // если поставить false, то запустится браузер
    //login:
    const page = await browser.newPage()
    await page.goto("http://localhost:8080/#/")
    await page.waitForSelector("#loginInput");
    await page.type("#loginInput", "Мои инвестиции");
    await page.type("#passwordInput", "10");
    await page.click("#entryBtn");
    //wait stock:
    await page.waitForSelector('.stockId');
    //before buy:
    const startBalance = getCostFromString(await page.$eval("#cashId", e => e.innerHTML));
    const stockCost = getCostFromString( await page.$eval(".price", e => e.innerHTML));
    let oldDiffer = 0;
    if (await page.$('.differ')){
        oldDiffer = parseFloat((await page.$eval('.differ', e => e.innerHTML)).split(' ')[2]);
    }
    await page.screenshot({path: './Puppeteer/scr1.png'});
    //buy:
    console.log("BEFORE BUY:", startBalance, stockCost, oldDiffer);
    await page.click('.buyBtn');
    await delay(200);
    //after buy:
    await page.screenshot({path: './Puppeteer/scr2.png'});
    const newBalance = getCostFromString(await page.$eval("#cashId", e => e.innerHTML));
    console.log(newBalance);
    expect(newBalance.toFixed(1)).toBe((startBalance - stockCost).toFixed(1));

    await delay(200);
    //updated info:
    const newCost = getCostFromString( await page.$eval(".price", e => e.innerHTML));
    const count = parseInt((await page.$eval('.stockCount', e => e.innerHTML)).split(' ')[1]);
    const differ = parseFloat((await page.$eval('.differ', e => e.innerHTML)).split(' ')[2]);
    console.log("AFTER BUY:", newCost, count, differ);

    expect(differ.toFixed(1)).toBe((newCost - (stockCost - oldDiffer)).toFixed(1));


}, 60000)