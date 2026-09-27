const C=window.HAOYANG_CONFIG||{};
const common={
 zh:{brand:'皓洋包装厂',home:'首页',about:'关于我们',factory:'工厂实力',custom:'定制包装',cases:'包装案例',contact:'联系询价',cta:'获取报价',footer:'精品礼盒与定制包装',wa:'WhatsApp 咨询'},
 en:{brand:'Haoyang Packaging',home:'Home',about:'About Us',factory:'Factory',custom:'Custom Packaging',cases:'Portfolio',contact:'Contact',cta:'Get a Quote',footer:'Premium Gift Boxes & Custom Packaging',wa:'WhatsApp'}
};
let lang=localStorage.getItem('haoyang-lang')||'zh';

function applyBilingualText(){
 document.querySelectorAll('[data-zh][data-en]').forEach(el=>{el.innerHTML=lang==='zh'?el.dataset.zh:el.dataset.en});
 document.querySelectorAll('[data-placeholder-zh][data-placeholder-en]').forEach(el=>{el.placeholder=lang==='zh'?el.dataset.placeholderZh:el.dataset.placeholderEn});
 document.querySelectorAll('[data-content-zh][data-content-en]').forEach(el=>{el.setAttribute('content',lang==='zh'?el.dataset.contentZh:el.dataset.contentEn)});
 document.querySelectorAll('[data-alt-zh][data-alt-en]').forEach(el=>{el.alt=lang==='zh'?el.dataset.altZh:el.dataset.altEn});
 document.querySelectorAll('[data-value-zh][data-value-en]').forEach(el=>{el.value=lang==='zh'?el.dataset.valueZh:el.dataset.valueEn});
}

function applyCommon(){
 document.documentElement.lang=lang==='zh'?'zh-CN':'en';const t=common[lang];
 document.querySelectorAll('[data-common]').forEach(el=>{const k=el.dataset.common;if(t[k])el.innerHTML=t[k]});
 applyBilingualText();
 const b=document.getElementById('langToggle');if(b)b.textContent=lang==='zh'?'EN':'中文';
 document.querySelectorAll('[data-address]').forEach(el=>el.textContent=lang==='zh'?C.addressZh:C.addressEn);
 document.querySelectorAll('[data-email]').forEach(el=>{const target=el.querySelector('span')||el;target.textContent=C.email;const link=el.tagName==='A'?el:el.closest('a');if(link)link.href='mailto:'+C.email});
 document.querySelectorAll('[data-phone]').forEach(el=>{const target=el.querySelector('span')||el;target.textContent=C.phone;const link=el.tagName==='A'?el:el.closest('a');if(link)link.href='tel:'+C.phone});
 document.querySelectorAll('[data-wechat]').forEach(el=>el.textContent=C.wechat);
 const contactHref=document.getElementById('contact')?'#contact':'index.html#contact';
 document.querySelectorAll('[data-whatsapp]').forEach(el=>{el.href=C.whatsapp&&!C.whatsapp.startsWith('YOUR_')?'https://wa.me/'+C.whatsapp+'?text='+encodeURIComponent(lang==='zh'?'您好，我想咨询定制包装。':'Hello, I would like to inquire about custom packaging.'):contactHref;});
}
function switchLang(){lang=lang==='zh'?'en':'zh';localStorage.setItem('haoyang-lang',lang);applyCommon();document.dispatchEvent(new CustomEvent('haoyang-language',{detail:{lang}}));}

document.addEventListener('DOMContentLoaded',()=>{
 applyCommon();
 document.getElementById('langToggle')?.addEventListener('click',switchLang);
 const nav=document.querySelector('.nav');
 const onScroll=()=>nav?.classList.toggle('scrolled',window.scrollY>12);onScroll();window.addEventListener('scroll',onScroll,{passive:true});
 const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();document.querySelectorAll('.nav-links a').forEach(a=>{const href=(a.getAttribute('href')||'').split('#')[0].toLowerCase();if((page==='index.html'&&href==='index.html')||href===page)a.classList.add('active')});
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -5%'});
 document.querySelectorAll('.reveal').forEach((e,i)=>{e.style.transitionDelay=(i%4)*70+'ms';io.observe(e)});
 document.querySelectorAll('.tilt').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*5}deg) translateY(-5px)`});card.addEventListener('pointerleave',()=>card.style.transform='')});
 const modal=document.getElementById('modal'),mi=document.getElementById('modalImg');document.querySelectorAll('.shot img').forEach(img=>img.addEventListener('click',()=>{if(modal&&mi){mi.src=img.src;modal.classList.add('open')}}));document.querySelector('.close')?.addEventListener('click',()=>modal?.classList.remove('open'));modal?.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
 const form=document.getElementById('quoteForm');
 if(form){
  const fine=form.querySelector('.fine');
  const submit=form.querySelector('button[type="submit"]');
  const defaultFineZh='提交后，我们会通过您填写的联系方式进一步沟通项目。';
  const defaultFineEn='After submission, we will follow up using the contact details you provide.';
  const endpoint=C.inquiryEndpoint||'';

  form.addEventListener('submit',async e=>{
   // If Google Sheets is not configured yet, keep FormSubmit as a temporary fallback.
   if(!endpoint||endpoint.startsWith('YOUR_')){
    if(C.email&&!C.email.startsWith('YOUR_')){
     form.action='https://formsubmit.co/'+C.email;
     return;
    }
    e.preventDefault();
    alert(lang==='zh'?'请先在 site-config.js 中配置 Google Apps Script 地址或收件邮箱。':'Please configure the Google Apps Script URL or receiving email in site-config.js first.');
    return;
   }

   e.preventDefault();
   const originalText=submit?.textContent||'';
   if(submit){submit.disabled=true;submit.textContent=lang==='zh'?'正在提交…':'Submitting…'}
   if(fine)fine.textContent=lang==='zh'?'正在发送询价…':'Sending your inquiry…';

   const data=new FormData(form);
   data.append('language',lang==='zh'?'中文':'English');
   data.append('source','Haoyang Packaging Website');
   data.append('pageUrl',location.href);

   try{
    // no-cors is used for compatibility with Google Apps Script Web Apps.
    await fetch(endpoint,{method:'POST',body:data,mode:'no-cors'});
    form.reset();
    if(fine)fine.textContent=lang==='zh'?'询价已提交。我们会尽快通过您填写的联系方式与您沟通。':'Inquiry submitted. We will contact you using the details provided.';
   }catch(err){
    console.error('Inquiry submission failed:',err);
    if(fine)fine.textContent=lang==='zh'?'提交未成功，请通过邮箱或 WhatsApp 联系我们。':'Submission failed. Please contact us by email or WhatsApp.';
   }finally{
    if(submit){submit.disabled=false;submit.textContent=originalText||((lang==='zh')?'提交询价':'Submit Inquiry')}
    setTimeout(()=>{if(fine&&fine.textContent.includes(lang==='zh'?'询价已提交':'Inquiry submitted'))fine.textContent=lang==='zh'?defaultFineZh:defaultFineEn},9000);
   }
  });
 }
 if(matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){const glow=document.createElement('div');glow.className='cursor-glow';document.body.appendChild(glow);window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';glow.style.opacity='1'},{passive:true});document.documentElement.addEventListener('mouseleave',()=>glow.style.opacity='0')}
});
