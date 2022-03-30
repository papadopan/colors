import React from 'react';
import './App.css';
import { Layout } from 'antd';
import Header from './components/Header';
import Content from './components/Content';

function App() {
  return (
    <Layout className="__mainLayout__">
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content style={{ padding: '10px' }}>
        <Content />
      </Layout.Content>
      <Layout.Footer>footer</Layout.Footer>
    </Layout>
  );
}

export default App;
