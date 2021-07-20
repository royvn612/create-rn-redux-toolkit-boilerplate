declare module 'react-native-col' {
  export interface BaseComponentInf<Props> extends React.FunctionComponent<Props> {
    X: React.FunctionComponent<Props>;
  }

  export interface RowComponent<Props> extends BaseComponentInf<Props> {
    TL: BaseComponentInf<Props>;
    T: BaseComponentInf<Props>;
    TR: BaseComponentInf<Props>;
    L: BaseComponentInf<Props>;
    C: BaseComponentInf<Props>;
    R: BaseComponentInf<Props>;
    BL: BaseComponentInf<Props>;
    B: BaseComponentInf<Props>;
    BR: BaseComponentInf<Props>;
    LRT: BaseComponentInf<Props>;
    LR: BaseComponentInf<Props>;
    LRB: BaseComponentInf<Props>;
    RLT: BaseComponentInf<Props>;
    RL: BaseComponentInf<Props>;
    RLB: BaseComponentInf<Props>;
    TBL: BaseComponentInf<Props>;
    TBC: BaseComponentInf<Props>;
    TBR: BaseComponentInf<Props>;
  }
  export const Row: RowComponent;

  export interface ColComponent<Props> extends BaseComponentInf<Props> {
    TL: BaseComponentInf<Props>;
    T: BaseComponentInf<Props>;
    TR: BaseComponentInf<Props>;
    L: BaseComponentInf<Props>;
    C: BaseComponentInf<Props>;
    R: BaseComponentInf<Props>;
    BL: BaseComponentInf<Props>;
    B: BaseComponentInf<Props>;
    BR: BaseComponentInf<Props>;
    TBL: BaseComponentInf<Props>;
    TB: BaseComponentInf<Props>;
    TBR: BaseComponentInf<Props>;
    BTL: BaseComponentInf<Props>;
    BT: BaseComponentInf<Props>;
    BTR: BaseComponentInf<Props>;
    LRT: BaseComponentInf<Props>;
    LRC: BaseComponentInf<Props>;
    LRB: BaseComponentInf<Props>;
  }

  declare const Col: ColComponent;

  export default Col;
}
