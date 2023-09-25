---
title: 设置Mac启动台图标
---
设置Mac启动台图标

打开终端
## 调整列
首先调整显示多少列，Mac迷列数设定为8，这个数字可以根据你的个人需求任意修改，直接替换int后的数字即可。
```shell
defaults write com.apple.dock springboard-columns -int 8
```

## 调整行
其次调整一个窗口有多少行，Mac迷将其设置为6行，同样的，数字都是变量，你可以根据需求随意更换。
```shell
defaults write com.apple.dock springboard-rows -int 6
```

## 重启Dock
列数行数都设定好了，需要重启Dock以命令生效，所以需要在终端输入
```shell
killall Dock
```
回车

## 恢复默认设置
如果你需要将启动台（Launchpad）图标恢复为Mac的默认显示，在终端中执行以下命令即可。
```shell
defaults write com.apple.dock springboard-rows Default
defaults write com.apple.dock springboard-columns Default
killall Dock
```







