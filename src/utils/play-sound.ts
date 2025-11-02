import boopSound from '../assets/sounds/boop.m4a'
import swooshSound from '../assets/sounds/swoosh1.m4a'
import mouseClickSound from '../assets/sounds/mouse-click-2.mp3'
import themeSwitchSound from '../assets/sounds/boop-5.mp3'

const audioCache: Record<string, HTMLAudioElement> = {}

export type Sound = 'boop' | 'swoosh' | 'mouseClick' | 'themeSwitch'
export const playSound = (sound: Sound) => {
  try {
    const soundMap = {
      boop: boopSound,
      swoosh: swooshSound,
      mouseClick: mouseClickSound,
      themeSwitch: themeSwitchSound,
    }

    const soundUrl = soundMap[sound]

    if (!audioCache[sound]) {
      audioCache[sound] = new Audio(soundUrl)
      audioCache[sound].volume = 0.8
    }

    const audio = audioCache[sound]
    audio.currentTime = 0
    audio.play().catch(console.error)
  } catch (error) {
    console.error('Could not play sound:', error)
  }
}
