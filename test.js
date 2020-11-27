const puppeteer = require('puppeteer');

async function getPic() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.booking.com');
  // await page.setViewport({width: 1000, height: 500})
  await page.screenshot({ path: 'booking.png' });

  await browser.close();
}

getPic();



// const city = 'Saint-Petersburg'
// const screenshot = `booking_results_${city}.png`
// try {  
//   (async () => {    
//     const browser = await puppeteer.launch()    
//     const page = await browser.newPage()    
//     await page.goto('https://booking.com')    
//     await page.type('#ss', city)    
//     await page.keyboard.press('Enter')    
//     await page.waitForSelector('#hotellist_inner')    
//     await page.screenshot({      
//       path: screenshot,      
//       fullPage: true    
//     })    
//     const hotels = await page.$$eval('span.sr-hotel__name', (anchors) => {
//       return anchors.map((anchor) => anchor.textContent.trim()).slice(0, 20)    
//     })    
//     console.log(hotels)    
//     await browser.close()    
//     console.log('See screenshot: ' + screenshot)  
//   })()
// } catch (err) {  
//   console.error(err)
// }



const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://books.toscrape.com/')
  // await page.waitFor(100);
  // await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container');

  const result = await page.evaluate(() => {

    let resArr = [];
    const booksPics = document.querySelectorAll('.product_pod');
    
    booksPics.forEach((item) => {
      let bookName = item.childNodes[5].innerText;
      let bookCost = item.childNodes[7].children[0].innerText;

      resArr.push({ bookName, bookCost })
    })
    return resArr
  })
  
  await browser.close();
  return result;

}

scrape().then((value) => {
  console.log(value);
})

// scrape()

// #default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(2) > article