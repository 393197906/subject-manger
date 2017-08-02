/**
 * Created by mr.xie on 2017/7/19.
 */
import {Component} from 'react';
import pubsub from 'pubsub-js'

export default class Base extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.active === undefined ? -1 : this.props.active
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    active = {
        borderColor: '#1DA57A'
    };

    _cellComProp = (key, type) => {
        console.log(this.props);
        let style = this.state.active === key && this.props.operate ? this.active : null;
        if (this.props.data[key]) { //设置背景图片
            if (this.props.data[key].image_url) {
                let b_imag = {
                    backgroundImage: `url('${this.props.data[key].image_url}')`
                };
                style = {...style, ...b_imag};
            }
        }
        const onClick = this._changeActive.bind(this, key);
        if (type === 'style') {
            return {style}
        }
        if (type === 'click') {
            return {onClick}
        }
        if (type === 'height') {
            return {style: {...style, height: `${this.props.data[key][type]}px`}, onClick}
        }
        return {style, onClick}
    };

    _changeActive(active, e) {
        e.preventDefault();
        pubsub.publish('RENDER_FORM_JS_UPDATE_FROM', {
            level: this.props.level,
            countLevel: this.props.countLevel,
            cell: active,
            formData: this.props.data[active]
        });
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

