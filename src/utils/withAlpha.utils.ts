export const withAlpha = (value: string | undefined, alpha: number) => {
  if (!value) {
    return `rgba(0, 0, 0, ${alpha})`;
  }

  if (value.startsWith('#')) {
    let hex = value.replace('#', '');
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('');
    }

    const bigint = Number.parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  if (value.startsWith('rgb')) {
    return value.replace(/rgba?\(([^)]+)\)/, (_match, colorValues) => {
      const [r, g, b] = colorValues.split(',').map((segment: string) => segment.trim());
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    });
  }

  return value;
};
