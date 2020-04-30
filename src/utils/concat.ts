import { join } from 'path';
import { SEP } from './re';

const PREFIX_SYMBOL = '!';

type Union = string | string[];

interface Option {
  [key: string]: Union;
}

export type Unions = Union | Option;

function concat(src: string, path: string): string;
function concat(src: string[], path: string): string[];
function concat<T = Option>(src: T, path: string): T;
function concat(src: any, path: string): any {
  if(typeof src === 'string') {
    let cache: string;
    if(src.slice(0, 1) === PREFIX_SYMBOL) {
      cache = src.slice(1);
      cache = PREFIX_SYMBOL + join(path, cache);
    } else {
      cache = join(path, src);
    }
    return cache.replace(SEP, '/');
  } else if(Array.isArray(src)) {
    return src.map((value) => concat(value, path));
  } else {
    const cache: Option = {};
    for(const key in src) {
      const a = concat(src[key], path);
      cache[key] = concat(src[key], path);
    }
    return cache;
  }
};

// 组合路径
export default concat;