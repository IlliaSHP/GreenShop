import "./main.min.js";
import "./closebtn.min.js";
import "./productcomp.min.js";
import "./inputform.min.js";
import "./countactions.min.js";
import "./scrollto.min.js";
import "./breadcrumb.min.js";
import "./common.min.js";
const toggleActiveClass = (selector, activeClass = "active") => {
  document.querySelectorAll(selector).forEach((el) => {
    el.addEventListener("click", function(e) {
      e.preventDefault();
      this.classList.toggle(activeClass);
    });
  });
};
const setSingleActive = (selector, activeClass = "active") => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    el.addEventListener("click", function(e) {
      e.preventDefault();
      elements.forEach((item) => item.classList.remove(activeClass));
      this.classList.add(activeClass);
    });
  });
};
setSingleActive(".size-content-product__button", "size-content-product__button--active");
toggleActiveClass(".actions-content-product__button--favorite", "actions-content-product__button--favorite--active");
toggleActiveClass(".icons-product-sliders__favorite", "icons-product-sliders__favorite--active");
toggleActiveClass(".actions-content-product__button.button--second", "actions-content-product__button--active");
