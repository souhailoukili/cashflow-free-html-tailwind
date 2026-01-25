/**
 * Resize Utility
 * Debounced window resize event handling
 */

import { EVENTS } from './shared-constants.js';

const listeners = new Set();
let resizeTimeout = null;
let isInitialized = false;

/**
 * Handle resize with debounce
 */
function handleResize() {
  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
  }

  resizeTimeout = setTimeout(() => {
    listeners.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('Resize listener error:', error);
      }
    });
  }, 150); // 150ms debounce
}

/**
 * Initialize resize listener (called automatically on first subscription)
 */
function initResizeListener() {
  if (isInitialized) return;
  window.addEventListener(EVENTS.RESIZE, handleResize);
  isInitialized = true;
}

/**
 * Subscribe to resize events
 * @param {Function} callback - Function to call on resize
 * @returns {Function} Unsubscribe function
 */
export const onResize = (callback) => {
  initResizeListener();
  listeners.add(callback);

  // Return unsubscribe function
  return () => {
    listeners.delete(callback);
  };
};

/**
 * Remove all resize listeners and cleanup
 */
export const cleanupResize = () => {
  listeners.clear();
  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
    resizeTimeout = null;
  }
  if (isInitialized) {
    window.removeEventListener(EVENTS.RESIZE, handleResize);
    isInitialized = false;
  }
};
