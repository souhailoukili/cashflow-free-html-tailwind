/**
 * Page Loaded
 *
 * Emits a custom event that other animation modules can wait for
 * before initializing (e.g. scroll-animations.js, about-hero.js).
 *
 * RELATED FILES:
 * - src/js/core/scroll-animations.js (waits for PAGE_LOAD_COMPLETE_EVENT)
 * - src/js/animations/about-hero.js (waits for PAGE_LOAD_COMPLETE_EVENT)
 */

/**
 * Custom event name dispatched when the page is ready for animations.
 * @example
 * import { PAGE_LOAD_COMPLETE_EVENT } from './page-loaded.js';
 * window.addEventListener(PAGE_LOAD_COMPLETE_EVENT, () => { ... });
 */
export const PAGE_LOAD_COMPLETE_EVENT = 'pageLoadComplete';

export function init() {
  queueMicrotask(() => {
    window.dispatchEvent(new CustomEvent(PAGE_LOAD_COMPLETE_EVENT));
  });
}
