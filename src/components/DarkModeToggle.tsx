import { useEffect, useMemo, useState } from 'react';

import {
  ComputerDesktopIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';

import {
  setTheme,
  getStoredTheme,
  isDarkSystemTheme,
  DARK_THEME_CLASSNAME,
  LIGHT_THEME_CLASSNAME,
  SYSTEM_THEME_CLASSNAME,
} from '~/core/theming';

import IconButton from '~/core/ui/IconButton';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/core/ui/Select';

import Trans from '~/core/ui/Trans';

const DarkModeToggle = () => {
  const defaultTheme = useMemo(getStoredTheme, []);
  const [currentTheme, setCurrentTheme] = useState<string>(defaultTheme);
  const isDarkTheme = currentTheme === DARK_THEME_CLASSNAME;
  const isSystemTheme = currentTheme === SYSTEM_THEME_CLASSNAME;

  const Icon = useMemo(() => {
    const shouldUseSystemDarkTheme = isSystemTheme && isDarkSystemTheme();

    if (isDarkTheme || shouldUseSystemDarkTheme) {
      return <MoonIcon className={'h-4'} />;
    }

    return <SunIcon className={'h-4'} />;
  }, [isSystemTheme, isDarkTheme]);

  useEffect(() => {
    setTheme(currentTheme);
  }, [currentTheme]);

  return (
    <Select value={currentTheme} onValueChange={setCurrentTheme}>
      <SelectTrigger asChild>
        <IconButton
          data-cy={'dark-mode-toggle'}
          className={
            'flex items-center !rounded-full border-transparent transition-shadow' +
            ' !bg-transparent hover:shadow-xl dark:border-transparent' +
            ' dark:shadow-primary-500/50'
          }
        >
          <span hidden>
            <SelectValue />
          </span>

          {Icon}
        </IconButton>
      </SelectTrigger>

      <SelectContent position={'popper'} sideOffset={5}>
        <SelectItem
          data-cy={'light-theme-button'}
          value={LIGHT_THEME_CLASSNAME}
        >
          <span className={'flex items-center space-x-2.5'}>
            <SunIcon className={'h-4'} />

            <span>
              <Trans i18nKey={'common:lightTheme'} />
            </span>
          </span>
        </SelectItem>

        <SelectItem data-cy={'dark-theme-button'} value={DARK_THEME_CLASSNAME}>
          <span className={'flex items-center space-x-2.5'}>
            <MoonIcon className={'h-4'} />

            <span>
              <Trans i18nKey={'common:darkTheme'} />
            </span>
          </span>
        </SelectItem>

        <SelectItem
          data-cy={'system-theme-button'}
          value={SYSTEM_THEME_CLASSNAME}
        >
          <span className={'flex items-center space-x-2.5'}>
            <ComputerDesktopIcon className={'h-4'} />

            <span>
              <Trans i18nKey={'common:systemTheme'} />
            </span>
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DarkModeToggle;
