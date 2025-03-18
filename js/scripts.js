document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeToggle.querySelector('i');
  
  // Check if user has a preferred theme
  const currentTheme = localStorage.getItem('theme');
  
  if (currentTheme === 'dark-theme') {
      body.classList.add('dark-theme');
      icon.className = 'fas fa-sun';
  }
  
  themeToggle.addEventListener('click', function() {
      body.classList.toggle('dark-theme');
      
      if (body.classList.contains('dark-theme')) {
          localStorage.setItem('theme', 'dark-theme');
          icon.className = 'fas fa-sun';
      } else {
          localStorage.setItem('theme', '');
          icon.className = 'fas fa-moon';
      }
  });
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const sideNav = document.querySelector('.side-nav');
  const mainContent = document.querySelector('.main-content');
  
  if (menuToggle) {
      menuToggle.addEventListener('click', function() {
          this.classList.toggle('active');
          sideNav.classList.toggle('active');
      });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768 && 
          !sideNav.contains(e.target) && 
          !menuToggle.contains(e.target) && 
          sideNav.classList.contains('active')) {
          sideNav.classList.remove('active');
          menuToggle.classList.remove('active');
      }
  });
  
  // Navigation active state and back to top button visibility
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', function() {
      let current = '';
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          
          if (pageYOffset >= sectionTop - 200) {
              current = section.getAttribute('id');
          }
      });
      
      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').substring(1) === current) {
              link.classList.add('active');
          }
      });
      
      // Back to top button visibility
      if (window.scrollY > 500) {
          backToTop.classList.add('active');
      } else {
          backToTop.classList.remove('active');
      }
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              // Close mobile menu if open
              if (window.innerWidth <= 768 && sideNav.classList.contains('active')) {
                  sideNav.classList.remove('active');
                  if (menuToggle) {
                      menuToggle.classList.remove('active');
                  }
              }
              
              window.scrollTo({
                  top: targetElement.offsetTop,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Animate skill progress bars when scrolled into view
  const skillBars = document.querySelectorAll('.progress');
  const skillSection = document.querySelector('.skills-section');
  
  function animateSkills() {
      if (!skillSection) return;
      
      const sectionTop = skillSection.offsetTop;
      if (window.pageYOffset > sectionTop - window.innerHeight / 1.3) {
          skillBars.forEach(bar => {
              const percentage = bar.parentElement.previousElementSibling.querySelector('span:last-child').textContent;
              bar.style.width = percentage;
          });
          
          window.removeEventListener('scroll', animateSkills);
      }
  }
  
  window.addEventListener('scroll', animateSkills);
  
  // Project filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          // Remove active class from all buttons
          filterBtns.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          // Get filter value
          const filter = this.getAttribute('data-filter');
          
          projectCards.forEach(card => {
              if (filter === 'all') {
                  card.style.display = 'flex';
                  setTimeout(() => {
                      card.style.opacity = '1';
                      card.style.transform = '';
                  }, 50);
              } else {
                  const categories = card.getAttribute('data-category').split(' ');
                  if (categories.includes(filter)) {
                      card.style.display = 'flex';
                      setTimeout(() => {
                          card.style.opacity = '1';
                          card.style.transform = '';
                      }, 50);
                  } else {
                      card.style.opacity = '0';
                      card.style.transform = 'translateY(20px)';
                      setTimeout(() => {
                          card.style.display = 'none';
                      }, 300);
                  }
              }
          });
      });
  });
  
  // Form submission handler
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form elements
          const submitBtn = this.querySelector('button[type="submit"]');
          
          // Change button text to show loading
          const originalBtnText = submitBtn.innerHTML;
          submitBtn.innerHTML = 'Sending...';
          submitBtn.disabled = true;
          
          // Simulate form submission (would be replaced with actual AJAX in production)
          setTimeout(function() {
              // Reset form
              contactForm.reset();
              
              // Show success message
              submitBtn.innerHTML = 'Message Sent!';
              
              // Restore button after 3 seconds
              setTimeout(function() {
                  submitBtn.innerHTML = originalBtnText;
                  submitBtn.disabled = false;
              }, 3000);
          }, 1500);
      });
  }
});
