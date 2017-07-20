import React, {Component} from 'react';
import {Card, Button, Row, Col, Form, Input, InputNumber} from 'antd';

const FormItem = Form.Item;
export default class Convent extends Component {
    render() {
        return (
            <div >
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
            </div>
        );
    }
}

