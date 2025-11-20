import React, { useState, useEffect } from 'react';

// --- Data Objects ---

const skillsData = [
  { title: "Generative AI", learners: "1.7M+", icon: "🤖" },
  { title: "IT Certifications", learners: "14M+", icon: "💻" },
  { title: "Data Science", learners: "8.1M+", icon: "📊" },
  { title: "ChatGPT", learners: "5M+", icon: "💬" },
  { title: "Leadership", learners: "3.2M+", icon: "👔" },
  { title: "Communication", learners: "5.5M+", icon: "🗣️" }
];

const coursesData = [
  {
    id: 1,
    title: "The AI Engineer Course 2025: Complete AI Engineer Bootcamp",
    instructor: "365 Careers",
    rating: 4.6,
    reviews: "11,778",
    price: "E£349.99",
    oldPrice: "E£679.99",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    bestseller: true,
    category: "AI"
  },
  {
    id: 2,
    title: "Intro to AI Agents and Agentic AI",
    instructor: "365 Careers",
    rating: 4.4,
    reviews: "1,806",
    price: "E£349.99",
    oldPrice: "E£679.99",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    bestseller: true,
    category: "AI"
  },
  {
    id: 3,
    title: "Artificial Intelligence for Business + ChatGPT Prize [2025]",
    instructor: "Hadelin de Ponteves, Kirill Eremenko",
    rating: 4.4,
    reviews: "4,859",
    price: "E£579.99",
    oldPrice: "E£2,199.99",
    image: "https://images.unsplash.com/photo-1655720031554-a929595ffad7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    bestseller: false,
    category: "AI"
  },
  {
    id: 4,
    title: "Data Science & AI Masters 2025 - From Python To Gen AI",
    instructor: "Dr. Satyajit Pattnaik",
    rating: 4.5,
    reviews: "1,623",
    price: "E£349.99",
    oldPrice: "E£1,299.99",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    bestseller: true,
    category: "AI"
  }
];

const partnerLogos = [
  { name: "Volkswagen", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/600px-Volkswagen_logo_2019.svg.png" },
  { name: "Samsung", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png" },
  { name: "Cisco", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png" },
  { name: "Vimeo", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Vimeo_Logo_blue.svg/2560px-Vimeo_Logo_blue.svg.png" },
  { name: "P&G", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Procter_%26_Gamble_logo.svg/1200px-Procter_%26_Gamble_logo.svg.png" },
  { name: "Citi", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Citi.svg/1200px-Citi.svg.png" },
  { name: "Ericsson", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Ericsson_logo.svg/1200px-Ericsson_logo.svg.png" }
];

// --- Components ---

const Navbar = ({ isDark, toggleTheme }) => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo-container">
            {/* Conditionally render based on isDark state, or use CSS classes if keeping strict style separation */}
            <img 
                src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg" 
                alt="Udemy Logo" 
                className={`logo-img ${isDark ? 'hidden' : 'block'}`} 
                style={{ display: isDark ? 'none' : 'block' }}
            />
            <img 
                src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy-inverted.svg" 
                alt="Udemy Logo" 
                className={`logo-img ${isDark ? 'block' : 'hidden'}`} 
                style={{ display: isDark ? 'block' : 'none' }}
            />
        </div>
        <a href="#" className="nav-link">Categories</a>
      </div>

      <div className="nav-center">
        <div className="search-container">
          <span className="search-icon">&#128269;</span>
          <input type="text" placeholder="Search for anything" className="search-input" />
        </div>
      </div>

      <div className="nav-right">
        <a href="#" className="nav-link desktop-only">Udemy Business</a>
        <a href="#" className="nav-link desktop-only">Teach on Udemy</a>
        
        <a href="#" className="nav-icon">&#128722;</a>

        <div className="auth-buttons desktop-only">
          <button className="btn btn-white">Log in</button>
          <button className="btn btn-black">Sign up</button>
        </div>
        
        <button className="btn btn-icon desktop-only globe-btn">
             &#127760;
        </button>
        
        <button className="btn btn-icon" onClick={toggleTheme}>
            {isDark ? '☀️' : '🌙'} {/* Simple text toggle for React demo */}
        </button>
      </div>
    </nav>
  );
};

const Hero = () => (
  <header className="hero">
    <div className="hero-image-container">
      <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Hero" className="hero-img" />
    </div>
    <div className="hero-card">
      <h1>Jump into learning — for less</h1>
      <p>If you're new to Udemy, we've got good news: For a limited time, courses start at just E£259.99 for new learners!</p>
      <button className="btn btn-black big-btn">Sign up now</button>
    </div>
  </header>
);

const Skills = () => (
  <section className="section-padding gray-bg">
    <div className="container">
      <h2>Learn essential career and life skills</h2>
      <p className="subtitle">Udemy helps you build in-demand skills fast and advance your career in a changing job market.</p>
      
      <div className="skills-carousel">
        {skillsData.map((skill, index) => (
          <div className="skill-card" key={index}>
            <span style={{ fontSize: '24px' }}>{skill.icon}</span>
            <div>
              <h3>{skill.title}</h3>
              <span style={{ color: 'var(--secondary-text)', fontSize: '0.9rem', fontWeight: 'normal' }}>{skill.learners} learners</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CourseCard = ({ course }) => (
  <div className="course-card">
    <div className="course-img-wrapper">
      <img src={course.image} alt={course.title} className="course-img" />
    </div>
    <h3 className="course-title">{course.title}</h3>
    <p className="course-author">{course.instructor}</p>
    <div className="course-rating">
      <span>{course.rating}</span>
      <div className="stars">
        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
      </div>
      <span style={{ color: 'var(--secondary-text)', fontWeight: 'normal' }}>({course.reviews})</span>
    </div>
    <div className="course-price-row">
      <span className="course-price">{course.price}</span>
      <span className="course-old-price" style={{ textDecoration: 'line-through', color: '#6a6f73', marginLeft: '8px', fontWeight: 'normal', fontSize: '14px' }}>{course.oldPrice}</span>
    </div>
    {course.bestseller && <div className="bestseller-badge">Bestseller</div>}
  </div>
);

const Courses = () => {
  const [activeTab, setActiveTab] = useState("Artificial Intelligence (AI)");
  const tabs = ["Artificial Intelligence (AI)", "Python", "Microsoft Excel", "Web Development"];

  return (
    <section className="section-padding">
      <div className="container">
        <h2>Skills to transform your career and life</h2>
        <p className="subtitle">From critical skills to technical topics, Udemy supports your professional development.</p>

        <div className="tabs-container">
          {tabs.map(tab => (
            <button 
              key={tab} 
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="courses-grid">
          {coursesData.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        
        <button className="btn btn-outline" style={{ marginTop: '30px' }}>
          Show all {activeTab} courses
        </button>
      </div>
    </section>
  );
};

const Promo = () => (
  <section className="section-padding promo-section">
    <div className="container promo-container">
        <div className="promo-text">
             <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>Reimagine your career in the AI era</h2>
             <p style={{ marginBottom: '24px', fontSize: '18px' }}>Future-proof your skills with Personal Plan. Get access to a variety of fresh content from real-world experts.</p>
             <button className="btn btn-black" style={{ borderColor: 'white', background: '#1c1d1f', color: 'white' }}>Learn more</button>
        </div>
        <div className="promo-image">
            <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Promo" style={{ width: '100%', maxWidth: '400px' }} />
        </div>
    </div>
  </section>
);

const TrustedBy = () => (
  <section className="section-padding gray-bg centered">
    <div className="container">
      <p className="trusted-text">Trusted by over 17,000 companies and millions of learners around the world</p>
      <div className="logos-grid">
        {partnerLogos.map((logo, index) => (
          <img key={index} src={logo.src} alt={logo.name} />
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
    <footer className="footer">
        <div className="container">
             <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                 <p>© 2025 Udemy, Inc.</p>
             </div>
        </div>
    </footer>
);


// --- Main App Component ---

const App = () => {
  // Initialize theme from localStorage or default to false (light)
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="app-wrapper">
      {/* We don't need a separate CSS file import here if we assume style.css is loaded in index.html, 
          but in a real React app, we would import './style.css'; */}
          
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <Hero />
      <Skills />
      <Courses />
      <Promo />
      <TrustedBy />
      <Footer />
    </div>
  );
};

export default App;