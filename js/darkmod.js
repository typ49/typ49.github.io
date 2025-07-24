const cssDarkTheme = "css/theme_dark.css";
const cssLightTheme = "css/theme_light.css";
const darkLogo = "assets/LOGO-dark.png";
const lightLogo = "assets/LOGO-light.png";

document.addEventListener('DOMContentLoaded', function () {
    const link = document.getElementById("theme");
    const logo = document.getElementById("logo");

    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (isDarkMode) {
        link.setAttribute("href", cssDarkTheme);
        logo.setAttribute("src", darkLogo)
    } else {
        link.setAttribute("href", cssLightTheme);
        logo.setAttribute("src", lightLogo);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
        if (matches) {
            link.setAttribute("href", cssDarkTheme);
            logo.setAttribute("src", darkLogo);
        } else {
            link.setAttribute("href", cssLightTheme);
            logo.setAttribute("src", lightLogo);
        }
    });

});