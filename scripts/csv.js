import { convertData } from "./convert.js";

export function downloadCSV() {
    let list = convertData();

    let csvContent = list.map(listItem => {
        return `${listItem[0]},${listItem[1]},${listItem[2]}\n`;
    });

    const blob = new Blob(csvContent, { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'phase6-vocab.csv';
    link.click();
}