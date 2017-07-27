import React, {Component} from 'react';
import {Card, Button, Row, Col, Form, Input, InputNumber} from 'antd';
import './nav.css'
import '../module.css'
import Base from '../base'

const listData = [];
for (let i = 1; i <= 8; i++) {
    listData.push({
        id: i,
        name: `导航${i}`
    })
}
export default class Swiper extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row type="flex" justify='space-around' className="module-card"
                 {...this._cellComProp(0, 'style')}
            >
                <Col span="24" className='module-card-title'>
                    <span   {...this._cellComProp(0, 'click')}>导航</span>
                </Col>
                {
                    listData.map((item) => (
                        <Col
                            span="5"
                            className="module-cell nav-cell"
                            {...this._cellComProp(item.id)}
                        ><span>{item.name}</span></Col>
                    ))
                }
            </Row>
        );
    }
}

