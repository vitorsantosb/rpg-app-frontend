import { ActionIcon, Tooltip, type ActionIconProps, type TooltipProps, useMantineColorScheme } from '@mantine/core';
import { useMemo } from 'react';
import { RiSunLine, RiMoonLine } from 'react-icons/ri';

type ThemeToggleProps = {
  withTooltip?: boolean;
  tooltipPosition?: TooltipProps['position'];
  labels?: {
    light: string;
    dark: string;
  };
} & Omit<ActionIconProps, 'onClick'>;

function ThemeToggle({
  withTooltip = true,
  tooltipPosition = 'right',
  labels = {
    light: 'Usar tema claro',
    dark: 'Usar tema escuro',
  },
  radius = 'xl',
  size = 'lg',
  variant = 'light',
  ...actionIconProps
}: ThemeToggleProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const config = useMemo(
    () => ({
      color: colorScheme === 'dark' ? 'yellow.4' : 'brand.6',
      label: colorScheme === 'dark' ? labels.light : labels.dark,
      icon: colorScheme === 'dark' ? <RiSunLine size={20} /> : <RiMoonLine size={20} />,
    }),
    [colorScheme, labels.dark, labels.light],
  );

  const button = (
    <ActionIcon
      radius={radius}
      size={size}
      variant={variant}
      aria-label={config.label}
      color={config.color}
      onClick={() => toggleColorScheme()}
      {...actionIconProps}
    >
      {config.icon}
    </ActionIcon>
  );

  if (!withTooltip) {
    return button;
  }

  return (
    <Tooltip label={config.label} position={tooltipPosition} withArrow>
      {button}
    </Tooltip>
  );
}

export default ThemeToggle;

