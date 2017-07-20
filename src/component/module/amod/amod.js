import React, {Component} from 'react';
import {Card, Button, Row, Col, Form, Input, InputNumber} from 'antd';
import './amod.css'
import '../module.css'
import Base from '../base'


export default class Amod extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row type="flex" justify='space-around' className="module-card"
                 {...this._cellComProp(0, 'style')}
            >
                <Col span="24" className='module-card-title'>
                    <span {...this._cellComProp(0, 'click')}>静态模块A</span>
                </Col>
                <Col
                    span="24"
                    className="module-cell amod-cell"
                    {...this._cellComProp(1)}
                >图片1</Col>
            </Row>
        );
    }
}

