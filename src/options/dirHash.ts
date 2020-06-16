import { config } from './config';
import DirConfig from '@/types/DirConfig';
import transfer from '@/utils/transfer';

// 基本目录配置
export const baseDirHash: DirConfig = Object.assign({
  bin: 'bin',
  cdn: 'cdn',
  dist: 'dist',
  views: 'views',
  styles: 'styles',
  src: 'src_clone',
  static: 'static',
  assets: 'assets',
}, config.dir || {});

// 需要监听的文件配置
export const absDirHash = {
  assets: transfer(baseDirHash.assets, [
    '**/*',
    '!REMADE.md',
  ]),
  styles: transfer(baseDirHash.styles, {
    watch: [
      '**/*.scss',
      '!REMADE.md',
    ],
    output: config.output,
  }),
  mjss: transfer(baseDirHash.src, [
    '**/*.js',
    '**/*.mjs',
    '**/*.ts',
    '!REMADE.md',
  ]),
  views: transfer(baseDirHash.views, [
    '**/*.html',
    '**/*.htm',
    '!REMADE.md',
  ]),
  static: transfer(baseDirHash.static, [
    '**/*',
    '!REMADE.md',
  ]),
};