import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('docs');
const pages=['index.html','information-policy.html','privacy.html'];
const problems=[];
for(const page of pages){
 const html=fs.readFileSync(path.join(root,page),'utf8');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 if(new Set(ids).size!==ids.length)problems.push(page+': duplicate IDs');
 if((html.match(/<h1[ >]/g)||[]).length!==1)problems.push(page+': H1');
 for(const req of ['<title>','name="description"','property="og:title"','rel="canonical"','lang="ja"'])if(!html.includes(req))problems.push(page+': missing '+req);
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
   const url=match[1];if(/^(https?:|data:|mailto:)/.test(url))continue;
   const [file,hash]=url.split('#');const target=path.resolve(root,file||page);
   const normalized=fs.existsSync(target)&&fs.statSync(target).isDirectory()?path.join(target,'index.html'):target;
   if(!fs.existsSync(normalized)){problems.push(page+': missing '+url);continue}
   if(hash&&!fs.readFileSync(normalized,'utf8').includes(`id="${hash}"`))problems.push(page+': missing anchor '+url);
 }
 for(const img of html.matchAll(/<img\b[^>]*>/g))if(!/\balt="/.test(img[0]))problems.push(page+': missing alt');
}
if(problems.length){console.error(problems.join('\n'));process.exit(1)}
console.log('PASS: 3 pages, local links, anchors, unique IDs, headings, image alt and metadata.');
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
if(!home.includes('action="https://formspree.io/f/mbgjezdo"')||!home.includes('id="inquiry-success"')||!home.includes('id="send-status"'))throw new Error('Form endpoint or status containers missing');
console.log('PASS: verified public Formspree endpoint and success/error containers. Hero image: '+fs.statSync('docs/assets/hero.webp').size+' bytes.');
