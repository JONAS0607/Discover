const questions = [
	'O que aprendi hoje?',
	'O que me deixou feliz hoje?',
	'Quantas pessoas vc ajudou hoje',
];

const ask = (index = 0) => {
	process.stdout.write('\n' + questions[index] + '➡ ');
};

ask();

const answers = [];
process.stdin.on('data', (data) => {
	answers.push(data.toString().trim());
	if (answers.length < questions.length) {
		ask(answers.length);
	} else {
		process.exit();
	}
});

process.on('exit', () => {
	console.log(`\n\n\n\n----- Muito bem Jonas!! ----- \n\n`);
	for (let i = 0; i < answers.length; i++) {
		console.log(`${questions[i]}:
		 ${answers[i]}\n`);
	}
	console.log(`\n\n----- Fim do APP -----`);
});
