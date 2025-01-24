export function generateChordPro(chords: string) {
    const lines = chords.split('\r\n')

    let chordPro = lines.map(c =>
        c.replace(/\[/g, '{comment: ')
            .replace(/]/g, '}')
            // todo - place <b> in correct position
            .replace(/<b>/g, '[')
            .replace(/<\/b>/g, ']')
            .replace('<div>', '')
            .replace('</div>', '')
    )

    for (const [index, line] of chordPro.entries()) {
        if (line.includes('[') && line.includes(']')) {
            const chords = line
            const lyrics = chordPro[index + 1]

            chordPro[index] = mergeStrings(chords, lyrics)

            // remove lyrics line
            chordPro.splice(index + 1, 1)
        }
    }

    return chordPro.join('\r\n')
}

function mergeStrings(chords: string, lyrics: string): string {
    const merged = []
    let diff = lyrics.length - chords.length

    let remember = 0
    for (const [index, char] of chords.split('').entries()) {
        if (char === ' ') {
            for (remember; remember > 0; remember--) {
                merged.push(lyrics[index - remember])
            }
            merged.push(lyrics[index])
        } else {
            merged.push(char)
            remember++
        }

        if (index === chords.length - 1) {
            for (let i = -3; i <= diff; i++) {
                merged.push(lyrics[index + i])
            }
        }
    }

    return merged.join('')
}
