import os
import requests
import json

url = "http://127.0.0.1:5000/predict"
path = "/Users/mathmaid/Library/Mobile Documents/iCloud~md~obsidian/Documents/我的第二大脑/Zotero/bin/"
pathtex = "/Users/mathmaid/Library/Mobile Documents/iCloud~md~obsidian/Documents/我的第二大脑/ZoteroTeX/"
os.chdir(path)
value_to_remove = ['.DS_Store']
dir_list = list(filter(lambda x: x not in value_to_remove, os.listdir()))


def custom_sort(string):
    exp = string.split('-')
    title = exp[0]
    page = int(exp[1])
    x_axis = int(exp[2][1:])
    y_axis = int(exp[3][1:-4])
    return title, page, y_axis, x_axis


def trans(citekey):
    os.chdir(path+citekey)
    listt = list(filter(lambda x: x not in value_to_remove, os.listdir()))
    relist = sorted(listt, key=custom_sort)

    with open(pathtex+citekey+'.md', 'w') as f:
        for item in relist:
            print("文件 " + item + " 正在处理中")
            f.write("![[" + item + "]]\n\n")
            files = {'image': open(item, 'rb')}
            response = requests.post(url=url, files=files)
            if response.status_code == 200:
                f.write("文件处理成功, 转换结果如下\n\n")
                print("转换已完成, 开始写入 " + item + ".md 文件")
                data = json.loads(response.content.decode('utf-8'))
                f.write(data['results'][0]+"\n\n")
                print("写入完成")
            else:
                f.write("文件转换失败\n\n")
                print("文件 " + item + " 转换失败")


if __name__ == '__main__':
    for dir_item in dir_list:
        trans(dir_item)
