const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
function closeMenu(){nav?.classList.remove('is-open');menu?.setAttribute('aria-expanded','false');}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
nav?.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav?.classList.contains('is-open')){closeMenu();menu.focus();}});
const form=document.querySelector('#consultation-form');
const confirmation=document.querySelector('#confirmation');
form?.querySelector('button[type="submit"]').removeAttribute('disabled');
form?.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  const fields=document.querySelector('#confirmation-fields');
  fields.replaceChildren();
  const data=new FormData(form);
  for(const [key,label] of [['company','会社名・屋号'],['person','担当者名'],['email','メールアドレス'],['phone','電話番号'],['message','相談内容']]){
    const row=document.createElement('div');const dt=document.createElement('dt');const dd=document.createElement('dd');
    dt.textContent=label;dd.textContent=String(data.get(key)||'未入力');row.append(dt,dd);fields.append(row);
  }
  confirmation.showModal();
});
document.querySelector('.dialog-close')?.addEventListener('click',()=>confirmation.close());
document.querySelector('#edit-inquiry')?.addEventListener('click',()=>{confirmation.close();document.querySelector('#message').focus();});
confirmation?.addEventListener('close',()=>document.querySelector('#confirmation-fields').replaceChildren());
// No network requests or browser storage: this is a private pre-launch form preview.
// Do not enable sending until a verified server-side form service is connected.
