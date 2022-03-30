import React from 'react';
import './App.css';
import {  useQuery } from '@apollo/client';
import { getAllColors } from './queries/queries'
import { Layout } from 'antd';
import Header from './components/Header';
import Content from './components/Content';
interface Color {
  id: number;
  name: string;
  hex: string
}
interface ColorData {
  colors: Color[]
}

function App() {
  const { loading, error, data } = useQuery<ColorData,"">(getAllColors);

  return (
    <Layout className='__mainLayout__'>
      <Layout.Header>
        <Header/>
      </Layout.Header>
      <Layout.Content><Content/></Layout.Content>
      <Layout.Footer>footer</Layout.Footer>
    </Layout>
  );
}

export default App;
