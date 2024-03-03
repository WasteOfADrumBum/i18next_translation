import fs from 'fs'
import path from 'path'
import translations from '../src/i18n/locales/index' // Import your translation keys

const directoriesToCheck: string[] = [
	path.join(__dirname, '../src/components'),
	path.join(__dirname, '../src/features'),
]

describe('Translation Check', () => {
	directoriesToCheck.forEach((directory) => {
		it(`should check files in directory: ${directory}`, () => {
			const files: string[] = fs.readdirSync(directory)
			files.forEach((file) => {
				const filePath: string = path.join(directory, file)
				if (fs.statSync(filePath).isFile() && path.extname(filePath) === '.tsx') {
					const content: string = fs.readFileSync(filePath, 'utf-8')
					// Regular expression to match hardcoded strings
					const hardcodedStringMatches: RegExpMatchArray | null = content.match(/"[^"]*"|`[^`]*`/g)
					if (hardcodedStringMatches) {
						hardcodedStringMatches.forEach((match: string) => {
							// Check if the match is a translation key
							if (!isTranslationKey(match)) {
								throw new Error(`Hardcoded string found in file ${filePath}: ${match}`)
							}
						})
					}
				}
			})
		})
	})
})

function isTranslationKey(key: string): boolean {
	// Check if the key exists in the translations object
	return key.replace(/["`]/g, '') in translations.buttons || key.replace(/["`]/g, '') in translations.pages
}
