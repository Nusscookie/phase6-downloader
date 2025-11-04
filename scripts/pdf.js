import { generate } from "@pdfme/generator";
import jsonTemplate from "../templates/template.json" assert { type: "json" };
import { table, text } from "@pdfme/schemas";
import { convertData } from "./convert.js";
import { htmlToText } from "html-to-text";

const template = jsonTemplate;

export async function downloadPDF() {
    let list = getPlainList(convertData());

    const inputs = [{
        "heading": "Phase6 Vocabulary",
        "table": list
    }]

    generate({ template, inputs, plugins: { Table: table, Text: text } }).then((pdf) => {
        const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
        // const link = document.createElement('a');
        // link.href = URL.createObjectURL(blob);
        // link.download = 'phase6-vocab.pdf';
        window.open(URL.createObjectURL(blob));
        // link.click();
    });
}

function getPlainList(list) {
    for (let group of list) {
        if (group[0].includes("<") || group[1].includes("<")) {
            group[0] = htmlToText(group[0]);
            group[1] = htmlToText(group[1]);
        }
    }

    return list;
}