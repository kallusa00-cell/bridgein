/**
 * BridgeIn Main JavaScript
 * Handles client-side interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initMobileMenu();
  initStickyHeader();
  initScrollAnimations();
  initNewsletterForm();
  initCheckoutForm();
  initSmoothScroll();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!menuBtn || !mobileMenu) return;
  
  const menuOpen = menuBtn.querySelector('.menu-open');
  const menuClose = menuBtn.querySelector('.menu-close');
  
  menuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    
    mobileMenu.classList.toggle('hidden');
    menuOpen.classList.toggle('hidden');
    menuClose.classList.toggle('hidden');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });
  
  // Close menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuOpen.classList.remove('hidden');
      menuClose.classList.add('hidden');
      document.body.style.overflow = '';
    });
  });
}

/**
 * Sticky Header with Background Change
 */
function initStickyHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;
  
  let lastScroll = 0;
  
  const updateHeader = () => {
    const currentScroll = window.scrollY;
    
    // Add background when scrolled
    if (currentScroll > 50) {
      header.classList.add('bg-white/95', 'backdrop-blur-lg', 'shadow-sm');
    } else {
      header.classList.remove('bg-white/95', 'backdrop-blur-lg', 'shadow-sm');
    }
    
    // Hide/show on scroll (optional - uncomment if desired)
    // if (currentScroll > lastScroll && currentScroll > 200) {
    //   header.style.transform = 'translateY(-100%)';
    // } else {
    //   header.style.transform = 'translateY(0)';
    // }
    
    lastScroll = currentScroll;
  };
  
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader(); // Initial check
}

/**
 * Scroll Animations using Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if (!animatedElements.length) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: Stop observing after animation
          // observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );
  
  animatedElements.forEach((el) => observer.observe(el));
}

/**
 * Newsletter Form Handler
 */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  const message = document.getElementById('newsletter-message');
  
  if (!form || !message) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = form.querySelector('input[name="email"]').value;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Disable button
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="animate-spin">⏳</span> Subscribing...';
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'newsletter' }),
      });
      
      const data = await response.json();
      
      message.textContent = data.message;
      message.className = data.success 
        ? 'text-sm text-secondary-400 mt-3' 
        : 'text-sm text-red-400 mt-3';
      
      if (data.success) {
        form.reset();
      }
    } catch (error) {
      message.textContent = 'An error occurred. Please try again.';
      message.className = 'text-sm text-red-400 mt-3';
    }
    
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      Subscribe
      <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
      </svg>
    `;
  });
}

/**
 * Checkout Form Handler
 */
function initCheckoutForm() {
  const form = document.getElementById('checkout-form');
  if (!form) return;
  
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const btnLoader = document.getElementById('btn-loader');
  const errorMessage = document.getElementById('error-message');
  
  // Format card number input
  const cardInput = document.getElementById('cardNumber');
  if (cardInput) {
    cardInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
      value = value.match(/.{1,4}/g)?.join(' ') || value;
      e.target.value = value.substring(0, 19);
    });
  }
  
  // Format expiry input
  const expiryInput = document.getElementById('expiry');
  if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      e.target.value = value;
    });
  }
  
  // Format CVC input
  const cvcInput = document.getElementById('cvc');
  if (cvcInput) {
    cvcInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    });
  }
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    
    const formData = new FormData(form);
    const data = {
      name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      email: formData.get('email'),
      phone: formData.get('phone'),
      // In production, use Stripe.js to tokenize the card
      cardToken: 'tok_test_simulated',
    };
    
    try {
      const response = await fetch('/students/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Redirect to success page
        window.location.href = result.redirectUrl || '/students?enrolled=true';
      } else {
        throw new Error(result.message || 'Payment failed');
      }
    } catch (error) {
      errorMessage.textContent = error.message || 'An error occurred. Please try again.';
      errorMessage.classList.remove('hidden');
    }
    
    // Reset button
    submitBtn.disabled = false;
    btnText.classList.remove('hidden');
    btnLoader.classList.add('hidden');
  });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        
        // Update URL without jump
        history.pushState(null, null, targetId);
      }
    });
  });
}

/**
 * Utility: Format Currency
 */
function formatCurrency(amount, currency = 'CAD') {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Utility: Debounce Function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
