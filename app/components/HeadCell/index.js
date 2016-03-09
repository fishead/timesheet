import React, { PropTypes, Component } from 'react';
import noop from 'lodash/noop';


export default class HeadCell extends Component {
  static propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    name: 'untitled',
    onChange: noop,
  }

  state = {
    editing: false,
    name: this.props.name,
  }

  componentWillMount() {
    this.setState({
      name: this.props.name,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.name !== this.props.name) {
      this.setState({
        name: nextProps.name,
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
    this.props.onChange(this.state.name);
  }

  changeWorkName = (evt) => {
    this.setState({
      name: evt.target.value,
    });
  }

  render() {
    const { editing, name } = this.state;

    if (editing) {
      return (
        <td className="media-middle text-xs-center cell cell-editing">
          <input autoFocus value={name} onChange={this.changeWorkName} onBlur={this.leaveEditingMode} />
        </td>
      );
    }

    return (
      <td onClick={this.setEditingMode} className="media-middle text-xs-center cell">{name}</td>
    );
  }
}
