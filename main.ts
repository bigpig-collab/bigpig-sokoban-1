import fs from'node:fs';
const{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env;
let w,J,PV;
const R=(W,o,s,S,t)=>{let l=s;const k=[s];S[s]=t;while(k.length){const p=k.pop();if(p<l)l=p;for(const d of J){const q=p+d;if(!W[q]&&!o[q]&&S[q]!==t){S[q]=t;PV[q]=p;k.push(q)}}}return l};
const K=(W,o,a,b,S,t)=>{R(W,o,a,S,t);if(S[b]!==t)throw 0;let s='';for(let x=b;x!==a;x=PV[x])s='udlr'[J.indexOf(x-PV[x])]+s;return s};
const Q=(W,G,B,P)=>{const l=[],g=[],s=[],m=[],o=[],v=[...G];PV=[];
for(const x of G)g[x]=l[x]=1;for(let i=0;i<v.length;i++)for(const d of J){const x=v[i]-d;if(!W[x]&&!W[x-d]&&!l[x]){l[x]=1;v.push(x)}}
const C=[B],A=[-1],V=[P*4],X=new Map;let t=0;B.forEach(x=>o[x]=1);X.set(B+','+R(W,o,P,s,++t),0);B.forEach(x=>o[x]=0);
for(let h=0;h<C.length;h++){const b=C[h];b.forEach(x=>o[x]=1);const r=++t,pl=V[h]>>2;R(W,o,pl,s,r);
for(let i=0;i<b.length;i++)for(let j=0;j<4;j++){const f=b[i],u=f+J[j],z2=f-J[j];
if(s[z2]!==r||W[u]||o[u]||!l[u])continue;o[f]=0;o[u]=1;
const y=[...b];y[i]=u;y.sort((a,b)=>a-b);const k=y+','+R(W,o,f,m,++t);o[u]=0;o[f]=1;
if(X.has(k))continue;if(C.length>=2.5e5)return null;
X.set(k,C.length);C.push(y);A.push(h);V.push(f*4+j);
if(y.every(x=>g[x])){o.fill(0);let M='',p=P,x2=B;const y2=[];for(let y3=C.length-1;y3>0;y3=A[y3])y2.unshift(y3);
for(const y3 of y2){const nx=C[y3],di=V[y3]&3,fr=x2.find(x=>!nx.includes(x));
x2.forEach(x=>o[x]=1);M+=K(W,o,p,fr-J[di],m,++t);x2.forEach(x=>o[x]=0);M+='udlr'[di];p=fr;x2=nx}return M}}
b.forEach(x=>o[x]=0)}return null};
const solve=T=>{w=T.indexOf('\n');J=[-w,w,-1,1];T=T.replace(/\n/g,'');const A=[...T],W=A.map(()=>1),G=[],B=[];let P=0;
A.forEach((c,i)=>{if(c==='#')return;W[i]=0;if('.*+'.includes(c))G.push(i);if('$*'.includes(c))B.push(i);if('@+'.includes(c))P=i});
const row=P/w|0,R2=[];
for(let x=0;x<w;x++)for(const dr of[-1,1]){const d=(row+dr)*w+x;if(W[d])continue;const q=[d];for(let i=0;i<q.length;i++)for(const e of J){const n=q[i]+e;if(!W[n]&&((n/w|0)-row)*dr>0&&!q.includes(n))q.push(n)}const f=c=>q.includes(c);R2.push({b:B.filter(f),g:G.filter(f)})}
let p=P,M='';for(const Rm of R2){if(!Rm.b.length)continue;const W2=W.slice();
for(const o of R2)if(o!==Rm)for(const x of o.b)W2[x]=1;
const m=Q(W2,Rm.g,Rm.b,p);if(m===null)return'';
M+=m;for(const c of m)p+=J['udlr'.indexOf(c)];Rm.b=Rm.g}return M};
for(let k=1;k<6;k++){const p=I+'/i00'+k,q=O+'/i00'+k,m=solve(fs.readFileSync(p+'/level.txt','utf8'));fs.mkdirSync(q,{recursive:true});fs.writeFileSync(q+'/solution.txt',m)}
