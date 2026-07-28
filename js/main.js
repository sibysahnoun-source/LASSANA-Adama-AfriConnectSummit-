document.addEventListener("DOMContentLoaded", () => {
    console.log("AfriConnect Summit 2026 - Scripts initialisés.");

    // ==========================================
    // 1. GESTION DU MODE SOMBRE (avec mémoire localStorage)
    // ==========================================
    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    // Appliquer le thème sauvegardé au chargement
    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeToggleBtn) themeToggleBtn.textContent = "☀️ Mode Clair";
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            
            let theme = "light";
            if (document.body.classList.contains("dark-mode")) {
                theme = "dark";
                themeToggleBtn.textContent = "☀️ Mode Clair";
            } else {
                themeToggleBtn.textContent = "🌙 Mode Sombre";
            }
            // Mémorise le choix de l'utilisateur
            localStorage.setItem("theme", theme);
        });
    }

    // ==========================================
    // 2. COMPTE À REBOURS (PAGE D'ACCUEIL)
    // ==========================================
    const targetDate = new Date("October 15, 2026 09:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (daysEl && hoursEl && minutesEl && secondsEl) {
            if (difference > 0) {
                daysEl.textContent = Math.floor(difference / (1000 * 60 * 60 * 24));
                hoursEl.textContent = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                minutesEl.textContent = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                secondsEl.textContent = Math.floor((difference % (1000 * 60)) / 1000);
            } else {
                daysEl.textContent = "0";
                hoursEl.textContent = "0";
                minutesEl.textContent = "0";
                secondsEl.textContent = "0";
            }
        }
    }

    // Lancer le compte à rebours si on est sur la page d'accueil
    if (document.getElementById("days")) {
        setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    // ==========================================
    // 3. GESTION DES ONGLETS & FILTRES (PROGRAMME & INTERVENANTS)
    // ==========================================
    const filterButtons = document.querySelectorAll(".filter-btn, .tab-btn");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            // Retirer la classe 'active' de tous les boutons du même groupe
            const siblingButtons = this.parentElement.querySelectorAll("button");
            siblingButtons.forEach(b => b.classList.remove("active"));

            // Ajouter la classe 'active' au bouton cliqué
            this.classList.add("active");
        });
    });

    // ==========================================
    // 4. VALIDATION DU FORMULAIRE DE CONTACT
    // ==========================================
    const registrationForm = document.getElementById("registration-form");

    if (registrationForm) {
        registrationForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const messageInput = document.getElementById("message");
            if (messageInput && messageInput.value.trim().length < 20) {
                alert("Le message doit contenir au moins 20 caractères.");
                return;
            }

            alert("Merci ! Votre inscription au sommet AfriConnect 2026 a été envoyée avec succès.");
            registrationForm.reset();
        });
    }
});