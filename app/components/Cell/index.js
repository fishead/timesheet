import React, { PropTypes, Component } from 'react';
import noop from 'lodash/noop';


export default class Cell extends Component {
  static propTypes = {
    hour: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    hour: 0,
    onChange: noop,
  }

  state = {
    hour: this.props.hour,
    editing: false,
  }

  componentWillMount() {
    this.setState({
      hour: this.props.hour,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hour !== this.props.hour) {
      this.setState({
        hour: nextProps.hour,
      });
    }
  }

  setEditingMode = () => {
    this.setState({
      editing: true,
    });
  }

  leaveEditingMode = () => {
    this.setState({
      editing: false,
    });
    this.props.onChange(this.state.hour);
  }

  changeWorkHour = (evt) => {
    this.setState({
      hour: evt.target.value,
    });
  }

  selectText = (evt) => {
    evt.target.select();
  }

  render() {
    const { editing, hour } = this.state;

    if (editing) {
      return (
        <td className="media-middle text-xs-center cell cell-editing">
          <input autoFocus value={hour} onChange={this.changeWorkHour}
            onBlur={this.leaveEditingMode} onFocus={this.selectText}
          />
        </td>
      );
    }

    return (
      <td onClick={this.setEditingMode} className="media-middle text-xs-center cell">{hour}</td>
    );
  }
}
