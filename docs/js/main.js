const f=document.querySelector(".js_productsList"),y=document.querySelector(".js_filterInput"),I=document.querySelector(".js_filterBtn"),p=document.querySelector(".js_cartList"),j=document.querySelector(".js_cartDelete"),m=document.querySelector(".js_numberProducts"),v=document.querySelector(".js_scrollTop");let r=[],s=[];function d(){m&&(m.innerHTML=s.length)}function S(t){const e=t.image||"./images/undefined.png",n=s.find(u=>u.id===t.id),c=n?"add add--red":"add",a=n?"delete":"add";return`
 <li class="product-item">
  <p> ${t.title}</p>
  <div class="product-img js_productImg">
      <img src="${e}" alt="Imagen de ${t.title}">
  </div>
  <p class= "category js_category"> ${t.category}</p>
  <p> ${t.price}€</p>
   <button class="${c} js_add" data-id="${t.id}">${a}</button>
  </li>`}function o(){let t="";for(const e of r)t+=S(e);f.innerHTML=t}function _(t){let e="";for(const n of t)e+=S(n);f.innerHTML=e}function l(){p.innerHTML="";for(const t of s){const e=(t.price*t.quantity).toFixed(2);p.innerHTML+=`
<li class="cart-item">
      <div class="cart-item-info">
        <p>${t.title}</p>
        <div class="product-img js_productImg">
          <img src="${t.image||"../images/undefined.png"}" alt="${t.title}">
        </div>

       <div class="quantity-controls">
          <button class="js_minus" data-id="${t.id}">-</button>
        <span>${t.quantity||1}</span>
          <button class="js_plus" data-id="${t.id}">+</button>
        </div>
        
        <p>Total: ${e}€</p>
      </div>
      <button class="cart-item-remove js_removeSingle" data-id="${t.id}">X</button>
    </li>`}}const q=t=>{t.preventDefault();const e=y.value.toLowerCase().trim();if(e===""){o();return}const n=r.filter(c=>c.title.toLowerCase().includes(e)||c.description.toLowerCase().includes(e));_(n)};I.addEventListener("click",q);f.addEventListener("click",t=>{if(t.target.classList.contains("js_add")){const e=parseInt(t.target.dataset.id),n=s.findIndex(c=>c.id===e);if(n===-1){const c=r.find(a=>a.id===e);s.push({...c,quantity:1})}else s.splice(n,1);localStorage.setItem("cartData",JSON.stringify(s)),o(),l(),d()}});p.addEventListener("click",t=>{const e=t.target.classList.contains("js_plus"),n=t.target.classList.contains("js_minus"),c=t.target.classList.contains("js_removeSingle");if(!e&&!n&&!c)return;const a=parseInt(t.target.dataset.id),i=s.findIndex(u=>u.id===a);i!==-1&&(e?s[i].quantity+=1:n&&(s[i].quantity>1?s[i].quantity-=1:s[i].quantity=0),(s[i].quantity===0||c)&&s.splice(i,1),localStorage.setItem("cartData",JSON.stringify(s)),l(),o(),d())});j.addEventListener("click",t=>{s=[],localStorage.removeItem("cartData"),l(),o(),d()});v.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});const g=JSON.parse(localStorage.getItem("productsBackup"));g===null?fetch("https://fakestoreapi.com/products").then(t=>t.json()).then(t=>{r=t,localStorage.setItem("productsBackup",JSON.stringify(r)),o()}).catch(t=>{}):(r=g,o());const L=JSON.parse(localStorage.getItem("cartData"));L!==null&&(s=L,l(),d());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
