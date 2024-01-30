const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = (function () {

    const screen = $('#screen input');
    const buttons = $$('.buttons .btn');
    let inputValues = [];
    let operand = '';
    let deletedValue = '';

    buttons.forEach(btn => {
        if (btn.innerText === 'DEL' || btn.innerText === 'AC') {
            btn.style.backgroundColor = 'blue';
            btn.style.color = 'white';

        }
    })


    return {

        changeInput() {
            screen.value = inputValues.join('');
        },


        handleBtn() {
            buttons.forEach(btn => {
                btn.onclick = () => {
                    let pressedBtn = btn.innerText;
                    if (pressedBtn === '=' || pressedBtn === 'AC' || pressedBtn === 'DEL' || pressedBtn === '.') {
                        switch (pressedBtn) {
                            case '.':
                                if (!operand.includes(pressedBtn)) {
                                    operand += pressedBtn;
                                    screen.value += pressedBtn;
                                }
                                break;

                            case 'AC':
                                inputValues = [];
                                operand = ''
                                this.changeInput();
                                break;
                            case '=':
                                if (inputValues.length === 2) {
                                    inputValues[2] = operand;
                                    console.log(inputValues);
                                    let ans = String(this.calculate(inputValues));
                                    screen.value = ans;
                                    inputValues = [];
                                    operand = ans;
                                    break;
                                } else {
                                    break;
                                }

                            case 'DEL':
                                let deletedChar = screen.value[screen.value.length - 1];
                                screen.value = screen.value.slice(0, -1)
                                operand = operand.slice(0, -1);
                                console.log(operand);
                                let length = screen.value.length;

                                if (deletedChar === '+' || deletedChar === '-' || deletedChar === '/' || deletedChar === '*') {

                                    operand = screen.value;
                                    inputValues.splice(0);
                                    console.log(inputValues, operand);
                                } else if (screen.value == '') {
                                    inputValues.pop();
                                    console.log(inputValues, operand);

                                } break;
                        }
                    }

                    else if (pressedBtn === '+' || pressedBtn === '-' || pressedBtn === '*' || pressedBtn === '/' || pressedBtn === '%' || pressedBtn === '^') {
                        if (operand != '' && inputValues.length <= 1) { //Xu li khi da co toan hang dau tien va chua co toan tu trong mang
                            inputValues.push(operand, pressedBtn);
                            operand = '';
                            this.changeInput();
                            console.log('clear operand')
                            console.log(inputValues);
                        }
                    }
                    else {
                        operand += pressedBtn;
                        screen.value += pressedBtn;
                        console.log(operand)
                    }

                }

            })
        },
        calculate(inputValues) {

            operand1 = Number(inputValues[0]);
            operator = inputValues[1];
            operand2 = inputValues[2];

            if (operand2 === '') return 'Syntax Error!'; //Kiểm tra xem toán hạng 2 có phải là rỗng không

            operand2 = Number(operand2);
            switch (operator) {
                case '+': return operand1 + operand2; break;
                case '-': return operand1 - operand2; break;
                case '*': return operand1 * operand2; break;
                case '/':
                    if (operand2 === 0) {
                        return 'Math Error!'
                    } else {
                        let ans = operand1 / operand2;
                        return ans;

                    }
                    break;
                case '%': return operand1 % operand2; break;
                case '^': return operand1 ** operand2; break;
            }
        },

        init() {
            this.handleBtn();
        }
    }



})()

app.init();
console.log(Number(''))

