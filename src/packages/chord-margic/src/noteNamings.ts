import { NoteNaming, NoteNamingType } from './types'

const English: NoteNaming = {
  A: ['A'],
  Bb: ['Bb', 'A#', 'Asharp', 'Bflat'],
  B: ['B'],
  C: ['C'],
  Db: ['Db', 'C#', 'Dflat', 'Csharp'],
  D: ['D'],
  Eb: ['Eb', 'D#', 'Eflat', 'Dsharp'],
  E: ['E'],
  F: ['F'],
  Gb: ['Gb', 'F#', 'Gflat', 'Fsharp'],
  G: ['G'],
  Ab: ['Ab', 'G#', 'Aflat', 'Gsharp']
}

const NorthernEuropean: NoteNaming = {
  A: ['A'],
  Bb: ['B', 'A#', 'Asharp'],
  B: ['H'],
  C: ['C'],
  Db: ['Db', 'C#', 'Dflat', 'Csharp'],
  D: ['D'],
  Eb: ['Eb', 'D#', 'Eflat', 'Dsharp'],
  E: ['E'],
  F: ['F'],
  Gb: ['Gb', 'F#', 'Gflat', 'Fsharp'],
  G: ['G'],
  Ab: ['Ab', 'G#', 'Aflat', 'Gsharp']
}

const SouthernEuropean: NoteNaming = {
  A: ['La'],
  Bb: ['Tib', 'La#'],
  B: ['Ti'],
  C: ['Do'],
  Db: ['Reb', 'Réb', 'Do#'],
  D: ['Re', 'Ré'],
  Eb: ['Mib', 'Re#'],
  E: ['Mi'],
  F: ['Fa'],
  Gb: ['Solb', 'Sob', 'Fa#'],
  G: ['Sol', 'So'],
  Ab: ['Lab', 'So#', 'Sol#']
}

export const noteNamings: Record<NoteNamingType, NoteNaming> = {
  English,
  NorthernEuropean,
  SouthernEuropean
}
