# auto-vacc

自动预约深圳新冠疫苗

## 说明

软件在 [Releases](https://github.com/iamobj/auto-vacc/releases) 提供下载，有 win/mac 的安装包

软件需要一点的技术要求，要求会抓包，因为软件需要登录后的 token 才能使用，怎么抓包就自己百度折腾吧，软件界面和功能可以看下面的预览

用户 token 需要自己去`深圳卫健委`公众号抓包拿到，如果要帮别人预约，又不方便抓他人手机上的包，可以通过自己手机给别人建档，然后抓包，抓`crmobile/registerUser/getUserInfo`这个接口的请求头 token，这个就是每个用户的 token

可以抓手机的，也可以抓电脑的，电脑端的微信也能打开公众号

## 预览

这个视频是基于 0.2.0 版本录的

https://user-images.githubusercontent.com/36121945/120890410-0981cd00-c635-11eb-97e8-b19aa0ca6254.mp4

下面是我自己预约成功的

![image-20210605150628334](https://i.rhc.im/iamobj/graph-bed/blob/uPic/uPic/image-20210605150628334.png?raw=true)

## 起源

和女票在深圳一起打疫苗，哪成太难预约到了，跟节假日抢高铁票一样，而且每天放号的时候还不确定，哪有时间去蹲它，于是乎作为程序员，自动化搞起。

时间仓促，界面、代码设计比较粗糙，这也是自己的第一个用`electron`写的桌面程序，初步入门了一下`electron`，顺便借这个项目熟悉下 github 的 [Actions](https://docs.github.com/cn/actions/reference/workflow-syntax-for-github-actions)，实现提交代码自动构建并发布到 [Releases](https://github.com/iamobj/auto-vacc/releases)

## 最后

软件大家且用且珍惜，写代码不难，难的是分析接口加密，制作不易，走过路过点个 star 呗

愿全球疫情都快好起来

![20160116922699_rEdRNG](https://i.rhc.im/iamobj/graph-bed/blob/uPic/uPic/20160116922699_rEdRNG.gif?raw=true)
