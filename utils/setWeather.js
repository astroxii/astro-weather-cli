localStorage.getItem("TempUnit") === "Celsius" || "Fahrenheit" ? null : localStorage.setItem("TempUnit", "Celsius");

const weatherConditions = 
{
    200: {name: "Thunderstorm", img: "./images/heavyrain.png"},
    201: {name: "Thunderstorm", img: "./images/heavyrain.png"},
    202: {name: "Thunderstorm", img: "./images/heavyrain.png"},
    210: {name: "Thunderstorm", img: "./images/thunder.png"},
    211: {name: "Thunderstorm", img: "./images/heavyrain.png"},
    212: {name: "Thunderstorm", img: "./images/heavyrain.png"},
    221: {name: "Thunderstorm", img: "./images/thunder.png"},
    230: {name: "Thunderstorm", img: "./images/heavyrain.png"},
    231: {name: "Thunderstorm", img: "./images/heavyrain.png"},
    232: {name: "Thunderstorm", img: "./images/heavyrain.png"},
    300: {name: "Drizzle", img: "./images/modrain.png"},
    301: {name: "Drizzle", img: "./images/modrain.png"},
    302: {name: "Drizzle", img: "./images/modrain.png"},
    310: {name: "Drizzle", img: "./images/modrain.png"},
    311: {name: "Drizzle", img: "./images/modrain.png"},
    312: {name: "Drizzle", img: "./images/modrain.png"},
    313: {name: "Drizzle", img: "./images/modrain.png"},
    314: {name: "Drizzle", img: "./images/heavyrain.png"},
    321: {name: "Drizzle", img: "./images/modrain.png"},
    500: {name: "Rain", nimg: "./images/modrain.png", dimg: "./images/lightrain.png"},
    501: {name: "Rain", nimg: "./images/modrain.png", dimg: "./images/lightrain.png"},
    502: {name: "Rain", img: "./images/modrain.png"},
    503: {name: "Rain", img: "./images/modrain.png"},
    504: {name: "Rain", img: "./images/modrain.png"},
    511: {name: "Rain", img: "./images/heavyrain.png"},
    520: {name: "Rain", img: "./images/heavyrain.png"},
    521: {name: "Rain", img: "./images/heavyrain.png"},
    522: {name: "Rain", img: "./images/heavyrain.png"},
    531: {name: "Rain", img: "./images/heavyrain.png"},
    600: {name: "Snow", img: "./images/snow.png"},
    601: {name: "Snow", img: "./images/snow.png"},
    602: {name: "Snow", img: "./images/snow.png"},
    611: {name: "Snow", img: "./images/snow.png"},
    612: {name: "Snow", img: "./images/snow.png"},
    613: {name: "Snow", img: "./images/snow.png"},
    615: {name: "Snow", img: "./images/snow.png"},
    616: {name: "Snow", img: "./images/snow.png"},
    620: {name: "Snow", img: "./images/snow.png"},
    621: {name: "Snow", img: "./images/snow.png"},
    622: {name: "Snow", img: "./images/snow.png"},
    701: {name: "Mist", img: "./images/mist.png"},
    711: {name: "Smoke", img: "./images/mist.png"},
    721: {name: "Haze", img: "./images/mist.png"},
    731: {name: "Dust", img: "./images/mist.png"},
    741: {name: "Fog", img: "./images/mist.png"},
    751: {name: "Sand", img: "./images/mist.png"},
    761: {name: "Dust", img: "./images/mist.png"},
    762: {name: "Ash", img: "./images/mist.png"},
    771: {name: "Squall", img: "./images/mist.png"},
    781: {name: "Tornado", img: "./images/tornado.png"},
    800: {name: "Clear", nimg: "./images/moon.png", dimg: "./images/sun.png"},
    801: {name: "Clouds", nimg: "./images/cloud1n.png", dimg: "./images/cloud1s.png"},
    802: {name: "Clouds", img: "./images/cloud3.png"},
    803: {name: "Clouds", img: "./images/cloud4.png"},
    804: {name: "Clouds", img: "./images/cloud4.png"}
}

const daysOfWeek = 
["Domingo", "Segunda-Feira", "Ter&ccedil;a-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "S&aacute;bado"];

const months = 
["Janeiro","Fevereiro","Mar&ccedil;o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

const validate = async (i) =>
{
    const vr = /^[a-zA-Z\s,\p{Script=Latin}+]+$/igu;
    const errorBox = document.getElementById("error-message");

    if(i?.value)
    {
        if(vr.test(i?.value))
        {   
            document.getElementById("loader").style.display = "flex";
            await fetchWeather(i?.value?.toLowerCase());
        }
        else
        {
            errorBox.innerText = "Apenas letras para cidades.";
            errorBox.animate([
            {visibility: "visible", opacity: 1, color: "rgb(255, 207, 50)", backgroundColor: "rgba(122, 80, 0, 0.2)", borderColor: "orange"},
            {opacity: 0, visibility: "hidden"}], {duration: 5500, easing: "ease-in-out"});
        }
    }
    else
    {
        errorBox.innerText = "Insira uma cidade.";
        errorBox.animate([
        {visibility: "visible", opacity: 1, color: "rgb(255, 207, 50)", backgroundColor: "rgba(122, 80, 0, 0.2)", borderColor: "orange"},
        {opacity: 0, visibility: "hidden"}], {duration: 5500, easing: "ease-in-out"});
    }
}

const fetchWeather = async (city, lat, lon, id) =>
{   
    const errorBox = document.getElementById("error-message");

    if(city && (!lat || !lon) && !id)
    {
        const weather = await fetch(`https://api.herokuapp.com/weather?name=${city}`,
        {credentials: "include", 
        headers: {"Access-Control-Allow-Origin": "https://api.herokuapp.com"}})
        .then(async (res) => 
        {return await res.json().then((data) => {return data;})})
        .catch((err) => 
        {
            document.getElementById("loader").style.display = "none";
            errorBox.innerText = "Erro, tente novamente.";
            errorBox.animate([
            {visibility: "visible", opacity: 1, color: "pink", backgroundColor: "rgba(155, 0, 0, 0.075)", borderColor: "red"},
            {opacity: 0, visibility: "hidden"}], {duration: 5500, easing: "ease-in-out"});

            return null;
        });

        if(!weather?.error)
        {
            showWeather(weather);
        }
        else
        {
            document.getElementById("loader").style.display = "none";
            errorBox.innerHTML = weather.error;
            errorBox.animate([
            {visibility: "visible", opacity: 1, color: "pink", backgroundColor: "rgba(155, 0, 0, 0.075)", borderColor: "red"},
            {opacity: 0, visibility: "hidden"}], {duration: 5500, easing: "ease-in-out"});
        }
    }
    else if(!city && lat && lon)
    {
        const weather = await fetch(`https://api.herokuapp.com/weather?lat=${lat}&lon=${lon}`,
        {credentials: "include", 
        headers: {"Access-Control-Allow-Origin": "https://api.herokuapp.com"}})
        .then(async (res) => 
        {return await res.json().then((data) => {return data;})})
        .catch((err) => 
        {
            document.getElementById("loader").style.display = "none";
            errorBox.innerText = "Erro, tente novamente.";
            errorBox.animate([
            {visibility: "visible", opacity: 1, color: "pink", backgroundColor: "rgba(155, 0, 0, 0.075)", borderColor: "red"},
            {opacity: 0, visibility: "hidden"}], {duration: 5500, easing: "ease-in-out"});

            return null;
        });

        if(!weather?.error)
        {
            showWeather(weather);
        }
        else
        {
            document.getElementById("loader").style.display = "none";
            errorBox.innerHTML = weather.error;
            errorBox.animate([
            {visibility: "visible", opacity: 1, color: "pink", backgroundColor: "rgba(155, 0, 0, 0.075)", borderColor: "red"},
            {opacity: 0, visibility: "hidden"}], {duration: 5500, easing: "ease-in-out"});
        }
    }
}

const animateSections = () =>
{
    document.querySelectorAll(".weathers").forEach((ws, i) =>
    {
        ws.animate([{opacity: 0}, {opacity: 1}], {duration: 1200*(i+1)})
        .onfinish = () => {ws.style.opacity = "1"};
    });
}

const getLocalHours = (date, timezone) =>
{
    const tmzDiff = Math.round(timezone/60/60);
    let localHours = 0;

    if(date.getUTCHours() + tmzDiff < 24)
    {
        localHours = (date.getUTCHours() + tmzDiff) > 9 ? (date.getUTCHours() + tmzDiff) : "0".concat((date.getUTCHours() + tmzDiff));
    }
    else
    {
        localHours = ((date.getUTCHours() + tmzDiff)-24) > 9 ? 
        ((date.getUTCHours() + tmzDiff)-24) : 
        "0".concat(((date.getUTCHours() + tmzDiff)-24));
    }

    return localHours;
}

const updateTime = (timezone) =>
{
    return setInterval(() =>
    {
        const now = new Date();

        if(document.getElementById("local-time").innerHTML !== `${daysOfWeek[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]}, ${getLocalHours(now, timezone)}:${now.getMinutes() > 9 ? ""+now.getMinutes() : "0"+now.getMinutes()}`)
        {
            document.getElementById("local-time").innerHTML = 
            `${daysOfWeek[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]}, ${getLocalHours(now, timezone)}:${now.getMinutes() > 9 ? ""+now.getMinutes() : "0"+now.getMinutes()}`;
        }

    }, 1000);
}

const getIcon = (localhours, id) =>
{
    let icon = null;

    if(localhours > 6 && localhours < 19)
    {
        icon = weatherConditions[id]?.dimg || weatherConditions[id]?.img;
    }
    else if(localhours >= 19 || (localhours >= 0 && localhours <= 6))
    {
        icon = weatherConditions[id]?.nimg || weatherConditions[id]?.img;
    }

    return icon;
}

const getBackground = (localhours, condition = "Clear") =>
{
    let bg = null;

    if(localhours > 6 && localhours < 19)
    {
        switch(condition)
        {
            case "Rain":
            {
                bg = "gray, rgb(150,150,150)";
                break;
            }
            case "Clouds":
            {
                bg = "cornflowerblue, dodgerblue";
                break;
            }
            case "Clear":
            {
                bg = "cornflowerblue, rgb(0, 88, 177)";
                break;
            }
            default:
            {
                bg = "cornflowerblue, rgb(0, 88, 177)";
                break;
            }
        }
    }
    else if(localhours >= 19 || (localhours >= 0 && localhours <= 6))
    {
        switch(condition)
        {
            case "Rain":
            {
                bg = "rgb(10,10,10), rgb(50,50,50)";
                break;
            }
            case "Clouds":
            {
                bg = "rgb(10,10,10), rgb(50,50,50)";
                break;
            }
            case "Clear":
            {
                bg = "black, rgb(40,40,40)";
                break;
            }
            default:
            {
                bg = "black, rgb(40,40,40)";
                break;
            }
        }
    }

    return bg;
}

const getLocalDay = (date, timezone) =>
{
    let localday = date.getUTCDate();
    let tmz = Math.abs(timezone);

    if((dt.getUTCHours() + (-tmz)) > (dt.getUTCHours() + (tmz)-24))
    {
        localday++;
    }

    return localday;
}

const showWeather = (weather) =>
{
    if(weather)
    {
        document.getElementById("welcome").style.display = "none";
        document.querySelectorAll(".weathers").forEach((ws) => ws.style.display = "flex");
        document.querySelectorAll(".separator").forEach((s) => s.style.display = "flex");
        document.querySelector(".bottom-nav").style.visibility = "visible";
        localStorage.setItem("TempUnit", "Celsius");

        const date = new Date();

        document.getElementById("weather-date").innerText = 
        `Atualizado ${date.getDate() > 9 ? date.getDate() : "0"+date.getDate()}/${date.getMonth()+1 > 9 ? date.getMonth()+1 : "0"+date.getMonth()+1}/${date.getFullYear()}, ${date.getHours() > 9 ? date.getHours() : "0"+date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : "0"+date.getMinutes()}.`; // setup counting in localStorage
        document.getElementById("city").innerHTML = `${weather.name}, ${weather.sys.country}`;
        document.getElementById("temp").innerHTML = `${weather.main?.temp.toFixed(1)}`;
        document.getElementById("status").innerText = weather.weather[0]?.description
        .replace(weather.weather[0]?.description.charAt(0), weather.weather[0]?.description.charAt(0).toUpperCase());
        document.getElementById("feels-like").innerHTML = `${weather.main.feels_like.toFixed(1)}`;

        document.getElementById("min").innerHTML = `${weather.main.temp_min.toFixed(1)}`;
        document.getElementById("max").innerHTML = `${weather.main.temp_max.toFixed(1)}`;

        document.getElementById("humidity").innerText = `${weather.main.humidity}`;
        document.getElementById("pressure").innerText = `${weather.main.grnd_level || weather.main.pressure}`;
        document.getElementById("visibility").innerText = `${(weather.visibility/1000).toFixed(1)}`;
        
        document.getElementById("wind-speed").innerText = `${weather.wind.speed}`;

        document.getElementById("weather-icon").src = getIcon(getLocalHours(date, weather.timezone), weather.weather[0].id);

        document.querySelector("main").style.backgroundImage = 
        `radial-gradient(${getBackground(getLocalHours(date, weather.timezone), weatherConditions[weather.weather[0].id].name)})`;
        
        document.getElementById("local-time").innerHTML = 
        `${daysOfWeek[date.getDay()]}, ${getLocalDay(date, weather.timezone)} de ${months[date.getMonth()]},
        ${getLocalHours(date, weather.timezone)}:${date.getMinutes() > 9 ? ""+date.getMinutes() : "0"+date.getMinutes()}`;

        updateTime(weather.timezone);

        document.getElementById("loader").animate([{opacity: 1}, {opacity: 0}], {duration: 750})
        .onfinish = () => {document.getElementById("loader").style.display = "none"; animateSections();};
    }
}

/* FEATURE DISABLED TEMPORARILY, WORK IN PROGRESS...
document.getElementById("search-input").addEventListener("blur", (e) =>
{
    const citiesList = document.getElementById("cities-list");

    if(!e.target.value)
    {
        document.getElementById("cities-list").style.display = "none";
        for(let i = 0; i < citiesList.children.length; i++)
        {
            citiesList.children[i].remove();
        }
    }


    const loading = document.createElement("p");
    loading.classList.add("loading");
    loading.innerHTML = "Carregando cidades...";
    citiesList.appendChild(loading);
});
document.getElementById("search-input").addEventListener("input", async (e) =>
{
    const citiesList = document.getElementById("cities-list");

    if(e.target.value)
    {
        document.getElementById("cities-list").style.display = "flex";
    }
    else if(!e.target.value || e.target.value?.length < 4)
    {
        document.getElementById("cities-list").style.display = "none";
        for(let i = 0; i < citiesList.children.length; i++)
        {
            citiesList.children[i].remove();
        }
    }

    if(e.target.value.length > 3)
    {
        const cities = await fetch(`https://api.herokuapp.com/cities?name=${e.target.value}`,
        {credentials: "include", 
        headers: {"Access-Control-Allow-Origin": "https://api.herokuapp.com"}})
        .then(async (res) => 
        {return await res.json().then((data) =>
        {   
            return data;
        })})
        .catch((err) => 
        {
            console.log(err);

            return null;
        });

        if(cities.length)
        {
            for(let i = 0; i < citiesList.children.length; i++)
            {
                citiesList.children[i].remove();
            }

            cities.forEach((c) =>
            {
                const city = document.createElement("li");
                city.classList.add("city");
                city.id = c.id;
                const cityName = document.createElement("p");
                cityName.classList.add("city-name-location");
                cityName.innerHTML = `${c.name}, ${c.country}`;

                city.appendChild(cityName);
                citiesList.appendChild(city);
            });
        }
        else if(cities.id)
        {
            for(let i = 0; i < citiesList.children.length; i++)
            {
                citiesList.children[i].remove();
            }

            const city = document.createElement("li");
            city.classList.add("city");
            city.id = cities.id;
            const cityName = document.createElement("p");
            cityName.classList.add("city-name-location");
            cityName.innerHTML = `${cities.name}, ${cities.country}`;

            city.appendChild(cityName);
            citiesList.appendChild(city);
        }
        else if(cities.error)
        {
            
        }
    }
});
*/

document.querySelectorAll(".weather-fetch-form").forEach((f) =>
{
    f.addEventListener("submit", function(e)
    {
        e.preventDefault();
        validate(document.getElementById("search-input"));
    });
});

document.querySelectorAll(".submit-btn").forEach((b) =>
{
    b.addEventListener("click", function(e)
    {
        e.preventDefault();
        validate(document.getElementById("search-input"));
    });
});

document.querySelectorAll(".submit-dl-btn").forEach((b) =>
{
    b.addEventListener("click", function(e)
    {
        e.preventDefault();
        
        navigator.geolocation.getCurrentPosition(async (pos) => 
        {
            document.getElementById("loader").style.display = "flex";
            await fetchWeather(null, pos.coords.latitude, pos.coords.longitude);
        }, 
        (err) => 
        {
            const errorBox = document.getElementById("error-message");
            errorBox.innerHTML = "Acesso &agrave; localiza&ccedil;&atilde;o negado.";
            errorBox.animate([
            {visibility: "visible", opacity: 1, color: "rgb(255, 207, 50)", backgroundColor: "rgba(122, 80, 0, 0.2)", borderColor: "orange"},
            {opacity: 0, visibility: "hidden"}], {duration: 5500, easing: "ease-in-out"});
        });
    });
});

function initUnits()
{
    if(localStorage.getItem("TempUnit") === "Celsius")
    {
    }
    else
    {
        document.querySelectorAll(".thermo-unit").forEach((u) => u.innerText = "F");
        document.querySelectorAll(".thermo-unit-c").forEach((u) => u.innerText = "C");
        document.querySelectorAll(".thermo-value").forEach((v) => 
        {if(!isNaN(parseFloat(v.innerText))) {v.innerText = ((parseFloat(v.innerText)*1.8)+32).toFixed(1);}});
    }
}
initUnits();

function setUnits()
{
    if(localStorage.getItem("TempUnit") === "Celsius")
    {
        document.querySelectorAll(".thermo-unit").forEach((u) => u.innerText = "F");
        document.querySelectorAll(".thermo-unit-c").forEach((u) => u.innerText = "C");
        document.querySelectorAll(".thermo-value").forEach((v) => 
        {if(!isNaN(parseFloat(v.innerText))) {v.innerText = ((parseFloat(v.innerText)*1.8)+32).toFixed(1);}});
        localStorage.setItem("TempUnit", "Fahrenheit");
    }
    else
    {
        document.querySelectorAll(".thermo-unit").forEach((u) => u.innerText = "C");
        document.querySelectorAll(".thermo-unit-c").forEach((u) => u.innerText = "F");
        document.querySelectorAll(".thermo-value").forEach((v) => 
        {if(!isNaN(parseFloat(v.innerText))) {v.innerText = ((parseFloat(v.innerText)-32)*5/9).toFixed(1);}});
        localStorage.setItem("TempUnit", "Celsius");
    }
}

document.querySelectorAll(".convert-button").forEach((cb) =>
{
    cb.addEventListener("click", function(e)
    {
        setUnits();
    });
});