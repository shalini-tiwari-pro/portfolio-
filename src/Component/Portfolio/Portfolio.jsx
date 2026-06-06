import { useState, useEffect, useRef } from "react";
import "./Portfolio.css";

/* ─── DATA ─────────────────────────────────────────────────── */
const NAV_LINKS = [
  "About",
  "Skills",
  "Education",
  "Experience",
  "Projects",
  "Certifications",
  "Hobbies",
  "Contact",
];

const SKILLS = {
  "Frontend Development": ["HTML5", "CSS3", "JavaScript", "React.js"],
  Languages: ["C", "C++"],
  "Core CS": ["DBMS", "OOP", "Data Structures","Software Engineering"],
  Other: ["Learning Automation", "Team Collaboration", "Problem Solving"],
};

const EDUCATION = [
  {
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    institute: "United College Of Engineering And Research",
    year: "2022 – 2026",
    grade: "7.8 CGPA",
    desc: "Relevant coursework in Data Structures, DBMS, OOP, Operating Systems, and Web Technologies.",
  },
  {
    degree: "Intermediate (12th)",
    field: "PCM",
    institute: "Kendriya Vidyalaya new cantt prayagraj, Uttar Pradesh",
    year: "2020 – 2021",
    grade: "81%",
    desc: "Strong foundation in Mathematics, Physics, and Computer Science fundamentals.",
  },
  {
    degree: "High School (10th)",
    field: "General Studies",
    institute: "Kendriya Vidyalaya new cantt prayagraj, Uttar Pradesh",
    year: "2018 – 2019",
    grade: "85.6%",
    desc: "Ranked among top students in the batch with distinction in Science and Mathematics.",
  },
];

const EXPERIENCE = [
  {
    role: "Frontend Developer Intern",
    company: "ZikRme",
    duration: "April 2025 – August 2025",
    type: "Internship",
    points: [
      "Built responsive UI components using React.js and CSS3 following design specs.",
      "Collaborated with a team of 4 developers using Git for version control and code review.",
    
      "It gave hands-on experience in handling work responsibilities.",
      "One major learning from this role was clear communication in a professional settings"
    ],
  },
  {
    role: "Robotic Process Automation Tranee",
    company: "Training Institute / College Lab",
    duration: "27 jan 2026 – 9 feb 2026",
    type: "Training",
    points: [
     
      "RPA is a technology that uses software robots to automate repetitive, rule-based business tasks, mimicking human actions on computer systems.",
      "learn these automation like,",
      " Web – Automates website tasks online",
      "Email – Sends reads filters emails",
      "Excel – Reads writes spreadsheet data",
     "PDF – Extracts merges splits PDFs",
      "use automation technology in real life work and automate the repetitive task",
    ],
  },
];

const PROJECTS = [
  {
    title: "NGO Web Platform",
    tech: ["html", "css", "javascript"],
    year: "2024",
    desc: "Developed a responsive multi-page web application to showcase global social initiatives and stream secure localized online funding donation assets using HTML5, CSS3, and JavaScript. ",
    link: "https://precious-donut-404dd2.netlify.app/",
    repo: "https://github.com/shalini-tiwari-pro/ngo-website",
  },
  {
    title: "Rental Rides webpage",
    tech: ["HTML", "CSS", "JavaScript", "React js"],
    year: "2025",
    desc: "Architected an interactive fleet-booking automation platform using React.js.Synced client-side validation logic with fluid component states and compiled codebase builds for high-availability Netlify hosting delivery. ",
    link: "https://hilarious-mousse-4ad584.netlify.app/",
    repo: "https://github.com/shalini-tiwari-pro/car-rental-project",
  },
  {
    title: "Tour webpage",
    tech: ["React.js", "CSS3"],
    year: "2025",
    desc: "A responsive tour listing application built with React.js. Users can browse through available tour destinations, view details like price, description, and location, and remove tours they are not interested in. Features a clean card-based layout with dynamic state management and a reset option to restore all tours.",
    link: "https://harmonious-scone-ad284f.netlify.app/",
    repo: "https://github.com/shalini-tiwari-pro/Tour-page",
  },
  {
    title: "Restaurant Web Application",
    tech: ["HTML", "CSS", "JavaScript", "React js"],
    year: "2025",
    desc: "Designed and deployed a stateful single-page responsive application leveraging React.js. Implemented high-performance client-side search indexing algorithms, custom component sorting modules,and fluid UI layout animations. ",
    link: "https://luminous-platypus-d454a6.netlify.app/",
    repo: "https://github.com/shalini-tiwari-pro/restaurant-zikRme",
  },
];

const CERTIFICATIONS = [
  {
    name: "Robotic Process Automation Certificate",
    issuer: "ict acedemy",
    year: "(jan 2026)",
    id: "G-2026-GS268-0043",
  },
  {
    name: "MERN Stack Web Development Certificate",
    issuer: "Softpro",
    year: "(May 2025)",
    id: "UC-XXXXXXX",
  },
  {
    name: "Data Structures and Algorithms (DSA) with C/C++s",
    issuer: " Pregrad",
    year: "(August 2024)",
    id: "https://cert.diceid.com",
  },
  {
    name: "C++ Programming using Standard Template Library (STL)",
    issuer: "UCER",
    year: "(August 2023)",
    id: "NPTEL-2023-XX",
  },
];

const HOBBIES = [
  {
    label: "Reading Tech Blogs",
    detail:
      "Staying updated with frontend trends, React updates, and CS research.",
  },
  {
    label: "Competitive Coding",
    detail:
      "Regular practice on LeetCode and HackerRank — focused on DSA problems.",
  },
  {
    label: "UI/UX Exploration",
    detail:
      "Studying design systems, typography, and usability principles in my spare time.",
  },
  {
    label: "Cooking",
    detail:
      "Trying new recipes brings me the same joy as debugging a tricky bug — patience pays off.",
  },
  {
    label: "Travelling",
    detail:
      "Exploring new places in Uttar Pradesh and beyond — travel broadens perspective.",
  },
  {
    label: "Music",
    detail:
      "Listening to instrumental music while coding keeps the focus sharp and creative.",
  },
];

/* ─── HOOK: INTERSECTION OBSERVER ───────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── SUBCOMPONENTS ─────────────────────────────────────────── */

function SectionHeading({ label, sub }) {
  return (
    <div className="section-heading">
      <span className="section-label">{label}</span>
      {sub && <p className="section-sub">{sub}</p>}
      <div className="heading-line" />
    </div>
  );
}

function SkillsSection() {
  const [ref, visible] = useReveal();
  return (
    <section id="skills" className="section" ref={ref}>
      <SectionHeading
        label="Skills"
        sub="Technologies and competencies I work with"
      />
      <div className={`skills-grid fade-in ${visible ? "visible" : ""}`}>
        {Object.entries(SKILLS).map(([cat, items]) => (
          <div className="skill-card" key={cat}>
            <h3 className="skill-cat">{cat}</h3>
            <div className="skill-tags">
              {items.map((s) => (
                <span className="skill-tag" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EducationSection() {
  const [ref, visible] = useReveal();
  return (
    <section id="education" className="section section-alt" ref={ref}>
      <SectionHeading
        label="Education"
        sub="Academic background and qualifications"
      />
      <div className={`timeline fade-in ${visible ? "visible" : ""}`}>
        {EDUCATION.map((e, i) => (
          <div className="timeline-item" key={i}>
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="tl-top">
                <div>
                  <p className="tl-degree">{e.degree}</p>
                  <p className="tl-field">{e.field}</p>
                </div>
                <span className="tl-year">{e.year}</span>
              </div>
              <p className="tl-institute">{e.institute}</p>
              <p className="tl-grade">
                Grade: <strong>{e.grade}</strong>
              </p>
              <p className="tl-desc">{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [ref, visible] = useReveal();
  return (
    <section id="experience" className="section" ref={ref}>
      <SectionHeading
        label="Experience"
        sub="Internships, training, and hands-on work"
      />
      <div className={`exp-list fade-in ${visible ? "visible" : ""}`}>
        {EXPERIENCE.map((ex, i) => (
          <div className="exp-card" key={i}>
            <div className="exp-header">
              <div>
                <p className="exp-role">{ex.role}</p>
                <p className="exp-company">{ex.company}</p>
              </div>
              <div className="exp-meta">
                <span className="exp-type">{ex.type}</span>
                <span className="exp-dur">{ex.duration}</span>
              </div>
            </div>
            <ul className="exp-points">
              {ex.points.map((p, j) => (
                <li key={j}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [ref, visible] = useReveal();
  return (
    <section id="projects" className="section section-alt" ref={ref}>
      <SectionHeading label="Projects" sub="Things I have built and shipped" />
      <div className={`projects-grid fade-in ${visible ? "visible" : ""}`}>
        {PROJECTS.map((p, i) => (
          <div className="project-card" key={i}>
            <div className="proj-top">
              <span className="proj-year">{p.year}</span>
              <div className="proj-links">
                <a href={p.repo} className="proj-link">
                  Code
                </a>
                <a href={p.link} className="proj-link proj-link--live">
                  Live
                </a>
              </div>
            </div>
            <h3 className="proj-title">{p.title}</h3>
            <p className="proj-desc">{p.desc}</p>
            <div className="proj-tags">
              {p.tech.map((t) => (
                <span className="proj-tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CertificationsSection() {
  const [ref, visible] = useReveal();
  return (
    <section id="certifications" className="section" ref={ref}>
      <SectionHeading
        label="Certifications"
        sub="Verified credentials and completed courses"
      />
      <div className={`cert-list fade-in ${visible ? "visible" : ""}`}>
        {CERTIFICATIONS.map((c, i) => (
          <div className="cert-row" key={i}>
            <div className="cert-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="cert-info">
              <p className="cert-name">{c.name}</p>
              <p className="cert-issuer">
                {c.issuer} &mdash; {c.year}
              </p>
            </div>
            <span className="cert-id">{c.id}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function HobbiesSection() {
  const [ref, visible] = useReveal();
  return (
    <section id="hobbies" className="section section-alt" ref={ref}>
      <SectionHeading
        label="Beyond Work"
        sub="What keeps me going outside of code"
      />
      <div className={`hobbies-grid fade-in ${visible ? "visible" : ""}`}>
        {HOBBIES.map((h, i) => (
          <div className="hobby-card" key={i}>
            <p className="hobby-label">{h.label}</p>
            <p className="hobby-detail">{h.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  const [ref, visible] = useReveal();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1400);
  };

  return (
    <section id="contact" className="section" ref={ref}>
      <SectionHeading
        label="Reach Out"
        sub="Open to opportunities, collaborations, and conversations"
      />
      <div className={`contact-wrap fade-in ${visible ? "visible" : ""}`}>
        <div className="contact-info">
          <p className="contact-blurb">
            I am actively looking for job opertunities. If you have an opening,
            a freelance project, or just want to connect — my inbox is always
            open.
          </p>
          <div className="contact-details">
            <div className="contact-row">
              <span className="c-key">Location</span>
              <span>Prayagraj, Uttar Pradesh</span>
            </div>
            <div className="contact-row">
              <span className="c-key">Email</span>
              <a href="mailto:shalini@example.com" className="c-link">
                shalinitiwariprayagraj@gmail.com
              </a>
            </div>
            <div className="contact-row">
              <span className="c-key">LinkedIn</span>
              <a
                href="https://linkedin.com/in/shalini-tiwari-9b740a289"
                className="c-link"
              >
                linkedin.com/in/shalini-tiwari-9b740a289
              </a>
            </div>
            <div className="contact-row">
              <span className="c-key">GitHub</span>
              <a
                href="https://github.com/shalini-tiwari-pro"
                className="c-link"
              >
                github.com/shalini-tiwari-pro
              </a>
            </div>
            <div className="contact-row">
              <span className="c-key">Available</span>
              <span className="avail-badge">Open to Work</span>
            </div>
          </div>
        </div>

        <form
          className="contact-form"
          action="https://formspree.io/f/xvznoyvl"
          method="POST"

        >
          <input type="hidden" name="_replyto" value={form.email} />
          <div className="form-row">
            <div className="form-group">
              <label>Your Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handle}
                required
                placeholder="John Doe"
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handle}
                required
                placeholder="john@email.com"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input
              name="subject"
              value={form.subject}
              onChange={handle}
              required
              placeholder="Job opportunity / Collaboration / Hello"
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handle}
              required
              rows={5}
              placeholder="Tell me a little about the role or what you have in mind..."
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="form-feedback form-feedback--ok">
              Message sent! I will get back to you within 24 hours.
            </p>
          )}
          {status === "error" && (
            <p className="form-feedback form-feedback--err">
              Something went wrong. Please email me directly.
            </p>
          )}
          
        </form>
      </div>
    </section>
  );
}

/* ─── HERO ───────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="about" className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <span className="hero-eyebrow">Hello, I am</span>
          <h1 className="hero-name">Shalini Tiwari</h1>
          <p className="hero-role">
            Aspiring Software Development Professional
          </p>
          <p className="hero-bio">
            I am a motivated and enthusiastic professional with a strong passion
            for learning, personal growth, and technology. I have experience
            working in a startup environment, where I developed teamwork,
            problem-solving, and adaptability skills. I am a quick learner who
            enjoys taking on new challenges and continuously improving both
            technical and communication skills. I believe in working with
            dedication, maintaining a positive attitude, and contributing
            effectively to team success. My goal is to grow professionally,
            expand my knowledge, and make a meaningful impact through my work.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn--primary">
              Get in Touch
            </a>
            <a href="#projects" className="btn btn--outline">
              View Projects
            </a>
            <a
              href="https://drive.google.com/file/d/11kA-ZcsQDJcijfbACsDXrK3ZOIiyTUN0/view?usp=drivesdk"
              download
              className="btn btn--ghost"
            >
              Download CV
            </a>
          </div>
        </div>
        <div className="hero-card">
          <div className="profile-ring">
            <div className="profile-initials">ST</div>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-n">4+</span>
              <span className="stat-l">Projects</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-n">1</span>
              <span className="stat-l">Internships</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-n">4+</span>
              <span className="stat-l">Certifications</span>
            </div>
          </div>
          <span className="avail-badge avail-badge--hero">Open to Work</span>
        </div>
      </div>
      <div className="hero-scroll-hint">scroll down</div>
    </section>
  );
}

/* ─── NAV ────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("About");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav-inner">
        <span className="nav-logo" onClick={() => go("about")}>
          ST.
        </span>
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
          {NAV_LINKS.map((n) => (
            <li key={n}>
              <button
                className={`nav-link ${active === n ? "nav-link--active" : ""}`}
                onClick={() => go(n)}
              >
                {n}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-logo">Shalini Tiwari</span>
        <p className="footer-copy">
          Designed &amp; built with care &mdash; Prayagraj, India &copy;{" "}
          {new Date().getFullYear()}
        </p>
        <div className="footer-links">
          <a href="shalinitiwariprayagraj@gmail.com">Email</a>
          <a href="https://linkedin.com/in/shalini-tiwari-9b740a289">
            LinkedIn
          </a>
          <a href="https://github.com/shalini-tiwari-pro">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ────────────────────────────────────────────────────── */
export default function Portfolio() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SkillsSection />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <HobbiesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
