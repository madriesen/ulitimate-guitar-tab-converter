import { chordRoots } from './chordRoots'
import { Chords, ParsedChord } from './types'

function transposeNote (note: Chords, num: number): Chords {
  let idx = chordRoots.indexOf(note)

  if (idx === -1) {
    throw new Error('unknown note: ' + note)
  }

  idx += num

  if (idx > 0) {
    idx = idx % chordRoots.length
  } else {
    idx = (chordRoots.length + idx) % chordRoots.length
  }

  return chordRoots[idx] as Chords
}

export function transpose (chord: ParsedChord, num: number): ParsedChord {
  const transposedChord = JSON.parse(JSON.stringify(chord)) as ParsedChord

  transposedChord.root = transposeNote(chord.root, num)

  if (chord.overridingRoot !== undefined) {
    transposedChord.overridingRoot = transposeNote(chord.overridingRoot, num)
  }

  return transposedChord
}
