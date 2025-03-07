
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Preloader
  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', function() {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  });
  
  // Navbar scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });
  
  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
  
  // Hero Slider
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  let currentSlide = 0;
  let slideInterval;
  
  function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 5000);
  }
  
  function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  }
  
  function nextSlide() {
    showSlide(currentSlide + 1);
  }
  
  function prevSlide() {
    showSlide(currentSlide - 1);
  }
  
  prevBtn.addEventListener('click', function() {
    prevSlide();
    clearInterval(slideInterval);
    startSlideInterval();
  });
  
  nextBtn.addEventListener('click', function() {
    nextSlide();
    clearInterval(slideInterval);
    startSlideInterval();
  });
  
  // Start automatic slideshow
  startSlideInterval();
  
  // Back to top button
  const backToTopBtn = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });
  
  backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Form submission with validation
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      let isValid = true;
      const formElements = this.elements;
      
      for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].hasAttribute('required') && !formElements[i].value) {
          isValid = false;
          formElements[i].classList.add('error');
        } else {
          formElements[i].classList.remove('error');
        }
      }
      
      if (isValid) {
        // Show success message (in a real application, you would send the form data to a server)
        alert('Thank you for your reservation! We will contact you shortly to confirm your booking.');
        this.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    });
  }
  
  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      
      if (emailInput.value) {
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
      } else {
        alert('Please enter your email address.');
      }
    });
  }
  
  // Animation on scroll
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.service-card, .feature, .menu-item, .event-card');
    
    reveals.forEach(item => {
      const windowHeight = window.innerHeight;
      const elementTop = item.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        item.classList.add('visible');
      }
    });
  }
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Run once on page load
});