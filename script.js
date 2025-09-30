// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
}

// Simple image slider for future use
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(n) {
    if (slides.length > 0) {
        slides.forEach(slide => slide.style.display = 'none');
        currentSlide = (n + totalSlides) % totalSlides;
        slides[currentSlide].style.display = 'block';
    }
}

// Next/previous controls (to be implemented when we add a slider)
function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Form validation for future forms
function validateForm(form) {
    let valid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            valid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '';
        }
    });
    
    return valid;
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Giving Page Functionality

// Copy M-Pesa details to clipboard
function copyMpesaDetails() {
    const mpesaDetails = `Paybill: 247247\nAccount: 094446\nAccount Name: Elshadai Harvest Ministry - Webuye`;
    copyToClipboard(mpesaDetails, "M-Pesa details copied to clipboard!");
}

// Copy bank details to clipboard
function copyBankDetails() {
    const bankDetails = `Bank Name: Equity Bank\nAccount Name: Elshadai Harvest Ministry – Webuye\nAccount No: 0480284094446`;
    copyToClipboard(bankDetails, "Bank details copied to clipboard!");
}

// Generic copy to clipboard function
function copyToClipboard(text, message) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(message);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showToast("Failed to copy details. Please try again.");
    });
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// FAQ accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Close all answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('active');
            });
            
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
            });
            
            // Open clicked answer if it wasn't already active
            if (!isActive) {
                question.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
    
    // Form submission
    const givingForm = document.getElementById('givingForm');
    if (givingForm) {
        givingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Simulate form submission
                showToast("Thank you for your donation information! We'll be in touch soon.");
                this.reset();
            }
        });
    }

    // Contact form submission
    const generalForm = document.getElementById('generalForm');
    if (generalForm) {
        generalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Simulate form submission
                showToast("Your message has been sent successfully! We'll be in touch soon.");
                this.reset();
            }
        });
    }
    
    // Prayer request form submission
    const prayerForm = document.getElementById('prayerForm');
    if (prayerForm) {
        prayerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Simulate form submission
                showToast("Your prayer request has been submitted. Our prayer team will be praying for you.");
                this.reset();
            }
        });
    }
    
    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Format phone number as user types
            const value = e.target.value.replace(/\D/g, '');
            if (value.length <= 3) {
                e.target.value = value;
            } else if (value.length <= 6) {
                e.target.value = `${value.slice(0, 3)}-${value.slice(3)}`;
            } else {
                e.target.value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        });
    });
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sermon filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const speakerFilter = document.querySelector('.speaker-filter');
    const sermonCards = document.querySelectorAll('.sermon-card');
    
    // Filter by type
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter sermons
                filterSermons(filter, speakerFilter.value);
            });
        });
    }
    
    // Filter by speaker
    if (speakerFilter) {
        speakerFilter.addEventListener('change', () => {
            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            filterSermons(activeFilter, speakerFilter.value);
        });
    }
    
    function filterSermons(typeFilter, speakerFilter) {
        sermonCards.forEach(card => {
            const cardType = card.getAttribute('data-type');
            const cardSpeaker = card.getAttribute('data-speaker');
            
            const typeMatch = typeFilter === 'all' || cardType === typeFilter;
            const speakerMatch = speakerFilter === 'all' || cardSpeaker === speakerFilter;
            
            if (typeMatch && speakerMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Load more sermons button
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // Simulate loading more content
            showToast("More sermons loading...");
            // In a real implementation, this would fetch more content from a server
        });
    }
});