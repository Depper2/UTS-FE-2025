$(document).ready(function () {
  function loadComment() {
    $(".kolomkomen").html("");
    let komentar = JSON.parse(localStorage.getItem("komentar")) || [];
    komentar.forEach(k => {
      let komenHTML = `
            <div class="komen" data-id="${k.id}">
              <div class="info"><strong>${k.nama}</strong> • ${k.tanggal}</div>
              <div class="isikomen">${k.komen}</div>
              <div class="fiturkomen">
                <button class="komenbtn edit">Edit</button>
                <button class="komenbtn hapus">Hapus</button>
              </div>
            </div>
          `;
      $(".kolomkomen").prepend(komenHTML);
    });
  }



  $(".submitbtn").click(function () {
    let nama = $(".nama").val().trim();
    let komen = $(".komentar").val().trim();

    if (nama.length < 5 || nama.length > 15) {
      alert("Nama harus antara 5 sampai 15 karakter");
      return;
    }
    if (komen.length === 0) {
      alert("Komentar tidak boleh kosong!");
      return;
    }
    if (komen.length > 128) {
      alert("Komentar maksimal 128 karakter");
      return;
    }

    let user = {
      id: Date.now(),
      nama: nama,
      komen: komen,
      tanggal: new Date().toLocaleString("id-ID")
    };

    let komentar = JSON.parse(localStorage.getItem("komentar")) || [];
    komentar.push(user);
    localStorage.setItem("komentar", JSON.stringify(komentar));
    loadComment();

    $(".nama").val("");
    $(".komentar").val("");
    location.reload();
  });

  $(document).on("click", ".hapus", function () {
    let id = $(this).closest(".komen").data("id");
    let komentar = JSON.parse(localStorage.getItem("komentar")) || [];
    komentar = komentar.filter(k => k.id !== id);
    localStorage.setItem("komentar", JSON.stringify(komentar));
    loadComment();
    location.reload();
  });

  $(document).on("click", ".edit", function () {
    let $komenDiv = $(this).closest(".komen");
    let id = $komenDiv.data("id");
    let text = $komenDiv.find(".isikomen").text();

    $komenDiv.find(".isikomen").html(`<textarea class="kolomedit" rows="3" maxlength="128">${text}</textarea>`);

    $(this).replaceWith(`<button class="komenbtn savebtn">Simpan</button>`);
  });

  $(document).on("click", ".savebtn", function () {
    let $komenDiv = $(this).closest(".komen");
    let id = $komenDiv.data("id");
    let editkomen = $komenDiv.find(".kolomedit").val().trim();

    if (editkomen.length === 0) {
      alert("Komentar tidak boleh kosong!");
      return;
    }
    if (editkomen.length > 128) {
      alert("Komentar maksimal 128 karakter!");
      return;
    }

    let komentar = JSON.parse(localStorage.getItem("komentar")) || [];
    komentar = komentar.map(k => {
      if (k.id === id) {
        k.komen = editkomen;
        k.tanggal = new Date().toLocaleString("id-ID").concat(" • Edited");
      }
      return k;
    });

    localStorage.setItem("komentar", JSON.stringify(komentar));
    loadComment();
  });

  loadComment();

  if ($(".kolomkomen").children().length === 0) {
    $(".empty").show();
  } else {
    $(".empty").hide();
    console.log("nice", $(".kolomkomen").length);
  }
});
