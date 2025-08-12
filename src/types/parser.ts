export type TParser = NumberConstructor | StringConstructor | BooleanConstructor;

export type TInferParser<T extends TParser> = T extends NumberConstructor
  ? number
  : T extends BooleanConstructor
    ? boolean
    : string;
