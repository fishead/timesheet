import React, { PropTypes, Component } from 'react';
import Cell from '../Cell';
import noop from 'lodash/noop';


export default class Row extends Component {
  static propTypes = {
    works: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    day: PropTypes.string.isRequired,
    onChangeWorkHour: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onChangeWorkHour: noop,
  }

  renderHeaderCell = day => (work, index) => {
    return (
      <Cell key={index} day={day} hour={work.hour || 0} onChange={this.props.onChangeWorkHour(work)} />
    );
  }

  render() {
    const { works, day } = this.props;

    return (
      <tr>
        <td className="media-middle text-xs-center cell">{day}</td>
        {works.map(this.renderHeaderCell(day))}
      </tr>
    );
  }
}
