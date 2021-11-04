# Conceitos

1. **O que é HTML**

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

## 📗 Praticar

1. Vamos praticar
   - Escrever 2 parágrafos, dando ênfase e importância para algumas palavras, e adicione um link de saiba mais.
     - use a tag ( em ) pra ênfase
     - use a tag < strong > para importância
     - o link pode levar para o google
1. Conteúdo do texto e caracteres reservados.
   - Para dar espaço usamos (&nbsp;) um caracter especial
   - Caracteres reservados: {<}->(`&lt;`) {"}->(`&quot;`) para visualizar na pagina temos que usar a notação com &(e-comercial e ponto e virgula)
1. Estrutura basica
1. Listas
1. Citações
1. Citações
1. Codificação

