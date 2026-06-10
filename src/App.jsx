import React, { useState, useEffect } from "react";
import { supabase } from "./supabase";

const STYLE=`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&display=swap');
*{-webkit-tap-highlight-color:transparent}
input,button,select{font-family:inherit;-webkit-appearance:none;appearance:none}
input:focus,select:focus{outline:none}
::-webkit-scrollbar{width:0;height:0}
@keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideDown{from{opacity:0;transform:translateY(-30px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideLeft{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideRight{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scaleIn{from{opacity:0;transform:scale(0.7)}to{opacity:1;transform:scale(1)}}
@keyframes scaleInBig{0%{opacity:0;transform:scale(0.3) rotate(-15deg)}60%{transform:scale(1.15) rotate(5deg)}100%{opacity:1;transform:scale(1) rotate(0)}}
@keyframes reveal{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0% 0 0)}}
@keyframes statPop{from{opacity:0;transform:translateY(20px) scale(0.9)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes introP{from{opacity:0;transform:translateY(60px) scale(0.85)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes scanBeam{0%{transform:translateY(-100%)}100%{transform:translateY(800%)}}
@keyframes trophy{0%{transform:scale(0) rotate(-30deg)}65%{transform:scale(1.4) rotate(8deg)}100%{transform:scale(1) rotate(0)}}
@keyframes fall{0%{opacity:1;transform:translateY(-20px) rotate(0)}100%{opacity:0;transform:translateY(110vh) rotate(600deg)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0.4}}
@keyframes breathing{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
@keyframes breathSubtle{0%,100%{transform:scale(1) translateY(0);filter:brightness(1)}50%{transform:scale(1.02) translateY(-0.5%);filter:brightness(1.04)}}
@keyframes facePulse{0%,100%{transform:scale(1.05) translateY(0)}40%{transform:scale(1.07) translateY(-1%)}80%{transform:scale(1.06) translateY(0.5%)}}
@keyframes microBlink{0%,93%,100%{opacity:1}96%{opacity:0.78}}
@keyframes gradientShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes floatSlow{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-8px) rotate(2deg)}}
@keyframes glowPulse{0%,100%{box-shadow:0 0 0 0 rgba(79,195,247,0.4),0 0 22px rgba(79,195,247,0.18)}50%{box-shadow:0 0 0 12px rgba(79,195,247,0),0 0 32px rgba(79,195,247,0.35)}}
@keyframes orbSpin{from{transform:rotate(0deg) translateX(80px) rotate(0deg)}to{transform:rotate(360deg) translateX(80px) rotate(-360deg)}}
@keyframes magneticHover{0%{transform:scale(1)}50%{transform:scale(1.04) translateY(-2px)}100%{transform:scale(1)}}
select{color-scheme:dark;-webkit-appearance:none;appearance:none}
select option{background-color:#0A1B3D !important;color:#F0EDE8 !important;padding:8px}
select option:checked{background-color:#0288D1 !important;color:#FFFFFF !important}
@keyframes panLR{0%{transform:scale(1.12) translateX(-2%)}50%{transform:scale(1.12) translateX(2%)}100%{transform:scale(1.12) translateX(-2%)}}
@keyframes parallaxY{0%,100%{transform:scale(1.08) translateY(0)}50%{transform:scale(1.08) translateY(-2%)}}
@keyframes goldGlow{0%,100%{box-shadow:0 0 50px rgba(201,168,76,0.4)}50%{box-shadow:0 0 90px rgba(201,168,76,0.85)}}
@keyframes shimmer{0%{transform:translateX(-150%)}100%{transform:translateX(150%)}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
@keyframes wave{0%,100%{transform:rotate(0)}25%{transform:rotate(14deg)}75%{transform:rotate(-12deg)}}
@keyframes ringPulse{0%{transform:scale(1);opacity:0.55}100%{transform:scale(2.2);opacity:0}}
@keyframes auroraA{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(8%,-6%) scale(1.15)}66%{transform:translate(-10%,10%) scale(0.95)}}
@keyframes auroraB{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-12%,8%) scale(0.9)}66%{transform:translate(8%,-10%) scale(1.2)}}
@keyframes auroraC{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(15%,12%) scale(1.1)}}
.btn-press:active{transform:scale(0.96);filter:brightness(0.78);transition:transform 0.08s,filter 0.08s}
.tap-row:active{background:rgba(255,255,255,0.04);filter:brightness(0.85)}
button{transition:transform 0.1s ease,filter 0.1s ease}
button:active{transform:scale(0.96);filter:brightness(0.78)}
.tab-btn{transition:transform 0.15s ease,filter 0.15s ease}
.tab-btn:active{transform:scale(0.88);filter:brightness(0.78)}
@media(hover:hover){.tab-btn:hover{transform:scale(0.93)}.tab-btn:hover .tab-icon-box{background:linear-gradient(135deg,rgba(79,195,247,0.25),rgba(2,136,209,0.14))!important}}
.screen-fade{animation:scrFade 0.4s ease}
@keyframes scrFade{from{opacity:0}to{opacity:1}}
html,body{background:#040A18;margin:0}
@media(min-width:768px){
  #root{max-width:720px;margin:0 auto;border-left:1px solid rgba(255,255,255,0.07);border-right:1px solid rgba(255,255,255,0.07);min-height:100vh;box-shadow:0 0 80px rgba(0,0,0,0.5)}
}`;

const F={ios:`-apple-system,BlinkMacSystemFont,"SF Pro Display","SF Pro Text","Helvetica Neue",sans-serif`,bn:`'Bebas Neue',sans-serif`,bc:`'Barlow Condensed',sans-serif`};
const C_MEN={cyan:"#4FC3F7",cyanBright:"#29B6F6",cyanDeep:"#0288D1",cyanDim:"rgba(79,195,247,0.15)",cyanBdr:"rgba(79,195,247,0.32)",gold:"#C9A84C",goldDim:"rgba(201,168,76,0.15)",goldBdr:"rgba(201,168,76,0.35)",navy:"#0A1B3D",navyDeep:"#061226",navyDarker:"#040A18",surface:"#0A1B3D",surface2:"#0D2148",surface3:"#163068",bg:"#040A18",text:"#F0EDE8",muted:"rgba(240,237,232,0.45)",borderS:"rgba(255,255,255,0.06)",iosField:"rgba(118,118,128,0.18)",green:"#34C759",red:"#FF3B30",amber:"#FF9F0A"};
// PALETA FEMENINA AZUL PASTEL (cielo/lavanda/aqua suave)
const C_FEM={cyan:"#A8D8EA",cyanBright:"#7EC8E3",cyanDeep:"#5BA3CC",cyanDim:"rgba(168,216,234,0.18)",cyanBdr:"rgba(168,216,234,0.40)",gold:"#C7B8EA",goldDim:"rgba(199,184,234,0.18)",goldBdr:"rgba(199,184,234,0.40)",navy:"#1A2847",navyDeep:"#0F1A30",navyDarker:"#0A1322",surface:"#1A2847",surface2:"#223358",surface3:"#2D416E",bg:"#0A1322",text:"#EAF4FB",muted:"rgba(234,244,251,0.48)",borderS:"rgba(168,216,234,0.12)",iosField:"rgba(168,216,234,0.14)",green:"#AEE5D8",red:"#F5A8B8",amber:"#F5D6A8"};
let C=C_MEN;
const SURF_C={Clay:"#C17B4A",Hard:"#4FC3F7",Grass:"#5BAD6F",Indoor:"#8B65C1"};
const TAVG={serve:7.9,return:6.5,forehand:7.5,backhand:7.1};
const DSTATS={serve:0,return:0,forehand:0,backhand:0,aces:0,doubleFaults:0,bpWon:0,bpTotal:0,setsDropped:0,gamesLost:0,winners:0,unforcedErrors:0};
const ADMIN_PASS="admin123";
const RACKETS=["Wilson Pro Staff","Wilson Blade","Wilson Clash","Wilson Ultra","Babolat Pure Aero","Babolat Pure Drive","Babolat Pure Strike","Head Speed","Head Radical","Head Prestige","Head Boom","Yonex VCORE","Yonex Ezone","Yonex Percept","Prince Phantom","Tecnifibre TFight","Otra"];
const CATS=["Abierta","B","C","D","Di"];
const CAT_C={Abierta:"#FFD700",B:"#4FC3F7",C:"#5BAD6F",D:"#F59E0B",Di:"#B8C5D6"};
const nextCat=c=>{const i=CATS.indexOf(c);if(i<=0)return c;return CATS[i-1];};
const CLUBS=["Club Campestre Monterrey","Club Sonoma","Club Industrial","Club San Agustín","Club Británico","Club Bosques","Casa Club del Valle","Otro"];
const MX_STATES=["Aguascalientes","Baja California","Baja California Sur","Campeche","Chiapas","Chihuahua","CDMX","Coahuila","Colima","Durango","Estado de México","Guanajuato","Guerrero","Hidalgo","Jalisco","Michoacán","Morelos","Nayarit","Nuevo León","Oaxaca","Puebla","Querétaro","Quintana Roo","San Luis Potosí","Sinaloa","Sonora","Tabasco","Tamaulipas","Tlaxcala","Veracruz","Yucatán","Zacatecas"];
const MP_CATS=["Raqueta","Ropa","Tenis (calzado)","Pelotas","Bolsas / Mochilas","Grips / Cuerdas","Accesorios","Otro"];
const MP_COND=["Nuevo","Como nuevo","Buen estado","Usado"];
const COACH_SPECIALTIES=["Técnica","Estrategia","Servicio","Resto","Volea","Físico","Mental","Juniors","Principiantes","Avanzados","Dobles","Singles"];
const COACH_FREQ=[{v:"once",l:"Una vez"},{v:"weekly",l:"Semanal"},{v:"biweekly",l:"2x semana"},{v:"intensive",l:"Intensivo"}];

const playRacket=()=>{try{const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)return;const ctx=new Ctx(),now=ctx.currentTime;
  // 1. Impulso inicial fuerte de las cuerdas (frecuencia alta-media)
  const o1=ctx.createOscillator(),g1=ctx.createGain();o1.type="square";
  o1.frequency.setValueAtTime(1400,now);o1.frequency.exponentialRampToValueAtTime(180,now+0.04);
  g1.gain.setValueAtTime(0.55,now);g1.gain.exponentialRampToValueAtTime(0.001,now+0.06);
  const f1=ctx.createBiquadFilter();f1.type="bandpass";f1.frequency.value=1800;f1.Q.value=3;
  o1.connect(f1);f1.connect(g1);g1.connect(ctx.destination);
  o1.start(now);o1.stop(now+0.07);
  // 2. Onda principal del marco de la raqueta (madera/carbon, grave)
  const o2=ctx.createOscillator(),g2=ctx.createGain();o2.type="triangle";
  o2.frequency.setValueAtTime(420,now);o2.frequency.exponentialRampToValueAtTime(80,now+0.13);
  g2.gain.setValueAtTime(0.65,now);g2.gain.exponentialRampToValueAtTime(0.001,now+0.18);
  o2.connect(g2);g2.connect(ctx.destination);
  o2.start(now);o2.stop(now+0.19);
  // 3. Sub-bass (impacto de pelota)
  const o3=ctx.createOscillator(),g3=ctx.createGain();o3.type="sine";
  o3.frequency.setValueAtTime(120,now);o3.frequency.exponentialRampToValueAtTime(45,now+0.1);
  g3.gain.setValueAtTime(0.45,now);g3.gain.exponentialRampToValueAtTime(0.001,now+0.16);
  o3.connect(g3);g3.connect(ctx.destination);
  o3.start(now);o3.stop(now+0.17);
  // 4. Ruido blanco filtrado (las cuerdas vibrando) - más largo
  const buf=ctx.createBuffer(1,Math.floor(ctx.sampleRate*0.12),ctx.sampleRate),d=buf.getChannelData(0);
  for(let i=0;i<d.length;i++){const decay=Math.exp(-i/(d.length*0.22));d[i]=(Math.random()*2-1)*decay;}
  const n=ctx.createBufferSource();n.buffer=buf;
  const ng=ctx.createGain();ng.gain.value=0.5;
  const fn=ctx.createBiquadFilter();fn.type="bandpass";fn.frequency.value=2800;fn.Q.value=1.8;
  n.connect(fn);fn.connect(ng);ng.connect(ctx.destination);
  n.start(now);
  // 5. Click metálico inicial (string ping)
  const o5=ctx.createOscillator(),g5=ctx.createGain();o5.type="sawtooth";
  o5.frequency.setValueAtTime(3200,now);o5.frequency.exponentialRampToValueAtTime(1200,now+0.02);
  g5.gain.setValueAtTime(0.25,now);g5.gain.exponentialRampToValueAtTime(0.001,now+0.03);
  o5.connect(g5);g5.connect(ctx.destination);
  o5.start(now);o5.stop(now+0.04);
  setTimeout(()=>{try{ctx.close();}catch(e){}},500);
}catch(e){}};
const playDF=()=>{try{if("speechSynthesis"in window){window.speechSynthesis.cancel();
  // Frases típicas de umpire ATP americano
  const phrases=["Game, set, and match!","New balls please!","Out!","Quiet please!","Let's play!","Time!"];
  const txt=phrases[Math.floor(Math.random()*phrases.length)];
  const u=new SpeechSynthesisUtterance(txt);
  u.lang="en-US";
  u.rate=0.95;
  u.pitch=0.85;
  u.volume=1;
  const vs=window.speechSynthesis.getVoices();
  // Buscar voz masculina americana enérgica
  const v=vs.find(x=>x.lang==="en-US"&&/male|david|alex|fred|daniel|mark|aaron|tom|james/i.test(x.name))||vs.find(x=>x.lang==="en-US")||vs.find(x=>x.lang.startsWith("en"));
  if(v) u.voice=v;
  window.speechSynthesis.speak(u);
}}catch(e){}};

const ini=n=>(n||"").split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2)||"?";
const shuf=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
function buildKO(p){const sh=shuf(p),sz=Math.pow(2,Math.ceil(Math.log2(Math.max(sh.length,2))));while(sh.length<sz)sh.push(null);const r=[];for(let i=0;i<sz;i+=2){const p1=sh[i],p2=sh[i+1],bye=p2===null;r.push({id:`m-${Date.now()}-${i}-${Math.random()}`,p1,p2,winner:bye?p1:null,score:bye?"BYE":null,status:bye?"done":"pending",pendingResult:null});}return[r];}
function advKO(rs){const last=rs[rs.length-1];if(last.length===1||!last.every(m=>m.status==="done"))return rs;const w=last.map(m=>m.winner),next=[];for(let i=0;i<w.length;i+=2){const p1=w[i],p2=w[i+1]||null,bye=p2===null;next.push({id:`m-${Date.now()}-${i}-${Math.random()}`,p1,p2,winner:bye?p1:null,score:bye?"BYE":null,status:bye?"done":"pending",pendingResult:null});}return[...rs,next];}
function buildGroups(p,gs=4){const sh=shuf(p),numG=Math.ceil(sh.length/gs),groups=[];for(let g=0;g<numG;g++){const gp=sh.slice(g*gs,(g+1)*gs),matches=[];for(let i=0;i<gp.length;i++)for(let j=i+1;j<gp.length;j++)matches.push({id:`gm-${g}-${i}-${j}-${Date.now()}-${Math.random()}`,p1:gp[i],p2:gp[j],winner:null,score:null,status:"pending",pendingResult:null,group:g});groups.push({id:g,name:`GRUPO ${String.fromCharCode(65+g)}`,players:gp,matches});}return groups;}
function getStandings(group){const s=group.players.map(p=>({player:p,wins:0,losses:0,setsWon:0,setsLost:0}));group.matches.forEach(m=>{if(m.status!=="done"||!m.winner)return;const w=s.find(x=>x.player.id===m.winner.id),loser=m.p1.id===m.winner.id?m.p2:m.p1,l=s.find(x=>x.player.id===loser.id);if(w)w.wins++;if(l)l.losses++;if(m.score){const[a,b]=m.score.split("-").map(Number);if(w){w.setsWon+=Math.max(a,b);w.setsLost+=Math.min(a,b);}if(l){l.setsWon+=Math.min(a,b);l.setsLost+=Math.max(a,b);}}});return s.sort((a,b)=>b.wins-a.wins||(b.setsWon-b.setsLost)-(a.setsWon-a.setsLost));}
function rLabel(ri,t){const fe=t-1-ri;if(fe===0)return"FINAL";if(fe===1)return"SEMIFINAL";if(fe===2)return"CUARTOS";return`R${ri+1}`;}
function getChamp(t){if(t.status!=="completed"||!t.rounds||!t.rounds.length)return null;return t.rounds[t.rounds.length-1][0]?.winner||null;}
function isMinor(birthdate){if(!birthdate)return false;const b=new Date(birthdate);if(isNaN(b.getTime()))return false;const now=new Date();let age=now.getFullYear()-b.getFullYear();const m=now.getMonth()-b.getMonth();if(m<0||(m===0&&now.getDate()<b.getDate()))age--;return age<18;}

// HEURÍSTICA DE DETECCIÓN DE CONTENIDO HUMANO
// Detecta tonos de piel CON requisito de CLUSTERS grandes (no píxeles dispersos).
// Esto evita falsos positivos en raquetas/grips/ropa con colores cálidos.
function analyzeImageForSkin(dataUrl){
  return new Promise((resolve)=>{
    try{
      const img=new Image();
      img.crossOrigin="anonymous";
      img.onload=()=>{
        try{
          const maxSize=120;
          const ratio=Math.min(maxSize/img.width,maxSize/img.height,1);
          const w=Math.max(1,Math.floor(img.width*ratio));
          const h=Math.max(1,Math.floor(img.height*ratio));
          const canvas=document.createElement("canvas");
          canvas.width=w;canvas.height=h;
          const ctx=canvas.getContext("2d");
          ctx.drawImage(img,0,0,w,h);
          const data=ctx.getImageData(0,0,w,h).data;
          // Mapa binario de piel
          const skinMap=new Uint8Array(w*h);
          let skin=0,total=0;
          for(let y=0;y<h;y++){
            for(let x=0;x<w;x++){
              const i=(y*w+x)*4;
              const r=data[i],g=data[i+1],b=data[i+2],a=data[i+3];
              if(a<128){continue;}
              total++;
              // RGB skin model estricto
              const max=Math.max(r,g,b),min=Math.min(r,g,b);
              const isSkinRGB=r>95&&g>40&&b>20&&(max-min)>15&&Math.abs(r-g)>15&&r>g&&r>b;
              // YCbCr skin model más estricto
              const Cb=128-0.168736*r-0.331264*g+0.5*b;
              const Cr=128+0.5*r-0.418688*g-0.081312*b;
              const isSkinYCbCr=Cb>=85&&Cb<=125&&Cr>=135&&Cr<=170;
              // HSV: matiz hue entre 0-50 grados, baja saturación
              const dmax=max/255,dmin=min/255,delta=dmax-dmin;
              let hue=0;
              if(delta>0){
                if(max===r) hue=60*(((g-b)/255/delta)%6);
                else if(max===g) hue=60*(((b-r)/255/delta)+2);
                else hue=60*(((r-g)/255/delta)+4);
                if(hue<0) hue+=360;
              }
              const sat=dmax===0?0:delta/dmax;
              const isSkinHSV=hue>=0&&hue<=50&&sat>=0.23&&sat<=0.68&&dmax>0.35;
              // Requiere los TRES modelos (más estricto = menos falsos positivos)
              if(isSkinRGB&&isSkinYCbCr&&isSkinHSV){skinMap[y*w+x]=1;skin++;}
            }
          }
          const pct=total>0?(skin/total)*100:0;
          // Si el porcentaje base es bajo, definitivamente OK (raqueta/ropa)
          if(pct<25){resolve({skinPercent:pct,suspicious:false});return;}
          // Si el porcentaje es alto, verificar que existan CLUSTERS grandes conectados
          // (evita falso positivo de píxeles dispersos uniformes color piel como mangos café claro)
          const visited=new Uint8Array(w*h);
          let largestCluster=0;
          for(let y=0;y<h;y++){
            for(let x=0;x<w;x++){
              const idx=y*w+x;
              if(skinMap[idx]&&!visited[idx]){
                // BFS para medir cluster
                let size=0;
                const stack=[idx];
                visited[idx]=1;
                while(stack.length>0){
                  const cur=stack.pop();
                  size++;
                  const cx=cur%w,cy=Math.floor(cur/w);
                  const neighbors=[[cx-1,cy],[cx+1,cy],[cx,cy-1],[cx,cy+1]];
                  for(const [nx,ny] of neighbors){
                    if(nx<0||ny<0||nx>=w||ny>=h) continue;
                    const nidx=ny*w+nx;
                    if(skinMap[nidx]&&!visited[nidx]){visited[nidx]=1;stack.push(nidx);}
                  }
                }
                if(size>largestCluster) largestCluster=size;
              }
            }
          }
          const clusterPct=total>0?(largestCluster/total)*100:0;
          // Solo es sospechoso si HAY un cluster grande Y el total es alto
          // (una cara o cuerpo significativo tendría un cluster contiguo grande)
          const suspicious=pct>35&&clusterPct>15;
          resolve({skinPercent:pct,clusterPercent:clusterPct,suspicious});
        }catch(e){resolve({skinPercent:0,suspicious:false,error:true});}
      };
      img.onerror=()=>resolve({skinPercent:0,suspicious:false,error:true});
      img.src=dataUrl;
    }catch(e){resolve({skinPercent:0,suspicious:false,error:true});}
  });
}

function useCount(target,duration=1300,delay=0){const[v,setV]=useState(0);useEffect(()=>{if(target===0){setV(0);return;}const t=setTimeout(()=>{const start=Date.now();let raf;const tick=()=>{const e=Date.now()-start,p=Math.min(e/duration,1);setV(target*(1-Math.pow(1-p,3)));if(p<1)raf=requestAnimationFrame(tick);};tick();return()=>raf&&cancelAnimationFrame(raf);},delay);return()=>clearTimeout(t);},[target,duration,delay]);return v;}
const CountUp=({target,duration,delay,decimals=0,suffix=""})=>{const v=useCount(target,duration,delay);return <>{v.toFixed(decimals)}{suffix}</>;};

const mkPlayer=(o)=>({id:o.id,email:o.email,password:"demo123",name:o.name,firstName:o.firstName||o.name.split(" ")[0],lastName:o.lastName||o.name.split(" ").slice(1).join(" "),sex:o.sex||"M",birthdate:o.birthdate||"1990-01-01",club:o.club||"Club Campestre MTY",hand:o.hand||"Diestro",country:o.country||"México",state:o.state||"Nuevo León",city:o.city||"Monterrey",racket:o.racket||"Wilson Pro Staff",category:o.category||null,categoryLocked:o.categoryLocked||false,phone:o.phone||"",ranking:o.ranking,points:o.points,wins:o.wins,losses:o.losses,titles:o.titles,photo:null,avatar:ini(o.name),stats:{...DSTATS,...(o.stats||{})}});

// ====== SUPABASE: traductores entre formato base de datos (snake_case) y app (camelCase) ======
const profileToPlayer=(r)=>({
  id:r.id, email:r.email||"", password:"",
  name:r.name||`${r.first_name||""} ${r.last_name||""}`.trim(),
  firstName:r.first_name||"", lastName:r.last_name||"",
  sex:r.sex||"M", birthdate:r.birthdate||"1990-01-01",
  club:r.club||"Club Campestre MTY", hand:r.hand||"Diestro",
  country:r.country||"México", state:r.state||"Nuevo León", city:r.city||"Monterrey",
  racket:r.racket||"Wilson Pro Staff", category:r.category||null,
  categoryLocked:r.category_locked||false, phone:r.phone||"",
  ranking:r.ranking||0, points:r.points||0, wins:r.wins||0, losses:r.losses||0, titles:r.titles||0,
  photo:r.photo_url||null, avatar:r.avatar||ini(r.name||""),
  stats:{...DSTATS,...(r.stats||{})},
  requirePasswordChange:r.require_password_change||false, isBanned:r.is_banned||false,
});
const playerToProfile=(p,authId)=>({
  id:authId||p.id, auth_id:authId||p.id, email:(p.email||"").toLowerCase(),
  name:p.name||"", first_name:p.firstName||"", last_name:p.lastName||"",
  birthdate:p.birthdate||null, sex:p.sex||"M", phone:p.phone||"",
  category:p.category||null, category_locked:p.categoryLocked||false,
  city:p.city||"", state:p.state||"", country:p.country||"México", club:p.club||"",
  photo_url:p.photo||null, avatar:p.avatar||ini(p.name||""),
  ranking:p.ranking||0, points:p.points||0, wins:p.wins||0, losses:p.losses||0, titles:p.titles||0,
  hand:p.hand||"Diestro", racket:p.racket||"Wilson Pro Staff", stats:p.stats||{},
  require_password_change:p.requirePasswordChange||false,
  privacy_accepted_at:p.privacyAcceptedAt?new Date(p.privacyAcceptedAt).toISOString():new Date().toISOString(),
});

const DEMO_P=[
  mkPlayer({id:"d1",email:"carlos@smt.mx",name:"Carlos Ramírez",ranking:2,points:2100,wins:45,losses:12,titles:3,racket:"Babolat Pure Aero",category:"Abierta",categoryLocked:true,phone:"+528112345678",stats:{serve:9.1,return:8.6,forehand:9.1,backhand:8.8,aces:22,doubleFaults:8,bpWon:18,bpTotal:28,setsDropped:1,gamesLost:19,winners:87,unforcedErrors:34}}),
  mkPlayer({id:"d2",email:"miguel@smt.mx",name:"Miguel Torres",ranking:3,points:1850,wins:38,losses:15,titles:2,hand:"Zurdo",racket:"Wilson Blade",category:"Abierta",categoryLocked:true,phone:"+528123456789",stats:{serve:8.4,return:8.3,forehand:8.9,backhand:8.8,aces:15,doubleFaults:12,bpWon:14,bpTotal:26,setsDropped:2,gamesLost:28,winners:72,unforcedErrors:41}}),
  mkPlayer({id:"d3",email:"rodrigo@smt.mx",name:"Rodrigo Vega",ranking:4,points:1600,wins:30,losses:18,titles:1,racket:"Head Speed",category:"B",categoryLocked:true,phone:"+528134567890",stats:{serve:7.8,return:7.5,forehand:8.1,backhand:7.6,aces:10,doubleFaults:14,bpWon:11,bpTotal:22,setsDropped:3,gamesLost:35,winners:58,unforcedErrors:49}}),
  mkPlayer({id:"d4",email:"andres@smt.mx",name:"Andrés Flores",ranking:5,points:1400,wins:25,losses:20,titles:0,racket:"Yonex VCORE",category:"B",categoryLocked:true,phone:"+528145678901"}),
  mkPlayer({id:"d5",email:"jorge@smt.mx",name:"Jorge Mendoza",ranking:6,points:1200,wins:20,losses:22,titles:0,category:"C",categoryLocked:true,phone:"+528156789012"}),
  mkPlayer({id:"d6",email:"luis@smt.mx",name:"Luis Herrera",ranking:7,points:1000,wins:18,losses:25,titles:0,category:"C",categoryLocked:true,phone:"+528167890123"}),
  mkPlayer({id:"d7",email:"pablo@smt.mx",name:"Pablo Guerrero",ranking:8,points:850,wins:15,losses:28,titles:0,category:"D",categoryLocked:true,phone:"+528178901234"}),
  mkPlayer({id:"d8",email:"diego@smt.mx",name:"Diego Sánchez",ranking:9,points:780,wins:12,losses:30,titles:0,category:"Di",categoryLocked:true,phone:"+528189012345"}),
  mkPlayer({id:"d9",email:"sofia@smt.mx",name:"Sofía Martínez",sex:"F",ranking:1,points:2300,wins:40,losses:8,titles:4,racket:"Wilson Clash",category:"Abierta",categoryLocked:true,phone:"+528190123456"}),
  mkPlayer({id:"d10",email:"valeria@smt.mx",name:"Valeria López",sex:"F",ranking:2,points:1900,wins:35,losses:12,titles:2,category:"B",categoryLocked:true,phone:"+528101234567"}),
];
const DEMO_T=[
  {id:"t1",name:"Monterrey Open",date:"2026-06-10",surface:"Clay",location:"Club Campestre, MTY",maxPlayers:8,format:"groups+ko",modality:"singles",gender:"M",category:"Abierta",groupSize:4,players:[],pendingPlayers:[],groups:[],rounds:[],status:"open",prize:"$5,000 MXN",image:null,createdBy:"admin"},
  {id:"t2",name:"Sociedad Cup",date:"2026-07-15",surface:"Hard",location:"Club San Agustín",maxPlayers:8,format:"ko",modality:"singles",gender:"M",category:"B",players:[],pendingPlayers:[],groups:[],rounds:[],status:"open",prize:"$10,000 MXN",image:null,createdBy:"admin"},
];

function PA({photo,avatar,size=44,border,onClick,animated=true}){
  return <div style={{width:size,height:size,borderRadius:"50%",flexShrink:0,cursor:onClick?"pointer":"default",overflow:"hidden",position:"relative",border:border||`1px solid ${C.cyanBdr}`}} onClick={onClick}>{photo?<img src={photo} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",animation:animated?(size>=80?"breathing 4.5s infinite":"breathSubtle 5s infinite"):"none"}} alt=""/>:<div style={{width:"100%",height:"100%",background:C.cyanDim,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.bn,fontSize:size*0.36,color:C.cyan}}>{avatar}</div>}</div>;
}

function Logo({size=32,glow=false}){
  const w=size,h=size*0.95;
  return <div style={{display:"inline-flex",filter:glow?`drop-shadow(0 0 22px rgba(79,195,247,0.7))`:"none",animation:"breathSubtle 6s infinite"}}><svg width={w} height={h} viewBox="0 0 200 190" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id={`smtL${size}`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#7EDDF7"/><stop offset="50%" stopColor="#4FC3F7"/><stop offset="100%" stopColor="#0288D1"/></linearGradient>
      <linearGradient id={`smtR${size}`} x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#7EDDF7"/><stop offset="50%" stopColor="#4FC3F7"/><stop offset="100%" stopColor="#0288D1"/></linearGradient>
      <linearGradient id={`smtC${size}`} x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#5BCEF0"/><stop offset="100%" stopColor="#1A6BAE"/></linearGradient>
      <linearGradient id={`smtT${size}`} x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="100%" stopColor="#D8E4EC"/></linearGradient>
    </defs>
    {/* Cuerno izquierdo grande */}
    <polygon points="58,3 78,76 50,68 38,72" fill={`url(#smtL${size})`} stroke="#0F4373" strokeWidth="1.2" strokeLinejoin="round"/>
    {/* Sub-cuerno izquierdo pequeño (dentro) */}
    <polygon points="78,76 92,80 86,62" fill={`url(#smtC${size})`} opacity="0.85"/>
    {/* Cuerno derecho grande */}
    <polygon points="142,3 122,76 150,68 162,72" fill={`url(#smtR${size})`} stroke="#0F4373" strokeWidth="1.2" strokeLinejoin="round"/>
    {/* Sub-cuerno derecho pequeño */}
    <polygon points="122,76 108,80 114,62" fill={`url(#smtC${size})`} opacity="0.85"/>
    {/* Texto SMT principal */}
    <text x="100" y="118" textAnchor="middle" fontFamily="Impact, 'Bebas Neue', sans-serif" fontSize="56" fontWeight="900" fill={`url(#smtT${size})`} letterSpacing="-0.02em" style={{filter:"drop-shadow(2px 3px 0 rgba(0,30,70,0.55))"}}>SMT</text>
    {/* Rombo inferior - punta izquierda */}
    <polygon points="78,138 100,170 100,148" fill={`url(#smtL${size})`} stroke="#0F4373" strokeWidth="1" strokeLinejoin="round"/>
    {/* Rombo inferior - punta derecha */}
    <polygon points="122,138 100,170 100,148" fill={`url(#smtR${size})`} stroke="#0F4373" strokeWidth="1" strokeLinejoin="round"/>
    {/* Punta inferior central */}
    <polygon points="92,148 108,148 100,185" fill={`url(#smtC${size})`}/>
  </svg></div>;
}

function Aurora({intense=1}){
  return <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
    <div style={{position:"absolute",top:"-15%",left:"-15%",width:"75%",height:"60%",borderRadius:"50%",background:`radial-gradient(circle,rgba(41,182,246,${0.45*intense}) 0%,rgba(41,182,246,0) 65%)`,animation:"auroraA 22s ease-in-out infinite",filter:"blur(40px)"}}/>
    <div style={{position:"absolute",bottom:"-10%",right:"-15%",width:"80%",height:"65%",borderRadius:"50%",background:`radial-gradient(circle,rgba(2,136,209,${0.55*intense}) 0%,rgba(2,136,209,0) 70%)`,animation:"auroraB 28s ease-in-out infinite",filter:"blur(50px)"}}/>
    <div style={{position:"absolute",top:"30%",left:"20%",width:"55%",height:"50%",borderRadius:"50%",background:`radial-gradient(circle,rgba(79,195,247,${0.32*intense}) 0%,rgba(79,195,247,0) 60%)`,animation:"auroraC 35s ease-in-out infinite",filter:"blur(45px)"}}/>
  </div>;
}

const Beam=()=><div style={{position:"absolute",left:0,right:0,height:3,background:`linear-gradient(90deg,transparent,${C.cyan},transparent)`,animation:"scanBeam 2s ease-in-out",pointerEvents:"none",zIndex:3}}/>;

function Chip({type,children,style}){
  const c={default:{bg:C.surface2,c:C.muted,b:C.borderS},cyan:{bg:C.cyanDim,c:C.cyan,b:C.cyanBdr},gold:{bg:C.goldDim,c:C.gold,b:C.goldBdr},green:{bg:"rgba(52,199,89,0.15)",c:C.green,b:"rgba(52,199,89,0.3)"},red:{bg:"rgba(255,59,48,0.15)",c:C.red,b:"rgba(255,59,48,0.3)"},amber:{bg:"rgba(255,159,10,0.15)",c:C.amber,b:"rgba(255,159,10,0.3)"}}[type||"default"];
  return <span style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",padding:"3px 9px",borderRadius:6,background:c.bg,color:c.c,border:`1px solid ${c.b}`,fontWeight:600,...style}}>{children}</span>;
}

function Modal({onClose,children,large,center}){
  return <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(4,10,24,0.93)",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",zIndex:300,display:"flex",alignItems:center?"center":"flex-end",justifyContent:"center",padding:center?16:0}}><div onClick={e=>e.stopPropagation()} style={{background:`linear-gradient(180deg,${C.surface},${C.surface2})`,border:`1px solid ${C.cyanBdr}`,borderRadius:center?22:"22px 22px 0 0",width:"100%",maxWidth:large?540:440,padding:"22px 20px 28px",maxHeight:center?"86vh":"92vh",overflowY:"auto",animation:center?"scaleIn 0.32s cubic-bezier(0.34,1.56,0.64,1)":"slideUp 0.32s cubic-bezier(0.34,1.56,0.64,1)",fontFamily:F.ios,boxShadow:center?"0 24px 60px rgba(0,0,0,0.6)":"none"}}>{!center&&<div style={{width:40,height:5,background:"rgba(255,255,255,0.18)",borderRadius:3,margin:"0 auto 18px"}}/>}{children}</div></div>;
}

const BtnP=({onClick,children,style})=><button onClick={onClick} className="btn-press" style={{width:"100%",background:`linear-gradient(135deg,${C.cyanBright},${C.cyanDeep})`,color:"#fff",border:"none",padding:"15px 18px",fontFamily:F.ios,fontSize:17,fontWeight:700,cursor:"pointer",borderRadius:18,marginTop:12,boxShadow:`0 10px 28px rgba(2,136,209,0.42)`,letterSpacing:"-0.01em",...style}}>{children}</button>;
const BtnG=({onClick,children,style})=><button onClick={onClick} className="btn-press" style={{background:"rgba(79,195,247,0.10)",backdropFilter:"blur(20px)",border:`1px solid ${C.cyanBdr}`,color:C.cyan,padding:"10px 16px",fontFamily:F.ios,fontSize:13,fontWeight:600,cursor:"pointer",borderRadius:14,letterSpacing:"-0.01em",...style}}>{children}</button>;
const BtnX=({onClick,children})=><button onClick={onClick} className="btn-press" style={{width:"100%",background:"rgba(118,118,128,0.16)",border:"none",color:C.text,padding:"14px 18px",fontFamily:F.ios,fontSize:16,fontWeight:500,cursor:"pointer",borderRadius:16,marginTop:8}}>{children}</button>;
const TI=({value,onChange,type,placeholder,autoFocus,onKeyDown,style})=><input type={type||"text"} value={value} onChange={onChange} placeholder={placeholder} autoFocus={autoFocus} onKeyDown={onKeyDown} style={{width:"100%",background:C.iosField,border:"none",borderRadius:12,padding:"13px 16px",color:C.text,fontFamily:F.ios,fontSize:16,outline:"none",...style}}/>;
const FL=({children})=><div style={{fontFamily:F.ios,fontSize:13,fontWeight:600,color:C.muted,marginBottom:7}}>{children}</div>;
const SL=({children,color})=><div style={{fontFamily:F.bc,fontSize:11,letterSpacing:"0.22em",color:color||C.cyan,textTransform:"uppercase",marginBottom:12,fontWeight:600}}>{children}</div>;
const T=({children,size,style})=><div style={{fontFamily:F.bn,fontSize:size||28,letterSpacing:"0.06em",color:C.text,lineHeight:1,...style}}>{children}</div>;
const Sub=({children,style})=><div style={{fontFamily:F.ios,fontSize:13,color:C.muted,...style}}>{children}</div>;
const Row=({label,val})=><div style={{display:"flex",justifyContent:"space-between",padding:"13px 18px",borderBottom:`0.5px solid ${C.borderS}`}}><span style={{fontFamily:F.ios,fontSize:14,color:C.muted}}>{label}</span><span style={{fontFamily:F.ios,fontSize:15,color:C.text,fontWeight:500}}>{val}</span></div>;

function Seg({options,value,onChange,style}){
  return <div style={{display:"flex",background:C.iosField,borderRadius:10,padding:3,...style}}>{options.map(o=>{const v=typeof o==="string"?o:o.v,l=typeof o==="string"?o:o.l;return <button key={v} onClick={()=>onChange(v)} className="btn-press" style={{flex:1,padding:"9px 6px",borderRadius:7,border:"none",background:value===v?`linear-gradient(135deg,${C.cyanBright},${C.cyanDeep})`:"transparent",color:value===v?"#fff":C.text,fontFamily:F.ios,fontSize:13,fontWeight:value===v?600:500,cursor:"pointer",boxShadow:value===v?"0 2px 8px rgba(2,136,209,0.35)":"none",transition:"all 0.2s"}}>{l}</button>})}</div>;
}

function WelcomeAnim({user,isAdmin,onDone}){
  useEffect(()=>{const t=setTimeout(onDone,3200);return()=>clearTimeout(t);},[]);
  const greet=isAdmin?"ADMINISTRADOR":(user?.firstName||user?.name?.split(" ")[0]||"JUGADOR").toUpperCase();
  return <div onClick={onDone} style={{position:"fixed",inset:0,zIndex:700,cursor:"pointer",overflow:"hidden",background:`radial-gradient(ellipse at center,${C.navy} 0%,${C.navyDarker} 100%)`,animation:"fadeIn 0.3s",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
    <Aurora intense={1.3}/>
    {[0,1,2,3].map(i=><div key={i} style={{position:"absolute",left:"50%",top:"40%",width:200,height:200,borderRadius:"50%",border:`2px solid ${C.cyan}`,marginLeft:-100,marginTop:-100,animation:`ringPulse 2.5s ${i*0.4}s ease-out infinite`,zIndex:1}}/>)}
    <Beam/>
    <div style={{animation:"scaleInBig 0.9s",position:"relative",zIndex:2}}><Logo size={210} glow/></div>
    <div style={{marginTop:36,position:"relative",zIndex:2,animation:"fadeIn 0.5s 0.8s backwards"}}><div style={{fontFamily:F.bc,fontSize:13,letterSpacing:"0.4em",color:C.cyan,textTransform:"uppercase",fontWeight:600}}>{isAdmin?"Panel de Control":"Bienvenido"}{!isAdmin&&<span style={{display:"inline-block",animation:"wave 1.2s infinite",transformOrigin:"70% 70%",marginLeft:8}}>👋</span>}</div></div>
    <div style={{marginTop:14,position:"relative",zIndex:2,overflow:"hidden",padding:"0 24px"}}><T size={70} style={{textAlign:"center",lineHeight:0.95,textShadow:`0 0 60px rgba(79,195,247,0.55)`,animation:"reveal 0.9s 1s backwards"}}>{greet}</T></div>
    {!isAdmin&&user&&<div style={{marginTop:18,animation:"slideUp 0.6s 1.5s backwards",position:"relative",zIndex:2}}><Chip type="cyan" style={{padding:"6px 18px",fontSize:11}}>RANKING #{user.ranking||"—"} · {user.points||0} PTS</Chip></div>}
    <div style={{position:"absolute",bottom:36,fontFamily:F.bc,fontSize:10,letterSpacing:"0.3em",color:"rgba(255,255,255,0.32)",textTransform:"uppercase",animation:"blink 1.5s 2s infinite backwards",zIndex:2,fontWeight:600}}>SOCIEDAD MEXICANA DE TENIS</div>
  </div>;
}

const BK={CW:172,CH:60,RG:42,SH:78};
function Bracket({rounds,canEdit,onMatchClick}){
  const numR=rounds.length,totalH=(rounds[0]?rounds[0].length:1)*BK.SH,totalW=numR*(BK.CW+BK.RG)+20;
  const bX=ri=>ri*(BK.CW+BK.RG),bY=(ri,mi)=>{const sh=BK.SH*Math.pow(2,ri);return mi*sh+(sh-BK.CH)/2;},bMY=(ri,mi)=>bY(ri,mi)+BK.CH/2;
  const paths=[];rounds.forEach((round,ri)=>{if(ri>=numR-1)return;round.forEach((_,mi)=>{const x1=bX(ri)+BK.CW,y1=bMY(ri,mi),x2=bX(ri+1),y2=bMY(ri+1,Math.floor(mi/2)),xm=x1+BK.RG/2;paths.push({d:`M${x1} ${y1} H${xm} V${y2} H${x2}`,k:`${ri}-${mi}`});});});
  return <div style={{overflowX:"auto",padding:"36px 18px 24px"}}><div style={{position:"relative",width:totalW,height:totalH+20}}>
    {rounds.map((_,ri)=><div key={ri} style={{position:"absolute",left:bX(ri),top:-26,width:BK.CW,textAlign:"center",fontFamily:F.bc,fontSize:10,letterSpacing:"0.22em",textTransform:"uppercase",color:C.cyan,fontWeight:600}}>{rLabel(ri,numR)}</div>)}
    <svg width={totalW} height={totalH} style={{position:"absolute",top:0,left:0,pointerEvents:"none"}}><defs><linearGradient id="brl" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={C.cyan} stopOpacity="0.15"/><stop offset="100%" stopColor={C.cyan} stopOpacity="0.4"/></linearGradient></defs>{paths.map(({d,k})=><path key={k} d={d} fill="none" stroke="url(#brl)" strokeWidth={1.5}/>)}</svg>
    {rounds.map((round,ri)=>round.map((match,mi)=>{
      const click=match.status==="pending"&&match.p1&&match.p2&&canEdit(match);
      const pr=match.pendingResult,isDone=match.status==="done";
      return <div key={match.id} onClick={()=>{if(click)onMatchClick(match,ri);}} style={{position:"absolute",left:bX(ri),top:bY(ri,mi),width:BK.CW,height:BK.CH,background:C.surface,border:`1px solid ${pr?C.amber:click?C.cyanBdr:isDone?"rgba(52,199,89,0.4)":C.borderS}`,borderRadius:8,cursor:click?"pointer":"default",overflow:"hidden",animation:"fadeIn 0.4s"}}>
        {pr&&<div style={{position:"absolute",top:2,right:4,fontFamily:F.bc,fontSize:8,color:C.amber,letterSpacing:"0.15em",fontWeight:600}}>PENDIENTE</div>}
        {[match.p1,match.p2].map((p,pi)=>{const isWin=match.winner&&p&&match.winner.id===p.id;return <div key={pi} style={{display:"flex",alignItems:"center",gap:6,padding:"0 8px",height:"50%",borderBottom:pi===0?`1px solid ${C.borderS}`:"none",background:isWin?"rgba(52,199,89,0.1)":"transparent"}}>
          <div style={{width:5,height:5,borderRadius:"50%",background:isWin?C.green:C.muted,flexShrink:0}}/>
          {p?<PA photo={p.photo} avatar={p.avatar} size={20} border={`1px solid ${C.borderS}`}/>:null}
          <span style={{fontFamily:F.ios,fontSize:12,fontWeight:500,color:!p?C.muted:isWin?C.green:C.text,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontStyle:!p?"italic":"normal"}}>{!p?"BYE":p.name.split(" ").slice(0,2).join(" ")}</span>
          {isWin&&match.score&&match.score!=="BYE"&&<span style={{fontFamily:F.bn,fontSize:13,color:C.cyan,fontWeight:600}}>{match.score.split("-")[pi]}</span>}
        </div>;})}
      </div>;
    }))}
  </div></div>;
}

function TIntro({tourney,onDone}){
  const [step,setStep]=useState(0);
  useEffect(()=>{const tt=[setTimeout(()=>setStep(1),300),setTimeout(()=>setStep(2),900),setTimeout(()=>setStep(3),1700),setTimeout(onDone,5500)];return()=>tt.forEach(clearTimeout);},[]);
  const sc=SURF_C[tourney.surface]||C.cyan;
  return <div onClick={onDone} style={{position:"fixed",inset:0,zIndex:500,cursor:"pointer",overflow:"hidden",background:`linear-gradient(160deg,${C.navy},${C.navyDeep} 50%,${C.navyDarker})`,animation:"fadeIn 0.4s"}}>
    <Aurora intense={0.8}/><Beam/>
    <div style={{position:"absolute",top:-60,right:-40,fontFamily:F.bn,fontSize:340,color:"rgba(79,195,247,0.05)",lineHeight:1,letterSpacing:"-0.05em",userSelect:"none",zIndex:1}}>26</div>
    <div style={{position:"absolute",top:24,left:0,right:0,display:"flex",justifyContent:"center",animation:"slideDown 0.5s",zIndex:3}}><Logo size={64} glow/></div>
    {tourney.image&&step>=1&&<div style={{position:"absolute",top:108,left:"50%",transform:"translateX(-50%)",width:130,height:130,borderRadius:"50%",overflow:"hidden",border:`3px solid ${C.cyanBdr}`,animation:"scaleIn 0.6s",boxShadow:`0 0 60px rgba(79,195,247,0.5)`,zIndex:3}}><img src={tourney.image} style={{width:"100%",height:"100%",objectFit:"cover",animation:"breathing 4s infinite"}} alt=""/></div>}
    {step>=1&&<div style={{position:"absolute",top:tourney.image?252:118,left:0,right:0,textAlign:"center",animation:"fadeIn 0.5s",zIndex:3}}><Chip type="cyan" style={{fontSize:11,letterSpacing:"0.4em",padding:"6px 22px",background:`${sc}20`,color:sc,borderColor:`${sc}55`}}>{tourney.surface} · {tourney.modality==="doubles"?"DOBLES":"SINGLES"} {tourney.gender==="F"?"♀":tourney.gender==="Mixed"?"⚥":"♂"}</Chip></div>}
    {step>=1&&<div style={{position:"absolute",top:tourney.image?292:154,left:0,right:0,textAlign:"center",padding:"0 20px",animation:"slideUp 0.6s 0.1s backwards",zIndex:3}}>
      <T size={54} style={{textShadow:`0 0 60px rgba(79,195,247,0.5)`}}>{tourney.name}</T>
      <div style={{fontFamily:F.bc,fontSize:13,color:C.cyan,letterSpacing:"0.26em",textTransform:"uppercase",marginTop:10,fontWeight:600}}>{tourney.date} · {tourney.prize}</div>
    </div>}
    {step>=2&&tourney.players.length>0&&<div style={{position:"absolute",top:tourney.image?410:276,left:0,right:0,padding:"0 14px",animation:"fadeIn 0.5s",zIndex:3}}>
      <div style={{textAlign:"center",fontFamily:F.bc,fontSize:11,letterSpacing:"0.32em",textTransform:"uppercase",marginBottom:18,color:"rgba(79,195,247,0.7)",fontWeight:600}}>JUGADORES</div>
      <div style={{display:"flex",gap:10,justifyContent:tourney.players.length<=4?"center":"flex-start",overflowX:tourney.players.length>4?"auto":"visible",paddingBottom:6}}>
        {tourney.players.map((p,i)=><div key={p.id} style={{textAlign:"center",flexShrink:0,animation:`introP 0.6s ${i*0.1+0.05}s backwards`}}>
          <div style={{width:108,height:148,borderRadius:10,overflow:"hidden",border:`1px solid ${C.cyanBdr}`,position:"relative",boxShadow:"0 6px 20px rgba(0,0,0,0.3)"}}>
            {p.photo?<img src={p.photo} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",animation:`panLR ${6+i*0.3}s infinite`}} alt=""/>:<div style={{width:"100%",height:"100%",background:`linear-gradient(160deg,${C.cyanDim},${C.surface2})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.bn,fontSize:46,color:C.cyan}}>{p.avatar}</div>}
            <div style={{position:"absolute",bottom:0,left:0,right:0,height:"60%",background:"linear-gradient(transparent,rgba(4,10,24,0.97))"}}/>
            <div style={{position:"absolute",left:0,right:0,bottom:6,padding:"0 6px",textAlign:"center"}}><div style={{fontFamily:F.bn,fontSize:13,color:"#fff",lineHeight:1}}>{p.name.length>14?p.name.slice(0,13).toUpperCase()+"…":p.name.toUpperCase()}</div></div>
          </div>
        </div>)}
      </div>
    </div>}
  </div>;
}

function ChampScreen({champion,tourney,onClose}){
  const pieces=Array.from({length:48},(_,i)=>({id:i,x:Math.random()*100,delay:Math.random()*1.8,dur:2.5+Math.random()*2,color:[C.gold,"#fff",C.cyan,C.cyanBright,"#FFD700"][Math.floor(Math.random()*5)],size:7+Math.random()*8}));
  const bp=champion.stats?.bpTotal>0?Math.round(champion.stats.bpWon/champion.stats.bpTotal*100):0;
  return <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:600,background:"rgba(4,10,24,0.97)",overflow:"auto",cursor:"pointer",animation:"fadeIn 0.4s"}}>
    <Aurora intense={0.6}/>
    {pieces.map(p=><div key={p.id} style={{position:"absolute",left:`${p.x}%`,top:-20,width:p.size,height:p.size,background:p.color,borderRadius:2,animation:`fall ${p.dur}s ${p.delay}s forwards`,zIndex:5}}/>)}
    <div style={{position:"absolute",inset:0,background:`radial-gradient(circle at 50% 38%,rgba(201,168,76,0.22) 0%,transparent 65%)`}}/>
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",minHeight:"100vh",padding:"30px 24px 40px",position:"relative",zIndex:3}}>
      <Logo size={56} glow/>
      <div style={{fontSize:80,animation:"trophy 1s 0.3s backwards",margin:"16px 0 12px"}}>🏆</div>
      <div style={{width:200,height:200,borderRadius:"50%",border:`4px solid ${C.gold}`,overflow:"hidden",marginBottom:18,animation:"scaleIn 0.7s 0.5s backwards, goldGlow 2.5s 1.2s infinite"}}>
        {champion.photo?<img src={champion.photo} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",animation:"breathing 4s infinite"}} alt=""/>:<div style={{width:"100%",height:"100%",background:C.goldDim,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.bn,fontSize:80,color:C.gold}}>{champion.avatar}</div>}
      </div>
      <div style={{fontFamily:F.bc,color:C.gold,textTransform:"uppercase",letterSpacing:"0.4em",fontSize:13,marginBottom:10,animation:"fadeIn 0.5s 0.8s backwards",fontWeight:600}}>CAMPEÓN · {tourney.name}</div>
      <div style={{overflow:"hidden",marginBottom:28}}><T size={56} style={{textAlign:"center",animation:"reveal 0.9s 0.9s backwards",lineHeight:0.95,textShadow:`0 0 50px rgba(201,168,76,0.5)`}}>{champion.name}</T></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,width:"100%",maxWidth:340}}>
        {[[champion.wins||0,"Victorias"],[champion.titles||0,"Títulos"],[champion.points||0,"Puntos"],[champion.stats?.aces||0,"Aces"],[champion.stats?.winners||0,"Winners"],[bp,"BP %"]].map(([v,l],i)=><div key={l} style={{background:"rgba(201,168,76,0.08)",border:`1px solid ${C.goldBdr}`,borderRadius:10,padding:"14px 8px",textAlign:"center",animation:`statPop 0.5s ${1.1+i*0.08}s backwards`}}>
          <div style={{fontFamily:F.bn,fontSize:34,color:C.gold,lineHeight:1}}><CountUp target={v} duration={1200} delay={1100+i*80} suffix={l==="BP %"?"%":""}/></div>
          <div style={{fontFamily:F.bc,fontSize:9,color:C.muted,letterSpacing:"0.18em",textTransform:"uppercase",marginTop:3,fontWeight:600}}>{l}</div>
        </div>)}
      </div>
    </div>
  </div>;
}

function MIns({data,onClose}){
  const {match,tourney,roundLbl}=data,p1=match.p1,p2=match.p2;
  const stats=[{k:"serve",l:"SERVE"},{k:"return",l:"RETURN"},{k:"forehand",l:"FOREHAND"},{k:"backhand",l:"BACKHAND"}];
  const gv=(p,k)=>{const v=p?.stats?.[k];return(v&&v>0)?parseFloat(v):parseFloat((6.5+Math.random()*2.5).toFixed(1));};
  return <div style={{minHeight:"100vh",background:C.navyDeep,color:C.text,fontFamily:F.ios,animation:"fadeIn 0.4s",position:"relative",overflow:"hidden"}}>
    <Aurora intense={0.5}/><Beam/>
    <div style={{position:"relative",zIndex:1}}>
      <div style={{textAlign:"center",padding:"22px 20px 10px",animation:"slideDown 0.5s"}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:10}}><Logo size={42} glow/></div>
        <div style={{fontFamily:F.bc,fontSize:12,letterSpacing:"0.4em",textTransform:"uppercase",marginBottom:5,color:C.cyan,fontWeight:600}}>MATCH INSIGHTS</div>
        <div style={{fontFamily:F.bn,fontSize:16,letterSpacing:"0.22em",color:C.text}}>{roundLbl?.toUpperCase()} · {tourney.name.toUpperCase()}</div>
      </div>
      <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-around",padding:"14px 12px 0",gap:8}}>
        {[p1,p2].map((p,idx)=>{const isWin=match.winner?.id===p?.id;return <div key={idx} style={{flex:1,textAlign:"center",animation:`introP 0.7s ${0.2+idx*0.15}s backwards`}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:12}}>
            <div style={{width:140,height:190,borderRadius:12,overflow:"hidden",border:`2px solid ${isWin?C.cyan:C.cyanBdr}`,boxShadow:isWin?`0 0 30px ${C.cyanDim}`:"0 6px 24px rgba(0,0,0,0.4)",position:"relative"}}>
              {p?.photo?<img src={p.photo} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",filter:isWin?"none":"brightness(0.85)",animation:`panLR ${7+idx*0.5}s infinite`}} alt=""/>:<div style={{width:"100%",height:"100%",background:`linear-gradient(180deg,${C.cyanDim},${C.surface2})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.bn,fontSize:54,color:C.cyan}}>{p?p.avatar:"?"}</div>}
              {isWin&&<div style={{position:"absolute",top:6,left:6,background:C.cyan,color:C.bg,fontFamily:F.bn,fontSize:11,letterSpacing:"0.15em",padding:"3px 8px",borderRadius:6}}>WINNER</div>}
            </div>
          </div>
          <div style={{fontFamily:F.bc,fontSize:11,textTransform:"uppercase",letterSpacing:"0.22em",marginBottom:2,color:C.cyan,fontWeight:600}}>{p?.country||""}</div>
          <div style={{fontFamily:F.bn,fontSize:24,letterSpacing:"0.04em",color:isWin?C.cyan:C.text,lineHeight:1.05}}>{p?.name||""}</div>
        </div>;})}
      </div>
      <div style={{textAlign:"center",margin:"16px 0 6px",animation:"scaleIn 0.5s 0.6s backwards"}}><span style={{fontFamily:F.bn,fontSize:24,color:C.cyan,letterSpacing:"0.22em",fontWeight:600,display:"inline-block",background:C.cyanDim,border:`2px solid ${C.cyanBdr}`,padding:"8px 32px",borderRadius:10,boxShadow:`0 0 24px ${C.cyanDim}`}}>{match.score}</span></div>
      <div style={{background:`linear-gradient(135deg,${C.cyanBright},${C.cyanDeep})`,textAlign:"center",padding:"10px 0",margin:"14px 0 2px",animation:"slideRight 0.5s 0.7s backwards",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:`linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)`,animation:"shimmer 3s infinite"}}/>
        <div style={{fontFamily:F.bn,fontSize:14,letterSpacing:"0.32em",color:"#fff",position:"relative"}}>TOURNAMENT AVG.</div>
      </div>
      {stats.map(({k,l},si)=>{const v1=gv(p1,k),v2=gv(p2,k),avg=TAVG[k];return <div key={k} style={{display:"flex",alignItems:"center",background:C.surface2,borderBottom:`1px solid rgba(79,195,247,0.06)`,padding:"13px 12px",gap:8,animation:`slideUp 0.5s ${0.8+si*0.1}s backwards`}}>
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
          <div style={{fontFamily:F.bn,fontSize:34,color:C.cyan,lineHeight:1}}><CountUp target={v1} duration={1500} delay={900+si*120} decimals={1}/></div>
          <div style={{height:6,background:C.cyanBright,borderRadius:3,width:`${(v1/10)*100}%`,boxShadow:`0 0 8px ${C.cyanDim}`}}/>
          <div style={{height:2,background:"rgba(255,255,255,0.18)",borderRadius:1,width:`${(avg/10)*100}%`}}/>
        </div>
        <div style={{width:114,textAlign:"center",flexShrink:0}}><div style={{fontFamily:F.bn,fontSize:17,letterSpacing:"0.16em",color:C.text}}>{l}</div><div style={{fontFamily:F.bc,fontSize:9,letterSpacing:"0.16em",marginTop:3,color:C.muted}}>Tour avg {avg}</div></div>
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:4}}>
          <div style={{fontFamily:F.bn,fontSize:34,color:C.cyan,lineHeight:1}}><CountUp target={v2} duration={1500} delay={900+si*120} decimals={1}/></div>
          <div style={{height:6,background:C.cyanBright,borderRadius:3,width:`${(v2/10)*100}%`,boxShadow:`0 0 8px ${C.cyanDim}`}}/>
          <div style={{height:2,background:"rgba(255,255,255,0.18)",borderRadius:1,width:`${(avg/10)*100}%`}}/>
        </div>
      </div>;})}
      {match.winner&&<div style={{margin:"16px 18px",background:C.cyanDim,border:`1px solid ${C.cyanBdr}`,borderRadius:12,padding:16,textAlign:"center",animation:"scaleIn 0.6s 1.5s backwards",boxShadow:`0 0 24px ${C.cyanDim}`,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:`linear-gradient(90deg,transparent,rgba(79,195,247,0.15),transparent)`,animation:"shimmer 3s infinite"}}/>
        <div style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",gap:14}}>
          <PA photo={match.winner.photo} avatar={match.winner.avatar} size={56} border={`3px solid ${C.cyan}`} animated/>
          <div style={{textAlign:"left"}}>
            <div style={{fontFamily:F.bc,color:C.cyan,textTransform:"uppercase",letterSpacing:"0.28em",marginBottom:4,fontSize:11,fontWeight:600}}>🏆 GANADOR</div>
            <T size={26}>{match.winner.name}</T>
          </div>
        </div>
      </div>}
      <div style={{padding:"14px 18px 32px"}}><BtnP onClick={onClose}>VOLVER AL TORNEO</BtnP></div>
    </div>
  </div>;
}

export default function App(){
  const [accounts,setAccounts]=useState([]);
  const [authLoading,setAuthLoading]=useState(true);
  const [adminPass,setAdminPass]=useState(ADMIN_PASS);
  const [tournaments,setTournaments]=useState(DEMO_T);
  const [user,setUser]=useState(null);
  const [isAdmin,setIsAdmin]=useState(false);
  // PALETA: si jugadora femenina (no admin), usar rosa pastel
  const isFem=!isAdmin&&user?.sex==="F";
  C=isFem?C_FEM:C_MEN;
  const [screen,setScreen]=useState("welcome");
  const [authMode,setAuthMode]=useState(null);
  const [authForm,setAuthForm]=useState({email:"",password:"",name:""});
  const [authErr,setAuthErr]=useState("");
  const [recoveryFlow,setRecoveryFlow]=useState(null);
  const [recoveryCode,setRecoveryCode]=useState("");
  const [newRecPass,setNewRecPass]=useState("");
  // RECUPERACIÓN DE JUGADORES: solicitudes al admin
  const [passwordResetRequests,setPasswordResetRequests]=useState([]);
  const [resetRequestSent,setResetRequestSent]=useState(false);
  // POLÍTICA DE PRIVACIDAD
  const [acceptedPrivacy,setAcceptedPrivacy]=useState(false);
  const [showPrivacyModal,setShowPrivacyModal]=useState(false);
  // Modal para mostrar contraseña temporal generada por admin
  const [tempPassDisplay,setTempPassDisplay]=useState(null);
  const [welcomeAnim,setWelcomeAnim]=useState(false);
  const [selT,setSelT]=useState(null);
  const [viewP,setViewP]=useState(null);
  // ===== SOCIAL (grupos + chat) =====
  const [myGroups,setMyGroups]=useState([]);
  const [discoverGroups,setDiscoverGroups]=useState([]);
  const [socialTab,setSocialTab]=useState("mine"); // mine | discover
  const [socialLoading,setSocialLoading]=useState(false);
  const [activeGroup,setActiveGroup]=useState(null);
  const [groupMsgs,setGroupMsgs]=useState([]);
  const [chatInput,setChatInput]=useState("");
  const [chatSending,setChatSending]=useState(false);
  const [showCreateGroup,setShowCreateGroup]=useState(false);
  const [newGroup,setNewGroup]=useState({name:"",description:"",isPublic:true});
  const [creatingGroup,setCreatingGroup]=useState(false);
  const [inviteGroup,setInviteGroup]=useState(null); // grupo cuyo link de invitación se muestra
  const [inviteCopied,setInviteCopied]=useState(false);
  const [pendingJoinCode,setPendingJoinCode]=useState(null);
  const [groupMembers,setGroupMembers]=useState([]);
  const [showGroupInfo,setShowGroupInfo]=useState(false);
  const [replyingTo,setReplyingTo]=useState(null); // mensaje al que estoy respondiendo
  const [reactPickerFor,setReactPickerFor]=useState(null); // id del mensaje con el picker de reacciones abierto
  const [notifications,setNotifications]=useState([]);
  const [showNotifs,setShowNotifs]=useState(false);
  const [sb,setSb]=useState(null);          // estado del partido en el marcador
  const [sbHist,setSbHist]=useState([]);     // historial para deshacer
  const [sbP1,setSbP1]=useState("");
  const [sbP2,setSbP2]=useState("");
  const [tab,setTab]=useState("draw");
  const [subData,setSubData]=useState(null);
  const [subStep,setSubStep]=useState("pick");
  const [picked,setPicked]=useState(null);
  const [sc1,setSc1]=useState("6");const[sc2,setSc2]=useState("3");
  const [setScores,setSetScores]=useState([{a:"6",b:"3"},{a:"6",b:"4"},{a:"",b:""}]);
  const [insights,setInsights]=useState(null);
  const [champion,setChampion]=useState(null);
  const [showIntro,setShowIntro]=useState(false);
  const [showCreate,setShowCreate]=useState(false);
  const [editTourney,setEditTourney]=useState(null);
  const [deleteTId,setDeleteTId]=useState(null);
  const [showProfileEdit,setShowProfileEdit]=useState(false);
  const [editProfile,setEditProfile]=useState(null);
  const [showDeleteAccount,setShowDeleteAccount]=useState(false);
  const [deleteConfirmText,setDeleteConfirmText]=useState("");
  const [editAsAdmin,setEditAsAdmin]=useState(false);
  const [showChangePass,setShowChangePass]=useState(false);
  const [passForm,setPassForm]=useState({old:"",new:""});
  const [addPlayerModal,setAddPlayerModal]=useState(null);
  const [addSearch,setAddSearch]=useState("");
  const [newT,setNewT]=useState({name:"",date:"",surface:"Clay",location:"",city:"",state:"Nuevo León",country:"México",maxPlayers:"8",prize:"",format:"groups+ko",modality:"singles",gender:"M",category:"B",image:null});
  const [categoryRequests,setCategoryRequests]=useState([]);
  const [tournamentRequests,setTournamentRequests]=useState([]);
  const [createPermissions,setCreatePermissions]=useState({});
  const [media,setMedia]=useState([]);
  const [matchRequests,setMatchRequests]=useState([]);
  const [reqCatModal,setReqCatModal]=useState(null);
  const [reqTourModal,setReqTourModal]=useState(false);
  const [newReqT,setNewReqT]=useState({name:"",date:"",surface:"Clay",location:"",prize:"",modality:"singles",gender:"M",category:"B",format:"groups+ko"});
  const [mediaUploadModal,setMediaUploadModal]=useState(false);
  const [matchReqModal,setMatchReqModal]=useState(null);
  const [newMatchReq,setNewMatchReq]=useState({club:"Club Campestre Monterrey",when:"weekend",time:"morning",msg:""});
  const [rankingTab,setRankingTab]=useState("Abierta");
  const [findMatchTab,setFindMatchTab]=useState("players");
  const [phoneShare,setPhoneShare]=useState(null);
  const [rankingGender,setRankingGender]=useState("M");
  const [mediaComments,setMediaComments]=useState({});
  const [openMedia,setOpenMedia]=useState(null);
  const [commentDraft,setCommentDraft]=useState("");
  const [statRequests,setStatRequests]=useState([]);
  const [showFmFilters,setShowFmFilters]=useState(false);
  const [fmFilters,setFmFilters]=useState({category:"",gender:"",country:"",state:"",city:"",club:""});
  const [showTFilters,setShowTFilters]=useState(false);
  const [tFilters,setTFilters]=useState({category:"",gender:"",country:"",state:"",city:"",club:""});
  const [svRequests,setSvRequests]=useState([]);
  const [showSvModal,setShowSvModal]=useState(false);
  const [svDraft,setSvDraft]=useState({serve:"",return:"",forehand:"",backhand:"",image:null});
  const [viewSvImg,setViewSvImg]=useState(null);
  const [mediaRequests,setMediaRequests]=useState([]);
  const [postMediaModal,setPostMediaModal]=useState(false);
  const [mediaDraft,setMediaDraft]=useState({type:null,url:null,caption:""});
  const [previewMediaReq,setPreviewMediaReq]=useState(null);
  const [marketplace,setMarketplace]=useState([]);
  const [mpModal,setMpModal]=useState(false);
  const [mpDraft,setMpDraft]=useState({title:"",category:"Raqueta",price:"",condition:"Nuevo",description:"",images:[]});
  const [mpDetail,setMpDetail]=useState(null);
  const [mpFilter,setMpFilter]=useState("Todos");
  const [mpScanning,setMpScanning]=useState(false);
  const [mpScanResult,setMpScanResult]=useState(null);
  const [mpStrikes,setMpStrikes]=useState({});
  const [bannedUsers,setBannedUsers]=useState([]);
  const [purchaseRequests,setPurchaseRequests]=useState([]);
  const [mpContactShare,setMpContactShare]=useState(null);
  // COACH
  const [coachApplications,setCoachApplications]=useState([]); // solicitudes para ser coach
  const [coachRequests,setCoachRequests]=useState([]); // solicitudes de entrenamiento
  const [showCoachApply,setShowCoachApply]=useState(false);
  const [coachDraft,setCoachDraft]=useState({experience:"",specialties:[],bio:"",hourlyRate:"",availability:"",languages:["Español"]});
  const [showCoachRequest,setShowCoachRequest]=useState(null);
  const [coachRequestForm,setCoachRequestForm]=useState({frequency:"weekly",when:"weekend",time:"morning",msg:""});
  const [coachContactShare,setCoachContactShare]=useState(null);

  const getT=()=>tournaments.find(t=>t.id===selT?.id);
  useEffect(()=>{if("speechSynthesis" in window) window.speechSynthesis.getVoices();},[]);

  // ====== SUPABASE: cargar usuarios y restaurar sesión al abrir la app ======
  const loadAllAccounts=async()=>{
    try{
      const {data,error}=await supabase.from("profiles").select("*");
      if(error){console.error("Error cargando perfiles:",error.message);return;}
      if(data) setAccounts(data.map(profileToPlayer));
    }catch(e){console.error("Error cargando perfiles:",e);}
  };
  useEffect(()=>{
    let active=true;
    (async()=>{
      await loadAllAccounts();
      try{
        const {data:{session}}=await supabase.auth.getSession();
        if(session?.user&&active){
          const {data:prof}=await supabase.from("profiles").select("*").eq("auth_id",session.user.id).single();
          if(prof&&active){
            const p=profileToPlayer(prof);
            if(p.isBanned){await supabase.auth.signOut();}
            else{setUser(p);setIsAdmin(false);setScreen("home");}
          }
        }
      }catch(e){console.error("Error restaurando sesión:",e);}
      if(active)setAuthLoading(false);
    })();
    // Mantener la sesión sincronizada
    const {data:sub}=supabase.auth.onAuthStateChange((_event,session)=>{
      if(!session){/* sesión cerrada */}
    });
    return()=>{active=false;sub?.subscription?.unsubscribe?.();};
  },[]);

  const updateEverywhere=(u)=>{
    setAccounts(prev=>prev.map(a=>a.id===u.id?u:a));
    setTournaments(prev=>prev.map(t=>({...t,players:t.players.map(p=>p.id===u.id?u:p),pendingPlayers:t.pendingPlayers.map(p=>p.id===u.id?u:p),groups:t.groups.map(g=>({...g,players:g.players.map(p=>p.id===u.id?u:p),matches:g.matches.map(m=>({...m,p1:m.p1?.id===u.id?u:m.p1,p2:m.p2?.id===u.id?u:m.p2,winner:m.winner?.id===u.id?u:m.winner}))})),rounds:t.rounds.map(r=>r.map(m=>({...m,p1:m.p1?.id===u.id?u:m.p1,p2:m.p2?.id===u.id?u:m.p2,winner:m.winner?.id===u.id?u:m.winner})))})));
    if(viewP?.id===u.id)setViewP(u);
  };
  const updateUser=(u)=>{setUser(u);updateEverywhere(u);};
  const updateAccount=(u)=>updateEverywhere(u);
  const trigWelcome=()=>{setWelcomeAnim(true);setTimeout(()=>setWelcomeAnim(false),3200);};

  const doLogin=async()=>{setAuthErr("");
    if(authMode==="player-login"){
      const email=authForm.email.trim().toLowerCase();
      if(!email||!authForm.password)return setAuthErr("Completa email y contraseña");
      setAuthErr("Entrando...");
      try{
        const {data,error}=await supabase.auth.signInWithPassword({email,password:authForm.password});
        if(error){setAuthErr(error.message.includes("Invalid")?"Email o contraseña incorrectos":error.message);return;}
        const {data:prof,error:pErr}=await supabase.from("profiles").select("*").eq("auth_id",data.user.id).single();
        if(pErr||!prof){setAuthErr("No se encontró tu perfil. Contacta al administrador.");return;}
        const p=profileToPlayer(prof);
        if(p.isBanned){await supabase.auth.signOut();setAuthErr("⛔ Tu cuenta ha sido suspendida por subir contenido inapropiado.");return;}
        setAuthErr("");setUser(p);setIsAdmin(false);
        if(p.requirePasswordChange){setTimeout(()=>{setShowChangePass(true);alert("🔐 Por seguridad, debes cambiar la contraseña temporal por una nueva.");},800);}
        setScreen("home");setAuthForm({email:"",password:"",name:""});trigWelcome();
      }catch(e){setAuthErr("Error de conexión. Revisa tu internet.");}
    }else if(authMode==="admin-login"){
      if(authForm.password!==adminPass)return setAuthErr("Contraseña incorrecta");
      setIsAdmin(true);setUser({id:"admin",name:"Administrador SMT",firstName:"Admin",lastName:"SMT",avatar:"AD",photo:null,email:"smt.tennismx@gmail.com"});setScreen("home");setAuthForm({email:"",password:"",name:""});trigWelcome();
    }
  };
  const doRegister=async()=>{setAuthErr("");
    if(!authForm.email.trim()||!authForm.password||!authForm.name.trim())return setAuthErr("Completa todos los campos");
    if(!authForm.birthdate)return setAuthErr("La fecha de nacimiento es obligatoria");
    if(authForm.password.length<8)return setAuthErr("Contraseña mínimo 8 caracteres");
    if(!/[A-Z]/.test(authForm.password)||!/[0-9]/.test(authForm.password))return setAuthErr("La contraseña debe incluir mayúscula y número");
    if(!acceptedPrivacy)return setAuthErr("Debes aceptar el Aviso de Privacidad para crear tu cuenta");
    const email=authForm.email.trim().toLowerCase();
    setAuthErr("Creando tu cuenta...");
    try{
      const {data,error}=await supabase.auth.signUp({email,password:authForm.password});
      if(error){
        if(error.message.toLowerCase().includes("already")||error.message.toLowerCase().includes("registered"))setAuthErr("Este email ya está registrado");
        else setAuthErr(error.message);
        return;
      }
      if(!data.user){setAuthErr("No se pudo crear la cuenta. Intenta de nuevo.");return;}
      const newPlayer=mkPlayer({id:data.user.id,email,name:authForm.name.trim(),birthdate:authForm.birthdate,ranking:accounts.length+1,points:0,wins:0,losses:0,titles:0});
      newPlayer.privacyAcceptedAt=Date.now();
      const row=playerToProfile(newPlayer,data.user.id);
      const {error:insErr}=await supabase.from("profiles").insert(row);
      if(insErr){console.error("Error guardando perfil:",insErr.message);setAuthErr("Error al guardar tu perfil: "+insErr.message);return;}
      setAuthErr("");
      const p=profileToPlayer(row);
      setAccounts(prev=>[...prev.filter(a=>a.id!==p.id),p]);
      setUser(p);setIsAdmin(false);setScreen("home");setAuthForm({email:"",password:"",name:""});setAcceptedPrivacy(false);trigWelcome();
    }catch(e){setAuthErr("Error de conexión. Revisa tu internet.");}
  };
  // Generar contraseña temporal aleatoria segura
  const generateTempPassword=()=>{
    const upper="ABCDEFGHJKLMNPQRSTUVWXYZ";
    const lower="abcdefghijkmnpqrstuvwxyz";
    const nums="23456789";
    const all=upper+lower+nums;
    let p=upper.charAt(Math.floor(Math.random()*upper.length));
    p+=nums.charAt(Math.floor(Math.random()*nums.length));
    for(let i=0;i<8;i++)p+=all.charAt(Math.floor(Math.random()*all.length));
    return p.split("").sort(()=>Math.random()-0.5).join("");
  };

  const doRecover=()=>{
    setAuthErr("");
    // FLUJO ADMIN: código por email (a smt.tennismx@gmail.com)
    if(authMode==="admin-recover"){
      const adminEmail="smt.tennismx@gmail.com";
      const code=String(Math.floor(100000+Math.random()*900000));
      setRecoveryFlow({email:adminEmail,code,target:"admin",step:"verify"});
      alert(`📧 EMAIL ENVIADO\n\nEnviamos un código de verificación a:\n${adminEmail}\n\nRevisa tu bandeja de entrada (y carpeta spam).\n\n[Modo demo - código generado: ${code}]\n\nEn producción este código solo aparecería en tu correo.`);
      return;
    }
    // FLUJO JUGADOR: solicitar al admin
    const a=accounts.find(x=>x.email.toLowerCase()===authForm.email.toLowerCase());
    if(!a)return setAuthErr("Email no registrado");
    // Verificar que no haya ya una solicitud pendiente
    const existing=passwordResetRequests.find(r=>r.accountId===a.id&&r.status==="pending");
    if(existing){setResetRequestSent(true);return;}
    setPasswordResetRequests(prev=>[...prev,{id:`pr-${Date.now()}`,accountId:a.id,email:a.email,name:a.name,playerPhoto:a.photo,playerAvatar:a.avatar,time:Date.now(),status:"pending"}]);
    setResetRequestSent(true);
  };
  const verifyRecoveryCode=()=>{
    if(!recoveryFlow)return;
    if(recoveryCode.trim()!==recoveryFlow.code){alert("Código incorrecto. Revisa tu correo y vuelve a intentar.");return;}
    setRecoveryFlow({...recoveryFlow,step:"reset"});
    setRecoveryCode("");
  };
  const resetRecoveredPassword=()=>{
    if(!recoveryFlow)return;
    if(!newRecPass||newRecPass.length<8){alert("La nueva contraseña debe tener mínimo 8 caracteres por seguridad.");return;}
    if(!/[A-Z]/.test(newRecPass)||!/[0-9]/.test(newRecPass)){alert("La contraseña debe incluir al menos una letra mayúscula y un número.");return;}
    if(recoveryFlow.target==="admin"){
      setAdminPass(newRecPass);
      alert("✓ Contraseña de administrador actualizada.\n\nYa puedes iniciar sesión con tu nueva contraseña.");
    }
    setRecoveryFlow(null);
    setNewRecPass("");
    setAuthMode("admin-login");
    setAuthForm({email:"",password:"",name:""});
  };
  // ADMIN aprueba o rechaza solicitud de reset de contraseña de jugador
  const approveResetRequest=(rid,approve)=>{
    const r=passwordResetRequests.find(x=>x.id===rid);if(!r)return;
    if(approve){
      const a=accounts.find(x=>x.id===r.accountId);
      if(!a){setPasswordResetRequests(prev=>prev.map(x=>x.id===rid?{...x,status:"rejected"}:x));return;}
      const tempPass=generateTempPassword();
      updateAccount({...a,password:tempPass,requirePasswordChange:true});
      setPasswordResetRequests(prev=>prev.map(x=>x.id===rid?{...x,status:"approved",tempPassword:tempPass,approvedAt:Date.now()}:x));
      // Mostrar al admin la contraseña temporal para que sepa qué se le envió al jugador
      setTempPassDisplay({playerName:r.name,playerEmail:r.email,tempPass});
    }else{
      setPasswordResetRequests(prev=>prev.map(x=>x.id===rid?{...x,status:"rejected"}:x));
    }
  };
  const doLogout=async()=>{try{if(!isAdmin)await supabase.auth.signOut();}catch(e){}setUser(null);setIsAdmin(false);setScreen("welcome");setAuthMode(null);setAuthForm({email:"",password:"",name:""});};
  const doDeleteAccount=async()=>{
    if(!user)return;
    const uid=user.id;
    try{
      // Borrar el perfil de la base de datos
      await supabase.from("profiles").delete().eq("auth_id",uid);
      // Borrar la cuenta de autenticación (función creada en Supabase)
      await supabase.rpc("delete_own_account");
      await supabase.auth.signOut();
    }catch(e){console.error("Error eliminando cuenta:",e);}
    // Limpiar datos locales asociados
    setAccounts(prev=>prev.filter(a=>a.id!==uid));
    setTournaments(prev=>prev.map(t=>({...t,players:t.players.filter(p=>p.id!==uid),pendingPlayers:t.pendingPlayers.filter(p=>p.id!==uid)})));
    setMarketplace(prev=>prev.filter(m=>m.sellerId!==uid&&m.ownerId!==uid));
    setMatchRequests(prev=>prev.filter(r=>r.fromId!==uid&&r.toId!==uid));
    setCategoryRequests(prev=>prev.filter(r=>r.playerId!==uid));
    setStatRequests(prev=>prev.filter(r=>r.playerId!==uid));
    setCoachApplications(prev=>prev.filter(r=>r.userId!==uid&&r.playerId!==uid));
    setCoachRequests(prev=>prev.filter(r=>r.fromId!==uid&&r.coachId!==uid));
    setMedia(prev=>prev.filter(m=>m.userId!==uid&&m.authorId!==uid));
    setShowDeleteAccount(false);
    setDeleteConfirmText("");
    setUser(null);setIsAdmin(false);setScreen("welcome");setAuthMode(null);setAuthForm({email:"",password:"",name:""});
    setTimeout(()=>alert("Tu cuenta y todos tus datos han sido eliminados permanentemente."),300);
  };

  const reqReg=(tid)=>{const t=tournaments.find(x=>x.id===tid);if(!t)return;if(t.players.find(p=>p.id===user.id)||t.pendingPlayers.find(p=>p.id===user.id))return;if(t.players.length+t.pendingPlayers.length>=parseInt(t.maxPlayers))return;const userIsMinor=isMinor(user.birthdate);if(!isAdmin&&userIsMinor&&!t.forMinors){alert("Este torneo es para mayores de edad. No puedes inscribirte.");return;}if(!isAdmin&&!userIsMinor&&t.forMinors){alert("Este torneo es exclusivo para menores de edad.");return;}if(t.gender&&t.gender!=="Mixed"&&user.sex&&user.sex!==t.gender){alert(`Este torneo es exclusivo para categoría ${t.gender==="M"?"masculino ♂":"femenino ♀"}.`);return;}if(!isAdmin&&t.category){if(!user.category){alert("Debes seleccionar tu categoría en tu perfil antes de inscribirte a torneos.");return;}const userCatIdx=CATS.indexOf(user.category),tCatIdx=CATS.indexOf(t.category);if(tCatIdx>userCatIdx){alert(`No puedes inscribirte a torneos de categoría inferior. Tu categoría es ${user.category}, este torneo es ${t.category}.`);return;}}if(isAdmin)setTournaments(prev=>prev.map(x=>x.id===tid?{...x,players:[...x.players,user]}:x));else setTournaments(prev=>prev.map(x=>x.id===tid?{...x,pendingPlayers:[...x.pendingPlayers,user]}:x));};
  const adminApprove=(tid,pid)=>{const t=tournaments.find(x=>x.id===tid),p=t.pendingPlayers.find(p=>p.id===pid);setTournaments(prev=>prev.map(x=>x.id===tid?{...x,players:[...x.players,p],pendingPlayers:x.pendingPlayers.filter(pp=>pp.id!==pid)}:x));};
  const adminReject=(tid,pid)=>setTournaments(prev=>prev.map(x=>x.id===tid?{...x,pendingPlayers:x.pendingPlayers.filter(p=>p.id!==pid)}:x));
  const adminAdd=(tid,pid)=>{const p=accounts.find(a=>a.id===pid);setTournaments(prev=>prev.map(x=>{if(x.id!==tid)return x;if(x.players.find(pp=>pp.id===pid))return x;return{...x,players:[...x.players,p],pendingPlayers:x.pendingPlayers.filter(pp=>pp.id!==pid)};}));};
  const adminRemove=(tid,pid)=>setTournaments(prev=>prev.map(x=>x.id===tid?{...x,players:x.players.filter(p=>p.id!==pid)}:x));

  const generateDraw=(tid)=>setTournaments(prev=>prev.map(t=>{if(t.id!==tid||t.players.length<2)return t;if(t.format==="groups+ko")return{...t,groups:buildGroups(t.players,t.groupSize||4),rounds:[],status:"groups"};return{...t,rounds:buildKO(t.players),groups:[],status:"inprogress"};}));
  const generateKO=(tid)=>setTournaments(prev=>prev.map(t=>{if(t.id!==tid||t.format!=="groups+ko")return t;if(!t.groups.every(g=>g.matches.every(m=>m.status==="done")))return t;const q=[];t.groups.forEach(g=>{const st=getStandings(g);q.push(st[0].player);if(st[1])q.push(st[1].player);});return{...t,rounds:buildKO(q),status:"inprogress"};}));

  const submitResult=()=>{
    if(!subData||!picked)return;
    const{tid,kind,ri,gi,match}=subData;
    // SEGURIDAD: validar que el usuario actual es jugador del partido o admin
    if(!isAdmin&&user&&match.p1?.id!==user.id&&match.p2?.id!==user.id){alert("⛔ No puedes registrar el resultado de un partido en el que no participas.");setSubData(null);setSubStep("pick");setPicked(null);return;}
    // Calcular sets ganados desde los games
    const validSets=setScores.filter(s=>s.a!==""&&s.b!==""&&!isNaN(parseInt(s.a))&&!isNaN(parseInt(s.b)));
    if(validSets.length===0){alert("Ingresa al menos un set válido.");return;}
    let setsA=0,setsB=0;
    validSets.forEach(s=>{const a=parseInt(s.a),b=parseInt(s.b);if(a>b)setsA++;else if(b>a)setsB++;});
    if(setsA===setsB){alert("El resultado no puede empatar en sets. Revisa los marcadores.");return;}
    // Determinar ganador desde games (pero respetamos el "picked" del usuario - el picked es quien ganó)
    // Validar que picked es coherente con los games
    const pickedIsP1=picked.id===match.p1.id;
    const winnerByGames=setsA>setsB?match.p1:match.p2;
    if(picked.id!==winnerByGames.id){alert(`Según los marcadores, ${winnerByGames.name} ganó (${setsA>setsB?setsA+"-"+setsB:setsB+"-"+setsA} en sets). Verifica.`);return;}
    // Score detallado por set
    const detailedScore=validSets.map(s=>pickedIsP1?`${s.a}-${s.b}`:`${s.b}-${s.a}`).join(", ");
    const scoreStr=pickedIsP1?`${setsA}-${setsB}`:`${setsB}-${setsA}`;
    const result={winner:picked,score:scoreStr,detailedScore,submittedBy:user?.id};
    const t=tournaments.find(x=>x.id===tid);
    setTournaments(prev=>prev.map(t=>{
      if(t.id!==tid)return t;
      if(isAdmin){
        if(kind==="group"){const ng=t.groups.map((g,gix)=>gix!==gi?g:{...g,matches:g.matches.map(m=>m.id!==match.id?m:{...m,winner:picked,score:scoreStr,detailedScore,status:"done",pendingResult:null})});return{...t,groups:ng};}
        const nr=t.rounds.map((rnd,rix)=>rix!==ri?rnd:rnd.map(m=>m.id!==match.id?m:{...m,winner:picked,score:scoreStr,detailedScore,status:"done",pendingResult:null}));
        const adv=advKO(nr),last=adv[adv.length-1],isDone=last.length===1&&last[0].status==="done";
        if(isDone){const ch=picked;const newCat=nextCat(ch.category||"Di");if(ch.category&&newCat!==ch.category){setTimeout(()=>updateAccount({...ch,category:newCat,categoryLocked:true,titles:(ch.titles||0)+1}),100);}setTimeout(()=>setChampion({champion:ch,tourney:t}),500);}
        return{...t,rounds:adv,status:isDone?"completed":"inprogress"};
      }
      if(kind==="group"){const ng=t.groups.map((g,gix)=>gix!==gi?g:{...g,matches:g.matches.map(m=>m.id!==match.id?m:{...m,pendingResult:result})});return{...t,groups:ng};}
      const nr=t.rounds.map((rnd,rix)=>rix!==ri?rnd:rnd.map(m=>m.id!==match.id?m:{...m,pendingResult:result}));
      return{...t,rounds:nr};
    }));
    if(isAdmin){setInsights({match:{...match,winner:picked,score:scoreStr,detailedScore},tourney:t,roundLbl:kind==="group"?`GRUPO ${String.fromCharCode(65+gi)}`:rLabel(ri,t.rounds.length)});setScreen("insights");}
    setSubData(null);setSubStep("pick");setPicked(null);setSetScores([{a:"6",b:"3"},{a:"6",b:"4"},{a:"",b:""}]);
  };

  const adminApproveResult=(tid,kind,gi,ri,mid,approve)=>{
    setTournaments(prev=>prev.map(t=>{
      if(t.id!==tid)return t;
      if(kind==="group"){const ng=t.groups.map((g,gix)=>gix!==gi?g:{...g,matches:g.matches.map(m=>{if(m.id!==mid)return m;if(!approve)return{...m,pendingResult:null};return{...m,winner:m.pendingResult.winner,score:m.pendingResult.score,detailedScore:m.pendingResult.detailedScore,status:"done",pendingResult:null};})});return{...t,groups:ng};}
      const nr=t.rounds.map((rnd,rix)=>rix!==ri?rnd:rnd.map(m=>{if(m.id!==mid)return m;if(!approve)return{...m,pendingResult:null};return{...m,winner:m.pendingResult.winner,score:m.pendingResult.score,detailedScore:m.pendingResult.detailedScore,status:"done",pendingResult:null};}));
      const adv=approve?advKO(nr):nr,last=adv[adv.length-1],isDone=last.length===1&&last[0].status==="done"&&approve;
      if(isDone){const ch=last[0].winner;const newCat=nextCat(ch.category||"Di");if(ch.category&&newCat!==ch.category){setTimeout(()=>updateAccount({...ch,category:newCat,categoryLocked:true,titles:(ch.titles||0)+1}),100);}setTimeout(()=>setChampion({champion:ch,tourney:t}),300);}
      return{...t,rounds:adv,status:isDone?"completed":t.status};
    }));
  };

  const createTourney=()=>{if(!newT.name.trim())return;if(!isAdmin&&!createPermissions[user.id]){alert("No tienes permisos para crear torneos.");return;}const creatorIsMinor=!isAdmin&&isMinor(user.birthdate);const t={id:`t-${Date.now()}`,name:newT.name,date:newT.date,surface:newT.surface,location:newT.location||"Monterrey, NL",city:newT.city||"Monterrey",state:newT.state||"Nuevo León",country:newT.country||"México",maxPlayers:parseInt(newT.maxPlayers)||8,format:newT.format,modality:newT.modality,gender:newT.gender,category:newT.category,forMinors:isAdmin?(newT.forMinors||false):creatorIsMinor,groupSize:4,players:[],pendingPlayers:[],groups:[],rounds:[],status:"open",prize:newT.prize||"TBD",image:newT.image,createdBy:isAdmin?"admin":user.id};setTournaments(prev=>[...prev,t]);if(!isAdmin)setCreatePermissions(prev=>({...prev,[user.id]:Math.max(0,(prev[user.id]||1)-1)}));setShowCreate(false);setNewT({name:"",date:"",surface:"Clay",location:"",city:"",state:"Nuevo León",country:"México",maxPlayers:"8",prize:"",format:"groups+ko",modality:"singles",gender:"M",category:"B",image:null,forMinors:false});};
  const saveTEdit=()=>{setTournaments(prev=>prev.map(t=>t.id===editTourney.id?{...t,...editTourney}:t));setEditTourney(null);};
  const confDelT=()=>{setTournaments(prev=>prev.filter(t=>t.id!==deleteTId));setDeleteTId(null);};

  const saveProfile=()=>{
    const orig=accounts.find(a=>a.id===editProfile.id);
    const u={...editProfile,name:`${editProfile.firstName} ${editProfile.lastName}`.trim(),avatar:ini(`${editProfile.firstName} ${editProfile.lastName}`)};
    // Categoría: si jugador (no admin) y ya tenía categoría con lock, y la cambió → crear solicitud, no aplicar cambio
    if(!editAsAdmin&&orig?.categoryLocked&&editProfile.category!==orig.category&&editProfile.category){
      const exists=categoryRequests.find(r=>r.playerId===editProfile.id&&r.status==="pending");
      if(!exists){setCategoryRequests(prev=>[...prev,{id:`cr-${Date.now()}`,playerId:editProfile.id,playerName:u.name,from:orig.category,to:editProfile.category,status:"pending",time:Date.now()}]);alert(`Solicitud de cambio de categoría (${orig.category} → ${editProfile.category}) enviada al administrador.`);}
      else alert("Ya tienes una solicitud de cambio de categoría pendiente.");
      u.category=orig.category;
    }
    // Si es la primera vez que selecciona categoría, marcar como locked
    if(editProfile.category&&!orig?.categoryLocked&&!editAsAdmin) u.categoryLocked=true;
    // Resumen de temporada: si jugador edita stats → crear solicitud y revertir
    if(!editAsAdmin&&orig){
      const statKeys=["wins","losses","titles","points","setsDropped","gamesLost","aces","doubleFaults","bpWon","bpTotal","winners","unforcedErrors"];
      const changes={};
      statKeys.forEach(k=>{
        const oldV=k==="wins"||k==="losses"||k==="titles"||k==="points"?(orig[k]||0):(orig.stats?.[k]||0);
        const newV=k==="wins"||k==="losses"||k==="titles"||k==="points"?(editProfile[k]||0):(editProfile.stats?.[k]||0);
        if(oldV!==newV) changes[k]={from:oldV,to:newV};
      });
      if(Object.keys(changes).length>0){
        setStatRequests(prev=>[...prev,{id:`sr-${Date.now()}`,playerId:editProfile.id,playerName:u.name,changes,status:"pending",time:Date.now()}]);
        alert(`Solicitud de modificación de resumen de temporada enviada al administrador (${Object.keys(changes).length} cambio${Object.keys(changes).length!==1?"s":""}).`);
        // Revertir cambios en stats
        ["wins","losses","titles","points"].forEach(k=>{u[k]=orig[k];});
        u.stats={...orig.stats};
      }
    }
    if(editAsAdmin)updateAccount(u);else updateUser(u);
    // Guardar cambios en Supabase
    (async()=>{try{
      const row=playerToProfile(u,u.id);
      delete row.created_at;
      const {error}=await supabase.from("profiles").update(row).eq("auth_id",u.id);
      if(error)console.error("Error actualizando perfil:",error.message);
    }catch(e){console.error("Error actualizando perfil:",e);}})();
    setShowProfileEdit(false);setEditAsAdmin(false);
  };

  // ====================== SOCIAL: funciones ======================
  const buildInviteUrl=(g)=>`https://smt-green.vercel.app/?join=${g.invite_code}`;

  const loadSocial=async()=>{
    if(!user||isAdmin)return;
    setSocialLoading(true);
    try{
      const {data:mem}=await supabase.from("group_members").select("group_id").eq("user_id",user.id);
      const myIds=(mem||[]).map(m=>m.group_id);
      let mine=[];
      if(myIds.length){
        const {data:gs}=await supabase.from("groups").select("*").in("id",myIds).order("created_at",{ascending:false});
        mine=gs||[];
      }
      setMyGroups(mine);
      const {data:pub}=await supabase.from("groups").select("*").eq("is_public",true).order("created_at",{ascending:false});
      setDiscoverGroups((pub||[]).filter(g=>!myIds.includes(g.id)));
    }catch(e){console.error("loadSocial",e);}
    setSocialLoading(false);
  };

  const openGroup=async(g)=>{
    setActiveGroup(g);setGroupMsgs([]);setGroupMembers([]);setScreen("group-chat");
    try{
      const {data:msgs}=await supabase.from("group_messages").select("*").eq("group_id",g.id).order("created_at",{ascending:true}).limit(300);
      setGroupMsgs(msgs||[]);
      const {data:mem}=await supabase.from("group_members").select("*").eq("group_id",g.id);
      setGroupMembers(mem||[]);
    }catch(e){console.error("openGroup",e);}
  };

  const createGroupFn=async()=>{
    if(!newGroup.name.trim()){alert("Ponle un nombre a tu grupo 🎾");return;}
    setCreatingGroup(true);
    try{
      const code=newGroup.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]/g,"").slice(0,12)+"-"+Math.random().toString(36).slice(2,6);
      const colors=["#1B4FD8","#7c3aed","#0288D1","#16a34a","#d97706","#db2777","#0891b2"];
      const color=colors[Math.floor(Math.random()*colors.length)];
      const {data:g,error}=await supabase.from("groups").insert({name:newGroup.name.trim(),description:newGroup.description.trim(),is_public:newGroup.isPublic,invite_code:code,avatar_color:color,created_by:user.id}).select().single();
      if(error)throw error;
      await supabase.from("group_members").insert({group_id:g.id,user_id:user.id,role:"admin"});
      setShowCreateGroup(false);setNewGroup({name:"",description:"",isPublic:true});
      await loadSocial();
      openGroup(g);
    }catch(e){console.error("createGroup",e);alert("No se pudo crear el grupo: "+(e.message||e));}
    setCreatingGroup(false);
  };

  // ==================== MARCADOR EN VIVO (motor de tenis) ====================
  const sbNewMatch=(p1,p2)=>({p1:p1||"Jugador 1",p2:p2||"Jugador 2",sets:[],games:[0,0],points:[0,0],tiebreak:false,tb:[0,0],matchTiebreak:false,mtb:[0,0],winner:null});
  const sbSetsWon=(st)=>[st.sets.filter(x=>x[0]>x[1]).length,st.sets.filter(x=>x[1]>x[0]).length];
  const sbFinalizeSet=(st,w)=>{
    st.sets=[...st.sets,[st.games[0],st.games[1]]];
    st.games=[0,0];st.points=[0,0];st.tiebreak=false;st.tb=[0,0];
    const sw=sbSetsWon(st);
    if(sw[0]>=2){st.winner=0;return;}
    if(sw[1]>=2){st.winner=1;return;}
    if(sw[0]===1&&sw[1]===1){st.matchTiebreak=true;st.mtb=[0,0];}
  };
  const sbAddPoint=(prev,who)=>{
    if(!prev||prev.winner!=null)return prev;
    const st=JSON.parse(JSON.stringify(prev));
    const opp=who===0?1:0;
    if(st.matchTiebreak){
      st.mtb[who]++;
      if(st.mtb[who]>=7&&st.mtb[who]-st.mtb[opp]>=2){st.sets=[...st.sets,[st.mtb[0],st.mtb[1]]];st.winner=who;}
      return st;
    }
    if(st.tiebreak){
      st.tb[who]++;
      if(st.tb[who]>=7&&st.tb[who]-st.tb[opp]>=2){st.games[who]++;sbFinalizeSet(st,who);}
      return st;
    }
    st.points[who]++;
    const a=st.points[who],b=st.points[opp];
    if(a>=4&&a-b>=2){
      st.games[who]++;st.points=[0,0];
      if(st.games[who]>=6&&st.games[who]-st.games[opp]>=2){sbFinalizeSet(st,who);}
      else if(st.games[0]===6&&st.games[1]===6){st.tiebreak=true;st.tb=[0,0];}
    }
    return st;
  };
  const sbPtLabel=(st,who)=>{
    const opp=who===0?1:0;
    if(st.matchTiebreak)return String(st.mtb[who]);
    if(st.tiebreak)return String(st.tb[who]);
    const a=st.points[who],b=st.points[opp];
    if(a>=3&&b>=3){if(a===b)return "40";if(a>b)return "AD";return "40";}
    return ["0","15","30","40"][Math.min(a,3)];
  };
  const sbPoint=(who)=>{setSbHist(h=>[...h,sb]);setSb(p=>sbAddPoint(p,who));};
  const sbUndo=()=>{setSbHist(h=>{if(!h.length)return h;setSb(h[h.length-1]);return h.slice(0,-1);});};
  const sbStart=()=>{setSb(sbNewMatch(sbP1.trim(),sbP2.trim()));setSbHist([]);};
  const sbReset=()=>{setSb(null);setSbHist([]);setSbP1("");setSbP2("");};

  // ==================== NOTIFICACIONES ====================
  const notifTime=(iso)=>{
    try{
      const d=new Date(iso),now=new Date(),s=Math.floor((now-d)/1000);
      if(s<60)return "hace un momento";
      if(s<3600)return `hace ${Math.floor(s/60)} min`;
      if(s<86400)return `hace ${Math.floor(s/3600)} h`;
      if(s<604800)return `hace ${Math.floor(s/86400)} d`;
      return d.toLocaleDateString("es-MX",{day:"numeric",month:"short"});
    }catch(e){return "";}
  };
  const createNotif=async(toUserId,{type,title,body,link})=>{
    if(!toUserId)return;
    try{ await supabase.from("notifications").insert({user_id:toUserId,type,title,body,link}); }
    catch(e){console.error("notif",e);}
  };

  const loadNotifications=async()=>{
    if(!user||isAdmin)return;
    try{
      const {data}=await supabase.from("notifications").select("*").eq("user_id",user.id).order("created_at",{ascending:false}).limit(50);
      setNotifications(data||[]);
    }catch(e){console.error("loadNotifs",e);}
  };

  const markNotifsRead=async()=>{
    const unread=notifications.filter(n=>!n.read).map(n=>n.id);
    if(!unread.length)return;
    setNotifications(prev=>prev.map(n=>({...n,read:true})));
    try{ await supabase.from("notifications").update({read:true}).in("id",unread); }catch(e){console.error("markRead",e);}
  };

  const openNotif=(n)=>{
    setShowNotifs(false);
    if(n.link==="social")setScreen("social");
    else if(n.link==="home")setScreen("home");
    else if(n.link)setScreen(n.link);
  };

  // Carga notificaciones al iniciar sesión + tiempo real
  useEffect(()=>{
    if(!user||isAdmin)return;
    loadNotifications();
    const ch=supabase.channel(`notif-${user.id}`)
      .on("postgres_changes",{event:"INSERT",schema:"public",table:"notifications",filter:`user_id=eq.${user.id}`},(payload)=>{
        setNotifications(prev=>prev.some(n=>n.id===payload.new.id)?prev:[payload.new,...prev]);
      })
      .subscribe();
    return ()=>{try{supabase.removeChannel(ch);}catch(e){}};
    /* eslint-disable-next-line */
  },[user?.id,isAdmin]);

  const joinGroupByObj=async(g)=>{
    try{
      const {error}=await supabase.from("group_members").insert({group_id:g.id,user_id:user.id,role:"member"});
      if(error&&!(error.message||"").toLowerCase().includes("duplicate"))throw error;
      // Notifica al creador del grupo que alguien se unió (si no soy yo el creador)
      if(g.created_by&&g.created_by!==user.id){
        createNotif(g.created_by,{type:"group_join",title:"Nuevo miembro 👥",body:`${user.name} se unió a tu grupo "${g.name}"`,link:"social"});
      }
      await loadSocial();
      openGroup(g);
    }catch(e){console.error("join",e);alert("No se pudo unir al grupo: "+(e.message||e));}
  };

  const joinByCode=async(code)=>{
    try{
      const {data:g}=await supabase.from("groups").select("*").eq("invite_code",code).maybeSingle();
      if(!g){alert("Ese link de invitación no es válido o el grupo ya no existe.");return;}
      await joinGroupByObj(g);
    }catch(e){console.error("joinByCode",e);}
  };

  const leaveGroupFn=async(g)=>{
    if(!window.confirm(`¿Salir del grupo "${g.name}"?`))return;
    try{
      await supabase.from("group_members").delete().eq("group_id",g.id).eq("user_id",user.id);
      setShowGroupInfo(false);setActiveGroup(null);setScreen("social");
      await loadSocial();
    }catch(e){console.error("leave",e);}
  };

  const deleteGroupFn=async(g)=>{
    if(g.created_by!==user.id)return;
    if(!window.confirm(`¿Eliminar el grupo "${g.name}"? Se borrarán todos sus mensajes. Esto no se puede deshacer.`))return;
    try{
      await supabase.from("groups").delete().eq("id",g.id);
      setShowGroupInfo(false);setActiveGroup(null);setScreen("social");
      await loadSocial();
    }catch(e){console.error("delete",e);}
  };

  const uploadMedia=async(file)=>{
    const ext=(file.name.split(".").pop()||"jpg").toLowerCase();
    const path=`${user.id}/${Date.now()}-${Math.random().toString(36).slice(2,6)}.${ext}`;
    const {error}=await supabase.storage.from("group-media").upload(path,file,{cacheControl:"3600",upsert:false});
    if(error)throw error;
    const {data}=supabase.storage.from("group-media").getPublicUrl(path);
    return data.publicUrl;
  };

  const replyFields=()=>{
    if(!replyingTo)return {};
    return {reply_to_id:replyingTo.id,reply_to_name:replyingTo.sender_name||"Miembro",reply_to_text:replyingTo.text||(replyingTo.media_type==="video"?"🎥 Video":"📷 Foto")};
  };

  const sendMsg=async()=>{
    if(!chatInput.trim()||!activeGroup||chatSending)return;
    const txt=chatInput.trim();setChatInput("");setChatSending(true);
    const rf=replyFields();setReplyingTo(null);
    try{
      const {error}=await supabase.from("group_messages").insert({group_id:activeGroup.id,user_id:user.id,sender_name:user.name,text:txt,...rf});
      if(error)throw error;
    }catch(e){console.error("send",e);alert("No se pudo enviar el mensaje");setChatInput(txt);}
    setChatSending(false);
  };

  const sendMedia=async(file)=>{
    if(!file||!activeGroup||chatSending)return;
    const isVideo=(file.type||"").startsWith("video");
    if(file.size>25*1024*1024){alert("El archivo es muy grande (máximo 25 MB).");return;}
    setChatSending(true);
    const rf=replyFields();setReplyingTo(null);
    try{
      const url=await uploadMedia(file);
      const {error}=await supabase.from("group_messages").insert({group_id:activeGroup.id,user_id:user.id,sender_name:user.name,media_url:url,media_type:isVideo?"video":"image",...rf});
      if(error)throw error;
    }catch(e){console.error("sendMedia",e);alert("No se pudo subir el archivo: "+(e.message||e));}
    setChatSending(false);
  };

  const toggleReaction=async(m,emoji)=>{
    if(!user)return;
    const r={...(m.reactions||{})};
    const arr=r[emoji]?[...r[emoji]]:[];
    const i=arr.indexOf(user.id);
    if(i>=0)arr.splice(i,1); else arr.push(user.id);
    if(arr.length)r[emoji]=arr; else delete r[emoji];
    setGroupMsgs(prev=>prev.map(x=>x.id===m.id?{...x,reactions:r}:x));
    setReactPickerFor(null);
    try{ await supabase.from("group_messages").update({reactions:r}).eq("id",m.id); }
    catch(e){console.error("react",e);}
  };


  const shareInviteWhatsApp=(g)=>{
    const url=buildInviteUrl(g);
    const text=`¡Únete a mi grupo "${g.name}" en SMT (Sociedad Mexicana de Tenis)! 🎾\n\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`,"_blank");
  };

  const copyInvite=(g)=>{
    const url=buildInviteUrl(g);
    try{navigator.clipboard.writeText(url);setInviteCopied(true);setTimeout(()=>setInviteCopied(false),2000);}catch(e){alert("Copia este link: "+url);}
  };

  // Carga grupos al entrar a la pestaña Social
  useEffect(()=>{ if(screen==="social"&&user&&!isAdmin) loadSocial(); /* eslint-disable-next-line */ },[screen]);

  // Tiempo real: mensajes nuevos del grupo activo
  useEffect(()=>{
    if(!activeGroup)return;
    const ch=supabase.channel(`grp-${activeGroup.id}`)
      .on("postgres_changes",{event:"INSERT",schema:"public",table:"group_messages",filter:`group_id=eq.${activeGroup.id}`},(payload)=>{
        setGroupMsgs(prev=>prev.some(m=>m.id===payload.new.id)?prev:[...prev,payload.new]);
      })
      .on("postgres_changes",{event:"UPDATE",schema:"public",table:"group_messages",filter:`group_id=eq.${activeGroup.id}`},(payload)=>{
        setGroupMsgs(prev=>prev.map(m=>m.id===payload.new.id?{...m,...payload.new}:m));
      })
      .subscribe();
    return ()=>{try{supabase.removeChannel(ch);}catch(e){}};
  },[activeGroup]);

  // Detecta link de invitación en la URL (?join=CODE)
  useEffect(()=>{
    try{
      const params=new URLSearchParams(window.location.search);
      const code=params.get("join");
      if(code){setPendingJoinCode(code);window.history.replaceState({},"",window.location.pathname);}
    }catch(e){}
  },[]);

  // Procesa la invitación pendiente cuando el usuario ya inició sesión
  useEffect(()=>{
    if(user&&!isAdmin&&pendingJoinCode){
      const code=pendingJoinCode;setPendingJoinCode(null);
      joinByCode(code);
    }
    /* eslint-disable-next-line */
  },[user,pendingJoinCode]);
  // ==================== FIN SOCIAL: funciones ====================


  const approveStatReq=(rid,approve)=>{
    const r=statRequests.find(x=>x.id===rid);if(!r)return;
    if(approve){
      const p=accounts.find(a=>a.id===r.playerId);if(p){
        const np={...p,stats:{...p.stats}};
        Object.entries(r.changes).forEach(([k,v])=>{
          if(["wins","losses","titles","points"].includes(k)) np[k]=v.to;
          else np.stats[k]=v.to;
        });
        updateAccount(np);
      }
    }
    setStatRequests(prev=>prev.map(x=>x.id===rid?{...x,status:approve?"approved":"rejected"}:x));
  };

  const addComment=(mediaId)=>{
    if(!commentDraft.trim()||!user) return;
    setMediaComments(prev=>({...prev,[mediaId]:[...(prev[mediaId]||[]),{id:`co-${Date.now()}`,userId:user.id,userName:user.name,userPhoto:user.photo,userAvatar:user.avatar,text:commentDraft.trim(),time:Date.now()}]}));
    setCommentDraft("");
  };
  const deleteComment=(mediaId,coId)=>setMediaComments(prev=>({...prev,[mediaId]:(prev[mediaId]||[]).filter(c=>c.id!==coId)}));

  const submitSvRequest=()=>{
    if(!svDraft.image){alert("Debes adjuntar un screenshot directo de SwingVision con tus datos.");return;}
    const vals={};["serve","return","forehand","backhand"].forEach(k=>{const v=parseFloat(svDraft[k]);if(v>=0&&v<=10)vals[k]=v;});
    if(Object.keys(vals).length===0){alert("Ingresa al menos una habilidad con valor entre 0 y 10.");return;}
    setSvRequests(prev=>[...prev,{id:`sv-${Date.now()}`,playerId:user.id,playerName:user.name,playerPhoto:user.photo,playerAvatar:user.avatar,values:vals,image:svDraft.image,status:"pending",time:Date.now()}]);
    setShowSvModal(false);
    setSvDraft({serve:"",return:"",forehand:"",backhand:"",image:null});
    alert("Solicitud enviada al administrador. Tus habilidades aparecerán cuando sean aprobadas.");
  };
  const approveSvReq=(rid,approve)=>{
    const r=svRequests.find(x=>x.id===rid);if(!r)return;
    if(approve){const p=accounts.find(a=>a.id===r.playerId);if(p)updateAccount({...p,stats:{...p.stats,...r.values}});}
    setSvRequests(prev=>prev.map(x=>x.id===rid?{...x,status:approve?"approved":"rejected"}:x));
  };
  const handleSvImage=(e)=>{const f=e.target.files&&e.target.files[0];if(!f)return;const r=new FileReader();r.onloadend=()=>setSvDraft(prev=>({...prev,image:r.result}));r.readAsDataURL(f);e.target.value="";};

  const approveCategoryReq=(rid,approve)=>{
    const r=categoryRequests.find(x=>x.id===rid);if(!r)return;
    if(approve){const p=accounts.find(a=>a.id===r.playerId);if(p)updateAccount({...p,category:r.to});}
    setCategoryRequests(prev=>prev.map(x=>x.id===rid?{...x,status:approve?"approved":"rejected"}:x));
  };

  const submitTournamentRequest=()=>{
    if(!newReqT.name.trim()){alert("Falta nombre del torneo");return;}
    setTournamentRequests(prev=>[...prev,{id:`tr-${Date.now()}`,playerId:user.id,playerName:user.name,...newReqT,status:"pending",time:Date.now()}]);
    setReqTourModal(false);
    setNewReqT({name:"",date:"",surface:"Clay",location:"",prize:"",modality:"singles",gender:"M",category:user.category||"B"});
    alert("Solicitud enviada al administrador.");
  };

  const approveTournamentReq=(rid,allowedCount)=>{
    const r=tournamentRequests.find(x=>x.id===rid);if(!r)return;
    setCreatePermissions(prev=>({...prev,[r.playerId]:(prev[r.playerId]||0)+(allowedCount||1)}));
    // Crear torneo automáticamente con los datos solicitados (incluye formato)
    const t={id:`t-${Date.now()}`,name:r.name,date:r.date,surface:r.surface,location:r.location||"Monterrey",maxPlayers:8,format:r.format||"groups+ko",modality:r.modality,gender:r.gender,category:r.category,groupSize:4,players:[],pendingPlayers:[],groups:[],rounds:[],status:"open",prize:r.prize||"TBD",image:null,createdBy:r.playerId};
    setTournaments(prev=>[...prev,t]);
    setTournamentRequests(prev=>prev.map(x=>x.id===rid?{...x,status:"approved"}:x));
  };
  const rejectTournamentReq=(rid)=>setTournamentRequests(prev=>prev.map(x=>x.id===rid?{...x,status:"rejected"}:x));

  const sendMatchRequest=(toId,data)=>{
    if(!user)return;
    setMatchRequests(prev=>[...prev,{id:`mr-${Date.now()}`,fromId:user.id,fromName:user.name,fromPhoto:user.photo,fromAvatar:user.avatar,fromPhone:user.phone||"",toId,toName:accounts.find(a=>a.id===toId)?.name||"",...data,status:"pending",time:Date.now()}]);
    setMatchReqModal(null);
    setNewMatchReq({club:"Club Campestre Monterrey",when:"weekend",time:"morning",msg:""});
    alert("Solicitud de partido enviada.");
  };
  const respondMatchRequest=(rid,accept)=>{
    const r=matchRequests.find(x=>x.id===rid);if(!r)return;
    setMatchRequests(prev=>prev.map(x=>x.id===rid?{...x,status:accept?"accepted":"rejected"}:x));
    if(accept){const otherPhone=r.fromPhone;const myPhone=user.phone||"(sin teléfono)";setPhoneShare({with:r.fromName,phone:otherPhone||"(sin teléfono)",myShared:myPhone});}
  };
  const detectAspect=(dataUrl,isVideo,cb)=>{
    if(isVideo){const v=document.createElement("video");v.preload="metadata";v.onloadedmetadata=()=>{const r=v.videoWidth/v.videoHeight;cb(r<0.85?"vertical":"square");};v.onerror=()=>cb("square");v.src=dataUrl;}
    else{const img=new Image();img.onload=()=>{const r=img.width/img.height;cb(r<0.85?"vertical":"square");};img.onerror=()=>cb("square");img.src=dataUrl;}
  };
  const handleMediaUpload=(e)=>{
    const f=e.target.files&&e.target.files[0];if(!f)return;
    const r=new FileReader();
    r.onloadend=()=>{const isVideo=f.type.startsWith("video/");detectAspect(r.result,isVideo,(aspect)=>{setMedia(prev=>[{id:`md-${Date.now()}`,type:isVideo?"video":"image",url:r.result,aspect,uploadedAt:Date.now(),name:f.name,by:"admin"},...prev]);setMediaUploadModal(false);});};
    r.readAsDataURL(f);
    e.target.value="";
  };
  const handleMediaDraftFile=(e)=>{
    const f=e.target.files&&e.target.files[0];if(!f)return;
    const r=new FileReader();
    r.onloadend=()=>{const isVideo=f.type.startsWith("video/");detectAspect(r.result,isVideo,(aspect)=>{setMediaDraft(prev=>({...prev,type:isVideo?"video":"image",url:r.result,aspect,name:f.name}));});};
    r.readAsDataURL(f);
    e.target.value="";
  };
  const submitMediaRequest=()=>{
    if(!mediaDraft.url){alert("Selecciona una imagen o video.");return;}
    setMediaRequests(prev=>[...prev,{id:`mr-${Date.now()}`,playerId:user.id,playerName:user.name,playerPhoto:user.photo,playerAvatar:user.avatar,type:mediaDraft.type,url:mediaDraft.url,aspect:mediaDraft.aspect||"square",caption:mediaDraft.caption,status:"pending",time:Date.now()}]);
    setPostMediaModal(false);
    setMediaDraft({type:null,url:null,caption:""});
    alert("Post enviado al administrador. Aparecerá en MEDIA cuando lo apruebe.");
  };
  const approveMediaReq=(rid,approve)=>{
    const r=mediaRequests.find(x=>x.id===rid);if(!r)return;
    if(approve){setMedia(prev=>[{id:`md-${Date.now()}`,type:r.type,url:r.url,aspect:r.aspect||"square",uploadedAt:Date.now(),caption:r.caption,by:r.playerId,byName:r.playerName,byPhoto:r.playerPhoto,byAvatar:r.playerAvatar},...prev]);}
    setMediaRequests(prev=>prev.map(x=>x.id===rid?{...x,status:approve?"approved":"rejected"}:x));
    setPreviewMediaReq(null);
  };

  // MARKETPLACE
  const handleMpImageUpload=async(e)=>{
    const f=e.target.files&&e.target.files[0];if(!f)return;
    e.target.value="";
    if(mpDraft.images.length>=4){alert("Máximo 4 imágenes por producto.");return;}
    const reader=new FileReader();
    reader.onloadend=async()=>{
      const dataUrl=reader.result;
      setMpScanning(true);
      setMpScanResult(null);
      const result=await analyzeImageForSkin(dataUrl);
      setMpScanning(false);
      if(result.suspicious){
        // Strike + advertencia
        const currentStrikes=(mpStrikes[user.id]||0)+1;
        setMpStrikes(prev=>({...prev,[user.id]:currentStrikes}));
        setMpScanResult({rejected:true,strikes:currentStrikes,pct:result.skinPercent});
        if(currentStrikes>=2){
          // Expulsión automática
          setBannedUsers(prev=>[...prev,user.id]);
          setTimeout(()=>{alert(`⛔ EXPULSIÓN AUTOMÁTICA\n\nHas intentado subir contenido inapropiado en múltiples ocasiones. Tu cuenta ha sido suspendida.\n\nLa app se cerrará.`);doLogout();},2500);
        }
        return;
      }
      // OK
      setMpScanResult({rejected:false});
      setMpDraft(prev=>({...prev,images:[...prev.images,dataUrl]}));
      setTimeout(()=>setMpScanResult(null),1500);
    };
    reader.readAsDataURL(f);
  };

  const submitMpListing=()=>{
    if(!mpDraft.title.trim()){alert("Falta título del producto");return;}
    if(!mpDraft.price||parseFloat(mpDraft.price)<=0){alert("Ingresa un precio válido");return;}
    if(mpDraft.images.length===0){alert("Sube al menos una foto del producto");return;}
    if(!user.phone){alert("Agrega tu número de celular en tu perfil para vender productos.");return;}
    setMarketplace(prev=>[{id:`mp-${Date.now()}`,sellerId:user.id,sellerName:user.name,sellerPhoto:user.photo,sellerAvatar:user.avatar,sellerPhone:user.phone,sellerCity:user.city||"—",title:mpDraft.title.trim(),category:mpDraft.category,price:parseFloat(mpDraft.price),condition:mpDraft.condition,description:mpDraft.description.trim(),images:mpDraft.images,createdAt:Date.now(),status:"available"},...prev]);
    setMpModal(false);
    setMpDraft({title:"",category:"Raqueta",price:"",condition:"Nuevo",description:"",images:[]});
    alert("¡Producto publicado!");
  };

  const requestPurchase=(listingId)=>{
    const l=marketplace.find(x=>x.id===listingId);if(!l)return;
    if(l.sellerId===user.id){alert("No puedes comprar tu propio producto.");return;}
    if(!user.phone){alert("Agrega tu número de celular en tu perfil para comprar productos.");return;}
    const exists=purchaseRequests.find(r=>r.listingId===listingId&&r.buyerId===user.id&&r.status==="pending");
    if(exists){alert("Ya enviaste una solicitud de compra para este producto.");return;}
    setPurchaseRequests(prev=>[...prev,{id:`pur-${Date.now()}`,listingId,buyerId:user.id,buyerName:user.name,buyerPhoto:user.photo,buyerAvatar:user.avatar,buyerPhone:user.phone,sellerId:l.sellerId,sellerName:l.sellerName,sellerPhone:l.sellerPhone,title:l.title,price:l.price,status:"pending",time:Date.now()}]);
    alert("Solicitud de compra enviada al vendedor. Te notificaremos cuando responda.");
  };

  const respondPurchase=(rid,accept)=>{
    const r=purchaseRequests.find(x=>x.id===rid);if(!r)return;
    setPurchaseRequests(prev=>prev.map(x=>x.id===rid?{...x,status:accept?"accepted":"rejected"}:x));
    if(accept){setMpContactShare({buyerName:r.buyerName,buyerPhone:r.buyerPhone,sellerName:r.sellerName,sellerPhone:r.sellerPhone,title:r.title,price:r.price});}
  };

  const deleteListing=(lid)=>{
    if(!confirm("¿Eliminar este producto del marketplace?"))return;
    setMarketplace(prev=>prev.filter(x=>x.id!==lid));
    setMpDetail(null);
  };

  // COACH HANDLERS
  const submitCoachApplication=()=>{
    if(!coachDraft.experience||!coachDraft.bio.trim()){alert("Completa tu experiencia y biografía.");return;}
    if(coachDraft.specialties.length===0){alert("Selecciona al menos una especialidad.");return;}
    if(!coachDraft.hourlyRate||parseFloat(coachDraft.hourlyRate)<=0){alert("Ingresa tarifa por hora válida.");return;}
    if(!user.phone){alert("Agrega tu número de celular en tu perfil para ser coach.");return;}
    const existing=coachApplications.find(c=>c.playerId===user.id&&(c.status==="pending"||c.status==="approved"));
    if(existing){alert(existing.status==="approved"?"Ya eres coach aprobado. Edita tu perfil de coach desde el botón EDITAR PERFIL DE COACH.":"Ya tienes una solicitud pendiente.");return;}
    setCoachApplications(prev=>[...prev,{id:`coach-${Date.now()}`,playerId:user.id,playerName:user.name,playerPhoto:user.photo,playerAvatar:user.avatar,playerPhone:user.phone,playerCity:user.city||"—",playerCategory:user.category,playerSex:user.sex,experience:coachDraft.experience,specialties:[...coachDraft.specialties],bio:coachDraft.bio.trim(),hourlyRate:parseFloat(coachDraft.hourlyRate),availability:coachDraft.availability.trim(),languages:[...coachDraft.languages],status:"pending",time:Date.now()}]);
    setShowCoachApply(false);
    setCoachDraft({experience:"",specialties:[],bio:"",hourlyRate:"",availability:"",languages:["Español"]});
    alert("✓ Solicitud enviada al administrador. Te notificaremos cuando seas aprobado como coach.");
  };
  const approveCoachApp=(cid,approve)=>{setCoachApplications(prev=>prev.map(x=>x.id===cid?{...x,status:approve?"approved":"rejected"}:x));};
  const requestCoachSession=(coachAppId)=>{
    const coach=coachApplications.find(x=>x.id===coachAppId);if(!coach)return;
    if(coach.playerId===user.id){alert("No puedes solicitarte a ti mismo.");return;}
    if(!user.phone){alert("Agrega tu número de celular en tu perfil para solicitar coach.");return;}
    const exists=coachRequests.find(r=>r.coachAppId===coachAppId&&r.playerId===user.id&&r.status==="pending");
    if(exists){alert("Ya enviaste una solicitud a este coach.");return;}
    setCoachRequests(prev=>[...prev,{id:`creq-${Date.now()}`,coachAppId,coachPlayerId:coach.playerId,coachName:coach.playerName,coachPhone:coach.playerPhone,coachHourlyRate:coach.hourlyRate,playerId:user.id,playerName:user.name,playerPhoto:user.photo,playerAvatar:user.avatar,playerPhone:user.phone,frequency:coachRequestForm.frequency,when:coachRequestForm.when,time:coachRequestForm.time,msg:coachRequestForm.msg.trim(),status:"pending",createdAt:Date.now()}]);
    setShowCoachRequest(null);
    setCoachRequestForm({frequency:"weekly",when:"weekend",time:"morning",msg:""});
    alert("✓ Solicitud enviada al coach.");
  };
  const respondCoachRequest=(rid,accept)=>{
    const r=coachRequests.find(x=>x.id===rid);if(!r)return;
    setCoachRequests(prev=>prev.map(x=>x.id===rid?{...x,status:accept?"accepted":"rejected"}:x));
    if(accept){setCoachContactShare({coachName:r.coachName,coachPhone:r.coachPhone,playerName:r.playerName,playerPhone:r.playerPhone,hourlyRate:r.coachHourlyRate,frequency:r.frequency});}
  };

  const handlePhoto=(e)=>{const f=e.target.files&&e.target.files[0];if(!f)return;const r=new FileReader();r.onloadend=()=>{const url=r.result;if(viewP&&isAdmin&&viewP.id!==user?.id)updateAccount({...viewP,photo:url});else if(user)updateUser({...user,photo:url});};r.onerror=()=>alert("Error al cargar imagen");r.readAsDataURL(f);e.target.value="";};
  const handleTImg=(e,target)=>{const f=e.target.files&&e.target.files[0];if(!f)return;const r=new FileReader();r.onloadend=()=>{if(target==="new")setNewT(prev=>({...prev,image:r.result}));else setEditTourney(prev=>({...prev,image:r.result}));};r.readAsDataURL(f);e.target.value="";};

  const changePassword=()=>{
    if(isAdmin){
      if(passForm.old!==adminPass)return alert("Contraseña actual incorrecta");
      if(passForm.new.length<8)return alert("Mínimo 8 caracteres");
      if(!/[A-Z]/.test(passForm.new)||!/[0-9]/.test(passForm.new))return alert("La contraseña debe incluir mayúscula y número");
      setAdminPass(passForm.new);setShowChangePass(false);setPassForm({old:"",new:""});alert("✓ Contraseña actualizada");
    }else{
      if(passForm.old!==user.password)return alert("Contraseña actual incorrecta");
      if(passForm.new.length<8)return alert("Mínimo 8 caracteres");
      if(!/[A-Z]/.test(passForm.new)||!/[0-9]/.test(passForm.new))return alert("La contraseña debe incluir mayúscula y número");
      updateUser({...user,password:passForm.new,requirePasswordChange:false});
      setShowChangePass(false);setPassForm({old:"",new:""});
      alert("✓ Contraseña actualizada");
    }
  };

  const canEdit=(m)=>{
    if(isAdmin) return true;
    if(!user||!m.p1||!m.p2) return false;
    if(m.pendingResult) return false;
    if(m.status!=="pending") return false;
    // Solo los dos jugadores del partido pueden registrar resultado
    const isPlayer1=m.p1.id===user.id;
    const isPlayer2=m.p2.id===user.id;
    return isPlayer1||isPlayer2;
  };
  const pendRegs=()=>tournaments.reduce((a,t)=>a+t.pendingPlayers.length,0);
  const pendRes=()=>tournaments.reduce((a,t)=>{let c=0;t.groups.forEach(g=>g.matches.forEach(m=>{if(m.pendingResult)c++;}));t.rounds.forEach(r=>r.forEach(m=>{if(m.pendingResult)c++;}));return a+c;},0);

  const openTourney=(t)=>{playRacket();setSelT(t);setTab(t.format==="groups+ko"&&t.groups.length>0?"groups":"draw");setShowIntro(true);setScreen("tournament");};

  function Nav(){
    return <>
    <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(4,10,24,0.85)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:`0.5px solid ${C.cyanBdr}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 14px",height:60,fontFamily:F.ios}}>
      <div style={{display:"flex",alignItems:"center",gap:11,cursor:"pointer"}} onClick={()=>setScreen("home")}>
        <Logo size={48}/>
        <div style={{fontFamily:F.bn,fontSize:22,letterSpacing:"0.22em",color:C.text}}>SMT</div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {isAdmin&&<Chip type="cyan">ADMIN</Chip>}
        {isAdmin&&(pendRegs()+pendRes())>0&&<button onClick={()=>setScreen("admin-inbox")} className="btn-press" style={{background:"rgba(255,159,10,0.12)",border:`1px solid ${C.amber}`,padding:"6px 10px",borderRadius:10,cursor:"pointer",fontFamily:F.ios,fontSize:12,color:C.amber,fontWeight:600}}>🔔 {pendRegs()+pendRes()}</button>}
        {user&&!isAdmin&&<button onClick={()=>{setShowNotifs(true);markNotifsRead();}} className="btn-press" style={{position:"relative",background:"none",border:"none",cursor:"pointer",padding:6,fontSize:20,lineHeight:1}}>🔔
          {notifications.filter(n=>!n.read).length>0&&<span style={{position:"absolute",top:-2,right:-2,minWidth:17,height:17,padding:"0 4px",background:C.red||"#FF453A",color:"#fff",fontSize:10,fontWeight:700,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.ios}}>{notifications.filter(n=>!n.read).length}</span>}
        </button>}
        <PA photo={user?.photo} avatar={user?.avatar} size={36} onClick={()=>{if(!isAdmin){setViewP(user);setScreen("player-card");}else setScreen("admin-settings");}}/>
      </div>
    </nav>
    {showNotifs&&<div style={{position:"fixed",inset:0,zIndex:700,background:"rgba(2,6,16,0.6)"}} onClick={()=>setShowNotifs(false)}>
      <div onClick={e=>e.stopPropagation()} style={{position:"absolute",top:64,right:10,width:"min(360px,92vw)",maxHeight:"72vh",overflowY:"auto",background:C.surface,border:`1px solid ${C.borderS}`,borderRadius:18,boxShadow:"0 20px 60px rgba(0,0,0,0.55)",animation:"fadeIn 0.2s"}}>
        <div style={{padding:"14px 16px",borderBottom:`1px solid ${C.borderS}`,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:C.surface}}>
          <div style={{fontWeight:700,fontSize:16,color:C.text}}>Notificaciones</div>
          <button onClick={()=>setShowNotifs(false)} className="btn-press" style={{background:"none",border:"none",color:C.muted,fontSize:18,cursor:"pointer"}}>✕</button>
        </div>
        {notifications.length===0?<div style={{padding:"34px 20px",textAlign:"center",color:C.muted,fontSize:14}}>No tienes notificaciones todavía 🎾</div>:
          notifications.map(n=><div key={n.id} onClick={()=>openNotif(n)} className="btn-press" style={{padding:"12px 16px",borderBottom:`1px solid ${C.borderS}`,cursor:"pointer"}}>
            <div style={{fontWeight:600,fontSize:14,marginBottom:2,color:C.text}}>{n.title}</div>
            {n.body&&<div style={{fontSize:13,color:C.muted,lineHeight:1.4}}>{n.body}</div>}
            <div style={{fontSize:11,color:C.muted,marginTop:4,opacity:0.7}}>{notifTime(n.created_at)}</div>
          </div>)}
      </div>
    </div>}
    </>;
  }
  const Back=({to,label})=><button onClick={()=>setScreen(to)} className="btn-press" style={{background:"none",border:"none",color:C.cyan,fontFamily:F.ios,fontSize:15,fontWeight:500,cursor:"pointer",padding:"14px 16px 0"}}>← {label||"Volver"}</button>;

  // TAB BAR iOS-STYLE (fixed bottom)
  // SF-Symbol style icon components (nativos iOS look)
  const Icon=({name,size=26,color,active})=>{
    const filled=active;
    const stroke=color||"rgba(240,237,232,0.55)";
    const strokeW=filled?0:2;
    const w=size,h=size;
    // Iconos Gen-Alpha: trazo grueso, bordes muy redondeados, formas amigables/squishy
    if(name==="trophy") return <svg width={w} height={h} viewBox="0 0 24 24" fill={filled?(color||"#4FC3F7"):"none"} stroke={filled?"none":stroke} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round"><path d="M7 4h10v4a5 5 0 0 1-10 0V4z"/><path d="M5 4H3v3a2 2 0 0 0 2 2M19 4h2v3a2 2 0 0 1-2 2"/><path d="M10 13v3h4v-3M9 20h6M12 16v4"/></svg>;
    if(name==="bolt") return <svg width={w} height={h} viewBox="0 0 24 24" fill={filled?(color||"#4FC3F7"):"none"} stroke={filled?"none":stroke} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round"><path d="M13 3L5 14a1 1 0 0 0 .8 1.6H10l-1 5.4a.5.5 0 0 0 .9.4l8.3-11A1 1 0 0 0 17.4 9H13l1-5.4a.5.5 0 0 0-.9-.4"/></svg>;
    if(name==="bag") return <svg width={w} height={h} viewBox="0 0 24 24" fill={filled?(color||"#4FC3F7"):"none"} stroke={filled?"none":stroke} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14a1 1 0 0 1 1 1.1l-1.3 11A2 2 0 0 1 16.7 22H7.3a2 2 0 0 1-2-1.9L4 9.1A1 1 0 0 1 5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><circle cx="9" cy="12" r="0.5" fill={filled?"#fff":stroke}/><circle cx="15" cy="12" r="0.5" fill={filled?"#fff":stroke}/></svg>;
    if(name==="chart") return <svg width={w} height={h} viewBox="0 0 24 24" fill={filled?(color||"#4FC3F7"):"none"} stroke={filled?"none":stroke} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="13" width="4.5" height="8" rx="1.5"/><rect x="9.75" y="8" width="4.5" height="13" rx="1.5"/><rect x="16.5" y="3" width="4.5" height="18" rx="1.5"/></svg>;
    if(name==="film") return <svg width={w} height={h} viewBox="0 0 24 24" fill={filled?(color||"#4FC3F7"):"none"} stroke={filled?"none":stroke} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="14" rx="4"/><path d="M10 11l4 2.2-4 2.2v-4.4z" fill={filled?"#fff":"none"} stroke={filled?"#fff":stroke}/></svg>;
    if(name==="person") return <svg width={w} height={h} viewBox="0 0 24 24" fill={filled?(color||"#4FC3F7"):"none"} stroke={filled?"none":stroke} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4.5"/><path d="M3.5 21c.5-4.5 4.5-7 8.5-7s8 2.5 8.5 7"/></svg>;
    // NUEVO: COACH - silbato + lupa
    if(name==="coach") return <svg width={w} height={h} viewBox="0 0 24 24" fill={filled?(color||"#4FC3F7"):"none"} stroke={filled?"none":stroke} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a6 6 0 0 1 6-6h7a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4h-1v3a1 1 0 0 1-1 1H9a6 6 0 0 1-6-6z"/><circle cx="9" cy="12" r="1.2" fill={filled?"#fff":"none"} stroke={filled?"none":stroke}/><path d="M18 8.5v0"/></svg>;
    if(name==="chat") return <svg width={w} height={h} viewBox="0 0 24 24" fill={filled?(color||"#4FC3F7"):"none"} stroke={filled?"none":stroke} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 4v-4H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/><circle cx="8" cy="11" r="1.1" fill={filled?"#fff":"none"} stroke={filled?"none":stroke}/><circle cx="12" cy="11" r="1.1" fill={filled?"#fff":"none"} stroke={filled?"none":stroke}/><circle cx="16" cy="11" r="1.1" fill={filled?"#fff":"none"} stroke={filled?"none":stroke}/></svg>;
    return null;
  };

  function TabBar(){
    if(!user) return null;
    const userIsMinor=!isAdmin&&isMinor(user?.birthdate);
    const tabs=[
      {k:"home",icon:"trophy",label:"Torneos"},
      ...(userIsMinor?[]:[{k:"find-hub",icon:"bolt",label:"Find"}]),
      ...(userIsMinor?[]:[{k:"marketplace",icon:"bag",label:"Market"}]),
      ...(userIsMinor?[]:[{k:"social",icon:"chat",label:"Social"}]),
      {k:"rankings",icon:"chart",label:"Rank"},
      ...(userIsMinor?[]:[{k:"media",icon:"film",label:"Media"}]),
      {k:"profile-tab",icon:"person",label:"Perfil"}
    ];
    const handleTab=(k)=>{
      if(k==="home") setScreen("home");
      else if(k==="profile-tab"){setViewP(user);setScreen("player-card");}
      else setScreen(k);
    };
    const currentTab=screen==="home"?"home":(screen==="find-hub"||screen==="find-match"||screen==="coach")?"find-hub":screen==="rankings"?"rankings":screen==="marketplace"?"marketplace":screen==="media"?"media":screen==="player-card"&&viewP?.id===user?.id?"profile-tab":null;
    return <div style={{position:"fixed",left:0,right:0,bottom:0,zIndex:200,maxWidth:720,margin:"0 auto",background:"linear-gradient(180deg,rgba(4,10,24,0.55) 0%,rgba(4,10,24,0.92) 100%)",backdropFilter:"blur(40px) saturate(180%)",WebkitBackdropFilter:"blur(40px) saturate(180%)",borderTop:`0.5px solid rgba(255,255,255,0.10)`,paddingBottom:"env(safe-area-inset-bottom,8px)"}}>
      <div style={{display:"flex",justifyContent:"space-around",alignItems:"flex-start",padding:"8px 2px 4px",maxWidth:640,margin:"0 auto"}}>
        {tabs.map(t=>{const active=currentTab===t.k;return <button key={t.k} onClick={()=>handleTab(t.k)} className="tab-btn" style={{flex:1,background:"transparent",border:"none",padding:"6px 1px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,position:"relative",fontFamily:F.ios,minHeight:60,minWidth:0}}>
          <div className="tab-icon-box" style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",width:54,height:38,borderRadius:16,background:active?`linear-gradient(135deg,${C.cyan}28,${C.cyanDeep}18)`:"transparent",transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}>
            {active&&<div style={{position:"absolute",inset:-2,borderRadius:18,background:`radial-gradient(circle,${C.cyan}40,transparent 70%)`,filter:"blur(8px)",animation:"glowPulse 2.4s ease-in-out infinite"}}/>}
            <div style={{position:"relative",zIndex:1}}><Icon name={t.icon} size={26} color={active?C.cyan:undefined} active={active}/></div>
          </div>
          <div style={{fontSize:11,fontWeight:active?700:500,color:active?C.cyan:"rgba(240,237,232,0.55)",letterSpacing:"-0.01em",transition:"color 0.2s",fontFamily:F.ios,whiteSpace:"nowrap"}}>{t.label}</div>
        </button>;})}
      </div>
    </div>;
  }
  const ShowTabBar=()=>{const hidden=["welcome","auth"].includes(screen);return hidden?null:<TabBar/>;};
  // Spacer para que el contenido no quede bajo la tab bar
  const TabSpacer=()=><div style={{height:user?92:0}}/>;

  // WELCOME SCREEN
  if(screen==="welcome")return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative",overflow:"hidden"}}>
    <style>{STYLE}</style>
    <Aurora intense={1.2}/>
    {/* Orbes flotantes Gen-Alpha */}
    <div style={{position:"absolute",top:"15%",right:"15%",width:120,height:120,borderRadius:"50%",background:`radial-gradient(circle,${C.cyan}50,transparent 70%)`,filter:"blur(30px)",animation:"floatSlow 8s ease-in-out infinite",pointerEvents:"none"}}/>
    <div style={{position:"absolute",bottom:"20%",left:"10%",width:160,height:160,borderRadius:"50%",background:`radial-gradient(circle,#A78BFA50,transparent 70%)`,filter:"blur(35px)",animation:"floatSlow 11s ease-in-out infinite reverse",pointerEvents:"none"}}/>
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 24px",position:"relative",zIndex:1}}>
      <div style={{animation:"scaleInBig 0.9s"}}><Logo size={220} glow/></div>
      <T size={52} style={{textAlign:"center",marginTop:24,animation:"slideUp 0.6s 0.4s backwards"}}>SOCIEDAD<br/><span style={{background:`linear-gradient(135deg,${C.cyan},#A78BFA,${C.cyan})`,backgroundSize:"200% 100%",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"gradientShift 4s ease infinite"}}>MEXICANA</span><br/>DE TENIS</T>
      <div style={{display:"flex",flexDirection:"column",gap:12,width:"100%",maxWidth:300,marginTop:54}}>
        <button onClick={()=>{setAuthMode("player-login");setScreen("auth");}} className="btn-press" style={{position:"relative",overflow:"hidden",background:`linear-gradient(135deg,${C.cyanBright},${C.cyanDeep})`,border:"none",color:"#fff",padding:"16px",fontFamily:F.ios,fontSize:17,fontWeight:700,cursor:"pointer",borderRadius:18,animation:"slideUp 0.5s 0.9s backwards",boxShadow:"0 12px 30px rgba(2,136,209,0.4)",letterSpacing:"-0.01em"}}>🎾  INGRESAR COMO JUGADOR</button>
        <button onClick={()=>{setAuthMode("player-register");setScreen("auth");}} className="btn-press" style={{background:"rgba(79,195,247,0.08)",backdropFilter:"blur(20px)",border:`1px solid ${C.cyanBdr}`,color:C.cyan,padding:"15px",fontFamily:F.ios,fontSize:16,fontWeight:600,cursor:"pointer",borderRadius:18,animation:"slideUp 0.5s 1s backwards"}}>＋  Crear cuenta</button>
      </div>
      <button onClick={()=>{setAuthMode("admin-login");setScreen("auth");}} className="btn-press" style={{position:"absolute",bottom:24,background:"rgba(118,118,128,0.16)",border:`0.5px solid ${C.borderS}`,color:"rgba(240,237,232,0.5)",width:36,height:36,borderRadius:18,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",animation:"fadeIn 0.6s 1.4s backwards"}} title="Acceso administrador">⚙</button>
    </div>
  </div>;

  // AUTH SCREEN
  if(screen==="auth"){
    return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative",overflow:"hidden"}}>
      <style>{STYLE}</style>
      <Aurora intense={1.0}/>
      <button onClick={()=>{setScreen("welcome");setAuthForm({email:"",password:"",name:""});setAuthErr("");setAuthMode(null);}} className="btn-press" style={{position:"absolute",top:18,left:18,background:"none",border:"none",color:C.cyan,fontFamily:F.ios,fontSize:15,fontWeight:500,cursor:"pointer",zIndex:5}}>← Inicio</button>
      <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 24px 40px",position:"relative",zIndex:1}}>
        <Logo size={88} glow/>
        <div style={{width:"100%",maxWidth:360,background:"rgba(10,27,61,0.85)",backdropFilter:"blur(20px)",border:`0.5px solid ${C.cyanBdr}`,borderRadius:20,padding:28,marginTop:24,animation:"slideUp 0.4s",boxShadow:"0 20px 60px rgba(0,0,0,0.5)"}}>
          <T size={28} style={{textAlign:"center",marginBottom:6}}>{authMode==="player-login"?"INICIAR SESIÓN":authMode==="player-register"?"CREAR CUENTA":authMode==="admin-login"?"ACCESO ADMIN":authMode==="player-recover"?"RECUPERAR ACCESO":"RECUPERAR ADMIN"}</T>
          <div style={{textAlign:"center",fontFamily:F.bc,letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:24,fontSize:11,color:C.cyan,fontWeight:600}}>{authMode?.startsWith("admin")?"PANEL ADMINISTRADOR":"JUGADOR"}</div>
          {authMode==="player-register"&&<><FL>Nombre completo</FL><TI value={authForm.name} onChange={e=>setAuthForm({...authForm,name:e.target.value})} placeholder="Eduardo Soni"/><div style={{height:14}}/></>}
          {authMode==="player-register"&&<><FL>Fecha de nacimiento *</FL><TI type="date" value={authForm.birthdate||""} onChange={e=>setAuthForm({...authForm,birthdate:e.target.value})}/><Sub style={{fontSize:11,marginTop:6,color:C.muted}}>Necesaria por seguridad. Los menores de edad usan una versión protegida de la app.</Sub><div style={{height:14}}/></>}
          {authMode!=="admin-login"&&authMode!=="admin-recover"&&<><FL>Email</FL><TI type="email" value={authForm.email} onChange={e=>setAuthForm({...authForm,email:e.target.value})} placeholder="tu@email.com" autoFocus={!authMode.includes("register")}/><div style={{height:14}}/></>}
          {authMode!=="player-recover"&&authMode!=="admin-recover"&&<><FL>Contraseña {authMode==="player-register"&&"(mín 8, 1 mayúscula, 1 número)"}</FL><TI type="password" value={authForm.password} onChange={e=>setAuthForm({...authForm,password:e.target.value})} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&(authMode==="player-register"?doRegister():doLogin())} autoFocus={authMode==="admin-login"}/></>}
          {authMode==="player-register"&&<div style={{marginTop:18,padding:"14px",background:C.surface2,border:`1px solid ${acceptedPrivacy?C.cyan:C.borderS}`,borderRadius:14,transition:"all 0.25s"}}>
            <label style={{display:"flex",alignItems:"flex-start",gap:12,cursor:"pointer"}}>
              <div onClick={()=>setAcceptedPrivacy(!acceptedPrivacy)} style={{flexShrink:0,width:22,height:22,borderRadius:6,border:`2px solid ${acceptedPrivacy?C.cyan:"rgba(255,255,255,0.25)"}`,background:acceptedPrivacy?C.cyan:"transparent",display:"flex",alignItems:"center",justifyContent:"center",marginTop:1,transition:"all 0.2s"}}>{acceptedPrivacy&&<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}</div>
              <div onClick={()=>setAcceptedPrivacy(!acceptedPrivacy)} style={{fontFamily:F.ios,fontSize:13,color:C.text,lineHeight:1.45,flex:1}}>Acepto el <span onClick={(e)=>{e.stopPropagation();setShowPrivacyModal(true);}} style={{color:C.cyan,fontWeight:600,textDecoration:"underline"}}>Aviso de Privacidad y Términos de Uso</span> de Sociedad Mexicana de Tenis</div>
            </label>
          </div>}
          {authErr&&<Sub style={{color:C.red,marginTop:8,fontSize:13}}>⚠ {authErr}</Sub>}
          {/* Flujo JUGADOR: solicitud al admin */}
          {authMode==="player-recover"&&resetRequestSent&&<div style={{marginTop:14,background:"rgba(52,199,89,0.10)",border:`1px solid rgba(52,199,89,0.40)`,padding:18,borderRadius:14,textAlign:"center"}}>
            <div style={{fontSize:38,marginBottom:10}}>📩</div>
            <div style={{fontFamily:F.bc,color:C.green,letterSpacing:"0.18em",fontSize:11,fontWeight:700,marginBottom:8}}>SOLICITUD ENVIADA AL ADMIN</div>
            <Sub style={{fontSize:13,color:C.text,lineHeight:1.5,marginBottom:14}}>Le notificamos al administrador. Una vez que apruebe tu solicitud, recibirás un correo en <b style={{color:C.cyan}}>{authForm.email}</b> con una <b>contraseña temporal</b>. Úsala para entrar y cambiarla.</Sub>
            <button onClick={()=>{setResetRequestSent(false);setAuthMode("player-login");setAuthForm({email:"",password:"",name:""});}} className="btn-press" style={{background:C.cyan,color:"#fff",border:"none",padding:"11px 22px",fontFamily:F.ios,fontSize:13,cursor:"pointer",borderRadius:12,fontWeight:600}}>VOLVER AL INICIO</button>
          </div>}
          {/* Flujo ADMIN: código por email + reset */}
          {recoveryFlow&&recoveryFlow.step==="verify"&&<div style={{marginTop:14,background:C.cyanDim,border:`1px solid ${C.cyanBdr}`,padding:16,borderRadius:14}}>
            <div style={{fontFamily:F.bc,color:C.cyan,letterSpacing:"0.18em",fontSize:10,marginBottom:8,fontWeight:600}}>📧 CÓDIGO ENVIADO POR EMAIL</div>
            <Sub style={{fontSize:12,color:C.text,marginBottom:10}}>Te enviamos un código de 6 dígitos a <b style={{color:C.cyan}}>{recoveryFlow.email}</b>. Revisa tu bandeja de entrada (y spam).</Sub>
            <FL>Código de verificación</FL>
            <TI value={recoveryCode} onChange={e=>setRecoveryCode(e.target.value)} placeholder="000000" autoFocus onKeyDown={e=>e.key==="Enter"&&verifyRecoveryCode()}/>
            <BtnP onClick={verifyRecoveryCode}>VERIFICAR CÓDIGO</BtnP>
            <button onClick={()=>{setRecoveryFlow(null);setRecoveryCode("");}} className="btn-press" style={{background:"none",border:"none",color:C.muted,fontFamily:F.ios,fontSize:12,cursor:"pointer",marginTop:8,width:"100%"}}>← Cancelar</button>
          </div>}
          {recoveryFlow&&recoveryFlow.step==="reset"&&<div style={{marginTop:14,background:"rgba(52,199,89,0.10)",border:`1px solid rgba(52,199,89,0.35)`,padding:16,borderRadius:14}}>
            <div style={{fontFamily:F.bc,color:C.green,letterSpacing:"0.18em",fontSize:10,marginBottom:8,fontWeight:600}}>✓ CÓDIGO VERIFICADO</div>
            <Sub style={{fontSize:12,color:C.text,marginBottom:10}}>Crea una contraseña nueva y segura: mínimo 8 caracteres, una mayúscula y un número.</Sub>
            <FL>Nueva contraseña</FL>
            <TI type="password" value={newRecPass} onChange={e=>setNewRecPass(e.target.value)} placeholder="••••••••" autoFocus onKeyDown={e=>e.key==="Enter"&&resetRecoveredPassword()}/>
            <BtnP onClick={resetRecoveredPassword}>GUARDAR Y ENTRAR</BtnP>
          </div>}
          {(authMode==="player-login"||authMode==="admin-login")&&!recoveryFlow&&<BtnP onClick={doLogin}>INGRESAR</BtnP>}
          {authMode==="player-register"&&<BtnP onClick={doRegister}>CREAR CUENTA</BtnP>}
          {authMode==="player-recover"&&!resetRequestSent&&<BtnP onClick={doRecover}>📩 SOLICITAR AL ADMIN</BtnP>}
          {authMode==="admin-recover"&&!recoveryFlow&&<BtnP onClick={doRecover}>📧 ENVIARME CÓDIGO</BtnP>}
          <div style={{marginTop:14,display:"flex",flexDirection:"column",gap:6,alignItems:"center"}}>
            {authMode==="player-login"&&!recoveryFlow&&<><button onClick={()=>{setAuthMode("player-recover");setRecoveryFlow(null);setResetRequestSent(false);setAuthErr("");}} className="btn-press" style={{background:"none",border:"none",color:C.cyan,fontFamily:F.ios,fontSize:13,cursor:"pointer"}}>¿Olvidaste tu contraseña?</button><button onClick={()=>{setAuthMode("player-register");setAuthErr("");}} className="btn-press" style={{background:"none",border:"none",color:C.muted,fontFamily:F.ios,fontSize:13,cursor:"pointer"}}>¿No tienes cuenta? <span style={{color:C.cyan}}>Crear cuenta</span></button></>}
            {authMode==="player-register"&&<button onClick={()=>{setAuthMode("player-login");setAuthErr("");}} className="btn-press" style={{background:"none",border:"none",color:C.muted,fontFamily:F.ios,fontSize:13,cursor:"pointer"}}>¿Ya tienes cuenta? <span style={{color:C.cyan}}>Iniciar sesión</span></button>}
            {authMode==="player-recover"&&!resetRequestSent&&<button onClick={()=>{setAuthMode("player-login");setAuthErr("");}} className="btn-press" style={{background:"none",border:"none",color:C.muted,fontFamily:F.ios,fontSize:13,cursor:"pointer"}}>← Volver a iniciar sesión</button>}
            {authMode==="admin-login"&&!recoveryFlow&&<button onClick={()=>{setAuthMode("admin-recover");setRecoveryFlow(null);setAuthErr("");}} className="btn-press" style={{background:"none",border:"none",color:C.cyan,fontFamily:F.ios,fontSize:13,cursor:"pointer"}}>¿Olvidaste la contraseña?</button>}
            {authMode==="admin-recover"&&<button onClick={()=>{setAuthMode("admin-login");setRecoveryFlow(null);setAuthErr("");}} className="btn-press" style={{background:"none",border:"none",color:C.muted,fontFamily:F.ios,fontSize:13,cursor:"pointer"}}>← Volver</button>}
          </div>
        </div>
        <Sub style={{marginTop:20,textAlign:"center",fontSize:11,color:"rgba(255,255,255,0.4)"}}>Demo: carlos@smt.mx · sofia@smt.mx · pass: demo123 · Admin: admin123</Sub>
      </div>
      {showPrivacyModal&&<Modal onClose={()=>setShowPrivacyModal(false)} large center>
        <T size={22} style={{textAlign:"center",marginBottom:6}}>AVISO DE PRIVACIDAD</T>
        <Sub style={{textAlign:"center",fontSize:12,marginBottom:18}}>Sociedad Mexicana de Tenis · Última actualización: {new Date().toLocaleDateString("es-MX",{year:"numeric",month:"long",day:"numeric"})}</Sub>
        <div style={{maxHeight:"55vh",overflowY:"auto",padding:"4px 2px",fontFamily:F.ios,fontSize:13,color:C.text,lineHeight:1.6}}>
          <div style={{fontWeight:700,color:C.cyan,fontFamily:F.bc,fontSize:11,letterSpacing:"0.18em",marginTop:14,marginBottom:6}}>1. RESPONSABLE DEL TRATAMIENTO</div>
          <p style={{margin:0,marginBottom:10}}>Sociedad Mexicana de Tenis (en adelante "SMT"), con domicilio en Monterrey, Nuevo León, México, es responsable del tratamiento de tus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP). Contacto: <b style={{color:C.cyan}}>smt.tennismx@gmail.com</b>.</p>

          <div style={{fontWeight:700,color:C.cyan,fontFamily:F.bc,fontSize:11,letterSpacing:"0.18em",marginTop:14,marginBottom:6}}>2. DATOS QUE RECOPILAMOS</div>
          <p style={{margin:0,marginBottom:6}}>Recopilamos los siguientes datos cuando creas tu cuenta y usas la app:</p>
          <ul style={{margin:0,marginBottom:10,paddingLeft:18}}>
            <li><b>Identificación:</b> nombre completo, correo electrónico, fecha de nacimiento, teléfono celular.</li>
            <li><b>Ubicación:</b> ciudad, estado, club de tenis.</li>
            <li><b>Tenísticos:</b> categoría, ranking, partidos jugados, victorias, torneos, foto de perfil.</li>
            <li><b>Contenido:</b> fotos y videos que publiques en Media, productos en Marketplace, publicación como Coach.</li>
            <li><b>Comunicación:</b> mensajes intercambiados con otros jugadores o coaches.</li>
          </ul>

          <div style={{fontWeight:700,color:C.cyan,fontFamily:F.bc,fontSize:11,letterSpacing:"0.18em",marginTop:14,marginBottom:6}}>3. FINALIDADES</div>
          <p style={{margin:0,marginBottom:6}}>Tus datos se usan para:</p>
          <ul style={{margin:0,marginBottom:10,paddingLeft:18}}>
            <li>Crear y administrar tu cuenta dentro de la app.</li>
            <li>Inscribirte a torneos, generar rankings y registrar resultados de partidos.</li>
            <li>Conectarte con otros jugadores en Find a Match y con Coaches.</li>
            <li>Comprar y vender en el Marketplace.</li>
            <li>Notificarte sobre torneos, solicitudes y novedades de la comunidad.</li>
            <li>Cumplir obligaciones legales y prevenir fraude o uso indebido.</li>
          </ul>

          <div style={{fontWeight:700,color:C.cyan,fontFamily:F.bc,fontSize:11,letterSpacing:"0.18em",marginTop:14,marginBottom:6}}>4. PROTECCIÓN DE MENORES</div>
          <p style={{margin:0,marginBottom:10}}>Si tienes menos de 18 años, la app activa automáticamente un <b>Modo Menor</b> que oculta tu información de adultos. Los menores <b>no</b> pueden acceder a Find a Match, Coach, Marketplace ni Media, y solo pueden inscribirse a torneos de menores. Tus fotos nunca se muestran a usuarios mayores. Los padres o tutores pueden solicitar la eliminación de la cuenta de un menor escribiendo a smt.tennismx@gmail.com.</p>

          <div style={{fontWeight:700,color:C.cyan,fontFamily:F.bc,fontSize:11,letterSpacing:"0.18em",marginTop:14,marginBottom:6}}>5. COMPARTIR DATOS</div>
          <p style={{margin:0,marginBottom:10}}>Tu nombre, foto, categoría y ranking son visibles para otros jugadores adultos dentro de la app. Tu <b>teléfono</b> solo se comparte cuando:</p>
          <ul style={{margin:0,marginBottom:10,paddingLeft:18}}>
            <li>Aceptas una solicitud de Find a Match.</li>
            <li>Aceptas una compra en Marketplace.</li>
            <li>Aceptas o solicitas una sesión de Coach.</li>
          </ul>
          <p style={{margin:0,marginBottom:10}}>No vendemos ni cedemos tus datos a terceros con fines publicitarios.</p>

          <div style={{fontWeight:700,color:C.cyan,fontFamily:F.bc,fontSize:11,letterSpacing:"0.18em",marginTop:14,marginBottom:6}}>6. SEGURIDAD</div>
          <p style={{margin:0,marginBottom:10}}>Tus contraseñas se almacenan cifradas. La app cuenta con un sistema de filtrado de contenido inapropiado en imágenes; quien intente subir contenido sexual o humano en Marketplace recibe una advertencia y un segundo intento resulta en <b>expulsión automática y permanente</b>. Las solicitudes de recuperación de contraseña son revisadas manualmente por el administrador.</p>

          <div style={{fontWeight:700,color:C.cyan,fontFamily:F.bc,fontSize:11,letterSpacing:"0.18em",marginTop:14,marginBottom:6}}>7. TUS DERECHOS ARCO</div>
          <p style={{margin:0,marginBottom:10}}>Tienes derecho a <b>Acceder, Rectificar, Cancelar u Oponerte</b> al tratamiento de tus datos. Para ejercerlos, escribe a smt.tennismx@gmail.com indicando tu nombre, correo registrado y el derecho que deseas ejercer. Tenemos hasta 20 días hábiles para responder.</p>

          <div style={{fontWeight:700,color:C.cyan,fontFamily:F.bc,fontSize:11,letterSpacing:"0.18em",marginTop:14,marginBottom:6}}>8. CONSERVACIÓN Y ELIMINACIÓN</div>
          <p style={{margin:0,marginBottom:10}}>Conservamos tus datos mientras tu cuenta esté activa. Si eliminas tu cuenta, borramos toda tu información personal en un plazo máximo de 30 días, excepto datos que debamos conservar por obligación legal o fiscal.</p>

          <div style={{fontWeight:700,color:C.cyan,fontFamily:F.bc,fontSize:11,letterSpacing:"0.18em",marginTop:14,marginBottom:6}}>9. COOKIES Y TECNOLOGÍAS SIMILARES</div>
          <p style={{margin:0,marginBottom:10}}>La app guarda datos localmente en tu dispositivo para mantener tu sesión activa. No usamos cookies de rastreo publicitario.</p>

          <div style={{fontWeight:700,color:C.cyan,fontFamily:F.bc,fontSize:11,letterSpacing:"0.18em",marginTop:14,marginBottom:6}}>10. CAMBIOS A ESTE AVISO</div>
          <p style={{margin:0,marginBottom:10}}>Podemos actualizar este aviso. Te notificaremos cambios importantes dentro de la app. El uso continuo después de los cambios implica aceptación.</p>

          <div style={{fontWeight:700,color:C.cyan,fontFamily:F.bc,fontSize:11,letterSpacing:"0.18em",marginTop:14,marginBottom:6}}>11. TÉRMINOS DE USO</div>
          <p style={{margin:0,marginBottom:6}}>Al usar la app, te comprometes a:</p>
          <ul style={{margin:0,marginBottom:10,paddingLeft:18}}>
            <li>Proporcionar información veraz al registrarte.</li>
            <li>No suplantar la identidad de otra persona.</li>
            <li>No publicar contenido ofensivo, ilegal, sexual o que viole derechos de terceros.</li>
            <li>No usar la app para acosar, amenazar o discriminar a otros jugadores.</li>
            <li>Respetar las reglas de los torneos y los reportes de resultados.</li>
            <li>No intentar acceder a cuentas ajenas ni vulnerar la seguridad de la app.</li>
          </ul>
          <p style={{margin:0,marginBottom:10}}>SMT puede suspender o eliminar cuentas que incumplan estos términos sin previo aviso.</p>

          <div style={{fontWeight:700,color:C.cyan,fontFamily:F.bc,fontSize:11,letterSpacing:"0.18em",marginTop:14,marginBottom:6}}>12. CONTACTO</div>
          <p style={{margin:0,marginBottom:14}}>Para cualquier duda sobre este aviso o el manejo de tus datos: <b style={{color:C.cyan}}>smt.tennismx@gmail.com</b></p>
        </div>
        <div style={{marginTop:16,display:"flex",gap:8}}>
          <button onClick={()=>{setAcceptedPrivacy(true);setShowPrivacyModal(false);}} className="btn-press" style={{flex:1,background:`linear-gradient(135deg,${C.cyanBright},${C.cyanDeep})`,color:"#fff",border:"none",padding:"14px",fontFamily:F.ios,fontSize:15,fontWeight:700,cursor:"pointer",borderRadius:14,boxShadow:`0 8px 22px rgba(2,136,209,0.4)`}}>✓ HE LEÍDO Y ACEPTO</button>
        </div>
        <button onClick={()=>setShowPrivacyModal(false)} className="btn-press" style={{width:"100%",background:"transparent",border:"none",color:C.muted,fontFamily:F.ios,fontSize:13,cursor:"pointer",marginTop:8,padding:8}}>Cerrar sin aceptar</button>
      </Modal>}
    </div>;
  }

  // INSIGHTS
  if(screen==="insights"&&insights){return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios}}><style>{STYLE}</style><MIns data={insights} onClose={()=>{setInsights(null);setScreen("tournament");}}/>{champion&&<ChampScreen champion={champion.champion} tourney={champion.tourney} onClose={()=>setChampion(null)}/>}</div>;}

  // PLAYER CARD
  if(screen==="player-card"){
    const p=viewP||user;if(!p)return null;
    // PROTECCIÓN DE MENORES: un mayor NO puede ver el perfil de un menor
    if(!isAdmin&&user&&p.id!==user.id&&isMinor(p.birthdate)&&!isMinor(user.birthdate)){
      return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative"}}>
        <style>{STYLE}</style><Aurora intense={0.4}/>
        <div style={{position:"relative",zIndex:1}}><Nav/><Back to="home" label="Home"/>
          <div style={{padding:"40px 24px",textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:12}}>🛡️</div>
            <T size={28}>PERFIL NO DISPONIBLE</T>
            <Sub style={{marginTop:10,fontSize:14,lineHeight:1.5}}>No puedes ver perfiles de menores de edad.</Sub>
          </div>
        </div>
      </div>;
    }
    // Si un menor intenta ver perfil de mayor, también bloqueado
    if(!isAdmin&&user&&p.id!==user.id&&isMinor(user.birthdate)&&!isMinor(p.birthdate)){
      return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative"}}>
        <style>{STYLE}</style><Aurora intense={0.4}/>
        <div style={{position:"relative",zIndex:1}}><Nav/><Back to="home" label="Home"/>
          <div style={{padding:"40px 24px",textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:12}}>🛡️</div>
            <T size={28}>PERFIL NO DISPONIBLE</T>
            <Sub style={{marginTop:10,fontSize:14,lineHeight:1.5}}>Por seguridad, no puedes ver perfiles de jugadores mayores.</Sub>
          </div>
        </div>
      </div>;
    }
    const pIsMinor=isMinor(p.birthdate);
    const wr=p.wins+p.losses>0?Math.round(p.wins/(p.wins+p.losses)*100):0;
    const bp=p.stats?.bpTotal>0?Math.round(p.stats.bpWon/p.stats.bpTotal*100):0;
    const isMe=p.id===user?.id&&!isAdmin;
    const canEditPhoto=isMe||(isAdmin&&p.id!==user?.id);
    const hasSk=p.stats?.serve>0||p.stats?.return>0||p.stats?.forehand>0||p.stats?.backhand>0;
    const photoId=`photoUp-${p.id}`;
    return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative"}}>
      <style>{STYLE}</style><Aurora intense={0.4}/>
      <div style={{position:"relative",zIndex:1}}>
        <Nav/>
        <Back to={selT?"tournament":"home"} label="Volver"/>
        <div style={{position:"relative",margin:"14px 16px 0",borderRadius:18,overflow:"hidden",border:`1px solid ${C.cyanBdr}`,boxShadow:`0 12px 50px rgba(2,136,209,0.25)`,animation:"slideUp 0.5s"}}>
          <div style={{position:"relative",aspectRatio:"3/4",maxHeight:540,overflow:"hidden"}}>
            {pIsMinor?<div style={{width:"100%",height:"100%",background:`linear-gradient(160deg,${C.cyanDim},${C.surface3})`,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:14}}><div style={{fontSize:90}}>🛡️</div><div style={{fontFamily:F.bn,fontSize:60,color:C.cyan,letterSpacing:"0.08em"}}>{p.avatar}</div><div style={{fontFamily:F.bc,fontSize:11,letterSpacing:"0.22em",color:"rgba(255,255,255,0.5)",fontWeight:600,textAlign:"center",padding:"0 20px"}}>MENOR DE EDAD<br/>FOTO NO DISPONIBLE</div></div>:(p.photo?<img src={p.photo} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",animation:"parallaxY 7s infinite"}} alt=""/>:<div style={{width:"100%",height:"100%",background:`linear-gradient(160deg,${C.cyanDim},${C.surface3})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.bn,fontSize:130,color:C.cyan}}>{p.avatar}</div>)}
            {canEditPhoto&&!pIsMinor&&<>
              <label htmlFor={photoId} className="btn-press" style={{position:"absolute",top:14,right:14,padding:"10px 16px",borderRadius:24,background:`linear-gradient(135deg,${C.cyanBright},${C.cyanDeep})`,display:"inline-flex",alignItems:"center",gap:6,cursor:"pointer",border:`2px solid ${C.bg}`,fontSize:13,fontFamily:F.ios,color:"#fff",fontWeight:600,boxShadow:"0 4px 14px rgba(2,136,209,0.45)",userSelect:"none",zIndex:5}}>📷 SUBIR FOTO</label>
              <input id={photoId} type="file" accept="image/*" style={{position:"absolute",left:-9999,opacity:0,width:1,height:1}} onChange={handlePhoto}/>
            </>}
            <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 45%,rgba(4,10,24,0.5) 70%,rgba(4,10,24,0.97))"}}/>
            <div style={{position:"absolute",top:14,left:14,display:"flex",gap:6}}><Chip type="cyan" style={{fontSize:10,padding:"4px 10px"}}>{p.country||"México"}</Chip>{p.sex&&<Chip style={{fontSize:10,padding:"4px 10px"}}>{p.sex==="F"?"♀ FEM":"♂ MAS"}</Chip>}{pIsMinor&&<Chip type="green" style={{fontSize:10,padding:"4px 10px"}}>🛡️ MENOR</Chip>}</div>
            <div style={{position:"absolute",left:0,right:0,bottom:0,padding:22}}>
              <div style={{fontFamily:F.bc,color:C.cyan,letterSpacing:"0.32em",textTransform:"uppercase",fontSize:11,marginBottom:6,fontWeight:600}}>RANKING #{p.ranking||"—"} · {p.points||0} PTS</div>
              <T size={36} style={{lineHeight:0.95,marginBottom:4}}>{(p.firstName||p.name?.split(" ")[0]||"").toUpperCase()}</T>
              <T size={36} style={{lineHeight:0.95,color:C.cyan}}>{(p.lastName||p.name?.split(" ").slice(1).join(" ")||"").toUpperCase()}</T>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:12}}><Chip>{p.club||"—"}</Chip><Chip>{p.hand||"—"}</Chip>{p.category&&<Chip type="gold" style={{background:`${CAT_C[p.category]}25`,color:CAT_C[p.category],borderColor:`${CAT_C[p.category]}55`}}>CAT {p.category}</Chip>}{p.racket&&<Chip type="cyan">🎾 {p.racket}</Chip>}</div>
            </div>
          </div>
        </div>
        {(isMe||(isAdmin&&p.id!==user?.id))&&<div style={{padding:"14px 16px",display:"flex",gap:8,flexWrap:"wrap"}}>
          <BtnG onClick={()=>{setEditProfile({...p});setEditAsAdmin(isAdmin&&p.id!==user?.id);setShowProfileEdit(true);}} style={{flex:"1 1 140px",padding:12}}>✏️ {isAdmin&&p.id!==user?.id?"EDITAR (ADMIN)":"EDITAR PERFIL"}</BtnG>
          {isMe&&<BtnG onClick={()=>{setSvDraft({serve:"",return:"",forehand:"",backhand:"",image:null});setShowSvModal(true);}} style={{flex:"1 1 140px",padding:12}}>📊 SUBIR SWINGVISION</BtnG>}
          {isMe&&<BtnG onClick={()=>setShowChangePass(true)} style={{flex:"1 1 140px",padding:12}}>🔒 CONTRASEÑA</BtnG>}
        </div>}
        <div style={{background:C.surface,padding:"18px 20px",margin:"4px 16px 0",borderRadius:14,border:`0.5px solid ${C.borderS}`}}>
          <SL>Resumen de temporada</SL>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px 24px"}}>
            {[[p.stats?.setsDropped||0,"SETS CAÍDOS"],[p.stats?.gamesLost||0,"JUEGOS PERDIDOS"],[p.stats?.aces||0,"ACES"],[p.stats?.doubleFaults||0,"DOBLES FALTAS"]].map(([v,l],i)=><div key={l} style={{animation:`statPop 0.4s ${i*0.07}s backwards`}}>
              <div style={{fontFamily:F.bn,fontSize:42,color:C.text,lineHeight:1}}><CountUp target={v} duration={1300} delay={150+i*100}/></div>
              <div style={{fontFamily:F.bc,textTransform:"uppercase",letterSpacing:"0.18em",marginTop:3,fontSize:10,color:C.muted,fontWeight:600}}>{l}</div>
            </div>)}
          </div>
          {p.stats?.bpTotal>0&&<div style={{marginTop:16,paddingTop:14,borderTop:`0.5px solid ${C.borderS}`}}>
            <div style={{fontFamily:F.bn,fontSize:30,color:C.cyan,lineHeight:1}}>{p.stats.bpWon}/{p.stats.bpTotal} ({bp}%)</div>
            <div style={{fontFamily:F.bc,textTransform:"uppercase",letterSpacing:"0.18em",marginTop:4,fontSize:10,color:C.muted,fontWeight:600}}>BREAK POINTS GANADOS</div>
          </div>}
        </div>
        {hasSk&&<div style={{background:C.surface2,padding:"16px 20px",margin:"10px 16px 0",borderRadius:14,border:`0.5px solid ${C.borderS}`}}>
          <SL>Habilidades · SwingVision</SL>
          {[["serve","SERVICIO"],["return","RESTO"],["forehand","DERECHA"],["backhand","REVÉS"]].map(([k,l],i)=>{const v=p.stats?.[k];if(!v)return null;return <div key={k} style={{display:"flex",alignItems:"center",gap:12,marginBottom:12,animation:`slideLeft 0.4s ${i*0.06}s backwards`}}>
            <div style={{width:42,textAlign:"right",fontFamily:F.bn,fontSize:24,color:C.cyan}}>{parseFloat(v).toFixed(1)}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><div style={{fontFamily:F.bc,textTransform:"uppercase",letterSpacing:"0.18em",fontSize:10,color:C.muted,fontWeight:600}}>{l}</div><Sub style={{fontSize:10,color:"rgba(240,237,232,0.3)"}}>avg {TAVG[k]}</Sub></div>
              <div style={{height:5,background:C.surface3,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${(v/10)*100}%`,background:`linear-gradient(90deg,${C.cyanBright},${C.cyanDeep})`,borderRadius:3}}/></div>
            </div>
          </div>;})}
        </div>}
        <div style={{background:C.surface,margin:"10px 16px 0",borderRadius:14,border:`0.5px solid ${C.borderS}`,overflow:"hidden"}}>
          <Row label="W / L" val={`${p.wins||0} — ${p.losses||0}`}/>
          <Row label="Win Rate" val={`${wr}%`}/>
          <Row label="Categoría" val={p.category?<span style={{color:CAT_C[p.category]}}>{p.category}</span>:"— sin asignar —"}/>
          <Row label="Títulos" val={p.titles||0}/>
          <Row label="Mano hábil" val={p.hand||"—"}/>
          <Row label="Raqueta" val={p.racket||"—"}/>
          <Row label="Club sede" val={p.club||"—"}/>
          <Row label="País" val={p.country||"—"}/>
          <Row label="Estado" val={p.state||"—"}/>
          <Row label="Ciudad" val={p.city||"—"}/>
          <Row label="Teléfono" val={p.phone||"—"}/>
          <Row label="Fecha de nacimiento" val={p.birthdate||"—"}/>
        </div>
        {isMe&&<div style={{padding:"24px 16px 16px"}}>
          <button onClick={doLogout} className="btn-press" style={{width:"100%",background:"rgba(255,59,48,0.10)",border:`1px solid rgba(255,59,48,0.4)`,color:C.red,padding:"15px 18px",fontFamily:F.ios,fontSize:16,fontWeight:600,cursor:"pointer",borderRadius:14}}>↩  CERRAR SESIÓN</button>
          <button onClick={()=>{setDeleteConfirmText("");setShowDeleteAccount(true);}} className="btn-press" style={{width:"100%",marginTop:12,background:"transparent",border:`1px solid rgba(255,59,48,0.25)`,color:"rgba(255,99,99,0.85)",padding:"13px 18px",fontFamily:F.ios,fontSize:14,fontWeight:600,cursor:"pointer",borderRadius:14}}>🗑  ELIMINAR MI CUENTA</button>
        </div>}
        <div style={{height:32}}/>
        <TabSpacer/>

        {showDeleteAccount&&<Modal onClose={()=>{setShowDeleteAccount(false);setDeleteConfirmText("");}} center>
          <div style={{textAlign:"center",marginBottom:8}}>
            <div style={{fontSize:40,marginBottom:6}}>⚠️</div>
            <T size={22}>ELIMINAR CUENTA</T>
          </div>
          <Sub style={{textAlign:"center",fontSize:14,lineHeight:1.5,marginBottom:16}}>Esta acción es permanente y no se puede deshacer. Se eliminarán tu perfil, estadísticas, inscripciones a torneos, publicaciones del marketplace y todos tus datos.</Sub>
          <FL>Para confirmar, escribe <b style={{color:C.text}}>ELIMINAR</b></FL>
          <TI type="text" value={deleteConfirmText} onChange={e=>setDeleteConfirmText(e.target.value)} placeholder="ELIMINAR"/>
          <button onClick={doDeleteAccount} disabled={deleteConfirmText.trim().toUpperCase()!=="ELIMINAR"} className="btn-press" style={{width:"100%",marginTop:18,background:deleteConfirmText.trim().toUpperCase()==="ELIMINAR"?C.red:"rgba(255,59,48,0.25)",border:"none",color:"#fff",padding:"15px 18px",fontFamily:F.ios,fontSize:16,fontWeight:700,cursor:deleteConfirmText.trim().toUpperCase()==="ELIMINAR"?"pointer":"not-allowed",borderRadius:14,opacity:deleteConfirmText.trim().toUpperCase()==="ELIMINAR"?1:0.6}}>Eliminar mi cuenta permanentemente</button>
          <button onClick={()=>{setShowDeleteAccount(false);setDeleteConfirmText("");}} className="btn-press" style={{width:"100%",marginTop:10,background:"transparent",border:`1px solid ${C.borderS}`,color:C.text,padding:"13px 18px",fontFamily:F.ios,fontSize:15,fontWeight:600,cursor:"pointer",borderRadius:14}}>Cancelar</button>
        </Modal>}
        {showProfileEdit&&editProfile&&<Modal onClose={()=>{setShowProfileEdit(false);setEditAsAdmin(false);}} large center>
          <T size={24} style={{textAlign:"center",marginBottom:8}}>EDITAR PERFIL</T>
          {editAsAdmin&&<div style={{textAlign:"center",marginBottom:18,color:C.amber,fontFamily:F.bc,letterSpacing:"0.2em",textTransform:"uppercase",fontSize:11,fontWeight:600}}>MODO ADMIN</div>}
          {!editAsAdmin&&<div style={{height:14}}/>}
          {[["Nombre(s)","firstName","text"],["Apellido(s)","lastName","text"],["Club sede","club","text"],["País","country","text"],["Ciudad","city","text"],["Fecha de nacimiento","birthdate","date"]].map(([l,k,t])=><div key={k} style={{marginBottom:14}}><FL>{l}</FL><TI type={t} value={editProfile[k]||""} onChange={e=>setEditProfile({...editProfile,[k]:e.target.value})}/></div>)}
          <div style={{marginBottom:14}}><FL>Estado</FL><select value={editProfile.state||""} onChange={e=>setEditProfile({...editProfile,state:e.target.value})} style={{width:"100%",background:C.iosField,border:"none",borderRadius:12,padding:"13px 16px",color:C.text,fontFamily:F.ios,fontSize:16,outline:"none",cursor:"pointer"}}><option value="">— Selecciona estado —</option>{MX_STATES.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
          <div style={{marginBottom:14}}><FL>Sexo</FL><Seg options={[{v:"M",l:"♂ Masculino"},{v:"F",l:"♀ Femenino"}]} value={editProfile.sex} onChange={v=>setEditProfile({...editProfile,sex:v})}/></div>
          <div style={{marginBottom:14}}><FL>Mano hábil</FL><Seg options={["Diestro","Zurdo"]} value={editProfile.hand} onChange={v=>setEditProfile({...editProfile,hand:v})}/></div>
          <div style={{marginBottom:14}}><FL>Raqueta</FL><select value={editProfile.racket||""} onChange={e=>setEditProfile({...editProfile,racket:e.target.value})} style={{width:"100%",background:C.iosField,border:"none",borderRadius:12,padding:"13px 16px",color:C.text,fontFamily:F.ios,fontSize:16,outline:"none",cursor:"pointer"}}><option value="">— Selecciona —</option>{RACKETS.map(r=><option key={r} value={r}>{r}</option>)}</select></div>
          <div style={{marginBottom:14}}><FL>Teléfono celular {!editAsAdmin&&"(para FIND A MATCH)"}</FL><TI type="tel" value={editProfile.phone||""} onChange={e=>setEditProfile({...editProfile,phone:e.target.value})} placeholder="+528112345678"/></div>
          <div style={{marginBottom:14}}>
            <FL>Categoría {editProfile.categoryLocked&&!editAsAdmin&&"🔒"}</FL>
            {editProfile.categoryLocked&&!editAsAdmin?<>
              <Seg options={CATS} value={editProfile.category||"B"} onChange={v=>setEditProfile({...editProfile,category:v})}/>
              <Sub style={{marginTop:6,fontSize:12,color:C.amber}}>⚠️ Cambiar tu categoría enviará una solicitud al administrador. Solo se aplicará si la aprueba.</Sub>
            </>:<>
              <Seg options={CATS} value={editProfile.category||"B"} onChange={v=>setEditProfile({...editProfile,category:v})}/>
              {!editProfile.categoryLocked&&!editAsAdmin&&<Sub style={{marginTop:6,fontSize:12,color:C.cyan}}>ℹ️ Una vez guardada tu categoría, solo el administrador podrá modificarla por solicitud.</Sub>}
            </>}
          </div>
          <div style={{marginTop:24,padding:"14px 0",borderTop:`0.5px solid ${C.borderS}`}}>
            <SL>SwingVision · Habilidades</SL>
            {!editAsAdmin?<>
              <div style={{background:C.surface2,border:`1px solid ${C.cyanBdr}`,borderRadius:12,padding:14,marginBottom:10}}>
                <div style={{fontFamily:F.ios,fontSize:13,color:C.text,marginBottom:6,fontWeight:600}}>📱 Cómo subir tus datos de SwingVision</div>
                <Sub style={{fontSize:12,lineHeight:1.5}}>1. Abre la app de SwingVision en tu teléfono.<br/>2. Toma un screenshot DIRECTO donde aparezcan tus valores de Servicio, Resto, Derecha y Revés.<br/>3. Cierra este modal y presiona "📊 SUBIR DATOS SWINGVISION" en tu perfil para enviar la solicitud al administrador. Las habilidades aparecerán solo cuando él apruebe.</Sub>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px 12px"}}>
                {[["serve","Servicio"],["return","Resto"],["forehand","Derecha"],["backhand","Revés"]].map(([k,l])=>{const v=editProfile.stats?.[k]||0;return <div key={k} style={{background:C.surface3,borderRadius:10,padding:"8px 10px"}}>
                  <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.16em",color:C.muted,fontWeight:600}}>{l.toUpperCase()}</div>
                  <div style={{fontFamily:F.bn,fontSize:24,color:v>0?C.cyan:C.muted,marginTop:2}}>{v>0?parseFloat(v).toFixed(1):"—"}</div>
                </div>;})}
              </div>
            </>:<>
              {[["serve","Servicio"],["return","Resto"],["forehand","Derecha"],["backhand","Revés"]].map(([k,l])=><div key={k} style={{display:"flex",alignItems:"center",gap:14,marginBottom:10}}>
                <div style={{fontFamily:F.ios,fontSize:14,color:C.text,flex:1,fontWeight:500}}>{l}</div>
                <input type="number" min="0" max="10" step="0.1" style={{width:90,background:C.iosField,border:"none",borderRadius:10,padding:"9px 10px",color:C.text,fontFamily:F.bn,fontSize:22,textAlign:"center",outline:"none"}} value={editProfile.stats?.[k]||""} onChange={e=>setEditProfile({...editProfile,stats:{...editProfile.stats,[k]:parseFloat(e.target.value)||0}})} placeholder="0"/>
              </div>)}
            </>}
          </div>
          {editAsAdmin&&<div style={{marginTop:14,padding:"14px 0",borderTop:`0.5px solid ${C.borderS}`}}>
            <SL color={C.amber}>Estadísticas (solo admin)</SL>
            {[["wins","Victorias"],["losses","Derrotas"],["titles","Títulos"],["points","Puntos"],["ranking","Ranking #"]].map(([k,l])=><div key={k} style={{display:"flex",alignItems:"center",gap:14,marginBottom:10}}>
              <div style={{fontFamily:F.ios,fontSize:14,color:C.text,flex:1,fontWeight:500}}>{l}</div>
              <input type="number" min="0" style={{width:90,background:C.iosField,border:"none",borderRadius:10,padding:"9px 10px",color:C.text,fontFamily:F.bn,fontSize:18,textAlign:"center",outline:"none"}} value={editProfile[k]||""} onChange={e=>setEditProfile({...editProfile,[k]:parseInt(e.target.value)||0})}/>
            </div>)}
            {[["aces","Aces"],["doubleFaults","Dobles faltas"],["bpWon","BP ganados"],["bpTotal","BP totales"],["winners","Winners"],["unforcedErrors","Err. no forzados"],["setsDropped","Sets perdidos"],["gamesLost","Juegos perdidos"]].map(([k,l])=><div key={k} style={{display:"flex",alignItems:"center",gap:14,marginBottom:10}}>
              <div style={{fontFamily:F.ios,fontSize:14,color:C.text,flex:1,fontWeight:500}}>{l}</div>
              <input type="number" min="0" style={{width:90,background:C.iosField,border:"none",borderRadius:10,padding:"9px 10px",color:C.text,fontFamily:F.bn,fontSize:18,textAlign:"center",outline:"none"}} value={editProfile.stats?.[k]||""} onChange={e=>setEditProfile({...editProfile,stats:{...editProfile.stats,[k]:parseInt(e.target.value)||0}})}/>
            </div>)}
          </div>}
          <BtnP onClick={saveProfile}>GUARDAR</BtnP>
          <BtnX onClick={()=>{setShowProfileEdit(false);setEditAsAdmin(false);}}>CANCELAR</BtnX>
        </Modal>}
        {showChangePass&&<Modal onClose={()=>setShowChangePass(false)}>
          <T size={24} style={{textAlign:"center",marginBottom:20}}>CAMBIAR CONTRASEÑA</T>
          <FL>Contraseña actual</FL><TI type="password" value={passForm.old} onChange={e=>setPassForm({...passForm,old:e.target.value})}/>
          <div style={{height:14}}/><FL>Nueva contraseña (mín 6)</FL><TI type="password" value={passForm.new} onChange={e=>setPassForm({...passForm,new:e.target.value})}/>
          <BtnP onClick={changePassword}>ACTUALIZAR</BtnP><BtnX onClick={()=>{setShowChangePass(false);setPassForm({old:"",new:""});}}>CANCELAR</BtnX>
        </Modal>}
        {showSvModal&&<Modal onClose={()=>setShowSvModal(false)} large>
          <T size={22} style={{textAlign:"center",marginBottom:8}}>SUBIR DATOS SWINGVISION</T>
          <Sub style={{textAlign:"center",marginBottom:14,fontSize:13}}>Tus habilidades aparecerán solo cuando el admin las apruebe</Sub>
          <div style={{background:C.surface2,border:`1px solid ${C.cyanBdr}`,borderRadius:12,padding:14,marginBottom:16}}>
            <div style={{fontFamily:F.bc,fontSize:11,letterSpacing:"0.18em",color:C.cyan,fontWeight:600,marginBottom:6}}>📱 INSTRUCCIONES</div>
            <Sub style={{fontSize:12,lineHeight:1.5,color:C.text}}>1. Abre la app de <b style={{color:C.cyan}}>SwingVision</b> en tu teléfono.<br/>2. Toma un <b>screenshot directo</b> donde aparezcan tus valores de Servicio, Resto, Derecha y Revés.<br/>3. Sube esa imagen aquí junto con los valores que aparezcan.<br/>4. El administrador verá tu imagen y valores para aprobar o rechazar.</Sub>
          </div>
          <FL>Screenshot de SwingVision *</FL>
          <label htmlFor="svImgUp" style={{cursor:"pointer",border:`2px dashed ${C.cyanBdr}`,borderRadius:12,padding:svDraft.image?0:24,background:C.iosField,textAlign:"center",overflow:"hidden",display:"block",marginBottom:14}}>
            {svDraft.image?<img src={svDraft.image} style={{width:"100%",maxHeight:280,objectFit:"contain",display:"block"}} alt=""/>:<><div style={{fontSize:34,marginBottom:8}}>📸</div><div style={{fontFamily:F.ios,fontSize:14,color:C.text,fontWeight:600}}>Subir screenshot de SwingVision</div><Sub style={{fontSize:12,marginTop:4}}>JPG o PNG</Sub></>}
          </label>
          <input id="svImgUp" type="file" accept="image/*" style={{position:"absolute",left:-9999,opacity:0,width:1,height:1}} onChange={handleSvImage}/>
          {svDraft.image&&<button onClick={()=>setSvDraft({...svDraft,image:null})} className="btn-press" style={{background:"none",border:"none",color:C.red,fontSize:13,marginBottom:14,cursor:"pointer",fontFamily:F.ios,fontWeight:500}}>✕ Cambiar imagen</button>}
          <FL>Valores que aparecen en SwingVision (0–10)</FL>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:8}}>
            {[["serve","Servicio"],["return","Resto"],["forehand","Derecha"],["backhand","Revés"]].map(([k,l])=><div key={k}>
              <div style={{fontFamily:F.bc,fontSize:11,letterSpacing:"0.14em",color:C.muted,marginBottom:4,fontWeight:600}}>{l.toUpperCase()}</div>
              <input type="number" min="0" max="10" step="0.1" placeholder="0.0" value={svDraft[k]} onChange={e=>setSvDraft({...svDraft,[k]:e.target.value})} style={{width:"100%",background:C.iosField,border:"none",borderRadius:10,padding:"10px 12px",color:C.text,fontFamily:F.bn,fontSize:22,textAlign:"center",outline:"none"}}/>
            </div>)}
          </div>
          <BtnP onClick={submitSvRequest}>ENVIAR SOLICITUD AL ADMIN</BtnP>
          <BtnX onClick={()=>setShowSvModal(false)}>CANCELAR</BtnX>
        </Modal>}
        {viewSvImg&&<div onClick={()=>setViewSvImg(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.95)",zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",padding:20}}><img src={viewSvImg} style={{maxWidth:"100%",maxHeight:"100%",objectFit:"contain"}} alt=""/></div>}
      </div>
      <ShowTabBar/>
    </div>;
  }

  // HOME
  if(screen==="home"){
    return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative",overflow:"hidden"}}>
      <style>{STYLE}</style><Aurora intense={0.5}/>
      <div style={{position:"relative",zIndex:1}}>
        <Nav/>
        {welcomeAnim&&<WelcomeAnim user={user} isAdmin={isAdmin} onDone={()=>setWelcomeAnim(false)}/>}
        {!isAdmin?<div style={{position:"relative",animation:"slideLeft 0.4s",borderBottom:`0.5px solid ${C.borderS}`,overflow:"hidden"}}>
          {/* HERO IMAGE - Foto grande del jugador */}
          {!isMinor(user?.birthdate)&&user?.photo?<div style={{position:"relative",aspectRatio:"16/10",maxHeight:280,overflow:"hidden"}}>
            <img src={user.photo} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 20%",animation:"facePulse 7s ease-in-out infinite"}} alt=""/>
            <div style={{position:"absolute",inset:0,background:`linear-gradient(180deg,rgba(4,10,24,0.1) 0%,rgba(4,10,24,0.5) 50%,rgba(4,10,24,0.95))`}}/>
            <div style={{position:"absolute",inset:0,background:`radial-gradient(circle at 30% 50%,transparent,rgba(4,10,24,0.5))`,mixBlendMode:"multiply"}}/>
            {/* SwingVision-style HUD overlay */}
            <div style={{position:"absolute",top:14,right:14,background:"rgba(4,10,24,0.7)",backdropFilter:"blur(10px)",border:`1px solid ${C.cyanBdr}`,borderRadius:10,padding:"6px 12px",animation:"fadeIn 0.6s 0.3s backwards"}}>
              <div style={{fontFamily:F.bc,fontSize:9,letterSpacing:"0.22em",color:C.cyan,fontWeight:600}}>LIVE</div>
              <div style={{display:"flex",alignItems:"center",gap:5,marginTop:2}}><div style={{width:6,height:6,borderRadius:"50%",background:C.green,animation:"pulse 1.5s infinite"}}/><div style={{fontFamily:F.ios,fontSize:11,color:C.text,fontWeight:600}}>ONLINE</div></div>
            </div>
            <div style={{position:"absolute",left:18,right:18,bottom:14,animation:"slideUp 0.5s 0.2s backwards"}}>
              <div style={{fontFamily:F.bc,fontSize:11,letterSpacing:"0.32em",color:C.cyan,textTransform:"uppercase",fontWeight:600,marginBottom:4}}>Bienvenido de vuelta</div>
              <T size={44} style={{lineHeight:0.92,textShadow:"0 4px 24px rgba(0,0,0,0.6)"}}>{(user?.firstName||user?.name?.split(" ")[0])?.toUpperCase()}</T>
              <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
                <Chip type="cyan">#{user?.ranking||"—"}</Chip>
                <Chip>{user?.points||0} PTS</Chip>
                {user?.category&&<Chip style={{background:`${CAT_C[user.category]}25`,color:CAT_C[user.category],borderColor:`${CAT_C[user.category]}55`}}>CAT {user.category}</Chip>}
              </div>
            </div>
          </div>:<div style={{padding:"22px 18px 0",position:"relative"}}>
            {/* Sin foto o menor: avatar circular grande */}
            <div style={{position:"absolute",top:-30,right:-30,opacity:0.08,animation:"breathing 6s infinite"}}><Logo size={200}/></div>
            <SL>Bienvenido de vuelta</SL>
            <div style={{display:"flex",alignItems:"center",gap:14,marginTop:6}}>
              {isMinor(user?.birthdate)?<div style={{width:84,height:84,borderRadius:"50%",background:`linear-gradient(160deg,${C.cyanDim},${C.surface3})`,border:`2px solid ${C.cyan}`,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",animation:"breathSubtle 4.5s infinite"}}><div style={{fontSize:26}}>🛡️</div><div style={{fontFamily:F.bn,fontSize:18,color:C.cyan}}>{user?.avatar}</div></div>:<PA photo={user?.photo} avatar={user?.avatar} size={84} border={`2px solid ${C.cyan}`}/>}
              <div>
                <T size={36}>{(user?.firstName||user?.name?.split(" ")[0])?.toUpperCase()}</T>
                <div style={{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"}}><Chip type="cyan">#{user?.ranking||"—"}</Chip><Chip>{user?.points||0} PTS</Chip></div>
              </div>
            </div>
          </div>}
          <div style={{padding:"16px 18px 18px"}}>
            <div style={{display:"flex",gap:18,flexWrap:"wrap"}}>
              {[["#"+(user?.ranking||"—"),"Ranking"],[user?.points||0,"Puntos"],[`${user?.wins||0}W ${user?.losses||0}L`,"Record"],[user?.titles||0,"Títulos"]].map(([v,l],i)=><div key={l} style={{animation:`statPop 0.5s ${0.3+i*0.07}s backwards`}}><div style={{fontFamily:F.bn,fontSize:26,color:C.cyan}}>{v}</div><div style={{fontFamily:F.bc,marginTop:2,textTransform:"uppercase",letterSpacing:"0.2em",fontSize:10,color:C.muted,fontWeight:600}}>{l}</div></div>)}
            </div>
            <div style={{marginTop:14,display:"flex",gap:8,flexWrap:"wrap"}}>
              <BtnG onClick={()=>{if(!user.category){alert("Primero selecciona tu categoría en tu perfil.");return;}setNewReqT({name:"",date:"",surface:"Clay",location:"",prize:"",modality:"singles",gender:user.sex||"M",category:user.category,format:"groups+ko"});setReqTourModal(true);}}>✏️ SOLICITAR TORNEO {createPermissions[user.id]>0&&`(${createPermissions[user.id]} disp.)`}</BtnG>
              <BtnG onClick={()=>setScreen("scoreboard")}>📊 MARCADOR EN VIVO</BtnG>
            </div>
            {isMinor(user?.birthdate)&&<div style={{marginTop:14,background:"rgba(91,173,111,0.12)",border:`1px solid rgba(91,173,111,0.4)`,borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
              <div style={{fontSize:22}}>🛡️</div>
              <div><div style={{fontFamily:F.bc,fontSize:11,letterSpacing:"0.18em",color:"#5BAD6F",fontWeight:700}}>MODO MENOR DE EDAD</div><Sub style={{fontSize:12,marginTop:2}}>Versión segura activada. Solo ves contenido y torneos apropiados para tu edad.</Sub></div>
            </div>}
          </div>
        </div>:<div style={{padding:"18px 18px 16px",borderBottom:`0.5px solid ${C.borderS}`,background:`linear-gradient(135deg,rgba(10,27,61,0.7),rgba(13,33,72,0.5) 70%,transparent)`,animation:"slideLeft 0.4s",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-25,right:-25,opacity:0.08,animation:"breathing 6s infinite"}}><Logo size={180}/></div>
          <SL>Panel de control</SL>
          <T size={32}>ADMINISTRADOR</T>
          <Sub style={{marginTop:4}}>{tournaments.length} torneos · {accounts.length} jugadores</Sub>
          <div style={{display:"flex",gap:8,marginTop:14,flexWrap:"wrap"}}>
            <BtnG onClick={()=>setScreen("admin-inbox")}>🔔 BANDEJA ({pendRegs()+pendRes()+categoryRequests.filter(r=>r.status==="pending").length+tournamentRequests.filter(r=>r.status==="pending").length+statRequests.filter(r=>r.status==="pending").length+svRequests.filter(r=>r.status==="pending").length+coachApplications.filter(r=>r.status==="pending").length+passwordResetRequests.filter(r=>r.status==="pending").length+mediaRequests.filter(r=>r.status==="pending").length})</BtnG>
            <BtnG onClick={()=>setScreen("rankings")}>🏆 RANKINGS</BtnG>
            <BtnG onClick={()=>setScreen("media")}>🎬 MEDIA</BtnG>
            <BtnG onClick={()=>setScreen("marketplace")}>🛒 MARKETPLACE</BtnG>
            <BtnG onClick={()=>setMediaUploadModal(true)}>📤 SUBIR MEDIA</BtnG>
            <BtnG onClick={()=>setScreen("admin-settings")}>⚙️ AJUSTES</BtnG>
            <BtnG onClick={doLogout}>↩ SALIR</BtnG>
          </div>
        </div>}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"22px 18px 12px"}}>
          <T size={28}>TORNEOS</T>
          <div style={{display:"flex",gap:8}}>
            <BtnG onClick={()=>setShowTFilters(!showTFilters)} style={{padding:"7px 11px",fontSize:11}}>{showTFilters?"▲":"▼"} FILTROS{(tFilters.category||tFilters.gender||tFilters.country||tFilters.state||tFilters.city||tFilters.club)?" •":""}</BtnG>
            {isAdmin&&<BtnG onClick={()=>setShowCreate(true)}>+ CREAR</BtnG>}
            {!isAdmin&&createPermissions[user?.id]>0&&<BtnG onClick={()=>setShowCreate(true)}>+ CREAR ({createPermissions[user.id]})</BtnG>}
          </div>
        </div>
        {showTFilters&&<div style={{margin:"0 18px 14px",background:C.surface,border:`0.5px solid ${C.borderS}`,borderRadius:12,padding:12,animation:"slideDown 0.3s"}}>
          <FL>Categoría</FL>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
            <button onClick={()=>setTFilters({...tFilters,category:""})} className="btn-press" style={{padding:"6px 10px",fontSize:11,borderRadius:8,border:`1px solid ${!tFilters.category?C.cyanBdr:C.borderS}`,background:!tFilters.category?C.cyanDim:"transparent",color:!tFilters.category?C.cyan:C.muted,fontFamily:F.bc,letterSpacing:"0.1em",cursor:"pointer",fontWeight:600}}>TODAS</button>
            {CATS.map(c=><button key={c} onClick={()=>setTFilters({...tFilters,category:c})} className="btn-press" style={{padding:"6px 10px",fontSize:11,borderRadius:8,border:`1px solid ${tFilters.category===c?CAT_C[c]:C.borderS}`,background:tFilters.category===c?`${CAT_C[c]}25`:"transparent",color:tFilters.category===c?CAT_C[c]:C.muted,fontFamily:F.bc,letterSpacing:"0.1em",cursor:"pointer",fontWeight:600}}>{c}</button>)}
          </div>
          <FL>Género</FL>
          <Seg options={[{v:"",l:"Todos"},{v:"M",l:"♂ Varonil"},{v:"F",l:"♀ Femenil"},{v:"Mixed",l:"⚥ Mixto"}]} value={tFilters.gender} onChange={v=>setTFilters({...tFilters,gender:v})} style={{marginBottom:10}}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
            <div><FL>País</FL><TI value={tFilters.country} onChange={e=>setTFilters({...tFilters,country:e.target.value})} placeholder="México" style={{fontSize:13,padding:"10px 12px"}}/></div>
            <div><FL>Ciudad</FL><TI value={tFilters.city} onChange={e=>setTFilters({...tFilters,city:e.target.value})} placeholder="Monterrey" style={{fontSize:13,padding:"10px 12px"}}/></div>
          </div>
          <FL>Estado</FL>
          <select value={tFilters.state} onChange={e=>setTFilters({...tFilters,state:e.target.value})} style={{width:"100%",background:C.iosField,border:"none",borderRadius:10,padding:"10px 12px",color:C.text,fontFamily:F.ios,fontSize:13,outline:"none",cursor:"pointer",marginBottom:10}}><option value="">Todos los estados</option>{MX_STATES.map(s=><option key={s} value={s}>{s}</option>)}</select>
          <FL>Club</FL>
          <TI value={tFilters.club} onChange={e=>setTFilters({...tFilters,club:e.target.value})} placeholder="Club Campestre" style={{fontSize:13,padding:"10px 12px"}}/>
          <button onClick={()=>setTFilters({category:"",gender:"",country:"",state:"",city:"",club:""})} className="btn-press" style={{marginTop:10,background:"none",border:"none",color:C.red,fontFamily:F.ios,fontSize:12,cursor:"pointer",fontWeight:500}}>✕ Limpiar filtros</button>
        </div>}
        {(()=>{const userIsMinor=!isAdmin&&isMinor(user?.birthdate);const userCat=user?.category;const userCatIdx=userCat?CATS.indexOf(userCat):-1;return tournaments.filter(t=>{if(isAdmin)return true;if(userIsMinor?!t.forMinors:!!t.forMinors)return false;// Categoría: solo torneos de su misma categoría o MAYOR (índice menor en CATS porque Abierta=0 es la mayor)
if(t.category&&userCatIdx>=0){const tCatIdx=CATS.indexOf(t.category);if(tCatIdx>userCatIdx)return false;}// Si jugador no tiene categoría, no ve torneos con categoría
if(t.category&&userCatIdx<0)return false;return true;}).filter(t=>(!tFilters.category||t.category===tFilters.category)&&(!tFilters.gender||t.gender===tFilters.gender)&&(!tFilters.country||(t.country||"México").toLowerCase().includes(tFilters.country.toLowerCase()))&&(!tFilters.state||t.state===tFilters.state)&&(!tFilters.city||(t.city||"").toLowerCase().includes(tFilters.city.toLowerCase()))&&(!tFilters.club||(t.location||t.club||"").toLowerCase().includes(tFilters.club.toLowerCase()))).map((t,ti)=>{
          const isReg=!isAdmin&&t.players.find(p=>p.id===user?.id);
          const isPending=!isAdmin&&t.pendingPlayers.find(p=>p.id===user?.id);
          const sc=SURF_C[t.surface]||C.muted;
          const champ=getChamp(t);
          return <div key={t.id} onClick={()=>openTourney(t)} className="tap-row" style={{background:"rgba(10,27,61,0.7)",border:`0.5px solid ${C.borderS}`,borderRadius:14,margin:"0 18px 12px",cursor:"pointer",position:"relative",overflow:"hidden",animation:`slideUp 0.4s ${ti*0.05}s backwards`,display:"flex",backdropFilter:"blur(10px)"}}>
            <div style={{position:"absolute",left:0,top:0,bottom:0,width:3,background:`linear-gradient(180deg,${C.cyanBright},${C.cyanDeep})`,zIndex:2}}/>
            <div style={{width:96,minHeight:148,flexShrink:0,position:"relative",overflow:"hidden",background:t.image?"transparent":`linear-gradient(135deg,${C.surface2},${C.surface3})`}}>
              {t.image?<img src={t.image} style={{width:"100%",height:"100%",objectFit:"cover",animation:"breathing 6s infinite"}} alt=""/>:<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:6}}><Logo size={56}/><div style={{fontFamily:F.bc,fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",fontWeight:600}}>{t.surface}</div></div>}
              <div style={{position:"absolute",inset:0,background:`linear-gradient(90deg,transparent 60%,rgba(10,27,61,0.7))`}}/>
            </div>
            <div style={{flex:1,padding:"14px 14px 12px",minWidth:0,display:"flex",gap:10}}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                  <div style={{flex:1,minWidth:0}}>
                    <T size={20} style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{t.name}</T>
                    <Sub style={{fontSize:12,marginTop:3}}>{t.date} · {t.location}</Sub>
                  </div>
                  <div style={{display:"flex",gap:5,alignItems:"center",flexShrink:0}}>
                    {isReg&&<Chip type="green">INSCRITO</Chip>}
                    {isPending&&<Chip type="amber">PEND</Chip>}
                    {isAdmin&&<>
                      <button onClick={e=>{e.stopPropagation();setEditTourney({...t});}} className="btn-press" style={{background:"transparent",border:`1px solid ${C.borderS}`,color:C.muted,fontSize:13,cursor:"pointer",padding:"5px 9px",borderRadius:8}}>✏️</button>
                      <button onClick={e=>{e.stopPropagation();setDeleteTId(t.id);}} className="btn-press" style={{background:"transparent",border:`1px solid rgba(255,59,48,0.4)`,color:C.red,fontSize:11,cursor:"pointer",padding:"5px 9px",borderRadius:8}}>✕</button>
                    </>}
                  </div>
                </div>
                <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
                  <span style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.2em",textTransform:"uppercase",padding:"3px 9px",borderRadius:6,background:`${sc}18`,color:sc,border:`1px solid ${sc}44`,fontWeight:600}}>{t.surface}</span>
                  <Chip type="cyan">{t.modality==="doubles"?"DOBLES":"SINGLES"}</Chip>
                  <Chip>{t.gender==="F"?"♀":t.gender==="Mixed"?"⚥":"♂"}</Chip>
                  {t.forMinors&&<Chip type="green">🛡️ MENORES</Chip>}
                  {t.category&&<span style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",padding:"3px 9px",borderRadius:6,background:`${CAT_C[t.category]}25`,color:CAT_C[t.category],border:`1px solid ${CAT_C[t.category]}55`,fontWeight:700}}>CAT {t.category}</span>}
                  <Chip type="gold">{t.prize}</Chip>
                </div>
                {!champ&&<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10}}>
                  <div style={{display:"flex",alignItems:"center",gap:5}}>
                    {t.players.slice(0,4).map(p=><PA key={p.id} photo={t.forMinors?null:p.photo} avatar={p.avatar} size={22} border={`1px solid ${C.borderS}`}/>)}
                    {t.players.length>4&&<Sub style={{fontSize:11,marginLeft:2}}>+{t.players.length-4}</Sub>}
                    <Sub style={{fontSize:12,marginLeft:4}}>{t.players.length}/{t.maxPlayers}</Sub>
                  </div>
                  <Chip type={t.status==="open"?"green":"cyan"}>{t.status==="open"?"ABIERTO":t.status==="groups"?"GRUPOS":t.status==="inprogress"?"EN CURSO":"FIN"}</Chip>
                </div>}
                <div style={{height:2,background:C.surface3,borderRadius:1,marginTop:8}}>
                  <div style={{height:"100%",width:`${(t.players.length/t.maxPlayers)*100}%`,background:`linear-gradient(90deg,${C.cyanBright},${C.cyanDeep})`,borderRadius:1}}/>
                </div>
              </div>
              {champ&&<div style={{flexShrink:0,width:78,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,padding:"4px 0",borderLeft:`0.5px solid ${C.goldBdr}`,marginLeft:4,paddingLeft:10,background:`linear-gradient(90deg,transparent,rgba(201,168,76,0.06))`}}>
                <div style={{position:"relative"}}>
                  <PA photo={champ.photo} avatar={champ.avatar} size={54} border={`2.5px solid ${C.gold}`} animated/>
                  <div style={{position:"absolute",top:-4,right:-4,fontSize:14,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.5))"}}>🏆</div>
                </div>
                <div style={{fontFamily:F.bc,color:C.gold,letterSpacing:"0.18em",textTransform:"uppercase",fontSize:8,textAlign:"center",marginTop:2,fontWeight:700}}>CAMPEÓN</div>
                <div style={{fontFamily:F.bn,fontSize:11,color:C.text,textAlign:"center",lineHeight:1.05,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%"}}>{champ.firstName?.[0]||""}. {champ.lastName||champ.firstName}</div>
              </div>}
            </div>
          </div>;
        });})()}
        <div style={{height:32}}/>
        <TabSpacer/>

        {showCreate&&<Modal onClose={()=>setShowCreate(false)}>
          <T size={24} style={{textAlign:"center",marginBottom:20}}>NUEVO TORNEO</T>
          <div style={{marginBottom:14}}>
            <FL>Imagen del torneo</FL>
            <label htmlFor="newTimg" style={{cursor:"pointer",border:`1px dashed ${C.cyanBdr}`,borderRadius:12,padding:newT.image?0:18,background:C.iosField,textAlign:"center",overflow:"hidden",aspectRatio:newT.image?"16/9":"auto",display:"block"}}>
              {newT.image?<img src={newT.image} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>:<><div style={{fontSize:28,marginBottom:6}}>📷</div><div style={{fontFamily:F.ios,fontSize:13,color:C.muted,fontWeight:500}}>Subir imagen del torneo</div></>}
            </label>
            <input id="newTimg" type="file" accept="image/*" style={{position:"absolute",left:-9999,opacity:0,width:1,height:1}} onChange={e=>handleTImg(e,"new")}/>
            {newT.image&&<button onClick={()=>setNewT({...newT,image:null})} className="btn-press" style={{background:"none",border:"none",color:C.red,fontSize:13,marginTop:8,cursor:"pointer",fontFamily:F.ios,fontWeight:500}}>✕ Quitar imagen</button>}
          </div>
          {[["Nombre","name","text","Monterrey Open"],["Fecha","date","date",""],["Sede","location","text","Club / Dirección"],["Premio","prize","text","$5,000 MXN"]].map(([l,k,t,ph])=><div key={k} style={{marginBottom:14}}><FL>{l}</FL><TI type={t} value={newT[k]} onChange={e=>setNewT({...newT,[k]:e.target.value})} placeholder={ph}/></div>)}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
            <div><FL>Ciudad</FL><TI value={newT.city} onChange={e=>setNewT({...newT,city:e.target.value})} placeholder="Monterrey"/></div>
            <div><FL>País</FL><TI value={newT.country} onChange={e=>setNewT({...newT,country:e.target.value})} placeholder="México"/></div>
          </div>
          <div style={{marginBottom:14}}><FL>Estado</FL><select value={newT.state} onChange={e=>setNewT({...newT,state:e.target.value})} style={{width:"100%",background:C.iosField,border:"none",borderRadius:12,padding:"13px 16px",color:C.text,fontFamily:F.ios,fontSize:16,outline:"none",cursor:"pointer"}}>{MX_STATES.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
          <div style={{marginBottom:14}}><FL>Modalidad</FL><Seg options={[{v:"singles",l:"Singles"},{v:"doubles",l:"Dobles"}]} value={newT.modality} onChange={v=>setNewT({...newT,modality:v})}/></div>
          <div style={{marginBottom:14}}><FL>Edad de jugadores</FL><Seg options={[{v:false,l:"👤 Mayores"},{v:true,l:"🛡️ Menores"}]} value={!!newT.forMinors} onChange={v=>setNewT({...newT,forMinors:v})}/><Sub style={{fontSize:12,marginTop:6}}>Los torneos para menores solo serán visibles para usuarios menores de edad.</Sub></div>
          <div style={{marginBottom:14}}><FL>Categoría del torneo</FL><Seg options={CATS} value={newT.category} onChange={v=>setNewT({...newT,category:v})}/><Sub style={{marginTop:6,fontSize:12}}>Solo jugadores de esta categoría podrán inscribirse</Sub></div>
          <div style={{marginBottom:14}}><FL>Categoría sexo</FL><Seg options={[{v:"M",l:"♂ Masc"},{v:"F",l:"♀ Fem"},{v:"Mixed",l:"⚥ Mix"}]} value={newT.gender} onChange={v=>setNewT({...newT,gender:v})}/></div>
          <div style={{marginBottom:14}}><FL>Superficie</FL><Seg options={["Clay","Hard","Grass","Indoor"]} value={newT.surface} onChange={v=>setNewT({...newT,surface:v})}/></div>
          <div style={{marginBottom:14}}><FL>Formato</FL><Seg options={[{v:"groups+ko",l:"Grupos + Elim."},{v:"ko",l:"Eliminatoria"}]} value={newT.format} onChange={v=>setNewT({...newT,format:v})}/></div>
          <div style={{marginBottom:14}}><FL>Máx jugadores</FL><Seg options={[{v:"4",l:"4"},{v:"8",l:"8"},{v:"16",l:"16"},{v:"32",l:"32"}]} value={newT.maxPlayers} onChange={v=>setNewT({...newT,maxPlayers:v})}/></div>
          <BtnP onClick={createTourney}>CREAR</BtnP><BtnX onClick={()=>setShowCreate(false)}>CANCELAR</BtnX>
        </Modal>}
        {editTourney&&<Modal onClose={()=>setEditTourney(null)}>
          <T size={24} style={{textAlign:"center",marginBottom:20}}>EDITAR TORNEO</T>
          <div style={{marginBottom:14}}>
            <FL>Imagen del torneo</FL>
            <label htmlFor="editTimg" style={{cursor:"pointer",border:`1px dashed ${C.cyanBdr}`,borderRadius:12,padding:editTourney.image?0:18,background:C.iosField,textAlign:"center",overflow:"hidden",aspectRatio:editTourney.image?"16/9":"auto",display:"block"}}>
              {editTourney.image?<img src={editTourney.image} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>:<><div style={{fontSize:28,marginBottom:6}}>📷</div><div style={{fontFamily:F.ios,fontSize:13,color:C.muted,fontWeight:500}}>Subir imagen</div></>}
            </label>
            <input id="editTimg" type="file" accept="image/*" style={{position:"absolute",left:-9999,opacity:0,width:1,height:1}} onChange={e=>handleTImg(e,"edit")}/>
            {editTourney.image&&<button onClick={()=>setEditTourney({...editTourney,image:null})} className="btn-press" style={{background:"none",border:"none",color:C.red,fontSize:13,marginTop:8,cursor:"pointer",fontFamily:F.ios,fontWeight:500}}>✕ Quitar imagen</button>}
          </div>
          {[["Nombre","name","text"],["Fecha","date","date"],["Sede","location","text"],["Premio","prize","text"]].map(([l,k,t])=><div key={k} style={{marginBottom:14}}><FL>{l}</FL><TI type={t} value={editTourney[k]||""} onChange={e=>setEditTourney({...editTourney,[k]:e.target.value})}/></div>)}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
            <div><FL>Ciudad</FL><TI value={editTourney.city||""} onChange={e=>setEditTourney({...editTourney,city:e.target.value})}/></div>
            <div><FL>País</FL><TI value={editTourney.country||""} onChange={e=>setEditTourney({...editTourney,country:e.target.value})}/></div>
          </div>
          <div style={{marginBottom:14}}><FL>Estado</FL><select value={editTourney.state||"Nuevo León"} onChange={e=>setEditTourney({...editTourney,state:e.target.value})} style={{width:"100%",background:C.iosField,border:"none",borderRadius:12,padding:"13px 16px",color:C.text,fontFamily:F.ios,fontSize:16,outline:"none",cursor:"pointer"}}>{MX_STATES.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
          <div style={{marginBottom:14}}><FL>Modalidad</FL><Seg options={[{v:"singles",l:"Singles"},{v:"doubles",l:"Dobles"}]} value={editTourney.modality||"singles"} onChange={v=>setEditTourney({...editTourney,modality:v})}/></div>
          <div style={{marginBottom:14}}><FL>Edad de jugadores</FL><Seg options={[{v:false,l:"👤 Mayores"},{v:true,l:"🛡️ Menores"}]} value={!!editTourney.forMinors} onChange={v=>setEditTourney({...editTourney,forMinors:v})}/></div>
          <div style={{marginBottom:14}}><FL>Categoría del torneo</FL><Seg options={CATS} value={editTourney.category||"B"} onChange={v=>setEditTourney({...editTourney,category:v})}/></div>
          <div style={{marginBottom:14}}><FL>Categoría sexo</FL><Seg options={[{v:"M",l:"♂ Masc"},{v:"F",l:"♀ Fem"},{v:"Mixed",l:"⚥ Mix"}]} value={editTourney.gender||"M"} onChange={v=>setEditTourney({...editTourney,gender:v})}/></div>
          <BtnP onClick={saveTEdit}>GUARDAR</BtnP><BtnX onClick={()=>setEditTourney(null)}>CANCELAR</BtnX>
        </Modal>}
        {deleteTId&&<Modal onClose={()=>setDeleteTId(null)}>
          <div style={{textAlign:"center",marginBottom:20}}><div style={{fontSize:40,marginBottom:12}}>⚠️</div><T size={24}>ELIMINAR TORNEO</T><Sub style={{marginTop:8}}>No se puede deshacer.</Sub></div>
          <button onClick={confDelT} className="btn-press" style={{width:"100%",background:C.red,color:"#fff",border:"none",padding:"15px",fontFamily:F.ios,fontSize:16,fontWeight:600,cursor:"pointer",borderRadius:14}}>SÍ, ELIMINAR</button>
          <BtnX onClick={()=>setDeleteTId(null)}>CANCELAR</BtnX>
        </Modal>}
        {reqTourModal&&<Modal onClose={()=>setReqTourModal(false)}>
          <T size={24} style={{textAlign:"center",marginBottom:8}}>SOLICITAR TORNEO</T>
          <Sub style={{textAlign:"center",marginBottom:18,fontSize:13}}>Envía solicitud al administrador</Sub>
          {[["Nombre del torneo","name","text","Mi Torneo"],["Fecha","date","date",""],["Sede","location","text","Club / dirección"],["Premio","prize","text","$5,000 MXN"]].map(([l,k,t,ph])=><div key={k} style={{marginBottom:14}}><FL>{l}</FL><TI type={t} value={newReqT[k]} onChange={e=>setNewReqT({...newReqT,[k]:e.target.value})} placeholder={ph}/></div>)}
          <div style={{marginBottom:14}}><FL>Superficie</FL><Seg options={["Clay","Hard","Grass","Indoor"]} value={newReqT.surface} onChange={v=>setNewReqT({...newReqT,surface:v})}/></div>
          <div style={{marginBottom:14}}><FL>Modalidad</FL><Seg options={[{v:"singles",l:"Singles"},{v:"doubles",l:"Dobles"}]} value={newReqT.modality} onChange={v=>setNewReqT({...newReqT,modality:v})}/></div>
          <div style={{marginBottom:14}}><FL>Formato de juego</FL><Seg options={[{v:"groups+ko",l:"Grupos + Elim."},{v:"ko",l:"Eliminatoria"}]} value={newReqT.format||"groups+ko"} onChange={v=>setNewReqT({...newReqT,format:v})}/></div>
          <div style={{marginBottom:14}}><FL>Categoría</FL><Seg options={CATS} value={newReqT.category} onChange={v=>setNewReqT({...newReqT,category:v})}/></div>
          <div style={{marginBottom:14}}><FL>Categoría sexo</FL><Seg options={[{v:"M",l:"♂ Masc"},{v:"F",l:"♀ Fem"},{v:"Mixed",l:"⚥ Mix"}]} value={newReqT.gender} onChange={v=>setNewReqT({...newReqT,gender:v})}/></div>
          <BtnP onClick={submitTournamentRequest}>ENVIAR SOLICITUD</BtnP>
          <BtnX onClick={()=>setReqTourModal(false)}>CANCELAR</BtnX>
        </Modal>}
        {mediaUploadModal&&<Modal onClose={()=>setMediaUploadModal(false)}>
          <T size={24} style={{textAlign:"center",marginBottom:8}}>SUBIR MEDIA</T>
          <Sub style={{textAlign:"center",marginBottom:18,fontSize:13}}>Imagen o video. Visible para todos.</Sub>
          <label htmlFor="mediaFileHome" style={{cursor:"pointer",border:`2px dashed ${C.cyanBdr}`,borderRadius:14,padding:36,background:C.iosField,textAlign:"center",display:"block"}}>
            <div style={{fontSize:42,marginBottom:10}}>📤</div>
            <div style={{fontFamily:F.ios,fontSize:15,color:C.text,fontWeight:600}}>Selecciona archivo</div>
            <Sub style={{fontSize:12,marginTop:4}}>JPG, PNG, MP4, MOV</Sub>
          </label>
          <input id="mediaFileHome" type="file" accept="image/*,video/*" style={{position:"absolute",left:-9999,opacity:0,width:1,height:1}} onChange={handleMediaUpload}/>
          <BtnX onClick={()=>setMediaUploadModal(false)}>CANCELAR</BtnX>
        </Modal>}
      </div>
      <ShowTabBar/>
    </div>;
  }

  // ADMIN INBOX
  if(screen==="admin-inbox"&&isAdmin){
    const apr=[],areg=[];
    tournaments.forEach(t=>{t.groups.forEach((g,gi)=>g.matches.forEach(m=>{if(m.pendingResult)apr.push({tid:t.id,kind:"group",gi,ri:null,match:m,tName:t.name,gName:g.name});}));t.rounds.forEach((rnd,ri)=>rnd.forEach(m=>{if(m.pendingResult)apr.push({tid:t.id,kind:"ko",gi:null,ri,match:m,tName:t.name,gName:rLabel(ri,t.rounds.length)});}));t.pendingPlayers.forEach(p=>areg.push({tid:t.id,tName:t.name,player:p}));});
    return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative"}}>
      <style>{STYLE}</style><Aurora intense={0.4}/>
      <div style={{position:"relative",zIndex:1}}>
        <Nav/><Back to="home" label="Home"/>
        <div style={{padding:"14px 18px"}}>
          <T size={32}>BANDEJA</T><Sub style={{marginBottom:18,marginTop:4}}>Aprobaciones pendientes</Sub>
          <SL>Inscripciones pendientes ({areg.length})</SL>
          {areg.length===0?<Sub style={{padding:"14px 0"}}>Sin pendientes.</Sub>:areg.map(({tid,tName,player},i)=><div key={`${tid}-${player.id}`} style={{display:"flex",alignItems:"center",gap:12,padding:12,background:C.surface,border:`0.5px solid ${C.borderS}`,borderRadius:12,marginBottom:8,animation:`slideLeft 0.35s ${i*0.05}s backwards`}}>
            <PA photo={player.photo} avatar={player.avatar} size={42}/>
            <div style={{flex:1}}><div style={{fontFamily:F.ios,fontSize:14,fontWeight:600,color:C.text}}>{player.name}</div><Sub style={{fontSize:12,marginTop:2}}>quiere inscribirse a <span style={{color:C.cyan}}>{tName}</span></Sub></div>
            <button onClick={()=>adminApprove(tid,player.id)} className="btn-press" style={{background:C.green,color:"#fff",border:"none",padding:"8px 14px",borderRadius:10,fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600}}>✓</button>
            <button onClick={()=>adminReject(tid,player.id)} className="btn-press" style={{background:"transparent",color:C.red,border:`1px solid ${C.red}`,padding:"7px 11px",borderRadius:10,fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600}}>✕</button>
          </div>)}
          <div style={{height:24}}/>
          <SL>Resultados pendientes ({apr.length})</SL>
          {apr.length===0?<Sub style={{padding:"14px 0"}}>Sin pendientes.</Sub>:apr.map(({tid,kind,gi,ri,match,tName,gName},i)=><div key={match.id} style={{padding:12,background:C.surface,border:`0.5px solid ${C.borderS}`,borderRadius:12,marginBottom:8,animation:`slideLeft 0.35s ${i*0.05}s backwards`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><div style={{fontFamily:F.bc,fontSize:11,letterSpacing:"0.18em",textTransform:"uppercase",color:C.cyan,fontWeight:600}}>{tName} · {gName}</div><Chip type="amber">PENDIENTE</Chip></div>
            <div style={{display:"flex",gap:8,marginBottom:8}}>
              {[match.p1,match.p2].map((p,pi)=>{const w=match.pendingResult.winner.id===p.id;return <div key={pi} style={{flex:1,display:"flex",alignItems:"center",gap:8,padding:8,background:w?"rgba(52,199,89,0.1)":C.surface2,borderRadius:8,border:`1px solid ${w?"rgba(52,199,89,0.3)":C.borderS}`}}>
                <PA photo={p.photo} avatar={p.avatar} size={28}/>
                <div style={{flex:1,minWidth:0}}><div style={{fontFamily:F.ios,fontSize:13,fontWeight:600,color:w?C.green:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.name}</div><Sub style={{fontSize:11}}>{w?"🏆 Ganador":""}</Sub></div>
                <div style={{fontFamily:F.bn,fontSize:18,color:w?C.cyan:C.muted}}>{match.pendingResult.score.split("-")[pi]}</div>
              </div>;})}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>adminApproveResult(tid,kind,gi,ri,match.id,true)} className="btn-press" style={{flex:1,background:C.green,color:"#fff",border:"none",padding:11,borderRadius:10,fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600}}>✓ APROBAR</button>
              <button onClick={()=>adminApproveResult(tid,kind,gi,ri,match.id,false)} className="btn-press" style={{background:"transparent",color:C.red,border:`1px solid ${C.red}`,padding:"11px 16px",borderRadius:10,fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600}}>✕ RECHAZAR</button>
            </div>
          </div>)}
          <div style={{height:24}}/>
          <SL color={C.amber}>Cambios de categoría ({categoryRequests.filter(r=>r.status==="pending").length})</SL>
          {categoryRequests.filter(r=>r.status==="pending").length===0?<Sub style={{padding:"14px 0"}}>Sin pendientes.</Sub>:categoryRequests.filter(r=>r.status==="pending").map((r,i)=>{const p=accounts.find(a=>a.id===r.playerId);return <div key={r.id} style={{display:"flex",alignItems:"center",gap:12,padding:12,background:C.surface,border:`0.5px solid ${C.borderS}`,borderRadius:12,marginBottom:8}}>
            <PA photo={p?.photo} avatar={p?.avatar||"?"} size={42}/>
            <div style={{flex:1}}>
              <div style={{fontFamily:F.ios,fontSize:14,fontWeight:600,color:C.text}}>{r.playerName}</div>
              <Sub style={{fontSize:12,marginTop:2}}>solicita cambio de categoría: <span style={{color:CAT_C[r.from]}}>{r.from}</span> → <span style={{color:CAT_C[r.to],fontWeight:700}}>{r.to}</span></Sub>
            </div>
            <button onClick={()=>approveCategoryReq(r.id,true)} className="btn-press" style={{background:C.green,color:"#fff",border:"none",padding:"8px 14px",borderRadius:10,fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600}}>✓</button>
            <button onClick={()=>approveCategoryReq(r.id,false)} className="btn-press" style={{background:"transparent",color:C.red,border:`1px solid ${C.red}`,padding:"7px 11px",borderRadius:10,fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600}}>✕</button>
          </div>;})}
          <div style={{height:24}}/>
          <SL color={C.cyan}>Solicitudes de torneo ({tournamentRequests.filter(r=>r.status==="pending").length})</SL>
          {tournamentRequests.filter(r=>r.status==="pending").length===0?<Sub style={{padding:"14px 0"}}>Sin pendientes.</Sub>:tournamentRequests.filter(r=>r.status==="pending").map(r=>{const p=accounts.find(a=>a.id===r.playerId);return <div key={r.id} style={{padding:14,background:C.surface,border:`0.5px solid ${C.borderS}`,borderRadius:12,marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <PA photo={p?.photo} avatar={p?.avatar||"?"} size={36}/>
              <div style={{flex:1}}><div style={{fontFamily:F.ios,fontSize:13,fontWeight:600,color:C.text}}>{r.playerName}</div><Sub style={{fontSize:11}}>quiere crear un torneo</Sub></div>
            </div>
            <div style={{background:C.surface2,padding:12,borderRadius:8,marginBottom:10}}>
              <div style={{fontFamily:F.bn,fontSize:18,color:C.cyan,marginBottom:6}}>{r.name}</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:4}}><Chip>{r.date||"sin fecha"}</Chip><Chip type="cyan">{r.surface}</Chip><Chip>CAT {r.category}</Chip><Chip type="gold">{r.prize||"TBD"}</Chip></div>
              <Sub style={{fontSize:11,marginTop:4}}>{r.location||"—"} · {r.modality} · {r.gender==="F"?"♀":r.gender==="Mixed"?"⚥":"♂"}</Sub>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>{const n=parseInt(prompt(`¿Cuántos torneos puede crear ${r.playerName} en total?`,"1"));if(n&&n>0)approveTournamentReq(r.id,n);}} className="btn-press" style={{flex:1,background:C.green,color:"#fff",border:"none",padding:11,borderRadius:10,fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600}}>✓ APROBAR</button>
              <button onClick={()=>rejectTournamentReq(r.id)} className="btn-press" style={{background:"transparent",color:C.red,border:`1px solid ${C.red}`,padding:"11px 16px",borderRadius:10,fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600}}>✕ RECHAZAR</button>
            </div>
          </div>;})}
          <div style={{height:24}}/>
          <SL color={C.green}>Modificación de stats ({statRequests.filter(r=>r.status==="pending").length})</SL>
          {statRequests.filter(r=>r.status==="pending").length===0?<Sub style={{padding:"14px 0"}}>Sin pendientes.</Sub>:statRequests.filter(r=>r.status==="pending").map(r=>{const p=accounts.find(a=>a.id===r.playerId);const labels={wins:"Victorias",losses:"Derrotas",titles:"Títulos",points:"Puntos",setsDropped:"Sets perdidos",gamesLost:"Juegos perdidos",aces:"Aces",doubleFaults:"Dobles faltas",bpWon:"BP ganados",bpTotal:"BP totales",winners:"Winners",unforcedErrors:"Err. no forzados"};return <div key={r.id} style={{padding:14,background:C.surface,border:`0.5px solid ${C.borderS}`,borderRadius:12,marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <PA photo={p?.photo} avatar={p?.avatar||"?"} size={36}/>
              <div style={{flex:1}}><div style={{fontFamily:F.ios,fontSize:13,fontWeight:600,color:C.text}}>{r.playerName}</div><Sub style={{fontSize:11}}>solicita modificar su resumen de temporada</Sub></div>
            </div>
            <div style={{background:C.surface2,padding:12,borderRadius:8,marginBottom:10}}>
              {Object.entries(r.changes).map(([k,v])=>{const isPositive=v.to>v.from;const diff=v.to-v.from;const maxBar=Math.max(Math.abs(v.from),Math.abs(v.to),1);return <div key={k} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <div style={{fontFamily:F.bc,fontSize:11,letterSpacing:"0.15em",color:C.muted,textTransform:"uppercase",fontWeight:600}}>{labels[k]||k}</div>
                  <div style={{fontFamily:F.ios,fontSize:12,color:isPositive?C.green:C.red,fontWeight:600}}>{isPositive?"+":""}{diff}</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{fontFamily:F.bn,fontSize:18,color:C.muted,width:48,textAlign:"right"}}>{v.from}</div>
                  <div style={{flex:1,height:8,background:C.surface3,borderRadius:4,position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${(v.from/maxBar)*50}%`,background:C.muted,borderRadius:4}}/>
                    <div style={{position:"absolute",left:"50%",top:0,height:"100%",width:`${(v.to/maxBar)*50}%`,background:isPositive?C.green:C.red,borderRadius:4}}/>
                    <div style={{position:"absolute",left:"50%",top:-2,bottom:-2,width:1,background:C.text}}/>
                  </div>
                  <div style={{fontFamily:F.bn,fontSize:18,color:isPositive?C.green:C.red,width:48}}>{v.to}</div>
                </div>
              </div>;})}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>approveStatReq(r.id,true)} className="btn-press" style={{flex:1,background:C.green,color:"#fff",border:"none",padding:11,borderRadius:10,fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600}}>✓ APROBAR</button>
              <button onClick={()=>approveStatReq(r.id,false)} className="btn-press" style={{background:"transparent",color:C.red,border:`1px solid ${C.red}`,padding:"11px 16px",borderRadius:10,fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600}}>✕ RECHAZAR</button>
            </div>
          </div>;})}
          <div style={{height:24}}/>
          <SL color={C.cyan}>Datos SwingVision ({svRequests.filter(r=>r.status==="pending").length})</SL>
          {svRequests.filter(r=>r.status==="pending").length===0?<Sub style={{padding:"14px 0"}}>Sin pendientes.</Sub>:svRequests.filter(r=>r.status==="pending").map(r=>{const labels={serve:"Servicio",return:"Resto",forehand:"Derecha",backhand:"Revés"};return <div key={r.id} style={{padding:14,background:C.surface,border:`0.5px solid ${C.borderS}`,borderRadius:12,marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <PA photo={r.playerPhoto} avatar={r.playerAvatar} size={40}/>
              <div style={{flex:1}}><div style={{fontFamily:F.ios,fontSize:13,fontWeight:600,color:C.text}}>{r.playerName}</div><Sub style={{fontSize:11}}>solicita publicar datos de SwingVision</Sub></div>
            </div>
            <div onClick={()=>setViewSvImg(r.image)} style={{cursor:"pointer",borderRadius:10,overflow:"hidden",border:`1px solid ${C.cyanBdr}`,marginBottom:12,background:"#000"}}>
              <img src={r.image} style={{width:"100%",maxHeight:300,objectFit:"contain",display:"block"}} alt=""/>
              <div style={{padding:"6px 10px",background:"rgba(0,0,0,0.7)",fontFamily:F.bc,fontSize:10,letterSpacing:"0.16em",color:C.cyan,fontWeight:600}}>📸 SCREENSHOT SWINGVISION · TOCA PARA AMPLIAR</div>
            </div>
            <div style={{background:C.surface2,padding:12,borderRadius:8,marginBottom:10}}>
              <div style={{fontFamily:F.bc,fontSize:11,letterSpacing:"0.18em",color:C.muted,marginBottom:8,fontWeight:600}}>VALORES PROPUESTOS</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {Object.entries(r.values).map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 10px",background:C.surface3,borderRadius:8}}>
                  <div style={{fontFamily:F.bc,fontSize:11,letterSpacing:"0.14em",color:C.muted,fontWeight:600}}>{labels[k]?.toUpperCase()}</div>
                  <div style={{fontFamily:F.bn,fontSize:22,color:C.cyan}}>{parseFloat(v).toFixed(1)}</div>
                </div>)}
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>approveSvReq(r.id,true)} className="btn-press" style={{flex:1,background:C.green,color:"#fff",border:"none",padding:11,borderRadius:10,fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600}}>✓ APROBAR</button>
              <button onClick={()=>approveSvReq(r.id,false)} className="btn-press" style={{background:"transparent",color:C.red,border:`1px solid ${C.red}`,padding:"11px 16px",borderRadius:10,fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600}}>✕ RECHAZAR</button>
            </div>
          </div>;})}
          <div style={{height:24}}/>
          <SL color={C.amber}>Posts en MEDIA ({mediaRequests.filter(r=>r.status==="pending").length})</SL>
          {mediaRequests.filter(r=>r.status==="pending").length===0?<Sub style={{padding:"14px 0"}}>Sin pendientes.</Sub>:mediaRequests.filter(r=>r.status==="pending").map(r=><div key={r.id} style={{padding:14,background:C.surface,border:`0.5px solid ${C.borderS}`,borderRadius:12,marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <PA photo={r.playerPhoto} avatar={r.playerAvatar} size={40}/>
              <div style={{flex:1}}><div style={{fontFamily:F.ios,fontSize:13,fontWeight:600,color:C.text}}>{r.playerName}</div><Sub style={{fontSize:11}}>quiere publicar {r.type==="video"?"un video":"una imagen"} en MEDIA</Sub></div>
              <Chip type="amber">PENDIENTE</Chip>
            </div>
            <div onClick={()=>setPreviewMediaReq(r)} style={{cursor:"pointer",borderRadius:10,overflow:"hidden",border:`1px solid ${C.cyanBdr}`,marginBottom:r.caption?10:12,background:"#000",aspectRatio:"16/10"}}>
              {r.type==="image"?<img src={r.url} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>:<video src={r.url} style={{width:"100%",height:"100%",objectFit:"cover"}}/>}
              <div style={{position:"relative",marginTop:-30,padding:"6px 10px",background:"linear-gradient(transparent,rgba(0,0,0,0.8))",fontFamily:F.bc,fontSize:10,letterSpacing:"0.16em",color:C.cyan,fontWeight:600,zIndex:2}}>{r.type==="video"?"🎥":"📷"} TOCA PARA REVISAR EN GRANDE</div>
            </div>
            {r.caption&&<div style={{padding:"10px 12px",background:C.surface2,borderRadius:8,marginBottom:12,fontFamily:F.ios,fontSize:13,color:C.text,fontStyle:"italic"}}>"{r.caption}"</div>}
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>approveMediaReq(r.id,true)} className="btn-press" style={{flex:1,background:C.green,color:"#fff",border:"none",padding:11,borderRadius:10,fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600}}>✓ APROBAR</button>
              <button onClick={()=>approveMediaReq(r.id,false)} className="btn-press" style={{background:"transparent",color:C.red,border:`1px solid ${C.red}`,padding:"11px 16px",borderRadius:10,fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600}}>✕ RECHAZAR</button>
            </div>
          </div>)}
          <div style={{height:24}}/>
          <SL color="#A78BFA">Solicitudes COACH ({coachApplications.filter(r=>r.status==="pending").length})</SL>
          {coachApplications.filter(r=>r.status==="pending").length===0?<Sub style={{padding:"14px 0"}}>Sin pendientes.</Sub>:coachApplications.filter(r=>r.status==="pending").map(r=><div key={r.id} style={{padding:14,background:`linear-gradient(135deg,rgba(167,139,250,0.10),${C.surface})`,border:`1px solid rgba(167,139,250,0.35)`,borderRadius:14,marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <PA photo={r.playerPhoto} avatar={r.playerAvatar} size={44}/>
              <div style={{flex:1}}><div style={{fontFamily:F.ios,fontSize:14,fontWeight:600,color:C.text}}>{r.playerName}</div><Sub style={{fontSize:11}}>quiere publicarse como COACH · {r.playerCity}</Sub></div>
              <div style={{background:"rgba(167,139,250,0.18)",border:"1px solid rgba(167,139,250,0.4)",padding:"4px 10px",borderRadius:8,fontFamily:F.bc,fontSize:10,letterSpacing:"0.16em",color:"#A78BFA",fontWeight:700}}>${r.hourlyRate}/HR</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
              <div style={{padding:"8px 10px",background:C.surface2,borderRadius:8}}><div style={{fontFamily:F.bc,fontSize:9,letterSpacing:"0.2em",color:C.muted,fontWeight:600}}>EXPERIENCIA</div><div style={{fontFamily:F.ios,fontSize:13,color:C.text,fontWeight:600,marginTop:2}}>{r.experience}</div></div>
              <div style={{padding:"8px 10px",background:C.surface2,borderRadius:8}}><div style={{fontFamily:F.bc,fontSize:9,letterSpacing:"0.2em",color:C.muted,fontWeight:600}}>CATEGORÍA</div><div style={{fontFamily:F.ios,fontSize:13,color:C.text,fontWeight:600,marginTop:2}}>{r.playerCategory||"—"} · {r.playerSex==="F"?"♀":"♂"}</div></div>
            </div>
            <div style={{padding:"10px 12px",background:C.surface2,borderRadius:8,marginBottom:10}}>
              <div style={{fontFamily:F.bc,fontSize:9,letterSpacing:"0.2em",color:C.muted,fontWeight:600,marginBottom:6}}>ESPECIALIDADES</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>{r.specialties.map(s=><span key={s} style={{fontFamily:F.ios,fontSize:11,padding:"3px 8px",borderRadius:8,background:"rgba(167,139,250,0.15)",color:"#C4B5FD",border:"1px solid rgba(167,139,250,0.3)",fontWeight:500}}>{s}</span>)}</div>
            </div>
            <div style={{padding:"10px 12px",background:C.surface2,borderRadius:8,marginBottom:12,fontFamily:F.ios,fontSize:13,color:C.text,fontStyle:"italic",lineHeight:1.5}}>"{r.bio}"</div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>approveCoachApp(r.id,true)} className="btn-press" style={{flex:1,background:C.green,color:"#fff",border:"none",padding:11,borderRadius:10,fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600}}>✓ APROBAR COACH</button>
              <button onClick={()=>approveCoachApp(r.id,false)} className="btn-press" style={{background:"transparent",color:C.red,border:`1px solid ${C.red}`,padding:"11px 16px",borderRadius:10,fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600}}>✕ RECHAZAR</button>
            </div>
          </div>)}
          <div style={{height:24}}/>
          <SL color="#FF9F0A">Recuperación de contraseña ({passwordResetRequests.filter(r=>r.status==="pending").length})</SL>
          {passwordResetRequests.filter(r=>r.status==="pending").length===0?<Sub style={{padding:"14px 0"}}>Sin pendientes.</Sub>:passwordResetRequests.filter(r=>r.status==="pending").map(r=><div key={r.id} style={{padding:14,background:`linear-gradient(135deg,rgba(255,159,10,0.10),${C.surface})`,border:`1px solid rgba(255,159,10,0.35)`,borderRadius:14,marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <PA photo={r.playerPhoto} avatar={r.playerAvatar} size={42}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:F.ios,fontSize:14,fontWeight:600,color:C.text}}>{r.name}</div>
                <Sub style={{fontSize:11,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.email}</Sub>
                <Sub style={{fontSize:10,marginTop:2,color:C.amber}}>Solicita reset de contraseña · hace {Math.max(0,Math.floor((Date.now()-r.time)/60000))} min</Sub>
              </div>
              <div style={{background:"rgba(255,159,10,0.18)",border:"1px solid rgba(255,159,10,0.4)",padding:"4px 10px",borderRadius:8,fontFamily:F.bc,fontSize:9,letterSpacing:"0.18em",color:C.amber,fontWeight:700}}>🔑 RESET</div>
            </div>
            <div style={{padding:"10px 12px",background:C.surface2,borderRadius:10,marginBottom:12}}>
              <Sub style={{fontSize:11,lineHeight:1.5}}>Al aprobar, la app genera una contraseña temporal segura, la asigna al jugador y se la mostrará en pantalla para que tú la envíes por correo o WhatsApp. El jugador deberá cambiarla al iniciar sesión.</Sub>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>approveResetRequest(r.id,true)} className="btn-press" style={{flex:1,background:C.green,color:"#fff",border:"none",padding:11,borderRadius:10,fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600}}>✓ APROBAR Y GENERAR</button>
              <button onClick={()=>approveResetRequest(r.id,false)} className="btn-press" style={{background:"transparent",color:C.red,border:`1px solid ${C.red}`,padding:"11px 16px",borderRadius:10,fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600}}>✕ RECHAZAR</button>
            </div>
          </div>)}
          <div style={{height:32}}/>
        </div>
        {viewSvImg&&<div onClick={()=>setViewSvImg(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.95)",zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",padding:20}}><img src={viewSvImg} style={{maxWidth:"100%",maxHeight:"100%",objectFit:"contain"}} alt=""/></div>}
        {tempPassDisplay&&<Modal onClose={()=>setTempPassDisplay(null)} center>
          <div style={{textAlign:"center",marginBottom:18}}>
            <div style={{fontSize:48,marginBottom:10}}>🔑</div>
            <T size={22}>CONTRASEÑA TEMPORAL GENERADA</T>
            <Sub style={{marginTop:8,fontSize:13,lineHeight:1.5}}>Envía esta contraseña a <b style={{color:C.cyan}}>{tempPassDisplay.playerName}</b> por correo o WhatsApp. Tendrá que cambiarla al iniciar sesión.</Sub>
          </div>
          <div style={{background:`linear-gradient(135deg,${C.cyanDim},rgba(2,136,209,0.05))`,border:`1.5px solid ${C.cyan}`,borderRadius:14,padding:18,marginBottom:14}}>
            <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.22em",color:C.muted,fontWeight:600,marginBottom:8,textAlign:"center"}}>CONTRASEÑA TEMPORAL</div>
            <div style={{fontFamily:F.bn,fontSize:32,color:C.cyan,letterSpacing:"0.12em",textAlign:"center",userSelect:"all",cursor:"text"}}>{tempPassDisplay.tempPass}</div>
          </div>
          <div style={{background:C.surface2,borderRadius:10,padding:12,marginBottom:14}}>
            <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.20em",color:C.muted,fontWeight:600,marginBottom:4}}>EMAIL DEL JUGADOR</div>
            <div style={{fontFamily:F.ios,fontSize:14,color:C.text,fontWeight:600,wordBreak:"break-all"}}>{tempPassDisplay.playerEmail}</div>
          </div>
          <button onClick={()=>{
            const txt=`Hola ${tempPassDisplay.playerName.split(" ")[0]},\n\nTu contraseña temporal para Sociedad Mexicana de Tenis es:\n\n${tempPassDisplay.tempPass}\n\nÚsala para iniciar sesión y cámbiala desde tu perfil.\n\nSMT — smt.tennismx@gmail.com`;
            if(navigator.clipboard){navigator.clipboard.writeText(txt).then(()=>alert("✓ Mensaje copiado. Ahora pégalo en correo o WhatsApp del jugador."));}else{alert(txt);}
          }} className="btn-press" style={{width:"100%",background:`linear-gradient(135deg,${C.cyanBright},${C.cyanDeep})`,color:"#fff",border:"none",padding:14,fontFamily:F.ios,fontSize:14,fontWeight:600,cursor:"pointer",borderRadius:14,marginBottom:8}}>📋 COPIAR MENSAJE COMPLETO</button>
          <button onClick={()=>setTempPassDisplay(null)} className="btn-press" style={{width:"100%",background:"rgba(118,118,128,0.16)",border:"none",color:C.text,padding:14,fontFamily:F.ios,fontSize:14,fontWeight:500,cursor:"pointer",borderRadius:14}}>CERRAR</button>
        </Modal>}
      </div>
    </div>;
  }

  // ADMIN SETTINGS
  if(screen==="admin-settings"&&isAdmin){
    return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative"}}>
      <style>{STYLE}</style><Aurora intense={0.4}/>
      <div style={{position:"relative",zIndex:1}}>
        <Nav/><Back to="home" label="Home"/>
        <div style={{padding:"14px 18px"}}>
          <T size={32}>AJUSTES</T><Sub style={{marginBottom:24,marginTop:4}}>Cuenta administrador</Sub>
          <div style={{background:C.surface,padding:18,borderRadius:14,border:`0.5px solid ${C.borderS}`,marginBottom:14}}>
            <SL>Seguridad</SL>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0"}}><Sub style={{fontSize:14,color:C.text,fontWeight:500}}>Contraseña</Sub><BtnG onClick={()=>setShowChangePass(true)}>CAMBIAR</BtnG></div>
          </div>
          <div style={{background:C.surface,padding:18,borderRadius:14,border:`0.5px solid ${C.borderS}`}}>
            <SL>Sesión</SL><BtnG onClick={doLogout} style={{width:"100%",padding:13}}>↩ CERRAR SESIÓN</BtnG>
          </div>
        </div>
        {showChangePass&&<Modal onClose={()=>setShowChangePass(false)}>
          <T size={24} style={{textAlign:"center",marginBottom:20}}>CAMBIAR CONTRASEÑA</T>
          <FL>Contraseña actual</FL><TI type="password" value={passForm.old} onChange={e=>setPassForm({...passForm,old:e.target.value})}/>
          <div style={{height:14}}/><FL>Nueva contraseña (mín 6)</FL><TI type="password" value={passForm.new} onChange={e=>setPassForm({...passForm,new:e.target.value})}/>
          <BtnP onClick={changePassword}>ACTUALIZAR</BtnP><BtnX onClick={()=>{setShowChangePass(false);setPassForm({old:"",new:""});}}>CANCELAR</BtnX>
        </Modal>}
      </div>
    </div>;
  }

  // TOURNAMENT
  if(screen==="tournament"){
    const t=getT();if(!t)return null;
    const isReg=!isAdmin&&t.players.find(p=>p.id===user?.id);
    const isPending=!isAdmin&&t.pendingPlayers.find(p=>p.id===user?.id);
    const isFull=t.players.length+t.pendingPlayers.length>=t.maxPlayers;
    const sc=SURF_C[t.surface]||C.muted;
    const champ=getChamp(t);
    const allGD=t.format==="groups+ko"&&t.groups.length>0&&t.groups.every(g=>g.matches.every(m=>m.status==="done"));
    const avAccts=accounts.filter(a=>!t.players.find(p=>p.id===a.id)&&!t.pendingPlayers.find(p=>p.id===a.id)&&a.name.toLowerCase().includes(addSearch.toLowerCase())&&(!t.gender||t.gender==="Mixed"||!a.sex||a.sex===t.gender));
    return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative"}}>
      <style>{STYLE}</style><Aurora intense={0.4}/>
      {showIntro&&t.players.length>0&&<TIntro tourney={t} onDone={()=>setShowIntro(false)}/>}
      {champion&&<ChampScreen champion={champion.champion} tourney={champion.tourney} onClose={()=>setChampion(null)}/>}
      <div style={{position:"relative",zIndex:1}}>
        <Nav/>
        <button onClick={()=>{setScreen("home");setSelT(null);setShowIntro(false);}} className="btn-press" style={{background:"none",border:"none",color:C.cyan,fontFamily:F.ios,fontSize:15,fontWeight:500,cursor:"pointer",padding:"14px 16px 0"}}>← Torneos</button>
        <div style={{padding:"14px 18px 18px",borderBottom:`0.5px solid ${C.borderS}`,animation:"slideUp 0.4s",display:"flex",gap:14,alignItems:"flex-start"}}>
          <div style={{width:96,height:128,flexShrink:0,borderRadius:12,overflow:"hidden",border:`1px solid ${C.cyanBdr}`,background:t.image?"transparent":`linear-gradient(135deg,${C.surface2},${C.surface3})`}}>
            {t.image?<img src={t.image} style={{width:"100%",height:"100%",objectFit:"cover",animation:"breathing 6s infinite"}} alt=""/>:<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}><Logo size={56}/></div>}
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:F.bc,color:sc,textTransform:"uppercase",letterSpacing:"0.24em",marginBottom:4,fontSize:11,fontWeight:600}}>{t.surface} · {t.modality==="doubles"?"DOBLES":"SINGLES"} {t.gender==="F"?"♀":t.gender==="Mixed"?"⚥":"♂"}</div>
            <T size={30}>{t.name}</T>
            <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}><Chip>{t.date}</Chip><Chip type="gold">{t.prize}</Chip></div>
            <Sub style={{marginTop:6,fontSize:12}}>{t.location}</Sub>
          </div>
        </div>
        <div style={{padding:"14px 18px",display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
          {!isAdmin&&!isReg&&!isPending&&t.status==="open"&&!isFull&&<BtnG onClick={()=>reqReg(t.id)} style={{flex:1,padding:12}}>SOLICITAR INSCRIPCIÓN</BtnG>}
          {!isAdmin&&isPending&&<Chip type="amber">⏳ ESPERANDO APROBACIÓN</Chip>}
          {!isAdmin&&isReg&&<span style={{fontFamily:F.ios,fontSize:13,color:C.green,fontWeight:600}}>✓ Inscrito</span>}
          {isAdmin&&t.status==="open"&&<BtnG onClick={()=>{setAddPlayerModal({tid:t.id});setAddSearch("");}} style={{flex:1,padding:12,background:C.cyanDim}}>+ AGREGAR JUGADOR</BtnG>}
          {isAdmin&&t.status==="open"&&t.players.length>=2&&<BtnG onClick={()=>generateDraw(t.id)} style={{flex:1,padding:12,background:C.cyanDim}}>{t.format==="groups+ko"?"⚡ INICIAR GRUPOS":"⚡ GENERAR DRAW"}</BtnG>}
          {isAdmin&&t.status==="groups"&&allGD&&<BtnG onClick={()=>generateKO(t.id)} style={{flex:1,padding:12,background:C.cyanDim,borderColor:C.cyan}}>⚡ GENERAR ELIMINATORIA</BtnG>}
          {isFull&&!isReg&&!isPending&&!isAdmin&&<Chip type="red">TORNEO LLENO</Chip>}
        </div>
        {champ&&<div onClick={()=>setChampion({champion:champ,tourney:t})} style={{background:`linear-gradient(135deg,${C.goldDim},transparent 60%)`,border:`1px solid ${C.goldBdr}`,borderRadius:12,padding:"14px 18px",margin:"8px 18px 14px",display:"flex",alignItems:"center",gap:14,animation:"scaleIn 0.5s",cursor:"pointer"}}>
          <PA photo={champ.photo} avatar={champ.avatar} size={56} border={`2px solid ${C.gold}`} animated/>
          <div><div style={{fontFamily:F.bc,color:C.gold,textTransform:"uppercase",letterSpacing:"0.22em",marginBottom:4,fontSize:11,fontWeight:600}}>🏆 Campeón · Toca para celebrar</div><T size={26}>{champ.name}</T></div>
        </div>}
        <div style={{display:"flex",borderBottom:`0.5px solid ${C.borderS}`,padding:"0 18px",overflowX:"auto"}}>
          {[t.format==="groups+ko"&&t.groups.length>0?["groups","GRUPOS"]:null,["draw",t.format==="groups+ko"?"ELIMINATORIA":"DRAW"],["players","JUGADORES"],["info","INFO"]].filter(Boolean).map(([k,l])=><button key={k} className="btn-press" style={{fontFamily:F.bc,fontSize:12,letterSpacing:"0.2em",textTransform:"uppercase",padding:"14px 16px 12px",cursor:"pointer",color:tab===k?C.cyan:C.muted,background:"none",border:"none",borderBottom:tab===k?`2px solid ${C.cyan}`:"2px solid transparent",whiteSpace:"nowrap",fontWeight:600}} onClick={()=>setTab(k)}>{l}</button>)}
        </div>

        {tab==="groups"&&t.groups.length>0&&<div style={{padding:"14px 18px"}}>
          {t.groups.map((g,gi)=>{
            const st=getStandings(g);
            return <div key={g.id} style={{marginBottom:24,background:C.surface,border:`0.5px solid ${C.borderS}`,borderRadius:14,overflow:"hidden",animation:`slideUp 0.4s ${gi*0.1}s backwards`}}>
              <div style={{padding:"12px 16px",background:C.surface2}}><T size={20}>{g.name}</T></div>
              <div style={{padding:"10px 16px",borderBottom:`0.5px solid ${C.borderS}`}}>
                <SL>Posiciones</SL>
                {st.map((s,si)=><div key={s.player.id} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:si<st.length-1?`0.5px solid ${C.borderS}`:"none"}}>
                  <div style={{width:20,fontFamily:F.bn,fontSize:14,color:si<2?C.cyan:C.muted}}>{si+1}</div>
                  <PA photo={s.player.photo} avatar={s.player.avatar} size={26}/>
                  <div style={{flex:1,fontFamily:F.ios,fontSize:14,fontWeight:500,color:C.text}}>{s.player.name}</div>
                  <div style={{fontFamily:F.ios,fontSize:14,color:C.text,fontWeight:600}}>{s.wins}-{s.losses}</div>
                  {si<2&&<Chip type="cyan" style={{fontSize:8,padding:"2px 6px"}}>CLASIFICA</Chip>}
                </div>)}
              </div>
              <div style={{padding:"10px 16px"}}>
                <SL>Partidos</SL>
                {g.matches.map(match=>{
                  const click=match.status==="pending"&&canEdit(match);
                  const isDone=match.status==="done";
                  return <div key={match.id} onClick={()=>{if(click){setSubData({tid:t.id,kind:"group",gi,match});setSubStep("pick");setPicked(null);}}} style={{padding:10,background:C.surface2,borderRadius:10,marginBottom:6,cursor:click?"pointer":"default",border:`1px solid ${match.pendingResult?C.amber:click?C.cyanBdr:isDone?"rgba(52,199,89,0.3)":"transparent"}`}}>
                    {match.pendingResult&&<div style={{fontFamily:F.bc,fontSize:9,color:C.amber,letterSpacing:"0.18em",marginBottom:6,textTransform:"uppercase",fontWeight:600}}>⏳ Pendiente aprobación</div>}
                    {[match.p1,match.p2].map((p,pi)=>{const w=match.winner&&p&&match.winner.id===p.id;return <div key={pi} style={{display:"flex",alignItems:"center",gap:8,padding:"4px 0"}}>
                      <PA photo={p.photo} avatar={p.avatar} size={22}/>
                      <span style={{flex:1,fontFamily:F.ios,fontSize:13,color:w?C.green:C.text,fontWeight:w?600:500}}>{p.name}</span>
                      {match.score&&match.score!=="BYE"&&<span style={{fontFamily:F.bn,fontSize:14,color:w?C.cyan:C.muted}}>{match.score.split("-")[pi]}</span>}
                    </div>;})}
                    {match.detailedScore&&<div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.18em",color:C.muted,marginTop:6,paddingTop:6,borderTop:`0.5px solid ${C.borderS}`,fontWeight:600}}>📊 {match.detailedScore}</div>}
                  </div>;
                })}
              </div>
            </div>;
          })}
        </div>}

        {tab==="draw"&&(t.rounds.length===0?<div style={{padding:"48px 0",textAlign:"center"}}><div style={{fontSize:42,marginBottom:14}}>🎾</div><Sub style={{lineHeight:1.7,fontSize:14}}>{t.format==="groups+ko"&&t.status==="groups"?"Completa la fase de grupos primero.":t.players.length<2?`Mínimo 2 jugadores. (${t.players.length} inscrito${t.players.length!==1?"s":""})`:isAdmin?"Presiona GENERAR DRAW.":"Esperando que el admin genere el draw."}</Sub></div>:<Bracket rounds={t.rounds} canEdit={canEdit} onMatchClick={(match,ri)=>{setSubData({tid:t.id,kind:"ko",ri,match});setSubStep("pick");setPicked(null);}}/>)}

        {tab==="players"&&<div style={{padding:"14px 18px"}}>
          {t.players.length===0&&t.pendingPlayers.length===0?<div style={{padding:"40px 0",textAlign:"center"}}><Sub>Sin jugadores inscritos.</Sub></div>:<>
            {t.pendingPlayers.length>0&&isAdmin&&<>
              <SL color={C.amber}>Pendientes ({t.pendingPlayers.length})</SL>
              {t.pendingPlayers.map(p=><div key={p.id} style={{display:"flex",alignItems:"center",gap:12,padding:12,background:C.surface,border:`1px solid rgba(255,159,10,0.2)`,borderRadius:10,marginBottom:8}}>
                <PA photo={p.photo} avatar={p.avatar} size={36}/>
                <div style={{flex:1}}><div style={{fontFamily:F.ios,fontSize:13,fontWeight:600,color:C.text}}>{p.name}</div><Sub style={{fontSize:11}}>{p.email}</Sub></div>
                <button onClick={()=>adminApprove(t.id,p.id)} className="btn-press" style={{background:C.green,color:"#fff",border:"none",padding:"6px 11px",borderRadius:8,fontFamily:F.ios,fontSize:12,cursor:"pointer",fontWeight:600}}>✓</button>
                <button onClick={()=>adminReject(t.id,p.id)} className="btn-press" style={{background:"transparent",color:C.red,border:`1px solid ${C.red}`,padding:"5px 9px",borderRadius:8,fontFamily:F.ios,fontSize:12,cursor:"pointer",fontWeight:600}}>✕</button>
              </div>)}
              <div style={{height:14}}/>
            </>}
            <SL>Inscritos ({t.players.length})</SL>
            {t.players.map((p,i)=><div key={p.id} className="tap-row" style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:`0.5px solid ${C.borderS}`,animation:`slideLeft 0.35s ${i*0.04}s backwards`,cursor:"pointer"}} onClick={()=>{setViewP(p);setScreen("player-card");}}>
              <PA photo={p.photo} avatar={p.avatar} size={42} animated/>
              <div style={{flex:1}}><div style={{fontFamily:F.ios,fontSize:15,fontWeight:600,color:C.text}}>{p.name}</div><Sub style={{marginTop:2,fontSize:12}}>{p.points} pts · {p.wins}W-{p.losses}L · {p.sex==="F"?"♀":"♂"}</Sub></div>
              <div style={{textAlign:"right"}}><div style={{fontFamily:F.bn,fontSize:20,color:C.cyan}}>#{i+1}</div><div style={{fontFamily:F.bc,textTransform:"uppercase",letterSpacing:"0.14em",fontSize:10,color:C.muted,fontWeight:600}}>seed</div></div>
              {isAdmin&&<button onClick={(e)=>{e.stopPropagation();adminRemove(t.id,p.id);}} className="btn-press" style={{background:"transparent",color:C.red,border:`1px solid rgba(255,59,48,0.4)`,padding:"5px 9px",borderRadius:8,fontFamily:F.ios,fontSize:11,cursor:"pointer",fontWeight:600}}>✕</button>}
            </div>)}
          </>}
        </div>}

        {tab==="info"&&<div style={{padding:"14px 18px"}}>
          <Row label="Torneo" val={t.name}/><Row label="Fecha" val={t.date}/><Row label="Superficie" val={t.surface}/>
          <Row label="Modalidad" val={t.modality==="doubles"?"Dobles":"Singles"}/>
          <Row label="Categoría" val={t.gender==="F"?"♀ Femenino":t.gender==="Mixed"?"⚥ Mixto":"♂ Masculino"}/>
          <Row label="Sede" val={t.location}/><Row label="Premio" val={t.prize}/>
          <Row label="Formato" val={t.format==="groups+ko"?"Round Robin + Eliminatoria":"Eliminatoria directa"}/>
          <Row label="Jugadores" val={`${t.players.length}/${t.maxPlayers}`}/>
          <Row label="Estado" val={t.status==="open"?"Abierto":t.status==="groups"?"Fase de grupos":t.status==="inprogress"?"En curso":"Completado"}/>
        </div>}

        {addPlayerModal&&<Modal onClose={()=>setAddPlayerModal(null)}>
          <T size={24} style={{textAlign:"center",marginBottom:8}}>AGREGAR JUGADOR</T>
          <Sub style={{textAlign:"center",marginBottom:18,fontSize:13}}>Sin inscripción previa requerida{t.gender!=="Mixed"&&` (solo ${t.gender==="F"?"♀ femenino":"♂ masculino"})`}</Sub>
          <FL>Buscar jugador</FL>
          <TI value={addSearch} onChange={e=>setAddSearch(e.target.value)} placeholder="Nombre del jugador..." autoFocus/>
          <div style={{maxHeight:340,overflowY:"auto",marginTop:14,marginBottom:8}}>
            {avAccts.length===0?<Sub style={{textAlign:"center",padding:"24px 0"}}>{addSearch?"Sin resultados":"Sin jugadores disponibles"}</Sub>:avAccts.map(a=><div key={a.id} onClick={()=>{adminAdd(addPlayerModal.tid,a.id);setAddPlayerModal(null);}} className="tap-row" style={{display:"flex",alignItems:"center",gap:12,padding:10,background:C.surface2,border:`0.5px solid ${C.borderS}`,borderRadius:10,marginBottom:6,cursor:"pointer"}}>
              <PA photo={a.photo} avatar={a.avatar} size={36}/>
              <div style={{flex:1}}><div style={{fontFamily:F.ios,fontSize:14,fontWeight:600,color:C.text}}>{a.name}</div><Sub style={{fontSize:11,marginTop:2}}>#{a.ranking} · {a.points} pts · {a.sex==="F"?"♀":"♂"}</Sub></div>
              <span style={{color:C.cyan,fontSize:18}}>+</span>
            </div>)}
          </div>
          <BtnX onClick={()=>setAddPlayerModal(null)}>CERRAR</BtnX>
        </Modal>}

        {subData&&<Modal onClose={()=>setSubData(null)} center>
          {subStep==="pick"?<>
            <T size={24} style={{textAlign:"center",marginBottom:8}}>¿QUIÉN GANÓ?</T>
            {!isAdmin&&<Sub style={{textAlign:"center",marginBottom:16,fontSize:13,color:C.amber}}>El resultado quedará pendiente de aprobación</Sub>}
            {[subData.match.p1,subData.match.p2].filter(Boolean).map(p=><div key={p.id} onClick={()=>{setPicked(p);setSubStep("score");}} className="tap-row" style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",background:C.surface2,borderRadius:12,marginBottom:10,cursor:"pointer",border:`1px solid ${C.borderS}`}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}><PA photo={p.photo} avatar={p.avatar} size={42}/><div style={{fontFamily:F.ios,fontSize:16,fontWeight:600,color:C.text}}>{p.name}</div></div>
              <span style={{color:C.muted,fontSize:20}}>›</span>
            </div>)}
            <BtnX onClick={()=>setSubData(null)}>CANCELAR</BtnX>
          </>:<>
            <T size={24} style={{textAlign:"center",marginBottom:8}}>MARCADOR</T>
            <Sub style={{textAlign:"center",marginBottom:16,fontSize:12}}>Ingresa juegos ganados por set</Sub>
            {(()=>{const p1=subData.match.p1,p2=subData.match.p2;return <>
              <div style={{display:"flex",gap:10,marginBottom:14,paddingBottom:12,borderBottom:`0.5px solid ${C.borderS}`}}>
                <div style={{flex:1,display:"flex",alignItems:"center",gap:8,opacity:picked.id===p1.id?1:0.55}}>
                  <PA photo={p1.photo} avatar={p1.avatar} size={32}/>
                  <div style={{flex:1,minWidth:0}}><div style={{fontFamily:F.ios,fontSize:13,fontWeight:600,color:picked.id===p1.id?C.cyan:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p1.firstName||p1.name.split(" ")[0]}</div>{picked.id===p1.id&&<Sub style={{fontSize:10,color:C.cyan,fontWeight:600}}>🏆 GANADOR</Sub>}</div>
                </div>
                <div style={{flex:1,display:"flex",alignItems:"center",gap:8,opacity:picked.id===p2.id?1:0.55}}>
                  <PA photo={p2.photo} avatar={p2.avatar} size={32}/>
                  <div style={{flex:1,minWidth:0}}><div style={{fontFamily:F.ios,fontSize:13,fontWeight:600,color:picked.id===p2.id?C.cyan:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p2.firstName||p2.name.split(" ")[0]}</div>{picked.id===p2.id&&<Sub style={{fontSize:10,color:C.cyan,fontWeight:600}}>🏆 GANADOR</Sub>}</div>
                </div>
              </div>
              {setScores.map((s,idx)=><div key={idx} style={{display:"flex",gap:10,alignItems:"center",marginBottom:10}}>
                <div style={{width:46,fontFamily:F.bc,fontSize:11,letterSpacing:"0.16em",color:C.muted,fontWeight:700,textTransform:"uppercase"}}>SET {idx+1}</div>
                <input type="number" min="0" max="99" placeholder="—" value={s.a} onChange={e=>{const ns=[...setScores];ns[idx]={...ns[idx],a:e.target.value};setSetScores(ns);}} style={{flex:1,background:C.iosField,border:"none",borderRadius:10,padding:"10px 8px",color:C.text,fontFamily:F.bn,fontSize:28,textAlign:"center",outline:"none"}}/>
                <div style={{fontFamily:F.bn,fontSize:22,color:C.muted}}>–</div>
                <input type="number" min="0" max="99" placeholder="—" value={s.b} onChange={e=>{const ns=[...setScores];ns[idx]={...ns[idx],b:e.target.value};setSetScores(ns);}} style={{flex:1,background:C.iosField,border:"none",borderRadius:10,padding:"10px 8px",color:C.text,fontFamily:F.bn,fontSize:28,textAlign:"center",outline:"none"}}/>
                {idx>=2&&idx===setScores.length-1&&<button onClick={()=>setSetScores(setScores.slice(0,-1))} className="btn-press" style={{background:"transparent",color:C.red,border:"none",fontSize:16,cursor:"pointer",padding:4}}>✕</button>}
              </div>)}
              {setScores.length<5&&<button onClick={()=>setSetScores([...setScores,{a:"",b:""}])} className="btn-press" style={{width:"100%",background:"transparent",border:`1px dashed ${C.cyanBdr}`,color:C.cyan,padding:"9px",fontFamily:F.ios,fontSize:13,cursor:"pointer",borderRadius:10,fontWeight:600,marginBottom:6}}>+ AGREGAR SET</button>}
              <Sub style={{textAlign:"center",fontSize:11,marginTop:8,marginBottom:6}}>Set típico: 6 juegos. Tie-break: 7. Deja sets vacíos si no se jugaron.</Sub>
            </>;})()}
            <BtnP onClick={submitResult}>{isAdmin?"VER MATCH INSIGHTS 📊":"ENVIAR RESULTADO"}</BtnP>
            <BtnX onClick={()=>setSubStep("pick")}>← VOLVER</BtnX>
          </>}
        </Modal>}
      </div>
      <ShowTabBar/>
    </div>;
  }

  // RANKINGS
  if(screen==="rankings"){
    // PROTECCIÓN DE MENORES: cada grupo solo ve a los suyos
    const userIsMinor=!isAdmin&&isMinor(user?.birthdate);
    const inCat=accounts.filter(a=>a.category===rankingTab&&(rankingGender==="All"||a.sex===rankingGender)&&(isAdmin?true:(userIsMinor?isMinor(a.birthdate):!isMinor(a.birthdate)))).sort((a,b)=>(b.points||0)-(a.points||0)).slice(0,100);
    return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative"}}>
      <style>{STYLE}</style><Aurora intense={0.4}/>
      <div style={{position:"relative",zIndex:1}}>
        <Nav/><Back to="home" label="Home"/>
        <div style={{padding:"14px 18px"}}>
          <T size={32}>RANKINGS</T><Sub style={{marginTop:4,marginBottom:14}}>Top 100 por categoría y género</Sub>
          <Seg options={[{v:"M",l:"♂ Varonil"},{v:"F",l:"♀ Femenil"},{v:"All",l:"Todos"}]} value={rankingGender} onChange={setRankingGender} style={{marginBottom:14}}/>
          <div style={{display:"flex",gap:6,marginBottom:16,overflowX:"auto",paddingBottom:6}}>
            {CATS.map(cat=><button key={cat} onClick={()=>setRankingTab(cat)} className="btn-press" style={{padding:"9px 16px",borderRadius:10,border:rankingTab===cat?`2px solid ${CAT_C[cat]}`:`1px solid ${C.borderS}`,background:rankingTab===cat?`${CAT_C[cat]}25`:"transparent",color:rankingTab===cat?CAT_C[cat]:C.muted,fontFamily:F.bn,fontSize:16,letterSpacing:"0.1em",cursor:"pointer",whiteSpace:"nowrap",fontWeight:700}}>{cat}</button>)}
          </div>
          <div style={{background:C.surface,borderRadius:14,padding:"4px 0",border:`0.5px solid ${C.borderS}`,overflow:"hidden"}}>
            <div style={{padding:"12px 16px",borderBottom:`0.5px solid ${C.borderS}`,background:`${CAT_C[rankingTab]}15`}}>
              <div style={{fontFamily:F.bc,fontSize:11,letterSpacing:"0.22em",color:CAT_C[rankingTab],fontWeight:700,textTransform:"uppercase"}}>CAT {rankingTab} · {rankingGender==="M"?"VARONIL":rankingGender==="F"?"FEMENIL":"TODOS"}</div>
              <Sub style={{fontSize:12,marginTop:3}}>{inCat.length} jugador{inCat.length!==1?"es":""}</Sub>
            </div>
            {inCat.length===0?<div style={{padding:"40px 16px",textAlign:"center"}}><Sub>Sin jugadores en este filtro todavía.</Sub></div>:inCat.map((p,i)=><div key={p.id} onClick={()=>{setViewP(p);setScreen("player-card");}} className="tap-row" style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderBottom:i<inCat.length-1?`0.5px solid ${C.borderS}`:"none",cursor:"pointer",animation:`slideLeft 0.3s ${i*0.03}s backwards`}}>
              <div style={{width:36,textAlign:"center",fontFamily:F.bn,fontSize:i<3?26:20,color:i===0?C.gold:i===1?"#C0C0C0":i===2?"#CD7F32":C.muted}}>{i+1}</div>
              <PA photo={p.photo} avatar={p.avatar} size={42}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:F.ios,fontSize:15,fontWeight:600,color:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.name}</div>
                <Sub style={{fontSize:12,marginTop:2}}>{p.wins||0}W · {p.losses||0}L · {p.titles||0}🏆 · {p.sex==="F"?"♀":"♂"}</Sub>
              </div>
              <div style={{textAlign:"right"}}><div style={{fontFamily:F.bn,fontSize:22,color:CAT_C[rankingTab]}}>{p.points||0}</div><div style={{fontFamily:F.bc,fontSize:9,color:C.muted,letterSpacing:"0.16em",fontWeight:600}}>PTS</div></div>
            </div>)}
          </div>
          <div style={{height:32}}/>
          <TabSpacer/>
        </div>
      </div>
      <ShowTabBar/>
    </div>;
  }

  // ====================== SOCIAL: pantallas ======================
  if(screen==="social"){
    const fld={width:"100%",background:C.iosField,border:`1px solid ${C.borderS}`,borderRadius:12,padding:"13px 14px",color:C.text,fontFamily:F.ios,fontSize:15,boxSizing:"border-box"};
    const list=socialTab==="mine"?myGroups:discoverGroups;
    const GroupCard=(g,joined)=><div key={g.id} className="btn-press" onClick={()=>joined?openGroup(g):joinGroupByObj(g)} style={{display:"flex",alignItems:"center",gap:12,background:C.surface2,border:`1px solid ${C.borderS}`,borderRadius:16,padding:13,marginBottom:10,cursor:"pointer"}}>
        <div style={{width:48,height:48,borderRadius:13,flexShrink:0,background:`linear-gradient(135deg,${g.avatar_color||C.cyanDeep},${C.navyDeep})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontFamily:F.bn,fontSize:20,letterSpacing:"0.04em"}}>{(g.name||"?").slice(0,2).toUpperCase()}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:7}}>
            <span style={{fontWeight:700,fontSize:15.5,color:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{g.name}</span>
            <span style={{flexShrink:0,fontSize:10,padding:"2px 7px",borderRadius:6,background:g.is_public?"rgba(79,195,247,0.14)":"rgba(124,58,237,0.18)",color:g.is_public?C.cyan:"#a78bfa"}}>{g.is_public?"Público":"🔒 Privado"}</span>
          </div>
          <div style={{fontSize:12.5,color:C.muted,marginTop:3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{g.description||(joined?"Toca para abrir el chat":"Toca para unirte")}</div>
        </div>
        {!joined&&<div style={{flexShrink:0,fontSize:13,fontWeight:700,color:C.green}}>Unirme</div>}
      </div>;
    return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative"}}>
      <style>{STYLE}</style><Aurora intense={0.4}/>
      <div style={{position:"relative",zIndex:1}}>
        <Nav/>
        <div style={{padding:"14px 18px"}}>
          <T size={32}>SOCIAL</T><Sub style={{marginTop:4,marginBottom:14}}>Grupos, chats y comunidad de tenis</Sub>
          <div style={{display:"flex",gap:8,marginBottom:16}}>
            {[["mine","Mis grupos"],["discover","Descubrir"]].map(([k,l])=><button key={k} onClick={()=>setSocialTab(k)} className="btn-press" style={{flex:1,background:socialTab===k?`linear-gradient(135deg,${C.cyanBright},${C.cyanDeep})`:C.surface2,border:`1px solid ${socialTab===k?"transparent":C.borderS}`,color:socialTab===k?"#fff":C.muted,fontFamily:F.ios,fontSize:14,fontWeight:700,padding:"11px",borderRadius:12,cursor:"pointer"}}>{l}</button>)}
          </div>
          {socialLoading?<div style={{textAlign:"center",color:C.muted,padding:"40px 0",fontSize:14}}>Cargando grupos…</div>:
            list.length===0?
              <div style={{textAlign:"center",padding:"36px 16px",background:C.surface2,borderRadius:16,border:`1px solid ${C.borderS}`}}>
                <div style={{fontSize:38,marginBottom:8}}>{socialTab==="mine"?"🎾":"🔍"}</div>
                <div style={{fontWeight:700,fontSize:16,marginBottom:5}}>{socialTab==="mine"?"Aún no estás en ningún grupo":"No hay grupos públicos todavía"}</div>
                <div style={{fontSize:13.5,color:C.muted,lineHeight:1.5}}>{socialTab==="mine"?"Crea tu primer grupo o explora la pestaña Descubrir para unirte a la comunidad.":"¡Sé el primero! Crea un grupo público y empieza a invitar gente."}</div>
              </div>
              :list.map(g=>GroupCard(g,socialTab==="mine"))}
          <button onClick={()=>setShowCreateGroup(true)} className="btn-press" style={{width:"100%",marginTop:14,background:"transparent",border:`1.5px dashed ${C.cyanBdr}`,color:C.cyan,fontFamily:F.ios,fontSize:15,fontWeight:700,padding:"15px",borderRadius:16,cursor:"pointer"}}>＋  Crear grupo</button>
          <TabSpacer/>
        </div>
      </div>

      {showCreateGroup&&<div style={{position:"fixed",inset:0,zIndex:600,background:"rgba(2,6,16,0.78)",display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setShowCreateGroup(false)}>
        <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:480,background:C.surface,borderRadius:"22px 22px 0 0",border:`1px solid ${C.borderS}`,padding:"22px 20px 30px",animation:"slideUp 0.3s ease"}}>
          <div style={{width:42,height:5,borderRadius:3,background:C.borderS,margin:"0 auto 18px"}}/>
          <T size={26} style={{marginBottom:16}}>NUEVO GRUPO</T>
          <Sub style={{marginBottom:6}}>Nombre del grupo</Sub>
          <input value={newGroup.name} onChange={e=>setNewGroup({...newGroup,name:e.target.value})} placeholder="Ej. Tenis Monterrey" maxLength={40} style={{...fld,marginBottom:14}}/>
          <Sub style={{marginBottom:6}}>Descripción (opcional)</Sub>
          <input value={newGroup.description} onChange={e=>setNewGroup({...newGroup,description:e.target.value})} placeholder="¿De qué trata el grupo?" maxLength={80} style={{...fld,marginBottom:14}}/>
          <div style={{display:"flex",gap:8,marginBottom:18}}>
            {[[true,"🌐 Público","Cualquiera puede encontrarlo y unirse"],[false,"🔒 Privado","Solo entran con el link de invitación"]].map(([v,l,d])=><button key={String(v)} onClick={()=>setNewGroup({...newGroup,isPublic:v})} className="btn-press" style={{flex:1,textAlign:"left",background:newGroup.isPublic===v?C.cyanDim:C.surface2,border:`1.5px solid ${newGroup.isPublic===v?C.cyanBdr:C.borderS}`,borderRadius:13,padding:"11px 12px",cursor:"pointer",fontFamily:F.ios}}>
              <div style={{fontWeight:700,fontSize:14,color:newGroup.isPublic===v?C.cyan:C.text}}>{l}</div>
              <div style={{fontSize:11,color:C.muted,marginTop:3,lineHeight:1.35}}>{d}</div>
            </button>)}
          </div>
          <BtnP onClick={createGroupFn} style={{marginTop:0,opacity:creatingGroup?0.6:1}}>{creatingGroup?"Creando…":"Crear grupo 🎾"}</BtnP>
          <button onClick={()=>setShowCreateGroup(false)} className="btn-press" style={{width:"100%",marginTop:10,background:"none",border:"none",color:C.muted,fontFamily:F.ios,fontSize:14,padding:"8px",cursor:"pointer"}}>Cancelar</button>
        </div>
      </div>}
      <ShowTabBar/>
    </div>;
  }

  // CHAT DE GRUPO
  if(screen==="group-chat"&&activeGroup){
    const g=activeGroup;
    const isCreator=g.created_by===user?.id;
    const memName=(uid)=>accounts.find(a=>a.id===uid)?.name||"Miembro";
    return <div key={"gc-"+g.id} className="screen-fade" style={{minHeight:"100vh",height:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative",display:"flex",flexDirection:"column"}}>
      <style>{STYLE}</style>
      <div style={{flexShrink:0,display:"flex",alignItems:"center",gap:10,padding:"14px 14px",background:C.surface,borderBottom:`1px solid ${C.borderS}`,position:"relative",zIndex:2}}>
        <button onClick={()=>{setActiveGroup(null);setScreen("social");}} className="btn-press" style={{background:"none",border:"none",color:C.cyan,fontSize:24,cursor:"pointer",padding:"0 2px",lineHeight:1}}>‹</button>
        <div onClick={()=>setShowGroupInfo(true)} style={{width:38,height:38,borderRadius:11,flexShrink:0,cursor:"pointer",background:`linear-gradient(135deg,${g.avatar_color||C.cyanDeep},${C.navyDeep})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontFamily:F.bn,fontSize:16}}>{(g.name||"?").slice(0,2).toUpperCase()}</div>
        <div onClick={()=>setShowGroupInfo(true)} style={{flex:1,minWidth:0,cursor:"pointer"}}>
          <div style={{fontWeight:700,fontSize:15.5,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{g.name}</div>
          <div style={{fontSize:11.5,color:C.muted}}>{groupMembers.length} miembro{groupMembers.length!==1?"s":""} · toca para ver info</div>
        </div>
        <button onClick={()=>setInviteGroup(g)} className="btn-press" style={{flexShrink:0,background:"rgba(52,199,89,0.16)",border:`1px solid rgba(52,199,89,0.4)`,color:C.green,fontFamily:F.ios,fontSize:12.5,fontWeight:700,padding:"7px 11px",borderRadius:10,cursor:"pointer"}}>＋ Invitar</button>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"14px 14px 6px",display:"flex",flexDirection:"column",gap:9}}>
        {groupMsgs.length===0&&<div style={{textAlign:"center",color:C.muted,marginTop:30,fontSize:14}}>Sé el primero en escribir 🎾</div>}
        {groupMsgs.map(m=>{const mine=m.user_id===user?.id;const nm=m.sender_name||memName(m.user_id);const REMO=["👍","❤️","🔥","🎾","😂","👏"];const rx=Object.entries(m.reactions||{}).filter(([e,a])=>a&&a.length);return <div key={m.id} style={{display:"flex",flexDirection:"column",alignItems:mine?"flex-end":"flex-start"}}>
          {!mine&&<div style={{fontSize:11,color:C.cyan,fontWeight:600,margin:"0 0 2px 4px"}}>{nm}</div>}
          <div style={{display:"flex",alignItems:"center",gap:6,flexDirection:mine?"row-reverse":"row",maxWidth:"90%"}}>
            <div style={{maxWidth:"100%",background:mine?`linear-gradient(135deg,${C.cyanBright},${C.cyanDeep})`:C.surface2,border:mine?"none":`1px solid ${C.borderS}`,borderRadius:16,padding:m.media_url?5:"9px 13px",color:mine?"#fff":C.text}}>
              {m.reply_to_id&&<div style={{borderLeft:`3px solid ${mine?"#fff":C.cyan}`,padding:"3px 8px",margin:m.media_url?"3px 3px 6px":"0 0 6px",background:mine?"rgba(255,255,255,0.16)":"rgba(255,255,255,0.05)",borderRadius:7}}>
                <div style={{fontSize:11,fontWeight:700,color:mine?"#fff":C.cyan}}>{m.reply_to_name}</div>
                <div style={{fontSize:12.5,opacity:0.82,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:190}}>{m.reply_to_text}</div>
              </div>}
              {m.media_type==="image"&&<img src={m.media_url} alt="" style={{maxWidth:230,width:"100%",borderRadius:12,display:"block"}}/>}
              {m.media_type==="video"&&<video src={m.media_url} controls style={{maxWidth:240,width:"100%",borderRadius:12,display:"block"}}/>}
              {m.text&&<div style={{fontSize:15,lineHeight:1.35,padding:m.media_url?"6px 8px 2px":0,whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{m.text}</div>}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:2,flexShrink:0}}>
              <button onClick={()=>setReplyingTo(m)} className="btn-press" style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:14,padding:2,lineHeight:1}} title="Responder">↩</button>
              <button onClick={()=>setReactPickerFor(reactPickerFor===m.id?null:m.id)} className="btn-press" style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:14,padding:2,lineHeight:1}} title="Reaccionar">😀</button>
            </div>
          </div>
          {reactPickerFor===m.id&&<div style={{display:"flex",gap:4,marginTop:4,background:C.surface,border:`1px solid ${C.borderS}`,borderRadius:20,padding:"5px 8px"}}>
            {REMO.map(e=><button key={e} onClick={()=>toggleReaction(m,e)} className="btn-press" style={{background:"none",border:"none",cursor:"pointer",fontSize:19,padding:"0 2px"}}>{e}</button>)}
          </div>}
          {rx.length>0&&<div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:4,maxWidth:"90%",justifyContent:mine?"flex-end":"flex-start"}}>
            {rx.map(([e,a])=>{const meR=a.includes(user?.id);return <button key={e} onClick={()=>toggleReaction(m,e)} className="btn-press" style={{background:meR?"rgba(79,195,247,0.22)":C.surface2,border:`1px solid ${meR?C.cyan:C.borderS}`,borderRadius:12,padding:"2px 8px",fontSize:12.5,color:C.text,cursor:"pointer",display:"flex",alignItems:"center",gap:3}}>{e} {a.length}</button>;})}
          </div>}
        </div>;})}
        <div ref={el=>{if(el)el.scrollIntoView({behavior:"auto"});}}/>
      </div>

      {replyingTo&&<div style={{flexShrink:0,display:"flex",alignItems:"center",gap:10,padding:"8px 14px",background:C.surface,borderTop:`1px solid ${C.borderS}`}}>
        <div style={{width:3,alignSelf:"stretch",background:C.cyan,borderRadius:2}}/>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:11.5,fontWeight:700,color:C.cyan}}>Respondiendo a {replyingTo.sender_name||"Miembro"}</div>
          <div style={{fontSize:12.5,color:C.muted,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{replyingTo.text||(replyingTo.media_type==="video"?"🎥 Video":"📷 Foto")}</div>
        </div>
        <button onClick={()=>setReplyingTo(null)} className="btn-press" style={{background:"none",border:"none",color:C.muted,fontSize:18,cursor:"pointer",padding:2}}>✕</button>
      </div>}
      <div style={{flexShrink:0,display:"flex",alignItems:"center",gap:9,padding:"10px 12px",background:C.surface,borderTop:`1px solid ${C.borderS}`,paddingBottom:"calc(10px + env(safe-area-inset-bottom))"}}>
        <input type="file" accept="image/*,video/*" id="chat-file-input" style={{display:"none"}} onChange={e=>{const f=e.target.files&&e.target.files[0];if(f)sendMedia(f);e.target.value="";}}/>
        <button onClick={()=>document.getElementById("chat-file-input").click()} className="btn-press" disabled={chatSending} style={{flexShrink:0,background:C.surface2,border:`1px solid ${C.borderS}`,borderRadius:"50%",width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:18,color:C.cyan}}>📷</button>
        <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMsg();}}} placeholder={chatSending?"Enviando…":"Mensaje…"} style={{flex:1,background:C.iosField,border:`1px solid ${C.borderS}`,borderRadius:20,padding:"11px 15px",color:C.text,fontFamily:F.ios,fontSize:15,outline:"none"}}/>
        <button onClick={sendMsg} className="btn-press" disabled={chatSending||!chatInput.trim()} style={{flexShrink:0,background:chatInput.trim()?`linear-gradient(135deg,${C.cyanBright},${C.cyanDeep})`:C.surface2,border:"none",borderRadius:"50%",width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:18,color:"#fff"}}>➤</button>
      </div>

      {inviteGroup&&<div style={{position:"fixed",inset:0,zIndex:600,background:"rgba(2,6,16,0.8)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setInviteGroup(null)}>
        <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:380,background:C.surface,borderRadius:20,border:`1px solid ${C.borderS}`,padding:24,textAlign:"center",animation:"fadeIn 0.25s"}}>
          <div style={{width:54,height:54,borderRadius:15,background:"rgba(52,199,89,0.18)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",fontSize:26}}>👥</div>
          <T size={24} style={{marginBottom:6}}>INVITA A TUS AMIGOS</T>
          <Sub style={{marginBottom:18,lineHeight:1.5}}>Comparte el link. Tus amigos abren SMT y entran directo a “{inviteGroup.name}”.</Sub>
          <div style={{display:"flex",alignItems:"center",gap:8,background:C.bg,border:`1px solid ${C.borderS}`,borderRadius:11,padding:"11px 13px",marginBottom:14}}>
            <span style={{flex:1,textAlign:"left",fontSize:12.5,color:C.cyan,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{buildInviteUrl(inviteGroup)}</span>
            <button onClick={()=>copyInvite(inviteGroup)} className="btn-press" style={{flexShrink:0,background:"none",border:"none",color:inviteCopied?C.green:C.muted,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:F.ios}}>{inviteCopied?"✓ Copiado":"Copiar"}</button>
          </div>
          <button onClick={()=>shareInviteWhatsApp(inviteGroup)} className="btn-press" style={{width:"100%",background:"#25D366",border:"none",borderRadius:13,padding:"14px",color:"#fff",fontFamily:F.ios,fontSize:15.5,fontWeight:700,cursor:"pointer"}}>Compartir por WhatsApp</button>
          <button onClick={()=>setInviteGroup(null)} className="btn-press" style={{width:"100%",marginTop:9,background:"none",border:"none",color:C.muted,fontFamily:F.ios,fontSize:14,padding:"6px",cursor:"pointer"}}>Cerrar</button>
        </div>
      </div>}

      {showGroupInfo&&<div style={{position:"fixed",inset:0,zIndex:600,background:"rgba(2,6,16,0.8)",display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setShowGroupInfo(false)}>
        <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:480,maxHeight:"80vh",overflowY:"auto",background:C.surface,borderRadius:"22px 22px 0 0",border:`1px solid ${C.borderS}`,padding:"22px 20px 30px",animation:"slideUp 0.3s ease"}}>
          <div style={{width:42,height:5,borderRadius:3,background:C.borderS,margin:"0 auto 18px"}}/>
          <div style={{display:"flex",alignItems:"center",gap:13,marginBottom:16}}>
            <div style={{width:56,height:56,borderRadius:15,flexShrink:0,background:`linear-gradient(135deg,${g.avatar_color||C.cyanDeep},${C.navyDeep})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontFamily:F.bn,fontSize:24}}>{(g.name||"?").slice(0,2).toUpperCase()}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:700,fontSize:18}}>{g.name}</div>
              <div style={{fontSize:12.5,color:C.muted}}>{g.is_public?"Grupo público":"Grupo privado"} · {groupMembers.length} miembro{groupMembers.length!==1?"s":""}</div>
            </div>
          </div>
          {g.description&&<div style={{fontSize:14,color:C.text,background:C.surface2,borderRadius:12,padding:"11px 13px",marginBottom:16,lineHeight:1.45}}>{g.description}</div>}
          <button onClick={()=>{setShowGroupInfo(false);setInviteGroup(g);}} className="btn-press" style={{width:"100%",background:"rgba(52,199,89,0.16)",border:`1px solid rgba(52,199,89,0.4)`,color:C.green,fontFamily:F.ios,fontSize:15,fontWeight:700,padding:"13px",borderRadius:13,cursor:"pointer",marginBottom:16}}>＋ Invitar gente al grupo</button>
          <Sub style={{marginBottom:9,textTransform:"uppercase",letterSpacing:"0.05em",fontSize:11}}>Miembros</Sub>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:18}}>
            {groupMembers.map(m=>{const nm=memName(m.user_id);return <div key={m.id} style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:34,height:34,borderRadius:"50%",flexShrink:0,background:C.surface3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.cyan}}>{ini(nm)}</div>
              <span style={{fontSize:14.5,flex:1}}>{nm}{m.user_id===user?.id?" (tú)":""}</span>
              {m.role==="admin"&&<span style={{fontSize:10.5,padding:"2px 8px",borderRadius:6,background:C.goldDim,color:C.gold,fontWeight:700}}>Admin</span>}
            </div>;})}
          </div>
          {isCreator
            ?<button onClick={()=>deleteGroupFn(g)} className="btn-press" style={{width:"100%",background:"rgba(255,59,48,0.12)",border:`1px solid rgba(255,59,48,0.35)`,color:C.red,fontFamily:F.ios,fontSize:14.5,fontWeight:700,padding:"13px",borderRadius:13,cursor:"pointer"}}>🗑  ELIMINAR GRUPO</button>
            :<button onClick={()=>leaveGroupFn(g)} className="btn-press" style={{width:"100%",background:"rgba(255,59,48,0.12)",border:`1px solid rgba(255,59,48,0.35)`,color:C.red,fontFamily:F.ios,fontSize:14.5,fontWeight:700,padding:"13px",borderRadius:13,cursor:"pointer"}}>↩  SALIR DEL GRUPO</button>}
          <button onClick={()=>setShowGroupInfo(false)} className="btn-press" style={{width:"100%",marginTop:10,background:"none",border:"none",color:C.muted,fontFamily:F.ios,fontSize:14,padding:"8px",cursor:"pointer"}}>Cerrar</button>
        </div>
      </div>}
    </div>;
  }
  // ==================== FIN SOCIAL: pantallas ====================

  // MEDIA
  if(screen==="media"){
    // PROTECCIÓN DE MENORES: los menores no pueden ver Media
    if(!isAdmin&&isMinor(user?.birthdate)){return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative"}}>
      <style>{STYLE}</style><Aurora intense={0.4}/>
      <div style={{position:"relative",zIndex:1}}><Nav/><Back to="home" label="Home"/>
        <div style={{padding:"40px 24px",textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:12}}>🛡️</div>
          <T size={28}>NO DISPONIBLE</T>
          <Sub style={{marginTop:10,fontSize:14,lineHeight:1.5}}>Esta sección no está disponible para menores de edad por seguridad.</Sub>
        </div>
      </div>
    </div>;}
    const detail=openMedia?media.find(m=>m.id===openMedia):null;
    return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative"}}>
      <style>{STYLE}</style><Aurora intense={0.4}/>
      <div style={{position:"relative",zIndex:1}}>
        <Nav/>
        {!detail?<>
          <Back to="home" label="Home"/>
          <div style={{padding:"14px 18px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div><T size={32}>MEDIA</T><Sub style={{marginTop:4}}>{media.length} publicaci{media.length===1?"ón":"ones"}</Sub></div>
              <div style={{display:"flex",gap:6}}>
                {!isAdmin&&!isMinor(user?.birthdate)&&<BtnG onClick={()=>{setMediaDraft({type:null,url:null,caption:""});setPostMediaModal(true);}}>📝 POSTEAR</BtnG>}
                {isAdmin&&<BtnG onClick={()=>setMediaUploadModal(true)}>📤 SUBIR</BtnG>}
              </div>
            </div>
            {/* Banner Instagram oficial SMT */}
            <a href="https://www.instagram.com/tennis.smt/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",display:"block",marginBottom:16}}>
              <div className="btn-press" style={{position:"relative",overflow:"hidden",borderRadius:16,background:"linear-gradient(135deg,#833AB4 0%,#FD1D1D 50%,#FCB045 100%)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",animation:"breathSubtle 5s infinite"}}>
                <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 20% 90%,rgba(255,255,255,0.18),transparent 60%)",pointerEvents:"none"}}/>
                <div style={{width:46,height:46,borderRadius:13,background:"rgba(255,255,255,0.15)",border:"1.5px solid rgba(255,255,255,0.5)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,position:"relative",zIndex:1}}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </div>
                <div style={{flex:1,position:"relative",zIndex:1}}>
                  <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.22em",color:"rgba(255,255,255,0.85)",fontWeight:600,marginBottom:2}}>SÍGUENOS EN INSTAGRAM</div>
                  <div style={{fontFamily:F.ios,fontSize:16,color:"#fff",fontWeight:700,letterSpacing:"-0.01em"}}>@tennis.smt</div>
                </div>
                <div style={{color:"#fff",fontSize:22,fontWeight:300,position:"relative",zIndex:1}}>›</div>
              </div>
            </a>
            {media.length===0?<div style={{padding:"60px 0",textAlign:"center"}}><div style={{fontSize:48,marginBottom:14}}>🎬</div><Sub style={{fontSize:14}}>{isAdmin?"Sube el primer post con el botón SUBIR.":"Aún no hay publicaciones. ¡Sé el primero!"}</Sub></div>:(()=>{
              // Layout tipo Instagram: separar verticales (9:16) y cuadrados (1:1)
              // Verticales arriba (grid 2 col tall), cuadrados abajo (grid 2 col).
              // O intercalados en pares: cada vertical ocupa 1 columna, junto a 2 cuadrados apilados
              const items=media.map(m=>({...m,aspect:m.aspect||"square"}));
              return <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,gridAutoRows:"min-content"}}>
                {items.map((m,i)=>{const isVert=m.aspect==="vertical";return <div key={m.id} onClick={()=>setOpenMedia(m.id)} className="btn-press" style={{position:"relative",aspectRatio:isVert?"9/16":"1",borderRadius:14,overflow:"hidden",border:`0.5px solid ${C.borderS}`,background:"#000",cursor:"pointer",animation:`scaleIn 0.4s ${i*0.04}s backwards`,gridRow:isVert?"span 2":"auto"}}>
                  {m.type==="image"?<img src={m.url} style={{width:"100%",height:"100%",objectFit:"cover",animation:"breathSubtle 7s infinite"}} alt=""/>:<video src={m.url} style={{width:"100%",height:"100%",objectFit:"cover",background:"#000"}}/>}
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 50%,rgba(0,0,0,0.55))",pointerEvents:"none"}}/>
                  <div style={{position:"absolute",top:8,left:8,background:"rgba(0,0,0,0.6)",backdropFilter:"blur(8px)",padding:"3px 8px",borderRadius:6,fontFamily:F.bc,fontSize:9,letterSpacing:"0.16em",color:"#fff",fontWeight:600,display:"flex",alignItems:"center",gap:4}}>{m.type==="video"?<>🎥 {isVert?"REEL":"VIDEO"}</>:<>📷 {isVert?"STORY":"POST"}</>}</div>
                  {m.by&&m.by!=="admin"&&<div style={{position:"absolute",bottom:8,left:8,right:8,display:"flex",alignItems:"center",gap:6}}><PA photo={m.byPhoto} avatar={m.byAvatar||"?"} size={22} border="1px solid rgba(255,255,255,0.4)"/><span style={{fontFamily:F.ios,fontSize:11,color:"#fff",fontWeight:600,textShadow:"0 1px 4px rgba(0,0,0,0.6)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.byName?.split(" ")[0]}</span></div>}
                  {(mediaComments[m.id]||[]).length>0&&<div style={{position:"absolute",top:8,right:8,background:"rgba(0,0,0,0.6)",backdropFilter:"blur(8px)",padding:"3px 7px",borderRadius:6,fontFamily:F.bc,fontSize:10,color:"#fff",fontWeight:600}}>💬 {mediaComments[m.id].length}</div>}
                  {isAdmin&&<button onClick={(e)=>{e.stopPropagation();if(confirm("¿Eliminar este post?")){setMedia(prev=>prev.filter(x=>x.id!==m.id));setMediaComments(prev=>{const n={...prev};delete n[m.id];return n;});}}} className="btn-press" style={{position:"absolute",top:m.by&&m.by!=="admin"?8:38,right:8,background:"rgba(255,59,48,0.95)",color:"#fff",border:"none",width:26,height:26,borderRadius:13,cursor:"pointer",fontSize:13,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>}
                </div>;})}
              </div>;
            })()}
            <div style={{height:32}}/>
          </div>
        </>:<>
          <button onClick={()=>{setOpenMedia(null);setCommentDraft("");}} className="btn-press" style={{background:"none",border:"none",color:C.cyan,fontFamily:F.ios,fontSize:15,fontWeight:500,cursor:"pointer",padding:"14px 16px 0"}}>← Galería</button>
          <div style={{padding:"10px 0 0"}}>
            <div style={{position:"relative",margin:"0 16px",borderRadius:14,overflow:"hidden",border:`0.5px solid ${C.borderS}`,background:"#000"}}>
              {detail.type==="image"?<img src={detail.url} style={{width:"100%",maxHeight:"60vh",objectFit:"contain",display:"block",animation:"breathSubtle 8s infinite"}} alt=""/>:<video src={detail.url} controls autoPlay style={{width:"100%",maxHeight:"60vh",display:"block",background:"#000"}}/>}
            </div>
            <div style={{padding:"14px 18px"}}>
              {detail.by&&detail.by!=="admin"&&<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,padding:"10px 12px",background:C.surface,borderRadius:12,border:`0.5px solid ${C.borderS}`}}>
                <PA photo={detail.byPhoto} avatar={detail.byAvatar||"?"} size={36}/>
                <div style={{flex:1}}><div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.18em",color:C.muted,fontWeight:600}}>POSTEADO POR</div><div style={{fontFamily:F.ios,fontSize:14,color:C.text,fontWeight:600,marginTop:2}}>{detail.byName}</div></div>
              </div>}
              {detail.caption&&<div style={{padding:"10px 12px",background:C.surface,border:`0.5px solid ${C.borderS}`,borderRadius:10,marginBottom:14,fontFamily:F.ios,fontSize:14,color:C.text,lineHeight:1.5}}>{detail.caption}</div>}
              <SL>💬 Comentarios ({(mediaComments[detail.id]||[]).length})</SL>
              {(mediaComments[detail.id]||[]).length===0?<Sub style={{padding:"14px 0",textAlign:"center"}}>Sé el primero en comentar.</Sub>:(mediaComments[detail.id]||[]).map(co=><div key={co.id} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:`0.5px solid ${C.borderS}`}}>
                <PA photo={co.userPhoto} avatar={co.userAvatar} size={32}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
                    <div style={{fontFamily:F.ios,fontSize:13,fontWeight:600,color:C.cyan}}>{co.userName}</div>
                    {(isAdmin||co.userId===user?.id)&&<button onClick={()=>deleteComment(detail.id,co.id)} className="btn-press" style={{background:"none",border:"none",color:C.muted,fontSize:11,cursor:"pointer",padding:2}}>✕</button>}
                  </div>
                  <div style={{fontFamily:F.ios,fontSize:14,color:C.text,marginTop:2,lineHeight:1.4,wordBreak:"break-word"}}>{co.text}</div>
                </div>
              </div>)}
              <div style={{display:"flex",gap:8,marginTop:14,alignItems:"center"}}>
                <PA photo={user?.photo} avatar={user?.avatar} size={36}/>
                <input value={commentDraft} onChange={e=>setCommentDraft(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addComment(detail.id)} placeholder="Escribe un comentario..." style={{flex:1,background:C.iosField,border:"none",borderRadius:20,padding:"10px 16px",color:C.text,fontFamily:F.ios,fontSize:14,outline:"none"}}/>
                <button onClick={()=>addComment(detail.id)} className="btn-press" style={{background:`linear-gradient(135deg,${C.cyanBright},${C.cyanDeep})`,color:"#fff",border:"none",borderRadius:"50%",width:40,height:40,cursor:"pointer",fontSize:18,fontWeight:600}}>↑</button>
              </div>
            </div>
            <div style={{height:32}}/>
          </div>
        </>}
        {mediaUploadModal&&<Modal onClose={()=>setMediaUploadModal(false)}>
          <T size={24} style={{textAlign:"center",marginBottom:8}}>SUBIR MEDIA</T>
          <Sub style={{textAlign:"center",marginBottom:18,fontSize:13}}>Imagen o video. Visible para todos los jugadores.</Sub>
          <label htmlFor="mediaFile" style={{cursor:"pointer",border:`2px dashed ${C.cyanBdr}`,borderRadius:14,padding:36,background:C.iosField,textAlign:"center",display:"block"}}>
            <div style={{fontSize:42,marginBottom:10}}>📤</div>
            <div style={{fontFamily:F.ios,fontSize:15,color:C.text,fontWeight:600}}>Selecciona archivo</div>
            <Sub style={{fontSize:12,marginTop:4}}>JPG, PNG, MP4, MOV</Sub>
          </label>
          <input id="mediaFile" type="file" accept="image/*,video/*" style={{position:"absolute",left:-9999,opacity:0,width:1,height:1}} onChange={handleMediaUpload}/>
          <BtnX onClick={()=>setMediaUploadModal(false)}>CANCELAR</BtnX>
        </Modal>}
        {postMediaModal&&<Modal onClose={()=>setPostMediaModal(false)} large>
          <T size={22} style={{textAlign:"center",marginBottom:8}}>POSTEAR EN MEDIA</T>
          <Sub style={{textAlign:"center",marginBottom:14,fontSize:13}}>Tu post aparecerá cuando el admin lo apruebe</Sub>
          <FL>Imagen o video *</FL>
          <label htmlFor="mediaDraftFile" style={{cursor:"pointer",border:`2px dashed ${C.cyanBdr}`,borderRadius:14,padding:mediaDraft.url?0:24,background:C.iosField,textAlign:"center",display:"block",marginBottom:14,overflow:"hidden"}}>
            {mediaDraft.url?(mediaDraft.type==="image"?<img src={mediaDraft.url} style={{width:"100%",maxHeight:280,objectFit:"contain",display:"block"}} alt=""/>:<video src={mediaDraft.url} controls style={{width:"100%",maxHeight:280,display:"block",background:"#000"}}/>):<><div style={{fontSize:36,marginBottom:8}}>📤</div><div style={{fontFamily:F.ios,fontSize:14,color:C.text,fontWeight:600}}>Selecciona archivo</div><Sub style={{fontSize:12,marginTop:4}}>JPG, PNG, MP4, MOV</Sub></>}
          </label>
          <input id="mediaDraftFile" type="file" accept="image/*,video/*" style={{position:"absolute",left:-9999,opacity:0,width:1,height:1}} onChange={handleMediaDraftFile}/>
          {mediaDraft.url&&<button onClick={()=>setMediaDraft({type:null,url:null,caption:""})} className="btn-press" style={{background:"none",border:"none",color:C.red,fontSize:13,marginBottom:14,cursor:"pointer",fontFamily:F.ios,fontWeight:500}}>✕ Cambiar archivo</button>}
          <FL>Descripción (opcional)</FL>
          <TI value={mediaDraft.caption} onChange={e=>setMediaDraft({...mediaDraft,caption:e.target.value})} placeholder="Comparte algo sobre tu post..."/>
          <div style={{background:"rgba(255,159,10,0.10)",border:`1px solid rgba(255,159,10,0.3)`,borderRadius:10,padding:10,marginTop:14}}>
            <Sub style={{fontSize:12,color:C.amber}}>⚠️ El admin revisará y aprobará tu post antes de que sea público.</Sub>
          </div>
          <BtnP onClick={submitMediaRequest}>ENVIAR PARA REVISIÓN</BtnP>
          <BtnX onClick={()=>setPostMediaModal(false)}>CANCELAR</BtnX>
        </Modal>}
      </div>
      <ShowTabBar/>
    </div>;
  }

  // FIND A MATCH
  if(screen==="scoreboard"){
    const w=sb&&sb.winner!=null;
    const phase=sb?(sb.matchTiebreak?"MATCH TIE-BREAK":sb.tiebreak?"TIE-BREAK":null):null;
    return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative"}}>
      <style>{STYLE}</style><Aurora intense={0.4}/>
      <div style={{position:"relative",zIndex:1}}>
        <Nav/><Back to="home" label="Home"/>
        <div style={{padding:"14px 18px"}}>
          <T size={32}>MARCADOR</T><Sub style={{marginTop:4,marginBottom:18}}>Lleva el score de tu partido</Sub>
          {!sb&&<div style={{maxWidth:420,margin:"0 auto"}}>
            <div style={{background:C.surface,border:`1px solid ${C.borderS}`,borderRadius:18,padding:20}}>
              <Sub style={{fontSize:12,marginBottom:6}}>JUGADOR 1</Sub>
              <input value={sbP1} onChange={e=>setSbP1(e.target.value)} placeholder="Nombre jugador 1" style={{width:"100%",background:C.iosField,border:`1px solid ${C.borderS}`,borderRadius:12,padding:"12px 14px",color:C.text,fontFamily:F.ios,fontSize:16,outline:"none",marginBottom:14,boxSizing:"border-box"}}/>
              <Sub style={{fontSize:12,marginBottom:6}}>JUGADOR 2</Sub>
              <input value={sbP2} onChange={e=>setSbP2(e.target.value)} placeholder="Nombre jugador 2" style={{width:"100%",background:C.iosField,border:`1px solid ${C.borderS}`,borderRadius:12,padding:"12px 14px",color:C.text,fontFamily:F.ios,fontSize:16,outline:"none",marginBottom:8,boxSizing:"border-box"}}/>
              <BtnP onClick={sbStart}>▶  INICIAR PARTIDO</BtnP>
              <Sub style={{fontSize:11.5,marginTop:12,lineHeight:1.5,textAlign:"center"}}>Formato: 2 de 3 sets · tie-break a 7 en 6-6 · 3er set match tie-break a 7</Sub>
            </div>
          </div>}
          {sb&&<div style={{maxWidth:460,margin:"0 auto"}}>
            <div style={{background:C.surface,border:`1px solid ${C.borderS}`,borderRadius:20,overflow:"hidden"}}>
              {phase&&<div style={{textAlign:"center",background:`linear-gradient(135deg,${C.cyanBright},${C.cyanDeep})`,color:"#fff",fontWeight:800,fontSize:13,letterSpacing:"0.1em",padding:"7px"}}>{phase}</div>}
              {[0,1].map(i=>{const isW=sb.winner===i;const oppI=i===0?1:0;return <div key={i} style={{display:"flex",alignItems:"center",padding:"16px",borderBottom:i===0?`1px solid ${C.borderS}`:"none",background:isW?"rgba(52,199,89,0.10)":"transparent"}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:18,fontWeight:700,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{i===0?sb.p1:sb.p2}{isW&&" 🏆"}</div>
                </div>
                <div style={{display:"flex",gap:6,alignItems:"center",marginRight:14}}>
                  {sb.sets.map((st,idx)=><div key={idx} style={{minWidth:20,textAlign:"center",fontSize:15,fontWeight:700,color:(st[i]>st[oppI])?C.cyan:C.muted}}>{st[i]}</div>)}
                  {sb.winner==null&&!sb.matchTiebreak&&<div style={{minWidth:20,textAlign:"center",fontSize:16,fontWeight:800,color:C.text}}>{sb.games[i]}</div>}
                </div>
                {sb.winner==null&&<div style={{minWidth:54,textAlign:"center",fontSize:26,fontWeight:800,color:C.cyan,fontFamily:F.bn}}>{sbPtLabel(sb,i)}</div>}
              </div>;})}
            </div>
            {w?<div style={{textAlign:"center",marginTop:22}}>
              <div style={{fontSize:46,marginBottom:6}}>🏆</div>
              <T size={26}>GANADOR</T>
              <div style={{fontSize:20,fontWeight:700,color:C.cyan,marginTop:4}}>{sb.winner===0?sb.p1:sb.p2}</div>
              <BtnP onClick={sbReset} style={{marginTop:22}}>NUEVO PARTIDO</BtnP>
            </div>:<>
              <div style={{display:"flex",gap:12,marginTop:20}}>
                {[0,1].map(i=><button key={i} onClick={()=>sbPoint(i)} className="btn-press" style={{flex:1,minWidth:0,background:`linear-gradient(135deg,${C.cyanBright},${C.cyanDeep})`,border:"none",borderRadius:16,padding:"18px 10px",color:"#fff",fontFamily:F.ios,fontWeight:700,fontSize:15,cursor:"pointer",boxShadow:`0 8px 22px rgba(2,136,209,0.35)`}}>+1 PUNTO<div style={{fontSize:12,fontWeight:500,opacity:0.9,marginTop:3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{i===0?sb.p1:sb.p2}</div></button>)}
              </div>
              <div style={{display:"flex",gap:10,marginTop:12}}>
                <BtnG onClick={sbUndo} style={{flex:1,textAlign:"center",opacity:sbHist.length?1:0.5}}>↩ DESHACER</BtnG>
                <BtnG onClick={()=>{if(window.confirm("¿Terminar el partido y empezar de nuevo?"))sbReset();}} style={{flex:1,textAlign:"center"}}>✕ TERMINAR</BtnG>
              </div>
            </>}
          </div>}
        </div>
        <TabSpacer/>
      </div>
      <ShowTabBar/>
    </div>;
  }

  if(screen==="find-hub"){
    if(!isAdmin&&isMinor(user?.birthdate)){return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative"}}>
      <style>{STYLE}</style><Aurora intense={0.4}/>
      <div style={{position:"relative",zIndex:1}}><Nav/><Back to="home" label="Home"/>
        <div style={{padding:"40px 24px",textAlign:"center"}}><div style={{fontSize:48,marginBottom:12}}>🛡️</div><T size={28}>NO DISPONIBLE</T><Sub style={{marginTop:10,fontSize:14,lineHeight:1.5}}>Esta sección no está disponible para menores de edad por seguridad.</Sub></div>
      </div>
      <ShowTabBar/>
    </div>;}
    const HubCard=({emoji,title,desc,onClick,soon})=><div className={soon?"":"btn-press"} onClick={soon?undefined:onClick} style={{display:"flex",alignItems:"center",gap:15,background:C.surface,border:`1px solid ${C.borderS}`,borderRadius:18,padding:"18px 16px",marginBottom:13,cursor:soon?"default":"pointer",opacity:soon?0.55:1}}>
      <div style={{width:54,height:54,borderRadius:15,flexShrink:0,background:`linear-gradient(135deg,${C.cyanBright},${C.cyanDeep})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>{emoji}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontWeight:700,fontSize:17,marginBottom:3}}>{title}{soon&&<span style={{fontSize:10,fontWeight:700,color:C.amber,marginLeft:8,background:"rgba(255,159,10,0.14)",padding:"2px 7px",borderRadius:6,verticalAlign:"middle"}}>PRÓXIMAMENTE</span>}</div>
        <div style={{fontSize:13,color:C.muted,lineHeight:1.4}}>{desc}</div>
      </div>
      {!soon&&<div style={{color:C.cyan,fontSize:22,flexShrink:0}}>›</div>}
    </div>;
    return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative"}}>
      <style>{STYLE}</style><Aurora intense={0.4}/>
      <div style={{position:"relative",zIndex:1}}>
        <Nav/><Back to="home" label="Home"/>
        <div style={{padding:"14px 18px"}}>
          <T size={32}>FIND A</T><Sub style={{marginTop:4,marginBottom:20}}>¿Qué estás buscando?</Sub>
          <HubCard emoji="🎾" title="Buscar Partido" desc="Encuentra rival de tu nivel para jugar" onClick={()=>setScreen("find-match")}/>
          <HubCard emoji="🎓" title="Buscar Coach" desc="Reserva clases con entrenadores certificados" onClick={()=>setScreen("coach")}/>
          <HubCard emoji="🩹" title="Buscar Físio" desc="Rehabilitación, prevención y diagnóstico de lesiones" soon/>
        </div>
        <TabSpacer/>
      </div>
      <ShowTabBar/>
    </div>;
  }

  if(screen==="find-match"){
    // PROTECCIÓN DE MENORES: los menores no pueden acceder a Find a Match
    if(!isAdmin&&isMinor(user?.birthdate)){return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative"}}>
      <style>{STYLE}</style><Aurora intense={0.4}/>
      <div style={{position:"relative",zIndex:1}}><Nav/><Back to="find-hub" label="Find A"/>
        <div style={{padding:"40px 24px",textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:12}}>🛡️</div>
          <T size={28}>NO DISPONIBLE</T>
          <Sub style={{marginTop:10,fontSize:14,lineHeight:1.5}}>Esta sección no está disponible para menores de edad por seguridad.</Sub>
        </div>
      </div>
    </div>;}
    // Solo mayores entre mayores (excluir admin de la lista de jugadores, excluir menores)
    const others=accounts.filter(a=>a.id!==user?.id&&!isMinor(a.birthdate));
    const myReqs=matchRequests.filter(r=>r.fromId===user?.id);
    const incoming=matchRequests.filter(r=>r.toId===user?.id);
    return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative"}}>
      <style>{STYLE}</style><Aurora intense={0.4}/>
      <div style={{position:"relative",zIndex:1}}>
        <Nav/><Back to="find-hub" label="Find A"/>
        <div style={{padding:"14px 18px"}}>
          <T size={32}>FIND A MATCH</T><Sub style={{marginTop:4,marginBottom:18}}>Encuentra rival para jugar</Sub>
          {!user?.phone&&!isAdmin&&<div style={{background:"rgba(255,159,10,0.12)",border:`1px solid ${C.amber}`,borderRadius:12,padding:12,marginBottom:14}}>
            <Sub style={{color:C.amber,fontSize:13,fontWeight:600}}>⚠️ Agrega tu número de celular en tu perfil para usar Find a Match.</Sub>
          </div>}
          <Seg options={[{v:"players",l:`👥 Jugadores`},{v:"requests",l:`📥 Solicitudes (${incoming.filter(r=>r.status==="pending").length})`},{v:"sent",l:`📤 Enviadas (${myReqs.length})`}]} value={findMatchTab} onChange={setFindMatchTab} style={{marginBottom:16}}/>
          {findMatchTab==="players"&&<div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <Sub style={{fontSize:12}}>Filtrar resultados</Sub>
              <BtnG onClick={()=>setShowFmFilters(!showFmFilters)} style={{padding:"6px 10px",fontSize:11}}>{showFmFilters?"▲ OCULTAR":"▼ FILTROS"}{(fmFilters.category||fmFilters.gender||fmFilters.country||fmFilters.state||fmFilters.city||fmFilters.club)?" •":""}</BtnG>
            </div>
            {showFmFilters&&<div style={{background:C.surface,border:`0.5px solid ${C.borderS}`,borderRadius:12,padding:12,marginBottom:14,animation:"slideDown 0.3s"}}>
              <FL>Categoría</FL>
              <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
                <button onClick={()=>setFmFilters({...fmFilters,category:""})} className="btn-press" style={{padding:"6px 10px",fontSize:11,borderRadius:8,border:`1px solid ${!fmFilters.category?C.cyanBdr:C.borderS}`,background:!fmFilters.category?C.cyanDim:"transparent",color:!fmFilters.category?C.cyan:C.muted,fontFamily:F.bc,letterSpacing:"0.1em",cursor:"pointer",fontWeight:600}}>TODAS</button>
                {CATS.map(c=><button key={c} onClick={()=>setFmFilters({...fmFilters,category:c})} className="btn-press" style={{padding:"6px 10px",fontSize:11,borderRadius:8,border:`1px solid ${fmFilters.category===c?CAT_C[c]:C.borderS}`,background:fmFilters.category===c?`${CAT_C[c]}25`:"transparent",color:fmFilters.category===c?CAT_C[c]:C.muted,fontFamily:F.bc,letterSpacing:"0.1em",cursor:"pointer",fontWeight:600}}>{c}</button>)}
              </div>
              <FL>Género</FL>
              <Seg options={[{v:"",l:"Todos"},{v:"M",l:"♂ Varonil"},{v:"F",l:"♀ Femenil"}]} value={fmFilters.gender} onChange={v=>setFmFilters({...fmFilters,gender:v})} style={{marginBottom:10}}/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
                <div><FL>País</FL><TI value={fmFilters.country} onChange={e=>setFmFilters({...fmFilters,country:e.target.value})} placeholder="México" style={{fontSize:13,padding:"10px 12px"}}/></div>
                <div><FL>Ciudad</FL><TI value={fmFilters.city} onChange={e=>setFmFilters({...fmFilters,city:e.target.value})} placeholder="Monterrey" style={{fontSize:13,padding:"10px 12px"}}/></div>
              </div>
              <FL>Estado</FL>
              <select value={fmFilters.state} onChange={e=>setFmFilters({...fmFilters,state:e.target.value})} style={{width:"100%",background:C.iosField,border:"none",borderRadius:10,padding:"10px 12px",color:C.text,fontFamily:F.ios,fontSize:13,outline:"none",cursor:"pointer",marginBottom:10}}><option value="">Todos los estados</option>{MX_STATES.map(s=><option key={s} value={s}>{s}</option>)}</select>
              <FL>Club</FL>
              <TI value={fmFilters.club} onChange={e=>setFmFilters({...fmFilters,club:e.target.value})} placeholder="Club Campestre" style={{fontSize:13,padding:"10px 12px"}}/>
              <button onClick={()=>setFmFilters({category:"",gender:"",country:"",state:"",city:"",club:""})} className="btn-press" style={{marginTop:10,background:"none",border:"none",color:C.red,fontFamily:F.ios,fontSize:12,cursor:"pointer",fontWeight:500}}>✕ Limpiar filtros</button>
            </div>}
            {(()=>{const filtered=others.filter(p=>(!fmFilters.category||p.category===fmFilters.category)&&(!fmFilters.gender||p.sex===fmFilters.gender)&&(!fmFilters.country||(p.country||"").toLowerCase().includes(fmFilters.country.toLowerCase()))&&(!fmFilters.state||p.state===fmFilters.state)&&(!fmFilters.city||(p.city||"").toLowerCase().includes(fmFilters.city.toLowerCase()))&&(!fmFilters.club||(p.club||"").toLowerCase().includes(fmFilters.club.toLowerCase())));return filtered.length===0?<Sub style={{padding:"30px 0",textAlign:"center"}}>Sin resultados con esos filtros.</Sub>:filtered.map((p,i)=><div key={p.id} style={{display:"flex",alignItems:"center",gap:12,padding:12,background:C.surface,border:`0.5px solid ${C.borderS}`,borderRadius:12,marginBottom:8,animation:`slideLeft 0.3s ${i*0.03}s backwards`}}>
              <PA photo={p.photo} avatar={p.avatar} size={44} onClick={()=>{setViewP(p);setScreen("player-card");}}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:F.ios,fontSize:14,fontWeight:600,color:C.text}}>{p.name}</div>
                <Sub style={{fontSize:11,marginTop:2}}>{p.category?`CAT ${p.category} · `:""}{p.sex==="F"?"♀":"♂"} · {p.city||p.club||"—"}</Sub>
              </div>
              <BtnG onClick={()=>{if(!user?.phone){alert("Agrega tu número de celular en tu perfil primero.");return;}setMatchReqModal({toId:p.id,toName:p.name});setNewMatchReq({club:p.club||"Club Campestre Monterrey",when:"weekend",time:"morning",msg:""});}} style={{padding:"7px 12px",fontSize:12}}>🎾 RETAR</BtnG>
            </div>);})()}
          </div>}
          {findMatchTab==="requests"&&<div>
            {incoming.length===0?<div style={{padding:"40px 0",textAlign:"center"}}><div style={{fontSize:36,marginBottom:10}}>📭</div><Sub>Nadie te ha mandado solicitudes todavía.</Sub></div>:incoming.map(r=><div key={r.id} style={{padding:14,background:C.surface,border:`0.5px solid ${r.status==="pending"?C.cyanBdr:C.borderS}`,borderRadius:12,marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <PA photo={r.fromPhoto} avatar={r.fromAvatar} size={40}/>
                <div style={{flex:1}}><div style={{fontFamily:F.ios,fontSize:14,fontWeight:600,color:C.text}}>{r.fromName}</div><Sub style={{fontSize:11}}>te invita a jugar</Sub></div>
                {r.status==="accepted"&&<Chip type="green">ACEPTADA</Chip>}
                {r.status==="rejected"&&<Chip type="red">RECHAZADA</Chip>}
                {r.status==="pending"&&<Chip type="amber">PENDIENTE</Chip>}
              </div>
              <div style={{background:C.surface2,padding:10,borderRadius:8,marginBottom:r.status==="pending"?10:0}}>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:6}}>
                  <Chip type="cyan">🏟️ {r.club}</Chip>
                  <Chip>{r.when==="weekday"?"📅 Entre semana":"🎉 Fin de semana"}</Chip>
                  <Chip>{r.time==="morning"?"☀️ Mañana":"🌙 Noche"}</Chip>
                </div>
                {r.msg&&<Sub style={{fontSize:12,marginTop:6,fontStyle:"italic",color:C.text}}>"{r.msg}"</Sub>}
              </div>
              {r.status==="pending"&&<div style={{display:"flex",gap:8}}>
                <button onClick={()=>respondMatchRequest(r.id,true)} className="btn-press" style={{flex:1,background:C.green,color:"#fff",border:"none",padding:11,borderRadius:10,fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600}}>✓ ACEPTAR</button>
                <button onClick={()=>respondMatchRequest(r.id,false)} className="btn-press" style={{background:"transparent",color:C.red,border:`1px solid ${C.red}`,padding:"11px 16px",borderRadius:10,fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600}}>✕ RECHAZAR</button>
              </div>}
              {r.status==="accepted"&&r.fromPhone&&<div style={{marginTop:10,background:C.cyanDim,border:`1px solid ${C.cyanBdr}`,borderRadius:10,padding:12}}>
                <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.2em",color:C.cyan,marginBottom:4,fontWeight:600}}>📞 NÚMERO DE {r.fromName.toUpperCase()}</div>
                <div style={{fontFamily:F.bn,fontSize:22,color:C.cyan,letterSpacing:"0.04em"}}>{r.fromPhone||"(sin teléfono)"}</div>
              </div>}
            </div>)}
          </div>}
          {findMatchTab==="sent"&&<div>
            {myReqs.length===0?<div style={{padding:"40px 0",textAlign:"center"}}><div style={{fontSize:36,marginBottom:10}}>📤</div><Sub>No has mandado solicitudes.</Sub></div>:myReqs.map(r=>{const to=accounts.find(a=>a.id===r.toId);return <div key={r.id} style={{padding:14,background:C.surface,border:`0.5px solid ${C.borderS}`,borderRadius:12,marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <PA photo={to?.photo} avatar={to?.avatar||"?"} size={40}/>
                <div style={{flex:1}}><div style={{fontFamily:F.ios,fontSize:14,fontWeight:600,color:C.text}}>Para {r.toName}</div></div>
                {r.status==="accepted"&&<Chip type="green">✓ ACEPTÓ</Chip>}
                {r.status==="rejected"&&<Chip type="red">✕ RECHAZÓ</Chip>}
                {r.status==="pending"&&<Chip type="amber">PENDIENTE</Chip>}
              </div>
              <div style={{background:C.surface2,padding:10,borderRadius:8}}>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  <Chip type="cyan">🏟️ {r.club}</Chip>
                  <Chip>{r.when==="weekday"?"📅 Semana":"🎉 Finde"}</Chip>
                  <Chip>{r.time==="morning"?"☀️ Mañana":"🌙 Noche"}</Chip>
                </div>
              </div>
              {r.status==="accepted"&&to?.phone&&<div style={{marginTop:10,background:C.cyanDim,border:`1px solid ${C.cyanBdr}`,borderRadius:10,padding:12}}>
                <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.2em",color:C.cyan,marginBottom:4,fontWeight:600}}>📞 TELÉFONO DE {to.name.toUpperCase()}</div>
                <div style={{fontFamily:F.bn,fontSize:22,color:C.cyan,letterSpacing:"0.04em"}}>{to.phone}</div>
              </div>}
            </div>;})}
          </div>}
          <div style={{height:32}}/>
        </div>
        {matchReqModal&&<Modal onClose={()=>setMatchReqModal(null)}>
          <T size={24} style={{textAlign:"center",marginBottom:8}}>RETAR A {matchReqModal.toName?.toUpperCase()}</T>
          <Sub style={{textAlign:"center",marginBottom:18,fontSize:13}}>Configura tu invitación a jugar</Sub>
          <div style={{marginBottom:14}}><FL>Club preferido</FL><select value={newMatchReq.club} onChange={e=>setNewMatchReq({...newMatchReq,club:e.target.value})} style={{width:"100%",background:C.iosField,border:"none",borderRadius:12,padding:"13px 16px",color:C.text,fontFamily:F.ios,fontSize:16,outline:"none",cursor:"pointer"}}>{CLUBS.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
          <div style={{marginBottom:14}}><FL>¿Cuándo?</FL><Seg options={[{v:"weekday",l:"📅 Entre semana"},{v:"weekend",l:"🎉 Fin de semana"}]} value={newMatchReq.when} onChange={v=>setNewMatchReq({...newMatchReq,when:v})}/></div>
          <div style={{marginBottom:14}}><FL>Horario</FL><Seg options={[{v:"morning",l:"☀️ Mañana"},{v:"night",l:"🌙 Noche"}]} value={newMatchReq.time} onChange={v=>setNewMatchReq({...newMatchReq,time:v})}/></div>
          <div style={{marginBottom:14}}><FL>Mensaje (opcional)</FL><TI value={newMatchReq.msg} onChange={e=>setNewMatchReq({...newMatchReq,msg:e.target.value})} placeholder="¡Vamos a jugar este sábado!"/></div>
          <Sub style={{fontSize:12,color:C.amber,marginBottom:4}}>ℹ️ Si acepta, se compartirán sus números de celular para coordinar.</Sub>
          <BtnP onClick={()=>sendMatchRequest(matchReqModal.toId,newMatchReq)}>ENVIAR SOLICITUD</BtnP>
          <BtnX onClick={()=>setMatchReqModal(null)}>CANCELAR</BtnX>
        </Modal>}
        {phoneShare&&<Modal onClose={()=>setPhoneShare(null)} center>
          <div style={{textAlign:"center",marginBottom:18}}>
            <div style={{fontSize:48,marginBottom:10}}>🎾</div>
            <T size={26}>¡PARTIDO CONFIRMADO!</T>
            <Sub style={{marginTop:8}}>Comparte y coordina por teléfono</Sub>
          </div>
          <div style={{background:C.cyanDim,border:`1px solid ${C.cyanBdr}`,borderRadius:14,padding:16,marginBottom:10}}>
            <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.22em",color:C.cyan,marginBottom:6,fontWeight:600}}>📞 NÚMERO DE {phoneShare.with?.toUpperCase()}</div>
            <div style={{fontFamily:F.bn,fontSize:26,color:C.cyan,letterSpacing:"0.06em"}}>{phoneShare.phone}</div>
          </div>
          <div style={{background:C.surface2,border:`1px solid ${C.borderS}`,borderRadius:14,padding:16}}>
            <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.22em",color:C.muted,marginBottom:6,fontWeight:600}}>TU NÚMERO COMPARTIDO</div>
            <div style={{fontFamily:F.bn,fontSize:18,color:C.text,letterSpacing:"0.04em"}}>{phoneShare.myShared}</div>
          </div>
          <BtnP onClick={()=>setPhoneShare(null)}>¡A JUGAR! 🎾</BtnP>
        </Modal>}
      </div>
      <ShowTabBar/>
    </div>;
  }

  // COACH
  if(screen==="coach"){
    if(!isAdmin&&isMinor(user?.birthdate)){return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative"}}>
      <style>{STYLE}</style><Aurora intense={0.4}/>
      <div style={{position:"relative",zIndex:1}}><Nav/><Back to="find-hub" label="Find A"/>
        <div style={{padding:"40px 24px",textAlign:"center"}}><div style={{fontSize:48,marginBottom:12}}>🛡️</div><T size={28}>NO DISPONIBLE</T><Sub style={{marginTop:10,fontSize:14,lineHeight:1.5}}>No disponible para menores por seguridad.</Sub></div>
      </div>
      <ShowTabBar/>
    </div>;}
    const approvedCoaches=coachApplications.filter(c=>c.status==="approved");
    const myCoachApp=coachApplications.find(c=>c.playerId===user?.id);
    const incomingCoachReqs=coachRequests.filter(r=>r.coachPlayerId===user?.id);
    const myCoachReqs=coachRequests.filter(r=>r.playerId===user?.id);
    return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative"}}>
      <style>{STYLE}</style><Aurora intense={0.4}/>
      <div style={{position:"relative",zIndex:1}}>
        <Nav/>
        <Back to="find-hub" label="Find A"/>
        <div style={{padding:"14px 18px"}}>
          {/* Hero header Gen-Alpha */}
          <div style={{position:"relative",overflow:"hidden",borderRadius:20,background:`linear-gradient(135deg,#A78BFA 0%,#7C3AED 50%,#4FC3F7 100%)`,backgroundSize:"200% 200%",animation:"gradientShift 8s ease infinite",padding:"22px 20px",marginBottom:18}}>
            <div style={{position:"absolute",top:-30,right:-30,width:140,height:140,borderRadius:"50%",background:"rgba(255,255,255,0.10)",filter:"blur(20px)",animation:"floatSlow 7s ease-in-out infinite"}}/>
            <div style={{position:"absolute",bottom:-20,left:-20,width:100,height:100,borderRadius:"50%",background:"rgba(79,195,247,0.18)",filter:"blur(15px)",animation:"floatSlow 9s ease-in-out infinite reverse"}}/>
            <div style={{position:"relative",zIndex:1}}>
              <div style={{fontFamily:F.bc,fontSize:11,letterSpacing:"0.3em",color:"rgba(255,255,255,0.85)",fontWeight:700,marginBottom:6}}>FIND YOUR COACH</div>
              <div style={{fontFamily:F.bn,fontSize:34,color:"#fff",lineHeight:1,letterSpacing:"-0.02em",marginBottom:6,textShadow:"0 2px 12px rgba(0,0,0,0.2)"}}>COACH</div>
              <Sub style={{fontSize:13,color:"rgba(255,255,255,0.88)",marginTop:4}}>{approvedCoaches.length} coach{approvedCoaches.length!==1?"es":""} disponibles</Sub>
            </div>
          </div>
          {!isAdmin&&<>
            {!myCoachApp&&<button onClick={()=>{setCoachDraft({experience:"",specialties:[],bio:"",hourlyRate:"",availability:"",languages:["Español"]});setShowCoachApply(true);}} className="btn-press" style={{width:"100%",padding:"14px 18px",borderRadius:16,background:`linear-gradient(135deg,${C.cyanDeep},${C.cyanBright})`,border:"none",color:"#fff",fontFamily:F.ios,fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:14,display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 8px 24px rgba(2,136,209,0.35)",animation:"glowPulse 3s ease-in-out infinite"}}>🎾 SOLICITAR SER COACH</button>}
            {myCoachApp&&myCoachApp.status==="pending"&&<div style={{padding:"12px 16px",background:"rgba(255,159,10,0.10)",border:`1px solid rgba(255,159,10,0.35)`,borderRadius:14,marginBottom:14}}><div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.22em",color:C.amber,fontWeight:700,marginBottom:2}}>⏳ TU SOLICITUD COACH</div><Sub style={{fontSize:12}}>Pendiente de aprobación por el administrador.</Sub></div>}
            {myCoachApp&&myCoachApp.status==="approved"&&<div style={{padding:"12px 16px",background:"rgba(52,199,89,0.10)",border:`1px solid rgba(52,199,89,0.35)`,borderRadius:14,marginBottom:14,display:"flex",alignItems:"center",gap:10}}><div style={{fontSize:22}}>✓</div><div><div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.22em",color:C.green,fontWeight:700}}>ERES COACH SMT</div><Sub style={{fontSize:11,marginTop:2}}>Estás publicado · ${myCoachApp.hourlyRate}/hr</Sub></div></div>}
            {myCoachApp&&myCoachApp.status==="rejected"&&<div style={{padding:"12px 16px",background:"rgba(255,59,48,0.10)",border:`1px solid rgba(255,59,48,0.35)`,borderRadius:14,marginBottom:14}}><div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.22em",color:C.red,fontWeight:700,marginBottom:2}}>✕ SOLICITUD RECHAZADA</div><button onClick={()=>{setCoachApplications(prev=>prev.filter(x=>x.id!==myCoachApp.id));}} className="btn-press" style={{background:"transparent",border:"none",color:C.cyan,fontFamily:F.ios,fontSize:12,fontWeight:600,cursor:"pointer",padding:0,marginTop:6}}>Solicitar nuevamente →</button></div>}
            {/* Notificaciones */}
            {(incomingCoachReqs.filter(r=>r.status==="pending").length>0||myCoachReqs.filter(r=>r.status==="accepted").length>0)&&<div style={{padding:14,background:`linear-gradient(135deg,${C.cyanDim},rgba(167,139,250,0.10))`,border:`1px solid ${C.cyanBdr}`,borderRadius:14,marginBottom:14}}>
              {incomingCoachReqs.filter(r=>r.status==="pending").length>0&&<div style={{marginBottom:incomingCoachReqs.filter(r=>r.status!=="pending").length>0||myCoachReqs.length>0?12:0}}>
                <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.22em",color:C.cyan,fontWeight:700,marginBottom:8}}>📥 ALUMNOS INTERESADOS</div>
                {incomingCoachReqs.filter(r=>r.status==="pending").map(r=><div key={r.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`0.5px solid ${C.borderS}`}}>
                  <PA photo={r.playerPhoto} avatar={r.playerAvatar} size={32}/>
                  <div style={{flex:1,minWidth:0}}><div style={{fontFamily:F.ios,fontSize:13,color:C.text,fontWeight:600}}>{r.playerName}</div><Sub style={{fontSize:11}}>{COACH_FREQ.find(f=>f.v===r.frequency)?.l} · {r.when==="weekend"?"Fines de semana":r.when==="weekday"?"Entre semana":"Flexible"}</Sub></div>
                  <button onClick={()=>respondCoachRequest(r.id,true)} className="btn-press" style={{background:C.green,color:"#fff",border:"none",padding:"6px 11px",borderRadius:8,fontFamily:F.ios,fontSize:12,cursor:"pointer",fontWeight:600}}>✓</button>
                  <button onClick={()=>respondCoachRequest(r.id,false)} className="btn-press" style={{background:"transparent",color:C.red,border:`1px solid ${C.red}`,padding:"5px 9px",borderRadius:8,fontFamily:F.ios,fontSize:12,cursor:"pointer",fontWeight:600}}>✕</button>
                </div>)}
              </div>}
              {myCoachReqs.filter(r=>r.status==="accepted").length>0&&<div>
                <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.22em",color:C.green,fontWeight:700,marginBottom:8}}>✓ COACHES ACEPTARON</div>
                {myCoachReqs.filter(r=>r.status==="accepted").map(r=><div key={r.id} onClick={()=>setCoachContactShare({coachName:r.coachName,coachPhone:r.coachPhone||"—",playerName:user.name,playerPhone:user.phone||"—",hourlyRate:r.coachHourlyRate,frequency:r.frequency})} className="tap-row" style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",cursor:"pointer"}}>
                  <div style={{fontSize:18}}>📞</div>
                  <div style={{flex:1,minWidth:0}}><div style={{fontFamily:F.ios,fontSize:13,color:C.text,fontWeight:600}}>{r.coachName}</div><Sub style={{fontSize:11}}>Toca para ver contacto</Sub></div>
                  <span style={{color:C.muted,fontSize:18}}>›</span>
                </div>)}
              </div>}
            </div>}
          </>}
          {/* Lista de coaches */}
          {approvedCoaches.length===0?<div style={{padding:"60px 0",textAlign:"center"}}><div style={{fontSize:48,marginBottom:14}}>🎾</div><Sub style={{fontSize:14}}>Aún no hay coaches disponibles.</Sub>{!myCoachApp&&!isAdmin&&<Sub style={{fontSize:13,marginTop:8,color:C.cyan}}>¡Sé el primer coach SMT!</Sub>}</div>:<div style={{display:"flex",flexDirection:"column",gap:12}}>
            {approvedCoaches.map((coach,i)=><div key={coach.id} style={{position:"relative",background:`linear-gradient(135deg,rgba(167,139,250,0.06),${C.surface})`,border:`1px solid rgba(167,139,250,0.20)`,borderRadius:18,padding:14,overflow:"hidden",animation:`scaleIn 0.4s ${i*0.05}s backwards`}}>
              <div style={{position:"absolute",top:-20,right:-20,width:100,height:100,borderRadius:"50%",background:"radial-gradient(circle,rgba(167,139,250,0.18),transparent 70%)",pointerEvents:"none"}}/>
              <div style={{display:"flex",gap:12,marginBottom:10,position:"relative"}}>
                <PA photo={coach.playerPhoto} avatar={coach.playerAvatar} size={64} border={`2px solid rgba(167,139,250,0.5)`}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                    <div style={{fontFamily:F.ios,fontSize:16,color:C.text,fontWeight:700}}>{coach.playerName}</div>
                    <div style={{background:"rgba(167,139,250,0.18)",border:"1px solid rgba(167,139,250,0.4)",padding:"2px 7px",borderRadius:6,fontFamily:F.bc,fontSize:8,letterSpacing:"0.18em",color:"#C4B5FD",fontWeight:700}}>COACH</div>
                  </div>
                  <Sub style={{fontSize:11}}>{coach.playerCity} · {coach.playerCategory||"—"} · {coach.experience}</Sub>
                  <div style={{display:"flex",alignItems:"baseline",gap:4,marginTop:4}}>
                    <div style={{fontFamily:F.bn,fontSize:22,color:"#C4B5FD",letterSpacing:"-0.01em"}}>${coach.hourlyRate}</div>
                    <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.18em",color:C.muted,fontWeight:600}}>MXN / HR</div>
                  </div>
                </div>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>{coach.specialties.slice(0,4).map(s=><span key={s} style={{fontFamily:F.ios,fontSize:10,padding:"3px 8px",borderRadius:8,background:"rgba(167,139,250,0.12)",color:"#C4B5FD",border:"1px solid rgba(167,139,250,0.25)",fontWeight:500}}>{s}</span>)}{coach.specialties.length>4&&<span style={{fontFamily:F.ios,fontSize:10,padding:"3px 8px",borderRadius:8,color:C.muted}}>+{coach.specialties.length-4}</span>}</div>
              <Sub style={{fontSize:12,lineHeight:1.5,marginBottom:12,color:C.text,opacity:0.85}}>"{coach.bio.length>140?coach.bio.slice(0,140)+"…":coach.bio}"</Sub>
              {coach.playerId!==user?.id&&!isAdmin&&(()=>{const myReq=coachRequests.find(r=>r.coachAppId===coach.id&&r.playerId===user?.id);if(myReq?.status==="pending")return <div style={{padding:"10px 14px",background:"rgba(255,159,10,0.10)",border:`1px solid rgba(255,159,10,0.30)`,borderRadius:10,textAlign:"center",fontFamily:F.bc,fontSize:10,letterSpacing:"0.2em",color:C.amber,fontWeight:700}}>⏳ SOLICITUD ENVIADA</div>;if(myReq?.status==="accepted")return <button onClick={()=>setCoachContactShare({coachName:coach.playerName,coachPhone:coach.playerPhone,playerName:user.name,playerPhone:user.phone||"—",hourlyRate:coach.hourlyRate,frequency:myReq.frequency})} className="btn-press" style={{width:"100%",padding:"11px",borderRadius:12,background:`linear-gradient(135deg,${C.green},#2EA84C)`,border:"none",color:"#fff",fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600}}>✓ VER CONTACTO</button>;if(myReq?.status==="rejected")return <div style={{padding:"10px 14px",background:"rgba(255,59,48,0.10)",border:`1px solid rgba(255,59,48,0.30)`,borderRadius:10,textAlign:"center",fontFamily:F.bc,fontSize:10,letterSpacing:"0.2em",color:C.red,fontWeight:700}}>✕ SOLICITUD RECHAZADA</div>;return <button onClick={()=>{setCoachRequestForm({frequency:"weekly",when:"weekend",time:"morning",msg:""});setShowCoachRequest(coach);}} className="btn-press" style={{width:"100%",padding:"11px",borderRadius:12,background:`linear-gradient(135deg,#A78BFA,#7C3AED)`,border:"none",color:"#fff",fontFamily:F.ios,fontSize:13,cursor:"pointer",fontWeight:600,boxShadow:"0 4px 14px rgba(124,58,237,0.35)"}}>🎾 SOLICITAR ENTRENAR</button>;})()}
              {coach.playerId===user?.id&&<div style={{padding:"8px 14px",background:C.cyanDim,border:`1px solid ${C.cyanBdr}`,borderRadius:10,fontFamily:F.bc,fontSize:10,letterSpacing:"0.18em",color:C.cyan,fontWeight:600,textAlign:"center"}}>ESTE ERES TÚ</div>}
              {isAdmin&&<button onClick={()=>{if(confirm("¿Eliminar este coach?")){setCoachApplications(prev=>prev.filter(x=>x.id!==coach.id));}}} className="btn-press" style={{position:"absolute",top:10,right:10,background:"rgba(255,59,48,0.85)",color:"#fff",border:"none",width:26,height:26,borderRadius:13,cursor:"pointer",fontSize:13,fontWeight:700}}>✕</button>}
            </div>)}
          </div>}
          <div style={{height:32}}/>
          <TabSpacer/>
        </div>
        {showCoachApply&&<Modal onClose={()=>setShowCoachApply(false)} large center>
          <T size={22} style={{textAlign:"center",marginBottom:6}}>SOLICITAR SER COACH</T>
          <Sub style={{textAlign:"center",marginBottom:18,fontSize:13}}>El admin revisará tu solicitud</Sub>
          <FL>Años de experiencia *</FL>
          <Seg options={["< 1 año","1-3 años","3-5 años","5-10 años","10+ años"]} value={coachDraft.experience} onChange={v=>setCoachDraft({...coachDraft,experience:v})} style={{marginBottom:14}}/>
          <FL>Especialidades * (selecciona al menos una)</FL>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>{COACH_SPECIALTIES.map(s=>{const sel=coachDraft.specialties.includes(s);return <button key={s} onClick={()=>setCoachDraft({...coachDraft,specialties:sel?coachDraft.specialties.filter(x=>x!==s):[...coachDraft.specialties,s]})} className="btn-press" style={{padding:"6px 12px",borderRadius:18,border:sel?`2px solid #A78BFA`:`1px solid ${C.borderS}`,background:sel?"rgba(167,139,250,0.18)":"transparent",color:sel?"#C4B5FD":C.muted,fontFamily:F.ios,fontSize:12,cursor:"pointer",fontWeight:600,transition:"all 0.2s"}}>{s}</button>;})}</div>
          <FL>Biografía corta *</FL>
          <textarea value={coachDraft.bio} onChange={e=>setCoachDraft({...coachDraft,bio:e.target.value})} placeholder="Cuéntales a los alumnos sobre tu estilo, logros y método..." rows={3} style={{width:"100%",background:C.iosField,border:"none",borderRadius:12,padding:"13px 16px",color:C.text,fontFamily:F.ios,fontSize:15,outline:"none",resize:"vertical",marginBottom:14}}/>
          <FL>Tarifa por hora (MXN) *</FL>
          <TI type="number" value={coachDraft.hourlyRate} onChange={e=>setCoachDraft({...coachDraft,hourlyRate:e.target.value})} placeholder="500"/>
          <div style={{height:12}}/>
          <FL>Disponibilidad (opcional)</FL>
          <TI value={coachDraft.availability} onChange={e=>setCoachDraft({...coachDraft,availability:e.target.value})} placeholder="Lunes a viernes 6am-10am y fines de semana"/>
          <BtnP onClick={submitCoachApplication}>ENVIAR SOLICITUD</BtnP>
          <BtnX onClick={()=>setShowCoachApply(false)}>CANCELAR</BtnX>
        </Modal>}
        {showCoachRequest&&<Modal onClose={()=>setShowCoachRequest(null)} center>
          <T size={22} style={{textAlign:"center",marginBottom:6}}>SOLICITAR COACH</T>
          <div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",background:`linear-gradient(135deg,rgba(167,139,250,0.10),${C.surface2})`,border:`1px solid rgba(167,139,250,0.30)`,borderRadius:12,marginBottom:16}}>
            <PA photo={showCoachRequest.playerPhoto} avatar={showCoachRequest.playerAvatar} size={42}/>
            <div style={{flex:1}}><div style={{fontFamily:F.ios,fontSize:14,color:C.text,fontWeight:600}}>{showCoachRequest.playerName}</div><div style={{fontFamily:F.bn,fontSize:18,color:"#C4B5FD",marginTop:2}}>${showCoachRequest.hourlyRate} <span style={{fontSize:11,color:C.muted}}>/ hr</span></div></div>
          </div>
          <FL>Frecuencia deseada</FL>
          <Seg options={COACH_FREQ} value={coachRequestForm.frequency} onChange={v=>setCoachRequestForm({...coachRequestForm,frequency:v})} style={{marginBottom:14}}/>
          <FL>¿Cuándo?</FL>
          <Seg options={[{v:"weekday",l:"Entre semana"},{v:"weekend",l:"Fin de semana"},{v:"flexible",l:"Flexible"}]} value={coachRequestForm.when} onChange={v=>setCoachRequestForm({...coachRequestForm,when:v})} style={{marginBottom:14}}/>
          <FL>Horario preferido</FL>
          <Seg options={[{v:"morning",l:"Mañana"},{v:"afternoon",l:"Tarde"},{v:"night",l:"Noche"}]} value={coachRequestForm.time} onChange={v=>setCoachRequestForm({...coachRequestForm,time:v})} style={{marginBottom:14}}/>
          <FL>Mensaje (opcional)</FL>
          <textarea value={coachRequestForm.msg} onChange={e=>setCoachRequestForm({...coachRequestForm,msg:e.target.value})} placeholder="Cuéntale tu nivel actual y en qué te gustaría mejorar..." rows={3} style={{width:"100%",background:C.iosField,border:"none",borderRadius:12,padding:"13px 16px",color:C.text,fontFamily:F.ios,fontSize:15,outline:"none",resize:"vertical"}}/>
          <BtnP onClick={()=>requestCoachSession(showCoachRequest.id)}>ENVIAR SOLICITUD</BtnP>
          <BtnX onClick={()=>setShowCoachRequest(null)}>CANCELAR</BtnX>
        </Modal>}
        {coachContactShare&&<Modal onClose={()=>setCoachContactShare(null)} center>
          <div style={{textAlign:"center",marginBottom:18}}>
            <div style={{fontSize:48,marginBottom:10}}>🎾</div>
            <T size={24}>¡COACH CONFIRMADO!</T>
            <Sub style={{marginTop:8}}>Contáctense para agendar sesión</Sub>
          </div>
          <div style={{background:"rgba(167,139,250,0.12)",border:"1px solid rgba(167,139,250,0.30)",borderRadius:10,padding:12,marginBottom:14,textAlign:"center"}}>
            <Sub style={{fontSize:11,letterSpacing:"0.18em",fontWeight:600}}>{COACH_FREQ.find(f=>f.v===coachContactShare.frequency)?.l?.toUpperCase()} · ${coachContactShare.hourlyRate} / HR</Sub>
          </div>
          <div style={{background:`linear-gradient(135deg,rgba(167,139,250,0.15),rgba(124,58,237,0.10))`,border:`1px solid rgba(167,139,250,0.35)`,borderRadius:14,padding:14,marginBottom:10}}>
            <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.22em",color:"#C4B5FD",marginBottom:4,fontWeight:600}}>🎾 COACH</div>
            <div style={{fontFamily:F.ios,fontSize:15,color:C.text,fontWeight:600,marginBottom:6}}>{coachContactShare.coachName}</div>
            <div style={{fontFamily:F.bn,fontSize:22,color:"#C4B5FD",letterSpacing:"0.04em"}}>📞 {coachContactShare.coachPhone}</div>
          </div>
          <div style={{background:`rgba(52,199,89,0.12)`,border:`1px solid rgba(52,199,89,0.35)`,borderRadius:14,padding:14}}>
            <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.22em",color:C.green,marginBottom:4,fontWeight:600}}>👤 ALUMNO</div>
            <div style={{fontFamily:F.ios,fontSize:15,color:C.text,fontWeight:600,marginBottom:6}}>{coachContactShare.playerName}</div>
            <div style={{fontFamily:F.bn,fontSize:22,color:C.green,letterSpacing:"0.04em"}}>📞 {coachContactShare.playerPhone}</div>
          </div>
          <BtnP onClick={()=>setCoachContactShare(null)}>¡A ENTRENAR! 🎾</BtnP>
        </Modal>}
      </div>
      <ShowTabBar/>
    </div>;
  }

  // MARKETPLACE
  if(screen==="marketplace"){
    // PROTECCIÓN DE MENORES
    if(!isAdmin&&isMinor(user?.birthdate)){return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative"}}>
      <style>{STYLE}</style><Aurora intense={0.4}/>
      <div style={{position:"relative",zIndex:1}}><Nav/><Back to="home" label="Home"/>
        <div style={{padding:"40px 24px",textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:12}}>🛡️</div>
          <T size={28}>NO DISPONIBLE</T>
          <Sub style={{marginTop:10,fontSize:14,lineHeight:1.5}}>Esta sección no está disponible para menores de edad por seguridad.</Sub>
        </div>
      </div>
    </div>;}
    const filtered=mpFilter==="Todos"?marketplace:marketplace.filter(l=>l.category===mpFilter);
    const incomingPur=purchaseRequests.filter(p=>p.sellerId===user?.id);
    const myPur=purchaseRequests.filter(p=>p.buyerId===user?.id);
    return <div key={screen} className="screen-fade" style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F.ios,position:"relative"}}>
      <style>{STYLE}</style><Aurora intense={0.4}/>
      <div style={{position:"relative",zIndex:1}}>
        <Nav/>
        {!mpDetail?<>
          <Back to="home" label="Home"/>
          <div style={{padding:"14px 18px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div><T size={32}>MARKETPLACE</T><Sub style={{marginTop:4}}>Compra y venta entre jugadores</Sub></div>
              {!isAdmin&&<BtnG onClick={()=>{setMpDraft({title:"",category:"Raqueta",price:"",condition:"Nuevo",description:"",images:[]});setMpScanResult(null);setMpModal(true);}}>＋ VENDER</BtnG>}
            </div>
            {(incomingPur.length>0||myPur.length>0)&&<div style={{margin:"14px 0 6px",background:`linear-gradient(135deg,rgba(79,195,247,0.10),rgba(2,136,209,0.05))`,border:`1px solid ${C.cyanBdr}`,borderRadius:12,padding:12}}>
              {incomingPur.filter(p=>p.status==="pending").length>0&&<div style={{marginBottom:incomingPur.filter(p=>p.status!=="pending").length>0||myPur.length>0?12:0}}>
                <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.2em",color:C.cyan,fontWeight:700,marginBottom:8}}>📥 SOLICITUDES DE COMPRA</div>
                {incomingPur.filter(p=>p.status==="pending").map(p=><div key={p.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`0.5px solid ${C.borderS}`}}>
                  <PA photo={p.buyerPhoto} avatar={p.buyerAvatar} size={32}/>
                  <div style={{flex:1,minWidth:0}}><div style={{fontFamily:F.ios,fontSize:13,color:C.text,fontWeight:600}}>{p.buyerName}</div><Sub style={{fontSize:11,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.title} · ${p.price.toLocaleString()}</Sub></div>
                  <button onClick={()=>respondPurchase(p.id,true)} className="btn-press" style={{background:C.green,color:"#fff",border:"none",padding:"6px 11px",borderRadius:8,fontFamily:F.ios,fontSize:12,cursor:"pointer",fontWeight:600}}>✓</button>
                  <button onClick={()=>respondPurchase(p.id,false)} className="btn-press" style={{background:"transparent",color:C.red,border:`1px solid ${C.red}`,padding:"5px 9px",borderRadius:8,fontFamily:F.ios,fontSize:12,cursor:"pointer",fontWeight:600}}>✕</button>
                </div>)}
              </div>}
              {myPur.filter(p=>p.status==="accepted").length>0&&<div>
                <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.2em",color:C.green,fontWeight:700,marginBottom:8}}>✓ COMPRAS ACEPTADAS</div>
                {myPur.filter(p=>p.status==="accepted").map(p=><div key={p.id} onClick={()=>setMpContactShare({buyerName:user.name,buyerPhone:user.phone||"—",sellerName:p.sellerName,sellerPhone:p.sellerPhone||"—",title:p.title,price:p.price})} className="tap-row" style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",cursor:"pointer"}}>
                  <div style={{fontSize:18}}>📞</div>
                  <div style={{flex:1,minWidth:0}}><div style={{fontFamily:F.ios,fontSize:13,color:C.text,fontWeight:600}}>{p.title}</div><Sub style={{fontSize:11}}>{p.sellerName} aceptó · Toca para ver contacto</Sub></div>
                  <span style={{color:C.muted,fontSize:18}}>›</span>
                </div>)}
              </div>}
            </div>}
            <div style={{display:"flex",gap:6,margin:"14px 0",overflowX:"auto",paddingBottom:6}}>
              {["Todos",...MP_CATS].map(c=><button key={c} onClick={()=>setMpFilter(c)} className="btn-press" style={{padding:"7px 14px",borderRadius:20,border:mpFilter===c?`2px solid ${C.cyan}`:`1px solid ${C.borderS}`,background:mpFilter===c?C.cyanDim:"transparent",color:mpFilter===c?C.cyan:C.muted,fontFamily:F.ios,fontSize:12,cursor:"pointer",whiteSpace:"nowrap",fontWeight:600}}>{c}</button>)}
            </div>
            {filtered.length===0?<div style={{padding:"60px 0",textAlign:"center"}}><div style={{fontSize:48,marginBottom:14}}>🛒</div><Sub style={{fontSize:14,marginBottom:4}}>{marketplace.length===0?"Sin productos a la venta todavía.":"Sin productos en esta categoría."}</Sub>{marketplace.length===0&&!isAdmin&&<Sub style={{fontSize:13,marginTop:8,color:C.cyan}}>¡Sé el primero en publicar!</Sub>}</div>:<div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
              {filtered.map((l,i)=><div key={l.id} onClick={()=>setMpDetail(l.id)} className="btn-press" style={{background:C.surface,border:`0.5px solid ${C.borderS}`,borderRadius:12,overflow:"hidden",cursor:"pointer",animation:`scaleIn 0.4s ${i*0.05}s backwards`}}>
                <div style={{aspectRatio:"1",position:"relative",background:"#000",overflow:"hidden"}}>
                  <img src={l.images[0]} style={{width:"100%",height:"100%",objectFit:"cover",animation:"breathSubtle 7s infinite"}} alt=""/>
                  <div style={{position:"absolute",top:6,left:6,background:"rgba(0,0,0,0.75)",padding:"3px 8px",borderRadius:6,fontFamily:F.bc,fontSize:9,letterSpacing:"0.16em",color:C.cyan,fontWeight:700}}>{l.category.toUpperCase()}</div>
                  {l.images.length>1&&<div style={{position:"absolute",bottom:6,right:6,background:"rgba(0,0,0,0.75)",padding:"2px 7px",borderRadius:5,fontFamily:F.ios,fontSize:10,color:"#fff",fontWeight:600}}>📷 {l.images.length}</div>}
                  {l.sellerId===user?.id&&<div style={{position:"absolute",bottom:6,left:6,background:"rgba(79,195,247,0.95)",padding:"3px 8px",borderRadius:6,fontFamily:F.bc,fontSize:9,letterSpacing:"0.14em",color:"#fff",fontWeight:700}}>TUYO</div>}
                </div>
                <div style={{padding:"10px 12px"}}>
                  <div style={{fontFamily:F.ios,fontSize:13,fontWeight:600,color:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",marginBottom:4}}>{l.title}</div>
                  <div style={{fontFamily:F.bn,fontSize:20,color:C.cyan,letterSpacing:"0.02em"}}>${l.price.toLocaleString()}</div>
                  <Sub style={{fontSize:10,marginTop:2}}>{l.condition} · {l.sellerCity}</Sub>
                </div>
              </div>)}
            </div>}
            <div style={{height:32}}/>
          </div>
        </>:(()=>{const l=marketplace.find(x=>x.id===mpDetail);if(!l){setMpDetail(null);return null;}const myReq=purchaseRequests.find(p=>p.listingId===l.id&&p.buyerId===user?.id);return <>
          <button onClick={()=>setMpDetail(null)} className="btn-press" style={{background:"none",border:"none",color:C.cyan,fontFamily:F.ios,fontSize:15,fontWeight:500,cursor:"pointer",padding:"14px 16px 0"}}>← Marketplace</button>
          <div style={{padding:"10px 0 0"}}>
            <div style={{position:"relative",overflowX:"auto",scrollSnapType:"x mandatory",display:"flex",gap:8,padding:"0 16px"}}>
              {l.images.map((img,idx)=><div key={idx} style={{flex:"0 0 100%",scrollSnapAlign:"start",aspectRatio:"1",borderRadius:14,overflow:"hidden",background:"#000",border:`0.5px solid ${C.borderS}`}}><img src={img} style={{width:"100%",height:"100%",objectFit:"cover",animation:"breathSubtle 8s infinite"}} alt=""/></div>)}
            </div>
            <div style={{padding:"16px 18px"}}>
              <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
                <Chip type="cyan">{l.category}</Chip>
                <Chip>{l.condition}</Chip>
                <Chip>📍 {l.sellerCity}</Chip>
              </div>
              <T size={28} style={{marginBottom:6}}>{l.title}</T>
              <div style={{fontFamily:F.bn,fontSize:42,color:C.cyan,letterSpacing:"0.04em",marginBottom:14}}>${l.price.toLocaleString()} <span style={{fontSize:18,color:C.muted}}>MXN</span></div>
              {l.description&&<div style={{padding:"12px 14px",background:C.surface,border:`0.5px solid ${C.borderS}`,borderRadius:10,marginBottom:14,fontFamily:F.ios,fontSize:14,color:C.text,lineHeight:1.5,whiteSpace:"pre-wrap"}}>{l.description}</div>}
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",background:C.surface,borderRadius:12,border:`0.5px solid ${C.borderS}`,marginBottom:14,cursor:"pointer"}} onClick={()=>{const s=accounts.find(a=>a.id===l.sellerId);if(s){setViewP(s);setScreen("player-card");}}}>
                <PA photo={l.sellerPhoto} avatar={l.sellerAvatar} size={44}/>
                <div style={{flex:1}}><div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.2em",color:C.muted,fontWeight:600}}>VENDEDOR</div><div style={{fontFamily:F.ios,fontSize:15,color:C.text,fontWeight:600,marginTop:2}}>{l.sellerName}</div></div>
                <span style={{color:C.muted,fontSize:20}}>›</span>
              </div>
              {l.sellerId===user?.id?<>
                <div style={{padding:"12px 14px",background:C.cyanDim,border:`1px solid ${C.cyanBdr}`,borderRadius:10,marginBottom:10,fontFamily:F.ios,fontSize:13,color:C.cyan,textAlign:"center",fontWeight:600}}>Este es tu producto</div>
                <button onClick={()=>deleteListing(l.id)} className="btn-press" style={{width:"100%",background:"transparent",color:C.red,border:`1px solid ${C.red}`,padding:13,borderRadius:12,fontFamily:F.ios,fontSize:14,cursor:"pointer",fontWeight:600}}>✕ ELIMINAR PUBLICACIÓN</button>
              </>:(isAdmin?<button onClick={()=>deleteListing(l.id)} className="btn-press" style={{width:"100%",background:"transparent",color:C.red,border:`1px solid ${C.red}`,padding:13,borderRadius:12,fontFamily:F.ios,fontSize:14,cursor:"pointer",fontWeight:600}}>✕ ELIMINAR (ADMIN)</button>:(myReq?(myReq.status==="pending"?<div style={{padding:"14px 18px",background:"rgba(255,159,10,0.12)",border:`1px solid rgba(255,159,10,0.4)`,borderRadius:12,textAlign:"center"}}>
                <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.2em",color:C.amber,fontWeight:700}}>⏳ SOLICITUD ENVIADA</div>
                <Sub style={{fontSize:12,marginTop:4}}>Esperando respuesta de {l.sellerName}</Sub>
              </div>:myReq.status==="accepted"?<div style={{padding:"14px 18px",background:"rgba(52,199,89,0.12)",border:`1px solid rgba(52,199,89,0.4)`,borderRadius:12,cursor:"pointer"}} onClick={()=>setMpContactShare({buyerName:user.name,buyerPhone:user.phone||"—",sellerName:l.sellerName,sellerPhone:l.sellerPhone||"—",title:l.title,price:l.price})}>
                <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.2em",color:C.green,fontWeight:700,textAlign:"center"}}>✓ COMPRA ACEPTADA</div>
                <div style={{fontFamily:F.ios,fontSize:14,color:C.text,marginTop:6,fontWeight:600,textAlign:"center"}}>Toca para ver contacto del vendedor</div>
              </div>:<div style={{padding:"14px 18px",background:"rgba(255,59,48,0.12)",border:`1px solid rgba(255,59,48,0.4)`,borderRadius:12,textAlign:"center"}}>
                <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.2em",color:C.red,fontWeight:700}}>✕ SOLICITUD RECHAZADA</div>
              </div>):<BtnP onClick={()=>requestPurchase(l.id)}>🛒 SOLICITAR COMPRA</BtnP>))}
            </div>
            <div style={{height:32}}/>
          </div>
        </>;})()}
        {mpModal&&<Modal onClose={()=>{if(!mpScanning)setMpModal(false);}} large>
          <T size={22} style={{textAlign:"center",marginBottom:8}}>VENDER PRODUCTO</T>
          <Sub style={{textAlign:"center",marginBottom:14,fontSize:13}}>Solo equipo deportivo · Sin contenido humano</Sub>
          <div style={{background:"rgba(255,59,48,0.10)",border:`1px solid rgba(255,59,48,0.35)`,borderRadius:10,padding:10,marginBottom:14}}>
            <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.18em",color:C.red,fontWeight:700,marginBottom:4}}>⚠️ POLÍTICA DE CONTENIDO</div>
            <Sub style={{fontSize:11,lineHeight:1.5}}>Solo se permiten fotos de <b style={{color:C.text}}>raquetas, ropa, calzado o equipo deportivo</b>. Imágenes con personas serán rechazadas automáticamente. <b style={{color:C.red}}>Dos intentos = expulsión permanente.</b></Sub>
            {mpStrikes[user.id]>0&&<div style={{marginTop:8,padding:"6px 10px",background:"rgba(255,159,10,0.15)",borderRadius:6,fontFamily:F.bc,fontSize:10,letterSpacing:"0.15em",color:C.amber,fontWeight:700}}>⚠️ ADVERTENCIA ACTIVA: {mpStrikes[user.id]}/2 STRIKES</div>}
          </div>
          <FL>Fotos del producto * (hasta 4)</FL>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:14}}>
            {mpDraft.images.map((img,i)=><div key={i} style={{position:"relative",aspectRatio:"1",borderRadius:8,overflow:"hidden",border:`1px solid ${C.cyanBdr}`,background:"#000"}}>
              <img src={img} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>
              <button onClick={()=>setMpDraft(prev=>({...prev,images:prev.images.filter((_,j)=>j!==i)}))} className="btn-press" style={{position:"absolute",top:2,right:2,background:"rgba(255,59,48,0.95)",color:"#fff",border:"none",width:20,height:20,borderRadius:10,cursor:"pointer",fontSize:10,fontWeight:700}}>✕</button>
            </div>)}
            {mpDraft.images.length<4&&<label htmlFor="mpImgUp" style={{cursor:mpScanning?"wait":"pointer",aspectRatio:"1",border:`2px dashed ${C.cyanBdr}`,borderRadius:8,background:C.iosField,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",opacity:mpScanning?0.5:1}}>
              <div style={{fontSize:24}}>{mpScanning?"🔍":"📷"}</div>
              <Sub style={{fontSize:9,marginTop:4,letterSpacing:"0.1em",fontFamily:F.bc}}>{mpScanning?"ESCANEANDO":"AÑADIR"}</Sub>
            </label>}
            <input id="mpImgUp" type="file" accept="image/*" style={{position:"absolute",left:-9999,opacity:0,width:1,height:1}} onChange={handleMpImageUpload} disabled={mpScanning}/>
          </div>
          {mpScanResult&&mpScanResult.rejected&&<div style={{padding:14,background:"rgba(255,59,48,0.15)",border:`1px solid ${C.red}`,borderRadius:10,marginBottom:14}}>
            <div style={{fontFamily:F.bc,fontSize:11,letterSpacing:"0.2em",color:C.red,fontWeight:700,marginBottom:6}}>⛔ IMAGEN RECHAZADA</div>
            <Sub style={{fontSize:12,color:C.text,lineHeight:1.5}}>Detectamos posible contenido humano en tu imagen. Solo se permiten productos deportivos.<br/><br/><b style={{color:C.red}}>Strike {mpScanResult.strikes}/2</b>. {mpScanResult.strikes>=2?"Tu cuenta será suspendida ahora.":"Si vuelves a intentar subir contenido inapropiado, tu cuenta será suspendida permanentemente."}</Sub>
          </div>}
          {mpScanResult&&!mpScanResult.rejected&&<div style={{padding:10,background:"rgba(52,199,89,0.15)",border:`1px solid rgba(52,199,89,0.4)`,borderRadius:10,marginBottom:14,fontFamily:F.bc,fontSize:11,letterSpacing:"0.16em",color:C.green,fontWeight:700,textAlign:"center"}}>✓ IMAGEN APROBADA</div>}
          <FL>Título *</FL><TI value={mpDraft.title} onChange={e=>setMpDraft({...mpDraft,title:e.target.value})} placeholder="Wilson Pro Staff 97 v14"/>
          <div style={{height:12}}/>
          <FL>Categoría</FL>
          <select value={mpDraft.category} onChange={e=>setMpDraft({...mpDraft,category:e.target.value})} style={{width:"100%",background:C.iosField,border:"none",borderRadius:12,padding:"13px 16px",color:C.text,fontFamily:F.ios,fontSize:16,outline:"none",cursor:"pointer",marginBottom:12,WebkitAppearance:"none",MozAppearance:"none",appearance:"none",backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='%234FC3F7' stroke-width='2' fill='none' stroke-linecap='round'/></svg>")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 16px center",paddingRight:42}}>{MP_CATS.map(c=><option key={c} value={c} style={{background:C.surface,color:C.text}}>{c}</option>)}</select>
          <FL>Estado del producto</FL>
          <Seg options={MP_COND} value={mpDraft.condition} onChange={v=>setMpDraft({...mpDraft,condition:v})} style={{marginBottom:12}}/>
          <FL>Precio (MXN) *</FL><TI type="number" value={mpDraft.price} onChange={e=>setMpDraft({...mpDraft,price:e.target.value})} placeholder="3500"/>
          <div style={{height:12}}/>
          <FL>Descripción (opcional)</FL>
          <textarea value={mpDraft.description} onChange={e=>setMpDraft({...mpDraft,description:e.target.value})} placeholder="Detalles del producto, tiempo de uso, motivo de venta..." rows={3} style={{width:"100%",background:C.iosField,border:"none",borderRadius:12,padding:"13px 16px",color:C.text,fontFamily:F.ios,fontSize:15,outline:"none",resize:"vertical"}}/>
          <BtnP onClick={submitMpListing}>PUBLICAR PRODUCTO</BtnP>
          <BtnX onClick={()=>setMpModal(false)}>CANCELAR</BtnX>
        </Modal>}
        {mpContactShare&&<Modal onClose={()=>setMpContactShare(null)} center>
          <div style={{textAlign:"center",marginBottom:18}}>
            <div style={{fontSize:48,marginBottom:10}}>🤝</div>
            <T size={24}>COMPRA CONFIRMADA</T>
            <Sub style={{marginTop:8}}>Coordina la entrega por teléfono</Sub>
          </div>
          <div style={{background:C.surface2,border:`0.5px solid ${C.borderS}`,borderRadius:10,padding:12,marginBottom:14}}>
            <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.2em",color:C.muted,fontWeight:600,marginBottom:2}}>PRODUCTO</div>
            <div style={{fontFamily:F.ios,fontSize:15,color:C.text,fontWeight:600}}>{mpContactShare.title}</div>
            <div style={{fontFamily:F.bn,fontSize:22,color:C.cyan,marginTop:4}}>${mpContactShare.price.toLocaleString()} MXN</div>
          </div>
          <div style={{background:C.cyanDim,border:`1px solid ${C.cyanBdr}`,borderRadius:14,padding:14,marginBottom:10}}>
            <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.22em",color:C.cyan,marginBottom:4,fontWeight:600}}>👤 VENDEDOR</div>
            <div style={{fontFamily:F.ios,fontSize:15,color:C.text,fontWeight:600,marginBottom:6}}>{mpContactShare.sellerName}</div>
            <div style={{fontFamily:F.bn,fontSize:22,color:C.cyan,letterSpacing:"0.04em"}}>📞 {mpContactShare.sellerPhone}</div>
          </div>
          <div style={{background:`rgba(52,199,89,0.12)`,border:`1px solid rgba(52,199,89,0.35)`,borderRadius:14,padding:14}}>
            <div style={{fontFamily:F.bc,fontSize:10,letterSpacing:"0.22em",color:C.green,marginBottom:4,fontWeight:600}}>🛒 COMPRADOR</div>
            <div style={{fontFamily:F.ios,fontSize:15,color:C.text,fontWeight:600,marginBottom:6}}>{mpContactShare.buyerName}</div>
            <div style={{fontFamily:F.bn,fontSize:22,color:C.green,letterSpacing:"0.04em"}}>📞 {mpContactShare.buyerPhone}</div>
          </div>
          <BtnP onClick={()=>setMpContactShare(null)}>ENTENDIDO 🤝</BtnP>
        </Modal>}
      </div>
      <ShowTabBar/>
    </div>;
  }

  return null;
}
