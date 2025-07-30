document.addEventListener("DOMContentLoaded", function () {
    // Liste des morceaux
    const filepath = "assets/music/";
    const tracks = [
        { title: "1. Awake", file: filepath + "awake.ogg" },
        { title: "2. Before Midnight", file: filepath + "before_midnight.wav" },
        { title: "3. Bubble Survivor", file: filepath + "bubble-survivor.ogg" },
        { title: "4. Free level", file: filepath + "free_level.ogg" },
        { title: "Holliday", file: filepath + "holliday_mixdown.mp3" },
        { title: "Just chill", file: filepath + "just_chill.ogg" },
        { title: "Poyo | End of the journey", file: filepath + "poyo_end-of-the-journey.wav" },
        { title: "Remember your fight", file: filepath + "remember_your_fight.ogg" },
        { title: "Resonnance", file: filepath + "resonnance.mp3" },
        { title: "Take the sea", file: filepath + "take_the_sea.ogg" },
        { title: "MAO Project", file: filepath + "MAO_project.wav" }
    ];

    // Génération dynamique de la liste des musiques AVANT toute initialisation
    const musicsDiv = document.getElementById('musics');
    musicsDiv.innerHTML = ""; // Vide la div

    tracks.forEach((track) => {
        const li = document.createElement('li');
        li.className = "w3-padding-large";
        li.innerHTML = `
            <div class="w3-display-container w3-theme">
                <div class="progressBar w3-theme-d3" style="height: 50px; width:0%">
                    <span class="w3-display-left w3-margin-left">
                        <span class="title">${track.title}</span>
                        <span class="timer">0:00</span> / <span class="duration">0:00</span>
                    </span>
                    <button class="w3-display-right w3-button fa fa-play w3-theme w3-hover-opacity"></button><br>
                </div>
            </div>
        `;
        musicsDiv.appendChild(li);
    });

    // Initialisation des Howl APRÈS que le HTML soit prêt
    const howls = tracks.map((track, i) => new Howl({
        src: [track.file],
        html5: true,
        volume: 0.5,
        onload: () => {
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

    // Barre de progression interactive (avance/recul)
    document.querySelectorAll('.progressBar').forEach((bar, i) => {
        bar.addEventListener('click', function (e) {
            const rect = bar.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percent = x / rect.width;
            const howl = howls[i];
            if (howl.duration()) {
                howl.seek(percent * howl.duration());
                updateTrackUI(i);
            }
        });
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