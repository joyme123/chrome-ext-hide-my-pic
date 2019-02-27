## 简介
一键隐藏 NSFW(Not Safe/Suitable For Work) 图片的Chrome扩展。基于[nsfw](https://github.com/infinitered/nsfwjs)这个项目

## 安装

在[这里](https://github.com/joyme123/chrome-ext-hide-my-pic/releases)下载crx扩展文件，然后拖动到Chrome的扩展程序页面，之后会自动安装。(需要打开开发者模式才可以安装)

## 编译安装

使用 `npm install` 来安装所有的依赖库. 之后运行 `npm run build` 来编译. 这会生成一个 `dist` 目录. 在chrome扩展页从 `dist` 目录`加载已解压的扩展`即可。

## 使用

使用 `Ctrl+Shift+E` 来隐藏所有在页面上的 NSFW 图片.你也可以在选项里调整要隐藏的NSFW级别。

## LICENSE
MIT
