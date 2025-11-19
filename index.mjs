// HW 4: Brandon Evans

import express from 'express';
import fetch from 'node-fetch';
const quote = (await import('generate-quote')); // TODO: Import a different package for HW4
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

// Routes

// Home
app.get('/', async(req, res) => {
    console.log(quote.getQuote());
    res.render("index", {quote});
});

// Viruses
app.get('/viruses', (req, res) => {
    res.render("viruses");
});

// Trojans
app.get('/trojans', (req, res) => {
    res.render("trojans");
});

// Ransomware
app.get('/ransoms', (req, res) => {
    res.render("ransoms");
});

// Vulnerabilities
app.get('/vulns', async(req, res) => {
    // If there is no CVE data in the GET request, do not call the NVD API.
    if (req.query.cve == null) {
        let vulnData = null;
        res.render("vulns", {vulnData});
        return;
    }

    // If there is CVE data in the GET request, we can attempt to call the NVD API.
	let url = `https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${req.query.cve}`;
    let response = await fetch(url);

    try {
        let vulnData = await response.json();
        console.log(vulnData.vulnerabilities[0]);
        res.render("vulns", {vulnData});
    } catch (errMsg) {
        let vulnData = "INVALID";
        console.log("ERROR! " + errMsg);
        res.render("vulns", {vulnData, errMsg});
    }
});

// Listener
app.listen(3000, () => {
    console.log('server started');
});