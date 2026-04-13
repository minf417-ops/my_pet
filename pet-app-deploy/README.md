# 萌宠管家

一个面向移动端的宠物管理应用，支持作为 PWA 安装到 Android / iPhone 主屏幕，也支持打包为 Android APK。

## 项目简介

萌宠管家用于记录宠物的基础档案、健康记录、日常活动和预约信息，重点面向手机使用场景，强调轻量、直接、易安装。

本项目当前为前端静态应用，数据保存在浏览器本地 `localStorage` 中，无需后端即可使用。

## 核心功能

### 1. 宠物档案管理
- 添加宠物
- 编辑宠物资料
- 上传宠物头像
- 删除宠物
- 多宠物切换

### 2. 健康记录管理
- 疫苗记录
- 驱虫记录
- 体检记录
- 绝育记录
- 设置下次提醒日期
- 上传健康记录图片
- 查看、编辑、删除记录

### 3. 日常记录管理
- 喂食记录
- 遛狗记录
- 体重记录
- 日记记录
- 上传日常图片
- 记录心情
- 查看、编辑、删除记录

### 4. 预约与咨询
- 新增就诊预约
- 管理预约状态
- 快速咨询入口

### 5. 主题与界面
- 多主题切换
- 跟随系统浅色 / 深色模式
- 五个主页面主题风格统一
- 移动端适配界面

### 6. PWA 能力
- 可安装到手机桌面
- 支持离线缓存
- 支持 iOS / Android 浏览器安装
- 支持 Service Worker 和 Manifest

## 技术栈

- HTML5
- CSS3
- JavaScript（原生）
- Eleventy
- Capacitor
- Surge

## 项目结构

```text
pet-app-deploy/
├─ src/
│  ├─ index.html          # 主页面（SPA）
│  ├─ manifest.json       # PWA 配置
│  ├─ sw.js               # Service Worker
│  ├─ icon-192.svg        # PWA 图标
│  └─ icon-512.svg        # PWA 图标
├─ android/               # Capacitor Android 工程
├─ _site/                 # Eleventy 构建输出目录
├─ .eleventy.js           # Eleventy 配置
├─ capacitor.config.json  # Capacitor 配置
├─ package.json           # 项目依赖与脚本
└─ README.md              # 项目说明
```

## 本地运行

### 安装依赖

```bash
npm install
```

### 启动开发服务

```bash
npx @11ty/eleventy --serve --port 8080
```

### 构建静态站点

```bash
npx @11ty/eleventy
```

构建完成后，输出文件位于：

```text
_site/
```

## PWA 安装方式

### Android
1. 使用 Chrome 打开站点
2. 点击“安装应用”或“添加到主屏幕”

### iPhone
1. 使用 Safari 打开站点
2. 点击分享按钮
3. 选择“添加到主屏幕”

## Android APK 打包

项目已接入 Capacitor，可用于构建 Android APK。

### 同步 Web 资源到 Android

```bash
npx cap copy android
```

### 构建 Debug APK

Windows 下可使用：

```bash
.\android\gradlew.bat assembleDebug -p android
```

生成的 APK 默认位置：

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## 部署

### 构建

```bash
npx @11ty/eleventy
```

### 部署到 Surge

```bash
npx surge _site --domain pet-cute-demo.surge.sh
```

当前线上地址：

```text
https://pet-cute-demo.surge.sh
```

## 数据存储说明

当前项目使用浏览器本地存储：

- LocalStorage Key: `petApp_v4`

说明：
- 数据保存在当前设备和当前浏览器中
- 清除浏览器数据后，记录会丢失
- 图片以压缩后的 Base64 形式保存

## 当前版本

- 版本号：`1.1.0`

## 后续可扩展方向

- 数据导出 / 导入
- 云端同步
- 用户账号系统
- 本地提醒通知
- 宠物健康趋势图表
- iOS 原生安装包支持

## 说明

本项目聚焦宠物记录与管理，不包含百科、电商等非核心功能，保持应用轻量、直接、易用。
