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
