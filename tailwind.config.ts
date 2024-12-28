import type { Config } from 'tailwindcss'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			sans: ['Fredoka', 'serif'],
		},
		extend: {
			colors: {
				foreground: '#120b04',
				background: '#bfb5aa',
				primary: '#a3573e',
			},
		},
	},

	plugins: [],
} satisfies Config
