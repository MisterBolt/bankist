"use strict";

////////////////////---------- DATA ----------\\\\\\\\\\\\\\\\\\\\

const account1 = {
  owner: "Karol Bielecki",
  movements: [
    { amount: 200, date: "2019-11-18T21:31:17.178Z" },
    { amount: 450, date: "2019-12-23T07:42:02.383Z" },
    { amount: -400, date: "2020-01-28T09:15:04.904Z" },
    { amount: 3000, date: "2020-04-01T10:17:24.185Z" },
    { amount: -650, date: "2021-10-05T14:11:59.604Z" },
    { amount: -130, date: "2021-10-06T17:01:17.194Z" },
    { amount: 70, date: "2021-10-11T15:36:17.929Z" },
    { amount: 1300, date: "2021-10-12T16:51:36.790Z" },
  ],
  interestRate: 1.2, // %
  pin: 1111,
  locale: "pl-PL",
  currency: "PLN",
};

const account2 = {
  owner: "Jessica Davis",
  movements: [
    { amount: 5000, date: "2019-11-18T21:31:17.178Z" },
    { amount: 3400, date: "2019-12-23T07:42:02.383Z" },
    { amount: -150, date: "2020-01-28T09:15:04.904Z" },
    { amount: -790, date: "2020-04-01T10:17:24.185Z" },
    { amount: -3210, date: "2020-05-08T14:11:59.604Z" },
    { amount: -1000, date: "2020-05-27T17:01:17.194Z" },
    { amount: 8500, date: "2020-07-11T23:36:17.929Z" },
    { amount: -30, date: "2020-07-12T10:51:36.790Z" },
  ],
  interestRate: 1.5,
  pin: 2222,
  locale: "en-US",
  currency: "USD",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [
    { amount: 200, date: "2019-11-18T21:31:17.178Z" },
    { amount: -200, date: "2019-12-23T07:42:02.383Z" },
    { amount: 340, date: "2020-01-28T09:15:04.904Z" },
    { amount: -300, date: "2020-04-01T10:17:24.185Z" },
    { amount: -20, date: "2020-05-08T14:11:59.604Z" },
    { amount: 50, date: "2020-05-27T17:01:17.194Z" },
    { amount: 400, date: "2020-07-11T23:36:17.929Z" },
    { amount: -460, date: "2020-07-12T10:51:36.790Z" },
  ],
  interestRate: 0.7,
  pin: 3333,
  locale: "en-GB",
  currency: "GBP",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [
    { amount: 430, date: "2018-11-18T21:31:17.178Z" },
    { amount: 1000, date: "2019-12-23T07:42:02.383Z" },
    { amount: 700, date: "2020-01-28T09:15:04.904Z" },
    { amount: 50, date: "2020-04-01T10:17:24.185Z" },
    { amount: 90, date: "2020-05-08T14:11:59.604Z" },
  ],
  interestRate: 1,
  pin: 4444,
  locale: "pt-PT",
  currency: "EUR",
};

const accounts = [account1, account2, account3, account4];

////////////////////---------- SELECTING ELEMENTS ----------\\\\\\\\\\\\\\\\\\\\

const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

////////////////////---------- STARTING CONDITIONS ----------\\\\\\\\\\\\\\\\\\\\

createUsernames(accounts);
let currentAccount;
let sorted = false;
let logOutTimer;

////////////////////---------- BUTTONS FUNCTIONALITY ----------\\\\\\\\\\\\\\\\\\\\

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(account => account.username === inputLoginUsername.value);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}!`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginUsername.blur();
    inputLoginPin.blur();
    updateUI();

    if (logOutTimer) {
      clearInterval(logOutTimer);
    }
    logOutTimer = startLogOutTimer();
  } else alert("Wrong credentials");
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const recipientAccount = accounts.find(account => account.username === inputTransferTo.value);
  const amount = Number(inputTransferAmount.value);
  inputTransferTo.value = inputTransferAmount.value = "";
  inputTransferTo.blur();
  inputTransferAmount.blur();

  clearInterval(logOutTimer);
  logOutTimer = startLogOutTimer();

  if (
    recipientAccount &&
    amount > 0 &&
    currentAccount.balance >= amount &&
    recipientAccount?.username != currentAccount.username
  ) {
    const transferDate = new Date().toISOString();

    currentAccount.movements.push({ amount: -amount, date: transferDate });
    recipientAccount.movements.push({ amount: amount, date: transferDate });

    updateUI();
  } else alert("Wrong recepient or too low account balance");
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  inputLoanAmount.value = "";

  clearInterval(logOutTimer);
  logOutTimer = startLogOutTimer();

  if (amount > 0 && currentAccount.movements.some(movement => movement.amount >= amount * 0.1)) {
    currentAccount.movements.push({ amount: amount, date: new Date().toISOString() });

    setTimeout(function () {
      updateUI();
      alert(`You get the loan: ${formatCurrency(amount)}`);
    }, 3000);
  } else alert("Too high loan");
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(account => account.username === currentAccount.username);

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  } else alert("Wrong credentials");

  inputCloseUsername.value = inputClosePin.value = "";
});

btnSort.addEventListener("click", function () {
  sorted = !sorted;
  displayMovements();

  clearInterval(logOutTimer);
  logOutTimer = startLogOutTimer();
});

////////////////////---------- APP FUNCTIONALITY ----------\\\\\\\\\\\\\\\\\\\\

function createUsernames(accounts) {
  accounts.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(word => word[0])
      .join("");
  });
}

function displayMovements() {
  containerMovements.innerHTML = "";
  const movements = sorted
    ? currentAccount.movements.slice().sort((a, b) => a.amount - b.amount)
    : currentAccount.movements;

  movements.forEach(function (movement, i) {
    const type = movement.amount > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${formatMovementDate(new Date(movement.date))}</div>
        <div class="movements__value">${formatCurrency(movement.amount)}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

function formatMovementDate(date) {
  const now = new Date();
  const daysPassed = Math.round(Math.abs(now - date) / (1000 * 60 * 60 * 24));

  if (daysPassed === 0 && now.getDate() === date.getDate()) return "Today";
  if (daysPassed <= 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return Intl.DateTimeFormat(currentAccount.locale).format(date);
}

function calculateAndDisplayBalance() {
  currentAccount.balance = currentAccount.movements.reduce((sum, movement) => sum + movement.amount, 0);
  labelBalance.textContent = formatCurrency(currentAccount.balance);
}

function calculateAndDisplayIncomes() {
  const incomes = currentAccount.movements
    .filter(movement => movement.amount > 0)
    .reduce((sum, movement) => sum + movement.amount, 0);
  labelSumIn.textContent = formatCurrency(incomes);
}

function calculateAndDisplayOutcomes() {
  const outcomes = currentAccount.movements
    .filter(movement => movement.amount < 0)
    .reduce((sum, movement) => sum + movement.amount, 0);
  labelSumOut.textContent = formatCurrency(Math.abs(outcomes));
}

function calculateAndDisplayInterest() {
  const interest = currentAccount.movements
    .filter(movement => movement.amount > 0)
    .map(income => (income.amount * currentAccount.interestRate) / 100)
    .reduce((sum, int) => sum + int, 0);
  labelSumInterest.textContent = formatCurrency(interest);
}

function updateAndDisplayBalanceDate() {
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  labelDate.textContent = Intl.DateTimeFormat(currentAccount.locale, options).format(new Date());
}

function formatCurrency(amount) {
  const options = { style: "currency", currency: currentAccount.currency };
  return Intl.NumberFormat(currentAccount.locale, options).format(amount);
}

function startLogOutTimer() {
  function tickTock() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(logOutTimer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }

    time--;
  }

  let time = 300;

  tickTock();

  return setInterval(tickTock, 1000);
}

function updateUI() {
  displayMovements();
  calculateAndDisplayBalance();
  calculateAndDisplayIncomes();
  calculateAndDisplayOutcomes();
  calculateAndDisplayInterest();
  updateAndDisplayBalanceDate();
}
