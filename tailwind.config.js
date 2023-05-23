/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		container: {
			center: true
			// screens: {
			// 	sm: '640px',
			// 	md: '768px',
			// 	lg: '1024px',
			// 	xl: '1824px',
			// 	'2xl': '1824px'
			// }
		},
		extend: {
			colors: {
				'blue-gray': '#F1F5F9'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			fontFamily: {
				normal: 'SVN-Poppins-400',
				'poppins-bold': 'SVN-Poppins-500',
				'poppins-bolder': 'SVN-Poppins-600'
			}
		}
	},
	plugins: []
}
