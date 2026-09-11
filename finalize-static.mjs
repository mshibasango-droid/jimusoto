import fs from 'node:fs';

// Accept either the GitHub Pages project URL or a verified custom-domain URL.
const input=process.argv[2];
if(!input)throw Error('Specify the confirmed HTTPS site URL.');
const base=new URL(input.endsWith('/')?input:input+'/');
if(base.protocol!=='https:'||base.search||base.hash||base.username||base.password)throw Error('An HTTPS site URL without credentials, query or fragment is required.');

const pages=['index.html','information-policy.html','privacy.html'];
for(const file of pages){
  const url=new URL(file==='index.html'?'':file,base).href;
  let html=fs.readFileSync('docs/'+file,'utf8');
  html=html.replace(/<link rel="canonical"[^>]*>/g,'').replace(/<meta property="og:url"[^>]*>/g,'');
  html=html.replace('</head>',`<link rel="canonical" href="${url}"><meta property="og:url" content="${url}"></head>`);
  fs.writeFileSync('docs/'+file,html);
}
const entries=['','information-policy.html','privacy.html'].map(p=>`<url><loc>${new URL(p,base).href}</loc></url>`).join('');
fs.writeFileSync('docs/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+entries+'</urlset>\n');
console.log('Updated canonical, Open Graph URLs and sitemap for '+base.href);
