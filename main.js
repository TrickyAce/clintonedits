// Mobile menu functionality with animations
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenu = document.getElementById('mobileMenu');
            const navLinks = document.getElementById('navLinks');
            const navLinksItems = document.querySelectorAll('.nav-link');
            const nav = document.getElementById('nav');
            const video = document.getElementById("heroVideo");
            const playBtn = document.getElementById("playBtn");
            const muteBtn = document.getElementById("muteBtn");

            // Mobile menu toggle
            mobileMenu.addEventListener('click', function() {
                mobileMenu.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close mobile menu when clicking on nav links
            navLinksItems.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });

            playBtn.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                    playBtn.innerHTML = "Pause";
                } else {
                    video.pause();
                    playBtn.innerHTML = "Play";
                }
                }
            );

            muteBtn.addEventListener('click', function() {
                video.muted = !video.muted;

                if (video.muted) {
                    muteBtn.innerHTML = '🔊';
                } else {
                    muteBtn.innerHTML = '🔇';
                }
            });

            // typing animation

            const phrases = [
  "VIDEO EDITOR",
  "SCRIPT WRITER",
  "THUMBNAIL DESIGNER",
  "CONTENT CREATOR"
];

const typedText = document.getElementById("typedText");
let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;
let delay = 100;

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    typedText.textContent = currentPhrase.substring(0, letterIndex--);
    delay = 50;
  } else {
    typedText.textContent = currentPhrase.substring(0, letterIndex++);
    delay = 100;
  }

  if (!isDeleting && letterIndex === currentPhrase.length + 1) {
    delay = 2000; // pause before deleting
    isDeleting = true;
  } else if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 500;
  }

  setTimeout(typeLoop, delay);
}

typeLoop();

            // Navigation scroll effect and active section highlighting
            const sections = document.querySelectorAll('section[id]');
            
            window.addEventListener('scroll', function() {
                // Navigation background change
                if (window.scrollY > 100) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }

                // Highlight active section
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (window.scrollY >= (sectionTop - 200)) {
                        current = section.getAttribute('id');
                    }
                });

                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + current) {
                        link.classList.add('active');
                    }
                });
            });

            // Scroll animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.fade-in').forEach(el => {
                observer.observe(el);
            });

            // Animated counters
            function animateCounters() {
                const counters = document.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const increment = target / 200;
                    let current = 0;

                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                });
            }

            // Trigger counter animation when about section is visible
            const aboutSection = document.getElementById('about');
            const aboutObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        aboutObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            aboutObserver.observe(aboutSection);

            // Smooth scrolling for navigation links
            navLinksItems.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // CTA button smooth scroll
            document.querySelectorAll('.cta-button').forEach(button => {
                button.addEventListener('click', function(e) {
                    if (this.getAttribute('href').startsWith('#')) {
                        e.preventDefault();
                        const targetSection = document.querySelector(this.getAttribute('href'));
                        if (targetSection) {
                            targetSection.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                });
            });

            // Enhanced hover effects for interactive elements
            document.querySelectorAll('.video-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Enhanced button interactions
            document.querySelectorAll('.cta-button, .youtube-cta, .contact-link').forEach(button => {
                button.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-3px) scale(1.05)';
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!nav.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        });

        const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function scrollNext() {
  const itemWidth = track.children[0].offsetWidth + 16; // thumbnail + gap
  if (track.scrollLeft + itemWidth >= track.scrollWidth - track.offsetWidth) {
    // Loop to start
    track.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    track.scrollBy({ left: itemWidth, behavior: 'smooth' });
  }
}

function scrollPrev() {
  const itemWidth = track.children[0].offsetWidth + 16;
  if (track.scrollLeft === 0) {
    // Loop to end
    track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
  } else {
    track.scrollBy({ left: -itemWidth, behavior: 'smooth' });
  }
}

nextBtn.addEventListener('click', scrollNext);
prevBtn.addEventListener('click', scrollPrev);

// Swipe support (mobile)
let startX = 0;

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;
  if (diff > 50) scrollNext();
  else if (diff < -50) scrollPrev();
});

  const swiper = new Swiper('.clients-swiper', {
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    speed: 800,
    effect: 'slide'
  });