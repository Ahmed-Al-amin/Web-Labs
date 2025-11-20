// --- Data Objects ---

// Skills Data with image backgrounds to mimic Udemy dashboard
const skillsData = [
    { title: "Large Language Models", learners: "210K+", image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80" },
    { title: "Machine Learning", learners: "9.1M+", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80" },
    { title: "AI Agents", learners: "330K+", image: "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?auto=format&fit=crop&w=1200&q=80" },
    { title: "Data Science", learners: "8.1M+", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80" },
    { title: "ChatGPT", learners: "5M+", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80" },
    { title: "Leadership", learners: "3.2M+", image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80" }
];

// Courses Data using the specific Unsplash images you provided
const coursesData = [
    {
        id: 1,
        title: "The AI Engineer Course 2025: Complete AI Engineer Bootcamp",
        instructor: "365 Careers",
        rating: 4.6,
        reviews: "11,778",
        price: "E£349.99",
        oldPrice: "E£679.99",
        // Image 1 provided
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        bestseller: true
    },
    {
        id: 2,
        title: "Intro to AI Agents and Agentic AI",
        instructor: "365 Careers",
        rating: 4.4,
        reviews: "1,806",
        price: "E£349.99",
        oldPrice: "E£679.99",
        // Image 2 provided
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        bestseller: true
    },
    {
        id: 3,
        title: "Artificial Intelligence for Business + ChatGPT Prize [2025]",
        instructor: "Hadelin de Ponteves, Kirill Eremenko",
        rating: 4.4,
        reviews: "4,859",
        price: "E£579.99",
        oldPrice: "E£2,199.99",
        // Image 3 provided
        image: "https://images.unsplash.com/photo-1655720031554-a929595ffad7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        bestseller: false
    },
    {
        id: 4,
        title: "Data Science & AI Masters 2025 - From Python To Gen AI",
        instructor: "Dr. Satyajit Pattnaik",
        rating: 4.5,
        reviews: "1,623",
        price: "E£349.99",
        oldPrice: "E£1,299.99",
        // Image 4 provided
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        bestseller: true
    }
];

// --- Initialization ---

// Wait for the DOM to fully load before running scripts
document.addEventListener("DOMContentLoaded", () => {
    renderSkills();
    renderCourses();
    setupDarkMode();
    setupTabs(); // Initialize tab switching logic
    setupCarousel(); // Initialize carousel button logic and keyboard support
});

// --- Render Functions ---

function renderSkills() {
    const container = document.getElementById('skills-container');
    // Generate HTML for each skill using an explicit image element for reliability
    const skillsHTML = skillsData.map(skill => {
        const imgTag = skill.image ? `<div class="card-media"><img src="${skill.image}" alt="${skill.title}"></div>` : '';
        return `
        <div class="skill-card">
            ${imgTag}
            <div class="card-overlay">
                <div class="overlay-left">
                    <div class="learners-pill">👥 ${skill.learners}</div>
                    <div class="overlay-title">${skill.title}</div>
                </div>
                <div class="overlay-arrow">→</div>
            </div>
        </div>`;
    }).join('');

    container.innerHTML = skillsHTML;

    // Generate dots under the carousel
    const dotsContainer = document.getElementById('carousel-dots');
    if(dotsContainer){
        dotsContainer.innerHTML = skillsData.map((_, i) => `<button data-index="${i}" aria-label="Go to slide ${i+1}"></button>`).join('');
    }
}

function setupCarousel(){
    const container = document.getElementById('skills-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.getElementById('carousel-dots');

    if(!container) return;

    function getScrollAmount(){
        const firstCard = container.querySelector('.skill-card');
        if(!firstCard) return Math.round(container.clientWidth * 0.8);
        const gap = parseInt(getComputedStyle(container).gap) || 16;
        return firstCard.offsetWidth + gap;
    }

    if(prevBtn){
        prevBtn.addEventListener('click', () => {
            container.scrollLeft -= getScrollAmount();
        });
    }

    if(nextBtn){
        nextBtn.addEventListener('click', () => {
            container.scrollLeft += getScrollAmount();
        });
    }

    // Dot click handling
    if(dotsContainer){
        dotsContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if(!btn) return;
            const idx = Number(btn.getAttribute('data-index'));
            container.scrollLeft = idx * getScrollAmount();
            updateActiveDot(idx);
        });
    }

    // Keyboard navigation for accessibility
    container.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowRight') container.scrollLeft += getScrollAmount();
        if(e.key === 'ArrowLeft') container.scrollLeft -= getScrollAmount();
    });

    // Update active dot on scroll
    let ticking = false;
    container.addEventListener('scroll', () => {
        if(!ticking){
            window.requestAnimationFrame(() => {
                const idx = Math.round(container.scrollLeft / getScrollAmount());
                updateActiveDot(idx);
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initialize active dot
    updateActiveDot(0);

    function updateActiveDot(index){
        const dots = document.querySelectorAll('#carousel-dots button');
        dots.forEach((d,i)=> d.classList.toggle('active', i === index));
    }
}

function renderCourses() {
    const container = document.getElementById('courses-container');

    // Generate HTML for each course
    const coursesHTML = coursesData.map(course => `
        <div class="course-card">
            <div class="course-img-wrapper">
                <img src="${course.image}" alt="${course.title}" class="course-img">
                <div class="course-overlay"></div>
            </div>
            <h3 class="course-title">${course.title}</h3>
            <p class="course-author">${course.instructor}</p>
            <div class="course-rating">
                <span>${course.rating}</span>
                <!-- Star Rating Visuals -->
                <div class="stars">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span> 
                    <!-- Note: In a real app, you'd calculate filled stars based on rating -->
                </div>
                <span style="color: var(--secondary-text); font-weight: normal;">(${course.reviews})</span>
            </div>
            <div class="course-price-row">
                <span class="course-price">${course.price}</span>
                <span class="course-old-price">${course.oldPrice}</span>
            </div>
            ${course.bestseller ? '<div class="bestseller-badge">Bestseller</div>' : ''}
        </div>
    `).join('');

    container.innerHTML = coursesHTML;
}

// --- Interactive Logic ---

function setupDarkMode() {
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Optional: Save preference to localStorage so it persists on reload
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Check for saved preference on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
}

function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // In a real app, this would filter the courses. 
            // For this demo, we'll just log the category change.
            console.log(`Switched to category: ${tab.innerText}`);
        });
    });
}