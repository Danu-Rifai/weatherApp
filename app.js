// Ambil elemen HTML yang mau diubah
const hariElement = document.querySelector(".hari");
const tanggalElement = document.querySelector(".tanggal");

// Daftar nama hari dan bulan dalam bahasa Indonesia
const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

// Ambil waktu saat ini
const now = new Date();

// Ambil nama hari, tanggal, dan nama bulan dari waktu saat ini
const dayName = days[now.getDay()];       // Contoh: "Rabu"
const date = now.getDate();               // Contoh: 6
const monthName = months[now.getMonth()]; // Contoh: "Agustus"

// Masukkan data ke elemen HTML
hariElement.textContent = `${dayName},`;
tanggalElement.textContent = `${date} ${monthName}`;

//get data from OpenWeatherAPI

// =======================
// KONFIGURASI API
// =======================
const apiKey = "a2721393113508dae02625aa94291a9b"; // Ganti dengan API key milikmu

// =======================
// AUTO FULLSCREEN SAAT REFRESH
// =======================
window.addEventListener("load", () => {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(err => {
            console.warn(`Tidak bisa masuk fullscreen otomatis: ${err.message}`);
        });
    }
    // Setelah masuk fullscreen → ambil cuaca lokasi user
    getUserLocation();
});

// =======================
// AMBIL LOKASI USER
// =======================
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                getWeatherByLocation(lat, lon);
            },
            error => {
                console.warn("Tidak bisa ambil lokasi, tampilkan default Jakarta.");
                getWeatherByCity("Jakarta");
            }
        );
    } else {
        console.warn("Browser tidak mendukung geolocation.");
        getWeatherByCity("Jakarta");
    }
}

// =======================
// FUNGSI AMBIL CUACA PAKAI KOORDINAT
// =======================
function getWeatherByLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=id`;
    fetchWeather(url);
}

// =======================
// FUNGSI AMBIL CUACA PAKAI NAMA KOTA
// =======================
function getWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`;
    fetchWeather(url);
}

// =======================
// FETCH DATA CUACA & TAMPILKAN KE HTML
// =======================
function fetchWeather(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data); // Debug

            // Ambil elemen
            const cityElem = document.querySelector(".city");
            const suhuElem = document.querySelector(".suhu");
            const noteElem = document.querySelector(".note");
            const iconElem = document.querySelector(".icon img");
            const humidityElem = document.querySelector(".humidityInfo span:last-child");
            const windElem = document.querySelector(".windInfo span:last-child");

            // Isi data dari API
            cityElem.textContent = data.name;
            suhuElem.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
            noteElem.textContent = data.weather[0].description;
            humidityElem.textContent = `${data.main.humidity}%`;
            windElem.textContent = `${data.wind.speed} m/s`;

            // Ganti ikon cuaca
            const iconCode = data.weather[0].icon;
            iconElem.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            // Update tanggal & hari
            updateDate();
        })
        .catch(err => {
            console.error("Gagal mengambil data cuaca:", err);
        });
}

// =======================
// UPDATE TANGGAL & HARI
// =======================
function updateDate() {
    const hariElem = document.querySelector(".hari");
    const tanggalElem = document.querySelector(".tanggal");

    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const now = new Date();
    hariElem.textContent = `${days[now.getDay()]},`;
    tanggalElem.textContent = `${now.getDate()} ${months[now.getMonth()]}`;
}

// =======================
// EVENT SEARCH
// =======================
document.querySelector(".input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        let city = e.target.value.trim();
        if (city) {
            getWeatherByCity(city);
            e.target.value = "";
        }
    }
});
