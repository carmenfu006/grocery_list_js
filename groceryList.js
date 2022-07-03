const alert = document.querySelector('.alert')
const form = document.querySelector('.grocery-form');
const grocery_input = document.getElementById('grocery');
const addBtn = document.getElementById('addBtn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.getElementById('clearBtn');

let editElement;
let editAction = false;

form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems);

function addItem(e) {
  e.preventDefault()
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value && !editAction) {
    const element = document.createElement('article');
    const attr = document.createAttribute('data-id');

    element.classList.add('grocery-item');
    attr.value = id;

    element.setAttributeNode(attr);
    element.innerHTML = `<div class="d-flex mb-3">
                            <p class='title flex-grow-1 pt-1'>${value}</p>
                            <i class='fas fa-edit mt-2' id='editBtn'></i>
                            <i class='fas fa-trash-alt mt-2 mx-2' id='removeBtn'></i>
                          </div>`
    
    list.appendChild(element);
  
    displayAlert('Item added', 'success');
    backToDefault();

    const removeBtn = element.querySelector('#removeBtn');
    const editBtn = element.querySelector('#editBtn');

    removeBtn.addEventListener('click', removeItem);
    editBtn.addEventListener('click', editItem);
    clearBtn.classList.remove('d-none')
  }
  else if (value && editAction) {
    editElement.innerHTML = value;
    displayAlert('Item updated', 'primary');
    backToDefault();
  }
  else {
    displayAlert('Value cannot be empty', 'danger');
  }

}

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(function removeAlert() {
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);
  }, 2000);
}

function backToDefault() {
  grocery_input.value = '';
  editAction = false;
  addBtn.innerHTML = 'Add';
}

function clearItems() {
  const items = document.querySelectorAll('.grocery-item');

  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item)
    });
  }
  clearBtn.classList.add('d-none')
}

function removeItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  list.removeChild(element);
  displayAlert('Item removed.', 'warning');

  if (list.childElementCount == 0) {
    clearBtn.classList.add('d-none');
  }
}

function editItem(e) {
  editElement = e.currentTarget.parentElement.firstElementChild;
  grocery_input.value = editElement.innerHTML;

  editAction = true;
  addBtn.innerHTML = 'Update';
}