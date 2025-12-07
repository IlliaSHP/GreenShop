import "./main.min.js";
import { s as slideUp, a as slideToggle } from "./common.min.js";
let formValidate = {
  getErrors(form) {
    let error = 0;
    let formRequiredItems = form.querySelectorAll("[required]");
    if (formRequiredItems.length) {
      formRequiredItems.forEach((formRequiredItem) => {
        if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
          error += this.validateInput(formRequiredItem);
        }
      });
    }
    return error;
  },
  validateInput(formRequiredItem) {
    let error = 0;
    if (formRequiredItem.type === "email") {
      formRequiredItem.value = formRequiredItem.value.replace(" ", "");
      if (this.emailTest(formRequiredItem)) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
      this.addError(formRequiredItem);
      this.removeSuccess(formRequiredItem);
      error++;
    } else {
      if (!formRequiredItem.value.trim()) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    }
    return error;
  },
  addError(formRequiredItem) {
    formRequiredItem.classList.add("--form-error");
    formRequiredItem.parentElement.classList.add("--form-error");
    let inputError = formRequiredItem.parentElement.querySelector("[data-fls-form-error]");
    if (inputError) formRequiredItem.parentElement.removeChild(inputError);
    if (formRequiredItem.dataset.flsFormErrtext) {
      formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div data-fls-form-error>${formRequiredItem.dataset.flsFormErrtext}</div>`);
    }
  },
  removeError(formRequiredItem) {
    formRequiredItem.classList.remove("--form-error");
    formRequiredItem.parentElement.classList.remove("--form-error");
    if (formRequiredItem.parentElement.querySelector("[data-fls-form-error]")) {
      formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector("[data-fls-form-error]"));
    }
  },
  addSuccess(formRequiredItem) {
    formRequiredItem.classList.add("--form-success");
    formRequiredItem.parentElement.classList.add("--form-success");
  },
  removeSuccess(formRequiredItem) {
    formRequiredItem.classList.remove("--form-success");
    formRequiredItem.parentElement.classList.remove("--form-success");
  },
  removeFocus(formRequiredItem) {
    formRequiredItem.classList.remove("--form-focus");
    formRequiredItem.parentElement.classList.remove("--form-focus");
  },
  formClean(form) {
    form.reset();
    setTimeout(() => {
      let inputs = form.querySelectorAll("input,textarea");
      for (let index = 0; index < inputs.length; index++) {
        const el = inputs[index];
        formValidate.removeFocus(el);
        formValidate.removeSuccess(el);
        formValidate.removeError(el);
      }
      let checkboxes = form.querySelectorAll('input[type="checkbox"]');
      if (checkboxes.length) {
        checkboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });
      }
      if (window["flsSelect"]) {
        let selects = form.querySelectorAll("select[data-fls-select]");
        if (selects.length) {
          selects.forEach((select) => {
            window["flsSelect"].selectBuild(select);
          });
        }
      }
    }, 0);
  },
  emailTest(formRequiredItem) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
  }
};
class SelectConstructor {
  constructor(props, data = null) {
    let defaultConfig = {
      init: true,
      speed: 150
    };
    this.config = Object.assign(defaultConfig, props);
    this.selectClasses = {
      classSelect: "select",
      // Головний блок
      classSelectBody: "select__body",
      // Тіло селекту
      classSelectTitle: "select__title",
      // Заголовок
      classSelectValue: "select__value",
      // Значення у заголовку
      classSelectLabel: "select__label",
      // Лабел
      classSelectInput: "select__input",
      // Поле введення
      classSelectText: "select__text",
      // Оболонка текстових даних
      classSelectLink: "select__link",
      // Посилання в елементі
      classSelectOptions: "select__options",
      // Випадаючий список
      classSelectOptionsScroll: "select__scroll",
      // Оболонка при скролі
      classSelectOption: "select__option",
      // Пункт
      classSelectContent: "select__content",
      // Оболонка контенту в заголовку
      classSelectRow: "select__row",
      // Ряд
      classSelectData: "select__asset",
      // Додаткові дані
      classSelectDisabled: "--select-disabled",
      // Заборонено
      classSelectTag: "--select-tag",
      // Клас тега
      classSelectOpen: "--select-open",
      // Список відкритий
      classSelectActive: "--select-active",
      // Список вибрано
      classSelectFocus: "--select-focus",
      // Список у фокусі
      classSelectMultiple: "--select-multiple",
      // Мультивибір
      classSelectCheckBox: "--select-checkbox",
      // Стиль чекбоксу
      classSelectOptionSelected: "--select-selected",
      // Вибраний пункт
      classSelectPseudoLabel: "--select-pseudo-label"
      // Псевдолейбл
    };
    this._this = this;
    if (this.config.init) {
      const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll("select[data-fls-select]");
      if (selectItems.length) {
        this.selectsInit(selectItems);
      }
    }
  }
  // Конструктор CSS класу
  getSelectClass(className) {
    return `.${className}`;
  }
  // Геттер елементів псевдоселекту
  getSelectElement(selectItem, className) {
    return {
      originalSelect: selectItem.querySelector("select"),
      selectElement: selectItem.querySelector(this.getSelectClass(className))
    };
  }
  // Функція ініціалізації всіх селектів
  selectsInit(selectItems) {
    selectItems.forEach((originalSelect, index) => {
      this.selectInit(originalSelect, index + 1);
    });
    document.addEventListener("click", (function(e) {
      this.selectsActions(e);
    }).bind(this));
    document.addEventListener("keydown", (function(e) {
      this.selectsActions(e);
    }).bind(this));
    document.addEventListener("focusin", (function(e) {
      this.selectsActions(e);
    }).bind(this));
    document.addEventListener("focusout", (function(e) {
      this.selectsActions(e);
    }).bind(this));
  }
  // Функція ініціалізації конкретного селекту
  selectInit(originalSelect, index) {
    index ? originalSelect.dataset.flsSelectId = index : null;
    if (originalSelect.options.length) {
      const _this = this;
      let selectItem = document.createElement("div");
      selectItem.classList.add(this.selectClasses.classSelect);
      originalSelect.parentNode.insertBefore(selectItem, originalSelect);
      selectItem.appendChild(originalSelect);
      originalSelect.hidden = true;
      if (this.getSelectPlaceholder(originalSelect)) {
        originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
        if (this.getSelectPlaceholder(originalSelect).label.show) {
          const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
          selectItemTitle.insertAdjacentHTML("afterbegin", `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
        }
      }
      selectItem.insertAdjacentHTML("beforeend", `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
      this.selectBuild(originalSelect);
      originalSelect.dataset.flsSelectSpeed = originalSelect.dataset.flsSelectSpeed ? originalSelect.dataset.flsSelectSpeed : this.config.speed;
      this.config.speed = +originalSelect.dataset.flsSelectSpeed;
      originalSelect.addEventListener("change", function(e) {
        _this.selectChange(e);
      });
    }
  }
  // Конструктор псевдоселекту
  selectBuild(originalSelect) {
    const selectItem = originalSelect.parentElement;
    if (originalSelect.id) {
      selectItem.id = originalSelect.id;
      originalSelect.removeAttribute("id");
    }
    selectItem.dataset.flsSelectId = originalSelect.dataset.flsSelectId;
    originalSelect.dataset.flsSelectModif ? selectItem.classList.add(`select--${originalSelect.dataset.flsSelectModif}`) : null;
    originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
    originalSelect.hasAttribute("data-fls-select-checkbox") && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
    this.setSelectTitleValue(selectItem, originalSelect);
    this.setOptions(selectItem, originalSelect);
    originalSelect.hasAttribute("data-fls-select-search") ? this.searchActions(selectItem) : null;
    originalSelect.hasAttribute("data-fls-select-open") ? this.selectAction(selectItem) : null;
    this.selectDisabled(selectItem, originalSelect);
  }
  // Функція реакцій на події
  selectsActions(e) {
    const t = e.target, type = e.type;
    const isSelect = t.closest(this.getSelectClass(this.selectClasses.classSelect));
    const isTag = t.closest(this.getSelectClass(this.selectClasses.classSelectTag));
    if (!isSelect && !isTag) return this.selectsСlose();
    const selectItem = isSelect || document.querySelector(`.${this.selectClasses.classSelect}[data-fls-select-id="${isTag.dataset.flsSelectId}"]`);
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    if (originalSelect.disabled) return;
    if (type === "click") {
      const tag = t.closest(this.getSelectClass(this.selectClasses.classSelectTag));
      const title = t.closest(this.getSelectClass(this.selectClasses.classSelectTitle));
      const option = t.closest(this.getSelectClass(this.selectClasses.classSelectOption));
      if (tag) {
        const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-fls-select-id="${tag.dataset.flsSelectId}"] .select__option[data-fls-select-value="${tag.dataset.flsSelectValue}"]`);
        this.optionAction(selectItem, originalSelect, optionItem);
      } else if (title) {
        this.selectAction(selectItem);
      } else if (option) {
        this.optionAction(selectItem, originalSelect, option);
      }
    } else if (type === "focusin" || type === "focusout") {
      if (isSelect) selectItem.classList.toggle(this.selectClasses.classSelectFocus, type === "focusin");
    } else if (type === "keydown" && e.code === "Escape") {
      this.selectsСlose();
    }
  }
  // Функція закриття всіх селектів
  selectsСlose(selectOneGroup) {
    const selectsGroup = selectOneGroup ? selectOneGroup : document;
    const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
    if (selectActiveItems.length) {
      selectActiveItems.forEach((selectActiveItem) => {
        this.selectСlose(selectActiveItem);
      });
    }
  }
  // Функція закриття конкретного селекту
  selectСlose(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    if (!selectOptions.classList.contains("_slide")) {
      selectItem.classList.remove(this.selectClasses.classSelectOpen);
      slideUp(selectOptions, originalSelect.dataset.flsSelectSpeed);
      setTimeout(() => {
        selectItem.style.zIndex = "";
      }, originalSelect.dataset.flsSelectSpeed);
    }
  }
  // Функція відкриття/закриття конкретного селекту
  selectAction(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption}`);
    const selectOpenzIndex = originalSelect.dataset.flsSelectZIndex ? originalSelect.dataset.flsSelectZIndex : 3;
    this.setOptionsPosition(selectItem);
    if (originalSelect.closest("[data-fls-select-one]")) {
      const selectOneGroup = originalSelect.closest("[data-fls-select-one]");
      this.selectsСlose(selectOneGroup);
    }
    setTimeout(() => {
      if (!selectOptions.classList.contains("--slide")) {
        selectItem.classList.toggle(this.selectClasses.classSelectOpen);
        slideToggle(selectOptions, originalSelect.dataset.flsSelectSpeed);
        if (selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
          selectItem.style.zIndex = selectOpenzIndex;
        } else {
          setTimeout(() => {
            selectItem.style.zIndex = "";
          }, originalSelect.dataset.flsSelectSpeed);
        }
      }
    }, 0);
  }
  // Сеттер значення заголовка селекту
  setSelectTitleValue(selectItem, originalSelect) {
    const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
    const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
    if (selectItemTitle) selectItemTitle.remove();
    selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
    originalSelect.hasAttribute("data-fls-select-search") ? this.searchActions(selectItem) : null;
  }
  // Конструктор значення заголовка
  getSelectTitleValue(selectItem, originalSelect) {
    let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
    if (originalSelect.multiple && originalSelect.hasAttribute("data-fls-select-tags")) {
      selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map((option) => `<span role="button" data-fls-select-id="${selectItem.dataset.flsSelectId}" data-fls-select-value="${option.value}" class="--select-tag">${this.getSelectElementContent(option)}</span>`).join("");
      if (originalSelect.dataset.flsSelectTags && document.querySelector(originalSelect.dataset.flsSelectTags)) {
        document.querySelector(originalSelect.dataset.flsSelectTags).innerHTML = selectTitleValue;
        if (originalSelect.hasAttribute("data-fls-select-search")) selectTitleValue = false;
      }
    }
    selectTitleValue = selectTitleValue.length ? selectTitleValue : originalSelect.dataset.flsSelectPlaceholder || "";
    if (!originalSelect.hasAttribute("data-fls-select-tags")) {
      selectTitleValue = selectTitleValue ? selectTitleValue.map((item) => item.replace(/"/g, "&quot;")) : "";
    }
    let pseudoAttribute = "";
    let pseudoAttributeClass = "";
    if (originalSelect.hasAttribute("data-fls-select-pseudo-label")) {
      pseudoAttribute = originalSelect.dataset.flsSelectPseudoLabel ? ` data-fls-select-pseudo-label="${originalSelect.dataset.flsSelectPseudoLabel}"` : ` data-fls-select-pseudo-label="Заповніть атрибут"`;
      pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
    }
    this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
    if (originalSelect.hasAttribute("data-fls-select-search")) {
      return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-fls-select-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`;
    } else {
      const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.flsSelectClass ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.flsSelectClass}` : "";
      return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
    }
  }
  // Конструктор даних для значення заголовка
  getSelectElementContent(selectOption) {
    const selectOptionData = selectOption.dataset.flsSelectAsset ? `${selectOption.dataset.flsSelectAsset}` : "";
    const selectOptionDataHTML = selectOptionData.indexOf("img") >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
    let selectOptionContentHTML = ``;
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : "";
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : "";
    selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : "";
    selectOptionContentHTML += selectOptionData ? `</span>` : "";
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : "";
    selectOptionContentHTML += selectOption.textContent;
    selectOptionContentHTML += selectOptionData ? `</span>` : "";
    selectOptionContentHTML += selectOptionData ? `</span>` : "";
    return selectOptionContentHTML;
  }
  // Отримання даних плейсхолдера
  getSelectPlaceholder(originalSelect) {
    const selectPlaceholder = Array.from(originalSelect.options).find((option) => !option.value);
    if (selectPlaceholder) {
      return {
        value: selectPlaceholder.textContent,
        show: selectPlaceholder.hasAttribute("data-fls-select-show"),
        label: {
          show: selectPlaceholder.hasAttribute("data-fls-select-label"),
          text: selectPlaceholder.dataset.flsSelectLabel
        }
      };
    }
  }
  // Отримання даних із вибраних елементів
  getSelectedOptionsData(originalSelect, type) {
    let selectedOptions = [];
    if (originalSelect.multiple) {
      selectedOptions = Array.from(originalSelect.options).filter((option) => option.value).filter((option) => option.selected);
    } else {
      selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
    }
    return {
      elements: selectedOptions.map((option) => option),
      values: selectedOptions.filter((option) => option.value).map((option) => option.value),
      html: selectedOptions.map((option) => this.getSelectElementContent(option))
    };
  }
  // Конструктор елементів списку
  getOptions(originalSelect) {
    const selectOptionsScroll = originalSelect.hasAttribute("data-fls-select-scroll") ? `` : "";
    +originalSelect.dataset.flsSelectScroll ? +originalSelect.dataset.flsSelectScroll : null;
    let selectOptions = Array.from(originalSelect.options);
    if (selectOptions.length > 0) {
      let selectOptionsHTML = ``;
      if (this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show || originalSelect.multiple) {
        selectOptions = selectOptions.filter((option) => option.value);
      }
      selectOptionsHTML += `<div ${selectOptionsScroll} ${""} class="${this.selectClasses.classSelectOptionsScroll}">`;
      selectOptions.forEach((selectOption) => {
        selectOptionsHTML += this.getOption(selectOption, originalSelect);
      });
      selectOptionsHTML += `</div>`;
      return selectOptionsHTML;
    }
  }
  // Конструктор конкретного елемента списку
  getOption(selectOption, originalSelect) {
    const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : "";
    const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute("data-fls-select-show-selected") && !originalSelect.multiple ? `hidden` : ``;
    const selectOptionClass = selectOption.dataset.flsSelectClass ? ` ${selectOption.dataset.flsSelectClass}` : "";
    const selectOptionLink = selectOption.dataset.flsSelectHref ? selectOption.dataset.flsSelectHref : false;
    const selectOptionLinkTarget = selectOption.hasAttribute("data-fls-select-href-blank") ? `target="_blank"` : "";
    let selectOptionHTML = ``;
    selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-fls-select-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-fls-select-value="${selectOption.value}" type="button">`;
    selectOptionHTML += this.getSelectElementContent(selectOption);
    selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
    return selectOptionHTML;
  }
  // Сеттер елементів списку (options)
  setOptions(selectItem, originalSelect) {
    const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    selectItemOptions.innerHTML = this.getOptions(originalSelect);
  }
  // Визначаємо, де видобразити випадаючий список
  setOptionsPosition(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectItemScroll = this.getSelectElement(selectItem, this.selectClasses.classSelectOptionsScroll).selectElement;
    const customMaxHeightValue = +originalSelect.dataset.flsSelectScroll ? `${+originalSelect.dataset.flsSelectScroll}px` : ``;
    const selectOptionsPosMargin = +originalSelect.dataset.flsSelectOptionsMargin ? +originalSelect.dataset.flsSelectOptionsMargin : 10;
    if (!selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
      selectOptions.hidden = false;
      const selectItemScrollHeight = selectItemScroll.offsetHeight ? selectItemScroll.offsetHeight : parseInt(window.getComputedStyle(selectItemScroll).getPropertyValue("max-height"));
      const selectOptionsHeight = selectOptions.offsetHeight > selectItemScrollHeight ? selectOptions.offsetHeight : selectItemScrollHeight + selectOptions.offsetHeight;
      const selectOptionsScrollHeight = selectOptionsHeight - selectItemScrollHeight;
      selectOptions.hidden = true;
      const selectItemHeight = selectItem.offsetHeight;
      const selectItemPos = selectItem.getBoundingClientRect().top;
      const selectItemTotal = selectItemPos + selectOptionsHeight + selectItemHeight + selectOptionsScrollHeight;
      const selectItemResult = window.innerHeight - (selectItemTotal + selectOptionsPosMargin);
      if (selectItemResult < 0) {
        const newMaxHeightValue = selectOptionsHeight + selectItemResult;
        if (newMaxHeightValue < 100) {
          selectItem.classList.add("select--show-top");
          selectItemScroll.style.maxHeight = selectItemPos < selectOptionsHeight ? `${selectItemPos - (selectOptionsHeight - selectItemPos)}px` : customMaxHeightValue;
        } else {
          selectItem.classList.remove("select--show-top");
          selectItemScroll.style.maxHeight = `${newMaxHeightValue}px`;
        }
      }
    } else {
      setTimeout(() => {
        selectItem.classList.remove("select--show-top");
        selectItemScroll.style.maxHeight = customMaxHeightValue;
      }, +originalSelect.dataset.flsSelectSpeed);
    }
  }
  // Обробник кліку на пункт списку
  optionAction(selectItem, originalSelect, optionItem) {
    const optionsBox = selectItem.querySelector(this.getSelectClass(this.selectClasses.classSelectOptions));
    if (optionsBox.classList.contains("--slide")) return;
    if (originalSelect.multiple) {
      optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
      const selectedEls = this.getSelectedOptionsData(originalSelect).elements;
      for (const el of selectedEls) {
        el.removeAttribute("selected");
      }
      const selectedUI = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
      for (const el of selectedUI) {
        const val = el.dataset.flsSelectValue;
        const opt = originalSelect.querySelector(`option[value="${val}"]`);
        if (opt) opt.setAttribute("selected", "selected");
      }
    } else {
      if (!originalSelect.hasAttribute("data-fls-select-show-selected")) {
        setTimeout(() => {
          const hiddenOpt = selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`);
          if (hiddenOpt) hiddenOpt.hidden = false;
          optionItem.hidden = true;
        }, this.config.speed);
      }
      originalSelect.value = optionItem.dataset.flsSelectValue || optionItem.textContent;
      this.selectAction(selectItem);
    }
    this.setSelectTitleValue(selectItem, originalSelect);
    this.setSelectChange(originalSelect);
  }
  // Реакція на зміну оригінального select
  selectChange(e) {
    const originalSelect = e.target;
    this.selectBuild(originalSelect);
    this.setSelectChange(originalSelect);
  }
  // Обробник зміни у селекті
  setSelectChange(originalSelect) {
    if (originalSelect.hasAttribute("data-fls-select-validate")) {
      formValidate.validateInput(originalSelect);
    }
    if (originalSelect.hasAttribute("data-fls-select-submit") && originalSelect.value) {
      let tempButton = document.createElement("button");
      tempButton.type = "submit";
      originalSelect.closest("form").append(tempButton);
      tempButton.click();
      tempButton.remove();
    }
    const selectItem = originalSelect.parentElement;
    this.selectCallback(selectItem, originalSelect);
  }
  // Обробник disabled
  selectDisabled(selectItem, originalSelect) {
    if (originalSelect.disabled) {
      selectItem.classList.add(this.selectClasses.classSelectDisabled);
      this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
    } else {
      selectItem.classList.remove(this.selectClasses.classSelectDisabled);
      this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
    }
  }
  // Обробник пошуку за елементами списку
  searchActions(selectItem) {
    const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    selectInput.addEventListener("input", () => {
      const inputValue = selectInput.value.toLowerCase();
      const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption}`);
      selectOptionsItems.forEach((item) => {
        const itemText = item.textContent.toLowerCase();
        item.hidden = !itemText.includes(inputValue);
      });
      if (selectOptions.hidden) {
        this.selectAction(selectItem);
      }
    });
  }
  // Коллбек функція
  selectCallback(selectItem, originalSelect) {
    document.dispatchEvent(new CustomEvent("selectCallback", {
      detail: {
        select: originalSelect
      }
    }));
  }
}
document.querySelector("select[data-fls-select]") ? window.addEventListener("load", () => window.flsSelect = new SelectConstructor({})) : null;
document.addEventListener("DOMContentLoaded", function() {
  const filtersButton = document.querySelector(".header__filters");
  const catalogFilters = document.querySelector(".catalog-filters");
  const closeFiltersButton = document.querySelector(".catalog-filters__close");
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
    image: "/assets/img/plants/2.png",
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
    image: "/assets/img/plants/3.png",
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
    image: "/assets/img/plants/4.png",
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
    image: "/assets/img/plants/1.png",
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
    image: "/assets/img/plants/6.png",
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
    image: "/assets/img/plants/7.png",
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
    image: "/assets/img/plants/8.png",
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
    image: "/assets/img/plants/9.png",
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
    image: "/assets/img/plants/10.png",
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
    image: "/assets/img/plants/4.png",
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
    image: "/assets/img/plants/6.png",
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
    image: "/assets/img/plants/7.png",
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
         <article class="content-catalog__card content-catalog-card" data-id="${product.id}">
         <a href="#" class="content-catalog-card__product">
            <img src="${product.image}" alt="${product.name}">
            ${isOnSale ? `<span class="content-catalog-card__sale">${discountPercent}% OFF</span>` : ""}
            <div class="content-catalog-card__actions">
               <button type="button" aria-label="Add to cart" class="content-catalog-card__item">
               <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.294 16.8721H8.24077C5.65655 16.8721 3.55412 14.7696 3.55412 12.1854V7.3816C3.55412 4.9793 2.35676 2.75568 0.351225 1.43334C-0.00894369 1.19588 -0.108379 0.711439 0.129078 0.35127C0.366535 -0.00893829 0.850939 -0.108412 1.21119 0.129123C2.35606 0.883986 3.28487 1.87959 3.94905 3.02586C4.09258 3.18665 5.24995 4.41338 7.14726 4.41338H16.142C18.596 4.36749 20.5168 6.83021 19.8752 9.19892L18.8397 13.3259C18.3159 15.4138 16.4466 16.8721 14.294 16.8721ZM4.91926 5.53431C5.04912 6.13424 5.11634 6.75284 5.11634 7.3816V12.1854C5.11634 13.9082 6.51796 15.3098 8.24077 15.3098H14.294C15.7291 15.3098 16.9752 14.3377 17.3245 12.9457L18.3599 8.81876C18.7412 7.41128 17.5997 5.94838 16.142 5.9756H7.14722C6.28913 5.9756 5.54224 5.7906 4.91926 5.53431ZM7.85021 19.0201C7.85021 18.4809 7.41307 18.0437 6.87383 18.0437C5.57828 18.0953 5.57942 19.9454 6.87383 19.9965C7.41307 19.9965 7.85021 19.5593 7.85021 19.0201ZM15.6222 19.0201C15.6222 18.4809 15.1851 18.0437 14.6459 18.0437C13.3503 18.0953 13.3514 19.9454 14.6459 19.9965C15.1851 19.9965 15.6222 19.5593 15.6222 19.0201ZM16.9231 8.31893C16.9231 7.88752 16.5734 7.53782 16.142 7.53782H7.45966C6.42329 7.57906 6.42407 9.05914 7.45966 9.10003H16.142C16.5734 9.10003 16.9231 8.75033 16.9231 8.31893Z"/>
               </svg>
               </button>
               <button type="button" aria-label="Add to favorites" class="content-catalog-card__item">
               <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 18.8873C9.71527 18.8873 9.44077 18.7842 9.22684 18.5968C8.41888 17.8903 7.63992 17.2264 6.95267 16.6408L6.94916 16.6377C4.93423 14.9207 3.19427 13.4378 1.98364 11.9771C0.630341 10.3441 0 8.79578 0 7.10434C0 5.46097 0.563507 3.94485 1.58661 2.83508C2.62192 1.71219 4.04251 1.09375 5.58716 1.09375C6.74164 1.09375 7.79892 1.45874 8.72955 2.1785C9.19922 2.54181 9.62494 2.98645 10 3.5051C10.3752 2.98645 10.8008 2.54181 11.2706 2.1785C12.2012 1.45874 13.2585 1.09375 14.413 1.09375C15.9575 1.09375 17.3782 1.71219 18.4135 2.83508C19.4366 3.94485 20 5.46097 20 7.10434C20 8.79578 19.3698 10.3441 18.0165 11.9769C16.8059 13.4378 15.0661 14.9205 13.0515 16.6374C12.363 17.224 11.5828 17.8889 10.773 18.5971C10.5592 18.7842 10.2846 18.8873 10 18.8873ZM5.58716 2.26532C4.37363 2.26532 3.25882 2.74963 2.44781 3.62915C1.62476 4.52194 1.17142 5.75607 1.17142 7.10434C1.17142 8.52692 1.70013 9.79919 2.88559 11.2296C4.03137 12.6122 5.73563 14.0645 7.70889 15.7462L7.71255 15.7492C8.4024 16.3371 9.18442 17.0036 9.99832 17.7153C10.8171 17.0023 11.6003 16.3347 12.2916 15.7458C14.2647 14.0642 15.9688 12.6122 17.1146 11.2296C18.2999 9.79919 18.8286 8.52692 18.8286 7.10434C18.8286 5.75607 18.3752 4.52194 17.5522 3.62915C16.7413 2.74963 15.6264 2.26532 14.413 2.26532C13.524 2.26532 12.7078 2.54791 11.9872 3.10516C11.3449 3.60199 10.8975 4.23004 10.6352 4.66949C10.5003 4.89548 10.2629 5.03036 10 5.03036C9.73709 5.03036 9.49966 4.89548 9.36478 4.66949C9.10263 4.23004 8.65524 3.60199 8.01285 3.10516C7.29218 2.54791 6.47598 2.26532 5.58716 2.26532Z" fill="#3D3D3D"/>
               </svg>
               </button>
               <button type="button" aria-label="view" class="content-catalog-card__item">
               <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.5726 16.0029C10.5755 19.1865 4.988 18.3056 2.02842 14.6542C-0.828088 11.129 -0.64944 6.04347 2.44943 2.82482C5.65137 -0.500594 10.6854 -0.944524 14.3346 1.78337C15.642 2.76051 16.6183 4.00364 17.2542 5.50838C17.8938 7.02186 18.0881 8.59654 17.8663 10.2205C17.6452 11.837 17 13.2775 15.9499 14.6217C16.0349 14.6773 16.1255 14.7173 16.1904 14.7822C17.3448 15.9311 18.4947 17.0843 19.6491 18.2331C19.9227 18.5054 20.0589 18.8225 19.9776 19.2047C19.8165 19.9651 18.9107 20.2586 18.3298 19.7366C18.0575 19.4925 17.807 19.2234 17.5484 18.9649C16.6002 18.0177 15.6526 17.0699 14.7044 16.1227C14.665 16.0853 14.6238 16.0503 14.5726 16.0029ZM15.9605 8.98677C15.9705 5.12689 12.8529 2.00627 8.98261 2.00065C5.12292 1.99503 2.00781 5.09068 1.99094 8.94806C1.97408 12.8173 5.08544 15.9467 8.96762 15.9648C12.8117 15.9829 15.9505 12.8504 15.9605 8.98677Z" fill="#3D3D3D"/>
               </svg>
               </button>
            </div>
         </a>
         <div class="content-catalog-card__body">
            <h5 class="content-catalog-card__title"><a href="#">${product.name}</a></h5>
            <div class="content-catalog-card__price">
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
