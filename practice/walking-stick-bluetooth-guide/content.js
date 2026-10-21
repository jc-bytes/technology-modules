// Change the example here. Screen tables and PDF tables use these same values.
export const modelBooks = {
  caption: 'Books borrowed', columns: ['Class', 'Books'],
  rows: [['Class A', '2'], ['Class B', '4'], ['Class C', '6']],
};

export const independentBooks = {
  caption: 'Books borrowed', columns: ['Class', 'Books'],
  rows: [['Class A', '8'], ['Class B', '3'], ['Class C', '5']],
};

const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const tableHtml = table => !table ? '' : `<table><caption>${escape(table.caption)}</caption><thead><tr>${table.columns.map(column=>`<th scope="col">${escape(column)}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row=>`<tr>${row.map((cell,index)=>index===0?`<th scope="row">${escape(cell)}</th>`:`<td>${escape(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
