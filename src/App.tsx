import { useEffect, useState, useRef } from 'react';
import heroImg from './assets/hero-img.png';
import testimonialsImg from './assets/testimonials-img.png';
import testi1 from './assets/Testimonial/image.png';
import testi2 from './assets/Testimonial/image copy.png';
import testi3 from './assets/Testimonial/image copy 2.png';
import testi4 from './assets/Testimonial/image copy 3.png';
import testi5 from './assets/Testimonial/image copy 4.png';
import './index.css';

function App() {
  // Premium smooth scroll reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Scroll Progress Bar Logic
  const [scrollProgress, setScrollProgress] = useState(0);

  // Lightbox State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Spotlight Effect for Cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    });
  };

  // Floating particles canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; r: number; dx: number; dy: number; o: number }[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        o: Math.random() * 0.4 + 0.1,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${p.o})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <>
      <canvas ref={canvasRef} className="particles-canvas" />
      <div className="noise-overlay"></div>
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ transform: `scaleX(${scrollProgress})` }}></div>
      </div>
      <div className="container">
        {/* Navbar */}
        <nav className="navbar animate-fade-up">
          <div className="logo">
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="logo-icon"
            >
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="hero">
          <div className="hero-content">
            <div className="hero-text scroll-animate delay-1">
              {/* Premium Badge */}
              <div className="hero-badge">
                <span className="hero-badge-dot"></span>
                Built for Filipino Creatives
              </div>

              <h1 className="title">
                Get Paid to Edit Videos<br/>From Anywhere.
              </h1>
              
              <div className="hero-meta">
                <p className="subtitle">
                  Video editing is one of the highest demand skills online right
                  now. Here's how Filipinos with just a laptop are earning ₱30K
                  to ₱100K a month with zero degree and zero experience.
                </p>
                <div className="hero-bottom-row">
                  <div className="tags">
                    NO DEGREE. NO CAPITAL. NO EXPERIENCE NEEDED.
                  </div>
                  <div className="hero-buttons">
                    <a href="https://discord.gg/jGGd2K9a" target="_blank" rel="noopener noreferrer" className="cta-button">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4L11 21L14 14L21 11L4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Join Creative Freelance Academy
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-image-wrapper scroll-animate delay-2">
              <img 
                src={heroImg} 
                alt="Video Editing Workspace" 
                className="hero-image"
              />
              <img 
                src={testimonialsImg} 
                alt="Student Earnings" 
                className="hero-image"
              />
            </div>

            {/* Social Proof Strip */}
            <div className="social-proof scroll-animate delay-3">
              <span className="social-proof-label">Trusted by</span>
              <div className="social-proof-avatars">
                <div className="avatar">R</div>
                <div className="avatar">K</div>
                <div className="avatar">J</div>
                <div className="avatar">M</div>
                <div className="avatar">+</div>
              </div>
              <span className="social-proof-text">500+ students already inside</span>
            </div>
          </div>
        </main>



        <div className="glow-divider"></div>

        {/* Who This Is For Section */}
        <section className="scroll-animate delay-1">
          <div className="section-label">WHO THIS IS FOR</div>
          <h2 className="section-title">Designed for Filipinos starting from zero.</h2>
          <p className="section-subtitle">
            Whether you are a student, employee, or someone who just wants to build your future. CFA was built for you.
          </p>
        </section>

        <div className="glow-divider"></div>

        {/* What You'll Learn Section */}
        <section className="scroll-animate">
          <div className="section-label">WHAT YOU'LL LEARN</div>
          <h2 className="section-title">Everything from skill to your first client.</h2>
          <p className="section-subtitle">
            The free guide covers the foundation. CFA Pro covers the complete system, from first edit to your first recurring retainer income.
          </p>

          <div className="cards-grid" onMouseMove={handleMouseMove}>
            <div className="card scroll-animate delay-1">
              <div className="card-icon">🎬</div>
              <h3>Video Editing</h3>
              <p>CapCut basics • CapCut advanced • Masking • Keyframes • Pacing and flow • Editing system • Edit faster</p>
            </div>
            <div className="card scroll-animate delay-2">
              <div className="card-icon">🎨</div>
              <h3>Design</h3>
              <p>Graphic design basics • Visual hierarchy • Contrast and alignment • Typography • Color theory • Thumbnail design • Canva and Photoshop • Creative eye</p>
            </div>
            <div className="card scroll-animate delay-3">
              <div className="card-icon">💼</div>
              <h3>Freelancing</h3>
              <p>Foundation • Retainer model • Niches • Dream customer • Offer creation • Pricing strategy • Portfolio building • Personal brand • Lead generation • Client acquisition • Closing clients • Client retention • Referral system • Scale and automate</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials scroll-animate" id="testimonials">
          <div className="section-label">TESTIMONIALS</div>
          <h2 className="section-title">They started with zero.<br/>Here's what happened.</h2>
          
          <div className="testimonials-masonry">
            <div className="testimonials-column">
              <div className="testimonials-image-wrapper scroll-animate delay-1" onClick={() => setSelectedImage(testi1)}>
                <img src={testi1} alt="Student Testimonial" className="testimonials-image" />
                <div className="image-overlay"><span>Click to view</span></div>
              </div>
              <div className="testimonials-image-wrapper scroll-animate delay-2" onClick={() => setSelectedImage(testi2)}>
                <img src={testi2} alt="Student Testimonial" className="testimonials-image" />
                <div className="image-overlay"><span>Click to view</span></div>
              </div>
            </div>
            <div className="testimonials-column">
              <div className="testimonials-image-wrapper scroll-animate delay-3" onClick={() => setSelectedImage(testi3)}>
                <img src={testi3} alt="Student Testimonial" className="testimonials-image" />
                <div className="image-overlay"><span>Click to view</span></div>
              </div>
              <div className="testimonials-image-wrapper scroll-animate delay-1" onClick={() => setSelectedImage(testi4)}>
                <img src={testi4} alt="Student Testimonial" className="testimonials-image" />
                <div className="image-overlay"><span>Click to view</span></div>
              </div>
            </div>
            <div className="testimonials-column">
              <div className="testimonials-image-wrapper scroll-animate delay-2" onClick={() => setSelectedImage(testi5)}>
                <img src={testi5} alt="Student Testimonial" className="testimonials-image" />
                <div className="image-overlay"><span>Click to view</span></div>
              </div>
            </div>
          </div>
        </section>

        <div className="glow-divider"></div>

        {/* Bottom CTA Section */}
        <section className="bottom-cta scroll-animate">
          <h2>These people started<br/>exactly where you are.</h2>
          <h3>The only difference between you and them? They started.</h3>
          <p>Ready to actually earn? Join the community. Get the free guide. Start today.</p>
          
          <div className="cta-container">
            <a href="https://discord.gg/jGGd2K9a" target="_blank" rel="noopener noreferrer" className="cta-button cta-button-large">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4L11 21L14 14L21 11L4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Join Creative Freelance Academy
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer scroll-animate">
          <p>© 2026 Creative Freelance Academy. All rights reserved.</p>
        </footer>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>✕</button>
            <img src={selectedImage} alt="Enlarged Testimonial" className="lightbox-image" />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
