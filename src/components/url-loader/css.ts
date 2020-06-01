import loader from 'css-loader';
import join from '@/utils/join';
import { baseDirHash } from '@/options/dirHash';

interface Meta {
  ast?: object;
}

type AsyncMessage = null | Error;

type AsyncCalback = (
  error: AsyncMessage,
  chuck: string,
) => void;

type AsyncMethod = () => AsyncCalback;

//使用 css-loader 将 css 代码转换为 js 代码，用于处理图片
export default class {
  async!: AsyncMethod;
  resourcePath: string = join(baseDirHash.assets);

  constructor(content: string, callback: AsyncCalback, map?: string | object, meta?: Meta) {
    this.async = () => {
      return callback;
    }
    loader.bind(this)(content, map, meta);
  }
}