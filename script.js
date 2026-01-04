document.addEventListener('DOMContentLoaded', function() {

  // THEME TOGGLE (LIGHT/DARK MODE)
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Check localStorage for saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  }
  
  themeToggle.addEventListener('click', function() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // NAVBAR - SCROLL EFFECT
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // MOBILE MENU - LEFT SLIDE ANIMATION
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileClose = document.getElementById('mobile-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Open mobile menu
  function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.classList.add('menu-open');
  }

  // Close mobile menu
  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  // Event listeners for mobile menu
  if (hamburger) {
    hamburger.addEventListener('click', openMobileMenu);
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  mobileNavLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      closeMobileMenu();
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // SMOOTH SCROLLING
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
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

  // TYPING ANIMATION FOR HELLO TEXT

  const helloText = document.getElementById('hello-text');
  if (helloText) {
    helloText.style.width = '0';
    setTimeout(function() {
      helloText.style.animation = 'typing 1.5s steps(6) forwards, blink 0.75s step-end infinite';
    }, 500);
  }
 
  let currentSkillIndex = 0;
  let animationTimeout;
  let isAnimating = true;

  if (skillProgress) {
    skills.forEach(function(_, index) {
      const dot = document.createElement('span');
      dot.className = 'dot' + (index === 0 ? ' active' : '');
      skillProgress.appendChild(dot);
    });
  }

  // Animation sequence for a single skill
  function animateSkill(index) {
    if (!isAnimating || !skillLogo) return;
    
    const skill = skills[index];
    const logoWrapper = document.querySelector('.skill-logo-wrapper');
    
    // Reset animations
    if (logoWrapper) {
      logoWrapper.style.animation = 'none';
      logoWrapper.offsetHeight; 
      logoWrapper.style.animation = 'skillLogoIn 0.6s ease forwards';
    }
    
    if (skillName) {
      skillName.style.animation = 'none';
      skillName.offsetHeight;
      skillName.style.animation = 'fadeInUp 0.5s ease 0.3s forwards';
      skillName.style.opacity = '0';
    }
    
    if (skillDesc) {
      skillDesc.style.animation = 'none';
      skillDesc.offsetHeight;
      skillDesc.style.animation = 'fadeInUp 0.5s ease 0.5s forwards';
      skillDesc.style.opacity = '0';
    }
    
    // Update content with logo image
    skillLogo.src = skill.logo;
    skillLogo.alt = skill.name + ' logo';
    if (skillName) skillName.textContent = skill.name;
    if (skillDesc) skillDesc.textContent = skill.desc;
    
    // Update progress dots
    if (skillProgress) {
      const dots = skillProgress.querySelectorAll('.dot');
      dots.forEach(function(dot, i) {
        dot.classList.remove('active', 'passed');
        if (i === index) {
          dot.classList.add('active');
        } else if (i < index) {
          dot.classList.add('passed');
        }
      });
    }

    // Schedule next skill
    animationTimeout = setTimeout(function() {
      if (!isAnimating) return;
      currentSkillIndex++;
      
      if (currentSkillIndex >= skills.length) {
        showFinalSkills();
      } else {
        animateSkill(currentSkillIndex);
      }
    }, 2500);
  }

  // Show final 3 skills in grid
  function showFinalSkills() {
    isAnimating = false;
    clearTimeout(animationTimeout);
    
    if (skillSingle) {
      skillSingle.classList.add('hidden');
    }
    
    const featuredSkills = [skills[0], skills[2], skills[6]];
    
    // Generate skills grid with 3 cards using real logo images
    if (skillsGrid) {
      skillsGrid.innerHTML = '';
      skillsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
      skillsGrid.style.maxWidth = '700px';
      skillsGrid.style.margin = '0 auto';
      
      featuredSkills.forEach(function(skill, index) {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.innerHTML = 
          '<img src="' + skill.logo + '" alt="' + skill.name + ' logo" class="skill-logo-small">' +
          '<h3 class="skill-name">' + skill.name + '</h3>' +
          '<p class="skill-desc">' + skill.desc + '</p>';
        
        skillsGrid.appendChild(card);
        
        setTimeout(function() {
          card.classList.add('visible');
        }, 200 + (index * 150));
      });
      
      // Show grid
      skillsGrid.classList.add('active');
    }
  }

  // Show ALL skills (when skip is clicked)
  function showAllSkills() {
    isAnimating = false;
    clearTimeout(animationTimeout);
    
    if (skillSingle) {
      skillSingle.classList.add('hidden');
    }
    
    // Generate full skills grid with real logo images
    if (skillsGrid) {
      skillsGrid.innerHTML = '';
      skillsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
      skillsGrid.style.maxWidth = '100%';
      skillsGrid.style.margin = '0';
      
      skills.forEach(function(skill, index) {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.innerHTML = 
          '<img src="' + skill.logo + '" alt="' + skill.name + ' logo" class="skill-logo-small">' +
          '<h3 class="skill-name">' + skill.name + '</h3>' +
          '<p class="skill-desc">' + skill.desc + '</p>';
        
        skillsGrid.appendChild(card);
        
        // animation
        setTimeout(function() {
          card.classList.add('visible');
        }, 100 + (index * 80));
      });
      
      skillsGrid.classList.add('active');
    }
  }

  // Start skill animation 
  function startSkillAnimation() {
    if (skillSingle && skillLogo && isAnimating) {
      animateSkill(0);
    }
  }

  // Check if skills 
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  // Start animation when skills section 
  let skillsStarted = false;
  function checkSkillsVisibility() {
    const skillsSection = document.getElementById('skills');
    if (skillsSection && !skillsStarted && isInViewport(skillsSection)) {
      skillsStarted = true;
      startSkillAnimation();
    }
  }

  window.addEventListener('scroll', checkSkillsVisibility);
  checkSkillsVisibility(); 

  // Skip animation button
  if (skipAnimation) {
    skipAnimation.addEventListener('click', function() {
      showAllSkills();
    });
  }

  // SCROLL REVEAL ANIMATION
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal, .about-grid > *, .hire-grid > *, .service-card, .project-card, .timeline-item, .contact-card');
    
    reveals.forEach(function(element) {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const revealPoint = 150;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }

  // Initialize reveal animation styles
  document.querySelectorAll('.about-grid > *, .hire-grid > *, .service-card, .project-card, .timeline-item').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); 

  // NEWSLETTER FORM
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      
      if (email && email.includes('@')) {
        alert('Thank you for subscribing!');
        this.reset();
      }
    });
  }

  // ACTIVE NAV LINK ON SCROLL
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNavLink);

  // PARALLAX EFFECT FOR HERO
  const orbs = document.querySelectorAll('.orb');
  
  window.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    orbs.forEach(function(orb, index) {
      const speed = (index + 1) * 20;
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;
      orb.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  // INTERSECTION OBSERVER FOR ANIMATIONS
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Add staggered animation to children
        const children = entry.target.querySelectorAll('.service-card, .project-card, .skill-card');
        children.forEach(function(child, index) {
          child.style.transitionDelay = (index * 0.1) + 's';
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll('.services-grid, .projects-grid, .skills-grid').forEach(function(section) {
    observer.observe(section);
  });

  // BUTTON RIPPLE EFFECT
  document.querySelectorAll('.btn-primary').forEach(function(button) {
    button.addEventListener('click', function(e) {
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      button.appendChild(ripple);
      
      setTimeout(function() {
        ripple.remove();
      }, 600);
    });
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  console.log('🚀 Asharib Khan Portfolio loaded successfully!');
});
