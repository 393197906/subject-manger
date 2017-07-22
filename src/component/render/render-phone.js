import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';
import {message} from 'antd';
import './render.css'
import pubsub from 'pubsub-js'
import {Swiper, Nav, Amod, Bmod, Cmod, Dmod,} from '../module/index'
const lib = {Swiper, Nav, Amod, Bmod, Cmod, Dmod};

class RenderPhone extends Component {
    static propTypes = {
        isOver: React.PropTypes.bool.isRequired,
        canDrop: React.PropTypes.bool.isRequired,
        connectDropTarget: React.PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            operaceNum: 0,
            priviewData: [
                {
                    name: '导航',
                    priview: 'Nav',
                    data: {}
                },

            ]
        }
    }

    __layoutData({level, direction}) {
        const data = this.state.priviewData;
        data[level].active = 0;
        let opera;
        if (direction === 'up') {
            opera = level - 1;
        } else if (direction === 'down') {
            opera = level + 1;
        }
        let temp = data[opera];
        data[opera] = data[level];
        data[level] = temp;
        this.setState({
            priviewData: data,
            operaceNum: opera
        })
    }

    componentDidMount() {
        pubsub.subscribe('RENDER_PHONE_JS_LAYOUT_PHONE', (msg, {level, direction}) => {
            if (level === 0 && direction === 'up') {
                message.error('已是第一个节点元素');
                return;
            }
            if (level === this.state.priviewData.length - 1 && direction === 'down') {
                message.error('已是最后一个节点元素');
                return;
            }
            this.__layoutData({level, direction});
        });
        pubsub.subscribe('RENDER_PHONE_JS_REMOVE_OF_PHONE', (msg, {}) => {
            alert('remove');
        });

        pubsub.subscribe('RENDER_PHONE_JS_UPDATE', (msg, {level, cell, cellData}) => {
            const priviewData = this.state.priviewData;
            const levelData = priviewData[level];
            if (!levelData.data) {
                levelData.data = {
                    [cell]: {
                        [cellData.key]: cellData.value
                    }
                }
            } else {
                if (!levelData.data[cell]) {
                    levelData.data[cell] = {};
                }
                levelData.data[cell][cellData.key] = cellData.value;
            }
            console.log(levelData);
        })
    }

    componentWillUnmount() {
        pubsub.unsubscribe('RENDER_PHONE_JS_REMOVE_OF_PHONE');
        pubsub.unsubscribe('RENDER_PHONE_JS_LAYOUT_PHONE');
        pubsub.unsubscribe('RENDER_PHONE_JS_UPDATE');
    }


    _haveOpera(num) {
        this.setState({operaceNum: num})
    }

    render() {
        const {connectDropTarget, isOver, canDrop, children} = this.props;
        const countLevel = this.state.priviewData.length;
        return connectDropTarget(
            <div
                className="render-phone-content"
                style={{
                    width: this.props.phoneContentWidth,
                    height: this.props.phoneContentHeight,
                    backgroundColor: !isOver && canDrop ? 'rgba(255,255,0,.5)' : isOver && canDrop ? 'rgba(0,255,153,.5)' : '#fff'
                }}
            >

                {
                    this.state.priviewData.map((item, index) => {
                        let Dom = lib[item.priview];
                        return (
                            <Dom operate={this.state.operaceNum === index}
                                 active={item.active === undefined ? -1 : item.active}
                                 level={index} countLevel={countLevel}
                                 fetchOpera={this._haveOpera.bind(this, index)} key={index}/>
                        )
                    })
                }
            </div>
        );
    }
}

export default  DropTarget('module-cell', {
    canDrop(props) {
        return true;
    },
    drop(props, monitor, component) {
        const item = monitor.getItem();
        const priviewData = [...component.state.priviewData, item];
        console.log(priviewData);
        component.setState({
            priviewData
        })

    },
}, (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    };
})(RenderPhone)

