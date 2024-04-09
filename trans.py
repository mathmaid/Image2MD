import requests
import json

url = "http://127.0.0.1:5000/predict"
files = {'image': open('pic.png', 'rb')}
response = requests.post(url=url, files=files)


if __name__ == '__main__':
    with open("output.md", "w") as f:
        if response.status_code == 200:
            print("正在转换中")
            data = json.loads(response.content.decode('utf-8'))
            f.write(data['results'][0])
            print("转换完成")
        else:
            f.write("转换失败")
            print("转换失败")
