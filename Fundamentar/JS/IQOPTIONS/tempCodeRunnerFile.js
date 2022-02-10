let aposta = 1;
let earn = 0;
let soma_apostas_loss = -1;
let cont = 0;
let result = 0;

for (let i = 0; i <= 10; i++) {
	cont++;
	soma_apostas_loss += aposta;
	aposta += aposta;
	earn = aposta * 0.8;
	result = earn - soma_apostas_loss;

	console.log(
		`index [${cont}]➡ Apostei R$ ${aposta.toFixed(
			2,
		)} vou ganhar : R$ ${earn.toFixed(2)} `,
	);
	console.log(
		`								se loss soma das apostas anteriores ➡ ${soma_apostas_loss} vou lucrar se apostar ${aposta} = ${(
			earn - soma_apostas_loss
		).toFixed(2)} `,
	);
}
