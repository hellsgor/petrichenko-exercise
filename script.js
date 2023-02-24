const daysInMonth = 30;

const startButton = document.getElementById('start');
const resultChildren = document.querySelectorAll('.result-table > div');
let valuesBlocks = [];
const expensesItemInputs = document.querySelectorAll('.expenses-item');
const expensesItemButton = document.querySelector('.expenses-item-btn');
const optionalExpensesButton = document.querySelector('.optionalexpenses-btn');
const countBudgetButton = document.querySelector('.count-budget-btn');
const optionalExpensesInputs = document.querySelectorAll('.optionalexpenses-item');
const chooseIncomeInput = document.querySelector('.choose-income');
const savingsCheckbox = document.getElementById('savings');
const sumInput = document.getElementById('sum');
const percentInput = document.getElementById('percent');
const yearValueInput = document.querySelector('input[class=year-value]');
const monthValueInput = document.querySelector('input[class=month-value]');
const dayValueInput = document.querySelector('input[class=day-value]');
const secondaryButtons = document.querySelectorAll('button:not([id=start])');
const budgetValue = document.querySelector('.budget-value');
const expensesValue = document.querySelector('.expenses-value');
const optionalexpensesValue = document.querySelector('.optionalexpenses-value');
const daybudgetValue = document.querySelector('.daybudget-value');
const levelValue = document.querySelector('.level-value');
const incomeValue = document.querySelector('.income-value');
const monthsavingsValue = document.querySelector('.monthsavings-value');
const yearsavingsValue = document.querySelector('.yearsavings-value');

resultChildren.forEach(function(div, i, resultChildren) {
  if (resultChildren[i].className.includes('-value')) {
    valuesBlocks.push(div);
  }
})

for (let btn of secondaryButtons) {
  btn.setAttribute('disabled', '');
}

function start() {
  let timeStart = new Date();
  let moneyStart = prompt('Ваш бюджет на месяц?', '');
  while(moneyStart === null || moneyStart.length < 1 || isNaN(moneyStart)) {
    moneyStart = prompt('Ваш бюджет на месяц?', '');
  }
  appData.moneyData = Number(moneyStart);
  appData.timeData = timeStart;
  budgetValue.textContent = `${appData.moneyData} ${appData.currency}`;

  yearValueInput.value = appData.timeData.getFullYear();
  monthValueInput.value = appData.timeData.getMonth() + 1;
  dayValueInput.value = appData.timeData.getDate();

  for (let btn of secondaryButtons) {
    btn.removeAttribute('disabled');
  }
}

const appData = {
  timeData: "",
  currency: "руб.",
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,
  moneyPerDay: `0 ${this.currency}`,
  chooseExpenses: function (data) {
    let sum = 0;
    for (let i = 0; i < expensesItemInputs.length; ++i) {
      if (i % 2 === 0) {
        let firstAnswer = expensesItemInputs[i].value;
        let secondAnswer = expensesItemInputs[++i].value;
        i = i - 1;
        sum += data.validation([firstAnswer, secondAnswer], data);
      }
    }
    return sum;
  },
  validation: function (answers, data) {
    if (typeof(answers[0]) === 'string'
      && typeof (answers[0]) != null
      && answers[0].length <= 50
      && answers[0].length > 0
      && typeof (answers[1]) != null
      && answers[1].length > 0
      && answers[1].length <= 50) {
      data.expenses[answers[0]] = +answers[1];
      return +answers[1];
    } else {
      console.log('Введённые данные некорректны! Повторите ввод');
    }
  },
  detectDayBudget: function (monthBudget, expenses) {
    let monthExpensesSum = 0;
    for (let i = 0; i < Object.keys(expenses).length; i++) {
      monthExpensesSum += Object.values(expenses)[i];
    }
    appData.monthExpensesSum = monthExpensesSum;
    appData.moneyPerDay = Number(((appData.moneyData - appData.monthExpensesSum) / daysInMonth).toFixed(2));
    daybudgetValue.textContent = `${appData.moneyPerDay} ${appData.currency}`;
  },
  detectLevel: function (data) {
    let level = '';
    if (data.moneyPerDay <= 100) {
      level = 'Минимальный уровень достатка';
    } else  if (data.moneyPerDay > 100 && data.moneyPerDay < 2000) {
      level = 'Средний уровень достатка';
    } else if (data.moneyPerDay >= 2000) {
      level = 'Высокий уровень достатка';
    } else {
      level = 'Error!!!'
      console.log('Произошла ошибка');
    }
    levelValue.textContent = level;
  },
  checkSavings: function (data) {
    if (data.savings === true) {
      let save = sumInput.value;
      let percent = percentInput.value;
      data.monthIncome = Number((save / 100 / 12 * percent).toFixed(2));
      data.yearIncome = Number((save / 100 / 12 * percent * 12).toFixed(2));
      monthsavingsValue.textContent = `${data.monthIncome} ${data.currency}`;
      yearsavingsValue.textContent = `${data.yearIncome} ${data.currency}`;
    }
  },
  chooseOptExpenses: function (data) {
    for(let i = 0; i < optionalExpensesInputs.length; i++) {
      data.optionalExpenses[i] = optionalExpensesInputs[i].value;
      let textContent = (i === optionalExpensesInputs.length - 1) ? optionalExpensesInputs[i].value : optionalExpensesInputs[i].value + ', ';
      optionalexpensesValue.textContent += textContent;
    }
  },
  chooseIncome: function(input) {
    let items = input.value;

    appData.income = items.split(', ');
    appData.income.sort();

    let messageText = 'Способы доп. заработка: ';
    let i = 0;
    appData.income.forEach(item => {
      ++i;
      let separator = (i > 1) ? ', ' : '';
      messageText += `${separator}${i}. ${item}`;
    })
    incomeValue.textContent = input.value;
  },
  showData: function() {
    let i = 0;
    let messageText = 'Наша программа включает в себя данные: '
    for (let key in appData) {
      ++i;
      let separator = (i > 1) ? ', ' : '';
      messageText += `${separator}${key}`;
    }
    console.log(messageText);
  }
};

appData.showData();
startButton.addEventListener('click', start);
expensesItemButton.addEventListener('click', () => {
  let sum = 0;
  sum += appData.chooseExpenses(appData);
  expensesValue.textContent = `${sum} ${appData.currency}`;
})
optionalExpensesButton.addEventListener('click', () => {
  appData.chooseOptExpenses(appData);
})
countBudgetButton.addEventListener('click', () => {
  if (appData.moneyData !== undefined) {
    appData.detectDayBudget(appData.moneyData, appData.expenses);
    appData.detectLevel(appData);
  } else {
    console.log('Сначала нажмите "Начать расчёт"');
    daybudgetValue.textContent = 'Сначала начните расчёт';
  }
})
chooseIncomeInput.addEventListener('input', () => {
  appData.chooseIncome(chooseIncomeInput);
})
savingsCheckbox.addEventListener('click', () => {
  if (savingsCheckbox.checked) {
    appData.savings = true;
  } else {
    appData.savings = false;
  }
})
sumInput.addEventListener('input', () => {
  if (sumInput.value !== '' && percentInput !== '') {
    appData.checkSavings(appData);
  }
})
percentInput.addEventListener('input', () => {
  if (sumInput.value !== '' && percentInput !== '') {
    appData.checkSavings(appData);
  }
})



// appData.chooseExpenses(appData);
// appData.detectDayBudget(appData.moneyData, appData.expenses);
// appData.detectLevel(appData);
// appData.checkSavings(appData);
// appData.chooseOptExpenses(appData);
