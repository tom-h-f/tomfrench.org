# Audio Files Directory

This directory contains audio files for the noise player. 

## Expected files:

### Ambient Noise
- `brown-noise.mp3` - Brown noise for deep focus
- `white-noise.mp3` - White noise for general masking
- `pink-noise.mp3` - Pink noise for balanced frequency response

### Environment Sounds  
- `office-sounds.mp3` - Office environment with typing, conversations
- `coffee-shop.mp3` - Coffee shop ambience with conversations and espresso machines
- `library.mp3` - Quiet library atmosphere
- `rain.mp3` - Rain sounds for relaxation

### Music
- `focus-playlist.mp3` - Curated focus music
- `ambient-electronic.mp3` - Ambient electronic music
- `classical-study.mp3` - Classical music for studying

## Adding Your Own Audio Files

1. Place your audio files in this directory (`/public/audio/`)
2. Update the file references in `/src/app/noise/page.tsx`
3. Supported formats: MP3, WAV, OGG

## File Size Recommendations

- Keep files under 50MB for better loading performance
- Consider using compressed formats for web delivery
- Loop shorter clips for ambient sounds rather than long files
