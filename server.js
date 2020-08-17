"use strict";
require("dotenv").config();
const express = require("express");
const superagent = require("superagent");
const { get } = require("superagent");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.get("/", (req, res) => {
//     let api_key_public = process.env.PUBLIC_KEY;
//     let venue_id = process.env.VENUE_ID;
//     // https://besttime.app/api/v1/forecasts/busy?api_key_public=pub_56fa2489345347d19af7abe5284a7f43&venue_id=ven_3055525142546652696c5752346a4c6c625838357151704a496843
//     let url = `https://besttime.app/api/v1/forecasts/busy?api_key_public=${api_key_public}&venue_id=${venue_id}`;
//     superagent.get(url).then((result) => {
//         let busyObj = new Busy(result.body);
//         // console.log(result.body);
//         res.send("index");
//     });
// });


app.get('/', (req, res) => {
    let api_key_public = process.env.PUBLIC_KEY;
    let venue_id = process.env.VENUE_ID;
    var d = new Date();
    var n = d.getDay();
    console.log(n);
    // https://besttime.app/api/v1/forecasts/day/raw?api_key_public=pub_56fa2489345347d19af7abe5284a7f43&venue_id=ven_3055525142546652696c5752346a4c6c625838357151704a496843&day_int=1
    let url = `https://besttime.app/api/v1/forecasts/day/raw?api_key_public=${api_key_public}&venue_id=${venue_id}&day_int=${n}`;
    superagent.get(url).then((result) => {
        let finalResult = result.body.analysis.day_raw;
        console.log(finalResult);
        let finalArr = finalResult.map((d) => {
            console.log('d', d);
            return new Day(d);
        });
        res.render("index", { arr: finalArr });
        console.log(finalArr)
    })
})

function Day(busyDay) {
    this.day_raw = busyDay;
}


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});