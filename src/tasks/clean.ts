import { TaskFunction } from 'gulp';
import join from '@/utils/join';
import { baseDirHash } from '@/options/dirHash';
import rmdirSync from '@/components/rmdirSync';

// 任务：清理发布目录
const task: TaskFunction = (cb) => {
  try {
    const dir = join(baseDirHash.dist);
    rmdirSync(dir);
  } catch (error) {
    console.error(error);
  }
  cb();
};

export default task;