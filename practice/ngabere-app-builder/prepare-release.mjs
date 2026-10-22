import {readdir,readFile,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
const version=process.argv[2];
if(!version || !/^[a-zA-Z0-9._-]+$/.test(version))throw new Error('Usage: node prepare-release.mjs <version>');
const root=fileURLToPath(new URL('.',import.meta.url));
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){if(entry.name==='node_modules' || entry.name.startsWith('.'))continue;const path=join(dir,entry.name);if(entry.isDirectory())await walk(path);else if(entry.name.endsWith('.js') && !entry.name.endsWith('.min.js')){const source=await readFile(path,'utf8');await writeFile(path,source.replace(/(['"])(\.\.?\/[^'"\n?]+\.js)(?:\?v=[^'"\n]*)?\1/g,(_,quote,url)=>`${quote}${url}?v=${version}${quote}`));}}}
await walk(root);
const html=join(root,'index.html');await writeFile(html,(await readFile(html,'utf8')).replace(/((?:src|href)=["'])(\.\/[^"'?]+\.(?:js|css))(?:\?v=[^"']*)?(["'])/g,(_,before,url,after)=>`${before}${url}?v=${version}${after}`));
console.log(`Prepared asset links for ${version}. Build, check, test and publish the same files.`);
