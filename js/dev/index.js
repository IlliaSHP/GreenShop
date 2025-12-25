import "./main.min.js";
import "./closebtn.min.js";
import "./select.min.js";
import "./productcomp.min.js";
import "./inputform.min.js";
import "./scrollto.min.js";
import "./common.min.js";
document.addEventListener("DOMContentLoaded", function() {
  const filtersButton = document.querySelector(".header__filters");
  const catalogFilters = document.querySelector(".catalog-filters");
  const closeFiltersButton = document.querySelector(".catalog-filters__close");
  const logoButton = document.querySelector(".catalog-filters__logo");
  const html = document.documentElement;
  let closeActive = false;
  if (filtersButton) {
    filtersButton.addEventListener("click", function() {
      if (html.hasAttribute("data-filters-open")) {
        html.removeAttribute("data-filters-open");
        html.removeAttribute("data-fls-scrolllock");
      } else {
        html.setAttribute("data-filters-open", "");
        html.setAttribute("data-fls-scrolllock", "");
      }
    });
  }
  if (logoButton) {
    logoButton.addEventListener("click", function() {
      html.removeAttribute("data-filters-open");
      html.removeAttribute("data-fls-scrolllock");
    });
  }
  if (closeFiltersButton) {
    closeFiltersButton.addEventListener("click", function() {
      html.removeAttribute("data-filters-open");
      html.removeAttribute("data-fls-scrolllock");
      if (!closeActive) {
        closeFiltersButton.classList.add("catalog-filters__close--active");
        closeActive = true;
      } else {
        closeFiltersButton.classList.remove("catalog-filters__close--active");
        closeActive = false;
      }
    });
  }
  document.addEventListener("click", function(event) {
    const isClickInFilters = catalogFilters && catalogFilters.contains(event.target);
    const isClickOnButton = filtersButton && filtersButton.contains(event.target);
    if (!isClickInFilters && !isClickOnButton) {
      html.removeAttribute("data-filters-open");
      html.removeAttribute("data-fls-scrolllock");
    }
  });
});
const priceRangeInput = document.getElementById("price-range");
function updateRangeBackground() {
  const min = priceRangeInput.min;
  const max = priceRangeInput.max;
  const value = priceRangeInput.value;
  const percentage = (value - min) / (max - min) * 100;
  priceRangeInput.style.setProperty("--value", percentage);
}
updateRangeBackground();
priceRangeInput.addEventListener("input", updateRangeBackground);
function formatPrice(price) {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return numPrice.toFixed(2);
}
const arrowSvgHtml = `<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.58301 12.4168C6.58301 12.4168 0.749674 8.96346 0.749674 6.58346C0.749674 4.20429 6.58301 0.750122 6.58301 0.750122" stroke="#3D3D3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                     </svg>`;
const productsData = [
  {
    id: 1,
    name: "Barberton Daisy",
    price: 119,
    image: "assets/img/plants/2.webp",
    category: "house-plants",
    size: "medium",
    isNew: true,
    isSale: false,
    rating: 4.5,
    popularity: 85
  },
  {
    id: 2,
    name: "Angel Wing Begonia",
    price: 169,
    image: "assets/img/plants/3.png",
    category: "potter-plants",
    size: "small",
    isNew: true,
    isSale: false,
    rating: 4.8,
    popularity: 92
  },
  {
    id: 3,
    name: "African Violet",
    price: 199,
    originalPrice: 229,
    image: "assets/img/plants/4.webp",
    category: "seeds",
    size: "medium",
    isNew: false,
    isSale: true,
    rating: 4.7,
    popularity: 78
  },
  {
    id: 4,
    name: "Beach Spider Lily",
    price: 129,
    image: "assets/img/plants/1.webp",
    category: "small-plants",
    size: "large",
    isNew: false,
    isSale: false,
    rating: 4.3,
    popularity: 65
  },
  {
    id: 5,
    name: "Blushing Bromeliad",
    price: 139,
    image: "assets/img/plants/6.webp",
    category: "big-plants",
    size: "small",
    isNew: true,
    isSale: false,
    rating: 4.6,
    popularity: 88
  },
  {
    id: 6,
    name: "Aluminum Plant",
    price: 179,
    image: "assets/img/plants/7.webp",
    category: "succulents",
    size: "large",
    isNew: false,
    isSale: false,
    rating: 4.4,
    popularity: 72
  },
  {
    id: 7,
    name: "Birds Nest Fern",
    price: 99,
    image: "assets/img/plants/8.webp",
    category: "terrariums",
    size: "medium",
    isNew: true,
    isSale: false,
    rating: 4.2,
    popularity: 95
  },
  {
    id: 8,
    name: "Broadleaf Lady Palm",
    price: 259,
    originalPrice: 319,
    image: "assets/img/plants/9.webp",
    category: "gardening",
    size: "large",
    isNew: false,
    isSale: true,
    rating: 4.9,
    popularity: 91
  },
  {
    id: 9,
    name: "Chinese Evergreen",
    price: 89,
    image: "assets/img/plants/10.webp",
    category: "accessories",
    size: "small",
    isNew: true,
    isSale: false,
    rating: 4.1,
    popularity: 58
  },
  {
    id: 10,
    name: "Cordyline Fruticosa",
    price: 229,
    image: "assets/img/plants/4.webp",
    category: "house-plants",
    size: "medium",
    isNew: false,
    isSale: false,
    rating: 4.5,
    popularity: 67
  },
  {
    id: 11,
    name: "Croton Petra",
    price: 149,
    originalPrice: 189,
    image: "assets/img/plants/6.webp",
    category: "potter-plants",
    size: "medium",
    isNew: false,
    isSale: true,
    rating: 4.3,
    popularity: 74
  },
  {
    id: 12,
    name: "Dieffenbachia Camille",
    price: 199,
    image: "assets/img/plants/7.webp",
    category: "seeds",
    size: "large",
    isNew: true,
    isSale: false,
    rating: 4.6,
    popularity: 82
  }
];
class CatalogManager {
  constructor() {
    this.allProducts = productsData;
    this.filteredProducts = [...this.allProducts];
    this.currentPage = 1;
    this.itemsPerPage = 9;
    this.currentFilter = "all";
    this.currentSort = "1";
    this.priceRange = { min: 39, max: 1230 };
    this.selectedCategory = null;
    this.selectedSize = null;
    this.mediaQueryListeners = [];
    this.init();
  }
  init() {
    this.setupResponsiveItemsPerPage();
    this.setupEventListeners();
    this.renderProducts();
    this.updateFilterCounts();
  }
  // НОВИЙ КОД: Метод для розрахунку itemsPerPage на основі ширини viewport
  setupResponsiveItemsPerPage() {
    const breakpoints = [
      { query: "(max-width: 479.98px)", itemsPerPage: 8 },
      // 2 ряди × 4 елементи
      { query: "(min-width: 480px) and (max-width: 719.98px)", itemsPerPage: 9 },
      // 3 ряди × 3 елементи
      { query: "(min-width: 720px) and (max-width: 949.98px)", itemsPerPage: 12 },
      // 3 ряди × 3 елементи
      { query: "(min-width: 950px)", itemsPerPage: 9 }
      // 3 ряди × 4 елементи
    ];
    this.mediaQueryListeners.forEach((listener) => listener.removeAllListeners?.());
    this.mediaQueryListeners = [];
    breakpoints.forEach((breakpoint) => {
      const mediaQuery = window.matchMedia(breakpoint.query);
      const listener = (e) => {
        if (e.matches) {
          this.itemsPerPage = breakpoint.itemsPerPage;
          this.currentPage = 1;
          this.renderProducts();
        }
      };
      mediaQuery.addEventListener("change", listener);
      if (mediaQuery.matches) {
        this.itemsPerPage = breakpoint.itemsPerPage;
      }
      this.mediaQueryListeners.push({ mediaQuery, listener });
    });
  }
  setupEventListeners() {
    document.querySelectorAll("[data-filter]").forEach((btn) => {
      btn.addEventListener("click", (e) => this.handleFilterButtonClick(e));
    });
    document.querySelectorAll(".categories-catalog-filters__item").forEach((item) => {
      const label = item.querySelector("label");
      const input = item.querySelector('input[name="category"]');
      if (label) {
        label.addEventListener("click", (e) => {
          e.preventDefault();
          this.toggleCategoryFilter(item, input);
        });
      }
    });
    document.getElementById("price-range")?.addEventListener("input", (e) => {
      const value = parseInt(e.target.value);
      this.priceRange.max = value;
      document.getElementById("max-price").textContent = "$" + value;
    });
    document.querySelector(".price-range-catalog-filters__button")?.addEventListener("click", () => {
      this.applyFilters();
    });
    document.querySelectorAll(".size-catalog-filters__item").forEach((item) => {
      const label = item.querySelector("label");
      const input = item.querySelector('input[name="size"]');
      if (label) {
        label.addEventListener("click", (e) => {
          e.preventDefault();
          this.toggleSizeFilter(item, input);
        });
      }
    });
    document.addEventListener("selectCallback", (e) => {
      const selectElement = e.detail.select;
      if (selectElement.id === "sort-select" || selectElement.name === "form[]") {
        this.currentSort = selectElement.value;
        this.currentPage = 1;
        this.applyFilters();
      }
    });
    document.querySelector(".pagination__list")?.addEventListener("click", (e) => {
      const button = e.target.closest("button");
      if (!button) return;
      const pageNum = parseInt(button.textContent);
      if (!isNaN(pageNum)) {
        this.goToPage(pageNum);
      } else if (button.querySelector("svg")) {
        const isPrevButton = button.classList.contains("pagination__prev");
        if (isPrevButton) {
          const prevPage = this.currentPage - 1;
          if (prevPage >= 1) {
            this.goToPage(prevPage);
          }
        } else {
          const nextPage = this.currentPage + 1;
          const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
          if (nextPage <= totalPages) {
            this.goToPage(nextPage);
          }
        }
      }
    });
  }
  handleFilterButtonClick(e) {
    document.querySelectorAll("[data-filter]").forEach((btn) => {
      btn.classList.remove("filter-buttons-content-catalog__button--active");
    });
    e.target.classList.add("filter-buttons-content-catalog__button--active");
    this.currentFilter = e.target.dataset.filter;
    this.currentPage = 1;
    this.applyFilters();
  }
  toggleCategoryFilter(item, input) {
    const isCurrentActive = item.classList.contains("categories-catalog-filters__item--active");
    document.querySelectorAll(".categories-catalog-filters__item").forEach((i) => {
      i.classList.remove("categories-catalog-filters__item--active");
      i.querySelector('input[name="category"]').checked = false;
    });
    if (isCurrentActive) {
      if (this.selectedCategory === input.value) {
        this.selectedCategory = null;
      } else {
        item.classList.add("categories-catalog-filters__item--active");
        input.checked = true;
        this.selectedCategory = input.value;
      }
    } else {
      item.classList.add("categories-catalog-filters__item--active");
      input.checked = true;
      this.selectedCategory = input.value;
    }
    this.currentPage = 1;
    this.applyFilters();
  }
  toggleSizeFilter(item, input) {
    const isCurrentActive = item.classList.contains("size-catalog-filters__item--active");
    document.querySelectorAll(".size-catalog-filters__item").forEach((i) => {
      i.classList.remove("size-catalog-filters__item--active");
      i.querySelector('input[name="size"]').checked = false;
    });
    if (isCurrentActive) {
      if (this.selectedSize === input.value) {
        this.selectedSize = null;
      } else {
        item.classList.add("size-catalog-filters__item--active");
        input.checked = true;
        this.selectedSize = input.value;
      }
    } else {
      item.classList.add("size-catalog-filters__item--active");
      input.checked = true;
      this.selectedSize = input.value;
    }
    this.currentPage = 1;
    this.applyFilters();
  }
  applyFilters() {
    let filtered = [...this.allProducts];
    if (this.currentFilter === "new") {
      filtered = filtered.filter((p) => p.isNew);
    } else if (this.currentFilter === "sale") {
      filtered = filtered.filter((p) => p.isSale);
    }
    if (this.selectedCategory) {
      filtered = filtered.filter((p) => p.category === this.selectedCategory);
    }
    filtered = filtered.filter((p) => p.price >= this.priceRange.min && p.price <= this.priceRange.max);
    if (this.selectedSize) {
      filtered = filtered.filter((p) => p.size === this.selectedSize);
    }
    filtered = this.sortProducts(filtered);
    this.filteredProducts = filtered;
    this.currentPage = 1;
    this.renderProducts();
    this.updateFilterCounts();
  }
  sortProducts(products) {
    const sorted = [...products];
    switch (this.currentSort) {
      case "1":
        return sorted;
      case "2":
        return sorted.sort((a, b) => b.price - a.price);
      case "3":
        return sorted.sort((a, b) => a.price - b.price);
      case "4":
        return sorted.sort((a, b) => b.isNew - a.isNew);
      case "5":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "6":
        return sorted.filter((p) => p.isSale && p.originalPrice).sort((a, b) => {
          const discountA = (a.originalPrice - a.price) / a.originalPrice * 100;
          const discountB = (b.originalPrice - b.price) / b.originalPrice * 100;
          return discountB - discountA;
        });
      case "7":
        return sorted.sort((a, b) => b.popularity - a.popularity);
      default:
        return sorted;
    }
  }
  updateFilterCounts() {
    document.querySelectorAll(".categories-catalog-filters__item").forEach((item) => {
      const input = item.querySelector('input[name="category"]');
      const span = item.querySelector("span");
      if (input && span) {
        const categoryValue = input.value;
        const count = this.allProducts.filter((p) => p.category === categoryValue).length;
        span.textContent = `(${count})`;
      }
    });
    document.querySelectorAll(".size-catalog-filters__item").forEach((item) => {
      const input = item.querySelector('input[name="size"]');
      const span = item.querySelector("span");
      if (input && span) {
        const sizeValue = input.value;
        let count;
        if (this.selectedCategory) {
          count = this.allProducts.filter(
            (p) => p.size === sizeValue && p.category === this.selectedCategory
          ).length;
        } else {
          count = this.allProducts.filter((p) => p.size === sizeValue).length;
        }
        span.textContent = `(${count})`;
      }
    });
  }
  createProductCard(product) {
    const isOnSale = product.isSale && product.originalPrice;
    const discountPercent = isOnSale ? Math.round((product.originalPrice - product.price) / product.originalPrice * 100) : 0;
    return `
      <article class="productcomp__card" data-id="${product.id}">
         <div class="productcomp__product">
            <a href="product.html" class="productcomp__image">
               <img src="${product.image}" alt="${product.name}">
            </a>
            ${isOnSale ? `<span class="productcomp__sale">${discountPercent}% OFF</span>` : ""}
            <div class="productcomp__actions">
               <button type="button" aria-label="Add to cart" class="productcomp__item">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M14.294 16.8721H8.24077C5.65655 16.8721 3.55412 14.7696 3.55412 12.1854V7.3816C3.55412 4.9793 2.35676 2.75568 0.351225 1.43334C-0.00894369 1.19588 -0.108379 0.711439 0.129078 0.35127C0.366535 -0.00893829 0.850939 -0.108412 1.21119 0.129123C2.35606 0.883986 3.28487 1.87959 3.94905 3.02586C4.09258 3.18665 5.24995 4.41338 7.14726 4.41338H16.142C18.596 4.36749 20.5168 6.83021 19.8752 9.19892L18.8397 13.3259C18.3159 15.4138 16.4466 16.8721 14.294 16.8721ZM4.91926 5.53431C5.04912 6.13424 5.11634 6.75284 5.11634 7.3816V12.1854C5.11634 13.9082 6.51796 15.3098 8.24077 15.3098H14.294C15.7291 15.3098 16.9752 14.3377 17.3245 12.9457L18.3599 8.81876C18.7412 7.41128 17.5997 5.94838 16.142 5.9756H7.14722C6.28913 5.9756 5.54224 5.7906 4.91926 5.53431ZM7.85021 19.0201C7.85021 18.4809 7.41307 18.0437 6.87383 18.0437C5.57828 18.0953 5.57942 19.9454 6.87383 19.9965C7.41307 19.9965 7.85021 19.5593 7.85021 19.0201ZM15.6222 19.0201C15.6222 18.4809 15.1851 18.0437 14.6459 18.0437C13.3503 18.0953 13.3514 19.9454 14.6459 19.9965C15.1851 19.9965 15.6222 19.5593 15.6222 19.0201ZM16.9231 8.31893C16.9231 7.88752 16.5734 7.53782 16.142 7.53782H7.45966C6.42329 7.57906 6.42407 9.05914 7.45966 9.10003H16.142C16.5734 9.10003 16.9231 8.75033 16.9231 8.31893Z" fill="#46A358"/>
                  </svg>
               </button>
               <button type="button" aria-label="Add to favorites" class="productcomp__item productcomp__item--favorite">
                  <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M12.5001 0.500065C10.0001 0.000118226 8.00014 2.5 8.00014 2.5C8.00014 2.5 6.00026 0.000164777 3.50015 0.500065C1.00003 0.999966 -0.499963 4.5 1.00015 7C2.50026 9.5 5.26647 11.2664 8.00014 14.0001C8.00014 14.0001 13.5001 9.5 15.0001 7C16.5001 4.5 15.0001 1.00001 12.5001 0.500065Z" stroke="black" stroke-width="1"/>
                  </svg>
               </button>
               <a href="product.html" aria-label="view" class="productcomp__item productcomp__item--view">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M14.5726 16.0029C10.5755 19.1865 4.988 18.3056 2.02842 14.6542C-0.828088 11.129 -0.64944 6.04347 2.44943 2.82482C5.65137 -0.500594 10.6854 -0.944524 14.3346 1.78337C15.642 2.76051 16.6183 4.00364 17.2542 5.50838C17.8938 7.02186 18.0881 8.59654 17.8663 10.2205C17.6452 11.837 17 13.2775 15.9499 14.6217C16.0349 14.6773 16.1255 14.7173 16.1904 14.7822C17.3448 15.9311 18.4947 17.0843 19.6491 18.2331C19.9227 18.5054 20.0589 18.8225 19.9776 19.2047C19.8165 19.9651 18.9107 20.2586 18.3298 19.7366C18.0575 19.4925 17.807 19.2234 17.5484 18.9649C16.6002 18.0177 15.6526 17.0699 14.7044 16.1227C14.665 16.0853 14.6238 16.0503 14.5726 16.0029ZM15.9605 8.98677C15.9705 5.12689 12.8529 2.00627 8.98261 2.00065C5.12292 1.99503 2.00781 5.09068 1.99094 8.94806C1.97408 12.8173 5.08544 15.9467 8.96762 15.9648C12.8117 15.9829 15.9505 12.8504 15.9605 8.98677Z" fill="#3D3D3D"/>
                  </svg>
               </a>
            </div>
         </div>
         <div class="productcomp__body">
            <h5 class="productcomp__title"><a href="#">${product.name}</a></h5>
            <div class="productcomp__price">
               <span>$${formatPrice(product.price)}</span>
               ${isOnSale ? `<del>$${formatPrice(product.originalPrice)}</del>` : ""}
            </div>
         </div>
      </article>
      `;
  }
  renderProducts() {
    const container = document.querySelector(".content-catalog__cards");
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
    container.innerHTML = "";
    paginatedProducts.forEach((product) => {
      container.insertAdjacentHTML("beforeend", this.createProductCard(product));
    });
    this.renderPagination();
  }
  renderPagination() {
    const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    const paginationList = document.querySelector(".pagination__list");
    paginationList.innerHTML = "";
    if (this.currentPage > 1) {
      const prevArrow = arrowSvgHtml.replace("<svg", '<svg style="transform: rotate(180deg)"');
      paginationList.insertAdjacentHTML("beforeend", `
            <li class="pagination__item">
               <button type="button" class="pagination__prev">
                  ${prevArrow}
               </button>
            </li>
         `);
    }
    for (let i = 1; i <= totalPages; i++) {
      const activeClass = i === this.currentPage ? " pagination__item--active" : "";
      paginationList.insertAdjacentHTML("beforeend", `
            <li class="pagination__item${activeClass}">
               <button type="button">${i}</button>
            </li>
         `);
    }
    if (totalPages > 1 && this.currentPage < totalPages) {
      paginationList.insertAdjacentHTML("beforeend", `
            <li class="pagination__item">
               <button type="button" class="pagination__next">
                  ${arrowSvgHtml}
               </button>
            </li>
         `);
    }
    if (totalPages === 0) {
      document.querySelector(".content-catalog__cards").innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No products found matching your filters.</p>';
    }
  }
  goToPage(pageNum) {
    if (pageNum < 1 || pageNum > Math.ceil(this.filteredProducts.length / this.itemsPerPage)) return;
    this.currentPage = pageNum;
    this.renderProducts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  new CatalogManager();
});
