class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.perviousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return 
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }


    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
          case '+':
            computation = prev + current
            break
          case '-':
            computation = prev - current
            break
          case '*':
            computation = prev * current
            break
          case '÷':
            computation = prev / current
            break
          default:
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
      }

    updateDisplay(){
        this.currentOperandTextElement.innerText =  
            this.getDisplayNumber(this.currentOperand)
        if(this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else{
            this.previousOperandTextElement.innerText = ''
        }
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const allClearButton = document.querySelector('[data-all-clear]')
const delButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')


const calc = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNumber(button.innerText)
        calc.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.chooseOperation(button.innerText)
        calc.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calc.compute()
    calc.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calc.clear()
    calc.updateDisplay()
})

delButton.addEventListener('click', button => {
    calc.delete()
    calc.updateDisplay()
})

document.addEventListener('keydown', function (event) {
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[+\-*\/]/g
    if (event.key.match(patternForNumbers)) {
      event.preventDefault();
      calc.appendNumber(event.key)
      calc.updateDisplay()
    }
    if (event.key === '.') {
      event.preventDefault();
      calc.appendNumber(event.key)
      calc.updateDisplay()
    }
    if (event.key.match(patternForOperators)) {
      event.preventDefault();
      calc.chooseOperation(event.key)
      calc.updateDisplay()
    }
    if (event.key === 'Enter' || event.key === '=') {
      event.preventDefault();
      calc.compute()
      calc.updateDisplay()
    }
    if (event.key === "Backspace") {
      event.preventDefault();
      calc.delete()
      calc.updateDisplay()
    }
    if (event.key == 'Delete') {
      event.preventDefault();
      calc.clear()
      calc.updateDisplay()
    }
  
  })