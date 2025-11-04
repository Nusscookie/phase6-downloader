import initSqlJs from 'sql.js';
import { Deck, Model, Package } from 'genanki-js';
import { convertData, getUnitNames } from "./convert.js";

let SQL = null;
let db = null;

export async function downloadAnki() {
    await initDb();
    await createPackage();
}

async function initDb() {
    SQL = await initSqlJs({
        locateFile: file => '/sql-wasm.wasm'
    });
    db = new SQL.Database();
}

async function createPackage() {
    // Ensure SQL is initialized
    if (!SQL) {
        await initDb();
    }

    let list = convertData();
    let unitNames = getUnitNames();
    let ankiPackage = new Package();
    ankiPackage.setSqlJs(db);

    let standardModel = new Model({
        name: "Basic",
        id: "1762166912130",
        flds: [
            { name: "Front" },
            { name: "Back" }
        ],
        req: [
            [0, "all", [0]],
        ],
        tmpls: [
            {
                name: "Card",
                qfmt: "{{Front}}",
                afmt: "{{Front}}\n\n<hr id=answer>\n\n{{Back}}",
            },
        ],
    });

    for (let name of unitNames) {
        let deckId = 1762166929594 + unitNames.indexOf(name);
        let firstName = "";
        let secondName = "";
        let deckName = "";
        let tag = name.replaceAll(' ', '_');;

        if (name.includes('|')) {
            firstName = name.split('|').shift().trim();
            secondName = name.split('|').pop().trim();
            deckName = `Deck::${firstName}::${secondName}`;
        } else if (name.includes('-')) {
            firstName = name.split('-').shift().trim();
            secondName = name.split('-').pop().trim();
            deckName = `Deck::${firstName}::${secondName}`;
        } else {
            deckName = `Deck::${name}`;
        }

        let deck = new Deck(deckId, deckName);
        let filteredCards = list.filter(card => card[2] === name);

        for (let card of filteredCards) {
            deck.addNote(standardModel.note([card[0], card[1]], [tag]));
        }

        ankiPackage.addDeck(deck);
    }

    ankiPackage.writeToFile('phase6-vocab.apkg');
}