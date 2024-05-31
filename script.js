import APIKEY from './api.js'

let searchButton = document.getElementById("searchButton");
let searchBar = document.getElementById("searchBar");

let city = 'delhi';

async function fetchData(){
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${APIKEY}&contentType=json`;

    let data = await fetch(url);
    if(data.status == 400){
        alert('Invalid City !');
        return;
    }

    data = await data.json();

    fillDataMainLeft(data);
    fillDataMainRight(data);
}

fetchData();

function fillDataMainLeft(data){
    let clutter = '';

    clutter += 
    `<div class="flex gap-5 justify-between text-white p-4 bg-[#ffffff30] border-2 border-white rounded-xl backdrop-blur-sm">
        <div>
        <h1 class="text-2xl lg:text-5xl font-semibold pb-3 capitalize">${data.address}</h1>
        <p class="text-sm pb-6">Address: ${data.resolvedAddress}</p>
        <p class="text-sm pb-6">TimeZone: ${data.timezone}</p>
        <h1 class="text-2xl lg:text-5xl">${data.currentConditions.temp}&deg;</h1>
        </div>
        <img src="./assets/${data.currentConditions.icon}.svg" class="max-w-[200px]" alt="">
    </div>`;

    let todayDay = data.days[0];

    clutter +=
    `<div class="p-4 bg-[#ffffff30] border-2 border-white rounded-xl backdrop-blur-sm">
          <p class="text-sm font-bold text-gray-200 pb-3">TODAY'S FORECAST</p>
          
          <div class="grid gap-2 grid-cols-6 text-center">

            <div class="border-r-2 border-gray-300 flex flex-col gap-3 px-2 justify-between">
              <p class="text-sm font-semibold text-slate-200">00:00 AM</p>
              <img src="./assets/${todayDay.hours[0].icon}.svg" class="w-18" alt="">
              <p class="font-bold text-xl text-white">${todayDay.hours[0].temp}&deg</p>
            </div>
            <div class="border-r-2 border-gray-300 flex flex-col gap-3 px-2 justify-between">
              <p class="text-sm font-semibold text-slate-200">04:00 AM</p>
              <img src="./assets/${todayDay.hours[4].icon}.svg" class="w-18" alt="">
              <p class="font-bold text-xl text-white">${todayDay.hours[4].temp}&deg</p>
            </div>
            <div class="border-r-2 border-gray-300 flex flex-col gap-3 px-2 justify-between">
              <p class="text-sm font-semibold text-slate-200">08:00 AM</p>
              <img src="./assets/${todayDay.hours[8].icon}.svg" class="w-18" alt="">
              <p class="font-bold text-xl text-white">${todayDay.hours[8].temp}&deg</p>
            </div>
            <div class="border-r-2 border-gray-300 flex flex-col gap-3 px-2 justify-between">
              <p class="text-sm font-semibold text-slate-200">12:00 PM</p>
              <img src="./assets/${todayDay.hours[12].icon}.svg" class="w-18" alt="">
              <p class="font-bold text-xl text-white">${todayDay.hours[12].temp}&deg</p>
            </div>
            <div class="border-r-2 border-gray-300 flex flex-col gap-3 px-2 justify-between">
              <p class="text-sm font-semibold text-slate-200">04:00 PM</p>
              <img src="./assets/${todayDay.hours[16].icon}.svg" class="w-18" alt="">
              <p class="font-bold text-xl text-white">${todayDay.hours[16].temp}&deg</p>
            </div>
            <div class="flex flex-col gap-3 px-2 justify-between">
              <p class="text-sm font-semibold text-slate-200">08:00 PM</p>
              <img src="./assets/${todayDay.hours[20].icon}.svg" class="w-18" alt="">
              <p class="font-bold text-xl text-white">${todayDay.hours[20].temp}&deg</p>
            </div>
            
          </div>
        </div>`;

    clutter +=
    `<div class="p-4 bg-[#ffffff30] border-2 border-white rounded-xl backdrop-blur-sm">
        <p class="text-sm font-bold text-gray-200 pb-4">TODAY'S CONDITIONS</p>
        <div class="flex text-slate-200">
            <div class="flex-1">
                <p class="text-sm">Humidity</p>
                <p class="text-lg">${data.currentConditions.humidity} %</p>
            </div>
            <div class="flex-1">
                <p class="text-sm">Wind Speed</p>
                <p class="text-lg">${data.currentConditions.windspeed} km/hr</p>
            </div>
            <div class="flex-1">
                <p class="text-sm">Sunrise</p>
                <p class="text-lg">${data.currentConditions.sunrise}</p>
            </div>
            <div class="flex-1">
                <p class="text-sm">Sunset</p>
                <p class="text-lg">${data.currentConditions.sunset}</p>
            </div>
        </div>
    </div>`;

    console.log(clutter);

    document.querySelector('#mainLeft').innerHTML = clutter;

}

function getDay(date){
    const currentDate = new Date(date);

    // Array of weekday names
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Get the day of the week (0-6) and then return it
    return daysOfWeek[currentDate.getDay()];
}

function fillDataMainRight(data){
    let daysDatas = data.days.slice(1,8);
    let daysClutter = '';

    daysDatas.forEach(dayData=>{
        let dayOnThatDay = getDay(dayData.datetime);
        daysClutter +=
        `<div class="flex items-center justify-around gap-2">
            <p class="text-sm font-semibold text-slate-200 mr-3">${dayOnThatDay}</p>
            <div class="flex gap-2 items-center">
                <img src="./assets/${dayData.icon}.svg" class="w-12" alt="" />
                <p class="font-bold text-xl text-white text-wrap">${dayData.conditions}</p>
            </div>
            <div class="text-gray-200">
                <p class="text-xs">Max Temp</p>
                <p class="text-xl">${dayData.tempmax}&deg;</p>
            </div>
            <div class="text-gray-200">
                <p class="text-xs">Min Temp</p>
                <p class="text-xl">${dayData.tempmin}&deg;</p>
            </div>
        </div>`;
    })


    document.querySelector('#mainRight').innerHTML = 
    `<div class="py-4 px-2 mb-4 bg-[#ffffff30] border-2 border-white rounded-xl backdrop-blur-sm flex flex-col h-full">
        <p class="font-bold text-gray-200 pb-3">7 DAY FORECAST</p>
        <div class="grid gap-2 grid-rows- text-center flex-1">${daysClutter}</div>
    </div>`;


}

searchButton.addEventListener("click", ()=>{
    city = searchBar.value;
    searchBar.value = '';

    fetchData();
});