import through2 from 'through2';
import _ from 'lodash';
import csstree from 'css-tree';

/* import csstree from '@/components/csstree';

type Node = (
  node: any,
) => void;

const ast = csstree.parse('.example { world: "!" }');
csstree.walk(ast, function(node) {
  if (node.type === 'ClassSelector' && node.name === 'example') {
      node.name = 'hello';
  }
} as Node);
console.log(csstree.generate(ast)); */

type OptionCallback = (
  selector: string,
) => boolean;

interface Option {
  test?: string | string[] | RegExp | OptionCallback;
  iteration?: number,
};

const OPTION_DEFAULT = {
  test: /^(html|:root)$/g,
  iteration: 1,
};

const MAP = {
  'Value'
};

export default (option: Option = {}) => {
  option = _.merge({}, OPTION_DEFAULT, option);
  const { test, iteration } = option;
  return through2.obj(function(chunk, enc, cb) {
    const ast = csstree.parse(chunk.contents.toString());
    csstree.walk(ast, (node) => {
      if(node.type === 'Selector') {

      }
    });
    return cb(null, chunk);
  });
};