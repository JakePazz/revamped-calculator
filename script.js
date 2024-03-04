class Calculator{
    constructor(){
        this.screenDisplay = document.getElementById('screen-display');
        const calculatorButtons = document.getElementsByClassName('calculator-button');

        for(const button of calculatorButtons){
            button.addEventListener('pointerdown', () =>{
                this.handleUserInput(button.textContent);
            });
        }
    }

    handleUserInput(input){
        switch(input){
            case 'AC':
                this.clearDisplay();
                break;
            case '=':
                this.calculate();
                break;
            case 'O':
                this.backspace();
            default:
                this.appendInput(input);
                break;
        }
    }


    backspace(){
        this.screenDisplay.textContent = this.screenDisplay.textContent.slice(0, -1);
        
    }
    
    clearDisplay(){
        this.screenDisplay.textContent = ' ';
    }

    appendInput(input){
        this.screenDisplay.textContent += input;
    }

    calculate(){
        const expression = this.screenDisplay.textContent;
        let result;
        result = this.calculateExpression(expression);
        this.screenDisplay.textContent = result;
    }

    calculateExpression(expression){
        const operators = ['*', '/', '+', '-'];
        const nums = expression.split(new RegExp(`[${operators.join('')}]`));
        const operatorsArray = expression.split('').filter(char => operators.includes(char));
        const answer = []
        console.log(nums);
        console.log(operatorsArray);

        let currentNum = '';
        let pendingOp = '';

        for(let x = 0; x < expression.length; x++){
            const char = expression[x];

            if (char === '('){
                answer.push({operator: pendingOp, value: currentNum});
                currentNum = '';
                pendingOp = '';
                console.log(answer);
            }
            else if (char === ')'){
                const lastExp = answer.pop();
                const lastNum = parseFloat(currentNum);
                switch (lastExp.operator){
                    case '*':
                        currentNume = (parseFloat(lastExp.value) * lastNum).toString();
                        break;
                    case '/':
                        currentNume = (parseFloat(lastExp.value) / lastNum).toString();
                        break;
                    case '+':
                        currentNume = (parseFloat(lastExp.value) + lastNum).toString();
                        break;
                    case '-':
                        currentNume = (parseFloat(lastExp.value) - lastNum).toString();
                        break;
                }
                pendingOp = '';
            }
            else if (operators.includes(char)){
                pendingOp = char;
            }
            else if (char === '.'){
                currentNum += char;
            }
            else if (!isNaN(parseInt(char))){
                currentNum += char;
            }

            if(currentNum !== ''){
                if (pendingOp !== ''){
                    throw new Error('Invalid expression');
                }
                return currentNum;
            }
            else{
                throw new Error('Invalid expression');
            }
        }
        
    }

    
    
}

const newCalculator = new Calculator();

