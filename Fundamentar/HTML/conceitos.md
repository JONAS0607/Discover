# Conceitos

<details>
<summary><strong> ✅ O que é HTML </strong></summary>

- _Hyper Text Markup Language_
- não é uma linguagem de programação, é um jeito de escrever com sintaxe, tags, marcações
- **Marcação / Elemento**: nada mais é do que a utilização das tags exemplo:

```html
<!-- Um comentário no HTML -->
<!--Este é um elemento com conteúdo-->
<h1>Hello World!</h1>
<!-- Elemetos vazios, ou seja eles apenas tem propriedades com valores e não um conteúdo explicito dentro dele como o 'h1'-->
<br />
<img />
<input />
<!--
  Atributos HTML
- informações extras
- configurações
- atributos booleanos cmo o `disabled` não precisam de dados pois eles vão informar true ou false
-->
<img src="http://" alt="descrição da img" />
<input type="text" disabled />

<!--
  Aspas
- omissão
- simples
- duplas : indicado usar no HTML pois ao usar outras pode ocorrer erros
-->
<!--<a href="http://" title='Isn't'>link</a> Exemplo de erro ao usar aspas simples -->
<!-- 
  Atributos Globais mais usados 
     -class : usada para estilos no elemento
     -contenteditable : habilita a edição do elemento
     -data-* : muito usado no javascript 'data-id'
     -hidden : esconde a tag
     -id : usado apenas um por pagina ou seja não pode haver dois ids iguais 
     -style: pode aplicar estilização na propia tag e tem prioridade máxima
     -tabindex: quando navegando quando apertamos tab ele foca diretamente conforme a colocação do tabindex="1", tabindex="2"...
     -title: define um titulo para o elemento    
  -->
<div class="carrinho" contenteditable="true"></div>
<div class="carrinho"></div>

<!-- Aninhamento de tags
consiste em colocar uma tag dentro de outra,tag aberta é tag fechada, cada uma fecha a sua.
 - Fluxo: as tags seguem o fluxo da pagina conforme a posição escrita
 - Hierarquia: tags dentro são filhas(child) as de fora são pai(father)
 - Posicionamento dos elementos: exitem elementos em bloco que pulam a linha e outros in line
 <div>: elemento em bloco
 <em>: elemento inline
 -->
<p>Vou <em>escrever</em> um parágrafo</p>
```

1. Conteúdo do texto e caracteres reservados.
   - Para dar espaço usamos (&nbsp;) um caracter especial
   - Caracteres reservados: {<}->(`&lt;`) {"}->(`&quot;`) para visualizar na pagina temos que usar a notação com &(e-comercial e ponto e virgula)
1. Estrutura basica
1. Listas
1. Citações
1. Citações
1. Codificação
1. Tables
1. Head

</details>

<details>
<summary><strong> 📗 Praticar </strong></summary>

- [x] Vamos praticar exercício 1
  - Escrever 2 parágrafos, dando ênfase e importância para algumas palavras, e adicione um link de saiba mais.
    - use a tag ( em ) pra ênfase
    - use a tag < strong > para importância
    - o link pode levar para o google
- [x] Vamos praticar exercício_2

  - Criando navegação entre arquivos
    - Crie um projeto contendo
      - 2 arquivos no diretório principal (index.html e contact.html)
      - 1 diretório de nome: files
        - dentro desse diretório, adicione 2 imagens da sua preferência e 1 arquivo de nome images.html, que irá listar as imagens
  - Dentro de cada arquivo .html, você deverá colocar:
    1. Menu de navegação com uma lista `<li>` não ordenada `<ul>`
    1. Título `<h1>` da página
    1. Um ou mais parágrafos `<p>` com informações da página

- [x] A Navegação
      Para o menu de navegação, use a tag `<nav>` e coloque a lista não ordenada como conteúdo da tag
      O conteúdo de cada item da lista deverá conter um link `<a>`
      O conteúdo do link deverá ser o nome da página .html que existe no projeto, sendo que ara cada página, iremos ter um link.
      Ao clicarmos no link, deveremos ser direcionados à página clicada.
- [x] Página images.html
      Como o conteúdo desta página, além do que foi pedido, adicionar também
  1. As duas imagens que você tem na pasta
  1. Use a tag p para colocar a tag img
- [x] Página contact.html
      Como conteúdo desta página, além do que foi pedido, adicionar também
  1. Colocar suas informações de contato e-mail e telefone;
  1. Cada informação deverá estar dentro de um _link_ que quando clicado, irá abrir a respectiva informação de contato (email ou telefone)
  </details>
