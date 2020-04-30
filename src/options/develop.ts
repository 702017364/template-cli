import minimist from 'minimist';

// 是否为 develop 模式
export default !minimist(process.argv.slice(2)).production;