import React, {Component} from 'react';
import {Card, Button, Row, Col, Form, Input, Radio} from 'antd';
import './render.css'
import {Swiper, Nav, Amod, Bmod, Cmod, Dmod} from '../module/index'
import Mupload from '../common/upload/upload'

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


export default class Render extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneHeight: 0,
            phonePaddingTop: 0,
            phonePaddingLeft: 0,
            phoneContentWidth: 0,
            phoneContentHeight: 0,
            operaceNum: 0
        }
    }

    componentDidMount() {
        let phoneWidth = this.refs.renderPhone.offsetWidth;
        let phoneHeight = phoneWidth * 777 / 367;
        let phonePaddingTop = 124 / 777 * phoneHeight;
        let phonePaddingLeft = 24 / 367 * phoneWidth;
        let phoneContentWidth = phoneWidth - 10 - 2 * phonePaddingLeft;
        let phoneContentHeight = phoneHeight - 20 - 2 * phonePaddingTop;
        this.setState({phoneHeight, phonePaddingTop, phonePaddingLeft, phoneContentWidth, phoneContentHeight})
    }

    _haveOpera(num) {
        this.setState({operaceNum: num})
    }

    render() {
        return (
            <div >
                <Card title="渲染骨架">
                    <Row type='flex' justify='space-between'>
                        <Col span={13}>
                            <div className="render-phone" style={
                                {
                                    height: this.state.phoneHeight,
                                    paddingTop: this.state.phonePaddingTop,
                                }
                            }
                                 ref="renderPhone">
                                <div
                                    className="render-phone-content"
                                    style={{
                                        width: this.state.phoneContentWidth,
                                        height: this.state.phoneContentHeight
                                    }}
                                >
                                    <Swiper operate={this.state.operaceNum === 0}
                                            fetchOpera={this._haveOpera.bind(this, 0)}/>
                                    <Nav operate={this.state.operaceNum === 1}
                                         fetchOpera={this._haveOpera.bind(this, 1)}/>
                                    <Amod operate={this.state.operaceNum === 2}
                                          fetchOpera={this._haveOpera.bind(this, 2)}/>
                                    <Bmod operate={this.state.operaceNum === 3}
                                          fetchOpera={this._haveOpera.bind(this, 3)}/>
                                    <Cmod operate={this.state.operaceNum === 4}
                                          fetchOpera={this._haveOpera.bind(this, 4)}/>
                                    <Dmod operate={this.state.operaceNum === 5}
                                          fetchOpera={this._haveOpera.bind(this, 5)}/>
                                </div>
                            </div>
                        </Col>
                        <Col span={9}>
                            <Form>
                                <FormItem label="细胞模型" layout="vertical">
                                    <RadioGroup defaultValue="a">
                                        <RadioButton value="a">商品</RadioButton>
                                        <RadioButton value="b">活动</RadioButton>
                                        <RadioButton value="c">分类</RadioButton>
                                        <RadioButton value="d">搜索</RadioButton>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem label="主键" layout="vertical">
                                    <Input type='number' placeholder="请输入模型主键"/>
                                </FormItem>
                                <FormItem label="搜索关键词" layout="vertical">
                                    <Input placeholder="输入搜索关键词"/>
                                </FormItem>
                                <FormItem label="描述" layout="vertical">
                                    <Input placeholder="输入搜索关键词"/>
                                </FormItem>
                                <FormItem label="细胞图片" layout="vertical">
                                    <Mupload/>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}

