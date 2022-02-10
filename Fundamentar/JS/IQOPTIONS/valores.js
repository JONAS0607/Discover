let value = 1;
let acrescimo = 0;
let aposta = value;
let earn = 0;
let soma_apostas_loss = -value;
let cont = 0;
let result = 0;

function mostra(cont, soma_apostas_loss, aposta, earn, result) {
	console.log(
		`index [${cont}]➡ Apostei R$ ${aposta.toFixed(
			2,
		)} vou ganhar para esta aposta sozinha em média 80% + : R$ ${earn.toFixed(
			2,
		)} `,
	);
	console.log(
		`Win nesta aposta!, se loss nas aposta anteriores, soma das perdas ➡ R$ -${soma_apostas_loss.toFixed(
			2,
		)} vou lucrar se apostar R$ ${aposta.toFixed(2)} = R$ ${result.toFixed(2)} 
		
		`,
	);
}

for (let i = 0; i <= 10; i++) {
	cont++;
	if (cont > 3) {
		soma_apostas_loss += aposta;
		aposta += aposta + acrescimo;
		earn = aposta * 0.8;
		result = earn - soma_apostas_loss;
	} else {
		soma_apostas_loss += aposta;
		aposta += aposta;
		earn = aposta * 0.8;
		result = earn - soma_apostas_loss;
	}

	mostra(cont, soma_apostas_loss, aposta, earn, result);
}
