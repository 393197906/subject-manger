import React, {Component} from 'react';
import {Card, Button, Row, Col, Form, Input, Radio} from 'antd';
import pubsub from 'pubsub-js'
import '../render.css'
import Mupload from '../../common/upload/upload'

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


export default class FormImg extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
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
            </div>
        );
    }
}

