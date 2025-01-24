export function generateChordChart(chordPro: string) {
    const sections = getSections(chordPro)

    let sectionsHtml = ''
    for (const section of sections) {
        sectionsHtml += `<div class="section">`
        sectionsHtml += getSectionHeader(section.header)
        sectionsHtml += getSectionContent(section.content)
        sectionsHtml += `</div>`
    }
    return sectionsHtml
}

function getSectionHeader(text: string) {
    // remove numbers and trim
    const style = text.replace(/\d+/g, '').trim().toLowerCase().replace(/\s/g, '-')
    return `<div class="section-header ${style}">${text}<\/div>`
}

function getSectionContent(lines: string[]) {
    return lines.map(parseLyrics).join('')
}

function parseLyrics(input: string): string {
    const regex = /([^\[]*)\[([A-Za-z#0-9]+)\]([^\s\[]*)|(\S+)/g;
    let match;
    let output = '';

    while ((match = regex.exec(input)) !== null) {
        const beforeChord = match[1] || ''; // Text before the chord
        const chord = match[2] || '';       // Chord inside brackets
        const afterChord = match[3] || ''; // Text after the chord
        const plainWord = match[4] || '';  // Plain word without chords

        // Handle embedded chords like "He[C]llo"
        if (chord) {
            const splittedWords = beforeChord.split(' ');
            for (let i = 0; i < splittedWords.length - 1; i++) {
                output += `<div class="pair"><p class="chord"></p><p class="lyrics">${splittedWords[i]} </p></div>`;
            }

            const fullWord = splittedWords.at(-1) + afterChord; // Reconstruct the full word
            output += `<div class="pair"><p class="chord">${chord}</p><p class="lyrics">${fullWord} </p></div>`;
        } else if (plainWord) {
            // Handle plain words (no chord)
            output += `<div class="pair"><p class="chord"></p><p class="lyrics">${plainWord} </p></div>`;
        }
    }

    return `<div class="line">${output}</div>`;
}

function getSections(chordPro: string) {
    const sections = []
    const lines = chordPro.split('\r\n')
    let currentSection = {
        header: '',
        content: [] as string[]
    }
    for (const line of lines) {
        if (line.includes('{comment:')) {
            if (currentSection.header) {
                sections.push(currentSection)
            }
            currentSection = {
                header: line.replace(/{comment: (.*)}/g, '$1'),
                content: []
            }
            continue
        }

        if (line.length > 0) {
            currentSection.content.push(line)
        }
    }

    sections.push(currentSection)

    return sections
}
