/**
 * ============================================
 * THEME CONFIGURATION
 * ============================================
 *
 * HOW TO CHANGE YOUR THEME:
 * You must update TWO files to change your theme:
 *   1. This file (theme.config.js) - controls fonts loaded and WebGL assets
 *   2. src/styles/main.css - controls CSS variables for colors and typography
 *
 * ============================================
 * COLOR OPTIONS
 * ============================================
 *
 * To add new colors, update BOTH:
 *
 * 'yellow':
 *   - theme.config.js:  color: 'yellow'
 *   - main.css:         @import './themes/colors/yellow.css';
 *
 *
 * ============================================
 * FONT OPTIONS
 * ============================================
 *
 * To change fonts, update BOTH:
 *
 * 'instrument-serif':
 *   - theme.config.js:  font: 'instrument-serif'
 *   - main.css:         @import './themes/fonts/instrument-serif.css';
 *   - Display font: Instrument Serif (elegant, editorial)
 *   - Body font: Inter
 *
 * ============================================
 */

export const theme = {
  color: 'yellow',
  font: 'instrument-serif'
}

/**
 * Asset mappings - resolved automatically based on theme choices
 */
export const assets = {
  fonts: {
    'instrument-serif': 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400..700&display=swap',
  }
}

/**
 * Get the beam asset path for the current theme
 */
export function getBeamPath() {
  return assets.beam[theme.color] || assets.beam.yellow
}

/**
 * Get the footer asset path for the current theme
 */
export function getFooterPath() {
  return assets.footer[theme.color] || assets.footer.yellow
}

/**
 * Get the font URLs for the current theme
 * Returns an array of URLs (some fonts require multiple imports)
 */
export function getFontUrls() {
  const fontString = assets.fonts[theme.font] || assets.fonts.figtree
  return fontString.split(',')
}
