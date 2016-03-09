import React, { PropTypes, Component } from 'react';
import noop from 'lodash/noop';
import HeadCell from '../HeadCell';


export default class HeadRow extends Component {
  static propTypes = {
    works: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    onChangeWorkName: PropTypes.func.isRequired,
    onAddWorkName: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onChangeWorkName: noop,
    onAddWorkName: noop,
  }

  renderHeaderCell = (work, index) => {
    return (
      <HeadCell key={index} name={work.name} onChange={this.props.onChangeWorkName(work)} />
    );
  }

  render() {
    const works = this.props.works;

    return (
      <tr>
        <th className="media-middle text-xs-center cell"></th>
        {works.map(this.renderHeaderCell)}
        <th className="media-middle text-xs-center cell" onClick={this.props.onAddWorkName()}>+</th>
      </tr>
    );
  }
}
