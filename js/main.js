document.addEventListener('DOMContentLoaded',function(){
  var buttons=document.querySelectorAll('.filters button');
  var cards=document.querySelectorAll('.card');
  buttons.forEach(function(btn){
    btn.addEventListener('click',function(){
      buttons.forEach(function(b){b.classList.remove('active')});
      btn.classList.add('active');
      var cat=btn.dataset.cat;
      cards.forEach(function(card){
        card.style.display=(cat==='All'||card.dataset.cat===cat)?'':'none';
      });
    });
  });
  var banner=document.getElementById('cookieBanner');
  var okBtn=document.getElementById('cookieOk');
  if(okBtn&&banner){
    if(localStorage.getItem('cookieConsent')){banner.style.display='none'}
    okBtn.addEventListener('click',function(){
      localStorage.setItem('cookieConsent','1');
      banner.style.display='none';
    });
  }
});
