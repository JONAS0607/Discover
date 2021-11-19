export function doTableHeader(col1, col2, col3) {
  return `
  <table class="headTable">
      <thead>
        <th>${col1}</th>
        <th>${col2}</th>
        <th>${col3}</th>
      </thead>      
    </table>
  
  `;
}
export function doTableBody(color = [x, y], cel1, cel2, cel3) {
  return `
  <table class="bodyTable">
      <tbody>      
      <tr >
      <td style='background:${color[0]}; color:${color[1]};'>${cel1}</td>
      <td style='background:${color[0]}; color:${color[1]};'>${cel2}</td>
      <td style='background:${color[0]}; color:${color[1]};'>${cel3}</td>
      </tr>
      </tbody>
      
    </table>
  
  `;
}
