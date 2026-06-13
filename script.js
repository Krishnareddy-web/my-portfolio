

// --- Typing Effect ---
const typedTextSpan = document.getElementById("typed-text");
const textArray = [
    "Full-Stack Developer", 
    "AI/ML Engineer", 
    "React & Next.js Expert", 
    "Django & Spring Boot Dev",
    "3D Web Enthusiast"
];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (!typedTextSpan) return;
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (!typedTextSpan) return;
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if (typedTextSpan && textArray.length) setTimeout(type, newTextDelay + 250);
});

// --- GSAP Scroll Animations ---
gsap.registerPlugin(ScrollTrigger);

// Navbar effect on scroll
const nav = document.querySelector('.glass-nav');
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.padding = '1rem 2rem';
        nav.style.background = 'rgba(5, 5, 5, 0.9)';
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        }
    } else {
        nav.style.padding = '1.5rem 2rem';
        nav.style.background = 'rgba(5, 5, 5, 0.7)';
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '0.7';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    }
});

// Reveal Sections
const sections = document.querySelectorAll('.section-padding');
sections.forEach(section => {
    gsap.fromTo(section, 
        { opacity: 0, y: 50 },
        {
            opacity: 1, y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
            }
        }
    );
});

// Staggered Cards (Skills & Projects)
const skillCards = document.querySelectorAll('.skill-category');
gsap.fromTo(skillCards, 
    { opacity: 0, y: 30 },
    {
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 80%",
        }
    }
);

const projectCards = document.querySelectorAll('.project-card');
gsap.fromTo(projectCards, 
    { opacity: 0, x: -50 },
    {
        opacity: 1, x: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".project-showcase",
            start: "top 75%",
        }
    }
);

// --- Three.js 3D Background ---
const canvas = document.getElementById('webgl-canvas');
if (canvas) {
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        // Spread particles across a wide area
        posArray[i] = (Math.random() - 0.5) * 150;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material for particles
    const material = new THREE.PointsMaterial({
        size: 0.2,
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) - 0.5;
        mouseY = (event.clientY / window.innerHeight) - 0.5;
    });

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();

        // Rotate particles slowly
        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.02;

        // React to mouse movement
        particlesMesh.rotation.y += mouseX * 0.1;
        particlesMesh.rotation.x += mouseY * 0.1;

        renderer.render(scene, camera);
    }

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
}

// --- Let's Talk Button Logic ---
const letsTalkBtn = document.getElementById('lets-talk-btn');
const talkOptions = document.getElementById('talk-options');

if (letsTalkBtn && talkOptions) {
    letsTalkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        talkOptions.classList.toggle('show');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!talkOptions.contains(e.target) && e.target !== letsTalkBtn) {
            talkOptions.classList.remove('show');
        }
    });
}
