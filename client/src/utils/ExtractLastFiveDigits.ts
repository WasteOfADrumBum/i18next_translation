// Example usage:
// const uuid = '550e8400-e29b-41d4-a716-446655440000'
// const lastFiveDigits = ExtractLastFiveDigits(uuid)
// console.log(lastFiveDigits) // Output: 40000

export const ExtractLastFiveDigits = (uuid: string): string => {
	// Extract the last 5 characters from the UUID string
	const lastFiveDigits = uuid.slice(-5)
	return lastFiveDigits.toUpperCase()
}
