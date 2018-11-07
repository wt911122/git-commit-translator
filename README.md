#Auto Translate commit message

在git提交时调用谷歌API把提交信息转换成英文，
配置项：
project-id 谷歌云的项目ID（使用前先要在环境变量中设置account和项目对应的tockenjson，具体参考[google cloud link](https://cloud.google.com/sdk/docs/initializing)

eng-first 是否把英文显示在前面


```
//.huskyrc 配置 husky(https://www.npmjs.com/package/husky)的配置文件
{
  "hooks": {
    "commit-msg": "node index.js --project-id=[your google project id] --eng-first=[true|false]"
  }
}
```