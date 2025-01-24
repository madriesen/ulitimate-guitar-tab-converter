import { chordRegexes } from './chordRegexes'
import {
  rootLookups,
  chordExtendedsLookups,
  chordQualitiesLookups,
  chordAddedsLookups,
  chordSuspendedsLookups
} from './reverseLookups'
import {
  ChordAdded, ChordExtends,
  ChordQuality,
  ChordQualityValue,
  Chords, ChordSuspended,
  ExtendedValue,
  NoteNamingType, ParsedChord
} from './types'

type MatchType = [string, Chords, ChordQualityValue | ExtendedValue, ChordAdded | undefined, ChordSuspended | undefined, Chords | undefined]

function parseObject (match: MatchType, noteNaming: NoteNamingType): ParsedChord {
  // match objects is 6 elements:
  // full string, root, quality or extended, added, suspended, overriding root
  // e.g. ["Cmaj7", "C", "maj7", "", "", ""]

  const root = rootLookups.get(noteNaming)?.get(match[1]) as Chords

  const foundExtended = chordExtendedsLookups.get(match[2] as ExtendedValue)
  let quality: ChordQuality
  let extended: ChordExtends | undefined

  if (foundExtended !== undefined) {
    quality = foundExtended.quality
    extended = foundExtended.extended
  } else { // normal quality without extended
    quality = chordQualitiesLookups.get(match[2] as ChordQualityValue) as ChordQuality
    extended = undefined
  }

  let added
  if (match[3] !== undefined) {
    added = chordAddedsLookups.get(match[3])
  }

  let suspended
  if (match[4] !== undefined) {
    suspended = chordSuspendedsLookups.get(match[4])
  }

  let overridingRoot
  if (match[5] !== undefined) {
    // substring(1) to cut off the slash, because it's e.g. "/F"
    overridingRoot = rootLookups.get(noteNaming)?.get(match[5].substring(1))
  }

  const parsedChord: ParsedChord = {
    root,
    quality
  }

  if (extended !== undefined) {
    parsedChord.extended = extended
  }

  if (added !== undefined) {
    parsedChord.added = added
  }

  if (suspended !== undefined) {
    parsedChord.suspended = suspended
  }

  if (overridingRoot !== undefined) {
    parsedChord.overridingRoot = overridingRoot
  }

  return parsedChord
}

export function parse (str: string, opts?: { naming?: NoteNamingType }): ParsedChord {
  opts ??= {}
  const noteNaming = opts.naming ?? 'English'

  const match: MatchType = str.match(chordRegexes[noteNaming].pattern) as MatchType

  return parseObject(match, noteNaming)
}
