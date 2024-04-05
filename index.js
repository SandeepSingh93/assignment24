const helper = require('./helper');
const express = require('express');
const bodyParser = require('body-parser')
// const sqlite3 = require('sqlite3')

// // CONNECT TO DATABASE
// const db = new sqlite3.Database('./bolster_database.db', (err) => {
//     if (err) {
//         console.error("Error opening database " + err.message);
//     } else {
//         db.run('CREATE TABLE data( \
//             id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
//             json_data TEXT\
//         )', (err) => {
//             if (err) {
//                 console.log("Table already exists.");
//             }
//         });
//     }
// });

const app = express();
app.use(bodyParser.json());

// API 1: URL scanning Webservice
// To scan a given URL and return various artifacts from it.

app.post('/api/scan-url', async (req, res) => {
    try {
        const url = req.body.url;
        const { screenshot, ipAddress, sourceUrl,
            destinationUrl, pageSource, sslData,
            asnData, pageLanguage } = await helper.getUrlData(url);
        // db.run(`INSERT INTO data (json_data)\
        //         VALUES ("{\
        //             "screenshot":${screenshot},\
        //             "ipAddress": ${ipAddress},\
        //             "source_url": ${sourceUrl},\
        //             "destination_url": ${destinationUrl},\
        //             "ssl_data": ${sslData},\
        //             "asn_data": ${asnData},\
        //             "page_language": ${pageLanguage}\
        //         }")`
        // );
        res.status(200).json({
            screenshot, ipAddress, sourceUrl,
            destinationUrl, sslData, asnData,
            pageLanguage, pageSource
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});


// START APP AT PORT 8080
app.listen(8080, () => {
    console.log(`Server Started at ${8080}`)
})