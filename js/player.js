document.addEventListener("DOMContentLoaded", function () {
    // Liste des morceaux
    const tracks = [
        {
            title: "Resonnance",
            file: "assets/music/resonnance.mp3"
        },
        {
            title: "POYO | End of the journey",
            file: "assets/music/poyo_end-of-the-journey.wav"
        },
        {
            title: "Mao Project",
            file: "assets/music/MAO_project.wav"
        },
        {
            title: "Holliday Mixdown",
            file: "assets/music/holliday_mixdown.mp3"
        },
        {
            title: "Before Midnight",
            file: "assets/music/before midnight.wav"
        }
    ];

    // Initialisation des Howl
    const howls = tracks.map((track, i) => new Howl({
        src: [track.file],
        html5: true,
        volume: 0.5,
        onload: () => {
            // Met à jour la durée dès que le son est chargé
            const durationElem = document.querySelectorAll('.duration')[i];
            durationElem.textContent = formatTime(howls[i].duration());
        },
        onend: () => {
            playingIndex = null;
            updatePlayButtons();
        }
    }));

    let playingIndex = null;
    let timerInterval = null;
    let currentVolume = 0.5;

    // Utilitaires pour formatage du temps
    function formatTime(secs) {
        const min = Math.floor(secs / 60);
        const sec = Math.floor(secs % 60);
        return `${min}:${sec < 10 ? "0" : ""}${sec}`;
    }

    // Gestion des boutons play
    function updatePlayButtons() {
        document.querySelectorAll('.fa-play, .fa-pause').forEach((btn, i) => {
            btn.classList.remove('fa-pause');
            btn.classList.add('fa-play');
            if (playingIndex === i && howls[i].playing()) {
                btn.classList.remove('fa-play');
                btn.classList.add('fa-pause');
            }
        });
    }

    // Gestion du timer et de la barre de progression
    function updateTrackUI(index) {
        const howl = howls[index];
        const timer = document.querySelectorAll('.timer')[index];
        const duration = document.querySelectorAll('.duration')[index];
        const bar = document.querySelectorAll('.progressBar')[index];

        duration.textContent = formatTime(howl.duration());
        timer.textContent = formatTime(howl.seek() || 0);

        // Barre de progression
        const percent = ((howl.seek() || 0) / howl.duration()) * 100;
        bar.style.width = `${percent}%`;
    }

    // Lecture/Pause
    document.querySelectorAll('.fa-play, .fa-pause').forEach((btn, i) => {
        btn.onclick = function () {
            if (playingIndex !== null && playingIndex !== i) {
                howls[playingIndex].stop();
                clearInterval(timerInterval);
            }
            if (howls[i].playing()) {
                howls[i].pause();
                clearInterval(timerInterval);
                playingIndex = null;
            } else {
                howls[i].play();
                playingIndex = i;
                timerInterval = setInterval(() => updateTrackUI(i), 500);
            }
            updatePlayButtons();
        };
    });

    // Volume
    function setVolume(vol) {
        currentVolume = Math.max(0, Math.min(1, vol));
        howls.forEach(h => h.volume(currentVolume));
        document.getElementById('volBar').textContent = Math.round(currentVolume * 100) + "%";
    }
    setVolume(currentVolume);

    document.querySelector('.fa-volume-down').onclick = () => setVolume(currentVolume - 0.1);
    document.querySelector('.fa-volume-up').onclick = () => setVolume(currentVolume + 0.1);

    // Bouton reset : remet toutes les musiques au début et stoppe la lecture
    document.getElementById('reset').onclick = function () {
        howls.forEach((howl, i) => {
            howl.stop();
            howl.seek(0);
            updateTrackUI(i);
        });
        playingIndex = null;
        clearInterval(timerInterval);
        updatePlayButtons();
    };

});