import { doHeader } from "../modules/Header/header.js";
import { doTableBody, doTableHeader } from "../modules/Table/table.js";

const root = document.getElementById("root");
const headerTitle = doHeader("Tabela de desdobramento numérico jogo do bicho");
const tableHeader = doTableHeader("CENTENA", "DEZENA", "UNIDADE");
// const values = {
//   val_1: "R$100",
//   val_2: "R$200",
//   val_3: "R$300",
// };
root.innerHTML += `
      ${headerTitle}
      ${tableHeader}
      `;
const bicho = "leão";
const valores = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let cont = 0;
for (let i = 0; i <= valores.length; i++) {
  for (let j = 0; j <= i; j++) {
    for (let k = 0; k <= i; k++) {
      const leao = j === 6 && k < 5 && k > 0;
      const macaco = j === 6 && k < 9 && k > 4;
      let bichos = "";
      cont++;
      if (leao) {
        bichos = "leão";
      }

      if (macaco) {
        bichos = "macaco";
      }

      function back(bicho) {
        let color = "";

        if (bicho === "leão") {
          color = "orange";
        } else if (bicho === "macaco") {
          color = "grey";
        } else {
          color = "white";
        }

        return color;
      }

      function rename(prop) {
        return (root.innerHTML += `
        <span style="background: ${back(
          prop
        )};" class="bicho">${prop}</span>        
          
          `);
      }
      var tableBody = doTableBody([back(bichos),'black'], i, j, k);

      switch (bichos) {
        case "leão":
          rename(bichos);
          break;
        case "macaco":
          rename(bichos);
          break;
      }

      if (cont % 25 == 0) {
        root.innerHTML += `     
        ${tableBody} 
        ${`contador: ${cont}`}
        ${tableHeader} 
        `;
      } else {
        root.innerHTML += `     
        ${tableBody} 
        `;
      }
    }
  }
}
root.innerHTML += `Total de JOGOS POSSIVES: ${cont}`;
