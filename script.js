class Calculator{
    constructor(){
        this.screenDisplay = document.getElementById('screen-display');
        const calculatorButtons = document.getElementsByClassName('calculator-button');
        const menuBtn = document.getElementById('menu-btn');
        const themeSelector = document.getElementById('theme-selector');
        

        for(const button of calculatorButtons){
            button.addEventListener('pointerdown', () =>{

                if(this.screenDisplay.textContent === 'Error'){
                    this.screenDisplay.textContent = '';
                    this.handleUserInput(button.textContent);
                } else{
                    this.handleUserInput(button.textContent);
                }
                
            
            });
        }

        menuBtn.addEventListener('pointerdown', () => {
            this.handleMenu()
        });

        themeSelector.addEventListener('click', themeChange => {
            this.handleThemeChange(themeChange);
        });

    }

    handleUserInput(input){
        switch(input){
            case 'AC':
                this.clearDisplay();
                break;
            case '=':
                this.calculate();
                break;

            case "":
                this.backspace();
                break;
                
            default:
                this.appendInput(input);
                break;
        }
    }

    backspace(){
        this.screenDisplay.textContent = this.screenDisplay.textContent.slice(0, -1);
    }

    clearDisplay(){
        this.screenDisplay.textContent = '';
    }

    appendInput(input){
        this.screenDisplay.textContent += input;
    }

    calculate(){
        const expression = this.screenDisplay.textContent;
        // try{
        //     this.screenDisplay.textContent = this.calculateExpression(expression);
        // } catch (error){
        //     this.screenDisplay.textContent = 'Error';
        // }
        this.screenDisplay.textContent = this.calculateExpression(expression);
    }

    calculateExpression(expression){
        const operators = ['*', '/', '+', '-'];
        let currentNumber = '';
        const answer=[];

        for(let x=0; x<expression.length; x++){
            const char=expression[x];

            if(char==='('){
                answer.push(currentNumber);
                answer.push(char);
                currentNumber = '';
                answer.push('*');
            } else if(char===')'){
                answer.push(parseFloat(currentNumber));
                currentNumber = '';

                while(answer.length > 1 && answer[answer.length -2] !== '('){
                    const number1 = answer.pop();
                    const operator = answer.pop();
                    const number2 = answer.pop();

                    answer.push(this.performOperation(number1, operator, number2));
                }
                if(answer[answer.length - 2] === '('){
                    answer.pop();
                }
            } else if(operators.includes(char)){
                if(currentNumber !== ''){
                    answer.push(parseFloat(currentNumber));
                    currentNumber='';
                }
                answer.push(char);
            } else if (!isNaN(parseInt(char)) || char === '.'){
                currentNumber += char;
            } else{
                throw new Error(`invalid char: ${char}`);
            }
        }

        if(currentNumber!==''){
            answer.push(parseFloat(currentNumber));
        }

        for(let j=0; j<answer.length; j++){
            if(!isNaN(answer[j]) && answer[j + 1] === '('){
                answer.splice(j + 1, 0, '*');
            }
        }

        while(answer.length>1){
            const number1 = answer.pop();
            const operator = answer.pop();
            const number2 = answer.pop();
            answer.push(this.performOperation(number1, operator, number2));
        }
        return answer[0].toString();
    }


    performOperation(number1, operator, number2){
        switch(operator){
            case '+':
                return number2 + number1;
            case '-':
                return number2 - number1;
            case '*':
                return number2 * number1;
            case '/':
                return number2 / number1;
            default:
                throw new Error(`Invalid operator: ${operator} Num1: ${number1} Num2: ${number2}`);
        }
    }



    handleMenu(){
        console.log("Menu Clicked");
        document.getElementById('menu').classList.toggle('menu-visible');

        // if (document.getElementById('menu-btn').classList.contains('menu-btn-close')) {
        //     document.getElementById('menu-btn').classList.replace('menu-btn-close', 'menu-btn-open');
        // } else {
        //     document.getElementById('menu-btn').classList.replace('menu-btn-open','menu-btn-close');
        // }
        document.getElementById('menu-btn').classList.toggle('menu-btn-close');
        
    }

    handleThemeChange(themeChange){
        if (themeChange.target.value === document.body.classList) {
            console.log(`Theme Already ${themeChange.target.value}`);
        } else {
            console.log(`Theme Changed to ${themeChange.target.value}`);
            document.body.classList = `${themeChange.target.value}`;
        }
    }

}

const newCalculator = new Calculator();



