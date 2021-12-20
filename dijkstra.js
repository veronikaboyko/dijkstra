let fs = require('fs');
let arg = process.argv;
let inputData = fs.readFileSync(arg[2], 'utf8');
inputData.toString();

function Priority(sign) {
	switch (sign){
		case '+': return 0;
		case '-': return 0;
		case '*': return 1;
		case '/': return 1;
		case '^': return 2;
	}
    return -1;
}

let out = '';
let stack = new Array();
for (let i = 0; i < inputData.length; i++) {
    if (inputData[i] != ' ') {
		if (inputData[i] == parseInt(inputData[i])) {
            while (inputData[i] == parseInt(inputData[i])) {
				out += inputData[i];
                i++;
            }
			i--;
			out += '$'; // чтобы разделять числа
			continue;
		}
		switch (inputData[i]) {
			case '(':
				stack.push('(');
				continue;
			case ')':
				if (stack.length == 0)
					console.log('error');
				while (stack[stack.length - 1] != '(')
                    out += stack.pop();
				stack.pop();
				continue;
		}
		if (Priority(inputData[i]) > Priority(stack[stack.length - 1]))
			stack.push(inputData[i]);
		else {
			while (Priority(inputData[i]) <= Priority(stack[stack.length - 1]))
                out += stack.pop();
            stack.push(inputData[i]);
		}
	}
}

while (stack.length != 0) 
	out += stack.pop();

for (let i = 0; i < out.length; i++) {
	if (out[i] == parseInt(out[i])){
		let n = '';
		while (out[i] == parseInt(out[i])){
			n += out[i];
			i++;
		}
		stack.push(parseInt(n));
	}
	else{
		let number1 = parseInt(stack.pop());
        let number2 = parseInt(stack.pop());
		switch (out[i]) {
			case '+':
				stack.push(number2 + number1);
				continue;
			case '-':
				stack.push(number2 - number1);
				continue;
			case '*':
				stack.push(number2 * number1);
				continue;
			case '/':
				if (number1 == 0)
					console.log('error')
				else{
					stack.push(number2 / number1);
					continue;
				}
			case '^':
				stack.push((Math.pow(number2, number1)));
				continue;
		}
	}
}
for (let i = 0; i < inputData.length; i++)
	inputData = inputData.replace('^','**');

let result1 = eval(inputData)
let result2 = stack.pop()

console.log('eval: ' + result1)
console.log('dijkstra: ' + result2)