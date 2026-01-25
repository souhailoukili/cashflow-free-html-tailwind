/**
 * Device Detection Utility
 * Provides device-type detection based on viewport width
 *
 * ============================================
 * DEVICE BREAKPOINTS
 * ============================================
 * Mobile:  0 - 767px
 * Tablet:  768px - 1023px
 * Desktop: 1024px+
 *
 * These thresholds align with common device categories:
 * - Mobile: phones in portrait/landscape
 * - Tablet: tablets, small laptops
 * - Desktop: laptops, monitors
 *
 * ============================================
 * USAGE
 * ============================================
 * import { isMobile, isTablet, isDesktop } from '../utils/devices.js';
 *
 * // Simple checks
 * if (isMobile()) { ... }
 * if (isDesktop()) { ... }
 *
 * // Get current device type
 * const device = getDeviceType(); // 'mobile' | 'tablet' | 'desktop'
 *
 * ============================================
 * NOTE ON BREAKPOINTS.JS
 * ============================================
 * This file is for DEVICE detection (mobile/tablet/desktop).
 * Use breakpoints.js for Tailwind CSS breakpoint queries (sm/md/lg/xl/2xl).
 */

// Device type constants
export const DEVICE_TYPES = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
};

// Breakpoint thresholds (pixels)
const THRESHOLDS = {
  MOBILE_MAX: 768,   // Below this = mobile
  DESKTOP_MIN: 1024  // At or above this = desktop (between = tablet)
};

/**
 * Get the current device type based on viewport width
 * @returns {'mobile' | 'tablet' | 'desktop'}
 */
export function getDeviceType() {
  const width = window.innerWidth;
  if (width < THRESHOLDS.MOBILE_MAX) return DEVICE_TYPES.MOBILE;
  if (width < THRESHOLDS.DESKTOP_MIN) return DEVICE_TYPES.TABLET;
  return DEVICE_TYPES.DESKTOP;
}

/**
 * Check if current viewport is mobile (<768px)
 * @returns {boolean}
 */
export function isMobile() {
  return window.innerWidth < THRESHOLDS.MOBILE_MAX;
}

/**
 * Check if current viewport is tablet (768px - 1023px)
 * @returns {boolean}
 */
export function isTablet() {
  const width = window.innerWidth;
  return width >= THRESHOLDS.MOBILE_MAX && width < THRESHOLDS.DESKTOP_MIN;
}

/**
 * Check if current viewport is desktop (1024px+)
 * @returns {boolean}
 */
export function isDesktop() {
  return window.innerWidth >= THRESHOLDS.DESKTOP_MIN;
}

/**
 * Check if current viewport is mobile or tablet (<1024px)
 * Useful for disabling heavy effects on non-desktop devices
 * @returns {boolean}
 */
export function isMobileOrTablet() {
  return window.innerWidth < THRESHOLDS.DESKTOP_MIN;
}
