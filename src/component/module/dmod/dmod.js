import React from 'react';
import {Row, Col} from 'antd';
import './dmod.css'
import '../module.css'
import Base from '../base'

export default class dmod extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row type="flex" justify='space-around' className="module-card"
                 {...this._cellComProp(0, 'style')}
            >
                <Col span="24" className='module-card-title'>
                    <span    {...this._cellComProp(0, 'click')}>静态模块D</span>
                </Col>
                <Col span='8' className='dmod-cell-1 module-cell'
                     {...this._cellComProp(1)}
                >
                    图片1
                </Col>
                <Col span='16'>
                    <Row>
                        <Col span='24' className='dmod-cell-2 module-cell'
                             {...this._cellComProp(2)}
                        >图片2</Col>
                        <Col span='24' className='dmod-cell-2 module-cell'
                             {...this._cellComProp(3)}
                        >图片3</Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

