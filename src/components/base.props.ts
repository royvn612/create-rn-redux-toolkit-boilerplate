export type SpacingValue = 'screen' | 'component' | number;
export type SizeVariants = 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive';

export interface SpacingProps {
  mt?: SpacingValue;
  ml?: SpacingValue;
  mr?: SpacingValue;
  mb?: SpacingValue;
  mx?: SpacingValue;
  my?: SpacingValue;
  ma?: SpacingValue;
  pt?: SpacingValue;
  pl?: SpacingValue;
  pr?: SpacingValue;
  pb?: SpacingValue;
  px?: SpacingValue;
  py?: SpacingValue;
  pa?: SpacingValue;
}

export interface BaseProps extends SpacingProps {}
