/**
 * Reduced Motion Utility
 * Centralized detection and handling of prefers-reduced-motion
 */

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

