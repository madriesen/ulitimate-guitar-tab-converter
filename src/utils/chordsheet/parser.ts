import {parse, transpose, prettyPrint} from "~/packages/chord-margic/src";
import type {Chords} from "~/packages/chord-margic/src/types";

export function parseHtml(text: string) {
    const div = document.createElement('div');
    div.innerHTML = text;

    const [store] = div.getElementsByClassName('js-store');
    const storeJson = store.getAttribute('data-content');

    return JSON.parse(storeJson!);
}

export function parseChords(chords: string) {
    let transChords = chords.split(/\[ch\]|\[\/ch\]/g);
    let regex = [];

    for (let i = 1; i <= transChords.length; i += 2) {
        const chord = transChords[i];

        if (chord) {
            try {
                let tones: Chords[] = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

                const parsedChord = parse(chord);
                const transChord = transpose(parsedChord, 0);

                const prettyChord = prettyPrint(parsedChord, {naming: tones});
                const prettyTransChord = prettyPrint(transChord, {naming: tones});

                const chordsDiff = prettyTransChord.length - prettyChord.length;
                const chordsDiffPos = Math.abs(chordsDiff);

                const replacer = chordsDiff >= 0 ? '-'.repeat(chordsDiff) : ' '.repeat(chordsDiffPos);

                transChords[i] = `[ch]${prettyTransChord}[/ch]`;
                transChords[i] += replacer;

                if (chordsDiff >= 0) {
                    regex.push(replacer + ' '.repeat(chordsDiff));
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.info('failed to transpose', error);
            }
        }
    }

    regex = regex.filter(r => r.length > 1);
    regex = [...new Set(regex)];

    return transChords
        .join('')
        .replace(new RegExp(regex.join('|'), 'gm'), '')
        .replace(new RegExp('-+(\\n|\\r|\\S)', 'gm'), '$1')
        .replace(/\[\/ch\]\s\[ch\]/g, '[/ch]  [ch]')
        .replace(/\[\/ch\]\[ch\]/g, '[/ch] [ch]')
        .replace(/\[\/ch\](\w)/g, '[/ch] $1')
        .replace(/\[ch\]/g, '<b>')
        .replace(/\[\/ch\]/g, '</b>')
        .replace(/\[tab\]/g, '<div>')
        .replace(/\[\/tab\]/g, '</div>');
}
