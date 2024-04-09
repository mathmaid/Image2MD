# Image2MD

## 项目说明

本项目包括一个将图片转换为Markdown语法的API接口和一个前端网页

1. 运行 main.py 会在本地 127.0.0.1:5000 端口运行一个 flask 应用, 该应用用于处理 POST 请求, 在 POST 请求中添加一个 json 文件 {'image': YOUR_FILE} 后会返回带有 Markdown 的 response
2. 运行 single-task.py 会将文件夹内的 input.png 作为输入文件发送 POST 请求, 并将 response 内的 Markdown 信息储存至 output.md 文件中
3. web 文件夹中是一个基于 react 的网页, 可以展示 Markdown 源码和渲染之后的 LaTeX 公式.

项目依赖:
```
pip3 install flask texify torch
```

```
npm install antd react-markdown remark-gfm remark-math rehype-katex
```
