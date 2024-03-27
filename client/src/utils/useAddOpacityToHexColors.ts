export const useAddOpacityToHexColors = (colorsArray: string[], opacity: number): string[] => {
	return colorsArray.map((color) => {
		// ? 70% of 255 is 179. So, 70% compacity is B3 in hex

		const alphaOpacity = Math.round(255 * opacity)
			.toString(16)
			.toUpperCase()

		// Return the color with the opacity value
		return color + alphaOpacity
	})
}
