// Divisivel por 3 retorna FIZZ
// Divisivel por 5 retorna Buzz
// Divisivel por 3 e 5 retorna FizzBuzz
// Não divisivel retrona o mesmo numero
// Se não é número retorna 'não é numero'
var show = document.getElementById('showScreem');
function testValue() {
	const x = document.getElementById('value').value;
	const y = parseInt(x, 10);
	if (y) {
		const double = y % 3 == 0 && y % 5 == 0;
		const three = y % 3 == 0;
		const five = y % 5 == 0;
		const resp = double ? 'FizzBuzz' : three ? 'Fizz' : five ? 'Buzz' : y;
		show.innerHTML = resp;
	} else {
		show.innerHTML = `não é um número`;
	}
}
