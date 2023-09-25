---
title: VitePress安装
---

## VitePress安装
两种方式

### 在项目中使用
在项目中使用的话，一般就是用来作为项目开发的文档，比如项目的架构介绍、公共封装的代码的使用、团队的规范等等。
### 单独使用
单独使用可以用来作为个人博客之类的写作网站。
### 安装
1.在项目中使用，直接在项目根目录初始化，位置一般就写 `./docs`

2.单独使用就直接在一个空目录内初始化，位置写 `./`
::: code-group

```sh [npm]
npx vitepress init
```

```sh [pnpm]
pnpm dlx vitepress init
```

```sh [bun]
bunx vitepress init
```
:::

<<< ./init.ansi
### 实际操作（mac 环境下）
```shell
➜  demo mkdir vitepress
➜  demo cd vitepress 
➜  vitepress pnpm dlx vitepress init

┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./
│
◇  Site title:
│  notes
│
◇  Site description:
│  wangcaiyuan notes
│
◇  Theme:
│  Default Theme
│
◇  Use TypeScript for config and theme files?
│  Yes
│
◇  Add VitePress npm scripts to package.json?
│  Yes
│
└  Done! Now run pnpm run docs:dev and start writing.

➜  vitepress code .
➜  vitepress ls
api-examples.md      markdown-examples.md notebooks            pnpm-lock.yaml
index.md             node_modules         package.json
```








