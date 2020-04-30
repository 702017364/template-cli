import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import alias from 'rollup-plugin-alias';
import tsconfig from './tsconfig.json';

const pluginsAlias = (() => {
  const alias = {};
  const { paths } = tsconfig.compilerOptions;
  const REGEX_ALIGAS = /\/\*$/g;
  for(const key in paths) {
    const newKey = key.replace(REGEX_ALIGAS, '');
    const newValue = paths[key][0].replace(REGEX_ALIGAS, '');
    alias[newKey] = newValue;
  }
  return alias;
})();

const external = new class {
  constructor() {
    // 以 . 或 / 或 盘符开头的肯定为自定义文件
    this.re = /^([\.\/]|\w+:)/;
    // 不能排除的特殊包，如各种 polyfill
    this.list = Array.from(new Set([
      /^@babel\/runtime/,
    ]));
    this.customs = (() => {
      const list = [];
      for(const key in pluginsAlias) {
        const value = pluginsAlias[key];
        // 如果别名对应的值中不包含 '.'，则说明该别名为路径别名
        if(!value.includes('.')) {
          const re = new RegExp(`^${key}\/`);
          list.push(re);
        }
      }
      return list;
    })();
  }

  some(list, id) {
    return list.some((value) => {
      if(value instanceof RegExp) {
        return value.test(id);
      } else if(typeof value === 'function') {
        return value(id);
      } else {
        return value === id;
      }
    });
  }

  contains(id) {
    return !this.some(this.customs, id)
      && !this.re.test(id)
      && !this.some(this.list, id)
    ;
  }
}

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
  },
  plugins: [
    alias(pluginsAlias),
    typescript(),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    json(),
    commonjs(),
  ],
  external(id) {
    return external.contains(id);
  },
};