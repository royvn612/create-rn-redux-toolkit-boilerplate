export interface ThemeConfig {
  name: string;
  size?: string;
}

export const THEME_NAMES = {
  LIGHT: 'light',
};
export const THEME_SIZES = {
  NORMAL: 'NORMAL',
};
export const THEME_KEYS: {[key: string]: keyof ThemeConfig} = {
  NAME: 'name',
};
