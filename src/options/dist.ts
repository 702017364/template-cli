import { join as pathJoin } from 'path';
import { baseDirHash } from './dirHash';
import join from '@/utils/join';

const { dist, bin, cdn } = baseDirHash;

const relative = {
  bin: pathJoin(dist, bin),
  cdn: pathJoin(dist, cdn),
};

// 发布目录下子目录
export default {
  // 子目录相对路径
  relative,
  // 子目录绝对路径
  absolute: {
    bin: join(relative.bin),
    cdn: join(relative.cdn),
  },
};