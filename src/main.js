// import "../node_modules/animate.css/animate.min.css";
// ======================================================
// TheMealDB API
// ======================================================

// https://www.themealdb.com/api/json/v1/1/
// https://www.themealdb.com/api/json/v1/1/search.php?s=
import "./style.css";
// fetch API
const apiURL = "https://www.themealdb.com/api/json/v1/1/";

let mealData = [];

// ======================================================
// Add Random Price
// ======================================================

function addRandomPrice(meals) {
  return meals.map((meal) => {
    meal.price = Math.floor(Math.random() * (70 - 10 + 1)) + 10;
    return meal;
  });
}

// ======================================================
// Fetch All Meals
// ======================================================

async function fetchMealsFromAPI(url) {
  try {
    const response = await fetch(`${url}search.php?s=`);
    const data = await response.json();
    // console.log(data.meals);

    mealData = addRandomPrice(data.meals || []);
    // console.log(mealData);

    displayMeals(mealData);

    return data;
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
}

// ======================================================
// Utility
// Convert Number To Persian Number
// ======================================================

function convertToPersianNumber(number) {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return number.toString().replace(/\d/g, (digit) => persianNumbers[digit]);
}

// ======================================================
// Create Food Elements
// ======================================================

function displayMeals(meals) {
  const mealList = document.querySelector("#mealList");

  mealList.innerHTML = "";

  meals.forEach((meal) => {
    const mealItem = `
      <div
        class="meal mb-8 flex h-[300px] w-full cursor-pointer flex-col items-center justify-between overflow-hidden rounded-lg border border-[rgba(58,61,66,0.06)] bg-white pb-6 text-center shadow-md transition duration-200 ease-out hover:shadow-xl"
      >

        <img
          src="${meal.strMealThumb}"
          alt="${meal.strMeal}"
          class="w-full h-[9.6875rem] object-cover"
        />

        <h3
          class="text-[rgb(58,61,66)] text-ellipsis break-normal px-[5px] mt-2 mb-2 break-words text-center box-border"
        >
          ${meal.strMeal}
        </h3>

        <p class="mb-[10px] text-[10px]">
          قیمت : ${convertToPersianNumber(meal.price)} دلار
        </p>

        <button
          class="btnAdd inline-flex items-center cursor-pointer transition-[150ms] ease-out box-border min-w-[6.6875rem] w-auto h-10 border-[0.09375rem] border-[rgba(255,0,166,0.06)] rounded-[3rem] text-[#ff00a6] bg-white bg-clip-padding shadow-[rgba(58,61,66,0.06)_0px_1px_0px,rgba(0,0,0,0.2)_0px_4px_16px_-8px] text-sm px-[15px] hover:bg-[#e00096] hover:text-white hover:border-[rgba(255,0,166,0.06)]"
          onClick="addToCart('${meal.idMeal}', '${meal.strMeal}', ${meal.price}, '${meal.strMealThumb}')"
        >
          افزودن سبد خرید
        </button>

      </div>
    `;

    mealList.innerHTML += mealItem;
  });
}

// ======================================================
// Basket
// ======================================================

window.addToCart = function (id, title, price, pictur) {
  const userCart = loadUserCart();

  const exsitingItem = userCart.find((item) => item.id === id);

  if (exsitingItem) {
    exsitingItem.quantity += 1;
  } else {
    userCart.push({
      id,
      title,
      price,
      pictur,
      quantity: 1,
    });
  }

  saveUserCart(userCart);

  updatCart();

  showNotification(`${title} به سبد خرید اضافه شد.`);
};

// ======================================================
// Save User Cart
// ======================================================

function saveUserCart(cart) {
  const username = localStorage.getItem("loggedUser");

  localStorage.setItem(`Cart_${username}`, JSON.stringify(cart));
}

// ======================================================
// Load User Cart
// ======================================================

function loadUserCart() {
  const username = localStorage.getItem("loggedUser");

  const userCart = JSON.parse(localStorage.getItem(`Cart_${username}`)) || [];

  return userCart;
}

// ======================================================
// Update Basket Icon
// ======================================================

function updatCart() {
  const userCart = loadUserCart();

  const countCart = userCart.reduce((sum, item) => sum + item.quantity, 0);

  const cartCount = document.querySelector("#cartCount");

  cartCount.textContent = convertToPersianNumber(countCart);
}

// ======================================================
// Modal Design
// ======================================================

function displayCartItem() {
  const userCart = loadUserCart();

  const cartItems = document.querySelector("#cartItems");

  const notifModal = document.querySelector("#loginReminder");

  const cartTotal = document.querySelector("#cartTotal");

  const checkoutButton = document.querySelector("#checkoutButton");

  cartItems.innerHTML = "";

  let totalPrice = 0;

  userCart.forEach((item, index) => {
    cartItems.innerHTML += `
      <tr>

        <!-- تصویر -->
        <td class="border-b border-[#ebedf0] p-3 text-center">
          <img
            src="${item.pictur}"
            alt="${item.title}"
            class="mx-auto h-[50px] w-[50px] rounded-full object-cover"
          />
        </td>

        <!-- نام -->
        <td class="border-b border-[#ebedf0] p-3 text-center">
          ${item.title}
        </td>

        <!-- قیمت -->
        <td class="border-b border-[#ebedf0] p-3 text-center">
          ${convertToPersianNumber(item.price)} دلار
        </td>

        <!-- تعداد -->
        <td class="border-b border-[#ebedf0] p-3 text-center">

          <div
            class="btns-modal mx-auto flex w-fit items-center justify-center gap-[10px] rounded-[3px] border border-[#e0e0e2] px-[10px] py-[5px] text-base text-[#42cb81]"
          >

            <button
              onClick="changeQuantity('${index}', -1)"
              class="cursor-pointer text-base"
            >
              -
            </button>

            <span>
              ${convertToPersianNumber(item.quantity)}
            </span>

            <button
              onClick="changeQuantity('${index}', +1)"
              class="cursor-pointer text-base"
            >
              +
            </button>

          </div>

        </td>

        <!-- مجموع -->
        <td class="border-b border-[#ebedf0] p-3 text-center">
          ${convertToPersianNumber(item.price * item.quantity)} دلار
        </td>

        <!-- عملیات -->
        <td class="border-b border-[#ebedf0] p-3 text-center">

          <button
            onClick="removeCart('${index}')"
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
    `;

    totalPrice += item.price * item.quantity;
  });

  // ======================================================
  // Modal Details
  // ======================================================

  const isToken = localStorage.getItem("token");

  if (isToken) {
    notifModal.classList.add("hidden");

    cartTotal.textContent = `مجموع خرید: ${convertToPersianNumber(
      totalPrice,
    )} دلار`;

    checkoutButton.classList.remove("hidden");
  } else {
    notifModal.classList.remove("hidden");

    cartTotal.textContent = `مجموع خرید: ${convertToPersianNumber(
      totalPrice,
    )} دلار`;

    checkoutButton.classList.add("hidden");
  }

  // ======================================================
  // Empty Cart
  // ======================================================

  if (userCart.length === 0) {
    cartItems.innerHTML = `
      <tr>
        <td
          colspan="6"
          class="text-center align-middle text-[20px] h-[100px]"
        >
          سبد خرید شما خالی است.
        </td>
      </tr>
    `;

    checkoutButton.classList.add("hidden");

    return;
  }
}

// ======================================================
// Quantity Change
// ======================================================

function changeQuantity(index, delta) {
  const cart = loadUserCart();

  if (cart[index].quantity + delta > 0) {
    cart[index].quantity += delta;
  } else {
    removeCart(index);
    return;
  }

  saveUserCart(cart);

  displayCartItem();

  updatCart();
}

// ======================================================
// Remove Cart
// ======================================================

function removeCart(index) {
  const cart = loadUserCart();

  cart.splice(index, 1);

  saveUserCart(cart);

  displayCartItem();

  updatCart();
}

// ======================================================
// Login / Logout / Sign Up / Sign In
// ======================================================

function manageAuth() {
  const authSection = document.querySelector("#authSection");

  const token = localStorage.getItem("token");

  if (token) {
    const username = localStorage.getItem("loggedUser");

    authSection.innerHTML = `
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

            ${username}

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
    `;

    document.querySelector("#userIcon").addEventListener("click", () => {
      const userMenu = document.querySelector("#userMenu");

      userMenu.classList.toggle("hidden");
    });

    document.querySelector("#logoutButton").addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedUser");

      location.reload();
    });

    // *******************
  } else {
    authSection.innerHTML = `
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
    `;
  }

  window.addEventListener("click", (e) => {
    const userMenu = document.querySelector("#userMenu");
    const userIcon = document.querySelector("#userIcon");

    if (!userMenu.contains(e.target) && !userIcon.contains(e.target)) {
      userMenu.classList.add("hidden");
    }
  });
}

// ======================================================
// Show Notification
// ======================================================

function showNotification(message, type = "success") {
  const notification = document.querySelector("#notification");

  notification.innerHTML = message;

  notification.className = type === "error" ? "show error" : "show";

  setTimeout(() => {
    notification.classList.remove("show");
    notification.classList.remove("error");
  }, 3000);
}

// ======================================================
// FILTERS
// ======================================================

let filters = {
  search: "",
  region: "",
  category: "",
  ingredient: "",
};
// ======================================================
// Session Storage - Filters
// ======================================================

function saveFilters() {
  sessionStorage.setItem("mealFilters", JSON.stringify(filters));
}

function loadFilters() {
  const savedFilters = sessionStorage.getItem("mealFilters");

  if (savedFilters) {
    filters = JSON.parse(savedFilters);
  }
}

function clearSavedFilters() {
  sessionStorage.removeItem("mealFilters");
}

function restoreFilterInputs() {
  document.querySelector("#searchInput").value = filters.search;

  document.querySelector("#ingredientSelect").value = filters.ingredient;

  document.querySelector("#categorySelect").value = filters.category;

  if (filters.region) {
    const regionElement = document.querySelector(
      `[data-region="${filters.region}"]`,
    );

    if (regionElement) {
      setActiveRegion(regionElement);
      selectedRegion = filters.region;
    }
  }
}

// ======================================================
// Get Meals By Filter
// ======================================================

async function getFilterMeals(type, value) {
  let url;

  switch (type) {
    case "area":
      url = `${apiURL}filter.php?a=${encodeURIComponent(value)}`;
      break;

    case "category":
      url = `${apiURL}filter.php?c=${encodeURIComponent(value)}`;
      break;

    case "ingredient":
      url = `${apiURL}filter.php?i=${encodeURIComponent(value)}`;
      break;

    default:
      throw new Error("نوع فیلتر معتبر نیست.");
  }

  const response = await fetch(url);

  const data = await response.json();

  return data.meals || [];
}

// ======================================================
// Apply Filters
// ======================================================

async function applyFilters() {
  try {
    // ==================================================
    // اگر هیچ فیلتری فعال نیست
    // ==================================================

    if (
      !filters.search &&
      !filters.region &&
      !filters.category &&
      !filters.ingredient
    ) {
      fetchMealsFromAPI(apiURL);

      return;
    }

    let meals = [];

    // ==================================================
    // Search
    // ==================================================

    if (filters.search) {
      const response = await fetch(
        `${apiURL}search.php?s=${encodeURIComponent(filters.search)}`,
      );
      // const response = await fetch(getFilterMeals("search", filters.search));

      const data = await response.json();

      meals = data.meals || [];
    }

    // ==================================================
    // Active Filters
    // ==================================================

    const activeFilters = [
      ["area", filters.region],
      ["category", filters.category],
      ["ingredient", filters.ingredient],
    ].filter(([, value]) => value);

    // ==================================================
    // Get Filter Results
    // ==================================================

    const filterResults = await Promise.all(
      activeFilters.map(([type, value]) => getFilterMeals(type, value)),
    );

    // ==================================================
    // اگر Search فعال نیست
    // اولین فیلتر به عنوان Base استفاده می‌شود
    // ==================================================

    if (!filters.search && filterResults.length > 0) {
      meals = filterResults[0];

      filterResults.shift();
    }

    // ==================================================
    // Combine Filters
    // ==================================================

    for (const filterList of filterResults) {
      const filterIds = new Set(filterList.map((meal) => meal.idMeal));

      meals = meals.filter((meal) => filterIds.has(meal.idMeal));
    }

    // ==================================================
    // No Result
    // ==================================================

    if (meals.length === 0) {
      displayMeals([]);

      showNotification("هیچ غذایی با این فیلترها پیدا نشد.", "error");

      return;
    }

    // ==================================================
    // Add Price
    // ==================================================

    const mealsData = addRandomPrice(meals);

    displayMeals(mealsData);
  } catch (error) {
    console.error("خطا در اعمال فیلترها:", error);
  }
}

// ======================================================
// Search Form
// ======================================================

document.querySelector("#searchForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const searchInput = document.querySelector("#searchInput").value.trim();

  filters.search = searchInput;
  saveFilters();

  applyFilters();
});

// ======================================================
// Search Input
// ======================================================

document.querySelector("#searchInput").addEventListener("input", (e) => {
  const searchInput = e.target.value.trim();

  filters.search = searchInput;
  saveFilters();

  applyFilters();
});

// ======================================================
// Filter By Region
// ======================================================

function setActiveRegion(element) {
  document.querySelectorAll("[data-region]").forEach((item) => {
    item.classList.remove("shadow-pink-500", "shadow-md", "text-pink-500");
  });

  element.classList.add("shadow-pink-500", "shadow-md", "text-pink-500");
}

function resetRegionFilter(element) {
  element.classList.remove("shadow-pink-500", "shadow-md", "text-pink-500");

  selectedRegion = null;
  saveFilters();
  applyFilters();
}

let selectedRegion = null;

document.querySelector("#regionSearch").addEventListener("click", (e) => {
  const regionElement = e.target.closest("[data-region]");

  // اگر روی Region کلیک نشده بود
  if (!regionElement) return;

  const region = regionElement.dataset.region;

  if (!region) return;

  // ==================================================
  // اگر همان Region دوباره کلیک شد
  // ==================================================

  if (selectedRegion === region) {
    filters.region = "";
    saveFilters();
    resetRegionFilter(regionElement);

    return;
  }

  // ==================================================
  // انتخاب Region جدید
  // ==================================================

  setActiveRegion(regionElement);

  filters.region = region;

  selectedRegion = region;
  saveFilters();

  applyFilters();
});

// ======================================================
// Filter By Ingredient
// ======================================================

document.querySelector("#ingredientSelect").addEventListener("change", (e) => {
  filters.ingredient = e.target.value;
  saveFilters();
  applyFilters();
});

// ======================================================
// Filter By Category
// ======================================================

document.querySelector("#categorySelect").addEventListener("change", (e) => {
  filters.category = e.target.value;
  saveFilters();
  applyFilters();
});

// ======================================================
// Clear Filters
// ======================================================

document.querySelector("#clearFilters").addEventListener("click", () => {
  // پاک کردن Search
  document.querySelector("#searchInput").value = "";

  // پاک کردن Ingredient
  document.querySelector("#ingredientSelect").value = "";

  // پاک کردن Category
  document.querySelector("#categorySelect").value = "";

  // پاک کردن Region
  document.querySelectorAll("[data-region]").forEach((item) => {
    item.classList.remove("shadow-pink-500", "shadow-md", "text-pink-500");
  });

  // ==================================================
  // خود filters هم باید Reset شود
  // ==================================================

  filters = {
    search: "",
    region: "",
    category: "",
    ingredient: "",
  };

  selectedRegion = null;
  clearSavedFilters();
  // نمایش همه غذاها
  applyFilters();
});

// ======================================================
// Cart Modal
// ======================================================

document.querySelector("#cartIcon").addEventListener("click", () => {
  const modal = document.querySelector("#cartModal");

  modal.classList.remove("hidden");

  displayCartItem();
});

document.querySelector("#closeModal").addEventListener("click", () => {
  const modal = document.querySelector("#cartModal");

  modal.classList.add("hidden");
});

document.querySelector("#cartModal").addEventListener("click", (e) => {
  const modal = document.querySelector("#cartModal");

  if (e.target.id === "cartModal" || e.target.id === "closeModal") {
    modal.classList.add("hidden");
  }
});

// ======================================================
// Window Load
// ======================================================

window.addEventListener("load", () => {
  // countries(apiURL);

  loadFilters();
  restoreFilterInputs();
  if (sessionStorage.getItem("mealFilters")) {
    applyFilters();
  } else {
    fetchMealsFromAPI(apiURL);
  }

  manageAuth();

  updatCart();
});
