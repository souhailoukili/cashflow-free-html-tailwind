/**
 * Mobile Menu
 * Handles mobile navigation modal with CSS transitions
 */

import { $data, $$data } from '../utils/selectors.js';
import { EVENTS, CLASSES } from '../utils/shared-constants.js';

let modal = null;
let menuRight = null;
let menuItems = null;
let isClosing = false;

/**
 * Open the modal
 */
function openModal() {
  if (isClosing || !modal) return;
  modal.showModal();
  modal.classList.add(CLASSES.OPEN);

  // Animate menu items in with staggered delays via CSS
  menuItems.forEach((item, index) => {
    item.style.transitionDelay = `${0.5 + index * 0.08}s`;
    item.classList.add('menu-item-visible');
  });
}

/**
 * Close the modal
 */
function closeModal() {
  if (isClosing || !modal) return;
  isClosing = true;

  // Animate menu items out (reverse order)
  menuItems.forEach((item, index) => {
    const reverseIndex = menuItems.length - 1 - index;
    item.style.transitionDelay = `${reverseIndex * 0.05}s`;
    item.classList.remove('menu-item-visible');
  });

  // Wait for animations then close
  setTimeout(() => {
    modal.classList.remove(CLASSES.OPEN);
    setTimeout(() => {
      modal.close();
      isClosing = false;
      // Reset delays
      menuItems.forEach(item => {
        item.style.transitionDelay = '0s';
      });
    }, 500);
  }, 300);
}

/**
 * Handle nav link clicks inside menu
 */
function handleMenuClick(event) {
  if (event.target.tagName === 'A') {
    closeModal();
  }
}

/**
 * Handle modal cancel (ESC key)
 */
function handleCancel(event) {
  event.preventDefault();
  closeModal();
}

/**
 * Initialize mobile menu
 */
export function init() {
  modal = $data('modal');
  menuRight = $data('modal-menu');
  menuItems = $$data('menu-item');

  if (!modal || !menuRight || menuItems.length === 0) return;

  const openButtons = $$data('modal-open');
  const closeButtons = $$data('modal-close');

  // Event listeners
  menuRight.addEventListener(EVENTS.CLICK, handleMenuClick);
  closeButtons.forEach(btn => btn.addEventListener(EVENTS.CLICK, closeModal));
  openButtons.forEach(btn => btn.addEventListener(EVENTS.CLICK, openModal));
  modal.addEventListener('cancel', handleCancel);
}
