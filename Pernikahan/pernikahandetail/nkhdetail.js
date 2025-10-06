const urlParams = new URLSearchParams(window.location.search);
const adatId = urlParams.get('adat');

if (!urlParams.has('adat')) {
  window.location.href = window.location.pathname + '?adat=' + adatId;
}

fetch('nikahdetail.json')
  .then(res => res.json())
  .then(data => {
    const adat = data.find(a => a.id === adatId);
    if (!adat) {
      console.error("Adat tidak ditemukan!");
      return;
    }

    document.getElementById('namaAdat').innerText = adat.nama;
    document.getElementById('asalAdat').innerText = adat.asal;
    document.getElementById('kategoriAdat').innerText = adat.kategori;
    document.getElementById('latarAdat').innerHTML = adat.latar_belakang;
    document.getElementById('penjelasanAdat').innerHTML = adat.penjelasan;

    document.getElementById('sumberLink').href = adat.sumber;
    document.getElementById('videoLink').href = adat.video;

    const gambarEl = document.getElementById("gambarUtama");
    gambarEl.src = adat.gambarUtama || (adat.galeri?.[0] ?? "default.jpg");
    gambarEl.alt = `Foto ${adat.nama}`;

    const galeriContainer = document.getElementById('galeriContainer');
    const galeriSection = document.querySelector('.galeri');

    if (adat.galeri && adat.galeri.length > 0) {
      adat.galeri.forEach((imgSrc, index) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `Foto ${adat.nama} - ${index + 1}`;
        if (index === 0) img.classList.add('active');
        galeriContainer.appendChild(img);
      });

      let slideIndex = 0;
      const slides = galeriContainer.getElementsByTagName('img');

      function showSlide(index) {
        for (let i = 0; i < slides.length; i++) {
          slides[i].classList.remove('active');
        }
        slides[index].classList.add('active');
      }

      document.querySelector('.prev').addEventListener('click', () => {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        showSlide(slideIndex);
      });

      document.querySelector('.next').addEventListener('click', () => {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
      });

    } else {
      galeriSection.style.display = 'none';
    }
  })
  .catch(err => console.error("Error fetch JSON:", err));
