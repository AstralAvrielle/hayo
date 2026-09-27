# 皓洋包装厂官网 - 完整中英文可部署版

本项目为皓洋包装厂（Haoyang Packaging）官方网站静态版本，支持中英文切换，可直接部署到 GitHub Pages、Vercel、Netlify、Cloudflare Pages、宝塔或 cPanel。

## 本次优化

- 中文文案重新梳理，更强调产品、销售场景、打样确认与量产落地
- 针对中文单独优化标题字号、行高、段落宽度、卡片留白与移动端阅读节奏
- 英文内容与原有图片路径保持不变

## 当前版本已包含

- 全站中英文切换
  - 导航栏
  - 首页主体内容
  - About Us 页面
  - Factory 页面
  - Custom Packaging 页面
  - 表单字段与按钮
  - 页脚与免责声明
  - 案例图片悬浮文案
  - 页面 SEO 标题与描述
- WhatsApp 悬浮咨询按钮
- 网站询价双保存：Google Sheets + 邮件通知
- About Us / Factory / Custom Packaging 独立页面
- SEO title / description / canonical / Open Graph / JSON-LD
- robots.txt / sitemap.xml，便于 Google 收录
- 滚动进入动画、悬浮卡片、轨道动画、跑马灯等视觉效果
- 响应式手机端布局
- 中文与英文分别优化标题比例、段落宽度、卡片留白和移动端断行
- 原有产品图片、图片路径与页面图片结构保持不变

## 网站主要文件

```text
index.html
about.html
factory.html
custom-packaging.html
main.js
styles.css
site-config.js
robots.txt
sitemap.xml
README.md
assets/
```

其中：

- `index.html`：网站首页
- `about.html`：关于皓洋
- `factory.html`：工厂实力
- `custom-packaging.html`：定制包装
- `main.js`：中英文切换、导航状态、动画、图片预览、Google Sheets 询价提交等功能
- `styles.css`：全站视觉样式及响应式布局
- `site-config.js`：联系方式、地址、域名等统一配置
- `robots.txt`：搜索引擎抓取规则
- `sitemap.xml`：网站页面地图
- `assets/`：网站图片资源

## 中英文切换说明

右上角的 `EN / 中文` 按钮负责切换网站语言。

当前版本已经覆盖页面主体内容，不再只是切换导航栏。首页、About、Factory、Custom Packaging、询价表单、免责声明以及部分 SEO 内容都会根据语言同步更新。

语言选择会保存在浏览器本地，访客再次打开网站时会优先使用上一次选择的语言。

## 上线前必须填写

编辑 `site-config.js`：

```js
window.HAOYANG_CONFIG = {
  whatsapp: "YOUR_WHATSAPP_NUMBER",
  email: "sales@hayopack.com",
  phone: "+86 17815714151",
  wechat: "+86 17815714151",
  addressZh: "中国浙江省义乌市稠江街道杨村路281号义乌创佳电商园1号楼",
  addressEn: "Building 1, No. 281 Yangcun Road, Choujiang Subdistrict, Yiwu Chuangjia E-commerce Park, Yiwu City, China",
  domain: "https://YOUR-DOMAIN.com"
};
```

请替换：

- `whatsapp`：国际区号 + 手机号，只写数字，例如 `8613812345678`
- `email`：已设置为 `sales@hayopack.com`
- `phone`：已设置为 `+86 17815714151`
- `wechat`：已设置为 `+86 17815714151`
- `addressZh`：已设置中文工厂地址
- `addressEn`：已设置英文工厂地址
- `domain`：网站正式域名

## 正式域名必须统一替换

正式上线前，请把以下文件里的：

```text
https://YOUR-DOMAIN.com
```

统一替换成你的正式域名：

- `index.html`
- `about.html`
- `factory.html`
- `custom-packaging.html`
- `site-config.js`
- `robots.txt`
- `sitemap.xml`

例如正式域名为：

```text
https://haoyangpack.com
```

则不要保留 `YOUR-DOMAIN.com`。

## 图片文件注意事项

网站页面中的图片都通过 `assets/` 文件夹引用。

如果只是更新文字、中英文内容或联系方式，不需要修改图片文件。

如果以后需要替换图片，建议：

1. 尽量保留原图片文件名，直接替换 `assets/` 中对应图片；
2. 如果修改图片文件名，同时修改 HTML 中相应的 `src="assets/xxx.jpg"`；
3. 不建议随意移动 `assets/` 文件夹，否则页面图片可能无法显示。

## 样品图片说明

网站页脚使用简短双语说明：

**中文：** 样品图片仅供包装参考。图片中的品牌元素归各自权利人所有。

**English:** Sample images are for packaging reference only. Brand elements belong to their respective owners.

## 网站询价：邮箱 + Google Sheets 双保存

当前版本支持客户提交一次询价后：

1. 自动保存到 Google Sheets；
2. 自动发送通知邮件到 `sales@hayopack.com`。

需要先完成 `google-apps-script.gs` 的部署，并把生成的 Web App `/exec` 地址填写到 `site-config.js` 的 `inquiryEndpoint`。

完整步骤请查看：`GOOGLE-SHEETS-SETUP.md`。

如果暂时没有配置 Google Apps Script，网站会继续把 FormSubmit 作为临时邮件兜底方案。

## WhatsApp 设置

在 `site-config.js` 中填写：

```js
whatsapp: "8613812345678"
```

只填写：

```text
国家区号 + 手机号码
```

不要填写：

```text
+
空格
-
括号
https://wa.me/
```

配置成功后，网站 WhatsApp 按钮会自动生成咨询链接，并根据当前语言生成中文或英文咨询开场语。

## GitHub Pages 部署

如果使用 GitHub Pages：

1. 创建 GitHub Repository。
2. 将网站全部文件上传到仓库根目录。
3. 确保 `index.html` 位于仓库根目录。
4. 打开：
   `Settings → Pages`
5. Source 选择：
   `Deploy from a branch`
6. Branch 选择：
   `main`
7. Folder 选择：
   `/ (root)`
8. 保存并等待 GitHub Pages 发布。

如果暂时没有正式域名，也可以先使用 GitHub Pages 自动生成的网址查看网站效果。

## 绑定正式域名后

域名确认后，需要同步检查：

- HTML 中的 canonical
- Open Graph URL / 页面信息
- `site-config.js`
- `robots.txt`
- `sitemap.xml`

确保所有域名都指向同一个正式网站。

## Google 收录

网站部署并绑定正式域名后：

1. 确认所有 `YOUR-DOMAIN.com` 已替换。
2. 打开 Google Search Console。
3. 添加并验证网站域名。
4. 提交：

```text
https://你的域名/sitemap.xml
```

5. 对首页使用“请求编入索引”。
6. 后续可继续提交 About、Factory、Custom Packaging 等页面。

## 上线前建议检查

正式对外推广前，建议逐项确认：

- 中英文切换是否正常
- 所有图片是否正常显示
- 手机端排版是否正常
- Email 是否正确
- WhatsApp 是否可以打开
- 电话号码是否正确
- 微信号是否正确
- 中英文地址是否正确
- 表单是否可以正常收件
- 正式域名是否全部替换
- sitemap.xml 是否能打开
- robots.txt 是否能打开
- 样品图片与品牌元素说明是否符合实际展示情况

## 部署方式

这是纯静态网站，可直接部署到：

- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages
- 宝塔
- cPanel
- 其他支持 HTML / CSS / JavaScript 的静态服务器

不需要数据库，也不依赖 WordPress。

---

Haoyang Packaging / 皓洋包装厂
