import { saveAs } from "file-saver";

const outputField = document.getElementById('output-field');
const cardListData = document.getElementById('cardListData');
const unitsListData = document.getElementById('unitsListData');

let units = [];

export async function convertData(convertType) {

    const url = `http://127.0.0.1:3000/${convertType}-data`;
    const dataJSON = `{"cardList":${cardListData.value},"unitsList":${unitsListData.value}}`;

    const fetchOptions = {
        method: 'post',
        body: dataJSON
    };

    const file = await fetch(url, fetchOptions);


    if (convertType === "pdf") {
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: `application/pdf` });
        window.open(URL.createObjectURL(blob));
    } else if (convertType === "anki") {
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: `application/apkg` });

        saveAs(blob, "phase-6-vocabulary.apkg");

    } else if (convertType === "csv") {
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: `text/csv` });

        console.log(arrayBuffer);

        saveAs(blob, "phase-6-vocabulary.csv");

    } else {
        return;
    }
}

export function getUnitNames() {
    let unitsNames = units.map(unit => {
        return removeNBSP(unit[1]);
    });
    return unitsNames;
}

function removeNBSP(string) {
    try {
        if (string.includes("\u00A0")) {
            string = string.replaceAll("\u00A0", '');
            return string;
        } else {
            return string;
        }
    } catch (error) {
        outputField.textContent = `Value provided to remove non-breaking spaces isn't a string`;
        console.error("Value provided to remove non-breaking spaces isn't a string:", error);
    }

}