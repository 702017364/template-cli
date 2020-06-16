import { RollupOptions } from 'rollup';
import Config from '@/types/Config';
import develop from '@/options/develop';
import merge from 'lodash/merge';

class Rollup {
  option: Config;
  rollup: RollupOptions;
  sourcemap: boolean;

  constructor(option: Config) {
    this.option = option;
    this.rollup = option.rollup || {};
    this.sourcemap = develop || option.sourcemap === true;
    this.init();
  }

  init = () => {
    const { rollup } = this;
    const option = merge({}, rollup);
    delete option.input;
    delete option.output;
    delete option.plugins;
    this.option.rollup = {
      option,
      list: {},
    };
  }

  formatRollup = (value: RollupOptions) => {

  }
}

export default (option: Config) => new Rollup(option).option;