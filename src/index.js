import { Person } from './person.js';

const body = document.body;

function craftElement(tagName, className = '', content = '') {
    const result = document.createElement(tagName);

    if (className) {
        result.classList.add(className);
    }
    if (content) {
        result.textContent = content;
    }

    return result;
}

function craftInput(type, name, placeholder) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = placeholder;
    input.required = true;
    return input;
}

function craftRadio(type, name, id, value) {
    const radio = document.createElement('input');
    radio.type = type;
    radio.name = name;
    radio.id = id;
    radio.value = value;
    return radio;
}

// ---- CONTAINER ----
const container = craftElement('div', 'container');

const header = craftElement('div', 'header');

const h1 = craftElement('h1', '', 'CREATE AN ACCOUNT');

const pHeader = craftElement(
    'p',
    '',
    'We always keep your name and email address private.',
);

header.appendChild(h1);
header.appendChild(pHeader);
container.appendChild(header);

// ---- FORM -----
const registerForm = craftElement('form');

const formCols = craftElement('div', 'form-columns');
const columnL = craftElement('div', 'column');
const columnR = craftElement('div', 'column');

// ---> inputs
const firstName = craftInput('text', 'first-name', 'First name');
const displayName = craftInput('text', 'display-name', 'Display name');
const password = craftInput('password', 'password', 'Password');

columnL.appendChild(firstName);
columnL.appendChild(displayName);
columnL.appendChild(password);

const lastName = craftInput('text', 'last-name', 'Last name');
const email = craftInput('email', 'email', 'Email Address');
const passwordConf = craftInput(
    'password',
    'conf-password',
    'Password Confirmation',
);

columnR.appendChild(lastName);
columnR.appendChild(email);
columnR.appendChild(passwordConf);

formCols.appendChild(columnL);
formCols.appendChild(columnR);
registerForm.appendChild(formCols);

// ---> radio buttons
// ----> Buyer
const accountTypeBuyer = craftElement('div', 'account-type');

const radioBuyer = craftRadio('radio', 'account-type', 'buyer', 'buyer');
const textBuyer = craftElement('div', 'text');

const labelBuyer = craftElement('label', '', 'Join As a Buyer');
labelBuyer.setAttribute('for', 'buyer');

const pBuyer = craftElement(
    'p',
    '',
    ' I am looking for a Name, Logo or Tagline for my business, brand or product',
);

textBuyer.appendChild(labelBuyer);
textBuyer.appendChild(pBuyer);
accountTypeBuyer.appendChild(radioBuyer);
accountTypeBuyer.appendChild(textBuyer);
registerForm.appendChild(accountTypeBuyer);

// -----> Seller
const accountTypeSeller = craftElement('div', 'account-type');

const radioSeller = craftRadio('radio', 'account-type', 'seller', 'seller');
const textSeller = craftElement('div', 'text');

const labelSeller = craftElement(
    'label',
    '',
    'Join As a Creative or Marketplace Seller',
);
labelSeller.setAttribute('for', 'seller');

const pSeller = craftElement(
    'p',
    '',
    'I plan to submit name ideas, Logo designs or sell names in Domain Marketplace.',
);

textSeller.appendChild(labelSeller);
textSeller.appendChild(pSeller);
accountTypeSeller.appendChild(radioSeller);
accountTypeSeller.appendChild(textSeller);
registerForm.appendChild(accountTypeSeller);

// ---- offers checkbox
const offersContainer = craftElement('div', 'offers-checkbox');

const offersCheckbox = document.createElement('input');
offersCheckbox.type = 'checkbox';
offersCheckbox.name = 'offers-checkbox';
offersCheckbox.id = 'offers';

const labelOffers = craftElement(
    'label',
    '',
    'Allow Squadhelp to send marketing/promotional offers from time to time',
);
labelOffers.setAttribute('for', 'offers');

offersContainer.appendChild(offersCheckbox);
offersContainer.appendChild(labelOffers);
registerForm.appendChild(offersContainer);

// --- Create account
const submitBtn = craftElement('button', 'create-btn', 'Create account');
submitBtn.type = 'submit';

registerForm.appendChild(submitBtn);
container.appendChild(registerForm);

document.body.appendChild(container);

//------------------------------------------------------

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const inputsData = registerForm.querySelectorAll('input[name]');
    let userInputs = {};

    inputsData.forEach((input) => {
        if (input.name !== 'password' && input.name !== 'conf-password') {
            userInputs[input.name] = input.value;
        }
    });

    const person = new Person(...Object.values(userInputs));

    localStorage.setItem(person.lastName, JSON.stringify(person));
});
