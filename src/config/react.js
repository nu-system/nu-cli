module.exports = {
  // 拷贝时候需要忽略的文件和文件夹
  file_copy_ignore: [
    "node_modules",
    "yarn.lock",
    "package.json",
    "lang",
    "es",
    "lib",
    "demo"
  ],
  // 需要使用 ejs 模版的文件
  file_tpl: ["demo", "README.md", "lang", "package.json"],
  // 把 package.json 里面的 file 独立出来
  pkg_files: ["es", "lib", "umd", "lang"]
};
