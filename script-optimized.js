// High-performance 120fps birthday animation system
(function() {
    'use strict';
    
    // Performance optimizations
    const canvas = document.getElementById('particlesCanvas');
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    
    // Canvas setup with performance optimization
    function resizeCanvas() {
        canvas.width = Math.floor(canvas.clientWidth * DPR);
        canvas.height = Math.floor(canvas.clientHeight * DPR);
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    
    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();
    
    // High-performance particle system
    const particles = [];
    const MAX_PARTICLES = 120;
    const colors = ['#ff1493', '#ff69b4', '#ffc0cb'];
    
    function createParticle(type = 'petal') {
        if (particles.length >= MAX_PARTICLES) return;
        
        particles.push({
            x: Math.random() * canvas.clientWidth,
            y: canvas.clientHeight + 20,
            vx: (Math.random() - 0.5) * 0.8,
            vy: -(2 + Math.random() * 2.5),
            size: 8 + Math.random() * 16,
            life: 0,
            maxLife: 4 + Math.random() * 3,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            type
        });
    }
    
    // Optimized animation loop targeting 120fps
    let lastTime = performance.now();
    let spawnTimer = 0;
    
    function animate(currentTime) {
        const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.016); // Cap at 60fps minimum
        lastTime = currentTime;
        
        // Spawn particles
        spawnTimer += deltaTime;
        if (spawnTimer > 0.1) { // Spawn every 100ms
            createParticle();
            spawnTimer = 0;
        }
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        
        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            
            // Update physics
            p.life += deltaTime;
            if (p.life > p.maxLife) {
                particles.splice(i, 1);
                continue;
            }
            
            p.vy += 9.8 * 0.1 * deltaTime; // Gravity
            p.x += p.vx * 60 * deltaTime;
            p.y += p.vy * 60 * deltaTime;
            p.rotation += p.rotationSpeed * deltaTime;
            
            // Draw particle
            const alpha = 1 - (p.life / p.maxLife);
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.globalAlpha = alpha * 0.9;
            
            if (p.type === 'petal') {
                ctx.scale(1, 0.7);
                ctx.beginPath();
                ctx.ellipse(0, 0, p.size * 0.6, p.size, 0, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            }
            
            ctx.restore();
        }
        
        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
    
    // Sparkle effects
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.background = `radial-gradient(circle, rgba(255,255,255,0.9), ${colors[Math.floor(Math.random() * colors.length)]})`;
        document.body.appendChild(sparkle);
        
        // Animate sparkle
        let startTime = performance.now();
        function animateSparkle(time) {
            const progress = Math.min((time - startTime) / 800, 1);
            const scale = 1 + progress * 0.5;
            const opacity = 1 - progress;
            const rotation = progress * 360;
            
            sparkle.style.transform = `translate3d(-50%, -50%, 0) scale(${scale}) rotate(${rotation}deg)`;
            sparkle.style.opacity = opacity;
            
            if (progress < 1) {
                requestAnimationFrame(animateSparkle);
            } else {
                sparkle.remove();
            }
        }
        requestAnimationFrame(animateSparkle);
    }
    
    // Click sparkles
    document.addEventListener('click', (e) => {
        createSparkle(e.clientX, e.clientY);
    }, { passive: true });
    
    // 3D tile interactions
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.addEventListener('mousemove', (e) => {
            const rect = tile.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) / rect.width;
            const deltaY = (e.clientY - centerY) / rect.height;
            const rotateX = -deltaY * 15;
            const rotateY = deltaX * 15;
            
            tile.style.transform = `translateZ(30px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        tile.addEventListener('mouseleave', () => {
            tile.style.transform = '';
        });
        
        tile.addEventListener('click', () => {
            // Pop effect
            tile.style.transform = 'translateZ(60px) scale(1.15)';
            setTimeout(() => {
                tile.style.transform = '';
            }, 300);
            
            // Create explosion
            for (let i = 0; i < 10; i++) {
                setTimeout(() => createParticle('bubble'), i * 50);
            }
        });
    });
    
    // Entrance animations
    function animateEntrance() {
        const title = document.querySelector('.message h1');
        const lines = document.querySelectorAll('.line');
        
        if (title) {
            title.animate([
                { transform: 'translateY(30px) scale(0.95)', opacity: 0 },
                { transform: 'translateY(0) scale(1)', opacity: 1 }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.2, 0.9, 0.2, 1)',
                fill: 'forwards'
            });
        }
        
        lines.forEach((line, index) => {
            line.animate([
                { transform: 'translateY(20px)', opacity: 0 },
                { transform: 'translateY(0)', opacity: 1 }
            ], {
                duration: 600,
                delay: 300 + index * 150,
                easing: 'cubic-bezier(0.2, 0.9, 0.2, 1)',
                fill: 'forwards'
            });
        });
    }
    
    // Celebrate button functionality
    const celebrateBtn = document.getElementById('celebrateBtn');
    if (celebrateBtn) {
        celebrateBtn.addEventListener('click', () => {
            const title = document.querySelector('.message h1');
            if (title) {
                title.textContent = 'Happy 26th Birthday, Revathi Guna! 👑';
            }
            
            // Particle explosion
            for (let i = 0; i < 50; i++) {
                setTimeout(() => createParticle('petal'), i * 30);
            }
            
            // Sparkle burst
            const rect = celebrateBtn.getBoundingClientRect();
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    createSparkle(
                        rect.left + Math.random() * rect.width,
                        rect.top + Math.random() * rect.height
                    );
                }, i * 80);
            }
            
            // Screen shake
            const stage = document.querySelector('.stage');
            if (stage) {
                stage.animate([
                    { transform: 'translateZ(0)' },
                    { transform: 'translateZ(0) translateX(8px)' },
                    { transform: 'translateZ(0) translateX(-8px)' },
                    { transform: 'translateZ(0)' }
                ], {
                    duration: 500,
                    easing: 'ease-in-out'
                });
            }
        });
    }
    
    // Music control
    const musicBtn = document.getElementById('musicBtn');
    const bgAudio = document.getElementById('bgAudio');
    let isPlaying = false;
    
    if (musicBtn && bgAudio) {
        musicBtn.addEventListener('click', async () => {
            try {
                if (!isPlaying) {
                    await bgAudio.play();
                    musicBtn.textContent = '🔇 Stop';
                    musicBtn.setAttribute('aria-pressed', 'true');
                    isPlaying = true;
                } else {
                    bgAudio.pause();
                    musicBtn.textContent = '🔊 Play';
                    musicBtn.setAttribute('aria-pressed', 'false');
                    isPlaying = false;
                }
            } catch (error) {
                console.log('Audio play failed:', error);
            }
        });
    }
    
    // Initialize entrance animations
    requestAnimationFrame(animateEntrance);
    
    // Performance monitoring (optional)
    let frameCount = 0;
    let lastFPSTime = performance.now();
    
    function monitorFPS() {
        frameCount++;
        const now = performance.now();
        if (now - lastFPSTime >= 1000) {
            console.log(`FPS: ${frameCount}`);
            frameCount = 0;
            lastFPSTime = now;
        }
        requestAnimationFrame(monitorFPS);
    }
    
    // Uncomment to monitor FPS
    // requestAnimationFrame(monitorFPS);
    
})();