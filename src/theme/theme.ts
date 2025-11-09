import type { MantineThemeOverride } from '@mantine/core';

const baseFont =
  'Inter, "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif';

const theme: MantineThemeOverride = {
  defaultColorScheme: "auto",
  colors: {
    brand: [
      '#eef2ff',
      '#dce4ff',
      '#bac7ff',
      '#94a9ff',
      '#6e8aff',
      '#4e6ffc',
      '#3658e5',
      '#2a46c2',
      '#1f369c',
      '#162777'
    ],
    midnight: [
      '#f4f7fb',
      '#e8edf5',
      '#d5dceb',
      '#b3c2d9',
      '#8da6c7',
      '#6a89b5',
      '#4d6e9e',
      '#39577f',
      '#2a4160',
      '#1c2b3f'
    ],
    aurora: [
      '#f7fefb',
      '#dcfbf0',
      '#b9f5e3',
      '#93eccf',
      '#6adfb7',
      '#47d09f',
      '#2cb586',
      '#1f916a',
      '#176f51',
      '#0f4e39'
    ]
  },
  primaryColor: 'brand',
  primaryShade: {
    light: 5,
    dark: 4
  },
  white: '#ffffff',
  black: '#010409',
  defaultGradient: {
    from: 'brand',
    to: 'aurora',
    deg: 135
  },
  fontFamily: baseFont,
  fontFamilyMonospace:
    'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  headings: {
    fontFamily: baseFont,
    fontWeight: '600',
    sizes: {
      h1: { fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: '1.1', fontWeight: '700' },
      h2: { fontSize: 'clamp(2rem, 4vw, 2.75rem)', lineHeight: '1.2', fontWeight: '700' },
      h3: { fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', lineHeight: '1.25', fontWeight: '600' },
      h4: { fontSize: 'clamp(1.5rem, 2.5vw, 1.85rem)', lineHeight: '1.3', fontWeight: '600' },
      h5: { fontSize: '1.25rem', lineHeight: '1.35', fontWeight: '600' },
      h6: { fontSize: '1.0625rem', lineHeight: '1.4', fontWeight: '600' }
    }
  },
  radius: {
    xs: '0.35rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1.25rem',
    xl: '1.75rem'
  },
  defaultRadius: 'md',
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  shadows: {
    xs: '0 4px 12px rgba(15, 23, 42, 0.08)',
    sm: '0 8px 24px rgba(15, 23, 42, 0.1)',
    md: '0 16px 45px rgba(12, 18, 34, 0.22)',
    lg: '0 30px 60px rgba(9, 14, 28, 0.35)'
  },
  other: {
    surfaces: {
      light: '#f5f7fb',
      dark: '#090f1c'
    },
    panels: {
      light: '#ffffff',
      dark: 'rgba(9, 19, 35, 0.85)'
    },
    borders: {
      light: 'rgba(9, 19, 35, 0.08)',
      dark: 'rgba(255, 255, 255, 0.08)'
    }
  },
  globalStyles: (theme) => {
    const surface =
      theme.colorScheme === 'dark'
        ? theme.other?.surfaces?.dark ?? '#090f1c'
        : theme.other?.surfaces?.light ?? '#f5f7fb';

    const textColor =
      theme.colorScheme === 'dark' ? theme.colors.midnight?.[0] ?? '#f8fafc' : theme.black;

    return {
      '*, *::before, *::after': {
        boxSizing: 'border-box'
      },
      body: {
        margin: 0,
        padding: 0,
        fontFamily: theme.fontFamily,
        backgroundColor: surface,
        color: textColor,
        transition: 'background-color 150ms ease, color 150ms ease',
        WebkitFontSmoothing: 'antialiased'
      },
      '#root': {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }
    };
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
        size: 'md'
      },
      styles: (theme) => ({
        root: {
          fontWeight: 600,
          boxShadow: theme.shadows.xs,
          transition: 'transform 120ms ease, box-shadow 150ms ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: theme.shadows.sm
          }
        }
      })
    },
    Card: {
      defaultProps: {
        padding: 'lg',
        radius: 'lg',
        shadow: 'sm'
      },
      styles: (theme) => ({
        root: {
          border: `1px solid ${
            theme.colorScheme === 'dark'
              ? theme.other?.borders?.dark ?? 'rgba(255,255,255,0.08)'
              : theme.other?.borders?.light ?? 'rgba(15,23,42,0.08)'
          }`,
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.other?.panels?.dark ?? 'rgba(9,19,35,0.9)'
              : theme.other?.panels?.light ?? '#ffffff',
          backdropFilter: 'blur(18px)'
        }
      })
    },
    NavLink: {
      defaultProps: {
        variant: 'light'
      },
      styles: (theme) => ({
        root: {
          borderRadius: theme.radius.md,
          border: `1px solid ${
            theme.colorScheme === 'dark'
              ? theme.other?.borders?.dark ?? 'rgba(255,255,255,0.08)'
              : theme.other?.borders?.light ?? 'rgba(15,23,42,0.08)'
          }`
        }
      })
    }
  }
};

export default theme;