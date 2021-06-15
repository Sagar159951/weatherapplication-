const cityName = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");
const city_name = document.getElementById("city_name");
const temp_status = document.getElementById("temp_status");
const temp_real_val = document.getElementById("temp_real_val");
const curDay = document.getElementById("day");
const datahide = document.querySelector(".middle_layer");
const curdate = document.getElementById("today_data");

const gatinfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    console.log(cityVal);
    if( cityVal === ""){
        city_name.innerHTML = `Please write the name before you search`;
        datahide.classList.add("data_hide");
    }else{
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=f7fb0b4b12d917043c5f0b7bfee63d2d`;
            const response = await fetch(url);
            const data = await response.json();
            const arryData = [data];

            temp_real_val.innerHTML = arryData[0].main.temp;
            city_name.innerHTML = `${arryData[0].name}, ${arryData[0].sys.country}`;
            const tempMood = arryData[0].weather[0].main;
            
            if (tempMood == "Clear") {
                temp_status.innerHTML = "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == "Rain") {
                temp_status.innerHTML = "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else if (tempMood == "Mist" || tempMood == "Haze") {
                temp_status.innerHTML = "<i class='fas fa-smog' style='color: #0059b3;'></i>";
            } else if (tempMood == "Thunderstrom") {
                temp_status.innerHTML = "<i class='fas fa-poo-storm' style='color: #e0e0eb;'></i>";
            } else {
                temp_status.innerHTML = "<i class='fas  fa-sun' style='color: #ffffb3;'></i>";
            }

            const getCurrentDay = () => {
                var weekday = new Array(7);
                weekday[0] = "Sunday"; weekday[1] = "Monday"; weekday[2] = "Tueday"; weekday[3] = "Wednesday";
                weekday[4] = "Thursday"; weekday[5] = "Friday"; weekday[6] = "Saturday"; 
                let currentTime = new Date();
                let day = weekday[currentTime.getDay()];
                return day;
            }    
            curDay.innerHTML = getCurrentDay();
    
            const getCurrentTime = () => {
                var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                var nowTime = new Date();
                var month = months[nowTime.getMonth()];
                var date = nowTime.getDate();
                return `${date} ${month}`;
            }
            curdate.innerHTML = getCurrentTime();

            datahide.classList.remove("data_hide");
        } catch {
            city_name.innerHTML = `Please enter a valid city name`;
            datahide.classList.add("data_hide");
        }
    }
}

submitBtn.addEventListener("click", gatinfo);