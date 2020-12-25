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


var contactsArray = [];
var relationArray = [];

var elForm = document.querySelector('.js-contact-form')
if (elForm) {
  var elNameInput = document.querySelector('.js-contact-form__name-input')
  var elRelation = document.querySelector('.js-contact-form__relationship-input')
  var elDatalist = document.querySelector('#relationships-list')
  var elPhoneNumber = document.querySelector('.js-contact-form__phone-input')
  var elContactsList = document.querySelector('.js-contacts')
}

elForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  var NameInputValue = elNameInput.value;
  var RelationValue = elRelation.value;
  var PhoneNumberValue = elPhoneNumber.value;

  var newObject = {
    name: NameInputValue,
    rela: RelationValue,
    phone: PhoneNumberValue
  };

  elPhoneNumber.classList.remove('is-invalid');
  for(var i = 0; i < contactsArray.length; i++){
    if (contactsArray[i].phone === newObject.phone) {
      elPhoneNumber.classList.add('is-invalid');
      return;
    }
  }

  contactsArray.push(newObject);

  relationArray.push(RelationValue);
  elContactsList.innerHTML = '';

  for(var relation of relationArray){
    var newOption = createElement('option');
    newOption.textContent = relation;

    elDatalist.appendChild(newOption);
  }

  contactsArray.forEach(function (contact) {

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
    newDeleteButton.setAttribute('class', 'delete-button btn btn-sm btn-danger');

    newContact.appendChild(newName);
    newContact.appendChild(newRela);
    newContact.appendChild(newPhone);
    newContact.appendChild(newDeleteButton);

    elContactsList.appendChild(newContact);

    elNameInput.value = '';
    elRelation.value = '';
    elPhoneNumber.value = '';
  })


})