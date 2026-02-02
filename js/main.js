const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const tiltCards = document.querySelectorAll('[data-tilt]');

tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
        const { width, height, left, top } = card.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;
        const rotateY = ((x / width) - 0.5) * 10;
        const rotateX = ((y / height) - 0.5) * -10;
        card.style.setProperty('--tilt-x', `${rotateX}deg`);
        card.style.setProperty('--tilt-y', `${rotateY}deg`);
    });

    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
    });
});

const sections = document.querySelectorAll('.section');
sections.forEach((section) => section.classList.add('reveal'));

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    },
    { threshold: 0.2 }
);

sections.forEach((section) => observer.observe(section));

const canvas = document.getElementById('mandala-canvas');
const context = canvas.getContext('2d');

const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let angle = 0;
const drawMandala = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) * 0.8;

    for (let i = 0; i < 12; i += 1) {
        const radius = (maxRadius / 12) * (i + 1);
        context.beginPath();
        context.strokeStyle = `rgba(201, 92, 18, ${0.05 + i * 0.02})`;
        context.lineWidth = 1.2;
        context.arc(centerX, centerY, radius, angle, angle + Math.PI * 2);
        context.stroke();
    }

    for (let i = 0; i < 18; i += 1) {
        const theta = angle + (Math.PI * 2 * i) / 18;
        const x = centerX + Math.cos(theta) * maxRadius * 0.6;
        const y = centerY + Math.sin(theta) * maxRadius * 0.6;
        context.beginPath();
        context.fillStyle = 'rgba(140, 28, 19, 0.15)';
        context.arc(x, y, 10 + (i % 3) * 2, 0, Math.PI * 2);
        context.fill();
    }

    angle += 0.002;
    requestAnimationFrame(drawMandala);
};

drawMandala();

const festivalSchedule = [
    { name: 'Diwali', date: '2024-11-01' },
    { name: 'Holi', date: '2025-03-14' },
    { name: 'Navratri', date: '2024-10-03' },
    { name: 'Durga Puja', date: '2024-10-09' },
    { name: 'Ganesh Chaturthi', date: '2024-09-07' }
];

const upcomingFestival = festivalSchedule
    .map((festival) => ({
        ...festival,
        time: new Date(festival.date).getTime()
    }))
    .sort((a, b) => a.time - b.time)
    .find((festival) => festival.time > Date.now()) || festivalSchedule[0];

const festivalName = document.getElementById('festival-name');
if (festivalName) {
    festivalName.textContent = `${upcomingFestival.name} is arriving in`;
}

const updateCountdown = () => {
    const targetTime = new Date(upcomingFestival.date).getTime();
    const now = Date.now();
    const diff = Math.max(targetTime - now, 0);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
};

updateCountdown();
setInterval(updateCountdown, 1000);

const calendarGrid = document.getElementById('calendar-grid');
if (calendarGrid) {
    festivalSchedule.forEach((festival) => {
        const card = document.createElement('div');
        card.className = 'calendar-card';
        card.innerHTML = `<strong>${festival.name}</strong><p>${festival.date}</p>`;
        calendarGrid.appendChild(card);
    });
}

const scriptureSearch = document.getElementById('scripture-search');
const scriptureGrid = document.getElementById('scripture-grid');

if (scriptureSearch && scriptureGrid) {
    const scriptureCards = Array.from(scriptureGrid.querySelectorAll('.scripture-card'));
    scriptureSearch.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        scriptureCards.forEach((card) => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? 'block' : 'none';
        });
    });
}

const mantraButton = document.getElementById('play-mantra');
let audioContext;
let oscillator;

const stopTone = () => {
    if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
        oscillator = null;
    }
};

if (mantraButton) {
    mantraButton.addEventListener('click', () => {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        if (oscillator) {
            stopTone();
            mantraButton.textContent = 'Play Mantra Tone';
            return;
        }

        oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.value = 136.1;
        gainNode.gain.value = 0.08;
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.start();
        mantraButton.textContent = 'Pause Mantra Tone';
    });
}
