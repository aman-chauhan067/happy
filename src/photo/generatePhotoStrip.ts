import { birthdayConfig } from "../config/birthdayConfig";

export async function generatePhotoStrip(photos: string[]): Promise<string> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // Strip Dimensions
  const padding = 40;
  const photoWidth = 600;
  const photoHeight = 450; // 4:3 ratio
  const textSpace = 250;
  
  canvas.width = photoWidth + (padding * 2);
  canvas.height = (photoHeight * 4) + (padding * 5) + textSpace;

  // Background (Mela Red)
  ctx.fillStyle = "#D32F2F";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer Gold Border
  ctx.strokeStyle = "#FFD700";
  ctx.lineWidth = 8;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

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
      const x = padding;
      const y = padding + (i * (photoHeight + padding));
      
      const imgAspect = img.width / img.height;
      const targetAspect = photoWidth / photoHeight;
      
      let sWidth = img.width;
      let sHeight = img.height;
      let sX = 0;
      let sY = 0;

      if (imgAspect > targetAspect) {
        sWidth = img.height * targetAspect;
        sX = (img.width - sWidth) / 2;
      } else {
        sHeight = img.width / targetAspect;
        sY = (img.height - sHeight) / 2;
      }

      // Draw photo
      ctx.drawImage(img, sX, sY, sWidth, sHeight, x, y, photoWidth, photoHeight);

      // Bright Gold border around each photo
      ctx.strokeStyle = "#FFD700";
      ctx.lineWidth = 6;
      ctx.strokeRect(x, y, photoWidth, photoHeight);
      
    } catch (e) {
      console.error("Failed to load image for strip", e);
    }
  }

  // Draw Text
  const textY = canvas.height - textSpace + padding;
  
  // Date
  ctx.fillStyle = "#FFB347"; // Marigold
  ctx.textAlign = "center";
  ctx.font = "italic 32px Caveat, cursive";
  ctx.fillText(new Date().toLocaleDateString(), canvas.width / 2, textY + 30);
  
  // Main Text
  ctx.fillStyle = "#FFD700"; // Gold
  ctx.font = "bold 56px Caveat, cursive";
  const lines = birthdayConfig.photoStripMessage.split("\n");
  lines.forEach((line, index) => {
    ctx.fillText(line, canvas.width / 2, textY + 90 + (index * 50));
  });

  return canvas.toDataURL("image/png");
}
