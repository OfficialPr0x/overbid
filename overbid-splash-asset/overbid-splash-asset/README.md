# OVERBID — splash / welcome background

This fills the missing A02 centered welcome background from the earlier asset pack. It is a clean image plate, not a flattened website. No text, UI or logo is baked into it.

## Install
Copy `public/media/` into your project's public directory. The source PNG is for editing or Seedance input; keep it outside the public runtime.

## Cursor instruction
Replace the splash screen's temporary procedural/CSS gateway,columns,veining and smoke with `/media/splash-threshold.webp`. Preserve the live OVERBID header logo,Skip intro,welcome headline,supporting copy,Enter button and approved rabbit emblem overlay. Remove duplicate scenery layers so two triangles do not stack. Keep text and controls as HTML. Do not regenerate or distort the logo.

Use a full-bleed absolute image layer with object-fit:cover and centered positioning for wide desktop. Stage dimensions and viewport crop determine exact placement: inspect at1920×1080 and1440×900. Use the complete16:9 plate as a separate top art stage on narrow screens, with live copy underneath; do not blindly crop the logo aperture out of a tall viewport. Lower image area is intentionally dark for live content.

Starting overlay coordinates for the UNCROPPED16:9 plate: rabbit at x50%,y36%, width9–11% of image width. Welcome text around y69–80%; CTA near y86%. These are starting positions,not universal viewport coordinates. If cover crops, either match the logo overlay transform to the image transform or use an aspect-ratio stage. Keep focus rings visible and skip always accessible.

Layer order: background plate0,optional lower black scrim1,rabbit mark2,live content3,header/Skip4. Do not increase glow behind body copy. Use image dimensions from manifest. Only the primary splash/hero image should be prioritized; no need to load every large image at once.

## Motion
Static asset provided. Optional Seedance image-to-video: locked camera,subtle ground fog and reflection movement,architecture perfectly static,no new symbols,no text,no animals,no audio. Composite the rabbit and live copy separately. Inspect the video seam. Retain this still as poster; reduced-motion and mobile can remain static. Enter/Skip must never depend on media loading.

Generated with built-in image generation. Original PNG and optimized desktop/small WebP renditions included. All images are opaque. The smaller export preserves composition; it is not a separately art-directed mobile image.
