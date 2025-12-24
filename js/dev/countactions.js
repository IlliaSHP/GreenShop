class DynamicAdapt {
  constructor() {
    this.type = "max";
    this.init();
  }
  init() {
    this.objects = [];
    this.daClassname = "--dynamic";
    this.nodes = [...document.querySelectorAll("[data-fls-dynamic]")];
    this.nodes.forEach((node) => {
      const data = node.dataset.flsDynamic.trim();
      const dataArray = data.split(`,`);
      const object = {};
      object.element = node;
      object.parent = node.parentNode;
      object.destinationParent = dataArray[3] ? node.closest(dataArray[3].trim()) || document : document;
      dataArray[3] ? dataArray[3].trim() : null;
      const objectSelector = dataArray[0] ? dataArray[0].trim() : null;
      if (objectSelector) {
        const foundDestination = object.destinationParent.querySelector(objectSelector);
        if (foundDestination) {
          object.destination = foundDestination;
        }
      }
      object.breakpoint = dataArray[1] ? dataArray[1].trim() : `767.98`;
      object.place = dataArray[2] ? dataArray[2].trim() : `last`;
      object.index = this.indexInParent(object.parent, object.element);
      this.objects.push(object);
    });
    this.arraySort(this.objects);
    this.mediaQueries = this.objects.map(({ breakpoint }) => `(${this.type}-width: ${breakpoint / 16}em),${breakpoint}`).filter((item, index, self) => self.indexOf(item) === index);
    this.mediaQueries.forEach((media) => {
      const mediaSplit = media.split(",");
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];
      const objectsFilter = this.objects.filter(({ breakpoint }) => breakpoint === mediaBreakpoint);
      matchMedia.addEventListener("change", () => {
        this.mediaHandler(matchMedia, objectsFilter);
      });
      this.mediaHandler(matchMedia, objectsFilter);
    });
  }
  mediaHandler(matchMedia, objects) {
    if (matchMedia.matches) {
      objects.forEach((object) => {
        if (object.destination) {
          this.moveTo(object.place, object.element, object.destination);
        }
      });
    } else {
      objects.forEach(({ parent, element, index }) => {
        if (element.classList.contains(this.daClassname)) {
          this.moveBack(parent, element, index);
        }
      });
    }
  }
  moveTo(place, element, destination) {
    element.classList.add(this.daClassname);
    const index = place === "last" || place === "first" ? place : parseInt(place, 10);
    if (index === "last" || index >= destination.children.length) {
      destination.append(element);
    } else if (index === "first") {
      destination.prepend(element);
    } else {
      destination.children[index].before(element);
    }
  }
  moveBack(parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== void 0) {
      parent.children[index].before(element);
    } else {
      parent.append(element);
    }
  }
  indexInParent(parent, element) {
    return [...parent.children].indexOf(element);
  }
  arraySort(arr) {
    if (this.type === "min") {
      arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }
          if (a.place === "first" || b.place === "last") {
            return -1;
          }
          if (a.place === "last" || b.place === "first") {
            return 1;
          }
          return 0;
        }
        return a.breakpoint - b.breakpoint;
      });
    } else {
      arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }
          if (a.place === "first" || b.place === "last") {
            return 1;
          }
          if (a.place === "last" || b.place === "first") {
            return -1;
          }
          return 0;
        }
        return b.breakpoint - a.breakpoint;
      });
      return;
    }
  }
}
if (document.querySelector("[data-fls-dynamic]")) {
  window.addEventListener("load", () => window.flsDynamic = new DynamicAdapt());
}
const countActionsContainers = document.querySelectorAll("[data-fls-countactions]");
countActionsContainers.forEach((container) => {
  const quantityInput = container.querySelector("[data-count-quantity]");
  const plusButton = container.querySelector("[data-count-plus]");
  const minusButton = container.querySelector("[data-count-minus]");
  if (!quantityInput || !plusButton || !minusButton) return;
  const productItem = container.closest(".item-body-product-cart");
  let priceElement, totalElements;
  if (productItem) {
    priceElement = productItem.querySelector(".item-body-product-cart__price");
    totalElements = productItem.querySelectorAll("[data-countTotal]");
  }
  function updatePrice() {
    if (priceElement && totalElements.length > 0) {
      const price = parseFloat(priceElement.textContent.replace(/[^0-9.]/g, "")) || 0;
      const qty = parseInt(quantityInput.textContent.trim()) || 1;
      const total = (price * qty).toFixed(2);
      totalElements.forEach((el) => el.textContent = `$${total}`);
    }
  }
  function getQuantity() {
    let quantity = parseInt(quantityInput.textContent.trim()) || 1;
    return Math.max(1, quantity);
  }
  function setQuantity(value) {
    value = Math.max(1, parseInt(value) || 1);
    quantityInput.textContent = value;
    updatePrice();
  }
  plusButton.addEventListener("click", function(e) {
    e.preventDefault();
    const currentQuantity = getQuantity();
    setQuantity(currentQuantity + 1);
  });
  minusButton.addEventListener("click", function(e) {
    e.preventDefault();
    const currentQuantity = getQuantity();
    if (currentQuantity > 1) {
      setQuantity(currentQuantity - 1);
    }
  });
  quantityInput.addEventListener("blur", function() {
    let value = parseInt(this.textContent.trim()) || 1;
    this.textContent = Math.max(1, value);
    updatePrice();
  });
  quantityInput.addEventListener("input", function() {
    this.textContent = this.textContent.replace(/[^0-9]/g, "");
  });
  updatePrice();
});
