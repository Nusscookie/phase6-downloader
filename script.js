const outputField = document.getElementById('output-field');
const cardListData = document.getElementById('cardListData');
const unitsListData = document.getElementById('unitsListData');

let cardsObject = {};
let expanseField = true;

function saveData() {

    if (sessionStorage.getItem('cardListData')) {
        cardListData.value = sessionStorage.getItem('cardListData');
    }

    if (sessionStorage.getItem('unitsListData')) {
        unitsListData.value = sessionStorage.getItem('unitsListData');
    }

    cardListData.addEventListener('change', () => {
        sessionStorage.setItem('cardListData', cardListData.value);
    });

    unitsListData.addEventListener('change', () => {
        sessionStorage.setItem('unitsListData', unitsListData.value);
    });
}

saveData();

function convertData() {
    let cardListValue = cardListData.value;
    let unitsListValue = unitsListData.value;

    try {
        cardsObject = JSON.parse(cardListValue).replyContent.cards;
        unitsObject = JSON.parse(unitsListValue).replyContent.units;
    } catch (error) {
        outputField.textContent = "Invalid JSON data.";
        return;
    }

    let cards = cardsObject.map(card => {
        return [card.cardContent.question.split("[").shift(), card.cardContent.answer.split("[").shift(), card.unitIdToOwner.id];
    });

    let units = unitsObject.map(unit => {
        return [unit.unitId.id, unit.unitContent.name];
    });

    let list = cards.map(card => {
        let unitName = units.find(unit => unit[0] === card[2])[1];
        return [card[0], card[1], unitName.replaceAll(' ', '_')];
    });

    let csvContent = list.map(listItem => {
        return `${listItem[0]},${listItem[1]},${listItem[2]}\n`;
    });

    const blob = new Blob(csvContent, { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'phase6-vocab.csv';
    link.click();
}


function getInfo() {

    if (expanseField) {
        outputField.textContent = `Open your Phase6 web app, go to the library of the desired book you want to export, open developer tools (F12), navigate to the network tab, delete and refresh everything if necessary and watch out for requests called cardList and unitsFiltered. Click on them and go to the response tab. Copy the responses and paste them into the text fields. Click "Convert" to download your vocabulary as a CSV file.`;
        expanseField = false;
    } else {
        outputField.textContent = "";
        expanseField = true;
    }

}
