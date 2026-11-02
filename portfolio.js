const projects=[
['Brown Sunglasses','Brown Sunglasses Product Ad','product','A warm, sunlit product study exploring shape, light, and the details.'],
['Luxury Backpack','Luxury Backpack Advertisement','product','A premium backpack concept with close attention to texture, finish, and silhouette.'],
['Watch Storytelling','Watch Product Storytelling','product','A cinematic watch study focused on the dial, materials, and product framing.'],
['Dress / Reimagined','Dress','images','An original clothing reference reimagined as an AI-styled lifestyle flat lay.'],
['Miniature Workshop','Miniature Workshop Cinematic','cinematic','A miniature workshop brought to life through atmosphere and an imagined creative world.'],
['Leather Sandals','Leather Sandals Showcase','product','A close product study of leather sandals, with attention to the buckle and materials.'],
['Jacket / Reimagined','Jacket','images','A jacket reference transformed into an aesthetic, styled product flat lay.'],
['Black Loafers','Black Loafers Product Ad','product','A footwear concept exploring glossy materials and the loafer silhouette.'],
['Handbag Showcase',"Women's Handbag Product Showcase",'product','A minimalist handbag presentation with warm lighting and a product-first composition.'],
['Cyberpunk City','Cyberpunk City Cinematic','cinematic','A miniature futuristic city with layered lights and a cyberpunk atmosphere.'],
['Pants / Reimagined','Pants','images','An original pants reference transformed into a styled lifestyle product image.'],
['Scent Story','Scent Story — AI Product Promotion','product','An AI-assisted fragrance promotion combining voice and short-form storytelling.'],
['Street Encounter','Cinematic Street Drama','cinematic','An experimental street sequence exploring character interaction and a dramatic mood.'],
['Kidswear / Look 01','Kidswear Fashion Walk — Look 01','fashion','A softly lit kidswear scene with a neutral outfit and relaxed home styling.'],
['Shorts / Reimagined','Short','images','A shorts reference reimagined as an AI-generated lifestyle flat lay.'],
['Backpack Product Study','Backpack Product Advertisement','product','A bag presentation with close attention to its shape, finish, and understated styling.'],
['Kidswear / Look 02','Kidswear Fashion Walk — Look 02','fashion','A second kidswear concept exploring a casual outfit and movement in a warm home setting.']
].map(([title,file,category,description])=>({title,file,category,description}));
const labels={product:'Product film',images:'Image transformation',cinematic:'Cinematic experiment',fashion:'Fashion & lifestyle'};
const asset=(folder,name,ext)=>`${folder}/${encodeURIComponent(name)}.${ext}`;
const grid=document.querySelector('#projectGrid'),dialog=document.querySelector('#projectDialog'),media=document.querySelector('#dialogMedia');
let selected='all',limit=6,returnFocus;
function openProject(index,trigger){
 const p=projects[index],image=p.category==='images';returnFocus=trigger||document.activeElement;
 document.querySelector('#dialogTitle').textContent=p.title;document.querySelector('#dialogDescription').textContent=p.description;document.querySelector('#dialogLabel').textContent=labels[p.category];media.replaceChildren();
 if(image){
  const comparison=document.createElement('div');comparison.className='comparison';
  comparison.innerHTML=`<img src="${asset('images',p.file+' - After','jpg')}" alt="${p.title}: AI visual"><div class="before-layer"><img src="${asset('images',p.file+' - Before','jpg')}" alt="${p.title}: original reference"></div><span class="compare-label original">Original</span><span class="compare-label after">AI visual</span><span class="divider" aria-hidden="true"></span><input type="range" min="0" max="100" value="50" aria-label="Compare original and AI visual for ${p.title}">`;
  comparison.querySelector('input').addEventListener('input',e=>comparison.style.setProperty('--position',e.target.value+'%'));media.append(comparison);
 }else{
  const video=document.createElement('video');video.src=asset('videos',p.file,'mp4');video.poster=asset('posters',p.file,'jpg');video.controls=true;video.playsInline=true;video.preload='metadata';video.setAttribute('aria-label',p.title);media.append(video);
  video.addEventListener('error',()=>{const error=document.createElement('p');error.className='playback-error';error.textContent='This film could not load. Please try again, or contact Christian for a copy.';media.append(error);},{once:true});
 }
 dialog.showModal();document.body.classList.add('dialog-open');
}
dialog.addEventListener('close',()=>{media.querySelector('video')?.pause();media.replaceChildren();document.body.classList.remove('dialog-open');returnFocus?.focus();});
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
document.querySelector('#closeDialog').addEventListener('click',()=>dialog.close());
document.querySelectorAll('[data-project]').forEach(b=>b.addEventListener('click',()=>openProject(Number(b.dataset.project),b)));
function renderProjects(){
 const filtered=projects.map((p,index)=>({...p,index})).filter(p=>selected==='all'||p.category===selected);grid.replaceChildren();
 filtered.slice(0,limit).forEach(p=>{
  const image=p.category==='images',card=document.createElement('article');card.className='project';
  card.innerHTML=`<button class="project-open" type="button" aria-label="${image?'Compare':'Watch'} ${p.title}"><div class="project-media"><img loading="lazy" decoding="async" src="${image?asset('images',p.file+' - After','jpg'):asset('posters',p.file,'jpg')}" alt="${p.title} ${image?'AI visual':'film still'}"><span class="media-type">${image?'Before / After':'AI film'}</span><span class="play-icon" aria-hidden="true">${image?'↔':'↗'}</span>${image?`<img class="reference-inset" loading="lazy" src="${asset('images',p.file+' - Before','jpg')}" alt="Original reference">`:''}</div><div class="project-meta"><span>${labels[p.category]}</span><span>${String(p.index+1).padStart(2,'0')}</span></div><h3>${p.title}</h3></button>`;
  card.querySelector('button').addEventListener('click',e=>openProject(p.index,e.currentTarget));grid.append(card);
 });
 const count=Math.min(limit,filtered.length);document.querySelector('#resultCount').textContent=`Showing ${count} of ${filtered.length} projects`;document.querySelector('#loadMore').hidden=count===filtered.length;
}
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.filter;limit=6;document.querySelectorAll('.filter').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));renderProjects();}));
document.querySelector('#loadMore').addEventListener('click',()=>{const start=grid.children.length;limit+=6;renderProjects();grid.children[start]?.querySelector('button').focus({preventScroll:true});});
const menu=document.querySelector('#menuButton'),nav=document.querySelector('#navigation');
const closeMenu=()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open');};
menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!expanded));nav.classList.toggle('is-open',!expanded);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.querySelector('#copyEmail').addEventListener('click',async()=>{const status=document.querySelector('#copyStatus');try{await navigator.clipboard.writeText('christian.comedia.dr@gmail.com');status.textContent='Email copied to clipboard.';}catch{status.textContent='Email: christian.comedia.dr@gmail.com';}});
document.querySelector('#year').textContent=new Date().getFullYear();renderProjects();
