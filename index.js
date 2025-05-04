// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => observer.observe(el));
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
        spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add animation to the submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            submitBtn.style.transform = 'scale(1)';
        }, 200);

        // Here you would typically handle the form submission
        // For now, we'll just show an alert
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Service card hover effect
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scroll * 0.5}px`;
    });
}

// Animate numbers in features section
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize animations when elements come into view
const featuresSection = document.querySelector('.why-choose-us');
let animated = false;

if (featuresSection) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !animated) {
            animated = true;
            // Add your number animation logic here
        }
    });
    
    observer.observe(featuresSection);
}
 // Variables
 let currentIndex = 0;
 let slideInterval;
 const totalSlides = 4;
 const slideDelay = 3000; // Reduced to 3 seconds (3000ms)
 
 // Initialize carousel
 function initCarousel() {
     startAutoSlide();
     
     // Add touch event listeners
     const carousel = document.getElementById('slide0').parentNode;
     carousel.addEventListener('touchstart', handleTouchStart, false);
     carousel.addEventListener('touchend', handleTouchEnd, false);
     
     // Add hover pause
     carousel.addEventListener('mouseenter', function() {
         clearInterval(slideInterval);
     });
     
     carousel.addEventListener('mouseleave', function() {
         startAutoSlide();
     });
 }
 
 // Start automatic slideshow
 function startAutoSlide() {
     slideInterval = setInterval(function() {
         changeSlide(1);
     }, slideDelay);
 }
 
 // Change slide with relative index
 function changeSlide(direction) {
     goToSlide((currentIndex + direction + totalSlides) % totalSlides);
 }
 
 // Go to specific slide
 function goToSlide(index) {
     // Hide current slide
     document.getElementById('slide' + currentIndex).style.opacity = 0;
     document.getElementById('slide' + currentIndex).style.display = 'none';
     document.getElementById('dot' + currentIndex).style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
     
     // Show new slide
     currentIndex = index;
     document.getElementById('slide' + currentIndex).style.opacity = 1;
     document.getElementById('slide' + currentIndex).style.display = 'block';
     document.getElementById('dot' + currentIndex).style.backgroundColor = 'white';
     
     // Reset timer
     clearInterval(slideInterval);
     startAutoSlide();
 }
 
 // Scroll to services section
 function scrollToServices() {
     document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
 }
 
 // Touch handling for mobile
 let touchStartX = 0;
 let touchEndX = 0;
 
 function handleTouchStart(e) {
     touchStartX = e.changedTouches[0].screenX;
 }
 
 function handleTouchEnd(e) {
     touchEndX = e.changedTouches[0].screenX;
     handleSwipe();
 }
 
 function handleSwipe() {
     const swipeThreshold = 50;
     if (touchStartX - touchEndX > swipeThreshold) {
         // Swipe left
         changeSlide(1);
     } else if (touchEndX - touchStartX > swipeThreshold) {
         // Swipe right
         changeSlide(-1);
     }
 }
 
 // Initialize when page loads
 window.onload = initCarousel;

   // Minimal carousel code - bank logos specific
   let currentSlide = 0;
   let timer;
   
   // Auto-advance slides every 2 seconds
   function startTimer() {
       timer = setInterval(nextSlide, 2000);
   }
   
   // Show specific slide by index
   function showSlide(n) {
       // Hide current slide
       document.getElementById('slide' + currentSlide).style.display = 'none';
       document.getElementById('dot' + currentSlide).style.backgroundColor = '#ccc';
       
       // Update index and show new slide
       currentSlide = n;
       document.getElementById('slide' + currentSlide).style.display = 'flex';
       document.getElementById('dot' + currentSlide).style.backgroundColor = '#007bff';
       
       // Reset timer
       clearInterval(timer);
       startTimer();
   }
   
   // Navigation functions
   function nextSlide() {
       let next = (currentSlide + 1) % 5;
       showSlide(next);
   }
   
   function prevSlide() {
       let prev = (currentSlide - 1 + 5) % 5;
       showSlide(prev);
   }
   
   // Start the carousel
   startTimer();
   
   // Add mouse enter/leave events
   const container = document.getElementById('slide0').parentNode;
   container.onmouseenter = function() { clearInterval(timer); };
   container.onmouseleave = function() { startTimer(); };

     // Get DOM elements
     const modal = document.getElementById('calculatorModal');
     const closeBtn = document.getElementById('closeModal');
     const yearsToggle = document.getElementById('yearsToggle');
     const monthsToggle = document.getElementById('monthsToggle');
     
     // Sliders and their value displays
     const loanAmountSlider = document.getElementById('loanAmountSlider');
     const loanAmountValue = document.getElementById('loanAmountValue');
     const interestRateSlider = document.getElementById('interestRateSlider');
     const interestRateValue = document.getElementById('interestRateValue');
     const loanTenureSlider = document.getElementById('loanTenureSlider');
     const loanTenureValue = document.getElementById('loanTenureValue');
     
     // Result elements
     const monthlyEMI = document.getElementById('monthlyEMI');
     const principalAmount = document.getElementById('principalAmount');
     const interestAmount = document.getElementById('interestAmount');
     const totalAmount = document.getElementById('totalAmount');
     const loanAmountDetail = document.getElementById('loanAmountDetail');
     const interestRateDetail = document.getElementById('interestRateDetail');
     const loanTenureDetail = document.getElementById('loanTenureDetail');
     
     // Initialize pie chart
     let ctx = document.getElementById('emiPieChart').getContext('2d');
     let pieChart;
     
     // State variables
     let tenureType = 'years'; // Default to years
     
     // Initialize and show calculator
     function showEMICalculator() {
         modal.style.display = 'flex';
         calculateEMI(); // Calculate on open to show initial values
         drawPieChart(100000, 5492); // Initial values
     }
     
     // Close modal
     closeBtn.addEventListener('click', () => {
         modal.style.display = 'none';
     });
     
     // Also close when clicking outside the modal
     modal.addEventListener('click', (e) => {
         if (e.target === modal) {
             modal.style.display = 'none';
         }
     });
     
     // Toggle between years and months
     yearsToggle.addEventListener('click', () => {
         if (tenureType !== 'years') {
             tenureType = 'years';
             yearsToggle.classList.add('active');
             monthsToggle.classList.remove('active');
             
             // Update slider max based on years (1-30 years)
             loanTenureSlider.min = 1;
             loanTenureSlider.max = 30;
             loanTenureSlider.value = 1;
             updateLoanTenureValue();
             calculateEMI();
         }
     });
     
     monthsToggle.addEventListener('click', () => {
         if (tenureType !== 'months') {
             tenureType = 'months';
             monthsToggle.classList.add('active');
             yearsToggle.classList.remove('active');
             
             // Update slider max based on months (1-360 months)
             loanTenureSlider.min = 1;
             loanTenureSlider.max = 360;
             loanTenureSlider.value = 12;
             updateLoanTenureValue();
             calculateEMI();
         }
     });
     
     // Update slider values and calculate EMI on change
     loanAmountSlider.addEventListener('input', () => {
         updateLoanAmountValue();
         calculateEMI();
         updateSliderBackground(loanAmountSlider);
     });
     
     interestRateSlider.addEventListener('input', () => {
         updateInterestRateValue();
         calculateEMI();
         updateSliderBackground(interestRateSlider);
     });
     
     loanTenureSlider.addEventListener('input', () => {
         updateLoanTenureValue();
         calculateEMI();
         updateSliderBackground(loanTenureSlider);
     });
     
     // Helper functions to update displayed values
     function updateLoanAmountValue() {
         const value = parseInt(loanAmountSlider.value);
         loanAmountValue.textContent = '₹' + formatNumber(value);
         loanAmountDetail.textContent = '₹' + formatNumber(value);
     }
     
     function updateInterestRateValue() {
         const value = parseFloat(interestRateSlider.value);
         interestRateValue.textContent = value + '%';
         interestRateDetail.textContent = value + '%';
     }
     
     function updateLoanTenureValue() {
         const value = parseInt(loanTenureSlider.value);
         if (tenureType === 'years') {
             const yearText = value === 1 ? ' Year' : ' Years';
             loanTenureValue.textContent = value + yearText;
             loanTenureDetail.textContent = value + yearText;
         } else {
             const monthText = value === 1 ? ' Month' : ' Months';
             loanTenureValue.textContent = value + monthText;
             loanTenureDetail.textContent = value + monthText;
         }
     }
     
     // Update slider background gradient to show progress
     function updateSliderBackground(slider) {
         const min = parseFloat(slider.min);
         const max = parseFloat(slider.max);
         const value = parseFloat(slider.value);
         const percentage = ((value - min) / (max - min)) * 100;
         slider.style.background = `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`;
     }
     
     // Format number with commas for thousands
     function formatNumber(num) {
         return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     }
     
     // Draw pie chart for the EMI breakdown
     function drawPieChart(principal, interest) {
         // Clear previous chart if exists
         if (pieChart) {
             pieChart.clearRect(0, 0, 140, 140);
         }
         
         pieChart = ctx;
         const total = principal + interest;
         const principalAngle = (principal / total) * 2 * Math.PI;
         
         // Draw principal portion (blue)
         pieChart.beginPath();
         pieChart.moveTo(70, 70);
         pieChart.arc(70, 70, 60, 0, principalAngle, false);
         pieChart.fillStyle = '#4f46e5';
         pieChart.fill();
         
         // Draw interest portion (pink)
         pieChart.beginPath();
         pieChart.moveTo(70, 70);
         pieChart.arc(70, 70, 60, principalAngle, 2 * Math.PI, false);
         pieChart.fillStyle = '#ec4899';
         pieChart.fill();
         
         // Draw white circle in center for donut style
         pieChart.beginPath();
         pieChart.arc(70, 70, 40, 0, 2 * Math.PI, false);
         pieChart.fillStyle = 'white';
         pieChart.fill();
     }
     
     // Calculate EMI
     function calculateEMI() {
         // Get values from inputs
         let principal = parseFloat(loanAmountSlider.value);
         let rate = parseFloat(interestRateSlider.value) / 100 / 12; // Monthly interest rate
         let time = parseInt(loanTenureSlider.value);
         
         // Convert years to months if selected
         if (tenureType === 'years') {
             time = time * 12;
         }
         
         // Calculate EMI: P * r * (1+r)^n / ((1+r)^n - 1)
         let emi = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1);
         
         // Calculate total amount and interest
         let totalAmt = emi * time;
         let interestAmt = totalAmt - principal;
         
         // Update the results
         monthlyEMI.textContent = '₹' + formatNumber(Math.round(emi));
         principalAmount.textContent = '₹' + formatNumber(principal);
         interestAmount.textContent = '₹' + formatNumber(Math.round(interestAmt));
         totalAmount.textContent = '₹' + formatNumber(Math.round(totalAmt));
         
         // Update the pie chart
         drawPieChart(principal, interestAmt);
         
         // Update slider backgrounds
         updateSliderBackground(loanAmountSlider);
         updateSliderBackground(interestRateSlider);
         updateSliderBackground(loanTenureSlider);
     }
     
     // Initialize sliders with proper background gradients
     updateSliderBackground(loanAmountSlider);
     updateSliderBackground(interestRateSlider);
     updateSliderBackground(loanTenureSlider);
     
     // Initialize displayed values
     updateLoanAmountValue();
     updateInterestRateValue();
     updateLoanTenureValue();
     
     // Expose the function to show calculator globally
     window.showEMICalculator = showEMICalculator;