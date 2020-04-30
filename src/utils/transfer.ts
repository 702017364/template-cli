import join from './join';
import concat, { Unions } from './concat';

const transfer = <T extends Unions>(key: string, value: T) => {
  const cache = join(key);
  return concat(value, cache);
};

// 将所有的配置文件目录转换成绝对目录（对应于项目目录）
export default transfer;