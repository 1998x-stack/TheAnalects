# GitHub Pages 部署运行手册

## 本地检查

~~~bash
npm test
npm run build
npm run serve
~~~

打开 http://localhost:4173 。要求Node.js 20+、Python3。

## GitHub Pages首次启用

仓库管理员打开：https://github.com/1998x-stack/TheAnalects/settings/pages

在 **Build and deployment → Source** 中选择 **GitHub Actions**，保存后重试发布工作流：

https://github.com/1998x-stack/TheAnalects/actions/workflows/pages.yml

预期网址：https://1998x-stack.github.io/TheAnalects/ 。

只有工作流成功并且公众浏览器真实可访问，才可标记“已上线”。配置文件本身和代码提交都不保证部署成功。

## 流水线

push main → npm test → npm run build → actions/configure-pages@v5 → actions/upload-pages-artifact@v4 → actions/deploy-pages@v4。

若发生“Get Pages site failed / Not Found”，一般是仓库尚未启用Pages或未选择GitHub Actions作为发布源；先检查Settings，不要立即改动源代码。GitHub Actions自带的GITHUB_TOKEN不一定能通过enablement自动启用新仓库Pages，权限可能不足。

## 验证和回滚

CI验证数据、代码和静态产物；Pages验证上传和部署；最后实际访问链接检查20篇、搜索、逐条译意和移动端。发现线上P0问题则git revert最近有问题的提交，重新验证并发布。