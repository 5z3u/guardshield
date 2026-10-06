# GuardShield 守护盾 · 落地页

安卓原生 UI + 开机启动动画，内置 APK 直接下载。

## 本地预览
```bash
python3 -m http.server 8080
```
打开 http://127.0.0.1:8080

## 结构
- `index.html` 页面主体
- `assets/style.css` Material 风格样式，顶部 `:root` 变量改一处换全站配色
- `assets/app.js` 启动动画、时钟、涟漪、截图轮播
- `assets/icon.png` 应用真实图标
- `GuardShield.apk` 安装包（12.63 MB）

## 部署
静态站点，上传至任意托管即可（GitHub Pages / Vercel / Cloudflare Pages / Nginx）。
