var $_ = function (selector, node = document) {
  return node.querySelector(selector);
};

// var elIdish = $_('.idish');
// var elButton = $_('button', elIdish);

var $$_ = function (selector, node = document) {
  return node.querySelectorAll(selector);
};

var createElement = function (element, elementClass, text) {
  var newElement = document.createElement(element);

  if (elementClass) {
    newElement.setAttribute('class', elementClass);
  }

  if (text) {
    newElement.textContent = text;
  }

  return newElement;
};

var createResult = function () {

  contactsArray.forEach(function (contact, index) {

    var elItemsFragment = document.createDocumentFragment();

    var newContact = createElement('li');
    newContact.setAttribute('class', 'list-group-item contact-item mb-2');

    var newName = createElement('h3');
    newName.setAttribute('class', 'h5 text-truncate');
    newName.textContent = contact.name;

    var newRela = createElement('p');
    newRela.setAttribute('class', 'small mb-1');
    newRela.textContent = contact.rela;

    var newPhone = createElement('a');
    newPhone.textContent = contact.phone;
    newPhone.setAttribute('href', `tel:${contact.phone}`);

    var newDeleteButton = createElement('button');
    newDeleteButton.type = 'button';
    newDeleteButton.textContent = 'Delete';
    // newObject.dataset.dataId =
    newDeleteButton.dataset.id = index;
    newDeleteButton.setAttribute('class', 'delete-button btn btn-sm btn-danger');

    newContact.appendChild(newName);
    newContact.appendChild(newRela);
    newContact.appendChild(newPhone);
    newContact.appendChild(newDeleteButton);
    elItemsFragment.appendChild(newContact);

    elContactsList.appendChild(elItemsFragment);

    elNameInput.value = '';
    elRelation.value = '';
    elPhoneNumber.value = '';

  });
};


var contactsArray = [];
var relationArray = [];

var elForm = document.querySelector('.js-contact-form')
var elContactsList = document.querySelector('.js-contacts')

if (elForm) {
  var elNameInput = elForm.querySelector('.js-contact-form__name-input')
  var elRelation = elForm.querySelector('.js-contact-form__relationship-input')
  var elDatalist = elForm.querySelector('#relationships-list')
  var elPhoneNumber = elForm.querySelector('.js-contact-form__phone-input')
}

elForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  var NameInputValue = elNameInput.value;
  var RelationValue = elRelation.value;
  var PhoneNumberValue = elPhoneNumber.value;

  elNameInput.focus();

  var newObject = {
    name: NameInputValue,
    rela: RelationValue,
    phone: PhoneNumberValue
  };

  elPhoneNumber.classList.remove('is-invalid');
  if (isNaN(elPhoneNumber.value)) {
    elPhoneNumber.classList.add('is-invalid');
    elPhoneNumber.focus();
    return;
  }

  for(var i = 0; i < contactsArray.length; i++){
    if (contactsArray[i].phone === newObject.phone) {
      elPhoneNumber.classList.add('is-invalid');
      elPhoneNumber.focus();
      return;
    }
  };

  contactsArray.push(newObject);

  relationArray.push(RelationValue);
  elContactsList.innerHTML = '';
  elDatalist.innerHTML = '';

  for(var relation of relationArray){
    var newOption = createElement('option');
    newOption.textContent = relation;

    elDatalist.appendChild(newOption);
  }

  createResult();

});

elContactsList.addEventListener('click', function (evt) {
  // if (evt.target.matches('button')) {
  if (evt.target.matches('.btn')) {
    contactsArray.splice(evt.target.dataset.id, 1);
  }

  elContactsList.innerHTML = '';

  createResult();

});