import React from 'react';
import { ConfigProvider } from 'antd'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import zhCN from 'antd/lib/locale/zh_CN';
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
    </ConfigProvider>,
  document.getElementById('root')
);


reportWebVitals();
