/**
 * Pricing Toggle
 * Toggle between monthly/yearly billing
 */

import { $data, $$data } from '../utils/selectors.js';
import { EVENTS } from '../utils/shared-constants.js';

// Local constants
const BILLING_TYPES = {
  YEARLY: 'yearly',
  MONTHLY: 'monthly',
};

let section = null;
let toggleContainer = null;
let toggleBtns = [];
let priceElements = [];
let currentBilling = BILLING_TYPES.YEARLY;

/**
 * Update button styles
 */
function updateButtonStyles(activeBilling) {
  toggleBtns.forEach(btn => {
    const billing = btn.dataset.billing;
    if (billing === activeBilling) {
      btn.classList.add('bg-primary', 'text-primary-foreground');
      btn.classList.remove('text-foreground-muted', 'hover:text-foreground');
    } else {
      btn.classList.remove('bg-primary', 'text-primary-foreground');
      btn.classList.add('text-foreground-muted', 'hover:text-foreground');
    }
  });
}

/**
 * Update prices
 */
function updatePrices(billing) {
  priceElements.forEach(element => {
    const priceNumber = $data('price-number', null, element);
    if (!priceNumber) return;

    const monthlyPrice = parseInt(element.dataset.monthly, 10) || 0;
    const yearlyPrice = parseInt(element.dataset.yearly, 10) || 0;
    const price = billing === BILLING_TYPES.YEARLY ? yearlyPrice : monthlyPrice;

    priceNumber.textContent = price;
  });
}

/**
 * Handle toggle click
 */
function handleToggle(e) {
  const clickedBtn = e.currentTarget;
  const newBilling = clickedBtn.dataset.billing;

  if (newBilling === currentBilling) return;

  updateButtonStyles(newBilling);
  updatePrices(newBilling);

  currentBilling = newBilling;
}

/**
 * Initialize pricing toggle
 */
export function init() {
  section = $data('pricing-section');
  toggleContainer = $data('pricing-toggle');

  if (!section || !toggleContainer) return;

  toggleBtns = $$data('pricing-toggle-btn', null, toggleContainer);
  priceElements = $$data('pricing-value');

  if (toggleBtns.length === 0 || priceElements.length === 0) return;

  // Get default billing from data attribute
  currentBilling = section.dataset.defaultBilling || BILLING_TYPES.YEARLY;

  // Attach event listeners
  toggleBtns.forEach(btn => {
    btn.addEventListener(EVENTS.CLICK, handleToggle);
  });

  // Initialize
  updateButtonStyles(currentBilling);
  updatePrices(currentBilling);
}
