/**
 * NOTE TO DEVS:
 *
 * Spacing should be consistent and whitespace thought of as a first class technique up
 * there with color and typefaces.
 *
 * Which mode of scale you use is based on the design.
 *
 * If you've got simpler app, you may only need 6 items.  Or maybe you want a spacing scale
 * to be named:
 *
 * export const spacing = {
 *   tiny: 4,
 *   small: 8,
 *   medium: 12,
 *   large: 24,
 *   huge: 64
 * }
 *
 * Whatever you choose, try to stick with these, and not freestyle it everywhere.
 *
 * Feel free to delete this block.
 */

/**
 * The available spacing.
 *
 * Here's the rough guideline.  Customize this for you usage.  It's ok to put exceptions
 * within the components themselves if they are truly exceptions.
 *
 * 0 = none    - nothing. only here to bust out of a zero-based array.
 * 1 = tiny    - elements contextually close to each other
 * 2 = smaller - for groups of closely related items or perhaps borders
 * 3 = small   - ?
 * 4 = medium  - ?
 * 5 = medium+ - ?
 * 6 = large   - between groups of content that aren't related?
 * 7 = huge    - ?
 * 8 = massive - an uncomfortable amount of whitespace
 */
export const spacing = [0, 4, 8, 12, 16, 24, 32, 48, 64];
export const spacingPx = spacing.map(i => `${i}px`);
export const screenPaddingX = spacing[4]; // fixed
export const screenPaddingY = spacing[4]; // fixed
export const screenMarginX = spacing[4];
export const screenMarginY = spacing[4];
export const componentPaddingX = spacing[3]; // fixed
export const componentPaddingY = spacing[3]; // fixed
export const componentMarginX = spacing[1];
export const componentMarginY = spacing[1];
