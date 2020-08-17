"use strict";

$("#main").hide();

let day_raw = [];
for (let i = 0; i < 24; i++) {
    if (i > 2 && i < 16) {
        day_raw.push($(`.days${i}`).html().trim());
    }
}


//chart
var options = {
    series: [{
        name: 'besy status',
        data: day_raw
    }],
    chart: {
        height: 300,
        width: 500,
        type: 'bar',
    },
    plotOptions: {
        bar: {
            dataLabels: {
                position: 'top', // top, center, bottom
            },
        }
    },
    dataLabels: {
        enabled: true,
        formatter: function(val) {
            return val + "%";
        },
        offsetY: -20,
        style: {
            fontSize: '12px',
            colors: ["#304758"]
        }
    },

    xaxis: {
        categories: ["9am",
            "10am",
            "11am",
            "12pm",
            "1pm",
            "2pm",
            "3pm",
            "4pm",
            "5pm",
            "6pm",
            "7pm",
            "8pm",
            "9pm",
        ],

        position: 'bottom',
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
        crosshairs: {
            fill: {
                type: 'gradient',
                gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [9, 21],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                }
            }
        },
        tooltip: {
            enabled: true,
        }
    },
    yaxis: {
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false,
        },
        labels: {
            show: false,
            formatter: function(val) {
                return val + "%";
            }
        }

    },
    title: {
        text: 'busy hours',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
            color: '#444'
        }
    }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();


// -------------------------------------------------------------------------------
// var ctx = document.getElementById("myChart").getContext("2d");
// var myChart = new Chart(ctx, {
//     type: "bar",
//     data: {
//         labels: [
//             "9am",
//             "10am",
//             "11am",
//             "12pm",
//             "1pm",
//             "2pm",
//             "3pm",
//             "4pm",
//             "5pm",
//             "6pm",
//             "7pm",
//             "8pm",
//             "9pm",
//         ],
//         datasets: [{
//             label: "Busy Status",
//             data: day_raw,
//             backgroundColor: [
//                 "rgba(54, 162, 235, 0.2)",
//                 "rgba(54, 162, 235, 0.2)",
//                 "rgba(54, 162, 235, 0.2)",
//                 "rgba(54, 162, 235, 0.2)",
//                 "rgba(54, 162, 235, 0.2)",
//                 "rgba(54, 162, 235, 0.2)",
//                 "rgba(54, 162, 235, 0.2)",
//                 "rgba(54, 162, 235, 0.2)",
//                 "rgba(54, 162, 235, 0.2)",
//                 "rgba(54, 162, 235, 0.2)",
//                 "rgba(54, 162, 235, 0.2)",
//                 "rgba(54, 162, 235, 0.2)",
//             ],
//             borderColor: [
//                 "rgba(255, 99, 132, 1)",
//                 "rgba(255, 99, 132, 1)",
//                 "rgba(255, 99, 132, 1)",
//                 "rgba(255, 99, 132, 1)",
//                 "rgba(255, 99, 132, 1)",
//                 "rgba(255, 99, 132, 1)",
//                 "rgba(255, 99, 132, 1)",
//                 "rgba(255, 99, 132, 1)",
//                 "rgba(255, 99, 132, 1)",
//                 "rgba(255, 99, 132, 1)",
//                 "rgba(255, 99, 132, 1)",
//                 "rgba(255, 99, 132, 1)",
//             ],
//             borderWidth: 1,
//         }, ],
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true,
//                 },
//             }, ],
//         },
//     },
// });