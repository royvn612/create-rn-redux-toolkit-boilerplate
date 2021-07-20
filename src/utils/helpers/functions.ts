import {constant, findKey, forEach, get, has, isArray, isPlainObject, isString, set, times} from 'lodash';
import moment from 'moment';
import {snakeCase} from '~/utils/helpers/string';
import {CalendarDataProps} from '~/components/shared/CalendarFigure';
import {color} from '~/theme';
import {MarkedDates} from '~/components/elements/calendar/calendar.props';
import {CALENDAR_DATE_FORMAT} from '~/utils/helpers/date-time';
import {UserSchema} from '~/redux/users/types';

export function isDataExpired(lastRequest: number = 0, validIn: number) {
  return lastRequest + validIn < Date.now() / 1000;
}

export function snakeCaseObj(obj: Record<string, any>, removeWhitespace = true) {
  if (!isPlainObject(obj)) {
    return obj;
  }
  const res: Record<string, any> = {};
  Object.keys(obj).forEach(property => {
    let value = obj[property];
    if (isArray(value)) {
      value = value.map(item => snakeCaseObj(item));
    } else if (isPlainObject(value)) {
      value = snakeCaseObj(value);
    }
    if (removeWhitespace) {
      if (isString(value)) {
        value = value.replace(/\\t$/, '').trim();
      }
    }
    res[snakeCase(property)] = value;
  });

  return res;
}

export function parseFormDataToObj(formData: FormData) {
  const object: Record<string, any> = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of formData.entries()) {
    if (!(value instanceof File)) {
      object[key] = value;
    }
  }
  return object;
}

export function serializeQueryString(obj: Record<string, any>, {encode = true, snakeKey = false} = {}) {
  if (!obj) {
    return '';
  }
  return `?${Object.keys(obj)
    .reduce((a, k) => {
      if (Array.isArray(obj[k]) && obj[k].length > 0) {
        obj[k].forEach((val: any) => {
          const key = snakeKey ? snakeCase(k) : k;
          let value = val;
          if (isString(value)) {
            value = value.replace(/\\t$/, '').trim();
          }
          value = encode ? encodeURIComponent(value) : value;

          // @ts-ignore
          a.push(`${key}[]=${value}`);
        });
      } else if (obj[k] !== null && obj[k] !== undefined) {
        const key = snakeKey ? snakeCase(k) : k;
        let value = obj[k];
        if (isString(value)) {
          value = value.replace(/\\t$/, '').trim();
        }
        value = encode ? encodeURIComponent(value) : value;
        // @ts-ignore
        a.push(`${key}=${value}`);
      }
      return a;
    }, [])
    .join('&')}`;
}

export function findValuePath(obj: object, needle = 'default'): string[] {
  const matchKey = findKey(obj, v => v === needle);
  if (matchKey) {
    return [matchKey];
  }
  const res: string[] = [];
  forEach(obj, (v, k) => {
    if (typeof v === 'object') {
      const valuePath = findValuePath(v, needle);
      if (valuePath.length) {
        res.push(...(isArray(valuePath) ? valuePath : [valuePath]), k);
      }
    }
  });
  return res;
}

export const getCalendarFigureColorMap = (data: CalendarDataProps) => {
  const res: string[] = [];
  forEach(data, item => {
    const chunk = times(item.amount || 0, constant(item.color));
    res.push(...chunk);
  });

  return res;
};

export const getCalendarIsTakenMap = (data: CalendarDataProps): number[] => {
  const res: number[] = [];
  forEach(data, item => {
    if (item.isTaken !== undefined) {
      const chunk = times(item.amount || 0, constant(item.isTaken ? 1 : 0));
      res.push(...chunk);
    }
  });

  return res;
};

export const getMarkedDates = (takenMap: number[], startDate: string) => {
  const today = moment.now();
  const dates: MarkedDates = {
    [startDate]: {selected: true},
  };
  const selectedDate = moment(startDate).endOf('days');
  takenMap.shift(); // Get rid of first element
  takenMap.forEach((i, idx) => {
    const nextDate = selectedDate.add(1, 'd');
    if (nextDate.isBefore(today)) {
      dates[nextDate.format(CALENDAR_DATE_FORMAT)] = {
        selected: true,
        selectedColor: i ? color.selectedLabel : color.disabledBackground,
      };
    }
  });
  return dates;
};

export function isSvgUri(uri: string) {
  return uri.slice(-3).toLowerCase() === 'svg';
}

export function ensureSafeChaining(object: Object, path: string | string[], defaultValue?: any) {
  // Ensure the path is existed first
  if (!has(object, path)) {
    set(object, path, undefined);
  }
  // Set default value in case user wants to. (defaultValue !== undefined)
  if (defaultValue !== undefined && get(object, path) === undefined) {
    set(object, path, defaultValue);
  }
}

export function firstObjValue(obj: Record<any, any>) {
  // eslint-disable-next-line no-restricted-syntax
  for (const k in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(k)) {
      return obj[k];
    }
  }
  return undefined;
}

export function getUserDisplayName(user: UserSchema) {
  return user.preferredName || user.name || user.email;
}
