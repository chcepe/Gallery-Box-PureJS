// EVENTS ON CLICK
var current_photo = 1;
var images = null;
document.addEventListener("click", function (e) {
    if (e.srcElement.id == "thumb") {  // ON THUMB CLICK
        images = (images == null ? document.getElementById("gbox").getElementsByTagName("img").length : images);


        //ORDERING PHOTOS INDEX
        var photos = document.getElementById("gbox").getElementsByTagName("li");
        for (var i = 0, len = photos.length; i < len; i++) {
            (photos[i].firstChild.setAttribute("n", (i + 1)));
        }

        current_photo = (parseInt(e.target.getAttribute("n")));
        document.body.innerHTML += '<div id="gallery-overlay"><div class="photo"><span id="info">Hello</span><span id="close" title="Close">x</span><img src="https://i.imgur.com/mNWmIxZ.png" title="Previous" id="prev"><img src="https://i.imgur.com/pY5gK7d.png" title="Next" id="next"><img id="photo" src="' + e.srcElement.src + '"></div></div>';
        npButtons();
    } else if (e.srcElement.id == "close") { // ON CLOSE BUTTON CLICK
        document.getElementById("gallery-overlay").remove();
    } else if (e.srcElement.id == "next" || e.srcElement.id == "prev") { // ON PREV OR NEXT BUTTONS CLICK
        if (e.srcElement.id == "next") {
            current_photo++;
        } else {
            current_photo--;
        }
        var elements = document.getElementById("gbox").getElementsByTagName("li");
        var src = (elements.item(current_photo - 1).getElementsByTagName("img")[0].getAttribute("src"));
        document.getElementById("photo").src = src;
        npButtons();
    }
});


// UPDATE PREV AND NEXT BUTTONS
function npButtons() {
    document.getElementById("info").innerHTML = "<b>" + current_photo + "</b> / " + images;
    document.getElementById("prev").style.display = (current_photo == 1 || images == 0) ? "none" : "block";
    document.getElementById("next").style.display = (current_photo == images || images == 0) ? "none" : "block";
}


// ALLOW PREV OR NEXT NAVIGATION FROM KEYBOARD
document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    if (document.getElementById("gallery-overlay")) {
        if (e.keyCode == "37") { // ON KEYDOWN LEFT ARROW
            if (document.getElementById("prev").style.display != "none") document.getElementById("prev").click();
        }
        else if (e.keyCode == "39") { // ON KEYDOWN RIGHT ARROW
            if (document.getElementById("next").style.display != "none") document.getElementById("next").click();
        }
        else if (e.keyCode == "27") { // ON KEYDOWN ESCAPE
            document.getElementById("gallery-overlay").remove();
        }
    }
}