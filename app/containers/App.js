import React, {Component} from 'react';
import $ from 'jquery';
import style from './App.css';
import Url from '../components/Url';
import WordList from '../components/WordList';
import Ratio from '../components/Ratio';
import DetailedResults from '../components/DetailedResults';

const getNumberOfOccurence = (divident, divisor) => {
  const str = document.querySelector('.core-rail').innerHTML;
  const calculateForOneArray = string => (
    string.split(',').map((el) => {
      const number = str.match(new RegExp(el, 'ig')) ? str.match(new RegExp(el, 'ig')).length : 0;
      return ({
        name: el,
        number
      });
    })
  );
  const result = {
    divident: calculateForOneArray(divident),
    divisor: calculateForOneArray(divisor)
  };
  return result;
};

const scanPage = () => {
  const clear = () => {
    clearInterval(window.scrollDown);
    document.body.scrollTop = 0;
  };
  if (!window.scrollDown) {
    window.scrollDown = setInterval(() => {
      window.scrollTo(0, window.pageYOffset + 100);
    }, 100);
    const b = window.onmousewheel;
    window.onmousewheel = (ev) => {
      ev.wheelDeltaY > 0 && (window.scrollDown = clear(), window.onmousewheel = b),
      b && b.call(window, ev);
    };
  } else {
    clear();
  }
};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      url: '',
      divident: ['agile', 'scrum'],
      divisor: ['project manager', 'management'],
      result: '',
      loading: true,
      ratio: 0
    };
    this.checkRatio = this.checkRatio.bind(this);
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
    this.scanPage();
    setTimeout(
      () => (this.checkRatio()),
      1000);
  }

  onUrlChange(url) {
    this.setState({
      url
    }, () => (this.checkRatio()));
  }

  onDividentChange(newDivident) {
    this.setState({
      divident: newDivident
    }, () => (this.checkRatio()));
  }

  onDivisorChange(newDivisor) {
    this.setState({
      divisor: newDivisor
    }, () => (this.checkRatio()));
  }

  getRatio() {
    const calculateSum = (arr) => {
      if (!arr || arr.length === 0) {
        return 'does not exist';
      }
      if (arr.length === 1) {
        return arr[0].number;
      }
      let result = 0;
      for (let i = 0; i < arr.length; i += 1) {
        result += arr[i].number;
      }
      return result;
    };
    const sumDivident = calculateSum(this.state.result.divident);
    const sumDivisor = calculateSum(this.state.result.divisor);
    if (sumDivisor !== 0) {
      return (sumDivident / sumDivisor).toFixed(2);
    }
    return sumDivident;
  }

  scanPage() {
    const string = `(${scanPage})()`;
    chrome.tabs.executeScript(
      {
        code: string
      }
    );
  }

  checkRatio() {
    if (this.state.divisor.length === 0 || this.state.divident.length === 0) {
      this.setState({ result: '' });
      return;
    }
    const string = `(${getNumberOfOccurence})('${this.state.divident}','${this.state.divisor}')`;
    chrome.tabs.executeScript(
      {
        code: string
      },
      (results) => {
        this.setState({result: results[0], loading: false});
      });
  }

  render() {
    return (
      <div className={style.normal}>
        <h1>AGILE FAKEMETER</h1>
        <Url url={this.state.url} onChange={this.onUrlChange} />
        <WordList data={this.state.divident} onChange={this.onDividentChange} />
        <WordList data={this.state.divisor} onChange={this.onDivisorChange} />
        <div className={style.again} onClick={this.checkRatio}>refresh</div>
        {
          this.state.loading ?
            (
              <div className={style.loader}>
                <div style={{width: '100%', height: '100%'}} className={style.ring}>
                  <div />
                </div>
              </div>
            ) :
            (
              <div>
                <Ratio data={this.getRatio()}/>
                {
                  this.state.result &&
                  <DetailedResults data={this.state.result}/>
                }
              </div>
            )
        }
      </div>
    );
  }
}
