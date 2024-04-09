import React, { useState } from 'react';
import { Layout,Upload,Result,Row,Col } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const { Header, Content, Footer } = Layout;
const { Dragger } = Upload;

const App = () => {
  const [result, setResult] = useState('');
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const props = {
    name: 'image',
    multiple: false,
    action: 'http://10.172.176.32:5000/predict',
    onChange(info) {
      const { status, response } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        setSuccess(true);
        setFail(false);
        const { results } = response;
        const result = results[0];
        setResult(result);
      }
      else if (status === 'error') {
        setFail(true);
        setSuccess(false);
        setResult('');
      }
    }
  };

  return(
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center'}}>
        <div style={{ color: 'white', fontSize: '2em'}}>Image2MD</div>
      </Header>
      <Content style={{ padding:'30px 48px', minHeight: '80vh'}}>
        <Row>
        <Col span={24}>
          <Dragger {...props}>
            <p className='ant-upload-drag-icon'><InboxOutlined/></p>
            <p>点击或拖拽文件至此处上传</p>
          </Dragger>
        </Col>
        </Row>
        <Row>
        <Col span={24}>
          {success && <Result status="success" title="转换成功" subTitle={result}/>}
          {fail && <Result status="error" title="转换失败" subTitle={result}/>}
        </Col>
        </Row>
        <Row>
        <Col span={24} style={{textAlign:'center'}}>
          {success && <ReactMarkdown children={result} remarkPlugins={[remarkGfm,remarkMath]} rehypePlugins={[rehypeKatex]}/>}
        </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center'}}>

      </Footer>
    </Layout>
  );
}

export default App;