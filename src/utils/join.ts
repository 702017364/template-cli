import { join } from 'path';
import transfer from '@/options/transfer';

// 返回添加了项目目录的绝对目录
export default (...list: string[]) => {
  return join(transfer, ...list);
};