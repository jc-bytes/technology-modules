const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const tableHtml = table => `<table><caption>${escape(table.caption)}</caption><thead><tr>${table.columns.map(column=>`<th scope="col">${escape(column)}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row=>`<tr>${row.map((cell,index)=>index===0?`<th scope="row">${escape(cell)}</th>`:`<td>${escape(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;

export const blocks = (name, alt) => `<figure class="scratch-example"><img src="./assets/${name}.svg" alt="${alt}"></figure>`;
export const recordTable = {caption:'Your test record', columns:['Predicted x','Actual x','Predicted deliveries','Actual deliveries'], rows:[['Your prediction','Scratch result','Your prediction','Scratch result']]};
