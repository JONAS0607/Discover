import modifier from './modules/modifiers.js';
import ingredients from './modules/ingredients.js';

let ingredientesCapitalizados = modifier.captalize(ingredients, 'nome');
console.log(ingredientesCapitalizados);
let ingredientesOrdenados = modifier.ordenar(ingredientesCapitalizados, 'nome');
let conteinerIngredientes = document.getElementById('container-ingredientes');

for (let ingrediente of ingredientesOrdenados) {
	let textoHTML = `
      <div class="ingredientes">
        <img src="./img/${ingrediente.img}" alt="Foto do ${ingrediente.nome}">
        <p class="nome-ingrediente">${ingrediente.nome}</p>
      </div>
  `;

	conteinerIngredientes.innerHTML += textoHTML;
}

/**
 *
 *    <div class="ingredientes">
 *       <img src="./img/agriao.png" alt="Foto do Agrião">
 *       <p class="nome-ingrediente">Agrião</p>
 *    </div>
 *
 */
