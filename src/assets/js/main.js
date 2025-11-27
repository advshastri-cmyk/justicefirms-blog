(function(){
  // mobile nav toggle
  var btn = document.getElementById('mobile-toggle');
  if(btn){
    btn.addEventListener('click', function(){
      var nav = document.querySelector('.jf-nav');
      if(!nav) return;
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.background = 'var(--primary)';
      nav.style.padding = '12px';
      nav.style.position = 'absolute';
      nav.style.right = '16px';
      nav.style.top = '62px';
    });
  }
})();
