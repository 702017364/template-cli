import fs from 'fs';
import { relative, parse } from 'path';
import loader from 'url-loader';
import { absolute } from '@/options/dist';
import { baseDirHash } from '@/options/dirHash';
import { config } from '@/options/config';
import join from '@/utils/join';
import { SEP } from '@/utils/re';
import transfer from '@/options/transfer';
import mkdirSync from '../mkdirSync';

export type Limit = string | number | boolean;
export type Mimetype = boolean | string;
export type Encoding = boolean | string;

export interface Query {
  limit?: Limit;
  mimetype?: Mimetype;
  encoding?: Encoding;
  [key: string]: any;
}

export interface Options extends Query {
  content: string | Buffer;
  resourcePath: string;
}

// 使用 url-loader 对图片进行处理
export default (option: Options) => {
  const outputPath = join(baseDirHash.dist, baseDirHash.assets);
  const publicPath = relative(absolute.bin, outputPath).replace(SEP, () => '/');
  return loader.bind({
    query: {
      limit: option.limit,
      mimetype: option.mimetype,
      encoding: option.encoding,
      esModule: false,
      outputPath,
      publicPath,
      useRelativePath: true,
      emitFile: true,
      name: config.assetsNameIsHash
        ? '[name]_[contenthash:6].[ext]'
        : `${baseDirHash.assets}_[name].[ext]`,
    },
    resourcePath: option.resourcePath,
    emitFile(outputPath: string, content: Buffer) {
      const { dir } = parse(relative(transfer, outputPath));
      mkdirSync(dir, transfer);
      fs.writeFileSync(outputPath, content);
    },
  })(option.content);
};