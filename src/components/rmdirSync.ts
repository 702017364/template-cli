import fs from 'fs';
import { join } from 'path';

// 删除目录
const rmdirSync = (src: string): void => {
  const stat = fs.statSync(src);
  if(stat.isDirectory()) {
    fs.readdirSync(src).forEach((file) => {
      const dir = join(src, file);
      rmdirSync(dir);
    });
    fs.rmdirSync(src);
  } else {
    fs.unlinkSync(src);
  }
};

export default rmdirSync;