// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    srcDir: 'src/',
    serverDir: 'server/',
    modules: ['@nuxt/ui', '@nuxt/fonts'],
    tailwindcss: {
        config: {
            content: ['src/**/*.vue', 'src/utils/chordchart.ts'],
            theme: {
                extend: {
                    fontFamily: {
                        mono: 'apercu mono pro, monospace',
                        chords: 'Montserrat, serif'
                    },
                }
            }
        }
    }
})
