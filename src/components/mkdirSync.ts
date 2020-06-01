import fs from 'fs';
import { join } from 'path';
import { SEP } from './re';

export default (src: string, path: string): string => {
  let cache = path;
  src.split(SEP).forEach((value) => {
    cache = join(cache, value);
    fs.existsSync(cache) || fs.mkdirSync(cache);
  });
  return cache;
};