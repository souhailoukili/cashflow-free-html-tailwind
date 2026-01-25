/**
 * Breakpoints Utility
 * Tailwind CSS breakpoint definitions and query helpers
 *
 * Reads breakpoint values from Tailwind CSS variables (--breakpoint-sm, etc.)
 * To add custom breakpoints: add the name to BREAKPOINT_NAMES array below
 */

import { getCSSVar } from './css.js';

// Breakpoint names to read from CSS variables
// Add custom breakpoint names here (e.g., '3xl', 'mobile', 'tablet')
const BREAKPOINT_NAMES = ['sm', 'md', 'lg', 'xl', '2xl'];

/**
 * Convert rem value to pixels
 * @param {string} remValue - CSS rem value (e.g., '48rem')
 * @returns {number} Pixel value
 */
function remToPx(remValue) {
  const rem = parseFloat(remValue);
  if (isNaN(rem)) return 0;
  // Get root font size (default 16px)
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  return rem * rootFontSize;
}

/**
 * Read breakpoints from Tailwind CSS variables
 * @returns {Object} Breakpoints object with pixel values
 */
function getBreakpointsFromCSS() {
  const result = {};
  BREAKPOINT_NAMES.forEach(name => {
    const cssValue = getCSSVar(`--breakpoint-${name}`);
    if (cssValue) {
      result[name] = remToPx(cssValue);
    }
  });
  return result;
}

// Export breakpoints (reads from CSS on first load)
export const breakpoints = getBreakpointsFromCSS();

/*
 * FALLBACK: Hardcoded breakpoints (Tailwind v4 defaults)
 * Uncomment this and comment out the above if you prefer static values
 * or are using a framework other than Tailwind CSS
 *
 * export const breakpoints = {
 *   sm: 640,
 *   md: 768,
 *   lg: 1024,
 *   xl: 1280,
 *   '2xl': 1536
 * };
 */

/**
 * Check if viewport is at or above a breakpoint
 * @param {string} breakpoint - Breakpoint name (sm, md, lg, xl, 2xl)
 * @returns {boolean}
 */
export const isAbove = (breakpoint) => {
  const width = breakpoints[breakpoint];
  if (!width) return false;
  return window.innerWidth >= width;
};

/**
 * Check if viewport is below a breakpoint
 * @param {string} breakpoint - Breakpoint name (sm, md, lg, xl, 2xl)
 * @returns {boolean}
 */
export const isBelow = (breakpoint) => {
  const width = breakpoints[breakpoint];
  if (!width) return false;
  return window.innerWidth < width;
};

/**
 * Get current breakpoint name
 * @returns {string} Current breakpoint (xs, sm, md, lg, xl, 2xl)
 */
export const getCurrentBreakpoint = () => {
  const width = window.innerWidth;
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
};

/*
 * NOTE: For device detection (isMobile, isTablet, isDesktop),
 * use the devices.js utility instead:
 *
 *   import { isMobile, isTablet, isDesktop } from '../utils/devices.js';
 *
 * This file is for Tailwind CSS breakpoint queries (sm, md, lg, xl, 2xl).
 */
