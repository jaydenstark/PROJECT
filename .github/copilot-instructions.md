# Copilot Instructions for AI Coding Agents

## Project Overview
This is a static e-commerce storefront for cables and accessories, built with vanilla HTML, CSS, and JavaScript. The main pages are:
- `index.html`: Landing page with a redirect button to the store.
- `store.html`: Product listing page with 8 products, each clickable for details.
- `cart.html`: Shopping cart page (structure inferred, not provided).
- `store/productN.html`: Individual product detail pages (for 8 products).

## Architecture & Data Flow
- **No backend/server code**: All logic is client-side.
- **Cart state**: Managed in `localStorage` as a JS object keyed by product ID. Cart count is updated dynamically.
- **Navigation**: Header links and a floating cart link are present on store pages.
- **Product actions**: Each product has an "Add to Cart" button, which updates localStorage and the cart count.

## Key Files & Patterns
- `script.js`: Handles cart logic, product add-to-cart, and cart count updates. Uses event listeners and localStorage.
- `style.css`: Implements a modern, gradient-heavy UI. Product hover states use gradients and text effects. Navigation and buttons have custom styles.
- `TODO.md`: Tracks feature work; use this for workflow context (e.g., scroll animations, light mode toggle, music player, blurred sections).
- `images/`: Contains product and UI images. Use descriptive alt text for accessibility.
- `store/`: Contains individual product pages (structure inferred from TODOs).

## Developer Workflows
- **No build step**: Directly edit HTML/CSS/JS files. No frameworks or bundlers.
- **Testing**: Manual browser testing only; no automated tests or test runner present.
- **Debugging**: Use browser dev tools. No source maps or advanced debugging setup.
- **Feature tracking**: Refer to `TODO.md` for current and planned features.

## Project-Specific Conventions
- **Cart logic**: Always update localStorage and cart count after cart changes.
- **Product structure**: Each `.product` div in `store.html` must have `data-id`, `data-name`, and `data-price` attributes.
- **Styling**: Use gradients for hover states on buttons and product cards. Avoid borders on hover.
- **Navigation**: Header and floating cart link must be present on all store/cart pages.
- **Accessibility**: Use descriptive alt text for images.

## Integration Points
- **No external dependencies**: All code is local; no npm, CDN, or third-party JS/CSS.
- **Images**: Use local images from `images/` or placeholder URLs as needed.

## Example Patterns
- **Add to Cart**:
  ```js
  button.addEventListener('click', () => {
    // ...get product info...
    // ...update localStorage...
    // ...update cart count...
  });
  ```
- **Product Card Structure**:
  ```html
  <div class="product" data-id="1" data-name="USB Cable" data-price="10.00">
    <img src="images/..." alt="USB Cable">
    <h2>...</h2>
    <p>...</p>
    <button class="add-to-cart">Add to Cart</button>
  </div>
  ```

## Recommendations for AI Agents
- Follow the patterns in `store.html` and `script.js` for new products/features.
- Update `TODO.md` when adding or completing features.
- Maintain UI consistency with gradients and hover effects as in `style.css`.
- Ensure cart logic always syncs with localStorage and UI.
- No need for build/test commands; changes are live on file save.

---
If any section is unclear or missing, please provide feedback to improve these instructions.
