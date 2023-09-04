'use client';

import { useEffect } from 'react';
import isBrowser from '~/core/generic/is-browser';
import { loadSelectedTheme } from '~/core/theming';
import configuration from '~/configuration';

function ThemeSetter() {
  useEffect(() => {
    if (isBrowser() && configuration.enableThemeSwitcher) {
      loadSelectedTheme();
    }
  }, []);

  return null;
}

export default ThemeSetter;
