(function(){
  
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

 
const imageInput = document.getElementById('imgInput');

const gallery = document.getElementById('cardGallery');
const addBtn = document.getElementById('addImageBtn');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');

// Scroll functionality
leftBtn.addEventListener('click', () => {
  gallery.scrollBy({ left: -300, behavior: 'smooth' });
});

rightBtn.addEventListener('click', () => {
  gallery.scrollBy({ left: 300, behavior: 'smooth' });
});



addBtn.addEventListener('click', () => {
  imageInput.click();
});

imageInput.addEventListener('change', (event)=>{
  const file= event.target.files[0];
  if(file){
    const imgContainer= document.createElement('div');
    imgContainer.classList.add('img-container');
    const img = document.createElement('img');
    img.src=URL.createObjectURL(file);
   

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close-btn');
    closeBtn.innerHTML = '&times;';


    closeBtn.addEventListener('click', () => {
      imgContainer.remove();
    });

   
    imgContainer.appendChild(img);
    imgContainer.appendChild(closeBtn);
    gallery.appendChild(imgContainer);
  }
});
})();