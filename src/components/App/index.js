import React from 'react';
import * as Utils from '../../utils';
import Constants from '../../utils/constants';
import Button from '../Button';

import './index.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      value: null,
      displayValue: '0',
      operator: null,
      waitingForOperand: false,
      scientificMode: false,
      toggleSign: false,
      showLightBg: true
    }
  }

  handleDigitClick = digit => {
    const { displayValue, waitingForOperand } = this.state;
    if (waitingForOperand) {
      this.setState({
        displayValue: digit.toString(),
        waitingForOperand: false
      })
    } else {
      this.setState({
        displayValue: displayValue === '0' ? digit.toString() : displayValue.toString() + digit.toString()
      })
    }
  }

  handleOperatorClick = nextOperator => {    
    const { value, displayValue, operator } = this.state
    const inputValue = parseInt(displayValue);
    
    if (value == null) {
      this.setState({ value: inputValue })
    } else if (operator) {
      const currentValue = value || 0
      const newValue = Utils.calculateOperations[operator](currentValue, inputValue)
      
      this.setState({ value: newValue, displayValue: String(newValue) })
    }
    
    this.setState({ waitingForOperand: true, operator: nextOperator })
  }

  handleScientificCommand = cmd => {
    const { displayValue } = this.state;
    if(displayValue.length) {
      switch (cmd) {
        case Constants.SCIENTIFIC_COMMANDS.sign:
        this.setState({ displayValue: displayValue[0] === '-' ? displayValue.slice(1) : '-' + displayValue})
        break;

        case Constants.SCIENTIFIC_COMMANDS.square:
        this.setState({ displayValue: displayValue*displayValue })
        break;

        case Constants.SCIENTIFIC_COMMANDS.sqRoot:
        this.setState({ displayValue: Math.sqrt(displayValue)});
        break;
      }
    }
  }

  onClearClick = () => {
    this.setState({
      value:  null,
      displayValue: '0',
      operator: null,
      waitingForOperand: false
    });
  }

  toggleScientificMode = () => {
    this.setState({ scientificMode: !this.state.scientificMode })
  }

  toggleThemesButton = () => {
    this.setState({ showThemeButtons: !this.state.showThemeButtons })
  } 

  toggleLightMode = theme => {
    this.setState({ showLightBg: theme === Constants.THEMES.light});
  }

  renderSymbol = sym => {
    return <Button key={sym} onClick={() => this.handleOperatorClick(sym)} value={sym} />;
  }

  renderDigit = value => {
    return <Button key={value} onClick={() =>this.handleDigitClick(value)} value={value} />;
  }

  render() {
    return (
      <div className= 'app' style={{ backgroundColor: this.state.showLightBg ? '#fff' : '#000' }}>
        <input className='input' value={this.state.displayValue} />
        <div className='buttonContainer'>
          {[1,2,3,4,5,6,7,8,9,0].map(num => this.renderDigit(num))}

          {['+', '-', '*', '/', '='].map(sym => this.renderSymbol(sym))}

          <Button onClick={this.onClearClick} value='Clear' />
          <Button onClick={this.toggleScientificMode} value='Scientific Mode' />
          <Button onClick={this.toggleThemesButton} value='Theme' />
          {
            this.state.scientificMode && (
              <>
                <Button onClick={() => this.handleScientificCommand(Constants.SCIENTIFIC_COMMANDS.sign)} value='Sign' />
                <Button onClick={() => this.handleScientificCommand(Constants.SCIENTIFIC_COMMANDS.square)} value='Square' />
                <Button onClick={() => this.handleScientificCommand(Constants.SCIENTIFIC_COMMANDS.sqRoot)} value='Square root' />
              </>
            )
          }
          {
            this.state.showThemeButtons && (
              <>
                <Button onClick={() => this.toggleLightMode(Constants.THEMES.light)} value='Light' />
                <Button onClick={() => this.toggleLightMode(Constants.THEMES.dark)} value='Dark' />
              </>
            )
          }
        </div>
      </div>
    )
  }
}

export default App;
