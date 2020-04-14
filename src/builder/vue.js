const path = require('path');
const fse = require('fs-extra');
const memFs = require('mem-fs');
const memFsEditor = require('mem-fs-editor');

// 拷贝时候需要忽略的文件和文件夹
const FILE_COPY_IGNORE = ['node_modules', 'yarn.lock', 'package.json', 'lang'];

// 需要使用 ejs 模版的文件
const FILE_TPL = ['README.md', 'lang', 'package.json'];

module.exports = function ({ data, dirRoot, dirProject }) {
  const { componentType } = data;
  return new Promise((resole, reject) => {
    const dirTpl = path.join(dirRoot, `template/${componentType}`);

    try {
      // 遍历模版一级目录下的所有文件和文件夹
      fse.readdir(dirTpl, (err, files) => {
        if (err) {
          reject(err);
          return;
        }
        // 创建虚拟内存文件
        const store = memFs.create();
        const memFsE = memFsEditor.create(store);

        // 新建项目目录
        // 同步创建目录，以免文件目录不对齐
        fse.ensureDirSync(dirProject);

        // 清空目录
        fse.emptyDirSync(dirProject);

        // 把不需要模版编译的文件直接拷贝过去
        files
          .filter(item => !FILE_COPY_IGNORE.includes(item))
          .forEach((item) => {
            const objCopy = {
              from: path.join(dirTpl, item),
              to: path.join(dirProject, item)
            };
            memFsE.copy(objCopy.from, objCopy.to);
          });

        // 把需要编译的文件写入
        files
          .filter(item => FILE_TPL.includes(item))
          .forEach((item) => {
            const objCopy = {
              from: path.join(dirTpl, item),
              to: path.join(dirProject, item)
            };
            memFsE.copyTpl(objCopy.from, objCopy.to, data);
          });

        // 内存虚拟文件写入
        memFsE.commit(() => {
          resole();
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};