const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('#nav');
function closeMenu(){nav?.classList.remove('is-open');menu?.setAttribute('aria-expanded','false');}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
nav?.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav?.classList.contains('is-open')){closeMenu();menu.focus();}});

const form=document.querySelector('#consultation-form');
const confirmation=document.querySelector('#confirmation');
if(form&&confirmation){
  const reviewButton=form.querySelector('button[type="submit"]');
  const sendButton=document.querySelector('#send-inquiry');
  const editButton=document.querySelector('#edit-inquiry');
  const closeButton=confirmation.querySelector('.dialog-close');
  const fields=document.querySelector('#confirmation-fields');
  const errorBox=document.querySelector('#send-status');
  const successBox=document.querySelector('#inquiry-success');
  const endpoint=form.getAttribute('action')||'';
  // The public form URL is not a mailbox password or an administrative API key.
  const connected=/^https:\/\/formspree\.io\/f\/[a-z0-9]+$/.test(endpoint);
  const secure=location.protocol==='https:';
  const localPreview=['localhost','127.0.0.1','[::1]'].includes(location.hostname);
  const available=document.querySelector('#contact-unavailable');
  if(connected&&(secure||localPreview)){
    form.hidden=false;
    if(available)available.hidden=true;
  }
  let pendingData=null;
  let sending=false;
  reviewButton.disabled=false;

  function showError(message){
    if(errorBox){errorBox.textContent=message;errorBox.hidden=false;}
  }
  function setSending(value){
    sending=value;
    confirmation.setAttribute('aria-busy',String(value));
    for(const button of [sendButton,editButton,closeButton])if(button)button.disabled=value;
    reviewButton.disabled=value;
    if(sendButton){
      sendButton.textContent=value?'送信しています…':'無料で相談する';
      if(!value)sendButton.disabled=!connected||!secure;
    }
  }
  for(const input of form.querySelectorAll('[required]:not([type="checkbox"])')){
    input.addEventListener('input',()=>input.setCustomValidity(''));
  }
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(sending)return;
    for(const input of form.querySelectorAll('[required]:not([type="checkbox"])')){
      input.value=input.value.trim();
      input.setCustomValidity(input.value?'':'内容を入力してください。');
    }
    if(!form.reportValidity())return;
    fields.replaceChildren();
    if(errorBox){errorBox.hidden=true;errorBox.textContent='';}
    pendingData=new FormData(form);
    for(const [key,label] of [['company','会社名・屋号'],['person','担当者名'],['email','メールアドレス'],['phone','電話番号'],['message','相談内容']]){
      const row=document.createElement('div');const dt=document.createElement('dt');const dd=document.createElement('dd');
      dt.textContent=label;dd.textContent=String(pendingData.get(key)||'未入力');row.append(dt,dd);fields.append(row);
    }
    setSending(false);
    if(connected&&!secure)showError('この確認画面からは送信できません。送信は https://jimusoto.jp/ でご利用ください。');
    confirmation.showModal();
  });
  closeButton?.addEventListener('click',()=>{if(!sending)confirmation.close();});
  editButton?.addEventListener('click',()=>{
    if(sending)return;
    confirmation.close();document.querySelector('#message').focus();
  });
  confirmation.addEventListener('cancel',event=>{if(sending)event.preventDefault();});
  confirmation.addEventListener('close',()=>{fields.replaceChildren();pendingData=null;});
  sendButton?.addEventListener('click',async()=>{
    if(sending||!pendingData||!connected||!secure)return;
    if(errorBox){errorBox.hidden=true;errorBox.textContent='';}
    const submittedData=pendingData;
    setSending(true);
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),25000);
    try{
      const response=await fetch(endpoint,{
        method:'POST',body:submittedData,headers:{Accept:'application/json'},
        credentials:'omit',referrerPolicy:'strict-origin-when-cross-origin',signal:controller.signal
      });
      const result=await response.json().catch(()=>null);
      if(!response.ok||result?.ok!==true){
        showError(response.status===429
          ?'現在フォームで受け付けられる件数を超えています。お手数ですが info@jimusoto.jp へメールでご相談ください。'
          :'送信を確認できませんでした。入力内容を確認して再度お試しいただくか、info@jimusoto.jp へメールでご相談ください。');
        return;
      }
      form.reset();
      confirmation.close();
      if(successBox){form.hidden=true;successBox.hidden=false;successBox.focus();}
    }catch{
      showError('通信が完了せず、送信結果を確認できませんでした。内容は画面に残っています。重複送信を避けるため、info@jimusoto.jp へ受付状況をお問い合わせください。');
    }finally{
      clearTimeout(timeout);setSending(false);
    }
  });
}
