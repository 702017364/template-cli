import merge from 'lodash/merge';
import join from '@/utils/join';
import Config from '@/types/Config';

// cli 默认配置
const baseConfig: Config = {
  env: false,
  entry: true,
  base: './',
  runtime: true,
  rename: null,
  output: [ 'index.scss' ],
  cdn: [],
  merge: [],
  rollup: {},
  presets: [],
  plugins: [],
  browsersync: null,
  rules: {},
  dir: null,
  sourcemap: false,
};

// cli 用户配置
export const custom: Config = (() => {
  try {
    const file = join('template.js');
    return require(file);
  } catch(error) {
    return {};
  }
})();

// cli 合并配置
export const config: Config = (() => {
  const value = merge(baseConfig, custom);
  return value;
})();