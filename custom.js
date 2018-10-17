const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function displayPhotos(data) {
    let photoHTML = "";
    if (xhr.readyState === 4 && xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        photoHTML += '<ul>';
        for (var i = 0; i < data.length; i++) {
            photoHTML += '<li>';
            photoHTML += '<img id="thumb" src="' + data[i].urls.regular + '">';
            photoHTML += '</li>';
        }
        photoHTML += '</ul>';
    }
    var photoUl = document.getElementById("gbox");
    if (photoUl != null) photoUl.innerHTML = photoHTML;
};
xhr.open("GET", "https://api.unsplash.com/photos/search?per_page=10&client_id=cf4bdc51d49dcb014d8277b937132495c150a251d117ba0f8283eb5bcaf65951&query=philippines&orientation=landscape");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send();