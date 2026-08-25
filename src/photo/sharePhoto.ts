export function downloadPhoto(dataUrl: string, filename: string = "birthday-photo-strip.png") {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function sharePhoto(dataUrl: string, filename: string = "birthday-photo-strip.png"): Promise<boolean> {
  if (!navigator.share) {
    return false;
  }

  try {
    // Convert base64 to File object
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const file = new File([blob], filename, { type: "image/png" });

    await navigator.share({
      title: "Birthday Photo Strip",
      text: "A tiny thing I made for you.",
      files: [file]
    });
    
    return true;
  } catch (error) {
    console.error("Error sharing photo", error);
    return false;
  }
}
