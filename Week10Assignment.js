class Month{
    constructor(monthName, reason){
        this.monthName = monthName;
        this.reason = reason;
    }
}


class Season {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.months = [];
    }
    addMonth(month) {
        this.month.push(month);
    }

    deletemonth (month) {
        let index = this.months.indexOf(month);
        this.months.splice(index, 1);
    }
}

let seasons = [];
let seasonId = 0;

onClick('new-season', () => {
    seasons.push(new Season(seasonId++,getValue('new-season-name')))
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM () {
    let seasonDiv = document.getElementById('seasons');
    clearElement (seasonDiv);
    for (season of seasons) {
        let table = createSeasonTable(season);
        let title = document.createElement('h2');
        title.innerHTML = season.name;
        title.appendChild(createDeleteSeasonButton(season));
        seasonDiv.appendChild(title);
        seasonDiv.appendChild(table);
        for (month of season.months) {
            createMonthRow(season, table, month);
        }
    }
}

function createMonthRow(season, table, month) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = month.monthName;
    row.insertCell(1).innerHTML = month.reason;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(season, month))
}

function createDeleteRowButton(season, month) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = season.months.indexOf(month);
        season.months.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createDeleteSeasonButton(season) {
    let btn = document.createElement('button');
    btn.className ='btn btn-dark';
    btn.innerHTML = 'Delete Season';
    btn.onclick = () => {
        let index = seasons.indexOf(season);
        seasons.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewMonthButton(season) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-light';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        season.months.push(new Month(getValue(`name-input-${season.id}`), getValue(`reason-input-${season.id}`)));
        drawDOM();
    };
    return btn;
}

function createSeasonTable(){
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let reasonColumn = document.createElement('th');
    let buttonChoiceColumn = document.createElement('th');
    nameColumn.innerHTML = 'What month do you like the most within the season?';
    reasonColumn.innerHTML = 'Why is that your favorit month?';
    buttonChoiceColumn.innerHTML = 'Action';
    row.appendChild(nameColumn);
    row.appendChild(reasonColumn);
    row.appendChild(buttonChoiceColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let reasonTh = document.createElement ('th');
    let buttonChoiceTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${season.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let reasonInput = document.createElement('input');
    reasonInput.setAttribute('id', `reason-input-${season.id}`);
    reasonInput.setAttribute('type', 'text');
    reasonInput.setAttribute('class', 'form-control');
    let newMonthButton = createNewMonthButton(season);
    nameTh.appendChild(nameInput);
    reasonTh.appendChild(reasonInput);
    createTh.appendChild(newMonthButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(reasonTh)
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
