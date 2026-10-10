# Christian Comedia — AI Video Creator Portfolio

A responsive, single-page portfolio website built with plain HTML, CSS, and JavaScript. No framework, build step, or paid hosting is required.

## Preview locally
1. Extract the ZIP.
2. Open `index.html` in Chrome, Edge, or Firefox.

## Add your videos
1. Put your MP4 files inside the `videos/` folder.
2. Open `index.html` in a text editor.
3. Find each project card, for example:
   `<article class="project" data-category="product" data-title="Product Film — Concept 01" data-video="">`
4. Change `data-video=""` to your file path, e.g. `data-video="videos/perfume-ad.mp4"`.
5. Change the project title, category, and description to match the actual video. Duplicate a project `<article>` block to add more cards.
6. The placeholder art is automatically covered by the playable video once a video path is set. Keep the file path relative and use simple filenames without spaces if possible.

Supported categories: `product`, `fashion`, `cinematic`, `social`.

## Personalize contact details
In the `SETTINGS` object near the bottom of `index.html`, replace:
- `YOUR_EMAIL@example.com` with your professional email.
- `https://www.linkedin.com/` with your actual LinkedIn or another public profile link.

Update the About section and tool list so they accurately reflect your work and experience.

## Free publishing with GitHub Pages
1. Create or sign in to a GitHub account at https://github.com/.
2. Create a new **public** repository, e.g. `ai-video-portfolio`.
3. Upload `index.html`, `README.md`, and the `videos` folder (including your MP4s). Keep `index.html` at the repository root.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**; select `main` and `/ (root)`, then save.
6. After GitHub publishes it, your site will be available at `https://YOUR-USERNAME.github.io/ai-video-portfolio/`.

## Video size advice
- Use compressed MP4 (H.264) files, ideally 5–25 MB each for quick loading.
- Large video files can make the site slow and may hit GitHub's file-size limits. For larger projects, host videos on a free video host that supports public embeds or use short compressed previews.
- Do not upload private client work or anything you lack permission to publish.
- This package is a static site; no backend or contact form is included. The email button opens the visitor's email app.
