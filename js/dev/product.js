import "./main.min.js";
import "./closebtn.min.js";
import "./productcomp.min.js";
import "./inputform.min.js";
import "./countactions.min.js";
import "./breadcrumb.min.js";
import "./logo.min.js";
import "./common.min.js";
const sizeButtons = document.querySelectorAll(".size-content-product__button");
sizeButtons.forEach((button) => {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    sizeButtons.forEach((btn) => btn.classList.remove("size-content-product__button--active"));
    this.classList.add("size-content-product__button--active");
  });
});
