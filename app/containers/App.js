import React, { Component } from 'react';
import style from './App.css';
import Url from '../components/Url';
import Divident from '../components/Divident';
import Divisor from '../components/Divisor';
import Ratio from '../components/Ratio';
import DetailedResults from '../components/DetailedResults';

const getNumberOfOccurence = (divident, divisor) => {
  const str = document.body.innerText;
  const calculateForOneArray = string => (
    string.split(',').map(el => ({
      name: el,
      number: str.match(new RegExp(el, 'ig')).length
    }))
  );
  const result = {
    divident: calculateForOneArray(divident),
    divisor: calculateForOneArray(divisor)
  };
  console.log(result);
  return result;
};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      url: '',
      divident: ['front', 'javascript'],
      divisor: ['gitignore'],
      result: '',
      ratio: 0
    };
    this.onUrlChange = this.onUrlChange.bind(this);
    this.onDividentChange = this.onDividentChange.bind(this);
    this.onDivisorChange = this.onDivisorChange.bind(this);
  }

  componentWillMount() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      this.setState({
        url: tabs[0].url
      });
    });
  }

  componentDidMount() {
    this.checkRatio();
  }

  onUrlChange(url) {
    this.setState({
      url
    });
    this.checkRatio();
  }
  onDividentChange(newDivident) {
    this.setState({
      divident: newDivident
    });
  }
  onDivisorChange(newDivisor) {
    this.setState({
      divisor: newDivisor
    });
  }
  getRatio() {
    const calculateSum = (arr) => {
      if (!arr || arr.length === 0) {
        return 1;
      }
      if (arr.length === 1) {
        return arr[0].number;
      }
      return arr.reduce((a, b) => (a.number + b.number));
    };
    const sumDivident = calculateSum(this.state.result.divident);
    const sumDivisor = calculateSum(this.state.result.divisor);
    console.log(sumDivident);
    console.log(sumDivisor);
    if (sumDivisor !== 0) {
      return sumDivident / sumDivisor;
    }
    return sumDivident;
  }
  checkRatio() {
    const string = `(${getNumberOfOccurence})('${this.state.divident}','${this.state.divisor}')`;
    chrome.tabs.executeScript(
      {
        code: string
      },
      (results) => {
        this.setState({ result: results[0] });
      });
  }

  render() {
    return (
      <div className={style.normal}>
        <h1>AGILE BULLSHIT DETECTOR</h1>
        <Url url={this.state.url} onChange={this.onUrlChange} />
        <Divident data={this.state.divident} onChange={this.onDividentChange} />
        <Divisor data={this.state.divisor} onChange={this.onDivisorChange} />
        <Ratio data={this.getRatio()} />
        {
          this.state.result &&
          <DetailedResults data={this.state.result} />
        }
      </div>
    );
  }
}
