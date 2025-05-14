	import type { Config } from "tailwindcss";
	import plugin from "tailwindcss/plugin";

	export default {
		darkMode: ["class"],
		content: [
			"./pages/**/*.{ts,tsx}",
			"./components/**/*.{ts,tsx}",
			"./app/**/*.{ts,tsx}",
			"./src/**/*.{ts,tsx}",
		],
		prefix: "",
		theme: {
			container: {
				center: true,
				padding: '2rem',
				screens: {
					'2xl': '1400px'
				}
			},
			extend: {
				colors: {
					border: 'hsl(var(--border))',
					input: 'hsl(var(--input))',
					ring: 'hsl(var(--ring))',
					background: 'hsl(var(--background))',
					foreground: 'hsl(var(--foreground))',
					primary: {
						DEFAULT: 'hsl(var(--primary))',
						foreground: 'hsl(var(--primary-foreground))'
					},
					secondary: {
						DEFAULT: 'hsl(var(--secondary))',
						foreground: 'hsl(var(--secondary-foreground))'
					},
					destructive: {
						DEFAULT: 'hsl(var(--destructive))',
						foreground: 'hsl(var(--destructive-foreground))'
					},
					muted: {
						DEFAULT: 'hsl(var(--muted))',
						foreground: 'hsl(var(--muted-foreground))'
					},
					accent: {
						DEFAULT: 'hsl(var(--accent))',
						foreground: 'hsl(var(--accent-foreground))'
					},
					popover: {
						DEFAULT: 'hsl(var(--popover))',
						foreground: 'hsl(var(--popover-foreground))'
					},
					card: {
						DEFAULT: 'hsl(var(--card))',
						foreground: 'hsl(var(--card-foreground))'
					},
					os: {
						primary: '#0078D7',
						secondary: '#25a0e6',
						accent: '#00C6CF',
						background: '#101316',
						foreground: '#f8f9fa',
						windowBg: 'rgba(30, 39, 46, 0.75)',
						desktopBg: 'rgba(16, 19, 22, 1)',
					},
					sidebar: {
						DEFAULT: 'hsl(var(--sidebar-background))',
						foreground: 'hsl(var(--sidebar-foreground))',
						primary: 'hsl(var(--sidebar-primary))',
						'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
						accent: 'hsl(var(--sidebar-accent))',
						'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
						border: 'hsl(var(--sidebar-border))',
						ring: 'hsl(var(--sidebar-ring))'
					}
				},
				borderRadius: {
					lg: 'var(--radius)',
					md: 'calc(var(--radius) - 2px)',
					sm: 'calc(var(--radius) - 4px)'
				},
				keyframes: {
					'accordion-down': {
						from: { height: '0' },
						to: { height: 'var(--radix-accordion-content-height)' }
					},
					'accordion-up': {
						from: { height: 'var(--radix-accordion-content-height)' },
						to: { height: '0' }
					},
					'boot-sequence': {
						'0%': { opacity: '0' },
						'20%': { opacity: '1' },
						'80%': { opacity: '1' },
						'100%': { opacity: '0' }
					},
					'fade-in': {
						'0%': { opacity: '0' },
						'100%': { opacity: '1' }
					},
					'fade-out': {
						'0%': { opacity: '1' },
						'100%': { opacity: '0' }
					},
					'slide-up': {
						'0%': { transform: 'translateY(10px)', opacity: '0' },
						'100%': { transform: 'translateY(0)', opacity: '1' }
					},
					'pulse-slow': {
						'0%, 100%': { opacity: '1' },
						'50%': { opacity: '0.5' }
					},
					'scale-in': {
						'0%': { transform: 'scale(0.95)', opacity: '0' },
						'100%': { transform: 'scale(1)', opacity: '1' }
					},
				},
				animation: {
					'accordion-down': 'accordion-down 0.2s ease-out',
					'accordion-up': 'accordion-up 0.2s ease-out',
					'boot-sequence': 'boot-sequence 3s ease-in-out forwards',
					'fade-in': 'fade-in 0.3s ease-out',
					'fade-out': 'fade-out 0.3s ease-out',
					'slide-up': 'slide-up 0.5s ease-out',
					'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
					'scale-in': 'scale-in 0.2s ease-out',
				},
				backgroundImage: {
					'os-gradient': 'linear-gradient(145deg, #0f172a, #1e293b)',
					'boot-gradient': 'radial-gradient(circle, #164B75 0%, #0C2438 100%)',
				},
				transitionDelay: {
					'200': '200ms',
					'400': '400ms',
				},
			}
		},
		plugins: [
			require("tailwindcss-animate"),
			// Add custom scrollbar plugin
			plugin(function({ addUtilities }) {
				const scrollbarUtilities = {
					'.scrollbar-thin': {
						'scrollbarWidth': 'thin',
						'overflowY': 'auto',
						'WebkitOverflowScrolling': 'touch',
						'&::-webkit-scrollbar': {
							width: '6px',
							height: '6px',
						},
						'&::-webkit-scrollbar-track': {
							background: 'transparent',
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: 'rgba(255, 255, 255, 0.15)',
							borderRadius: '20px',
						},
						'&::-webkit-scrollbar-thumb:hover': {
							backgroundColor: 'rgba(255, 255, 255, 0.25)',
						},
					},
					// New dark theme scrollbar styling
					'.scrollbar-dark': {
						'scrollbarWidth': 'thin',
						'scrollbarColor': 'rgba(128, 90, 213, 0.5) rgba(15, 15, 15, 0.6)',
						'&::-webkit-scrollbar': {
							width: '8px',
							height: '8px',
						},
						'&::-webkit-scrollbar-track': {
							background: 'rgba(15, 15, 15, 0.6)',
							borderRadius: '10px',
						},
						'&::-webkit-scrollbar-thumb': {
							background: 'linear-gradient(to bottom, rgba(128, 90, 213, 0.5), rgba(79, 70, 229, 0.5))',
							borderRadius: '10px',
							border: '1px solid rgba(128, 90, 213, 0.3)',
						},
						'&::-webkit-scrollbar-thumb:hover': {
							background: 'linear-gradient(to bottom, rgba(168, 130, 253, 0.6), rgba(99, 90, 249, 0.6))',
						},
						'&::-webkit-scrollbar-corner': {
							background: 'rgba(15, 15, 15, 0.6)',
						},
					},
				};

				addUtilities(scrollbarUtilities);
			}),
		],
	} satisfies Config;