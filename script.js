const daysInMonth = 30;
let money;
let time;

start();
const appData = new Data();
chooseExpenses(appData);
detectDayBudget(appData.moneyData, appData.expenses);
detectLevel(appData);
checkSavings(appData);
chooseOptExpenses(appData);

function start() {
  money = +prompt('Ваш бюджет на месяц?', '');
  while(isNaN(money) || money === "" || money == null) {
    money = +prompt('Ваш бюджет на месяц?', '');
  }

  time = prompt('Введите дату в формате YYYY-MM-DD', '');
}
function Data() {
  this.moneyData = money;
  this.timeData = time;
  this.expenses = {};
  this.optionalExpenses = {};
  this.income = [];
  this.savings = true;
}
function chooseExpenses(data) {
  for (let i = 0; i < 2; i++) {
    let answers = questions();
    validation(answers, data);
  }
}
function detectDayBudget(monthBudget, expenses) {
  let monthExpensesSum = 0;
  for (let i = 0; i < Object.keys(expenses).length; i++) {
    monthExpensesSum += Object.values(expenses)[i];
  }
  appData.monthExpensesSum = monthExpensesSum;
  appData.moneyPerDay = Number(((appData.moneyData - appData.monthExpensesSum) / daysInMonth).toFixed(2));
  alert(`Ежедневный бюджет: ${appData.moneyPerDay}`);
}
function detectLevel(data) {
  if (data.moneyPerDay <= 100) {
    console.log('Минимальный уровень достатка');
  } else  if (data.moneyPerDay > 100 && data.moneyPerDay < 2000) {
    console.log('Средний уровень достатка');
  } else if (data.moneyPerDay >= 2000) {
    console.log('Высокий уровень достатка');
  } else {
    console.log('Произошла ошибка');
  }
}
function validation(answers, data) {
  if (typeof(answers[0]) === 'string'
    && typeof (answers[0]) != null
    && answers[0].length <= 50
    && answers[0].length > 0
    && typeof (answers[1]) != null
    && answers[1].length > 0) {
    console.log('done');
    data.expenses[answers[0]] = +answers[1];
  } else {
    alert('Введённые данные некорректны! Повторите ввод');
    let answers = questions();
    validation(answers);
  }
}
function questions() {
  let firstAnswer = prompt('Введите обязательную статью расходов в этом месяце');
  let secondAnswer = prompt('Во сколько обойдется?');
  return [firstAnswer, secondAnswer];
}
function checkSavings(data) {
  if (data.savings === true) {
    let save = +prompt('Какова сумма накоплений?');
    let percent = +prompt('Под какой процент?');
    data.monthIncome = Number((save / 100 / 12 * percent).toFixed(2));
    alert(`Доход в месяц с вашего депозита: ${data.monthIncome}`);
  }
}
function chooseOptExpenses(data) {
  const question = 'Статья необязательных расходов';
  for(let i = 0; i < 3; i++) {
    let optExpensesAnswer = '';
    while (optExpensesAnswer === '' || optExpensesAnswer === null) {
      optExpensesAnswer = prompt(question, '');
    }
    data.optionalExpenses[i] = optExpensesAnswer;
  }
}
