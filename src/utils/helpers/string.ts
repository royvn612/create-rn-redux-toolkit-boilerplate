export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function camelCase(str: string): string {
  return (str.slice(0, 1).toLowerCase() + str.slice(1))
    .replace(/([-_ ]){1,}/g, ' ')
    .split(/[-_ ]/)
    .reduce((cur, acc) => cur + acc[0].toUpperCase() + acc.substring(1));
}

export function snakeCase(str: string) {
  if (!str) {
    return '';
  }
  return str[0].toLowerCase() + str.slice(1, str.length).replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

export function getShortName(fullname?: string) {
  if (!fullname) {
    return '';
  }
  const nameContainer = fullname.split(' ');
  const firstName = nameContainer[0];
  const lengthName = nameContainer.length;
  let lastName = '';
  let shortName = firstName[0];
  if (lengthName > 1) {
    lastName = nameContainer[lengthName - 1];
    shortName += lastName[0];
  }
  return (shortName && shortName.toUpperCase()) || '';
}
