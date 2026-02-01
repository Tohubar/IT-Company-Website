document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    const deitySearch = document.getElementById('deity-search');
    const deityCards = document.querySelectorAll('.deity-card');
    const siteSearch = document.getElementById('site-search');

    navToggle.addEventListener('click', () => {
        navbar.classList.toggle('open');
        navToggle.querySelector('i').classList.toggle('fa-times');
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            navbar.classList.remove('open');
            navToggle.querySelector('i').classList.remove('fa-times');
        });
    });

    const updateActiveLink = () => {
        let currentSection = '';
        document.querySelectorAll('main section[id]').forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
        });
    };

    window.addEventListener('scroll', updateActiveLink);

    if (deitySearch) {
        deitySearch.addEventListener('input', (event) => {
            const query = event.target.value.toLowerCase();
            deityCards.forEach((card) => {
                const name = card.dataset.name || '';
                const match = name.includes(query);
                card.style.display = match ? 'block' : 'none';
            });
        });
    }

    const siteMap = {
        deities: '#deities',
        texts: '#texts',
        festivals: '#festivals',
        philosophy: '#philosophy',
        rituals: '#rituals',
        culture: '#culture',
        contact: '#contact',
        about: '#about'
    };

    siteSearch.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const query = event.target.value.toLowerCase();
            const matchKey = Object.keys(siteMap).find((key) => query.includes(key));
            if (matchKey) {
                document.querySelector(siteMap[matchKey]).scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    const quotes = [
        {
            text: '“When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.”',
            source: '— Bhagavad Gita 6.19'
        },
        {
            text: '“The Self is the friend of the self and the enemy of the self.”',
            source: '— Bhagavad Gita 6.5'
        },
        {
            text: '“Lead me from the unreal to the real, from darkness to light, from death to immortality.”',
            source: '— Brihadaranyaka Upanishad 1.3.28'
        }
    ];

    let quoteIndex = 0;
    const quoteText = document.getElementById('quote-text');
    const quoteSource = document.getElementById('quote-source');

    const rotateQuote = () => {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        quoteText.textContent = quotes[quoteIndex].text;
        quoteSource.textContent = quotes[quoteIndex].source;
    };

    setInterval(rotateQuote, 6000);

    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    sections.forEach((section) => observer.observe(section));

    updateActiveLink();
});
