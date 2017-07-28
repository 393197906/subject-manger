import React, {Component} from 'react';
import {Button, Popover} from 'antd';
import {DragSource} from 'react-dnd';
import './module-tools.css'
import {Swiper, Nav, Amod, Bmod, Cmod, Dmod} from '../../module/index'
const lib = {Swiper, Nav, Amod, Bmod, Cmod, Dmod};


const factory_kong_obj = (num = 0) => {
    const obj = {};
    for (let i = 1; i <= num; i++) {
        obj[i] = {};
    }
    return obj;
};
const initData = {
    Swiper: factory_kong_obj(6),
    Nav: factory_kong_obj(8),
    // Nav: {
    //     1: {primary_key: '1111'},
    //     2: {primary_key: '2222'},
    // },
    Amod: factory_kong_obj(1),
    Bmod: factory_kong_obj(2),
    Cmod: factory_kong_obj(3),
    Dmod: factory_kong_obj(3),
};

// console.log(initData);


class ModuleToolsCell extends Component {
    render() {
        const {connectDragSource, isDragging} = this.props;
        const Hover = lib[this.props.priview];
        return connectDragSource(
            <div style={{marginBottom: '5px'}}>
                <Popover content={<Hover data={initData[this.props.priview]}/>} placement="left"
                         overlayClassName="priview-module">
                    <Button style={{width: '100%'}}>{this.props.name}</Button>
                </Popover>
            </div>
        );
    }
}
ModuleToolsCell.defaultProps = {
    priview: null,
    name: '组件名称',
};

ModuleToolsCell.PropTypes = {
    priview: React.PropTypes.object.isRequired,
    name: React.PropTypes.string.isRequired,

    connectDragSource: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
};

export default  DragSource('module-cell', {
    beginDrag(props) {
        return {
            ...props,
            data: initData[props.priview]
        }
    },
}, (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
})(ModuleToolsCell);

