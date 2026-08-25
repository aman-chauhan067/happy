import { Howl, Howler } from "howler";

class AudioManager {
  private isMuted: boolean = false;
  private bgm: Howl | null = null;
  private sfxMap: Record<string, Howl> = {};

  init() {
    this.sfxMap = {
      click: new Howl({ src: ['data:audio/mp3;base64,//OExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'], volume: 0.5 }),
      success: new Howl({ src: ['data:audio/mp3;base64,//OExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'], volume: 0.6 })
    };
  }

  playSfx(id: string) {
    if (!this.isMuted && this.sfxMap[id]) {
      this.sfxMap[id].play();
    }
  }

  playBgm(_id: string) {
    if (this.bgm) {
      this.bgm.fade(0.5, 0, 1000);
      setTimeout(() => this.bgm?.stop(), 1000);
    }
    // Mock BGM logic (since no assets available)
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    Howler.mute(this.isMuted);
    return this.isMuted;
  }
}

export const audio = new AudioManager();
