# Vinero Minimal Agency Template

A high-quality, minimalistic portfolio and agency HTML template inspired by the "Vinero" aesthetic. Built with plain HTML, CSS, and Vanilla JavaScript, this template focuses on clean typography, smooth animations, and a modern design system.

## 🌟 Features

*   **Preloader Animation:** A sleek minimal loading screen with a simulated progress bar.
*   **Custom Cursor:** An interactive animated dot and follower ring that reacts to hover states.
*   **Smooth Scroll Animations:** Elements gracefully fade up as you scroll down using `IntersectionObserver`.
*   **Dynamic Navigation:** A full-screen hamburger menu overlay. The sticky header automatically adjusts its blending mode to stay visible over dark or light backgrounds.
*   **Portfolio Grid:** A responsive grid layout for projects with dark overlays and hover scaling effects.
*   **About Studio Section:** A clean split-layout design.
*   **Testimonials Carousel:** A lightweight, custom-built Vanilla JS quote slider that auto-plays.
*   **Interactive Contact Form:** A stylish footer form utilizing CSS-only floating labels.

## 🚀 How to Run Locally

Since this template uses Vanilla JS, HTML, and CSS, you can open `index.html` directly in your browser. However, for the best experience (especially if you add CORS-restricted assets later), it is recommended to run a local web server.

### Using Python 3
If you have Python installed, open your terminal in the project directory and run:
```bash
python -m http.server 8080
```
Then, open your browser and navigate to `http://localhost:8080`.

### Using Node.js
If you have Node.js and `npm` installed, you can use `http-server`:
```bash
npx http-server -p 8080
```

## 📁 Project Structure

```text
webapp/
├── assets/
│   └── images/
│       ├── about_studio_*.png    # Generated placeholder images
│       └── project_*.png
├── index.html                    # Main HTML file containing all sections
├── styles.css                    # CSS file with custom properties (variables)
├── script.js                     # Vanilla JS for interactions and animations
└── README.md                     # Project documentation
```

## 🎨 Customization

The template uses CSS Variables to make theming incredibly easy. You can change the primary colors, fonts, and animation speeds by editing the `:root` variables at the top of `styles.css`:

```css
:root {
    --bg-color: #f8f8f8;
    --text-color: #1a1a1a;
    --text-muted: #666666;
    --accent-color: #1a1a1a;
    --white: #ffffff;
    
    --font-primary: 'Inter', sans-serif;
    --font-heading: 'Syne', sans-serif;
}
```
