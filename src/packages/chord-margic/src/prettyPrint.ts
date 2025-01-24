import { noteNamings } from './noteNamings'
import { chordQualities } from './chordQualities'
import { chordExtendeds } from './chordExtendeds'
import { chordAddeds } from './chordAddeds.js'
import { chordSuspendeds } from './chordSuspendeds'
import { Chords, NoteNamingType, ParsedChord } from './types'

export function prettyPrint (chord: ParsedChord, opts?: { naming?: NoteNamingType | Chords[] }): string {
  opts ??= {}
  const naming = opts.naming ?? 'English'

  // can specify an object here or one of 'English', 'NorthernEuropean', 'SouthernEuropean'
  let toPrintableNote
  // can specify an object here or one of 'English', 'NorthernEuropean', 'SouthernEuropean'
  if (typeof naming === 'string') {
    toPrintableNote = (note: Chords) => noteNamings[naming][note][0]
  } else {
    const noteNamesAsList = Object.keys(noteNamings.English)
    toPrintableNote = (note: string) => naming[noteNamesAsList.indexOf(note)] as Chords
  }
  // just use the first name for now, but later we may want to add options
  // to allow people to choose how to express chord. e.g. to prefer flats
  // instead of sharps, or prefer certain flats to certain sharps, etc.
  // (e.g. 'Bb' seems to be more common than 'A#', but 'F#' is more common than 'Ab')

  let str = toPrintableNote(chord.root)
  if (chord.extended !== undefined) {
    str += chordExtendeds[chord.extended][1][0] as string
  } else {
    str += chordQualities[chord.quality][0] as string
  }

  if (chord.added !== undefined) {
    str += chordAddeds[chord.added][0] as string
  }

  if (chord.suspended !== undefined) {
    str += chordSuspendeds[chord.suspended][0] as string
  }

  if (chord.overridingRoot !== undefined) {
    str += '/' + toPrintableNote(chord.overridingRoot)
  }
  return str
}
