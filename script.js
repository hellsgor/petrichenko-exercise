const daysInMonth = 30;
let money = getMoney();
let time = prompt('Введите дату в формате YYYY-MM-DD', '');

function getMoney() {
  let money = prompt('Ваш бюджет на месяц?', '');
  while(money === null || money.length < 1 || isNaN(money)) {
    money = prompt('Ваш бюджет на месяц?', '');
  }
  return money;
}

const appData = {
  moneyData: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings:true,
  chooseExpenses: function (data) {
    for (let i = 0; i < 2; i++) {
      let answers = appData.questions();
      appData.validation(answers, data);
    }
  },
  questions: function () {
    let firstAnswer = prompt('Введите обязательную статью расходов в этом месяце');
    let secondAnswer = prompt('Во сколько обойдется?');
    return [firstAnswer, secondAnswer];
  },
  validation: function (answers, data) {
    if (typeof(answers[0]) === 'string'
      && typeof (answers[0]) != null
      && answers[0].length <= 50
      && answers[0].length > 0
      && typeof (answers[1]) != null
      && answers[1].length > 0
      && answers[1].length <= 50) {
      console.log('done');
      data.expenses[answers[0]] = +answers[1];
    } else {
      alert('Введённые данные некорректны! Повторите ввод');
      let answers = appData.questions();
      appData.validation(answers);
    }
  },
  detectDayBudget: function (monthBudget, expenses) {
    let monthExpensesSum = 0;
    for (let i = 0; i < Object.keys(expenses).length; i++) {
      monthExpensesSum += Object.values(expenses)[i];
      console.log('monthExpensesSum', monthExpensesSum)
    }
    appData.monthExpensesSum = monthExpensesSum;
    console.log('appData.monthExpensesSum', appData.monthExpensesSum);
    appData.moneyPerDay = Number(((appData.moneyData - appData.monthExpensesSum) / daysInMonth).toFixed(2));
    alert(`Ежедневный бюджет: ${appData.moneyPerDay}`);
  },
  detectLevel: function (data) {
    if (data.moneyPerDay <= 100) {
      console.log('Минимальный уровень достатка');
    } else  if (data.moneyPerDay > 100 && data.moneyPerDay < 2000) {
      console.log('Средний уровень достатка');
    } else if (data.moneyPerDay >= 2000) {
      console.log('Высокий уровень достатка');
    } else {
      console.log('Произошла ошибка');
    }
  },
  checkSavings: function (data) {
    if (data.savings === true) {
      let save = +prompt('Какова сумма накоплений?');
      let percent = +prompt('Под какой процент?');
      data.monthIncome = Number((save / 100 / 12 * percent).toFixed(2));
      alert(`Доход в месяц с вашего депозита: ${data.monthIncome}`);
    }
  },
  chooseOptExpenses: function (data) {
    const question = 'Статья необязательных расходов';
    for(let i = 0; i < 3; i++) {
      let optExpensesAnswer = '';
      while (optExpensesAnswer === '' || optExpensesAnswer === null) {
        optExpensesAnswer = prompt(question, '');
      }
      data.optionalExpenses[i] = optExpensesAnswer;
    }
  },
  chooseIncome: function() {
    let items = prompt('Что принесёт дополнительный доход? (Перечислите через запятую)', '');

    while (items === null || items.length < 1 || typeof (items) != 'string') {
      items = prompt('Что принесёт дополнительный доход? (Перечислите через запятую)', '');
    }

    appData.income = items.split(', ');
    appData.income.push(prompt('Может что-то ещё?', ''));
    appData.income.sort();

    let messageText = 'Способы доп. заработка: ';
    let i = 0;
    appData.income.forEach(item => {
      ++i;
      let separator = (i > 1) ? ', ' : '';
      messageText += `${separator}${i}. ${item}`;
    })
    alert(messageText);
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



// appData.chooseExpenses(appData);
// appData.detectDayBudget(appData.moneyData, appData.expenses);
// appData.detectLevel(appData);
// appData.checkSavings(appData);
// appData.chooseOptExpenses(appData);
