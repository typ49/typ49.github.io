// Modal Image Gallery
function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = `<a href="${element.alt}" target="_blank">${element.id}</a>`;
}

// Change style of navbar on scroll
window.onscroll = function () { navbarFunction() };
function navbarFunction() {
    var navbar = document.getElementById("myNavbar");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-theme-l3";
    } else {
        navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-theme-l3", "");
    }
}

function accordionFunction(id) {
    var x = document.getElementById(id);

    if (x.className.indexOf("w3-show") == -1) {
        // Ouvrir l'accordéon
        x.style.maxHeight = "0px";
        x.className += " w3-show";

        // Calculer la hauteur réelle du contenu
        var scrollHeight = x.scrollHeight;
        x.style.maxHeight = scrollHeight + "px";

        // Réinitialiser après l'animation
        setTimeout(() => {
            x.style.maxHeight = "none";
        }, 300);
    } else {
        // Fermer l'accordéon
        x.style.maxHeight = x.scrollHeight + "px";

        setTimeout(() => {
            x.style.maxHeight = "0px";
        }, 10);

        setTimeout(() => {
            x.className = x.className.replace(" w3-show", "");
        }, 300);
    }
}

function toggleFunction(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}


// Inclusion dynamique de la navbar et du footer + correction des liens relatifs
function includeHTML(id, file, callback) {
    fetch(file)
        .then(response => {
            if (!response.ok) throw new Error("Erreur de chargement");
            return response.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback();
        })
        .catch(error => {
            document.getElementById(id).innerHTML = "<!-- Erreur de chargement -->";
        });
}

document.addEventListener("DOMContentLoaded", function () {
    includeHTML("lyrics", "lyrics.html");

});