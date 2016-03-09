import React, { PropTypes, Component } from 'react';
import noop from 'lodash/noop';


export default class FootRow extends Component {
  static propTypes = {
    works: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    onChangeWorkName: PropTypes.func.isRequired,
    onAddWorkName: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onChangeWorkName: noop,
    onAddWorkName: noop,
  }

  renderWork = (hour, index) => {
    return (
      <td className="media-middle text-xs-center cell" key={index}>{hour}</td>
    );
  }

  render() {
    const works = this.props.works;
    const hours = works.map(work => {
      const hour = [...Object.values(work.dates)].reduce((accu, _hour) => {
        const _accu = accu + parseInt(_hour, 10) || 0;
        return _accu;
      }, 0);
      return hour;
    });
    const total = hours.reduce((accu, _hour) => {
      const _accu = accu + _hour;
      return _accu;
    }, 0);

    return (
      <tr>
        <td className="media-middle text-xs-center cell">{total}</td>
        {hours.map(this.renderWork)}
      </tr>
    );
  }
}
