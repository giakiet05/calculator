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
                                if (inputValues.length === 3) {

                                    let ans = String(this.calculate(inputValues));
                                    screen.value = ans;
                                    inputValues = [];
                                    operand = ans;
                                    break;
                                } else {
                                    break;
                                }
                                break;
                            // case 'DEL':
                            //     let deletedChar = screen.value[screen.value.length - 1];
                            //     screen.value = screen.value.slice(0, -1)

                            //     let length = screen.value.length;
                            //     if (screen.value[length - 1] === '+' || screen.value[length - 1] === '-' || screen.value[length - 1] === '*' || screen.value[length - 1] === '/') {
                            //         inputValues.pop();

                            //         console.log(inputValues);
                            //     } else if (deletedChar === '+' || deletedChar === '-' || deletedChar === '/' || deletedChar === '*') {
                            //         inputValues.pop();
                            //         console.log(inputValues);
                            //     } else if (screen.value == '') {
                            //         inputValues.pop();
                            //         console.log(inputValues);

                            //     } break;
                        }
                    }

                    else if (pressedBtn === '+' || pressedBtn === '-' || pressedBtn === '*' || pressedBtn === '/' || pressedBtn === '%' || pressedBtn === '^') {
                        if (operand != '' && inputValues.length === 0) { //Xu li khi da co toan hang dau tien va chua co toan tu trong mang
                            inputValues.push(operand, pressedBtn);
                            operand = '';
                            this.changeInput();
                            inputValues.push(''); //Tạo thêm 1 phần tử rỗng cho js để thêm vào không bị lỗi
                        }
                    }
                    else {

                        operand += pressedBtn;
                        screen.value += pressedBtn;
                        if (inputValues.length === 3) {
                            inputValues[2] = operand;
                        }

                    }

                }

            })
        },
        calculate(inputValues) {

            operand1 = Number(inputValues[0]);
            operator = inputValues[1];
            operand2 = Number(inputValues[2]);

            switch (operator) {
                case '+': return operand1 + operand2; break;
                case '-': return operand1 - operand2; break;
                case '*': return operand1 * operand2; break;
                case '/':
                    if (operand2 === 0) {
                        return 'Error!'
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

