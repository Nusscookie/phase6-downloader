const outputField = document.getElementById('output-field');
const cardListData = document.getElementById('cardListData');
const unitsListData = document.getElementById('unitsListData');

let cardsObject = {};
let unitsObject = {};
let units = [];

export function convertData() {
    let cardListValue = cardListData.value;
    let unitsListValue = unitsListData.value;

    try {
        cardsObject = JSON.parse(cardListValue).replyContent.cards;
        unitsObject = JSON.parse(unitsListValue).replyContent.units;
    } catch (error) {
        outputField.textContent = `Invalid JSON data`;
        console.error("Error parsing JSON data:", error);
        return;
    }

    let cards = cardsObject.map(card => {
        return [card.cardContent.question.split("[").shift(), card.cardContent.answer.split("[").shift(), card.unitIdToOwner.id];
    });

    units = unitsObject.map(unit => {
        return [unit.unitId.id, unit.unitContent.name];
    });

    let list = cards.map(card => {
        let unitName = units.find(unit => unit[0] === card[2])[1];
        return [card[0], card[1], unitName];
    });

    return list;
}

export function getUnitNames() {
    let unitsNames = units.map(unit => unit[1]);
    return unitsNames;
}