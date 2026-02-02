const navToggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');
const audioToggle = document.querySelector('.audio-toggle');
const soundTriggers = document.querySelectorAll('.sound-trigger');
const tiltCards = document.querySelectorAll('.tilt-card');

let audioEnabled = false;
let audioContext;

const handleScroll = () => {
  if (window.scrollY > 40) {
    header.style.background = 'rgba(5, 7, 15, 0.9)';
  } else {
    header.style.background = 'rgba(5, 7, 15, 0.6)';
  }
};

const createTone = () => {
  if (!audioEnabled) return;
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.value = 440;
  gainNode.gain.value = 0.05;
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.12);
};

navToggle?.addEventListener('click', () => {
  navbar.classList.toggle('open');
});

window.addEventListener('scroll', handleScroll);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const handleTilt = (event, card) => {
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const rotateX = ((y / rect.height) - 0.5) * -12;
  const rotateY = ((x / rect.width) - 0.5) * 12;
  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
};

tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => handleTilt(event, card));
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
  });
});

soundTriggers.forEach((trigger) => {
  trigger.addEventListener('mouseenter', createTone);
  trigger.addEventListener('click', createTone);
});

audioToggle?.addEventListener('click', () => {
  audioEnabled = !audioEnabled;
  audioToggle.dataset.audio = audioEnabled ? 'on' : 'off';
  audioToggle.innerHTML = audioEnabled
    ? '<i class="fa-solid fa-volume-high"></i><span>Audio On</span>'
    : '<i class="fa-solid fa-volume-xmark"></i><span>Audio Off</span>';
  if (audioEnabled) {
    createTone();
  }
});

handleScroll();
