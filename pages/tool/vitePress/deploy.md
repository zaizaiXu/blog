# 部署到线上

**官方文档上已经列举了多个部署方案和教程 [vitepress 部署](https://vitepress.dev/guide/deploy)**

**当前这个站点使用了两种部署方式：**

- Gitee Pages服务
- 云服务器部署

## 部署前准备

执行build指令，将站点进行打包：
::: code-group

```sh [npm]
npm run docs:build
```

```sh [pnpm]
pnpm docs:build
```

```sh [yarn]
yarn docs:build
```

:::

打包后在`.vitepress`目录下生成的`dist`目录内的文件，就是部署到线上的文件。

## 开通使用Gitee Pages服务部署

### 前提条件

::: danger
在gitee pages服务上部署，由于域名上会多出一个项目名称，如：https://wangcaiyuan_admin.gitee.io/`notebooks`

所以在打包之前，需要修改一下`config`文件，添加`base: "/notebooks/"`，否则访问会出现样式错乱和路由404问题

```js
export default defineConfig({
  base: "/notebooks/",
  // ...
})
```
:::

1. 在gitee上创建一个仓库，必须是开源的，否则无法开通git pages服务
2. 将整个vitepress项目推送到仓库 或 只推送打包后的dist目录下的文件也可以，看个人选择，主要是dist内的文件必须推送

::: tip
如果是将整个项目推送到仓库的话，在项目根目录的`.gitignore`内的`dist/`需要去掉，否则`dist/`目录会被忽略
:::

3. 开通gitee pages服务

![An image](../../../images/vitepress-deploy.png)

::: tip
如果是将整个项目推送到仓库的话，部署目录填 `.vitepress/dist`，如果只上传了dist内的文件，填 `./`
:::

4. 开通后点击启动，启动完成后会生成一个链接，就可以访问了。

::: tip
部署成功后，以后每次修改内容，都需要执行以下步骤：
1. 打包
2. 推送代码到仓库
3. 点击git pages服务里的更新
:::


## 云服务器部署
