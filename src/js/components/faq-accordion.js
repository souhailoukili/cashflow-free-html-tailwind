/**
 * FAQ Accordion
 * Animated accordion with MorphSVG icon transitions
 */

import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { $data, $$data } from '../utils/selectors.js';
import { prefersReducedMotion } from '../utils/reduced-motion.js';
import { getCSSVar } from '../utils/css.js';
import { EASING, EVENTS, CLASSES, CSS_VARS } from '../utils/shared-constants.js';

// Local constants
const PATHS = {
  plus: 'M12 5v14M5 12h14',
  circleX: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M15 9l-6 6M9 9l6 6'
};

const COLORS = {
  MUTED_WHITE: 'rgba(255, 255, 255, 0.6)',
};

const SVG_ATTRS = {
  WIDTH: 'width',
  HEIGHT: 'height',
  D: 'd',
};

let accordion = null;
let items = [];

/**
 * Initialize FAQ accordion
 */
export function init() {
  accordion = $data('faq-accordion');
  if (!accordion) return;

  items = $$data('faq-item', null, accordion);
  if (items.length === 0) return;

  const reducedMotion = prefersReducedMotion();

  items.forEach((item) => {
    const trigger = $data('faq-trigger', null, item);
    const content = $data('faq-content', null, item);
    const answer = $data('faq-answer', null, item);
    const iconPath = $data('faq-icon-path', null, item);
    const borderRect = $data('faq-border-rect', null, item);

    if (!trigger || !content || !answer || !iconPath || !borderRect) return;

    const primaryColor = getCSSVar(CSS_VARS.COLOR_PRIMARY);
    borderRect.style.stroke = primaryColor;

    function updateBorderSize() {
      const width = item.offsetWidth - 1;
      const height = item.offsetHeight - 1;
      borderRect.setAttribute(SVG_ATTRS.WIDTH, width);
      borderRect.setAttribute(SVG_ATTRS.HEIGHT, height);
      return 2 * (width + height);
    }

    const initialPerimeter = updateBorderSize();
    gsap.set(borderRect, {
      strokeDasharray: initialPerimeter,
      strokeDashoffset: initialPerimeter,
    });

    trigger.addEventListener(EVENTS.CLICK, () => {
      const isOpen = item.classList.contains(CLASSES.IS_OPEN);

      if (isOpen) {
        // Close this item
        item.classList.remove(CLASSES.IS_OPEN);
        trigger.setAttribute('aria-expanded', 'false');

        if (reducedMotion) {
          gsap.set(content, { height: 0 });
          const p = updateBorderSize();
          gsap.set(borderRect, { strokeDasharray: p, strokeDashoffset: p });
          gsap.set(iconPath, { stroke: COLORS.MUTED_WHITE });
          MorphSVGPlugin.convertToPath(iconPath);
          iconPath.setAttribute(SVG_ATTRS.D, PATHS.plus);
        } else {
          const currentPerimeter = 2 * (item.offsetWidth + item.offsetHeight);

          const tl = gsap.timeline();

          tl.to(borderRect, {
            strokeDashoffset: currentPerimeter,
            duration: 0.4,
            ease: EASING.POWER2_IN,
          });

          tl.to(content, {
            height: 0,
            duration: 0.4,
            ease: EASING.POWER2_IN_OUT,
            onUpdate: () => {
              const p = updateBorderSize();
              gsap.set(borderRect, { strokeDasharray: p, strokeDashoffset: p });
            },
          }, '-=0.1');

          gsap.set(iconPath, { stroke: COLORS.MUTED_WHITE });
          gsap.to(iconPath, {
            morphSVG: PATHS.plus,
            duration: 0.4,
            ease: EASING.POWER2_IN_OUT,
          });
        }
      } else {
        // Close all other items first
        items.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains(CLASSES.IS_OPEN)) {
            const otherTrigger = $data('faq-trigger', null, otherItem);
            const otherContent = $data('faq-content', null, otherItem);
            const otherIconPath = $data('faq-icon-path', null, otherItem);
            const otherBorderRect = $data('faq-border-rect', null, otherItem);

            otherItem.classList.remove(CLASSES.IS_OPEN);
            otherTrigger.setAttribute('aria-expanded', 'false');

            if (reducedMotion) {
              gsap.set(otherContent, { height: 0 });
              const w = otherItem.offsetWidth - 1;
              const h = otherItem.offsetHeight - 1;
              otherBorderRect.setAttribute(SVG_ATTRS.WIDTH, w);
              otherBorderRect.setAttribute(SVG_ATTRS.HEIGHT, h);
              const p = 2 * (w + h);
              gsap.set(otherBorderRect, { strokeDasharray: p, strokeDashoffset: p });
              gsap.set(otherIconPath, { stroke: COLORS.MUTED_WHITE });
              MorphSVGPlugin.convertToPath(otherIconPath);
              otherIconPath.setAttribute(SVG_ATTRS.D, PATHS.plus);
            } else {
              const otherPerimeter = 2 * (otherItem.offsetWidth + otherItem.offsetHeight);
              const otherTl = gsap.timeline();

              otherTl.to(otherBorderRect, {
                strokeDashoffset: otherPerimeter,
                duration: 0.4,
                ease: EASING.POWER2_IN,
              });

              otherTl.to(otherContent, {
                height: 0,
                duration: 0.4,
                ease: EASING.POWER2_IN_OUT,
                onUpdate: () => {
                  const w = otherItem.offsetWidth - 1;
                  const h = otherItem.offsetHeight - 1;
                  otherBorderRect.setAttribute(SVG_ATTRS.WIDTH, w);
                  otherBorderRect.setAttribute(SVG_ATTRS.HEIGHT, h);
                  const p = 2 * (w + h);
                  gsap.set(otherBorderRect, { strokeDasharray: p, strokeDashoffset: p });
                },
              }, '-=0.1');

              gsap.set(otherIconPath, { stroke: COLORS.MUTED_WHITE });
              gsap.to(otherIconPath, {
                morphSVG: PATHS.plus,
                duration: 0.4,
                ease: EASING.POWER2_IN_OUT,
              });
            }
          }
        });

        // Open this item
        item.classList.add(CLASSES.IS_OPEN);
        trigger.setAttribute('aria-expanded', 'true');

        const answerHeight = answer.offsetHeight;

        if (reducedMotion) {
          gsap.set(content, { height: answerHeight });
          const finalPerimeter = updateBorderSize();
          gsap.set(borderRect, { strokeDasharray: finalPerimeter, strokeDashoffset: 0 });
          gsap.set(iconPath, { stroke: primaryColor });
          MorphSVGPlugin.convertToPath(iconPath);
          iconPath.setAttribute(SVG_ATTRS.D, PATHS.circleX);
        } else {
          gsap.to(content, {
            height: answerHeight,
            duration: 0.5,
            ease: EASING.POWER2_IN_OUT,
            onUpdate: () => {
              const p = updateBorderSize();
              gsap.set(borderRect, { strokeDasharray: p });
            },
            onComplete: () => {
              const finalPerimeter = updateBorderSize();
              gsap.set(borderRect, { strokeDasharray: finalPerimeter });
            },
          });

          gsap.to(borderRect, {
            strokeDashoffset: 0,
            duration: 0.6,
            ease: EASING.POWER2_OUT,
            delay: 0.1,
          });

          const primaryColor = getCSSVar(CSS_VARS.COLOR_PRIMARY);
          gsap.set(iconPath, { stroke: primaryColor });
          gsap.to(iconPath, {
            morphSVG: PATHS.circleX,
            duration: 0.4,
            ease: EASING.POWER2_IN_OUT,
          });
        }
      }
    });
  });
}