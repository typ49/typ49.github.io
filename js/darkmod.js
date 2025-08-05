const cssDarkTheme = "css/theme_dark.css";
const cssLightTheme = "css/theme_light.css";
const darkLogo = "assets/LOGO-dark.png";
const lightLogo = "assets/LOGO-light.png";

document.addEventListener('DOMContentLoaded', function () {
    const link = document.getElementById("theme");
    const logo = document.getElementById("logo");
    const svg1 = document.getElementById("svg1");
    const svg2 = document.getElementById("svg2");

    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (isDarkMode) {
        link.setAttribute("href", cssDarkTheme);
        logo.setAttribute("src", darkLogo)
        svg1.setAttribute("fill", "#1B2D62")
        svg2.setAttribute("fill", "#1B2D62")
    } else {
        link.setAttribute("href", cssLightTheme);
        logo.setAttribute("src", lightLogo);
        svg1.setAttribute("fill", "#3659c4")
        svg2.setAttribute("fill", "#3659c4")
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
        if (matches) {
            link.setAttribute("href", cssDarkTheme);
            logo.setAttribute("src", darkLogo);
            svg1.setAttribute("fill", "#1B2D62")
            svg2.setAttribute("fill", "#1B2D62")
        } else {
            link.setAttribute("href", cssLightTheme);
            logo.setAttribute("src", lightLogo);
            svg1.setAttribute("fill", "#3659c4")
            svg2.setAttribute("fill", "#3659c4")
        }
    });

});