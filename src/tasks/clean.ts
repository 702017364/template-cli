import fs from 'fs';
import { TaskFunction } from 'gulp';
import join from '@/utils/join';
import { baseDirHash } from '@/options/dirHash';
import rmdirSync from '@/components/rmdirSync';

const { dist } = baseDirHash;

// 任务：清理发布目录
const task: TaskFunction = (cb) => {
  try {
    if(fs.existsSync(dist)) {
      const dir = join(dist);
      rmdirSync(dir);
    }
    fs.mkdirSync(dist);
  } catch (error) {
    console.error(error);
  }
  cb();
};

export default task;