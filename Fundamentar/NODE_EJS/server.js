const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	const items = [
		{
			title: 'D',
			message: 'Desenvolver aplicações/serviços de forma fácil',
		},
		{
			title: 'E',
			message: 'Envolver aplicações/serviços de forma fácil',
		},
		{
			title: 'M',
			message: 'Maximizar aplicações/serviços de forma fácil',
		},
		{
			title: 'A',
			message: 'Alcançar aplicações/serviços de forma fácil',
		},
		{
			title: 'I',
			message: 'Investigar aplicações/serviços de forma fácil',
		},
		{
			title: 'S',
			message: 'Salvar aplicações/serviços de forma fácil',
		},
	];
	const subtitle =
		'Uma linguagem de modelagem para criação de páginas HTML usando JS';
	res.render('pages/index', {
		qualities: items,
		subtitle: subtitle,
	});
});
app.get('/sobre', function (req, res) {
	res.render('pages/about');
});

app.listen(8080);
console.log('Rodando...');
