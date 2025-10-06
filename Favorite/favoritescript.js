$(document).ready(function () {
    const $favorite = $(".adatlistcontainer .adatlist #favorite-icon");
    let fav = JSON.parse(localStorage.getItem("myfav")) || [];

    $(".emptyfav").hide();
    $(".adatlistcontainer .adatlist").hide();
    $(".adatlistcontainer .adatlist").each(function () {
        let adat = $(this).find("i").data("name");
        if (fav.includes(adat)) {
            $(this).show();
        }
    });

    if (fav.length === 0) {
        $(".emptyfav").show();
    }
    else {
        $(".emptyfav").hide();
    }

    $favorite.on("click", function () {
        let favorited = $(this).data("name");
        let favicon=JSON.parse(localStorage.getItem("iconfav"));

        $(".adatlistcontainer .adatlist").each(function () {
            if (fav.includes(favorited)) {
                fav = fav.filter(f => f !== favorited);
                console.log("Test",fav);
                $(this).hide();
                return;
            }
        });
        
        localStorage.setItem("myfav", JSON.stringify(fav));        
        localStorage.setItem("iconfav", JSON.stringify(fav));
        location.reload();
    });
});