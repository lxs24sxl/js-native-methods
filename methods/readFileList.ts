var fs = require('fs');
var path = require('path');

function readFileListDFS(dir, fileList = []) {

  const files = fs.readdirSync(dir);

  let currentPath = '';
  for (let i = 0, len = files.length; i < len; i++) {
    currentPath = path.join(dir + '/' + files[i]);
    const stat = fs.statSync(currentPath);

    if (stat.isDirectory()) {
      readFileListDFS(currentPath, fileList);
    } else {
      fileList.push(currentPath);
    }
  };
  return fileList;
}

function readFileListBFS(dir, fileList = []) {

  let files = fs.readdirSync(dir);
  files = files.map(item => {
    return path.join(dir, '/', item);
  });

  while (files.length) {
    const currentPath = path.join(files.pop());

    const stat = fs.statSync(currentPath);

    if (stat.isDirectory()) {
      
      let deepFiles = fs.readdirSync(currentPath);

      deepFiles = deepFiles.map(item => {
        item = path.join(currentPath, '/', item);
        return item
      });

      files = files.concat(deepFiles);
    } else {
      fileList.push(currentPath);
    }

  }

  return fileList;
}

// console.log(__dirname)
console.time();
readFileListDFS(__dirname);
console.timeEnd();

console.time()
readFileListBFS(__dirname);
console.timeEnd();