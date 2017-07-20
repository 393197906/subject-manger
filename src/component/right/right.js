import React, {Component} from 'react';
import {Tabs, Card, Button, Row, Col, Form, Input, InputNumber, Collapse, Popover} from 'antd';
import './right.css'
import {Swiper, Nav, Amod, Bmod, Cmod, Dmod} from '../module/index'
import ModuleTools from '../common/module-tools/module-tools'
import Convent from '../convent/convent'
import Render from '../render/render'
import Danger from '../danger/danger'
const TabPane = Tabs.TabPane;

export default class Right extends Component {
    render() {
        return (
            <div className="right">
                <Row>
                    <Col span={18}>
                        <Tabs defaultActiveKey="2"
                              tabPosition="left"
                        >
                            <TabPane tab="常规" key="1">
                                <Convent/>
                            </TabPane>
                            <TabPane tab="渲染" key="2">
                                <Render/>
                            </TabPane>
                            <TabPane tab="危险" key="3">
                                <Danger/>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={6} style={{padding: '0 10px'}}>
                        {/*<Card title="帮助">*/}
                        {/*<p>专题默认不启用，配置好模板后点击启用，首页生效</p>*/}
                        {/*</Card>*/}
                        <ModuleTools/>
                    </Col>
                </Row>
            </div>
        );
    }
}

