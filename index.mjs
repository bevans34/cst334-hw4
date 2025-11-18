// HW 4: Brandon Evans

import express from 'express';
import fetch from 'node-fetch';
// const planets = (await import('npm-solarsystem')).default; // TODO: Import a different package for HW4
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

// Routes

// Home view
app.get('/', async(req, res) => {
    res.render("index");
});

// Planet views
app.get('/viruses', (req, res) => {
    res.render("viruses");
});

// Trojan view
app.get('/trojans', (req, res) => { // Venus
    res.render("trojans");
});

// Ransomware view
app.get('/ransoms', (req, res) => { // Earth
    res.render("ransoms");
});

// Vulnerabilities view
app.get('/vulns', async(req, res) => {
    // TODO: Modify to utilize the NVD CVE API

    // let apiKey = "9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD";
	// let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=2025-11-15`;
    // let response = await fetch(url);
    // let vulnData = await response.json();
    // res.render("vulns", {vulnData});

    res.render("vulns");
});

// Listener
app.listen(3000, () => {
    console.log('server started');
});