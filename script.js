// Enhanced Carousel functionality
const carousel = {
    track: null,
    prevBtn: null,
    nextBtn: null,
    currentIndex: 0,
    cardWidth: 352, // 320px + 32px gap
    autoplayInterval: null,
    isPlaying: true,
    
    init() {
        this.track = document.querySelector('.carousel-track');
        this.prevBtn = document.querySelector('.carousel-btn-prev');
        this.nextBtn = document.querySelector('.carousel-btn-next');
        
        if (!this.track || !this.prevBtn || !this.nextBtn) return;
        
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Pause on hover
        this.track.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.track.addEventListener('mouseleave', () => this.startAutoplay());
        
        // Start auto-play
        this.startAutoplay();
        
        // Add touch support for mobile
        this.addTouchSupport();
    },
    
    startAutoplay() {
        this.isPlaying = true;
        this.autoplayInterval = setInterval(() => this.next(), 5000);
    },
    
    pauseAutoplay() {
        this.isPlaying = false;
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
        }
    },
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updatePosition();
        }
    },
    
    next() {
        const cards = this.track.children.length;
        const visibleCards = Math.floor(this.track.parentElement.offsetWidth / this.cardWidth);
        const maxIndex = Math.max(0, cards - visibleCards);
        
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        this.updatePosition();
    },
    
    updatePosition() {
        const offset = -this.currentIndex * this.cardWidth;
        this.track.style.transform = `translateX(${offset}px)`;
    },
    
    addTouchSupport() {
        let startX = 0;
        let currentX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            this.pauseAutoplay();
        });
        
        this.track.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', () => {
            const diff = startX - currentX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
            this.startAutoplay();
        });
    }
};

// Enhanced Size Guide Modal
const sizeGuideModal = {
    modal: null,
    openBtns: [],
    closeBtn: null,
    
    init() {
        this.modal = document.getElementById('size-guide-modal');
        this.openBtns = [
            document.getElementById('size-guide-btn'),
            document.getElementById('size-guide-footer')
        ];
        this.closeBtn = document.getElementById('modal-close');
        
        if (!this.modal) return;
        
        this.openBtns.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.open();
                });
            }
        });
        
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        
        // Close on outside click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    },
    
    open() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// Enhanced Chat Widget
const chatWidget = {
    button: null,
    window: null,
    closeBtn: null,
    form: null,
    input: null,
    messages: null,
    
    init() {
        this.button = document.getElementById('chat-button');
        this.window = document.getElementById('chat-window');
        this.closeBtn = document.getElementById('chat-close');
        this.form = document.getElementById('chat-form');
        this.input = document.getElementById('chat-input');
        this.messages = document.getElementById('chat-messages');
        
        if (!this.button || !this.window) return;
        
        this.button.addEventListener('click', () => this.toggle());
        
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    },
    
    toggle() {
        if (this.window.classList.contains('active')) {
            this.close();
        } else {
            this.open();
        }
    },
    
    open() {
        this.window.classList.add('active');
        this.button.style.display = 'none';
        if (this.input) {
            setTimeout(() => this.input.focus(), 300);
        }
    },
    
    close() {
        this.window.classList.remove('active');
        this.button.style.display = 'flex';
    },
    
    handleSubmit(e) {
        e.preventDefault();
        const message = this.input.value.trim();
        
        if (message) {
            this.addMessage(message, 'sent');
            this.input.value = '';
            
            // Simulate typing indicator
            this.showTypingIndicator();
            
            // Simulate response
            setTimeout(() => {
                this.hideTypingIndicator();
                this.addMessage('Thank you for your message. Our team will respond shortly.', 'received');
            }, 1500);
        }
    },
    
    addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message chat-message-${type}`;
        
        const messagePara = document.createElement('p');
        messagePara.className = 'body-small';
        messagePara.textContent = text;
        
        messageDiv.appendChild(messagePara);
        this.messages.appendChild(messageDiv);
        
        // Scroll to bottom with smooth animation
        this.messages.scrollTo({
            top: this.messages.scrollHeight,
            behavior: 'smooth'
        });
    },
    
    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'chat-message chat-message-received typing-indicator';
        indicator.id = 'typing-indicator';
        indicator.innerHTML = '<p class="body-small">Typing...</p>';
        this.messages.appendChild(indicator);
        this.messages.scrollTop = this.messages.scrollHeight;
    },
    
    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
};

// Enhanced Newsletter Form
const newsletter = {
    form: null,
    
    init() {
        this.form = document.getElementById('newsletter-form');
        
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },
    
    handleSubmit(e) {
        e.preventDefault();
        const emailInput = this.form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email) {
            // Add loading state
            const submitBtn = this.form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate submission
            setTimeout(() => {
                alert('Thank you for subscribing! Welcome to our circle.');
                emailInput.value = '';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        }
    }
};

// Smooth scroll for navigation links
const smoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        const headerOffset = 100;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
};

// Active navigation link on scroll
const activeNav = {
    init() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navigation-link');
        
        if (sections.length === 0 || navLinks.length === 0) return;
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
};

// Scroll animations for elements
const scrollAnimations = {
    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe all product cards, testimonials, etc.
        const animatedElements = document.querySelectorAll('.product-card, .testimonial-card, .value-card, .process-step');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
};

// Parallax effect for hero section
const parallaxEffect = {
    init() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = heroSection.querySelectorAll('.hero-content, .hero-image');
            
            parallaxElements.forEach((el, index) => {
                const speed = (index + 1) * 0.3;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
};

// Enhanced navigation header on scroll
const headerScroll = {
    init() {
        const header = document.querySelector('.navigation-header');
        if (!header) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.padding = '16px 40px';
                header.style.boxShadow = 'var(--shadow-md)';
            } else {
                header.style.padding = '20px 40px';
                header.style.boxShadow = 'var(--shadow-sm)';
            }
            
            lastScroll = currentScroll;
        });
    }
};

// Image lazy loading enhancement
const lazyLoading = {
    init() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
};

// Collection Filters and Sorting
const collectionFilters = {
    categorySelect: null,
    colorSelect: null,
    sortSelect: null,
    productsGrid: null,
    productCards: [],
    
    init() {
        // Get filter elements
        const filterSelects = document.querySelectorAll('.filter-select');
        if (filterSelects.length < 3) return;
        
        this.categorySelect = filterSelects[0];
        this.colorSelect = filterSelects[1];
        this.sortSelect = filterSelects[2];
        this.productsGrid = document.querySelector('.products-grid');
        
        if (!this.productsGrid) return;
        
        // Store all product cards
        this.productCards = Array.from(document.querySelectorAll('.product-card-link'));
        
        // Add event listeners
        this.categorySelect.addEventListener('change', () => this.applyFilters());
        this.colorSelect.addEventListener('change', () => this.applyFilters());
        this.sortSelect.addEventListener('change', () => this.applyFilters());
    },
    
    applyFilters() {
        const categoryValue = this.categorySelect.value.toLowerCase();
        const colorValue = this.colorSelect.value.toLowerCase();
        const sortValue = this.sortSelect.value;
        
        // Filter products
        let filteredCards = this.productCards.filter(card => {
            const category = card.dataset.category;
            const color = card.dataset.color;
            
            // Check category filter
            const categoryMatch = categoryValue === 'all styles' || category === categoryValue;
            
            // Check color filter
            const colorMatch = colorValue === 'all colors' || color === colorValue;
            
            return categoryMatch && colorMatch;
        });
        
        // Sort filtered products
        filteredCards = this.sortProducts(filteredCards, sortValue);
        
        // Hide all products with fade out animation
        this.productCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        });
        
        // Show filtered products with fade in animation
        setTimeout(() => {
            filteredCards.forEach((card, index) => {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, index * 50);
            });
            
            // Re-append in sorted order
            filteredCards.forEach(card => {
                this.productsGrid.appendChild(card);
            });
            
            // Show message if no products found
            this.showNoResultsMessage(filteredCards.length === 0);
        }, 300);
    },
    
    sortProducts(cards, sortValue) {
        const sorted = [...cards];
        
        switch(sortValue) {
            case 'Featured':
                sorted.sort((a, b) => {
                    return parseInt(a.dataset.order) - parseInt(b.dataset.order);
                });
                break;
            case 'Newest':
                sorted.sort((a, b) => {
                    return parseInt(b.dataset.order) - parseInt(a.dataset.order);
                });
                break;
            case 'Price: Low to High':
                sorted.sort((a, b) => {
                    return parseInt(a.dataset.price) - parseInt(b.dataset.price);
                });
                break;
            case 'Price: High to Low':
                sorted.sort((a, b) => {
                    return parseInt(b.dataset.price) - parseInt(a.dataset.price);
                });
                break;
        }
        
        return sorted;
    },
    
    showNoResultsMessage(show) {
        let message = document.querySelector('.no-results-message');
        
        if (show) {
            if (!message) {
                message = document.createElement('div');
                message.className = 'no-results-message';
                message.style.cssText = `
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 60px 20px;
                    color: var(--color-text-secondary);
                    font-size: 18px;
                `;
                message.textContent = 'No products match your current filters. Please try different options.';
                this.productsGrid.appendChild(message);
            }
            message.style.display = 'block';
        } else {
            if (message) {
                message.style.display = 'none';
            }
        }
    }
};
// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    carousel.init();
    sizeGuideModal.init();
    chatWidget.init();
    newsletter.init();
    smoothScroll.init();
    activeNav.init();
    scrollAnimations.init();
    parallaxEffect.init();
    headerScroll.init();
    lazyLoading.init();
    collectionFilters.init();
    
    // Add page load animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add loading state for all buttons
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-primary, .btn-secondary')) {
        const btn = e.target;
        if (!btn.classList.contains('no-loading')) {
            btn.style.opacity = '0.7';
            setTimeout(() => {
                btn.style.opacity = '1';
            }, 300);
        }
    }
});

// Enhanced product card interactions
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});
