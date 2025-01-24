export type ChordAdded = 'Add9' | 'Add11' | 'Major6' | 'SixNine' | 'PowerChord'
export type ChordAddeds = Record<ChordAdded, string[]>

export type ChordExtends =
    'Major7'
    | 'Minor7'
    | 'Dominant7'
    | 'Diminished7'
    | 'Major9'
    | 'Major11'
    | 'Major13'
    | 'AugmentedDominant7'
    | 'AugmentedMajor7'
    | 'Minor9'

export type ChordExtendeds = Record<ChordExtends, [string, ExtendedValue[]]>
export type ExtendedValue =
    'maj7' | 'Maj7' | 'M7' | '+7' |
    'm7' | 'Min7' | 'min7' | 'minor7' | '-7' |
    '7' | 'dom7' | 'dominant7' |
    'dim7' | 'diminished7' |
    'maj9' | 'M9' | '9' |
    'maj11' | 'M11' | '11' |
    'maj13' | 'M13' | '13' |
    '7#5' | '7(#5]' |
    'maj7#5' | 'maj7(#5]' |
    'min9' | 'm9' | 'minor9'

export type ChordQuality = 'Major' | 'Minor' | 'Diminished' | 'Augmented'

export type ChordQualities = Record<ChordQuality, ChordQualityValue[]>
export type ChordQualityValue =
    ''
    | 'major'
    | 'maj'
    | 'M'
    | 'm'
    | 'minor'
    | 'min'
    | 'aug'
    | 'augmented'
    | '+'
    | 'dim'
    | 'diminished'

export interface ChordRegex {
    regexString: string
    regexStringWithParens: string
    pattern: RegExp
    patternWithParens: RegExp
}

export type Chords =
    'A'
    | 'A#'
    | 'Bb'
    | 'B'
    | 'C'
    | 'C#'
    | 'Db'
    | 'D'
    | 'D#'
    | 'Eb'
    | 'E'
    | 'F'
    | 'F#'
    | 'Gb'
    | 'G'
    | 'G#'
    | 'Ab'

export type NoteNaming = Record<Chords, [string] | [string, string] | [string, string, string] | [string, string, string, string]>

export type NoteNamingType = 'English' | 'NorthernEuropean' | 'SouthernEuropean'

export type ChordSuspended = 'Sus2' | 'Sus4'

export type ChordSuspendeds = Record<ChordSuspended, string[]>

export interface ParsedChord {
    root: Chords
    quality: ChordQuality
    extended?: ChordExtends
    added?: ChordAdded
    suspended?: ChordSuspended
    overridingRoot?: Chords
}
