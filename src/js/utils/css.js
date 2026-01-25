/**
 * CSS Utilities
 * Helper functions for working with CSS
 */

/**
 * Get CSS variable value from document root
 * @param {string} name - CSS variable name (e.g., '--color-primary')
 * @returns {string} The computed value of the CSS variable
 */
export const getCSSVar = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();
