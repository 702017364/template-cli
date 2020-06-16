#!/usr/bin/env node

const { join } = require('path');
const { spawn } = require('child_process');

const cmd = process.platform == 'win32' ? 'gulp.cmd' : 'gulp';
const args = process.argv.slice(2);
const proc = spawn(cmd, args, {
  cwd: join(__dirname, '../'),
  stdio: 'inherit',
});

proc.on('exit', (code, signal) => {
  process.on('exit', () => {
    if(signal){
      process.kill(process.pid, signal);
    } else{
      process.exit(code);
    }
  });
});
process.on('SIGINT', () => proc.kill('SIGINT'));