# MD. TANVIR SIDDIK | Premium Interactive Portfolio 🚀

Welcome to the official repository for the MD. Tanvir Siddik Professional Portfolio. This is a state-of-the-art, high-performance, and visually spectacular single-page web application showcasing credentials in Machine Learning, Data Science, Sustainable AI research, and Web Development.

**Live Production URL:** [https://my-tanvir-portfolio.vercel.app/](https://my-tanvir-portfolio.vercel.app/)

---

## ✨ Outstanding Features & Interactions

*   **Interactive Splash Loader:** Custom multi-stage SVG splash screen loading sequence with glassmorphic iconography.
*   **Vibrant Themed Aesthetics:** Tailored HSL color system featuring custom grids, radial dark-glow gradients, and responsive layouts.
*   **Dynamic Role Typing:** Smooth, multi-role typing effects using Typed.js.
*   **GSAP Powered Micro-Animations:** Custom orbital interactive illustration and ScrollTrigger-driven reveal sequences for premium feel.
*   **3D WEB Hover Preview (Stunning & Premium):**
    *   **Live Inline Play:** When hovering over the `3D Creator Portfolio Web App` project card, a smooth video preview plays seamlessly within the card.
    *   **Mouse-Following Cursor Tooltip:** On desktop views, a beautiful glassmorphic floating video preview tooltips dynamically tracks the cursor coordinates with soft inertia (GSAP).
*   **Credentials Hub:** Sectioned layout separating Certificates and Achievements with direct download links to full verification documents.
*   **Unified SMTP Contact Linkage:** Contact form automatically structures messages and launches user email clients with pre-filled fields.

---

## 🛠️ Technology Stack

*   **Core:** HTML5 (Semantic Structure), CSS3 (Vanilla Custom Gradients & Grids), Tailwind CSS (Utility Layouts)
*   **Motion Design & Interactions:** GSAP (GreenSock Animation Platform) + ScrollTrigger
*   **Text Animation:** Typed.js
*   **Vector Graphics:** Custom SVGs and embedded SVG icons
*   **Assets:** Optimized locally hosted screen recordings (`.mp4`) and documents
*   **Infrastructure / Deployment:** GitHub (Code Hosting) + Vercel (Production-Grade Live CI/CD Pipeline)

---

## 💻 Local Development & Execution

To run and test the portfolio website locally on your machine:

### Option 1: Double-Click
Simply open [index.html](file:///e:/Portfolio%20Website-2.0/tanvirfolio%203.0/index.html) directly in any modern web browser (Edge, Chrome, Safari, Firefox).

### Option 2: Local Server (Recommended for video assets)
Using a local dev server ensures proper video loading, bypasses CORS restrictions, and runs the application exactly like the live website:

1.  **With VS Code:** Install the **Live Server** extension, open the project folder, and click **Go Live** at the bottom-right corner.
2.  **With Node.js / NPM:** Run this command in the project root to start a server instantly:
    ```bash
    npx browser-sync start --server --files "*.html, *.css, *.js"
    ```
3.  **With Python:**
    ```bash
    python -m http.server 8000
    ```
    Then visit `http://localhost:8000`.

---

## 🔄 Automatic Update Feature (CI/CD Pipeline)

This portfolio is configured with a modern, high-grade continuous integration and continuous deployment (CI/CD) pipeline:

1.  **Local Development:** Edit files (`index.html`, `style.css`, `script.js`, etc.) on your local machine.
2.  **GitHub Versioning:** Commit and push your changes to your public repository:
    ```bash
    git add .
    git commit -m "Update portfolio features"
    git push origin main
    ```
3.  **Vercel Live Auto-Upgrade:** Vercel is connected directly to your GitHub repository. The moment a push is detected on the `main` branch:
    *   Vercel automatically triggers a fresh production build.
    *   The live website at [https://my-tanvir-portfolio.vercel.app/](https://my-tanvir-portfolio.vercel.app/) updates instantly without any downtime.

---

## 📂 Project Structure

```text
├── .agent/                  # GSD Template configuration
├── .agents/                 # Specialized subagent configs
├── .gemini/                 # Agent intelligence records
├── assets/
│   └── videos/
│       ├── 3d-portfolio-demo.mp4  # Smooth 3D project screen record
│       └── video-project.mp4      # Secondary demonstration video
├── documents/
│   ├── cv/
│   │   └── Tanvir_CV.pdf          # Professional Resume
│   └── certificates/
│       └── Tanvir_Certifications_Achievements.pdf  # Verified credentials
├── index.html               # Main website markup
├── style.css                # Visual layout & theme styles
├── script.js                # Interaction, GSAP & hover play logic
└── README.md                # Comprehensive documentation
```

---

## 📄 License
Proprietary codebase for MD. Tanvir Siddik. All rights reserved.
