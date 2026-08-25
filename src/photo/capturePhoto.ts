export function capturePhoto(videoRef: HTMLVideoElement): string {
  const canvas = document.createElement("canvas");
  // We want to capture it mirrored
  canvas.width = videoRef.videoWidth;
  canvas.height = videoRef.videoHeight;
  
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // Flip the context horizontally so the resulting image is mirrored
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  
  // Crop to a square or specific aspect ratio for the photo strip if needed, 
  // but let's just capture the full frame and crop during strip generation.
  ctx.drawImage(videoRef, 0, 0, canvas.width, canvas.height);
  
  // Return base64 string
  return canvas.toDataURL("image/png");
}
