// given a string and a note naming, return the structured version of it.

import { noteNamings } from './noteNamings'
import { chordQualities } from './chordQualities'
import { chordExtendeds } from './chordExtendeds'
import { chordAddeds } from './chordAddeds.js'
import { chordSuspendeds } from './chordSuspendeds'
import {
  ChordExtendeds, ChordExtends, ChordQuality,
  Chords, ExtendedValue,
  NoteNamingType
} from './types'

export const rootLookups: Map<NoteNamingType, Map<string, Chords>> = new Map()

Object.keys(noteNamings).forEach(function (noteNaming: NoteNamingType) {
  rootLookups.set(noteNaming, addReverseLookups(noteNamings[noteNaming]))
})

export const chordQualitiesLookups = addReverseLookups(chordQualities)

export const chordExtendedsLookups = addReverseLookupsForExtendeds(chordExtendeds)

export const chordSuspendedsLookups = addReverseLookups(chordSuspendeds)

export const chordAddedsLookups = addReverseLookups(chordAddeds)

function addReverseLookups<T extends Record<string, string[]>> (
  dict: T
): Map<T[keyof T][number], keyof T> {
  return Object.entries(dict).reduce<Map<T[keyof T][number], keyof T>>(
    (reverseMap, [key, arr]) => {
      arr.forEach((element) => {
        reverseMap.set(element as T[keyof T][number], key as keyof T)
      })
      return reverseMap
    },
    new Map<T[keyof T][number], keyof T>()
  )
}

function addReverseLookupsForExtendeds (dict: ChordExtendeds): Map<ExtendedValue, {
  quality: ChordQuality
  extended: ChordExtends
}> {
  return Object.entries(dict).reduce<Map<ExtendedValue, {
    quality: ChordQuality
    extended: ChordExtends
  }>>((reverseMap, [key, [quality, extendedsArr]]) => {
    extendedsArr.forEach((element) => {
      reverseMap.set(element, { quality: quality as ChordQuality, extended: key as ChordExtends })
    })
    return reverseMap
  }, new Map<ExtendedValue, { quality: ChordQuality, extended: ChordExtends }>())
}
