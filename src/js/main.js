/**
 * Main Application Entry Point
 */

// GSAP plugins - registered once here for all modules
import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(MorphSVGPlugin);

// Local constants
const READY_STATE = {
  LOADING: 'loading',
};

const LOCAL_EVENTS = {
  DOM_CONTENT_LOADED: 'DOMContentLoaded',
};

// Core modules
import * as pageLoaded from './core/page-loaded.js';
import * as mobileMenu from './core/mobile-menu.js';

// Component modules
import * as faqAccordion from './components/faq-accordion.js';
import * as pricingToggle from './components/pricing-toggle.js';

// All modules
const modules = [
  // Core
  pageLoaded,
  mobileMenu,
  // Components
  faqAccordion,
  pricingToggle
];

// Initialize all modules
function initAll() {
  modules.forEach(module => {
    if (typeof module.init === 'function') {
      module.init();
    }
  });
}

// Initialize on DOM ready
if (document.readyState === READY_STATE.LOADING) {
  document.addEventListener(LOCAL_EVENTS.DOM_CONTENT_LOADED, initAll);
} else {
  initAll();
}
