---
title: Git常用命令
---

## 主分支
### 克隆代码到本地
```shell
git clone 地址url
```

### 本地代码全部提交
```shell
git  add .
```

### 为本次提交添加注释
```shell
git commit -m "注释内容"   
```

### 提交全部代码到主分支
```shell
git push origin master
```

### 拉取代码
```shell
git pull
```

## 分支相关(假设分支名称为develop)
包括更新分支代码和提交分支代码

### 查看当前所处分支
```shell
git branch
```

### 查看所有分支
```shell
git branch -a
```

### 切换到develop分支
```shell
git checkout -t remotes/origin/develop
```

### 切换到主分支
```shell
git checkout master
```

### 更新线上分支代码到本地
```shell
git fetch origin develop
```

### 查看版本差异
```shell
git log -p develop..origin/develop
```

### 合并线上最新分支develop代码到本地
```shell
git merge origin/develop
```

### 查看修改内容
```shell
git status
```

### 本地代码全部提交
```shell
git  add .
```

### 为本次提交添加注释
```shell
git commit -m "注释内容"
```

### 全部提交到develop分支
```shell
git push origin develop
```





