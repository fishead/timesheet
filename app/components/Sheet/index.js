import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import HeadRow from '../HeadRow';
import FootRow from '../FootRow';
import Row from '../Row';


export default class Sheet extends Component {
  static propTypes = {
    children: PropTypes.object,
  }

  static defaultProps = {
    works: [
      {
        name: 'math',
        dates: { },
      },
      {
        name: 'history',
        dates: { },
      },
    ],
  }

  state = this.props

  addWorkName = (workName = '未命名') => () => {
    this.setState({
      works: [
        ...this.state.works,
        { name: workName, dates: {} },
      ],
    });
  }

  changeWorkName = work => newName => {
    const works = this.state.works;
    const workIndex = works.indexOf(work);
    this.setState({
      works: [
        ...works.slice(0, workIndex),
        {
          ...work,
          name: newName,
        },
        ...works.slice(workIndex + 1),
      ],
    });
  }

  changeWorkHour = day => work => hour => {
    const works = this.state.works;
    const workIndex = works.indexOf(work);
    this.setState({
      works: [
        ...works.slice(0, workIndex),
        {
          ...work,
          dates: {
            ...work.dates,
            [day]: hour,
          },
        },
        ...works.slice(workIndex + 1),
      ],
    });
  }


  renderDate = works => day => {
    return (
      <Row key={day} day={day} works={works} onChangeWorkHour={this.changeWorkHour(day)} />
    );
  }

  render() {
    const works = this.state.works;
    const monthStart = moment().startOf('month');
    const monthEnd = moment().endOf('month');
    const days = [];

    while (!monthEnd.isSame(monthStart, 'day')) {
      days.push(monthStart.format('YYYY-MM-DD'));
      monthStart.add(1, 'days');
    }

    return (
      <table className="table table-bordered">
        <thead>
          <HeadRow works={works} onChangeWorkName={this.changeWorkName} onAddWorkName={this.addWorkName} />
        </thead>

        <tfoot>
          <FootRow works={works} />
        </tfoot>

        <tbody>
          {days.map(this.renderDate(works))}
        </tbody>
      </table>
    );
  }
}
