(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
document.addEventListener("DOMContentLoaded", () => {
  const viewPassButtons = document.querySelectorAll(".form-comp__viewpass");
  if (viewPassButtons.length > 0) {
    viewPassButtons.forEach((btn) => {
      btn.addEventListener("click", function() {
        const wrapper = this.closest(".form-comp__pass-wrapper");
        const input = wrapper ? wrapper.querySelector(".form-comp__input") : null;
        if (input) {
          if (input.type === "password") {
            input.type = "text";
            this.classList.add("form-comp__viewpass--active");
          } else {
            input.type = "password";
            this.classList.remove("form-comp__viewpass--active");
          }
        }
      });
    });
  }
  const photoInput = document.getElementById("user-photo");
  const photoPreviewContainer = document.getElementById("photo-preview");
  const removeBtn = document.getElementById("remove-photo-btn");
  if (photoInput && photoPreviewContainer && removeBtn) {
    const defaultContent = photoPreviewContainer.innerHTML;
    photoInput.addEventListener("change", function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          photoPreviewContainer.innerHTML = "";
          const newImg = document.createElement("img");
          newImg.src = e.target.result;
          newImg.alt = "User photo";
          photoPreviewContainer.appendChild(newImg);
          removeBtn.removeAttribute("disabled");
        };
        reader.readAsDataURL(file);
      }
    });
    removeBtn.addEventListener("click", function() {
      photoInput.value = "";
      photoPreviewContainer.innerHTML = defaultContent;
      this.setAttribute("disabled", "true");
    });
  }
});
