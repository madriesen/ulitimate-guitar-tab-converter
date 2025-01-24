import { noteNamings } from './noteNamings'
import { chordAddeds } from './chordAddeds.js'
import { chordSuspendeds } from './chordSuspendeds'
import { chordQualities } from './chordQualities'
import { chordExtendeds } from './chordExtendeds'
import { ChordExtendeds, ChordQualities, ChordRegex, NoteNaming, NoteNamingType } from './types'

function initializeChordRegexes (): Record<NoteNamingType, ChordRegex> {
  const map: Record<string, ChordRegex> = {}

  Object.keys(noteNamings).forEach(function (noteNaming: NoteNamingType) {
    map[noteNaming] = initializeChordRegex(noteNamings[noteNaming])
  })

  return map
}

function initializeChordRegex (noteNaming: NoteNaming): ChordRegex {
  const regexString = createRegexString(noteNaming)
  const regexStringWithParens = createRegexStringWithParens(regexString)

  return {
    regexString,
    regexStringWithParens,
    pattern: new RegExp(regexString),
    patternWithParens: new RegExp(regexStringWithParens)
  }
}

function optional (pattern: string): string {
  return '(' + pattern + '?)'
}

function concatenateAllValues (map: Record<string, string[]>): string[] {
  let res: string[] = []
  Object.keys(map).forEach(function (key: keyof ChordQualities) {
    const value = map[key]
    if (value === undefined) {
      throw new Error('Value is undefined for key: ' + key)
    }
    res = res.concat(value)
  })
  return res
}

// extendeds are different; their values are an array of
// [type, names]
function concatenateAllValuesForExtendeds (map: ChordExtendeds): string[] {
  let res: string[] = []
  Object.keys(map).forEach((key: keyof ChordExtendeds) => {
    res = res.concat(map[key][1])
  })
  return res
}

function createRegexString (noteNaming: NoteNaming): string {
  return greedyDisjunction(concatenateAllValues(noteNaming), true) + // root note
      optional(greedyDisjunction(concatenateAllValues(chordQualities).concat(concatenateAllValuesForExtendeds(chordExtendeds)))) + // quality OR seventh
      optional(greedyDisjunction(concatenateAllValues(chordAddeds))) + // add
      optional(greedyDisjunction(concatenateAllValues(chordSuspendeds))) + // sus

      // overridden root note ("over")
      optional('(?:/' + greedyDisjunction(concatenateAllValues(noteNaming)) +
          ')')
}

function createRegexStringWithParens (regexString: string): string {
  return '[\\(\\[]' + regexString + '[\\)\\]]'
}

function quote (str: string): string {
  // stolen from http://stackoverflow.com/a/3614500/680742
  const regexpSpecialChars = /([[\]^$|()\\+*?{}=!])/gi

  return str.replace(regexpSpecialChars, '\\$1')
}

/**
 * Take an array of strings and make a greedy disjunction regex pattern out of it,
 * with the longest strings first, e.g. ["sus4","sus","sus2"] -->
 *
 * (sus4|sus2|sus)
 * @return
 * @param aliases
 * @param matchingGroup
 */
function greedyDisjunction (aliases: string[], matchingGroup?: boolean): string {
  aliases = aliases.slice() // copy

  // sort by longest string first
  aliases.sort(function (a, b) {
    const lenCompare = b.length - a.length
    if (lenCompare !== 0) {
      return lenCompare < 0 ? -1 : 1
    }
    // else sort by normal string comparison
    return a < b ? -1 : 1
  })

  let res = '('

  if (matchingGroup === undefined || !matchingGroup) {
    res += '?:' //  non-matching group
  }

  aliases.forEach(function (alias, i) {
    if (alias === '') {
      return // e.g. the "major" quality can be expressed as an empty string, so skip in the regex
    }
    if (i > 0) {
      res += '|'
    }
    res += quote(alias)
  })

  return res + ')'
}

export const chordRegexes = initializeChordRegexes()
