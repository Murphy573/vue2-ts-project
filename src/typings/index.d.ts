declare namespace V2TS {
  type mystring = string;

  interface IV {
    key: string;
  }

  interface DuckFunction {
    (): void;
    a: () => void;
    b: string;
  }

  type Print = <T = number>(arg) => T;
}
