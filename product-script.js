// Enhanced Product page specific functionality

// Enhanced Image Gallery with zoom
const productGallery = {
    mainImage: null,
    thumbnails: [],
    
    init() {
        this.mainImage = document.getElementById('main-product-image');
        this.thumbnails = document.querySelectorAll('.thumbnail');
        
        if (!this.mainImage || this.thumbnails.length === 0) return;
        
        this.thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => this.switchImage(thumb));
        });
        
        // Add zoom effect on main image
        this.addZoomEffect();
    },
    
    switchImage(thumbnail) {
        const fullImageUrl = thumbnail.getAttribute('data-full');
        
        // Add fade effect
        this.mainImage.style.opacity = '0';
        
        setTimeout(() => {
            this.mainImage.src = fullImageUrl;
            this.mainImage.style.opacity = '1';
        }, 200);
        
        // Update active state with animation
        this.thumbnails.forEach(t => {
            t.classList.remove('active');
            t.style.transform = 'scale(1)';
        });
        thumbnail.classList.add('active');
        thumbnail.style.transform = 'scale(1.05)';
    },
    
    addZoomEffect() {
        const container = this.mainImage.parentElement;
        
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            this.mainImage.style.transformOrigin = `${x}% ${y}%`;
        });
        
        container.addEventListener('mouseenter', () => {
            this.mainImage.style.transition = 'transform 0.3s ease';
        });
        
        container.addEventListener('mouseleave', () => {
            this.mainImage.style.transform = 'scale(1)';
        });
    }
};

// Enhanced Size Selection with visual feedback
const sizeSelector = {
    buttons: [],
    selectedSize: null,
    
    init() {
        this.buttons = document.querySelectorAll('.size-option');
        
        if (this.buttons.length === 0) return;
        
        this.buttons.forEach(button => {
            button.addEventListener('click', () => this.selectSize(button));
            
            // Add hover animation
            button.addEventListener('mouseenter', function() {
                if (!this.classList.contains('selected')) {
                    this.style.transform = 'scale(1.05) rotate(2deg)';
                }
            });
            
            button.addEventListener('mouseleave', function() {
                if (!this.classList.contains('selected')) {
                    this.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    },
    
    selectSize(button) {
        // Remove selected from all buttons with animation
        this.buttons.forEach(btn => {
            btn.classList.remove('selected');
            btn.style.transform = 'scale(1) rotate(0deg)';
        });
        
        // Add selected to clicked button with animation
        button.classList.add('selected');
        button.style.transform = 'scale(1.1)';
        
        this.selectedSize = button.textContent;
        
        // Show confirmation feedback
        this.showSizeConfirmation(button);
    },
    
    showSizeConfirmation(button) {
        const feedback = document.createElement('div');
        feedback.textContent = '✓';
        feedback.style.cssText = `
            position: absolute;
            top: -10px;
            right: -10px;
            background: #4CAF50;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            animation: popIn 0.3s ease;
        `;
        
        const parent = button.parentElement;
        const oldFeedback = parent.querySelector('.size-feedback');
        if (oldFeedback) oldFeedback.remove();
        
        button.style.position = 'relative';
        feedback.className = 'size-feedback';
        button.appendChild(feedback);
    }
};

// Enhanced Product Accordion with smooth animations
const productAccordion = {
    items: [],
    
    init() {
        this.items = document.querySelectorAll('.accordion-item');
        
        if (this.items.length === 0) return;
        
        this.items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            
            if (header && content) {
                header.addEventListener('click', () => this.toggle(item));
                
                // Add hover effect to header
                header.addEventListener('mouseenter', function() {
                    this.style.paddingLeft = '8px';
                });
                
                header.addEventListener('mouseleave', function() {
                    this.style.paddingLeft = '0';
                });
            }
        });
        
        // Open first item by default
        if (this.items.length > 0) {
            this.items[0].classList.add('active');
        }
    },
    
    toggle(item) {
        const isActive = item.classList.contains('active');
        const content = item.querySelector('.accordion-content');
        
        // Close all items with animation
        this.items.forEach(i => {
            i.classList.remove('active');
            const iContent = i.querySelector('.accordion-content');
            if (iContent) {
                iContent.style.maxHeight = '0';
            }
        });
        
        // Toggle clicked item
        if (!isActive) {
            item.classList.add('active');
            if (content) {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        }
    }
};

// Add to Cart functionality with animation
const addToCart = {
    init() {
        const addToCartBtn = document.querySelector('.btn-primary');
        const addToWishlistBtn = document.querySelector('.btn-secondary');
        
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => this.handleAddToCart());
        }
        
        if (addToWishlistBtn) {
            addToWishlistBtn.addEventListener('click', () => this.handleAddToWishlist());
        }
    },
    
    handleAddToCart() {
        const selectedSize = document.querySelector('.size-option.selected');
        
        if (!selectedSize) {
            this.showNotification('Please select a size', 'warning');
            this.highlightSizeSelector();
            return;
        }
        
        // Simulate adding to cart
        this.showNotification('Added to your collection!', 'success');
        this.animateAddToCart();
    },
    
    handleAddToWishlist() {
        this.showNotification('Added to wishlist!', 'success');
    },
    
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 40px;
            background: ${type === 'success' ? '#4CAF50' : '#FF9800'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
            font-size: 15px;
            font-weight: 600;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    },
    
    highlightSizeSelector() {
        const sizeSelector = document.querySelector('.size-selector');
        if (sizeSelector) {
            sizeSelector.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                sizeSelector.style.animation = '';
            }, 500);
        }
    },
    
    animateAddToCart() {
        const btn = document.querySelector('.btn-primary');
        const originalText = btn.textContent;
        
        btn.textContent = '✓ Added!';
        btn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }
};

// Product image carousel for mobile
const productImageCarousel = {
    init() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        if (thumbnails.length === 0) return;
        
        let currentIndex = 0;
        let touchStartX = 0;
        let touchEndX = 0;
        
        const mainImageContainer = document.querySelector('.product-main-image');
        if (!mainImageContainer) return;
        
        mainImageContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        mainImageContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX, thumbnails);
        });
    },
    
    handleSwipe(startX, endX, thumbnails) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                const currentActive = document.querySelector('.thumbnail.active');
                const currentIndex = Array.from(thumbnails).indexOf(currentActive);
                const nextIndex = (currentIndex + 1) % thumbnails.length;
                thumbnails[nextIndex].click();
            } else {
                // Swipe right - previous image
                const currentActive = document.querySelector('.thumbnail.active');
                const currentIndex = Array.from(thumbnails).indexOf(currentActive);
                const prevIndex = currentIndex === 0 ? thumbnails.length - 1 : currentIndex - 1;
                thumbnails[prevIndex].click();
            }
        }
    }
};

// Add animation styles dynamically
const addAnimationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popIn {
            0% {
                transform: scale(0);
                opacity: 0;
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
};

// Initialize product page features
document.addEventListener('DOMContentLoaded', () => {
    addAnimationStyles();
    productGallery.init();
    sizeSelector.init();
    productAccordion.init();
    addToCart.init();
    productImageCarousel.init();
    
    // Add smooth scroll to related products
    const relatedProducts = document.querySelectorAll('.related-section .product-card');
    relatedProducts.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
