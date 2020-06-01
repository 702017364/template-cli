import fs from 'fs';

type Cache = {
  [key in string]: Buffer;
};

// 返回一个获取资源的方法，重复路径指向的资源将调用缓存
export default () => {
  const cache = {} as Cache;
  return (path: string): Buffer => {
    if(path in cache) {
      return cache[path];
    } else {
      return cache[path] = fs.readFileSync(path);
    }
  };
};