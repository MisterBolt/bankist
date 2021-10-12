"use strict";

////////////////////---------- DATA ----------\\\\\\\\\\\\\\\\\\\\
const account1 = {
  owner: "Karol Bielecki",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
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
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const recipientAccount = accounts.find(account => account.username === inputTransferTo.value);
  const amount = Number(inputTransferAmount.value);
  inputTransferTo.value = inputTransferAmount.value = "";
  inputTransferTo.blur();
  inputTransferAmount.blur();

  if (
    recipientAccount &&
    amount > 0 &&
    currentAccount.balance >= amount &&
    recipientAccount?.username != currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recipientAccount.movements.push(amount);
    updateUI();
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  inputLoanAmount.value = "";

  if (amount > 0 && currentAccount.movements.some(movement => movement >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI();
  } else alert("You have too low account balance");
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

  currentAccount.movements.forEach(function (movement, i) {
    const type = movement > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${movement}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

function calculateAndDisplayBalance() {
  currentAccount.balance = currentAccount.movements.reduce((acc, movement) => acc + movement, 0);
  labelBalance.textContent = `${currentAccount.balance}€`;
}

function calculateAndDisplayIncomes() {
  const incomes = currentAccount.movements
    .filter(movement => movement > 0)
    .reduce((sum, movement) => sum + movement, 0);
  labelSumIn.textContent = `${incomes}€`;
}

function calculateAndDisplayOutcomes() {
  const outcomes = currentAccount.movements
    .filter(movement => movement < 0)
    .reduce((sum, movement) => sum + movement, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;
}

function calculateAndDisplayInterest() {
  const interest = currentAccount.movements
    .filter(movement => movement > 0)
    .map(income => (income * currentAccount.interestRate) / 100)
    .reduce((sum, int) => sum + int, 0);
  labelSumInterest.textContent = `${interest}€`;
}

function updateUI() {
  displayMovements();
  calculateAndDisplayBalance();
  calculateAndDisplayIncomes();
  calculateAndDisplayOutcomes();
  calculateAndDisplayInterest();
}
