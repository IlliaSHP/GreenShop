const quantityInput = document.querySelector(".count-actions__quantity");
const plusButtons = document.querySelectorAll(".count-actions__button--plus, .product-action-sticky__count-btn--plus");
const minusButtons = document.querySelectorAll(".count-actions__button--minus, .product-action-sticky__count-btn--minus");
function getQuantity() {
  let quantity = parseInt(quantityInput.textContent.trim()) || 1;
  return Math.max(1, quantity);
}
function setQuantity(value) {
  value = Math.max(1, parseInt(value) || 1);
  quantityInput.textContent = value;
}
plusButtons.forEach((button) => {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    const currentQuantity = getQuantity();
    setQuantity(currentQuantity + 1);
  });
});
minusButtons.forEach((button) => {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    const currentQuantity = getQuantity();
    if (currentQuantity > 1) {
      setQuantity(currentQuantity - 1);
    }
  });
});
quantityInput.addEventListener("blur", function() {
  let value = parseInt(this.textContent.trim()) || 1;
  this.textContent = Math.max(1, value);
});
quantityInput.addEventListener("input", function() {
  this.textContent = this.textContent.replace(/[^0-9]/g, "");
});
