export async function generatePhotoStrip(photos: string[]): Promise<string> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // Strip Dimensions - Horizontal for Spotify Theme
  const padding = 20;
  const photoWidth = 400;
  const photoHeight = 300; // 4:3 ratio
  
  canvas.width = (photoWidth * 4) + (padding * 5);
  canvas.height = photoHeight + (padding * 2) + 100; // Extra 100px for text at bottom

  // Background (White, like an old film strip)
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Helper to load image
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  // Draw Photos
  for (let i = 0; i < photos.length; i++) {
    try {
      const img = await loadImage(photos[i]);
      const x = padding + (i * (photoWidth + padding));
      const y = padding;
      
      // Draw photo grayscale
      ctx.filter = 'grayscale(100%)';
      ctx.drawImage(img, x, y, photoWidth, photoHeight);
      ctx.filter = 'none';

      // Inner border
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, photoWidth, photoHeight);
      
    } catch (e) {
      console.error("Failed to load image for strip", e);
    }
  }

  // Draw Text at bottom
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.font = "bold 32px Helvetica, sans-serif";
  ctx.fillText("HIMANSHU JI × AMAN", canvas.width / 2, canvas.height - 60);
  
  ctx.font = "bold 24px Helvetica, sans-serif";
  ctx.fillText("HAPPY BIRTHDAY 2026", canvas.width / 2, canvas.height - 30);
  
  ctx.font = "italic 20px Helvetica, sans-serif";
  ctx.fillText("finally ek photo toh hai", canvas.width / 2, canvas.height - 10);

  return canvas.toDataURL("image/jpeg");
}
