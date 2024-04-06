const puppeteer = require('puppeteer');
const axios = require('axios');
const tls = require('tls');
const { URL } = require('url')
const { join } = require('path');
const { v4: uuidv4 } = require('uuid');


async function getIpAddress(url) {
    try {
        const response = await axios.get(`https://api.ipify.org?format=json&url=${url}`);
        if (response.data) {
            console.log('IP Address details: ', response.data.ip)
            return response.data.ip;
        }
    }
    catch (error) {
        console.error('Error fetching IP Address: ', error);
        return '';
    }
}

async function getSSLData(url) {
    const urlObject = new URL(url)
    const params = { host: urlObject.hostname, port: 443 };
    const socket = tls.connect(params);
    let cert = ''

    socket.on('secureConnect', () => {
        cert = socket.getPeerCertificate();
        console.log('Certificate details: ', cert);
    });

    socket.on('error', (err) => {
        console.error('Error fetching certificate details: ', err);
    });

    return cert
}

async function getASNData(ipAddress) {
    try {
        const response = await axios.get(`http://ip-api.com/json/${ipAddress}`);
        if (response.data) {
            console.log('ASN details: ', response.data);
            return response.data;
        }
        return {};
    } catch (error) {
        console.error('Error fetching ASN information: ', error);
        return {};
    }
}

async function getLanguage(url) {
    return ''
}

async function getUrlData(url) {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto(url);

    // Extract data
    const filepath = join(__dirname, 'screenshots', `screenshot-${uuidv4()}.jpeg`);
    await page.screenshot({ path: filepath });
    const screenshot = filepath;
    const ipAddress = await getIpAddress(url);
    const sourceUrl = url;
    const destinationUrl = page.url();
    const pageSource = await page.content();
    const pageLanguage = await getLanguage(url);
    const sslData = await getSSLData(url);
    const asnData = await getASNData(ipAddress);

    // Close the browser
    await browser.close();

    return { screenshot, ipAddress, sourceUrl, destinationUrl, pageSource, sslData, asnData, pageLanguage };
}

module.exports = { getUrlData }