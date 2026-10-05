# Saudi National Day video assets

These MP4s are web copies of the six public Google Drive videos referenced in
`assets/js/main.js`. The Drive IDs remain available for the playback error fallback.
Original uploads are not stored in this repository.

Encoding: H.264 (`libx264`), CRF 23, maximum 1080-pixel width / 30 fps,
4 Mbps maximum video bitrate, AAC 128 kbps, `yuv420p`, and MP4 `faststart`.
The original aspect ratio is preserved. WebP posters come from the video at
one second, with a maximum width of 720 pixels.

The gallery initially loads only the poster. The MP4 source is attached after
the visitor presses play, using a native video element with inline playback
and fullscreen controls. Keep both the MP4 and its local poster when adding
another Drive video; an iframe recreates the oversized controls on mobile.
