import { convertData } from "./convert.js";

export function downloadCSV() {
    let list = convertData();

    let csvContent = list.map(listItem => {
        return `${listItem[0]}\u0009${listItem[1]}\u0009${listItem[2].replaceAll(' ', '_')}\n`;
    });

    const blob = new Blob(csvContent, { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'phase6-vocab.csv';
    link.click();
}