import native from 'module';
import vm from 'vm';

interface Module {
  exports: string[][];
}

// 将处理后的 js 代码运行输出
export default (bundle: string): string => {
  const m = { exports: [] } as Module;
  const wrap = native.wrap(bundle);
  const script = new vm.Script(wrap, {
    displayErrors: true,
  });
  const result = script.runInThisContext();
  result.call(m.exports, m.exports, require, m);
  return m.exports[0][1];
};