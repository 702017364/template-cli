import { RollupOptions } from 'rollup';
import DirConfig from './DirConfig';

// cli 配置
export default interface Config {
  env: boolean;
  entry: boolean;
  base: string;
  runtime: true;
  rename: null | string;
  output: string[];
  cdn: string[],
  merge: string[],
  rollup: object,
  presets: string[] | object[],
  plugins: string[] | object[],
  browsersync: null | string | object,
  rules: RollupOptions,
  dir: DirConfig | null;
  sourcemap: boolean;
  assetsNameIsHash: boolean;
  limit: number;
}