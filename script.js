// navbar
const nav = document.getElementById("home");

window.addEventListener("scroll", function () {
  scrollposition = window.scrollY;

  if (scrollposition >= 70) {
    nav.classList.add("navbar");
  } else if (this.scrollposition <= 70) {
    nav.classList.remove("navbar");
  }
});

// end nvabar

// Photo family
const carousel = document.querySelector(".carousel"),
  firstImg = carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const showHideIcons = () => {
  // menampilkan dan menyembunyikan ikon prev/next berdasarkan nilai gulir kiri carousel
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // mendapatkan lebar gulir maksimum
  arrowIcons[0].style.display = carousel.scrollLeft <= 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft >= scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    // jika ikon yang diklik berada di sebelah kiri, kurangi nilai lebar dari gulir korsel ke kiri, jika tidak, tambahkan ke dalamnya
    let firstImgWidth = firstImg.clientWidth + 14; // mendapatkan lebar img pertama & menambahkan nilai margin 14
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60); // memanggil showHideIcons setelah 60ms
  });
});

const autoSlide = () => {
  // jika tidak ada gambar tersisa untuk digulir maka kembali dari sini
  if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth)
    return;

  positionDiff = Math.abs(positionDiff); // membuat nilai positionDiff menjadi positif
  let firstImgWidth = firstImg.clientWidth + 14;
  // mendapatkan nilai perbedaan yang perlu ditambahkan atau dikurangi dari carousel kiri untuk mengambil gambar tengah tengah
  let valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    // jika pengguna menggulir ke kanan
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }
  // jika pengguna menggulir ke kiri
  carousel.scrollLeft -=
    positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (e) => {
  // memperbarui nilai variabel global pada acara mouse turun
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  // Menggulir gambar/carousel ke kiri sesuai dengan penunjuk tetikus
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");

  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);

window.addEventListener("resize", showHideIcons); // Panggil saat perubahan ukuran layar

showHideIcons(); // Panggil saat inisialisasi untuk menyembunyikan ikon yang tidak perlu

//end photo family

// Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

document.getElementById("search-google").addEventListener("click", search);
function search() {
  let value = document.getElementById("search-box").value;
  const baseUrl = "https://google.com/search?q=";
  if (!value) value = "Novel Wattimena";
  location.href = baseUrl + encodeURIComponent(value);
}

//end toggle search

//parallax
let paralax = document.getElementById("paralax");
let element = document.getElementById("element");

window.addEventListener("scroll", () => {
  let value = window.scrollY;

  paralax.style.marginTop = value * 0.8 + "px";
  element.style.marginTop = value * 0.5 + "px";
});
//end parallax

// Password
const webnovel = document.querySelector("#welcome-message");

let nama = localStorage.getItem("nama");
const usernameRegex = /^[aA-zZ ]{10,}$/; // regex untuk username dengan minimal 5 karakter

while (!nama || nama.trim() === "" || !usernameRegex.test(nama.trim())) {
  const confirmed = confirm("Do you want to enter your name? 😁");

  if (!confirmed) {
    window.location.href = "about:blank"; // keluar dari halaman
    break;
  }

  nama = prompt("Hello, what is your username? ✋");

  if (nama === null || nama.trim() === "" || !usernameRegex.test(nama.trim())) {
    alert(
      "You need to provide a valid username to use this site. Please make sure your username contains at least 10 characters and consists of only letters, and underscores. 🙏"
    );
  } else {
    localStorage.setItem("nama", nama);
    alert(`Hello ${nama}, welcome to my web! 😍`);
    window.location.href = "index.html"; // masuk ke dalam halaman
  }
}
if (nama && nama.trim() !== "") {
  alert(`Hi ${nama}, welcome back to my web! 😇`);
}
//end password

// type.js
