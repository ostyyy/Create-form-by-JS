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
registerForm.novalidate = true;

const formCols = craftElement('div', 'form-columns');
const columnL = craftElement('div', 'column');
const columnR = craftElement('div', 'column');

// ---> inputs
const firstName = craftInput('text', 'first-name', 'First name');
const displayName = craftInput('text', 'display-name', 'Display name');

const passwordWrapper = craftElement('div', 'input-box');
const password = craftInput('password', 'password', 'Password');
const pswError = craftElement('span', 'input-error');

columnL.appendChild(firstName);
columnL.appendChild(displayName);

passwordWrapper.appendChild(password);
passwordWrapper.appendChild(pswError);
columnL.appendChild(passwordWrapper);

const lastName = craftInput('text', 'last-name', 'Last name');

const emailWrapper = craftElement('div', 'input-box');
const email = craftInput('email', 'email', 'Email Address');
const emailError = craftElement('span', 'input-error');

const pswConfWrapper = craftElement('div', 'input-box');
const passwordConf = craftInput(
    'password',
    'conf-password',
    'Password Confirmation',
);
const pswConfError = craftElement('span', 'input-error');

columnR.appendChild(lastName);

emailWrapper.appendChild(email);
emailWrapper.appendChild(emailError);
columnR.appendChild(emailWrapper);

pswConfWrapper.appendChild(passwordConf);
pswConfWrapper.appendChild(pswConfError);
columnR.appendChild(pswConfWrapper);

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

//------------------------------COLLECT-PROPS-------------------------------

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

//-----------------------------EMAIL-VALIDATION---------------------------
email.addEventListener('change', (event) => {
    const userEmail = event.target.value.trim();

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailPattern.test(userEmail)) {
        emailError.style.display = 'none';
        submitBtn.disabled = false;
    } else {
        emailError.textContent = 'Valid format: example@domain.com';
        emailError.style.display = 'inline-block';
        submitBtn.disabled = true;
    }
});

//-----------------------------PASSWORD-VALIDATION---------------------------
function passwordValidation() {
    const userPsw = password.value;
    const confirmedPsw = passwordConf.value;

    if (userPsw.length < 8) {
        pswError.textContent = 'Password must contain at least 8 characters!';
        pswError.style.display = 'inline-block';
        submitBtn.disabled = true;
    } else {
        pswError.style.display = 'none';

        if (confirmedPsw === userPsw) {
            pswConfError.style.display = 'none';
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
            if (confirmedPsw !== '') {
                pswConfError.textContent = 'Password do not match!';
                pswConfError.style.display = 'inline-block';
            } else {
                pswConfError.style.display = 'none';
            }
        }
    }
}

password.addEventListener('change', passwordValidation);
passwordConf.addEventListener('change', passwordValidation);
