const path = require('path');
const fse = require('fs-extra');
const memFs = require('mem-fs');
const memFsEditor = require('mem-fs-editor');

module.exports = function(data, dirName) {
  const { componentType } = data;

  // 模版目录
  const dirTpl = path.join(__dirname, `../template/${componentType}`);

  // 获取当前命令的执行目录，注意和项目目录区分
  const cwd = process.cwd();
  // 用户输入命令时创建的项目目录
  const dirProject = path.join(cwd, dirName);
  return new Promise((resole, reject) => {
    // 获取对应配置文件
    const tplConfig = require(`./config/${componentType}.js`);

    if (!tplConfig) {
      return;
    }

    // 把 package.json 里面的 file 独立出来
    // 不然 @_nu/cli npm pack 会忽略掉 css 里面的其它文件
    data.pkgFiles = JSON.stringify(tplConfig.pkg_files);

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
          .filter(item => !tplConfig.file_copy_ignore.includes(item))
          .forEach(item => {
            const objCopy = {
              from: path.join(dirTpl, item),
              to: path.join(dirProject, item),
            };
            memFsE.copy(objCopy.from, objCopy.to);
          });

        // 把需要编译的文件写入
        files
          .filter(item => tplConfig.file_tpl.includes(item))
          .forEach(item => {
            const objCopy = {
              from: path.join(dirTpl, item),
              to: path.join(dirProject, item),
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
