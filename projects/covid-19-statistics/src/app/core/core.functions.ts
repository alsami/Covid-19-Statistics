const themeContainerId = 'themeContainer';

import { LayoutThemeType } from '@covid19-statistics/core/models';

export function selectedTheme(): LayoutThemeType {
  const s = document.querySelector(`#${themeContainerId}`);
  return <LayoutThemeType>s.classList.value;
}

export function darkThemeSelected(theme: LayoutThemeType): boolean {
  return (
    theme &&
    (theme === LayoutThemeType.BlackDark ||
      theme === LayoutThemeType.PurpleGreenDark)
  );
}
