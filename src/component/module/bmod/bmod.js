import React from 'react';
import {Row, Col} from 'antd';
import './bmod.css'
import '../module.css'
import Base from '../base'


export default class Bmod extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row type="flex" justify='space-around' className="module-card"
                 {...this._cellComProp(0, 'style')}
            >
                <Col span="24" className='module-card-title'>
                    <span   {...this._cellComProp(0, 'click')}>静态模块B</span>
                </Col>
                <Col span="12" className='module-cell bmod-cell' {...this._cellComProp(1)}>
                    图片1
                </Col>
                <Col span="12" className='module-cell bmod-cell'  {...this._cellComProp(2)}>
                    图片2
                </Col>
            </Row>
        );
    }
}

