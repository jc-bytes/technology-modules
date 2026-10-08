export const places = {caption:'Write four binary digits',columns:['Row','8','4','2','1'],rows:[['Your digits','___','___','___','___']]};
export const bitTable = bits => ({caption:`Convert binary ${bits} to decimal`,columns:['Binary digit',...bits],rows:[['Position','3','2','1','0'],['Power','2^3','2^2','2^1','2^0']]});
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const mathText = value => escape(value).replace(/2\^([0-9x])/g, '2<sup>$1</sup>');
export const tableHtml = table => {
  const focused = Number.isInteger(table.highlightColumn);
  const binaryTable = table.columns[0] === 'Binary digit' || table.rows.some(row => row[0] === 'Binary digit');
  const cellClass = index => focused && index === table.highlightColumn ? ' class="bit-active"' : '';
  const format = (value, role, index) => {
    let html = mathText(value);
    if (!binaryTable) return html;
    html = html.replace(/<sup>(.*?)<\/sup>/g, '<sup class="binary-exponent">$1</sup>')
      .replace(/([01]) (×|&times;) 2/g, '<span class="binary-factor">$1</span> $2 2');
    if(index > 0 && role === 'Binary digit') return `<span class="binary-factor">${html}</span>`;
    if(index > 0 && /^Position/.test(role)) return `<span class="binary-exponent">${html}</span>`;
    return html;
  };
  const legend = binaryTable ? '<span class="binary-color-key"><span class="binary-factor">Binary digit</span> goes before ×. <span class="binary-exponent">Position</span> becomes the small raised exponent.</span>' : '';
  return `<table${focused ? ' class="bit-focus-table"' : ''}><caption>${escape(table.caption)}${legend}</caption><thead><tr>${table.columns.map((column,index)=>`<th scope="col"${cellClass(index)}>${format(column,table.columns[0],index)}${focused && index === table.highlightColumn ? '<span class="bit-focus-label">This bit</span>' : ''}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row=>`<tr>${row.map((cell,index)=>`<td${cellClass(index)}>${format(cell,row[0],index)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
};
