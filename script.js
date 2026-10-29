const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const menuIconPath = document.getElementById('menuIconPath');

if (menuButton && mobileMenu) {
  const setMobileMenuOpen = (isOpen) => {
    mobileMenu.classList.toggle('hidden', !isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    if (menuIconPath) {
      menuIconPath.setAttribute(
        'd',
        isOpen
          ? 'M6 6l12 12M18 6L6 18'
          : 'M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5'
      );
    }
  };

  menuButton.addEventListener('click', () => {
    setMobileMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMobileMenuOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMobileMenuOpen(false);
      menuButton.focus();
    }
  });

  window.matchMedia('(min-width: 768px)').addEventListener('change', (event) => {
    if (event.matches) {
      setMobileMenuOpen(false);
    }
  });
}

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const setActiveNav = () => {
  const scrollPosition = window.scrollY + 160;
  let activeSectionId = 'top';

  sections.forEach((section) => {
    if (section.offsetTop <= scrollPosition) {
      activeSectionId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isMatch = link.getAttribute('href') === `#${activeSectionId}`;
    link.classList.toggle('text-brand-700', isMatch);
    link.classList.toggle('font-semibold', isMatch);
    link.classList.toggle('underline', isMatch);
    if (isMatch) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

window.addEventListener('scroll', setActiveNav, { passive: true });
window.addEventListener('resize', setActiveNav);
setActiveNav();

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name') || 'Client';
    const email = formData.get('email') || '';
    const message = formData.get('message') || '';
    const waMessage = encodeURIComponent(
      `Hello Thomas, I would like to request counseling.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.open(`https://wa.me/2348030739704?text=${waMessage}`, '_blank', 'noopener,noreferrer');
  });
}
