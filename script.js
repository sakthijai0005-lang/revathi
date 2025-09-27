// Add interactive sparkles on click
document.addEventListener('click', function(e) {
    createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '10px';
    sparkle.style.height = '10px';
    sparkle.style.background = '#ff69b4';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Auto-generate more hearts periodically
setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = '0s';
    heart.style.background = ['#ff1493', '#ff69b4', '#ffc0cb'][Math.floor(Math.random() * 3)];
    
    document.querySelector('.hearts').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 6000);
}, 2000);

// Celebration button functionality
document.addEventListener('DOMContentLoaded', function() {
    const celebrateBtn = document.querySelector('.celebration-btn');
    
    if (celebrateBtn) {
        celebrateBtn.addEventListener('click', function() {
            // Create explosion effect
            for(let i = 0; i < 20; i++) {
                createExplosion();
            }
            
            // Shake effect
            document.body.style.animation = 'shake 0.5s';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 500);
        });
    }
});

function createExplosion() {
    const explosion = document.createElement('div');
    explosion.style.position = 'fixed';
    explosion.style.left = Math.random() * window.innerWidth + 'px';
    explosion.style.top = Math.random() * window.innerHeight + 'px';
    explosion.style.width = '20px';
    explosion.style.height = '20px';
    explosion.style.background = ['#ff1493', '#ff69b4', '#ffc0cb', '#ffb6c1'][Math.floor(Math.random() * 4)];
    explosion.style.borderRadius = '50%';
    explosion.style.pointerEvents = 'none';
    explosion.style.zIndex = '1000';
    explosion.style.animation = 'explode 1.5s ease-out forwards';
    
    document.body.appendChild(explosion);
    
    setTimeout(() => {
        explosion.remove();
    }, 1500);
}

// Dynamic particle system
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.width = Math.random() * 8 + 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = ['#ff1493', '#ff69b4', '#ffc0cb'][Math.floor(Math.random() * 3)];
        particle.style.borderRadius = '50%';
        particle.style.opacity = '0.7';
        particle.style.animation = 'particleRise 6s linear forwards';
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 6000);
    }, 300);
}



// Add more CSS animations dynamically
const additionalStyles = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes explode {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(2) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes particleRise {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes ripple3D {
        0% {
            width: 0;
            height: 0;
            opacity: 0.8;
            transform: translate(-50%, -50%) translateZ(20px) rotateX(0deg);
        }
        100% {
            width: 200px;
            height: 200px;
            opacity: 0;
            transform: translate(-50%, -50%) translateZ(50px) rotateX(360deg);
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize particle system
createParticles();

// Mouse trail effect
let mouseTrail = [];
document.addEventListener('mousemove', function(e) {
    mouseTrail.push({x: e.clientX, y: e.clientY, time: Date.now()});
    
    if(mouseTrail.length > 10) {
        mouseTrail.shift();
    }
    
    // Create trail particle
    if(Math.random() > 0.7) {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.width = '5px';
        trail.style.height = '5px';
        trail.style.background = '#ff69b4';
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '999';
        trail.style.opacity = '0.8';
        trail.style.animation = 'fadeOut 1s ease-out forwards';
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 1000);
    }
});

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        0% { opacity: 0.8; transform: scale(1); }
        100% { opacity: 0; transform: scale(0); }
    }
`;
document.head.appendChild(fadeOutStyle);

// Music functionality with local files
let bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

// Music button functionality
const musicBtn = document.getElementById('musicBtn');
if (musicBtn) {
    musicBtn.addEventListener('click', function() {
        if (!isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicBtn.textContent = '🔇 Stop Music';
                musicBtn.classList.add('playing');
            }).catch(e => {
                console.log('Audio play failed:', e);
            });
        } else {
            bgMusic.pause();
            isPlaying = false;
            musicBtn.textContent = '🎵 Play Music';
            musicBtn.classList.remove('playing');
        }
    });
}

// 3D Image interactions
document.querySelectorAll('.img-3d').forEach((img, index) => {
    img.style.setProperty('--rotate-y', `${(index % 4) * 15 - 30}deg`);
    
    img.addEventListener('click', function() {
        // Enhanced 3D flip effect
        this.style.transform = 'rotateY(360deg) rotateX(360deg) scale(1.5) translateZ(100px)';
        
        setTimeout(() => {
            this.style.transform = '';
        }, 1000);
        
        // Create 3D ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.background = 'radial-gradient(circle, rgba(255,105,180,0.8) 0%, transparent 70%)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%) translateZ(20px)';
        ripple.style.animation = 'ripple3D 1.5s ease-out forwards';
        ripple.style.pointerEvents = 'none';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1500);
    });
});

// Device orientation for mobile 3D effects
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(e) {
        const tiltX = e.beta; // -180 to 180
        const tiltY = e.gamma; // -90 to 90
        
        document.querySelectorAll('.img-3d').forEach(img => {
            const intensity = 0.5;
            img.style.transform += ` rotateX(${tiltX * intensity}deg) rotateY(${tiltY * intensity}deg)`;
        });
    });
}