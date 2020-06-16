type Recorder = {
  [key in string]: string; 
};

const recorders = {
  css: {} as Recorder,
  js: {} as Recorder,
};

const has = (type: string, value: string): any => {
  if(type in recorders) {
    // return value in recorders[type];
  }
  return false;
};

export default {
  has,
};