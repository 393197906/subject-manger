import React, {Component} from 'react';
import {Tabs, Card, Button, Row, Col, Form, Input, InputNumber, Collapse, Popover} from 'antd';
import './module-tools.css'
import {Swiper, Nav, Amod, Bmod, Cmod, Dmod} from '../../module/index'
const Panel = Collapse.Panel;

const modeuleList = [
    {name: '轮播图', priview: Swiper},
    {name: '导航', priview: Nav},
    {name: '静态模块A(一列)', priview: Amod},
    {name: '静态模块B(二列)', priview: Bmod},
    {name: '静态模块C(三列)', priview: Cmod},
    {name: '静态模块D(组合)', priview: Dmod},
];

export default class ModuleTools extends Component {
    render() {
        return (
            <Card title="模块工具栏" bodyStyle={{padding: '0'}}>
                <Collapse accordion bordered={false} defaultActiveKey={['1']}>
                    <Panel header='静态组件' key="1">
                        {
                            modeuleList.map((item, index) => (
                                <div style={{marginBottom: '5px'}} key={index}>
                                    <Popover content={<item.priview/>} placement="left"
                                             overlayClassName="priview-module">
                                        <Button style={{width: '100%'}}>{item.name}</Button>
                                    </Popover>
                                </div>
                            ))
                        }
                    </Panel>
                    <Panel header='动态组件' key="2">s
                        <p>2</p>
                    </Panel>
                </Collapse>
            </Card>
        );
    }
}

