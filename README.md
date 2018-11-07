#Auto Translate commit message

在git提交时调用谷歌API把提交信息转换成英文，

```
//.huskyrc 配置
{
  "hooks": {
    "commit-msg": "node index.js --project-id=[your google project id]"
  }
}
```