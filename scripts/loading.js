import { getData } from "./get.js";

const progressBar = document.querySelector('.progress-bar');
const progressBarOutside = document.querySelector('.progress-bar-outside');
const outputField = document.getElementById('output-field');
const outputBox = document.querySelector(".output-box");

export async function loading(type) {
    let duration = 0;

    progressBarOutside.style.display = "block";
    progressBar.style.animation = "none";

    if (type === "csv" || type === "anki") {
        duration = 1;
        progressBar.style.animation = `start-progress-animation ${duration}s forwards`;

        try {
            await getData(type);
        } catch (error) {
            outputBox.style.display = "block";
            outputField.textContent = error;
            setTimeout(clearFields, (duration * 1000) + 3000);
            return;
        }

        progressBar.style.animation = `finish-progress-animation 1s forwards`;
        setTimeout(() => { progressBarOutside.style.display = "none"; }, 1000);

    } else if (type === "pdf") {
        duration = 45;
        progressBar.style.animation = `start-progress-animation ${duration}s forwards`;

        try {
            await getData(type);
        } catch (error) {
            outputBox.style.display = "block";
            outputField.textContent = error;
            setTimeout(clearFields, (duration * 1000) + 3000);
            outputBox.style.display = "none";
            return;
        }

        progressBar.style.animation = `finish-progress-animation 1s forwards`;
        setTimeout(() => { progressBarOutside.style.display = "none"; }, 1000);
    }
}

function clearFields() {
    progressBarOutside.style.display = "none"; 
    outputField.textContent = ""; 
    outputBox.style.display = "none";
}