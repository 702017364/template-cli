import { join as pathJoin } from 'path';
import { baseDirHash } from './dirHash';
import join from '@/utils/join';

const { dist, bin, cdn } = baseDirHash;

interface Option {
  bin: string;
  cdn: string;
}

// 子目录相对路径
const relative: Option = {
  bin: pathJoin(dist, bin),
  cdn: pathJoin(dist, cdn),
};

// 子目录绝对路径
const absolute: Option = {
  bin: join(relative.bin),
  cdn: join(relative.cdn),
};

// 发布目录下子目录
export { relative, absolute };