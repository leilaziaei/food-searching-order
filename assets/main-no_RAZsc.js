import"./style-BXThLmaq.js";var e=`https://www.themealdb.com/api/json/v1/1/`,t=[];function n(e){return e.map(e=>(e.price=Math.floor(Math.random()*61)+10,e))}async function r(e){try{let r=await(await fetch(`${e}search.php?s=`)).json();return t=n(r.meals||[]),a(t),r}catch(e){console.error(`Error fetching meals:`,e)}}function i(e){let t=[`۰`,`۱`,`۲`,`۳`,`۴`,`۵`,`۶`,`۷`,`۸`,`۹`];return e.toString().replace(/\d/g,e=>t[e])}function a(e){let t=document.querySelector(`#mealList`);t.innerHTML=``,e.forEach(e=>{let n=`
      <div
        class="meal mb-8 flex h-[300px] w-full cursor-pointer flex-col items-center justify-between overflow-hidden rounded-lg border border-[rgba(58,61,66,0.06)] bg-white pb-6 text-center shadow-md transition duration-200 ease-out hover:shadow-xl"
      >

        <img
          src="${e.strMealThumb}"
          alt="${e.strMeal}"
          class="w-full h-[9.6875rem] object-cover"
        />

        <h3
          class="text-[rgb(58,61,66)] text-ellipsis break-normal px-[5px] mt-2 mb-2 break-words text-center box-border"
        >
          ${e.strMeal}
        </h3>

        <p class="mb-[10px] text-[10px]">
          قیمت : ${i(e.price)} دلار
        </p>

        <button
          class="btnAdd inline-flex items-center cursor-pointer transition-[150ms] ease-out box-border min-w-[6.6875rem] w-auto h-10 border-[0.09375rem] border-[rgba(255,0,166,0.06)] rounded-[3rem] text-[#ff00a6] bg-white bg-clip-padding shadow-[rgba(58,61,66,0.06)_0px_1px_0px,rgba(0,0,0,0.2)_0px_4px_16px_-8px] text-sm px-[15px] hover:bg-[#e00096] hover:text-white hover:border-[rgba(255,0,166,0.06)]"
          onClick="addToCart('${e.idMeal}', '${e.strMeal}', ${e.price}, '${e.strMealThumb}')"
        >
          افزودن سبد خرید
        </button>

      </div>
    `;t.innerHTML+=n})}function o(){let e=localStorage.getItem(`loggedUser`);return JSON.parse(localStorage.getItem(`Cart_${e}`))||[]}function s(){let e=o().reduce((e,t)=>e+t.quantity,0),t=document.querySelector(`#cartCount`);t.textContent=i(e)}function c(){let e=o(),t=document.querySelector(`#cartItems`),n=document.querySelector(`#loginReminder`),r=document.querySelector(`#cartTotal`),a=document.querySelector(`#checkoutButton`);t.innerHTML=``;let s=0;if(e.forEach((e,n)=>{t.innerHTML+=`
      <tr>

        <!-- تصویر -->
        <td class="border-b border-[#ebedf0] p-3 text-center">
          <img
            src="${e.pictur}"
            alt="${e.title}"
            class="mx-auto h-[50px] w-[50px] rounded-full object-cover"
          />
        </td>

        <!-- نام -->
        <td class="border-b border-[#ebedf0] p-3 text-center">
          ${e.title}
        </td>

        <!-- قیمت -->
        <td class="border-b border-[#ebedf0] p-3 text-center">
          ${i(e.price)} دلار
        </td>

        <!-- تعداد -->
        <td class="border-b border-[#ebedf0] p-3 text-center">

          <div
            class="btns-modal mx-auto flex w-fit items-center justify-center gap-[10px] rounded-[3px] border border-[#e0e0e2] px-[10px] py-[5px] text-base text-[#42cb81]"
          >

            <button
              onClick="changeQuantity('${n}', -1)"
              class="cursor-pointer text-base"
            >
              -
            </button>

            <span>
              ${i(e.quantity)}
            </span>

            <button
              onClick="changeQuantity('${n}', +1)"
              class="cursor-pointer text-base"
            >
              +
            </button>

          </div>

        </td>

        <!-- مجموع -->
        <td class="border-b border-[#ebedf0] p-3 text-center">
          ${i(e.price*e.quantity)} دلار
        </td>

        <!-- عملیات -->
        <td class="border-b border-[#ebedf0] p-3 text-center">

          <button
            onClick="removeCart('${n}')"
            class="cursor-pointer text-[#333] transition-colors hover:text-[rgb(250,40,75)]"
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >

              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m0 0a48.11 48.11 0 0 1 3.478.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />

            </svg>

          </button>

        </td>

      </tr>
    `,s+=e.price*e.quantity}),localStorage.getItem(`token`)?(n.classList.add(`hidden`),r.textContent=`مجموع خرید: ${i(s)} دلار`,a.classList.remove(`hidden`)):(n.classList.remove(`hidden`),r.textContent=`مجموع خرید: ${i(s)} دلار`,a.classList.add(`hidden`)),e.length===0){t.innerHTML=`
      <tr>
        <td
          colspan="6"
          class="text-center align-middle text-[20px] h-[100px]"
        >
          سبد خرید شما خالی است.
        </td>
      </tr>
    `,a.classList.add(`hidden`);return}}function l(){let e=document.querySelector(`#authSection`);localStorage.getItem(`token`)?(e.innerHTML=`
      <div class="user-menu-container">

        <img
          src="images/user-icon.png"
          id="userIcon"
          class="user-icon"
          alt="User Icon"
        >

        <div id="userMenu" class="user-menu hidden">

          <p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >

              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />

            </svg>

            ${localStorage.getItem(`loggedUser`)}

          </p>

          <p>

            <button id="logoutButton">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >

                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />

              </svg>

              خروج

            </button>

          </p>

        </div>

      </div>
    `,document.querySelector(`#userIcon`).addEventListener(`click`,()=>{document.querySelector(`#userMenu`).classList.toggle(`hidden`)}),document.querySelector(`#logoutButton`).addEventListener(`click`,()=>{localStorage.removeItem(`token`),localStorage.removeItem(`loggedUser`),location.reload()})):e.innerHTML=`
      <div
        class="flex items-center justify-center flex-row gap-2 w-full text-[15px]"
      >

        <a
          href="./login.html"
          class="hover:text-pink-500"
        >
          ورود
        </a>

        <span>|</span>

        <a
          href="./register.html"
          class="hover:text-pink-500"
        >
          ثبت نام
        </a>

      </div>
    `,window.addEventListener(`click`,e=>{let t=document.querySelector(`#userMenu`),n=document.querySelector(`#userIcon`);!t.contains(e.target)&&!n.contains(e.target)&&t.classList.add(`hidden`)})}function u(e,t=`success`){let n=document.querySelector(`#notification`);n.innerHTML=e,n.className=t===`error`?`show error`:`show`,setTimeout(()=>{n.classList.remove(`show`),n.classList.remove(`error`)},3e3)}var d={search:``,region:``,category:``,ingredient:``};function f(){sessionStorage.setItem(`mealFilters`,JSON.stringify(d))}function p(){let e=sessionStorage.getItem(`mealFilters`);e&&(d=JSON.parse(e))}function m(){sessionStorage.removeItem(`mealFilters`)}function h(){if(document.querySelector(`#searchInput`).value=d.search,document.querySelector(`#ingredientSelect`).value=d.ingredient,document.querySelector(`#categorySelect`).value=d.category,d.region){let e=document.querySelector(`[data-region="${d.region}"]`);e&&(v(e),b=d.region)}}async function g(t,n){let r;switch(t){case`area`:r=`${e}filter.php?a=${encodeURIComponent(n)}`;break;case`category`:r=`${e}filter.php?c=${encodeURIComponent(n)}`;break;case`ingredient`:r=`${e}filter.php?i=${encodeURIComponent(n)}`;break;default:throw Error(`نوع فیلتر معتبر نیست.`)}return(await(await fetch(r)).json()).meals||[]}async function _(){try{if(!d.search&&!d.region&&!d.category&&!d.ingredient){r(e);return}let t=[];d.search&&(t=(await(await fetch(`${e}search.php?s=${encodeURIComponent(d.search)}`)).json()).meals||[]);let i=[[`area`,d.region],[`category`,d.category],[`ingredient`,d.ingredient]].filter(([,e])=>e),o=await Promise.all(i.map(([e,t])=>g(e,t)));!d.search&&o.length>0&&(t=o[0],o.shift());for(let e of o){let n=new Set(e.map(e=>e.idMeal));t=t.filter(e=>n.has(e.idMeal))}if(t.length===0){a([]),u(`هیچ غذایی با این فیلترها پیدا نشد.`,`error`);return}a(n(t))}catch(e){console.error(`خطا در اعمال فیلترها:`,e)}}document.querySelector(`#searchForm`).addEventListener(`submit`,e=>{e.preventDefault();let t=document.querySelector(`#searchInput`).value.trim();d.search=t,f(),_()}),document.querySelector(`#searchInput`).addEventListener(`input`,e=>{let t=e.target.value.trim();d.search=t,f(),_()});function v(e){document.querySelectorAll(`[data-region]`).forEach(e=>{e.classList.remove(`shadow-pink-500`,`shadow-md`,`text-pink-500`)}),e.classList.add(`shadow-pink-500`,`shadow-md`,`text-pink-500`)}function y(e){e.classList.remove(`shadow-pink-500`,`shadow-md`,`text-pink-500`),b=null,f(),_()}var b=null;document.querySelector(`#regionSearch`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-region]`);if(!t)return;let n=t.dataset.region;if(n){if(b===n){d.region=``,f(),y(t);return}v(t),d.region=n,b=n,f(),_()}}),document.querySelector(`#ingredientSelect`).addEventListener(`change`,e=>{d.ingredient=e.target.value,f(),_()}),document.querySelector(`#categorySelect`).addEventListener(`change`,e=>{d.category=e.target.value,f(),_()}),document.querySelector(`#clearFilters`).addEventListener(`click`,()=>{document.querySelector(`#searchInput`).value=``,document.querySelector(`#ingredientSelect`).value=``,document.querySelector(`#categorySelect`).value=``,document.querySelectorAll(`[data-region]`).forEach(e=>{e.classList.remove(`shadow-pink-500`,`shadow-md`,`text-pink-500`)}),d={search:``,region:``,category:``,ingredient:``},b=null,m(),_()}),document.querySelector(`#cartIcon`).addEventListener(`click`,()=>{document.querySelector(`#cartModal`).classList.remove(`hidden`),c()}),document.querySelector(`#closeModal`).addEventListener(`click`,()=>{document.querySelector(`#cartModal`).classList.add(`hidden`)}),document.querySelector(`#cartModal`).addEventListener(`click`,e=>{let t=document.querySelector(`#cartModal`);(e.target.id===`cartModal`||e.target.id===`closeModal`)&&t.classList.add(`hidden`)}),window.addEventListener(`load`,()=>{p(),h(),sessionStorage.getItem(`mealFilters`)?_():r(e),l(),s()});