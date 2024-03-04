import { createTheme, ThemeOptions, PaletteOptions } from '@mui/material/styles'

/* 
	! This needs to abide by the following rules:
	* 1. The theme should have a light and dark mode.
	* 2. The theme should meet Section 508 and WCAG 2.1 AA accessibility standards.
*/

// Define the extended PaletteOptions type
interface ExtendedPaletteOptions extends PaletteOptions {
	html?: {
		backgroundColor: string
	}
}
// Define typography options
const typography: ThemeOptions['typography'] = {
	fontFamily: 'Roboto, Arial, sans-serif',
	h1: {
		fontSize: '2.5rem',
		fontWeight: 500,
	},
	h2: {
		fontSize: '2rem',
		fontWeight: 400,
	},
	h3: {
		fontSize: '1.75rem',
		fontWeight: 400,
	},
	h4: {
		fontSize: '1.5rem',
		fontWeight: 400,
	},
	h5: {
		fontSize: '1.25rem',
		fontWeight: 400,
	},
	h6: {
		fontSize: '1rem',
		fontWeight: 400,
	},
	body1: {
		fontSize: '1rem',
		fontWeight: 400,
	},
	body2: {
		fontSize: '0.875rem',
		fontWeight: 400,
	},
	subtitle1: {
		fontSize: '1rem',
		fontWeight: 500,
	},
	subtitle2: {
		fontSize: '0.875rem',
		fontWeight: 500,
	},
	caption: {
		fontSize: '0.75rem',
		fontWeight: 400,
	},
	button: {
		fontSize: '0.875rem',
		fontWeight: 500,
		textTransform: 'none',
	},
}

// Define spacing options
const spacing = 4 // Default spacing unit in pixels

// Define breakpoints
const breakpoints = {
	values: {
		xs: 0,
		sm: 600,
		md: 960,
		lg: 1280,
		xl: 1920,
	},
}

// Create a theme
const createCustomTheme = (mode: 'light' | 'dark'): ThemeOptions => {
	const isDarkMode = mode === 'dark'

	// Define common palette colors based on the theme mode
	const commonPalette: ExtendedPaletteOptions = {
		primary: {
			main: isDarkMode ? '#90caf9' : '#1976d2',
		},
		secondary: {
			main: isDarkMode ? '#757575' : '#bdbdbd',
		},
		error: {
			main: isDarkMode ? '#d32f2f' : '#f44336',
		},
		warning: {
			main: isDarkMode ? '#ff9800' : '#ffcc80',
		},
		info: {
			main: isDarkMode ? '#64b5f6' : '#81d4fa',
		},
		success: {
			main: isDarkMode ? '#4caf50' : '#81c784',
		},
		text: {
			primary: isDarkMode ? '#fff' : '#000',
			secondary: isDarkMode ? '#c7c7c7' : '#666',
		},
		html: {
			backgroundColor: isDarkMode ? '#121212' : '#fff',
		},
	}

	return {
		palette: {
			mode,
			background: {
				default: isDarkMode ? '#121212' : '#fff',
				paper: isDarkMode ? '#1e1e1e' : '#fff',
			},
			...commonPalette,
		},
		typography,
		spacing,
		breakpoints,
		components: {},
		transitions: {},
	}
}

// Create light and dark themes
const lightTheme = createTheme(createCustomTheme('light'))
const darkTheme = createTheme(createCustomTheme('dark'))

export { lightTheme, darkTheme }
