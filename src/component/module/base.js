/**
 * Created by mr.xie on 2017/7/19.
 */
import React, {Component} from 'react';
import {Card, Button, Row, Col, Form, Input, InputNumber} from 'antd';

export default class Base extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: -1
        }
    }

    active = {
        borderColor: '#1DA57A'
    };

    _cellComProp = (key, type) => {
        const style = this.state.active === key && this.props.operate ? this.active : null;
        const onClick = this._changeActive.bind(this, key);
        if (type === 'style') {
            return {style}
        }
        if (type === 'click') {
            return {onClick}
        }
        return {style, onClick}
    };

    _changeActive(active, e) {
        e.preventDefault();
        if (!this.props.operate) {
            this.setState({active: -1});
            this.props.fetchOpera();
            return;
        }
        if (active === this.state.active) {
            this.setState({active: -1});
            return;
        }
        this.setState({active})
    }

}

