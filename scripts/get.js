import { saveAs } from "file-saver";

const outputField = document.getElementById('output-field');
const cardListData = document.getElementById('cardListData');
const unitsListData = document.getElementById('unitsListData');

let units = [];

export async function getData(convertType) {

    const url = `https://phase6-downloader-api.onrender.com/${convertType}-data`;
    const dataJSON = `{"cardList":${cardListData.value},"unitsList":${unitsListData.value}}`;

    const fetchOptions = {
        method: 'post',
        body: dataJSON
    };

    let file = null;
    try {
        file = await fetch(url, fetchOptions);
    } catch (error) {
        console.error(error);
        throw error;
    }

    if (convertType === "pdf") {
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: `application/pdf` });
        saveAs(blob, "phase-6-vocabulary.pdf");
    } else if (convertType === "anki") {
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: `application/apkg` });

        saveAs(blob, "phase-6-vocabulary.apkg");

    } else if (convertType === "csv") {
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: `text/csv` });

        saveAs(blob, "phase-6-vocabulary.csv");

    } else {
        return;
    }
}