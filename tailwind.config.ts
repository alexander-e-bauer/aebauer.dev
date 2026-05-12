// tailwind.config.ts
import type { Config } from 'tailwindcss';
// @ts-ignore
import animate from 'tailwindcss-animate';

const config: Config = {

  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],

  theme: {
    container: {
      center: true,
      padding: '1.25rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
        boxShadow: {
        soft: '0 1px 2px -1px hsla(var(--foreground)/0.12), 0 3px 6px -1px hsla(var(--foreground)/0.15)',
            },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        // Keep while migrating legacy tokens
        bgLegacy: {
          root: 'var(--color-bg-root)',
          elev1: 'var(--color-bg-elev-1)',
          elev2: 'var(--color-bg-elev-2)',
          glass: 'var(--color-bg-glass)',
          glassStrong: 'var(--color-bg-glass-strong)',
        },
        status: {
          positive: 'hsl(var(--positive))',
          warning: 'hsl(var(--warning))',
          danger: 'hsl(var(--destructive))',
          info: 'hsl(var(--accent))',
        },
      },

      backgroundImage: {
        'radial-app':
          'radial-gradient(circle at 25% 15%, hsl(var(--app-radial-start)) 0%, hsl(var(--app-radial-end)) 60%)',
      },

      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bannerEnter: {
          '0%': { opacity: '0', transform: 'translateY(-6px) scale(.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        bannerExit: {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-4px) scale(.97)' },
        },
      },
      animation: {
        'fade-in': 'fade-in .4s ease',
        bannerEnter: 'bannerEnter 260ms cubic-bezier(.16,.84,.44,1)',
        bannerExit: 'bannerExit 240ms ease forwards',
      },

      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'calc(var(--radius) + 4px)',
        md: 'var(--radius)',
        sm: 'calc(var(--radius) - 4px)',
      },


    },
  },

  plugins: [animate],
};

export default config;