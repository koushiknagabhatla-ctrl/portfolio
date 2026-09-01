// public/ filenames are not content-hashed but are served immutable for a year
// (vercel.json), so a regenerated photo would stay stale in returning browsers.
// Bump this whenever scripts/build-images.mjs rewrites the files.
export const IMG_V = '?v=2';
