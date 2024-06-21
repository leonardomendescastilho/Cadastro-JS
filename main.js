document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('product-form');
  const btnNewRegister = document.getElementById('addNewProduct');
  const sectionForm = document.getElementById('products-register');
  const sectionTable = document.getElementById('product-list');
  let products = [];
  let isFormValid = false;

  function formData() {
    togglePageDisplay();
    const name = form['name'].value;
    const description = form['description'].value;
    const productPrice = Number(form['product-value'].value);
    const radioValue = form['options'].value;

    let product = {
      name: name,
      description: description,
      price: productPrice,
      isAvailable: radioValue,
    };

    addProductToList(product);
  }

  function addProductToList(product) {
    products.push(product);

    products.sort((product1, product2) => product1.price - product2.price);

    updateTable();
  }

  function updateTable() {
    let tableBody = document.getElementById('table-list-body');
    tableBody.innerHTML = '';

    products.forEach((product) => {
      let row = document.createElement('tr');

      let cellName = document.createElement('td');
      cellName.textContent = product.name;
      row.appendChild(cellName);

      let cellPrice = document.createElement('td');
      cellPrice.textContent = product.price;
      row.appendChild(cellPrice);

      tableBody.appendChild(row);
    });
  }

  function cleanInputValue() {
    form['name'].value = '';
    form['description'].value = '';
    form['product-value'].value = '';
  }
  function validateInput(event) {
    const inputValue = event.target.value;
    const inputNumber = event.target.classList.contains('input-number');
    const parent = event.target.parentElement;
    const span = parent.querySelector('span');

    const regexNumber = /^[0-9]+$/;

    if (inputNumber && !regexNumber.test(inputValue)) {
      span.classList.remove('hidden');
      span.innerText = 'Este campo aceita apenas números';
      isFormValid = false;
    } else if (inputValue && !isNaN(inputValue) && !inputNumber) {
      span.classList.remove('hidden');
      span.innerText = 'Este campo aceita apenas textos';
      isFormValid = false;
    } else if (inputValue === '') {
      span.classList.remove('hidden');
      span.innerText = 'É necessário preencher esse campo';
      isFormValid = false;
    } else {
      span.classList.add('hidden');
      isFormValid = true;
    }
  }

  function togglePageDisplay() {
    sectionTable.classList.toggle('hidden');
    sectionForm.classList.toggle('hidden');
  }
  for (let formElement of form) {
    if (formElement.tagName === 'INPUT' && formElement.hasAttribute('name')) {
      if (formElement.type !== 'radio') {
        formElement.addEventListener('blur', validateInput);
      }
    }
  }
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (isFormValid) {
      formData();
      cleanInputValue();
    }
  });

  btnNewRegister.addEventListener('click', togglePageDisplay);
});
