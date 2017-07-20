import React, {Component} from 'react';
import {Button, Popover} from 'antd';
import {DragSource} from 'react-dnd';
import './module-tools.css'
import {Swiper, Nav, Amod, Bmod, Cmod, Dmod} from '../../module/index'
const lib = {Swiper, Nav, Amod, Bmod, Cmod, Dmod};

class ModuleToolsCell extends Component {

    render() {
        const {connectDragSource, isDragging} = this.props;
        const Hover = lib[this.props.priview];
        return connectDragSource(
            <div style={{marginBottom: '5px'}}>
                <Popover content={<Hover/>} placement="left"
                         overlayClassName="priview-module">
                    <Button style={{width: '100%'}}>{this.props.name}</Button>
                </Popover>
            </div>
        );
    }
}
ModuleToolsCell.defaultProps = {
    priview: null,
    name: '组件名称'
};

ModuleToolsCell.PropTypes = {
    priview: React.PropTypes.object.isRequired,
    name: React.PropTypes.string.isRequired,

    connectDragSource: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
};

export default  DragSource('module-cell', {
    beginDrag(props) {
        return props
    },
}, (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
})(ModuleToolsCell);
