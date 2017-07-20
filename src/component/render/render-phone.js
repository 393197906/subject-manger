import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';
import './render.css'
import {Swiper, Nav, Amod, Bmod, Cmod, Dmod} from '../module/index'
const lib = {Swiper, Nav, Amod, Bmod, Cmod, Dmod}

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
            priviewData: []
        }
    }

    _haveOpera(num) {
        this.setState({operaceNum: num})
    }

    render() {
        const {connectDropTarget, isOver, canDrop, children} = this.props;

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
                                 fetchOpera={this._haveOpera.bind(this, index)} key={index}/>
                        )
                    })
                }

                {/*<Swiper operate={this.state.operaceNum === 0}*/}
                {/*fetchOpera={this._haveOpera.bind(this, 0)}/>*/}
                {/*<Nav operate={this.state.operaceNum === 1}*/}
                {/*fetchOpera={this._haveOpera.bind(this, 1)}/>*/}
                {/*<Amod operate={this.state.operaceNum === 2}*/}
                {/*fetchOpera={this._haveOpera.bind(this, 2)}/>*/}
                {/*<Bmod operate={this.state.operaceNum === 3}*/}
                {/*fetchOpera={this._haveOpera.bind(this, 3)}/>*/}
                {/*<Cmod operate={this.state.operaceNum === 4}*/}
                {/*fetchOpera={this._haveOpera.bind(this, 4)}/>*/}
                {/*<Dmod operate={this.state.operaceNum === 5}*/}
                {/*fetchOpera={this._haveOpera.bind(this, 5)}/>*/}
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

