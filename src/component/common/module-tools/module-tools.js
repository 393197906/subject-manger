import React, {Component} from 'react';
import {Card, Collapse} from 'antd';
import  ModuleToolsCell from './module-tools-cell'
import './module-tools.css'
import {Swiper, Nav, Amod, Bmod, Cmod, Dmod} from '../../module/index'
const Panel = Collapse.Panel;
const lib = {Swiper, Nav, Amod, Bmod, Cmod, Dmod};
const modeuleList = [
    {name: '轮播图', priview: 'Swiper'},
    {name: '导航', priview: 'Nav'},
    {name: '静态模块A(一列)', priview: 'Amod'},
    {name: '静态模块B(二列)', priview: 'Bmod'},
    {name: '静态模块C(三列)', priview: 'Cmod'},
    {name: '静态模块D(组合)', priview: 'Dmod'},
];

export default class ModuleTools extends Component {
    render() {
        return (
            <Card title="模块工具栏" bodyStyle={{padding: '0'}}>
                <Collapse accordion bordered={false} defaultActiveKey={['1']}>
                    <Panel header='静态组件' key="1">
                        {
                            modeuleList.map((item, index) => (
                                <ModuleToolsCell name={item.name} priview={item.priview}/>
                            ))
                        }
                    </Panel>
                    <Panel header='动态组件' key="2">
                        <p>空</p>
                    </Panel>
                    <Panel header='工具组件' key="3">
                        <ModuleToolsCell name={'间距组件'} priview={'Tools_Seat'}/>
                    </Panel>
                </Collapse>
            </Card>
        );
    }
}

