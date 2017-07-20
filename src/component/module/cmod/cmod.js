import React, {Component} from 'react';
import {Card, Button, Row, Col, Form, Input, InputNumber} from 'antd';
import './cmod.css'
import '../module.css'
import Base from '../base'


export default class Cmod extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row type="flex" justify='space-around' className="module-card"
                 {...this._cellComProp(0, 'style')}
            >
                <Col span="24" className='module-card-title'>
                    <span {...this._cellComProp(0, 'click')}>静态模块C</span>
                </Col>
                <Col
                    span="8"
                    className="module-cell cmod-cell-2"
                    {...this._cellComProp(2)}
                >图片2</Col>
                <Col
                    span="8"
                    className="module-cell cmod-cell-2"
                    {...this._cellComProp(3)}
                >图片3</Col>
                <Col
                    span="8"
                    className="module-cell cmod-cell-2"
                    {...this._cellComProp(4)}
                >图片4</Col>
            </Row>
        );
    }
}

