/* Functionality:
 - Tab switching with ARIA
 - Gallery: add images (multiple), preview, remove
 - Ensure widgets stay aligned by relying on .page padding
*/

(function(){
  // Tabs
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

  function activateTab(tab){
    tabs.forEach(t => t.setAttribute('aria-selected','false'));
    panels.forEach(p => p.hidden = true);
    tab.setAttribute('aria-selected','true');
    const panelId = tab.id.replace('tab','panel');
    const panel = document.getElementById(panelId);
    if(panel) panel.hidden = false;
    tab.focus();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', ()=> activateTab(tab));
    tab.addEventListener('keydown', (e) => {
      const idx = tabs.indexOf(tab);
      if(e.key === 'ArrowRight') activateTab(tabs[(idx+1)%tabs.length]);
      if(e.key === 'ArrowLeft') activateTab(tabs[(idx-1+tabs.length)%tabs.length]);
    });
  });

  // Gallery upload
  const imgInput = document.getElementById('imgInput');
  const galleryGrid = document.getElementById('galleryGrid');

  function createThumb(src, name){
    const wrapper = document.createElement('div');
    wrapper.className = 'thumb';
    wrapper.style.position = 'relative';

    const img = document.createElement('img');
    img.src = src;
    img.alt = name || 'user image';
    wrapper.appendChild(img);

    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'btn remove';
    del.textContent = '✕';
    del.style.position = 'absolute';
    del.style.top = '8px';
    del.style.right = '8px';
    del.style.padding = '6px 8px';
    del.style.borderRadius = '8px';
    del.style.fontWeight = '700';
    del.style.background = 'rgba(255,255,255,0.9)';
    del.style.border = '1px solid rgba(15,23,42,0.06)';

    del.addEventListener('click', ()=> wrapper.remove());
    wrapper.appendChild(del);
    return wrapper;
  }

  imgInput.addEventListener('change', (e)=>{
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      if(!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = ()=>{
        const thumb = createThumb(reader.result, file.name);
        galleryGrid.appendChild(thumb);
      };
      reader.readAsDataURL(file);
    });
    imgInput.value = '';
  });

  // initial alignment check: if user resizes, widgets remain aligned because parent .page padding is fixed
  window.addEventListener('resize', ()=>{
    // no-op; alignment is handled by CSS container padding and max-width; kept intentionally simple
  });
})();

const gallery = document.querySelector('.card-gallery');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');

leftBtn.addEventListener('click', () => {
  gallery.scrollBy({
    left: -300,
    behavior: 'smooth'
  });
});

rightBtn.addEventListener('click', () => {
  gallery.scrollBy({
    left: 300,
    behavior: 'smooth'
  });
});