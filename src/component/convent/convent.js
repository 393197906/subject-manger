import React, {Component} from 'react';
import {Card, Button, Row, Col, Form, Input, InputNumber, message} from 'antd';
import  API from '../../service/service'
import pubsub from 'pubsub-js'

const FormItem = Form.Item;
export default class Convent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveLoading: false,
            subject_name: '',
            subject_active: 0,
            subject_describe: '',
            subject_order: 0,
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            subject_name,
            subject_active,
            subject_order,
            subject_describe
        } = nextProps.subjectData;
        this.setState({
            subject_name, subject_active, subject_order, subject_describe
        });
    }

    _changeValue(index, e) {
        const value = e.target.value;
        this.setState({
            [index]: value
        })
    }

    _changeActive(subject_active, e) {
        this.setState({
            subject_active
        })

    }

    _changeOrder(subject_order) {
        this.setState({
            subject_order
        })
    }

    async _save() {
        this.setState({saveLoading: true});
        const subject_id = this.props.subjectData.subject_id;
        const {
            subject_name, subject_active,
            subject_order,
            subject_describe
        } = this.state;
        try {
            await  API.updata_subject_info({
                subject_name, subject_active, subject_id,
                subject_order,
                subject_describe
            });
            pubsub.publish('LEFT_UPDATE');
        } catch (err) {
            message.error(err);
        }
        this.setState({saveLoading: false});

    }


    render() {
        return (
            <div >
                <Card title="启用">
                    {
                        parseInt(this.state.subject_active) ?
                            <Row type="flex" justify="center" align="middle">
                                <Col span={16}>该专题已启用</Col>
                                <Col span={8} style={{textAlign: 'right'}}>
                                    <Button type={'danger'} onClick={this._changeActive.bind(this, 0)}>停用</Button>
                                </Col>
                            </Row> :
                            <Row type="flex" justify="center" align="middle">
                                <Col span={16}>该专题已停用</Col>
                                <Col span={8} style={{textAlign: 'right'}}>
                                    <Button type={'success'} onClick={this._changeActive.bind(this, 1)}>启用</Button>
                                </Col>
                            </Row>
                    }

                </Card>
                <Card title="专题信息" style={{marginTop: '10px'}}>
                    <Form>
                        <FormItem label="专题名称">
                            <Input placeholder="专题名称" value={this.state.subject_name}
                                   onChange={this._changeValue.bind(this, 'subject_name')}/>
                        </FormItem>
                        <FormItem label="专题描述">
                            <Input placeholder="专题描述" value={this.state.subject_describe}
                                   onChange={this._changeValue.bind(this, 'subject_describe')}/>
                        </FormItem>
                        <FormItem label="专题排序(1-100)">
                            <InputNumber min={1} max={100} value={this.state.subject_order}
                                         onChange={this._changeOrder.bind(this)}/>
                        </FormItem>
                        <FormItem >
                            <Button type="primary" onClick={this._save.bind(this)}
                                    loading={this.state.saveLoading}>保存</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

