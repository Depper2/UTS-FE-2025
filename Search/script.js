//searchfunc
function search() {
  const query = document.getElementById("searchInput").value;
  alert("Kamu cari: " + query);
}

document.getElementById("searchInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    search();
  }
});

