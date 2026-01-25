/**
 * Selector Utilities
 * DOM selection helpers
 */

/**
 * Query single element (shorthand for querySelector)
 * @param {string} selector - CSS selector
 * @param {Document|Element} [context=document] - Context element
 * @returns {Element|null}
 */
export const $ = (selector, context = document) =>
  context.querySelector(selector);

/**
 * Query all elements as array (shorthand for querySelectorAll)
 * @param {string} selector - CSS selector
 * @param {Document|Element} [context=document] - Context element
 * @returns {Element[]}
 */
export const $$ = (selector, context = document) =>
  [...context.querySelectorAll(selector)];

/**
 * Query element by data attribute
 * @param {string} attr - Data attribute name (without 'data-' prefix)
 * @param {string} [value] - Optional attribute value
 * @param {Document|Element} [context=document] - Context element
 * @returns {Element|null}
 */
export const $data = (attr, value = null, context = document) => {
  const selector = value !== null
    ? `[data-${attr}="${value}"]`
    : `[data-${attr}]`;
  return context.querySelector(selector);
};

/**
 * Query all elements by data attribute as array
 * @param {string} attr - Data attribute name (without 'data-' prefix)
 * @param {string} [value] - Optional attribute value
 * @param {Document|Element} [context=document] - Context element
 * @returns {Element[]}
 */
export const $$data = (attr, value = null, context = document) => {
  const selector = value !== null
    ? `[data-${attr}="${value}"]`
    : `[data-${attr}]`;
  return [...context.querySelectorAll(selector)];
};
