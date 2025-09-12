import jsonata from './jsonata.d.ts';

export default function jsonataSync(str: string, options?: jsonata.JsonataOptions): {
  evaluate(input: any, bindings?: Record<string, any>): {s: 1, v: any};
};
