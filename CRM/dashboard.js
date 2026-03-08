let chart;

function loadChart(){

// get leads from storage

let leads = JSON.parse(localStorage.getItem("leads")) || [];

let newCount = 0;
let contacted = 0;
let qualified = 0;
let won = 0;
let lost = 0;

// count status

leads.forEach(lead => {

if(lead.status === "New") newCount++;

if(lead.status === "Contacted") contacted++;

if(lead.status === "Qualified") qualified++;

if(lead.status === "Won") won++;

if(lead.status === "Lost") lost++;

});

// data array

let data = [newCount, contacted, qualified, won, lost];

// get canvas

let canvas = document.getElementById("leadChart");

if(!canvas) return;

let ctx = canvas.getContext("2d");

// destroy old chart

if(chart){
chart.destroy();
}

// create chart

chart = new Chart(ctx,{

type: "pie",

data: {

labels: ["New","Contacted","Qualified","Won","Lost"],

datasets: [{

label: "Lead Status",

data: data,

backgroundColor: [

"#3b82f6",
"#f59e0b",
"#06b6d4",
"#22c55e",
"#ef4444"

],

borderWidth: 1

}]

},

options: {

responsive: true,

plugins: {

legend: {
position: "bottom"
}

}

}

});

}

// auto load chart when page loads

document.addEventListener("DOMContentLoaded", function(){

loadChart();

});
