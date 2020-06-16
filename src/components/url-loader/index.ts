import { join } from 'path';
import through2 from 'through2';
import PluginError from 'plugin-error';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import t from '@babel/types';
import Css from './css';
import loader, { Query } from './loader';
import utilJoin from '@/utils/join';
import { baseDirHash } from '@/options/dirHash';
import generator from '@babel/generator';
import vm from './vm';
import initGetContent from './initGetContent';

interface Option extends Query {
}

const RE_ALIAS = /^(\.\/)?@?/g; // 匹配别名
const RE_GETURL = /\/getUrl\.js$/; // 匹配 getUrl.js 的导入
const RE_EXPORTS_END = /['"];$/; // 判断输出 module.exports 时，结尾是否添加了 ';' 字符

const { length: EXPORTS_START } = 'module.exports = ';

export default (option: Option = {}) => {
  const RE_IMAGE = /\.(jpe?g|gif|png|svg)$/;
  return through2.obj(function(chunk, enc, cb) {
    if(chunk.isNull()) {
      return cb(null, chunk);
    }
    if(chunk.isStream()) {
      this.emit('error', new PluginError('url-loader', 'Streaming not supported!'));
      return cb(null, chunk);
    }
    new Css(
      chunk.contents.toString(),
      (error, value) => {
        if(error) {
          this.emit('error', error);
          return cb(null, chunk);
        } else {
          const ast = parse(value);
          const assets = utilJoin(baseDirHash.assets).replace(/\\/g, '/');
          const getContent = initGetContent();
          traverse(ast, {
            CallExpression(path) {
              const { node } = path;
              const { callee, arguments: [ arg ] } = node;
              if(
                callee.type === 'Identifier'
                  && callee.name === 'require'
                  && arg.type === 'StringLiteral'
                ) {
                const { value } = arg;
                if(RE_IMAGE.test(value)) {
                  const cache = value.replace(RE_ALIAS, '');
                  const resourcePath = join(assets, cache).replace(/\\/g, '/');
                  const result: string = loader({
                    limit: option.limit,
                    resourcePath: value,
                    content: getContent(resourcePath),
                  });
                  path.replaceWith(
                    t.stringLiteral(
                      result.slice(
                        EXPORTS_START + 1,
                        RE_EXPORTS_END.test(result) ? -2 : -1,
                      ),
                    ),
                  );
                  arg.value = result;
                } else if(RE_GETURL.test(value)) {
                  path.replaceWith(t.functionExpression(
                    null,
                    [
                      t.identifier('value'),
                    ],
                    t.blockStatement([
                      t.returnStatement(
                        t.identifier('value'),
                      ),
                    ]),
                  ));
                }
              }
            },
          });
          const gen = generator(ast, {}, value);
          const result = vm(gen.code);
          chunk.contents = Buffer.from(result);
          return cb(null, chunk);
        }
      },
    );
  });
};