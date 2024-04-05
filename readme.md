
# Project Title

Assignment to scan URL and get data. Script for browser automation.




## Deployment

To deploy this project run

```bash
FOR API:
  npm install
  npm start

FOR AUTOMATION SCRIPT:
  node automationScript.js
```



## API Reference

#### Scan URL and get data

```http
  POST /api/scan-url
  Body - Raw JSON
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `url` | `string` | **Required**.  |




## Folder Structure

**samples/** 

**samples/formdata.csv**  -->  Sample CSV data for submitting form.

**samples/sample1.png**  -->  Sample PNG file for attachments.

**screenshots/**  -->  All screenshots are saved here.





## Tech Stack

**Server:** Node, Express

**External Libraries:** axios, body-parser, nodemon, papaparse, puppeteer, uuid


## License

[MIT](https://choosealicense.com/licenses/mit/)
