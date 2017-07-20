import React, {Component} from 'react';
import {Tabs, Card, Button, Row, Col, Form, Input, InputNumber} from 'antd';
import './middle.css'


const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
export default class Middle extends Component {
    render() {
        return (
            <div className="middle">
                <Tabs defaultActiveKey="1"
                      tabPosition="left"
                >

                    <TabPane tab="常规" key="1">
                        <Card title="启用">
                            <Row type="flex" justify="center" align="middle">
                                <Col span={16}>该专题已启用</Col>
                                <Col span={8} style={{textAlign: 'right'}}>
                                    <Button type={'danger'}>停用</Button>
                                </Col>
                            </Row>
                        </Card>
                        <Card title="专题信息" style={{marginTop: '10px'}}>
                            <Form>
                                <FormItem label="专题名称">
                                    <Input placeholder="专题名称"/>
                                </FormItem>
                                <FormItem label="专题描述">
                                    <Input placeholder="专题描述"/>
                                </FormItem>
                                <FormItem label="专题排序">
                                    <InputNumber min={1} max={100} defaultValue={1}/>
                                </FormItem>
                                <FormItem >
                                    <Button type="primary">保存</Button>
                                </FormItem>
                            </Form>
                        </Card>
                    </TabPane>
                    <TabPane tab="渲染" key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="危险" key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
            </div>
        );
    }
}

