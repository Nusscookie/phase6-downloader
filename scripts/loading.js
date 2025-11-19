import { getData } from "./get.js";

const progressBar = document.querySelector('.progress-bar');
const progressBarOutside = document.querySelector('.progress-bar-outside');
const outputField = document.getElementById('output-field');

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
            outputField.textContent = error;
            setTimeout(() => { progressBarOutside.style.display = "none"; outputField.textContent = ""; }, (duration * 1000)*3);
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
            outputField.textContent = error;
            setTimeout(() => { progressBarOutside.style.display = "none"; outputField.textContent = ""; }, (duration * 1000)*3);
            return;
        }

        progressBar.style.animation = `finish-progress-animation 1s forwards`;
        setTimeout(() => { progressBarOutside.style.display = "none"; }, 1000);
    }
}