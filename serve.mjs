import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('docs');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8'};
http.createServer((req,res)=>{try{let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let file=path.resolve(root,'.'+pathname);if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return}if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');if(!fs.existsSync(file)){res.writeHead(404).end('Not found');return}res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.setHeader('Cache-Control','no-store');fs.createReadStream(file).pipe(res)}catch{res.writeHead(400).end('Bad request')}}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
