const puppeteer = require('puppeteer');
const { join } = require('path');
const fs = require('fs');
const Papa = require('papaparse');
const { v4: uuidv4 } = require('uuid');

(async () => {
    const csvFile = fs.readFileSync(join(__dirname, 'samples', 'formdata.csv'), 'utf-8');
    const parsedData = Papa.parse(csvFile, { header: true });

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: false
    });

    for (let item of parsedData.data) {
        if (Object.keys(item).length != 10){
            continue
        }

        // Create a new page
        const page = await browser.newPage();

        // Navigate the page to a URL
        await page.goto("https://help.instagram.com/contact/230197320740525");

        // radio box 1 - continuereport
        await page.click('input[name=continuereport]');

        // radio box 2 - relationship_rightsowner
        await page.click('input[name=relationship_rightsowner][value="I am reporting on behalf of my organization or client."]');

        //input 1 - your_name
        await page.type('input[name=your_name]', item["fullname"]);

        //input 2 - Address
        // await page.type('input[name="Address"]', item["address"]);

        //input 3 - email
        await page.type('input[name=email]', item["email"]);

        //input 4 - confirm_email
        await page.type('input[name=confirm_email]', item["email"]);

        //input 5 - reporter_name
        await page.type('input[name=reporter_name]', item["rightsowner"]);

        //input 6 - websiterightsholder
        await page.type('input[name=websiterightsholder]', item["rightsownerlink"]);

        //input 7 - what_is_your_trademark
        await page.type('input[name=what_is_your_trademark]', item["whatistrademark"]);

        //input 8 - rights_owner_country_routing
        await page.select('select[name=rights_owner_country_routing]', item["trademarkcountry"]);

        //input 9 - TM_URL
        //await page.type('input[name="TM_URL"]', item["trademarknumber"], {delay: 100});

        //input 10 - Attach1[]
        const uploadElement = await page.$('input[name="Attach1[]"]');
        await uploadElement.uploadFile(join(__dirname, 'samples', item["attachment"]));

        // input 11 - content_type[]
        await page.click('input[name="content_type[]"][value="Other"]');

        // input 12 - signature
        await page.type('input[name=signature]', item["signature"]);

        // Hover above submit button
        await page.hover('button[type="submit"]', { delay: 100 })

        await page.screenshot({
            type: "jpeg",
            path: join(__dirname, 'screenshots', `screenshot-hover-${item["fullname"].replace(/ /g, '')}-${uuidv4()}.jpeg`),
            fullPage: true
        });

        await page.close()

    }

    await browser.close();
})()