import { loading } from './scripts/loading.js'

const convertButton = document.getElementById('csvButton');
const infoButton = document.getElementById('infoButton');
const apkgButton = document.getElementById('apkgButton');
const outputField = document.getElementById('output-field');
const pdfButton = document.getElementById('pdfButton');

let expanseField = true;

convertButton.addEventListener('click', () => {loading("csv")});
infoButton.addEventListener('click', getInfo);
apkgButton.addEventListener('click', () => {loading("anki")});
pdfButton.addEventListener('click', () => {loading("pdf")});

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

function getInfo() {

    if (expanseField) {
        outputField.textContent = `Open your Phase6 web app, go to the library of the desired book you want to export, open developer tools (F12), navigate to the network tab, delete and refresh everything if necessary and watch out for requests called cardList and unitsFiltered. Click on them and go to the response tab. Copy the responses and paste them into the text fields. Click one of the download buttons to access your vocabulary.`;
        expanseField = false;
    } else {
        outputField.textContent = "";
        expanseField = true;
    }

}

// async function loadData(type) {
//     playProgressBar();
//     await getData(type);
// }