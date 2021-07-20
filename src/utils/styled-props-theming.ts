import {isFunction} from 'lodash';
import {appConfig} from '~/config';
import {THEME_KEYS, ThemeConfig} from '~/theme';

type ThemeValueResult<ValueResult> = string | ValueResult;
type ThemeValueFn<ValueResult> = (props: Record<string, any>) => ThemeValueResult<ValueResult>;
type ThemeValue<ValueResult> = ThemeValueFn<ValueResult> | ThemeValueResult<ValueResult>;

interface ThemeMap<ValueResult> {
  [key: string]: ThemeValue<ValueResult>;
}

interface Values<ValueResult> {
  [key: string]: ThemeMap<ValueResult>;
}

export function styledPropsTheming<P extends Record<string, any>>(props?: P) {
  const variants: <ValueResult>(prop: string, values: Values<ValueResult>, name?: keyof ThemeConfig) => any = (
    prop,
    values,
    name = THEME_KEYS.NAME,
  ) => {
    const currentSetting = appConfig.theme[name!]!;
    const propValue = props?.[prop];
    const currentValues = values[propValue]?.[currentSetting];
    if (!currentValues) {
      return {};
    }
    if (isFunction(currentValues) && props) {
      return currentValues(props);
    }
    return currentValues;
  };
  const themeBy: <ValueResult>(values: ThemeMap<ValueResult>, name?: keyof ThemeConfig) => any = (
    values,
    name = THEME_KEYS.NAME,
  ) => {
    const currentSetting = appConfig.theme[name!]!;
    const currentValues = values?.[currentSetting];
    if (isFunction(currentValues) && props) {
      return currentValues(props);
    }
    return currentValues;
  };
  return {variants, themeBy};
}
