"use strict";
/* Fen Bilimleri 7 Oyunları · Science drawings for the Öğren lessons, sequence/card scenes, and the ordering and sorting games */
/* ================= helpers ================= */
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
/* break a label into lines of about n characters (SVG text does not wrap by itself) */
function wrapT(t,n){const w=String(t).split(/\s+/),L=[];let c='';for(const x of w){if(c&&(c+' '+x).length>n){L.push(c);c=x}else c=c?c+' '+x:x}if(c)L.push(c);return L}
function tspans(x,lines,dy){return lines.map((l,i)=>`<tspan x="${x}" dy="${i?dy:0}">${esc(l)}</tspan>`).join('')}
const PL=(x,y,t,a='middle',cls='pl')=>`<text x="${x}" y="${y}" text-anchor="${a}" class="${cls}">${esc(t)}</text>`;
const LEAD=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="pl-lead"/>`;
const ARW=(x1,y1,x2,y2,col,w=4)=>{const a=Math.atan2(y2-y1,x2-x1),h=13,p=(d)=>[x2-h*Math.cos(a+d),y2-h*Math.sin(a+d)];const [ax,ay]=p(.42),[bx,by]=p(-.42);
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><polygon points="${x2},${y2} ${ax.toFixed(1)},${ay.toFixed(1)} ${bx.toFixed(1)},${by.toFixed(1)}" fill="${col}"/>`};
const RED='#ff4d5e',BLUE='#4f7dff';

/* ================= the labelled diagrams ================= */
/* each returns {art, labels}: the drawing pops in first, then the labels appear one by one while the narrator speaks */
const PICS={
 sindirim:()=>({art:`<circle cx="400" cy="58" r="36" class="pic-body"/><rect x="318" y="100" width="164" height="330" rx="60" class="pic-body"/>
   <path d="M388,72 q12,8 24,0" stroke="${RED}" stroke-width="5" fill="none" stroke-linecap="round"/>
   <path d="M400,88 C402,120 408,150 418,172" stroke="#ff9fb2" stroke-width="11" fill="none" stroke-linecap="round"/>
   <path d="M322,176 C352,152 418,156 430,176 C424,198 392,216 334,212 C316,202 312,186 322,176Z" fill="#b5543c" stroke="var(--ink)" stroke-width="2"/>
   <circle cx="388" cy="214" r="8" fill="#5fbf5f" stroke="var(--ink)" stroke-width="1.5"/>
   <path d="M416,170 C470,150 520,184 504,226 C492,258 442,252 426,234 C412,218 446,206 440,192Z" fill="#ff8fa3" stroke="var(--ink)" stroke-width="2"/>
   <path d="M412,246 C440,236 480,238 494,248 C480,258 440,260 412,254Z" fill="#ffd166" stroke="var(--ink)" stroke-width="2"/>
   <path d="M352,392 L346,278 L466,274 L472,372 Q458,396 412,394 L408,424" stroke="#d9a066" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
   <path d="M372,296 h66 M438,296 q12,0 12,12 t-12,12 h-62 q-12,0 -12,12 t12,12 h62 q12,0 12,12 t-12,12 h-60" stroke="#f4a3a3" stroke-width="9" fill="none" stroke-linecap="round"/>`,
   labels:[LEAD(296,70,386,72)+PL(290,76,'Ağız','end'),LEAD(296,128,404,128)+PL(290,134,'Yemek borusu','end'),LEAD(296,186,330,186)+PL(290,192,'Karaciğer','end'),
     LEAD(296,232,382,218)+PL(290,238,'Safra kesesi','end'),LEAD(510,196,530,196)+PL(536,202,'Mide','start'),LEAD(494,250,530,252)+PL(536,258,'Pankreas','start'),
     LEAD(296,330,372,330)+PL(290,336,'İnce bağırsak','end'),LEAD(484,320,530,320)+PL(536,326,'Kalın bağırsak','start'),LEAD(414,424,530,420)+PL(536,426,'Anüs','start')]}),
 kalp:()=>({art:`<path d="M330,226 C330,110 250,96 222,110" stroke="${BLUE}" stroke-width="15" fill="none" stroke-linecap="round"/>
   <path d="M440,226 C440,96 540,88 566,112" stroke="${RED}" stroke-width="17" fill="none" stroke-linecap="round"/>
   <path d="M318,52 L322,140" stroke="${BLUE}" stroke-width="15" stroke-linecap="round"/><path d="M640,176 L520,176" stroke="${RED}" stroke-width="13" stroke-linecap="round"/>
   <ellipse cx="340" cy="176" rx="62" ry="46" fill="${BLUE}" stroke="var(--ink)" stroke-width="2"/><ellipse cx="460" cy="176" rx="62" ry="46" fill="${RED}" stroke="var(--ink)" stroke-width="2"/>
   <path d="M400,222 L400,396 C366,380 282,326 280,256 C280,232 296,222 318,222Z" fill="${BLUE}" stroke="var(--ink)" stroke-width="2"/>
   <path d="M400,222 L400,396 C434,380 518,326 520,256 C520,232 504,222 482,222Z" fill="${RED}" stroke="var(--ink)" stroke-width="2"/>
   <line x1="312" y1="222" x2="372" y2="222" stroke="#fff" stroke-width="5" stroke-dasharray="9 5"/><line x1="428" y1="222" x2="488" y2="222" stroke="#fff" stroke-width="5" stroke-dasharray="9 5"/>
   ${PL(340,172,'Sağ','middle','pl w')}${PL(340,194,'kulakçık','middle','pl w')}${PL(460,172,'Sol','middle','pl w')}${PL(460,194,'kulakçık','middle','pl w')}${PL(346,286,'Sağ','middle','pl w')}${PL(346,308,'karıncık','middle','pl w')}${PL(454,286,'Sol','middle','pl w')}${PL(454,308,'karıncık','middle','pl w')}`,
   labels:[PL(222,92,'Akciğer atardamarı','middle'),PL(590,96,'Aort atardamarı','middle'),PL(300,40,'Üst toplardamar','end'),PL(646,166,'Akciğer','start')+PL(646,188,'toplardamarı','start'),
     LEAD(560,236,490,224)+PL(566,242,'Kapakçık','start'),
     `<rect x="40" y="356" width="18" height="18" fill="${RED}"/>`+PL(66,371,'Oksijeni bol kan','start'),`<rect x="40" y="388" width="18" height="18" fill="${BLUE}"/>`+PL(66,403,'Karbondioksiti bol kan','start'),
     PL(760,420,'Resmin solu, kişinin sağıdır','end','pl s')]}),
 dolasim:()=>({art:`<rect x="290" y="44" width="220" height="64" rx="18" fill="#ff9fb2" stroke="var(--ink)" stroke-width="2"/>${PL(400,84,'Akciğerler','middle','pl b')}
   <rect x="270" y="356" width="260" height="64" rx="18" fill="#ffd9a0" stroke="var(--ink)" stroke-width="2"/>${PL(400,396,'Vücut hücreleri','middle','pl b')}
   <path d="M400,196 L400,282" stroke="var(--ink)" stroke-width="2"/><rect x="330" y="186" width="70" height="104" rx="22" fill="${BLUE}" stroke="var(--ink)" stroke-width="2"/><rect x="400" y="186" width="70" height="104" rx="22" fill="${RED}" stroke="var(--ink)" stroke-width="2"/>${PL(400,244,'Kalp','middle','pl w b')}
   ${ARW(350,186,350,112,BLUE,6)}${ARW(450,112,450,182,RED,6)}${ARW(450,290,450,350,RED,6)}${ARW(350,352,350,294,BLUE,6)}`,
   labels:[PL(560,140,'Küçük kan dolaşımı','start','pl g')+PL(560,162,'kalp → akciğer → kalp','start','pl s'),PL(560,318,'Büyük kan dolaşımı','start','pl g')+PL(560,340,'kalp → vücut → kalp','start','pl s'),
     PL(240,140,'O₂ alınır, CO₂ verilir','end','pl s'),PL(240,330,'O₂ ve besin verilir,','end','pl s')+PL(240,352,'CO₂ alınır','end','pl s'),
     `<rect x="40" y="30" width="16" height="16" fill="${RED}"/>`+PL(62,44,'Oksijeni bol kan','start','pl s')+`<rect x="40" y="56" width="16" height="16" fill="${BLUE}"/>`+PL(62,70,'Karbondioksiti bol kan','start','pl s')]}),
 solunum:()=>{const br=(x,y,s)=>`<path d="M${x},${y} l${-28*s},40 M${x},${y} l${12*s},46 M${x-28*s},${y+40} l${-20*s},28 M${x-28*s},${y+40} l${6*s},34 M${x+12*s},${y+46} l${-6*s},32 M${x+12*s},${y+46} l${22*s},26" stroke="#c2185b" stroke-width="3" fill="none" stroke-linecap="round"/>`;
   return {art:`<path d="M262,214 C262,190 300,180 352,196 L386,236 L386,392 C330,404 268,400 250,384 C232,330 240,250 262,214Z" fill="#ff9fb2" stroke="var(--ink)" stroke-width="2"/>
   <path d="M538,214 C538,190 500,180 448,196 L414,236 L414,392 C470,404 532,400 550,384 C568,330 560,250 538,214Z" fill="#ff9fb2" stroke="var(--ink)" stroke-width="2"/>
   <path d="M392,40 q8,-18 16,0 q4,12 -8,14 q-12,-2 -8,-14Z" fill="#ffd9a0" stroke="var(--ink)" stroke-width="2"/>
   <path d="M400,60 L400,96" stroke="#e57373" stroke-width="12" stroke-linecap="round"/><rect x="386" y="96" width="28" height="30" rx="8" fill="#ffb74d" stroke="var(--ink)" stroke-width="2"/>
   <rect x="390" y="126" width="20" height="94" fill="#ffccbc" stroke="var(--ink)" stroke-width="2"/>${[140,156,172,188,204].map(y=>`<line x1="390" y1="${y}" x2="410" y2="${y}" stroke="var(--ink)" stroke-width="1.5"/>`).join('')}
   <path d="M396,218 L340,250 M404,218 L460,250" stroke="#ffccbc" stroke-width="13" stroke-linecap="round"/><path d="M396,218 L340,250 M404,218 L460,250" stroke="var(--ink)" stroke-width="1" fill="none"/>
   ${br(338,252,1)}${br(462,252,-1)}
   <path d="M230,404 Q400,350 570,404" stroke="#a1887f" stroke-width="9" fill="none" stroke-linecap="round"/>
   <circle cx="690" cy="300" r="62" fill="var(--panel2)" stroke="var(--cyan)" stroke-width="3"/>${[[675,285],[700,280],[688,305],[665,310],[712,305],[680,330],[704,328]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="13" fill="#ff8fa3" stroke="var(--ink)" stroke-width="1.5"/>`).join('')}
   <line x1="306" y1="320" x2="630" y2="296" stroke="var(--cyan)" stroke-width="1.5" stroke-dasharray="5 4"/>`,
   labels:[LEAD(412,44,470,44)+PL(476,50,'Burun','start'),LEAD(410,80,470,80)+PL(476,86,'Yutak','start'),LEAD(416,111,470,114)+PL(476,120,'Gırtlak','start'),LEAD(412,170,470,160)+PL(476,166,'Soluk borusu','start'),
     LEAD(452,244,560,214)+PL(566,214,'Bronş','start'),LEAD(276,322,180,300)+PL(174,300,'Bronşçuk','end'),LEAD(256,250,180,240)+PL(174,240,'Akciğer','end'),
     PL(690,388,'Alveol','middle','pl g'),LEAD(300,388,190,400)+PL(184,406,'Diyafram','end')]}},
 bosaltim:()=>{const bean=(cx,s)=>`<path d="M${cx},120 C${cx+48*s},116 ${cx+56*s},170 ${cx+40*s},220 C${cx+28*s},258 ${cx-26*s},262 ${cx-34*s},220 C${cx-20*s},200 ${cx-20*s},176 ${cx-34*s},156 C${cx-30*s},130 ${cx-16*s},120 ${cx},120Z" fill="#c0504d" stroke="var(--ink)" stroke-width="2"/>`;
   return {art:`<line x1="388" y1="70" x2="388" y2="330" stroke="${RED}" stroke-width="14" stroke-linecap="round"/><line x1="414" y1="70" x2="414" y2="330" stroke="${BLUE}" stroke-width="14" stroke-linecap="round"/>
   <path d="M388,180 L330,180 M414,196 L470,196" stroke="${RED}" stroke-width="7"/><path d="M388,198 L330,198 M414,180 L470,180" stroke="${BLUE}" stroke-width="7"/>
   ${bean(300,-1)}${bean(500,1)}
   <path d="M322,226 C330,280 360,310 378,340 M478,226 C470,280 440,310 422,340" stroke="#f2c94c" stroke-width="8" fill="none" stroke-linecap="round"/>
   <path d="M352,340 C352,318 448,318 448,340 C452,380 420,392 400,392 C380,392 348,380 352,340Z" fill="#f2c94c" stroke="var(--ink)" stroke-width="2"/>
   <path d="M400,392 L400,430" stroke="#f2c94c" stroke-width="8" stroke-linecap="round"/>`,
   labels:[LEAD(258,170,214,170)+PL(208,176,'Böbrek','end'),LEAD(538,170,586,170)+PL(592,176,'Böbrek','start'),LEAD(338,286,214,290)+PL(208,296,'Üreter','end'),
     LEAD(452,362,586,362)+PL(592,368,'İdrar kesesi','start'),LEAD(404,420,586,420)+PL(592,426,'Üretra','start'),
     PL(376,62,'Atardamar','end','pl s'),PL(426,62,'Toplardamar','start','pl s')]}},
 kirilma:()=>{const g=(cx,cy,r,a1,a2)=>{const p=a=>[cx+r*Math.cos(a*Math.PI/180),cy+r*Math.sin(a*Math.PI/180)].map(v=>v.toFixed(1)).join(',');return `M${p(a1)} A${r},${r} 0 0 0 ${p(a2)}`};
   return {art:`<rect x="60" y="230" width="680" height="190" fill="var(--cyan)" opacity=".18"/><line x1="60" y1="230" x2="740" y2="230" stroke="var(--cyan)" stroke-width="3"/>
   <line x1="400" y1="60" x2="400" y2="420" class="s-dash" style="stroke-width:2.5"/>
   ${ARW(230,60,322,152,'var(--gold)',5)}<line x1="320" y1="150" x2="400" y2="230" stroke="var(--gold)" stroke-width="5" stroke-linecap="round"/>
   <line x1="400" y1="230" x2="580" y2="410" stroke="var(--gold)" stroke-width="2" stroke-dasharray="6 6" opacity=".55"/>
   <line x1="400" y1="230" x2="456" y2="320" stroke="var(--gold)" stroke-width="5" stroke-linecap="round"/>${ARW(456,320,512,410,'var(--gold)',5)}
   <path d="${g(400,230,62,-90,-135)}" stroke="var(--pink)" stroke-width="3.5" fill="none"/><path d="${g(400,230,62,90,58)}" stroke="var(--green)" stroke-width="3.5" fill="none"/>`,
   labels:[PL(110,206,'Hava','start','pl b'),PL(110,270,'Su','start','pl b'),PL(410,78,'Normal','start'),PL(250,110,'Gelen ışın','end'),PL(530,396,'Kırılan ışın','start'),
     PL(372,150,'Gelme açısı','end','pl pk'),PL(434,304,'Kırılma açısı','start','pl gr'),PL(560,300,'Işık suya girerken','start','pl s')+PL(560,322,'normale yaklaşır','start','pl s')]}},
 inceKenar:()=>{const ys=[150,190,270,310];return {art:`<line x1="70" y1="230" x2="730" y2="230" class="s-dash"/>
   <path d="M340,104 Q392,230 340,356 Q288,230 340,104Z" fill="var(--cyan)" fill-opacity=".28" stroke="var(--cyan)" stroke-width="3"/>
   ${ys.map(y=>`${ARW(90,y,250,y,'var(--gold)',4)}<line x1="250" y1="${y}" x2="340" y2="${y}" stroke="var(--gold)" stroke-width="4"/>${ARW(340,y,500,230,'var(--gold)',4)}<line x1="500" y1="230" x2="${500+(500-340)*.9}" y2="${(230+(230-y)*.9).toFixed(1)}" stroke="var(--gold)" stroke-width="4" stroke-linecap="round"/>`).join('')}
   <circle cx="500" cy="230" r="8" fill="var(--pink)"/><circle cx="180" cy="230" r="8" fill="var(--pink)"/>`,
   labels:[PL(500,262,'F','middle','pl pk b'),PL(180,262,'F','middle','pl pk b'),PL(340,86,'İnce kenarlı mercek','middle','pl b'),PL(340,384,'Ortası kalın, kenarı ince','middle','pl s'),
     PL(560,404,'Işınlar odak noktasında (F) toplanır','middle','pl g')]}},
 kalinKenar:()=>{const ys=[150,190,270,310];return {art:`<line x1="70" y1="230" x2="730" y2="230" class="s-dash"/>
   <path d="M306,104 L374,104 Q340,230 374,356 L306,356 Q340,230 306,104Z" fill="var(--cyan)" fill-opacity=".28" stroke="var(--cyan)" stroke-width="3"/>
   ${ys.map(y=>{const dy=(y-230)/160,ex=600,ey=y+dy*(ex-340);return `${ARW(90,y,250,y,'var(--gold)',4)}<line x1="250" y1="${y}" x2="340" y2="${y}" stroke="var(--gold)" stroke-width="4"/>${ARW(340,y,ex,Math.round(ey),'var(--gold)',4)}<line x1="340" y1="${y}" x2="180" y2="230" stroke="var(--gold)" stroke-width="2" stroke-dasharray="6 6" opacity=".6"/>`}).join('')}
   <circle cx="180" cy="230" r="8" fill="var(--pink)"/><circle cx="500" cy="230" r="8" fill="var(--pink)"/>`,
   labels:[PL(180,262,'F','middle','pl pk b'),PL(500,262,'F','middle','pl pk b'),PL(340,86,'Kalın kenarlı mercek','middle','pl b'),PL(340,384,'Ortası ince, kenarı kalın','middle','pl s'),
     PL(180,300,'Uzantılar F noktasında','middle','pl pk')+PL(180,322,'birleşir','middle','pl pk'),PL(620,420,'Işınlar dağılır','middle','pl g')]}},
 atom:()=>{const nuc=[[-12,-10,1],[12,-12,0],[0,10,1],[-16,12,0],[16,10,1],[0,-24,0]];const el=[[400-150,230],[400+92,230-118],[400+120,230+90],[400-70,230+132]];
   return {art:`<defs><radialGradient id="cl"><stop offset="0" stop-color="var(--cyan)" stop-opacity=".34"/><stop offset="1" stop-color="var(--cyan)" stop-opacity="0"/></radialGradient></defs>
   <circle cx="400" cy="230" r="175" fill="url(#cl)"/><circle cx="400" cy="230" r="150" fill="none" class="s-dash"/>
   ${nuc.map(([x,y,p])=>`<circle cx="${400+x}" cy="${230+y}" r="15" fill="${p?RED:'#9aa0b5'}" stroke="var(--ink)" stroke-width="1.5"/>${p?PL(400+x,236+y,'+','middle','pl w b'):''}`).join('')}
   ${el.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="13" fill="${BLUE}" stroke="var(--ink)" stroke-width="1.5"/>${PL(x,y+6,'−','middle','pl w b')}`).join('')}`,
   labels:[LEAD(386,218,180,90)+PL(176,84,'Çekirdek','end'),`<circle cx="610" cy="300" r="10" fill="${RED}"/>`+PL(628,306,'Proton (+)','start'),`<circle cx="610" cy="334" r="10" fill="#9aa0b5"/>`+PL(628,340,'Nötron (yüksüz)','start'),
     `<circle cx="610" cy="368" r="10" fill="${BLUE}"/>`+PL(628,374,'Elektron (−)','start'),LEAD(530,140,590,110)+PL(596,104,'Elektron bulutu','start','pl')+PL(596,126,'Elektronların bölgesi','start','pl s')]}},
 elektroskop:()=>({art:`<path d="M300,180 Q300,150 340,150 L460,150 Q500,150 500,180 L500,400 Q500,420 480,420 L320,420 Q300,420 300,400Z" fill="var(--cyan)" fill-opacity=".1" stroke="var(--cyan)" stroke-width="3"/>
   <rect x="372" y="132" width="56" height="34" rx="6" fill="#8d6e63" stroke="var(--ink)" stroke-width="2"/>
   <line x1="400" y1="96" x2="400" y2="300" stroke="#c0c4d6" stroke-width="9" stroke-linecap="round"/><circle cx="400" cy="84" r="30" fill="#c0c4d6" stroke="var(--ink)" stroke-width="2"/>
   <path d="M400,298 L362,384" stroke="var(--gold)" stroke-width="7" stroke-linecap="round"/><path d="M400,298 L438,384" stroke="var(--gold)" stroke-width="7" stroke-linecap="round"/>
   ${PL(360,350,'+','middle','pl b')}${PL(442,350,'+','middle','pl b')}`,
   labels:[LEAD(430,84,540,70)+PL(546,76,'Topuz (metal)','start'),LEAD(404,240,540,232)+PL(546,238,'Metal çubuk','start'),LEAD(428,148,540,150)+PL(546,156,'Yalıtkan tıpa','start'),
     LEAD(440,372,540,376)+PL(546,382,'Metal yapraklar','start'),LEAD(300,260,226,260)+PL(220,266,'Cam fanus','end'),PL(220,370,'Yaprakların','end','pl s')+PL(220,392,'açılması: cisim yüklü','end','pl s')]}),
 yukler:()=>{const ball=(x,y,s)=>`<circle cx="${x}" cy="${y}" r="30" fill="${s==='+'?RED:BLUE}" stroke="var(--ink)" stroke-width="2"/>${PL(x,y+12,s,'middle','pl w xl')}`;
   const pair=(cx,a,b,rep)=>ball(cx-48,200,a)+ball(cx+48,200,b)+(rep?ARW(cx-82,200,cx-118,200,'var(--gold)',5)+ARW(cx+82,200,cx+118,200,'var(--gold)',5):ARW(cx-48,150,cx-12,150,'var(--gold)',5)+ARW(cx+48,150,cx+12,150,'var(--gold)',5));
   return {art:pair(140,'+','+',1)+pair(400,'−','−',1)+pair(660,'+','−',0),
   labels:[PL(140,280,'İter','middle','pl b')+PL(140,306,'Aynı cins yükler','middle','pl s'),PL(400,280,'İter','middle','pl b')+PL(400,306,'Aynı cins yükler','middle','pl s'),PL(660,280,'Çeker','middle','pl b g')+PL(660,306,'Zıt cins yükler','middle','pl s')]}},
 isKuvvet:()=>({art:`<line x1="70" y1="330" x2="730" y2="330" stroke="var(--ink)" stroke-width="3"/>${Array.from({length:22},(_,i)=>`<line x1="${80+i*30}" y1="330" x2="${68+i*30}" y2="344" stroke="var(--ink-soft)" stroke-width="2"/>`).join('')}
   <rect x="500" y="250" width="100" height="80" rx="8" fill="none" stroke="var(--ink-soft)" stroke-width="2.5" stroke-dasharray="7 5"/>
   <rect x="160" y="250" width="100" height="80" rx="8" fill="#d9a066" stroke="var(--ink)" stroke-width="2.5"/>${PL(210,298,'Kutu','middle','pl b')}
   ${ARW(60,290,154,290,RED,7)}${ARW(210,378,550,378,'var(--gold)',6)}`,
   labels:[PL(100,270,'Kuvvet','middle','pl b r'),PL(380,410,'Yol: kuvvet yönünde alınan mesafe','middle','pl g'),PL(550,236,'Son konum','middle','pl s')]})
};

/* ================= new lesson scene operations ================= */
Object.assign(OPS,{
 pic:async(st,name)=>{const P=PICS[name];if(!P)return;const d=P();
   /* drawn 84 % size, a little below the scene name, so a caption line at y ≈ 410 never covers the drawing */
   const box=document.createElementNS(NS,'g');box.setAttribute('transform','translate(64,30) scale(.84)');st.appendChild(box);
   const g=add(box,d.art);await pop(g,0,600);
   for(const l of d.labels){const e=add(box,l);e.animate([{opacity:0},{opacity:1}],{duration:RM?1:320,fill:'backwards'});sfx('tick');await wait(260)}},
 /* a sequence: steps appear one by one, joined by arrows (food chain, path of food, star life, energy changes) */
 chain:async(st,steps,y=230)=>{const n=steps.length,step=Math.min(170,740/n),x0=400-step*(n-1)/2,r=Math.min(46,step*.34);
   for(let i=0;i<n;i++){const [emo,lab]=steps[i],x=x0+i*step,lines=wrapT(lab,Math.max(8,Math.round(step/11)));
     if(i){const a=add(st,ARW(x-step+r+8,y,x-r-8,y,'var(--gold)',4));a.animate([{opacity:0,transform:'translateX(-10px)'},{opacity:1,transform:'none'}],{duration:RM?1:300,fill:'backwards'});await wait(180)}
     await pop(add(st,`<circle cx="${x}" cy="${y}" r="${r}" class="ch-b"/><text x="${x}" y="${y+r*.36}" text-anchor="middle" style="font-size:${Math.round(r*1.05)}px">${emo}</text><text y="${y+r+30}" text-anchor="middle" class="ch-l">${tspans(x,lines,22)}</text>`));sfx('tick');await wait(300)}},
 /* a few cards side by side (types, groups, examples) */
 cards:async(st,cards)=>{const n=cards.length,cols=n<=3?n:n===4?2:3,rows=Math.ceil(n/cols),gap=18,w=Math.min(232,(740-(cols-1)*gap)/cols),h=rows===1?230:158,
   x0=400-(cols*w+(cols-1)*gap)/2,y0=rows===1?100:72;
   for(let i=0;i<n;i++){const [emo,lab,note]=cards[i],c=i%cols,r=Math.floor(i/cols),x=x0+c*(w+gap),y=y0+r*(h+gap),cx=x+w/2,big=rows===1;
     const nl=note?wrapT(note,Math.round(w/9.5)):[];
     await pop(add(st,`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" class="card-r"/><text x="${cx}" y="${y+(big?78:56)}" text-anchor="middle" style="font-size:${big?56:42}px">${emo}</text>
       <text x="${cx}" y="${y+(big?128:94)}" text-anchor="middle" class="st-txt" style="font-size:${fitFs(lab,24,w*2.2)}px">${esc(lab)}</text>${nl.length?`<text y="${y+(big?160:120)}" text-anchor="middle" class="pl s">${tspans(cx,nl.slice(0,big?3:2),19)}</text>`:''}`));sfx('tick');await wait(320)}}
});

/* ================= Sırala: put the steps in order ================= */
/* the 7 colours of white light through a prism (Fen 4. ünite): show a real colour dot before the name */
const SPECTRUM={'Kırmızı':'#e53935','Turuncu':'#fb8c00','Sarı':'#fdd835','Yeşil':'#43a047','Mavi':'#1e88e5','Lacivert':'#283593','Mor':'#8e24aa'};
const oText=t=>(SPECTRUM[t]?`<i class="sdot" style="background:${SPECTRUM[t]}" aria-hidden="true"></i>`:'')+esc(t);
function orderHTML(q){let it;do{it=shuffle(q.items)}while(it.every((x,i)=>x===q.items[i]));q.pool=it;q.pick=[];
  return `<p class="hint">Doğru sırayla dokun. Yanlış koyduğuna dokunursan geri çıkar.</p><ol class="oslots" id="oslots"></ol><div class="opool" id="opool"></div>
    <div class="row"><button class="go" id="chk" type="button" disabled>Kontrol et</button><button class="go alt" id="clr" type="button">Temizle</button></div>`}
function setupOrder(){const q=S.q,slots=document.getElementById('oslots'),pool=document.getElementById('opool'),chk=document.getElementById('chk');
  const draw=()=>{slots.innerHTML=q.items.map((_,i)=>{const t=q.pick[i];return `<li class="oslot${t!=null?' full':''}"><span class="on">${i+1}</span>${t!=null?`<button class="oitem" type="button" data-back="${i}"><span class="ot">${oText(t)}</span></button>`:'<span class="oe">…</span>'}</li>`}).join('');
    pool.innerHTML=q.pool.map((t,i)=>q.pick.includes(t)?'':`<button class="oitem" type="button" data-i="${i}"><span class="ot">${oText(t)}</span></button>`).join('');
    chk.disabled=q.pick.length!==q.items.length;
    pool.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{if(S.done)return;q.pick.push(q.pool[+b.dataset.i]);sfx('tick');draw();if(PAD.on)(pool.querySelector('button')||chk).focus({preventScroll:true})});
    slots.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>{if(S.done)return;q.pick.splice(+b.dataset.back,1);sfx('flip');draw()})};
  draw();document.getElementById('clr').onclick=()=>{if(S.done)return;q.pick=[];draw()};
  chk.onclick=()=>{if(S.done)return;const ok=q.pick.every((t,i)=>t===q.items[i]);
    slots.querySelectorAll('.oslot').forEach((li,i)=>li.classList.add(q.pick[i]===q.items[i]?'right':'wrong'));
    app.querySelectorAll('.answers button').forEach(b=>b.disabled=true);
    finish(ok,`<span class="seq">${q.items.map((t,i)=>`<span>${i+1}. ${esc(t)}</span>`).join('<i>→</i>')}</span>`,ok?null:q.mis,chk)}}

/* ================= Grupla: sort the items into groups ================= */
function sortHTML(q){q.place={};q.sel=null;q.order=shuffle(q.items.map((_,i)=>i));
  return `<p class="hint">Önce bir karta, sonra ait olduğu gruba dokun. Hepsi yerleşince bir karta dokunup yerini değiştirebilirsin.</p><div class="spool" id="spool"></div>
    <div class="sbins" id="sbins" style="--n:${q.bins.length}">${q.bins.map((b,j)=>`<div class="sbin" role="button" tabindex="0" data-b="${j}" aria-label="Gruba koy: ${esc(b)}"><b>${esc(b)}</b><span class="sin" id="sin${j}"></span></div>`).join('')}</div>
    <div class="row"><button class="go" id="chk" type="button" disabled>Kontrol et</button><button class="go alt" id="clr" type="button">Temizle</button></div>`}
function setupSort(){const q=S.q,pool=document.getElementById('spool'),chk=document.getElementById('chk');
  const chip=(i,where)=>`<button class="sitem${q.sel===i?' sel':''}" type="button" data-it="${i}" data-w="${where}"><span class="ot">${esc(q.items[i][0])}</span></button>`;
  const draw=()=>{pool.innerHTML=q.order.filter(i=>q.place[i]==null).map(i=>chip(i,'p')).join('')||'<span class="hint">Hepsi yerleşti. Kontrol et!</span>';
    q.bins.forEach((_,j)=>{document.getElementById('sin'+j).innerHTML=q.order.filter(i=>q.place[i]===j).map(i=>chip(i,'b')).join('')});
    chk.disabled=Object.keys(q.place).length!==q.items.length;
    app.querySelectorAll('.sitem').forEach(b=>b.onclick=e=>{e.stopPropagation();if(S.done)return;const i=+b.dataset.it;
      /* a card is waiting to be placed: tapping anywhere in a group, even on a card already there, puts it in that group */
      if(b.dataset.w==='b'&&q.sel!=null&&q.place[q.sel]==null){b.closest('.sbin').onclick();return}
      if(b.dataset.w==='b'){delete q.place[i];q.sel=i;sfx('flip')}else{q.sel=q.sel===i?null:i;sfx('tick')}draw()});
    app.querySelectorAll('.sbin').forEach(b=>b.classList.toggle('ready',q.sel!=null))};
  app.querySelectorAll('.sbin').forEach(b=>{b.onclick=()=>{if(S.done||q.sel==null)return;q.place[q.sel]=+b.dataset.b;q.sel=null;
    const left=q.order.find(i=>q.place[i]==null);if(left!=null)q.sel=left;sfx('tick');draw()};
    b.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();b.onclick()}}});
  q.sel=q.order[0];draw();
  document.getElementById('clr').onclick=()=>{if(S.done)return;q.place={};q.sel=q.order[0];draw()};
  chk.onclick=()=>{if(S.done)return;const ok=q.items.every((x,i)=>q.place[i]===x[1]);
    app.querySelectorAll('.sbin .sitem').forEach(b=>{const i=+b.dataset.it,r=q.place[i]===q.items[i][1];b.classList.add(r?'right':'wrong');if(!r)b.insertAdjacentHTML('beforeend',`<small>→ ${esc(q.bins[q.items[i][1]])}</small>`)});
    app.querySelectorAll('.answers button').forEach(b=>b.disabled=true);
    finish(ok,`<span class="ans">${q.bins.map((b,j)=>`<b>${esc(b)}:</b> ${q.items.filter(x=>x[1]===j).map(x=>esc(x[0])).join(', ')}`).join('<br>')}</span>`,ok?null:q.mis,chk)}}
