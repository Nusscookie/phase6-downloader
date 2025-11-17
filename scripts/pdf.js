// import { generate } from "@pdfme/generator";
// import jsonTemplate from "../templates/template.json" assert { type: "json" };
// import { table, text } from "@pdfme/schemas";
// import { convertData } from "./convert.js";
// import { playProgressBar } from "./loading.js";

// const template = jsonTemplate;
// // const pdfButton = document.getElementById('pdfButton');

// // pdfButton.addEventListener('click', downloadPDF);

// export async function downloadPDF() {
//     convertData("pdf");
//     // let list = convertData();
//     // let jsonString = `{"pdfData":${JSON.stringify(list)}}`;

//     // // playProgressBar();

//     // // const inputs = [{
//     // //     "heading": "Phase6 Vocabulary",
//     // //     "table": list
//     // // }]

//     // // generate({ template, inputs, plugins: { Table: table, Text: text } }).then((pdf) => {
//     // //     const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
//     // //     // const link = document.createElement('a');
//     // //     // link.href = URL.createObjectURL(blob);
//     // //     // link.download = 'phase6-vocab.pdf';
//     // //     window.open(URL.createObjectURL(blob));
//     // //     // link.click();
//     // // });

//     // const url = "http://127.0.0.1:3000/pdf-data";

//     // const fetchOptions = {
//     //     method: 'post',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: jsonString
//     // };

//     // fetch(url, fetchOptions);
// }