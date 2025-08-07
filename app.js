// Ambil elemen HTML yang mau diubah
const hariElement = document.querySelector(".hari");
const tanggalElement = document.querySelector(".tanggal");


const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];


const now = new Date();


const dayName = days[now.getDay()];       
const date = now.getDate();               
const monthName = months[now.getMonth()]; 


hariElement.textContent = `${dayName},`;
tanggalElement.textContent = `${date} ${monthName}`;

const API_KEY = "a2721393113508dae02625aa94291a9b";

// 1. Ambil data cuaca dari API berdasarkan koordinat
async function getWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=id`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Gagal mengambil data cuaca");
        const data = await res.json();
        updateUI(data);
    } catch (error) {
        console.error(error);
    }
}


async function getWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=id`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Kota tidak ditemukan");
        const data = await res.json();
        updateUI(data);
    } catch (error) {
        console.error(error);
        alert("Kota tidak ditemukan atau terjadi kesalahan.");
    }
}


function updateUI(data) {
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".suhu").innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    document.querySelector(".note").textContent = data.weather[0].description;
    document.querySelector(".humidityInfo span:last-child").textContent = `${data.main.humidity}%`;
    document.querySelector(".windInfo span:last-child").textContent = `${data.wind.speed} m/s`;

    
    const iconCode = data.weather[0].icon; 
    document.querySelector(".icon img").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                getWeatherByCoords(lat, lon);
            },
            (err) => {
                console.warn("User menolak akses lokasi, gunakan default.");
                getWeatherByCity("Jakarta");
            }
        );
    } else {
        console.warn("Geolocation tidak didukung browser.");
        getWeatherByCity("Jakarta");
    }
}

function setupSearch() {
    const input = document.querySelector(".input");
    const searchIcon = document.querySelector(".searchBar svg");

    function search() {
        const city = input.value.trim();
        if (city) {
            getWeatherByCity(city);
            input.value = "";
        }
    }

    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") search();
    });

    searchIcon.addEventListener("click", search);
}

function init() {
    getUserLocation();
    setupSearch();
}

document.addEventListener("DOMContentLoaded", init);
