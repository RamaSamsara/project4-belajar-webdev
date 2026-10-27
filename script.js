/* ========================================== */
/* 1. KONFIGURASI API & KUNCI (API CONFIG)    */
/* ========================================== */
// Menggunakan API Key publik cadangan untuk pembelajaran
const API_KEY = "bd5e378503939ddaee76f12ad7a97608"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

/* ========================================== */
/* 2. MENGAMBIL ELEMEN HTML (DOM SELECTION)   */
/* ========================================== */
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

const welcomePrompt = document.getElementById("welcome-prompt");
const weatherDisplay = document.getElementById("weather-display");
const messageContainer = document.getElementById("message-container");
const errorMessage = document.getElementById("error-message");

const cityName = document.getElementById("city-name");
const currentDate = document.getElementById("current-date");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");
const weatherIcon = document.getElementById("weather-icon");

const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const pressure = document.getElementById("pressure");
const airQuality = document.getElementById("air-quality");

/* ========================================== */
/* 3. EVENT LISTENERS                         */
/* ========================================== */
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

// Memungkinkan pencarian dengan menekan tombol "Enter" di keyboard
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    }
});

/* ========================================== */
/* 4. FUNGSI ASYNCHRONOUS FETCH API           */
/* ========================================== */
async function getWeatherData(cityNameQuery) {
    try {
        // Sembunyikan pesan sambungan awal dan error sebelumnya, tampilkan loading/proses
        welcomePrompt.classList.add("hide");
        messageContainer.classList.add("hide");
        weatherDisplay.classList.add("hide");

        // Membentuk URL permintaan ke server OpenWeatherMap
        const url = `${BASE_URL}?q=${cityNameQuery}&units=metric&appid=${API_KEY}&lang=id`;

        // Menunggu respons dari server secara asynchronous
        const response = await fetch(url);

        // Jika kota tidak ditemukan (status 404 dari server)
        if (!response.ok) {
            throw new Error("Kota tidak ditemukan. Periksa kembali pengetikan nama kota.");
        }

        // Mengubah data mentah menjadi format JSON
        const data = await response.json();

        // Tampilkan data ke antarmuka web
        displayWeatherData(data);

    } catch (error) {
        // Penanganan error (Handling Error State)
        showError(error.message);
    }
}

/* ========================================== */
/* 5. MENAMPILKAN DATA KE DOM                 */
/* ========================================== */
function displayWeatherData(data) {
    // Mengisi elemen teks dengan data dari JSON API
    cityName.innerText = `${data.name}, ${data.sys.country}`;
    
    // Format tanggal sederhana
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDate.innerText = new Date().toLocaleDateString('id-ID', options);

    temperature.innerText = `${Math.round(data.main.temp)}°C`;
    weatherDescription.innerText = data.weather[0].description;
    
    // Mengambil ikon cuaca resmi dari server OpenWeatherMap
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Detail tambahan
    humidity.innerText = `${data.main.humidity}%`;
    windSpeed.innerText = `${data.wind.speed} m/s`;
    pressure.innerText = `${data.main.pressure} hPa`;
    
    // Simulasi kualitas udara sederhana berdasarkan kelembapan/tekanan
    airQuality.innerText = data.main.humidity > 80 ? "Kurang Sehat" : "Baik (Good)";

    // Tampilkan kartu cuaca di layar
    weatherDisplay.classList.remove("hide");
}

/* ========================================== */
/* 6. MENANGANI KONDISI ERROR                 */
/* ========================================== */
function showError(message) {
    errorMessage.innerText = message;
    messageContainer.classList.remove("hide");
}


// COUNGTING 1, 2,