// Ultimate Birthday Animation System
(function() {
    'use strict';

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out-cubic',
        once: true,
        offset: 100
    });

    // Particle System
    const canvas = document.getElementById('particlesCanvas');
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    let particles = [];
    const maxParticles = 100;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 10;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = -Math.random() * 3 - 1;
            this.size = Math.random() * 8 + 4;
            this.life = 0;
            this.maxLife = Math.random() * 3 + 2;
            this.color = ['#ff1493', '#ff69b4', '#ffc0cb'][Math.floor(Math.random() * 3)];
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.1;
        }

        update(deltaTime) {
            this.life += deltaTime;
            this.x += this.vx * 60 * deltaTime;
            this.y += this.vy * 60 * deltaTime;
            this.vy += 0.5 * deltaTime; // gravity
            this.rotation += this.rotationSpeed;
        }

        draw() {
            const alpha = Math.max(0, 1 - this.life / this.maxLife);
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = alpha;
            
            // Draw heart shape
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(0, this.size * 0.3);
            ctx.bezierCurveTo(-this.size * 0.5, -this.size * 0.2, -this.size, this.size * 0.2, 0, this.size);
            ctx.bezierCurveTo(this.size, this.size * 0.2, this.size * 0.5, -this.size * 0.2, 0, this.size * 0.3);
            ctx.fill();
            
            ctx.restore();
        }

        isDead() {
            return this.life >= this.maxLife || this.y < -50;
        }
    }

    let lastTime = 0;
    function animate(currentTime) {
        const deltaTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime;

        // Spawn particles
        if (particles.length < maxParticles && Math.random() < 0.3) {
            particles.push(new Particle());
        }

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles = particles.filter(particle => {
            particle.update(deltaTime);
            particle.draw();
            return !particle.isDead();
        });

        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    // Photo Gallery - Using actual photos from folder
    const photos = [
        { src: '1000218220.jpg', alt: 'Beautiful Memory 1' },
        { src: '1000218223.jpg', alt: 'Beautiful Memory 2' },
        { src: '1000218224.jpg', alt: 'Beautiful Memory 3' },
        { src: '1000218225.jpg', alt: 'Beautiful Memory 4' },
        // { src: '1000218226.jpg', alt: 'Beautiful Memory 5' },
        { src: '4X3A8131.JPG', alt: 'Professional Shot 1' },
        { src: '4X3A8136.JPG', alt: 'Professional Shot 2' },
        { src: '4X3A8258.JPG', alt: 'Professional Shot 3' },
        { src: '4X3A8268.JPG', alt: 'Professional Shot 4' },
        { src: '4X3A8271.JPG', alt: 'Professional Shot 5' },
        { src: '4X3A8314.JPG', alt: 'Professional Shot 6' },
        { src: '4X3A8330.JPG', alt: 'Professional Shot 7' },
        { src: 'r1.png', alt: 'Professional Shot 8' },
        { src: 'r3.png', alt: 'Professional Shot 9' },
        { src: 'r4.jpg', alt: 'Professional Shot 10' },
    
   
        { src: 'DEE23332.JPG', alt: 'Portrait 1' },
        { src: 'DEE23372.JPG', alt: 'Portrait 2' },
        { src: 'IMG_20250813_222409.jpg', alt: 'Recent Photo 1' },
        { src: 'IMG_20250813_223011.jpg', alt: 'Recent Photo 2' },
        { src: 'IMG_20250813_223704.jpg', alt: 'Recent Photo 3' },
        { src: 'SM247385.JPG', alt: 'Studio Shot 1' },
        { src: 'SM247500.JPG', alt: 'Studio Shot 2' },
        { src: 'SM247558.JPG', alt: 'Studio Shot 3' },
        { src: 'SM247581.JPG', alt: 'Studio Shot 4' },
        { src: 'SM247737.JPG', alt: 'Studio Shot 5' }
    ];

    function loadGallery() {
        const grid = document.getElementById('photoGrid');
        if (!grid) return;
        
        photos.forEach((photo, index) => {
            const item = document.createElement('div');
            item.className = 'photo-item';
            item.innerHTML = `
                <img src="${photo.src}" alt="Memory ${index + 1}" 
                     onload="console.log('✅ Loaded: ${photo.src}')"
                     onerror="console.log('❌ Failed: ${photo.src}'); this.style.display='none'">
                <div class="photo-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            `;
            grid.appendChild(item);
        });
        
        console.log('Gallery loaded with', photos.length, 'photos');

        // Add click handlers for lightbox
        document.querySelectorAll('.photo-item').forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                openLightbox(img.src);
                
                // Add sparkle effect
                createSparkles(this);
            });
        });
    }
    
    // Load gallery when DOM is ready
    document.addEventListener('DOMContentLoaded', loadGallery);

    // Lightbox functionality
    function openLightbox(src) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-close">&times;</div>
            <div class="lightbox-content">
                <img src="${src}" alt="Full size image">
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Animate in
        setTimeout(() => lightbox.classList.add('active'), 10);
        
        // Close handlers
        lightbox.addEventListener('click', function(e) {
            if (e.target === this || e.target.classList.contains('lightbox-close')) {
                closeLightbox(lightbox);
            }
        });
        
        // ESC key handler
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeLightbox(lightbox);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    function closeLightbox(lightbox) {
        lightbox.classList.remove('active');
        setTimeout(() => lightbox.remove(), 300);
    }

    // Sparkle effects
    function createSparkles(element) {
        const rect = element.getBoundingClientRect();
        const sparkleCount = 15;
        
        for (let i = 0; i < sparkleCount; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
                sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 1000);
            }, i * 50);
        }
    }

    // Celebrate button functionality
    const celebrateBtn = document.getElementById('celebrateBtn');
    const heroTitle = document.getElementById('heroTitle');
    let celebrated = false;

    celebrateBtn.addEventListener('click', function() {
        if (!celebrated) {
            // Change title
            heroTitle.innerHTML = `
                Happy 26th Birthday<br>
                <span class="gradient-text">Revathi Guna!</span> 
                <i class="fas fa-crown text-pink"></i>
            `;
            celebrated = true;
        }

        // Particle explosion
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                particles.push(new Particle());
            }, i * 50);
        }

        // Button sparkles
        createSparkles(this);

        // Screen shake
        document.body.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);

        // Confetti burst
        createConfetti();
    });

    // Confetti system
    function createConfetti() {
        const colors = ['#ff1493', '#ff69b4', '#ffc0cb', '#gold', '#silver'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.borderRadius = '50%';
            
            document.body.appendChild(confetti);

            // Animate confetti
            const animation = confetti.animate([
                {
                    transform: 'translateY(0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`,
                    opacity: 0
                }
            ], {
                duration: 3000 + Math.random() * 2000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            animation.onfinish = () => confetti.remove();
        }
    }

    // Music control
    const musicBtn = document.getElementById('musicBtn');
    const bgAudio = document.getElementById('bgAudio');
    let isPlaying = false;

    musicBtn.addEventListener('click', async function() {
        try {
            if (!isPlaying) {
                await bgAudio.play();
                this.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
                isPlaying = true;
            } else {
                bgAudio.pause();
                this.innerHTML = '<i class="fas fa-music"></i> Play Music';
                isPlaying = false;
            }
        } catch (error) {
            console.log('Audio play failed:', error);
        }
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.getElementById('gallery').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Click sparkles
    document.addEventListener('click', function(e) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    });

    // Add shake animation to CSS
    const shakeCSS = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = shakeCSS;
    document.head.appendChild(style);

    // Initialize gallery when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        loadGallery();
    });
    
    // Also try to load immediately in case DOM is already ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadGallery);
    } else {
        loadGallery();
    }

    // Performance optimization
    let ticking = false;
    function updateOnScroll() {
        // Throttle scroll events
        if (!ticking) {
            requestAnimationFrame(() => {
                // Add any scroll-based animations here
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', updateOnScroll, { passive: true });

    console.log('🎉 Birthday animation system loaded successfully!');
})();