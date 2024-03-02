import { createTheme, ThemeOptions } from '@mui/material/styles'

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
	const commonPalette = {
		primary: {
			main: isDarkMode ? '#90caf9' : '#1976d2',
		},
		secondary: {
			main: isDarkMode ? '#f48fb1' : '#dc004e',
		},
		error: {
			main: isDarkMode ? '#f44336' : '#f44336',
		},
		warning: {
			main: isDarkMode ? '#ff9800' : '#ff9800',
		},
		info: {
			main: isDarkMode ? '#2196f3' : '#2196f3',
		},
		success: {
			main: isDarkMode ? '#4caf50' : '#4caf50',
		},
		text: {
			primary: isDarkMode ? '#fff' : '#000',
			secondary: isDarkMode ? '#c7c7c7' : '#666',
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
		components: {}, // Need to include an empty 'components' object
		transitions: {}, // Need to include an empty 'transitions' object
	}
}

// Create light and dark themes
const lightTheme = createTheme(createCustomTheme('light'))
const darkTheme = createTheme(createCustomTheme('dark'))

export { lightTheme, darkTheme }
