$(document).ready(function () {
    const $search_bar = $(".searchcontainer .searchbar");
    const $search_btn = $(".searchcontainer #searchbtn");
    const $suggestions = $(".searchcontainer .suggestions");
    const $adat_list = $(".adatlistcontainer .adatlist");
    const $favorite = $(".adatlistcontainer .adatlist #favorite-icon");
    const $filterbtn = $(".searchcontainer .searchfilter #filterbtn");
    const $filter = $(".searchcontainer .searchfilter .filtercontainer").hide();

    let counter = 0;
    const adat = $adat_list.map(function () {
        return $(this).find("p").text();
    }).get();

    $search_bar.on("input", function () {
        const search = $(this).val().toLowerCase();
        $suggestions.empty();

        if (search) {
            const filtered = adat.filter(nama_adat => nama_adat.toLowerCase().startsWith(search));
            if (filtered.length > 0) {
                $suggestions.show();
                filtered.forEach(nama_adat => {
                    const typed = nama_adat.substring(0, search.length);
                    const nontyped = nama_adat.substring(search.length);
                    const $suggestion = $("<div class=\"suggest\">").html(`<span class="highlighted">` + typed + "</span>" + nontyped);
                    $suggestion.on("click", function () {
                        $search_bar.val(nama_adat);
                        $suggestions.hide();
                    });
                    $suggestions.append($suggestion);
                });
            } else {
                $suggestions.hide();
            }
        } else {
            $suggestions.hide();
        }
    });

    $search_btn.on("click", function () {
        const search = $search_bar.val().toLowerCase();
        $adat_list.each(function () {
            const nama_adat = $(this).find("p").text().toLowerCase();
            if (search === "" || nama_adat.startsWith(search)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $(document).on("click", function (close) {
        if (!$(close.target).closest(".suggestions, .search_bar").length) {
            $suggestions.hide();
        }
    });

    $(".searchfilter .filtercontainer input[type='checkbox']").on("change", function () {
        let filterdaerah = $(".searchfilter .filterdaerah input:checked").map(function () {
            return $(this).val().toLowerCase();
        }).get();
        let filterkategori = $(".searchfilter .filterkategori input:checked").map(function () {
            return $(this).val();
        }).get();

        $adat_list.each(function () {
            let daerah = $(this).find("p").text().toLowerCase().split(' ');
            let kategori = $(this).data("category");

            if ((filterdaerah.length === 0 || filterdaerah.some(f => daerah.includes(f))) && (filterkategori.length === 0 || filterkategori.some(f => kategori.includes(f)))) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        });

    });

    $filterbtn.on("click", function () {
        if (counter % 2 === 0) {
            $filter.show();
            $filterbtn.css("color", "white",);
            $filterbtn.css("background-color", "rgb(141, 77, 21)");
            $filterbtn.css("transform", "scale(1.1)",);
        } else {
            $filterbtn.css("color", "rgb(141, 77, 21)");
            $filterbtn.css("background-color", "white",);
            $filterbtn.css("transform", "scale(1)",);
            $filter.hide();
        }
        counter++;
    });

    $favorite.on("click", function () {
        let favorited = $(this).data("name");
        let $favicon = $(this);
        console.log(favorited);
        let fav = JSON.parse(localStorage.getItem("myfav")) || [];
        console.log(fav);
        if (fav.includes(favorited)) {
            fav = fav.filter(f => String(f) !== String(favorited));
            $favicon.text("favorite_outlined");
            $favicon.css("color", "black");
        }
        else {
            fav.push(favorited);
            $favicon.text("favorite");
            $favicon.css("color", "rgb(141, 77, 21)");
        }
        console.log(fav);
        localStorage.setItem("myfav", JSON.stringify(fav));
        localStorage.setItem("iconfav", JSON.stringify(fav));
    });

    $favorite.each(function () {
        let faved = $(this).data("name");
        let favicon = JSON.parse(localStorage.getItem("iconfav")) || [];
        if (favicon.includes(faved)) {
            $(this).text("favorite");
            $(this).css("color", "rgb(141, 77, 21)");
        }
        else {
            $(this).text("favorite_outlined");
        }
    });
});