const overlayColorMap = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#32A852',
  '#FF7119',
  '#991ee6',
  '#2f62c2',
  '#b0b0b0',
  '#b0afbd',
  '#fbb744',
  '#f4786c',
  '#77b2b5',
  '#8680c4',
  '#6387c8',
  '#16b2ad',
];

export const getColorByChar = (char?: string) => {
  if (!char) {
    return '#36A2EB';
  }
  const idx = char.charCodeAt(0) % overlayColorMap.length;
  return overlayColorMap[idx];
};

const backgroundColors = ['#F1EEE4', '#D6E2E7', '#939AA4', '#647576', '#FBA928', '#E3C597'];
export const getBgColorByIndex = (index: number) => {
  const colorIdx = index % backgroundColors.length;
  return backgroundColors[colorIdx];
};

const statColors = ['#457672', '#F8DCC6', '#B2BFB3'];
export const getStatColorByIndex = (index: number) => {
  const colorIdx = index % statColors.length;
  return statColors[colorIdx];
};
