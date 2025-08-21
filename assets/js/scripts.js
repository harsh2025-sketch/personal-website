// Professional Personal Website JavaScript
// scripts.js

// --- Mobile Navigation ---
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('#mobile-menu .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });
    }
});

// --- Enhanced Canvas Animation Code for Homepage ---
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('neuron-canvas');
    if (!canvas) return; // Exit if canvas element is not on the page
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let animationId;

    const resizeCanvas = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        
        // Reinitialize nodes after resize
        nodes.length = 0;
        init();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Node {
        constructor(x, y) {
            this.x = x || Math.random() * width;
            this.y = y || Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.radius = Math.random() * 1.5 + 0.5;
            this.opacity = Math.random() * 0.15 + 0.05;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) {
                this.vx *= -1;
                this.x = Math.max(0, Math.min(width, this.x));
            }
            if (this.y < 0 || this.y > height) {
                this.vy *= -1;
                this.y = Math.max(0, Math.min(height, this.y));
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 170, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    const nodes = [];
    const numNodes = Math.min(100, Math.floor((width * height) / 15000)); // Responsive node count
    const connectionDistance = Math.min(150, width / 8); // Responsive connection distance

    const init = () => {
        const actualNodeCount = Math.min(numNodes, Math.floor((width * height) / 15000));
        for (let i = 0; i < actualNodeCount; i++) {
            nodes.push(new Node());
        }
    };

    const connectNodes = () => {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < connectionDistance) {
                    const opacity = 0.5 - (dist / connectionDistance) * 0.5;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 170, 255, ${opacity})`;
                    ctx.lineWidth = 0.4;
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
    };

    const animate = () => {
        // Clear canvas with slight trail effect
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, width, height);

        connectNodes();
        nodes.forEach(node => {
            node.update();
            node.draw();
        });

        animationId = requestAnimationFrame(animate);
    };

    // Performance optimization: pause animation when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        } else {
            animate();
        }
    });

    init();
    animate();
});

// --- Utility Functions ---

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Form validation and enhancement
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            // Add focus/blur effects
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    });
});

// --- End of Canvas Animation Code ---
