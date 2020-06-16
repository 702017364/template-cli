declare module 'gulp-clean-css';
declare module 'url-loader';
declare module 'css-loader';
declare module '@babel/generator';
declare module 'gulp-csstree';
declare module 'css-tree' {
  type ParseOption = {
    context?: string;
    filename?: string;
    offset?: number;
    line?: number;
    column?: number;
    positions?: boolean;
    parseAtrulePrelude?: boolean;
    parseRulePrelude?: boolean;
    parseValue?: boolean;
    parseCustomProperty?: boolean;
    onParseError?: () => void;
  };

  type Node = {
    type: string;
    name: string;
  };

  type Ast = any;

  function parse(source: string, options?: ParseOption): Ast;

  type WalkCalllback = (node: Node) => void;

  function walk(ast: Ast, callback: WalkCalllback): void;

  function generate(ast: Ast): string;
}