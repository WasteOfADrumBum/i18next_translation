export const useAddOpacityToHexColors = (colorsArray: string[], opacity: number): string[] => {
	return colorsArray.map((color) => {
		// ? 70% of 255 is 179. So, 70% compacity is B3 in hex

		const opacity = Math.round(255 * 0.7)
			.toString(16)
			.toUpperCase()

		// Return the color with the opacity value
		return color + opacity
	})
}
