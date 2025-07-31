const images = [
  'asset/SLIDESHOW/gambar01.JPG',
  'asset/SLIDESHOW/gambar02.JPG',
  'asset/SLIDESHOW/gambar03.JPG',
  'asset/SLIDESHOW/gambar04.JPG',
  'asset/SLIDESHOW/gambar05.JPG',
  'asset/SLIDESHOW/gambar06.JPG',
  'asset/SLIDESHOW/gambar07.JPG'
];

let current = 0;
const slideshowContainer = document.querySelector('.slideshow-container');
const transitionTime = 600; // samakan dengan durasi transisi di CSS (0.6s)

// Preload semua gambar untuk performa lebih baik
images.forEach(src => {
  const preload = new Image();
  preload.src = src;
});

function showNextImage() {
  // 1. Tentukan gambar lama yang sedang aktif
  const oldImg = slideshowContainer.querySelector('.slide-img');

  // 2. Tentukan indeks gambar berikutnya
  current = (current + 1) % images.length;

  // 3. Buat elemen <img> baru untuk gambar berikutnya
  const newImg = document.createElement('img');
  newImg.src = images[current];
  newImg.className = 'slide-img'; // Beri kelas dasar (opacity: 0)
  slideshowContainer.appendChild(newImg);

  // 4. Setelah gambar baru ditambahkan ke DOM, beri kelas 'active' agar fade in
  // Timeout kecil diperlukan agar browser sempat 'melihat' elemen baru sebelum memulai transisi
  setTimeout(() => {
    newImg.classList.add('active');
  }, 50);

  // 5. Hapus kelas 'active' dari gambar lama agar fade out
  if (oldImg) {
    oldImg.classList.remove('active');
  }

  // 6. Hapus elemen gambar lama dari DOM setelah transisi selesai
  setTimeout(() => {
    if (oldImg) {
      slideshowContainer.removeChild(oldImg);
    }
  }, transitionTime); // Waktu harus sama dengan transisi CSS
}

// Jalankan saat halaman pertama kali dimuat
window.addEventListener('DOMContentLoaded', () => {
  // Tampilkan gambar pertama secara langsung tanpa transisi awal
  const initialImg = document.createElement('img');
  initialImg.src = images[0];
  initialImg.className = 'slide-img active';
  slideshowContainer.appendChild(initialImg);
  
  // Mulai slideshow
  setInterval(showNextImage, 5000);
});

document.getElementById('hamburger').onclick = function() {
  document.getElementById('navLinks').classList.toggle('show');
};

/* ...DENGAN KODE BARU INI */
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.agenda-slide');
  const bgImgs = document.querySelectorAll('.agenda-bg-img');
  const textItems = document.querySelectorAll('.agenda-text-item');

  // Fungsi untuk mengupdate semua elemen ke index yang dipilih
  function setActiveSlide(selectedIndex) {
    // 1. Update Background Image
    bgImgs.forEach((img, index) => {
      img.classList.toggle('active', index === selectedIndex);
    });

    // 2. Update Text
    textItems.forEach((item, index) => {
      item.classList.toggle('active', index === selectedIndex);
    });

    // 3. Update Thumbnail (memberi efek perbesaran)
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === selectedIndex);
    });
  }

  // Tambahkan event listener untuk setiap thumbnail
  slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      setActiveSlide(index);
    });
  });

  // Atur slide pertama sebagai aktif saat halaman pertama kali dimuat
  if (slides.length > 0) {
    setActiveSlide(0);
  }
});