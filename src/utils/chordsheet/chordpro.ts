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
        if (isTabLine(line)) {
            chordPro.splice(index, 1)
            continue
        }
        if (line.includes('[') && line.includes(']')) {
            const chords = line + ' '
            const lyrics = chordPro[index + 1]

            if (lyrics && lyrics.includes('[') && lyrics.includes(']')) {
                continue
            }

            chordPro[index] = mergeStrings(chords, lyrics)

            // remove lyrics line
            chordPro.splice(index + 1, 1)
        }
    }

    return chordPro.join('\r\n')
}

function mergeStrings(chords: string, lyrics: string): string {
    if (!lyrics) {
        return chords
    }

    if (isTabLine(lyrics)) {
        return chords
    }

    let shouldLog = false

    if (lyrics.includes('Iblalbal')) {
        shouldLog = true
    }

    const merged = []
    let diff = lyrics.length - chords.length

    if (shouldLog) console.log('~ chordpro.ts:46 ~ lyrics', lyrics);
    if (shouldLog) console.log('~ chordpro.ts:46 ~ diff', diff);

    let remember = 0
    for (const [index, char] of chords.split('').entries()) {
        if (shouldLog) console.log('~ chordpro.ts:51 ~ remember', remember);
        if (shouldLog) console.log('~ chordpro.ts:52 ~ index', index);
        if (shouldLog) console.log('~ chordpro.ts:53 ~ char', char);
        if (shouldLog) console.log('~ chordpro.ts:54 ~ lyrics', lyrics[index]);

        if (char === ' ') {
            if (remember > 0) {
                for (remember; remember > 0; remember--) {
                    if (shouldLog) console.log('~ chordpro.ts:60 ~ lyrics[index - remember]', lyrics[index - remember]);
                    if (shouldLog) console.log('~ chordpro.ts:61 ~ index - remember', index - remember);
                    merged.push(lyrics[index - remember])
                }
            }
            merged.push(lyrics[index])

        } else {
            merged.push(char)
            remember++
        }

        if (index === chords.length - 1) {
            for (let i = 0; i <= diff; i++) {
                if (shouldLog) console.log('~ chordpro.ts:71 ~ lyrics[index + i]', lyrics[index + i]);
                merged.push(lyrics[index + i])
            }
        }
    }

    return merged.join('')
}


function isTabLine(line: string) {
    if (line.toLowerCase().includes('b|') || line.toLowerCase().includes('e|') || line.toLowerCase().includes('a|') || line.toLowerCase().includes('d|') || line.toLowerCase().includes('g|')) {
        return true
    }
}
