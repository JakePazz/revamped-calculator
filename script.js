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
        const nums = expression.split(new RegExp(`[${operators.join('')}]`));
        const operatorsArray = expression.split('').filter(chaar => operators.includes(char));
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
                        currentNum = (parseFloat(lastExp.value) * lastNum).toString();
                        break;
                    case '/':
                        currentNum = (parseFloat(lastExp.value) / lastNum).toString();
                        break;
                    case '+':
                        currentNum = (parseFloat(lastExp.value) + lastNum).toString();
                        break;
                    case '-':
                        currentNum = (parseFloat(lastExp.value) - lastNum).toString();
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



