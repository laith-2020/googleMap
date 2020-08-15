'use strict';

require('dotenv').config();
const express = require('express');
const superagent = require('superagent');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static('./public'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// dotenv 
// PORT=3030
// PUBLIC_KEY=pub_56fa2489345347d19af7abe5284a7f43
// VENUE_ID=ven_3055525142546652696c5752346a4c6c625838357151704a496843


// app.get('/', (req, res) => {
//     res.status(200).send('its work');
// })

app.get('/', (req, res) => {

    let api_key_public = process.env.PUBLIC_KEY;
    let venue_id = process.env.VENUE_ID;

    // https://besttime.app/api/v1/forecasts/busy?api_key_public=pub_56fa2489345347d19af7abe5284a7f43&venue_id=ven_3055525142546652696c5752346a4c6c625838357151704a496843
    let url = `https://besttime.app/api/v1/forecasts/busy?api_key_public=${api_key_public}&venue_id=${venue_id}`;

    superagent.get(url)
        .then(result => {
            let busyObj = new Busy(result.body);
            console.log(result.body);
            res.render('index', { busyObj: result.body });
        })

})

app.get('/data', (req, res) => {
    let api_key_public = process.env.PUBLIC_KEY;
    let venue_id = process.env.VENUE_ID;
    // https: //besttime.app/api/v1/forecasts/day?api_key_public=pub_56fa2489345347d19af7abe5284a7f43&venue_id=ven_3055525142546652696c5752346a4c6c625838357151704a496843
    let url = `https://besttime.app/api/v1/forecasts/day?api_key_public=${api_key_public}&venue_id=${venue_id}`;
    superagent.get(url)
        .then(result => {
            let busyObj = new Day(result.body);
            console.log(result.body);
            res.send(busyObj);
        })
})


// var days = {};

// days.saja = function() {
//     let api_key_public = process.env.PUBLIC_KEY;
//     let venue_id = process.env.VENUE_ID;
//     // https: //besttime.app/api/v1/forecasts/day?api_key_public=pub_56fa2489345347d19af7abe5284a7f43&venue_id=ven_3055525142546652696c5752346a4c6c625838357151704a496843
//     let url = `https://besttime.app/api/v1/forecasts/day?api_key_public=${api_key_public}&venue_id=${venue_id}`;
//     superagent.get(url)
//         .then(result => {
//             let busyObj = new Day(result.body);
//             return busyObj;
//         })

// }
// module.exports = days;


function Day(busyDay) {
    this.hour_analysis = busyDay.analysis.hour_analysis;

}
// api_key_private=pri_95e954eb0bb04265abce88e31ed624bc&
// venue_name=Falak Business Hub | فلك للأعمال والاستثمار&
// venue_address=near Invenu, Al Yasmin, Unnamed Road, Riyadh 13326 13326 Saudi Arabia


function Busy(busyData) {
    this.busy_hours = busyData.analysis.busy_hours;
    this.venue_closed = busyData.analysis.day_info.venue_closed;
    this.venue_open = busyData.analysis.day_info.venue_open;

}

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})