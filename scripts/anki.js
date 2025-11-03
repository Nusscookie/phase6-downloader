import initSqlJs from 'sql.js';
import { Deck, Model, Package } from 'genanki-js';
import { convertData, getUnitNames } from "./convert.js";

let SQL = null;
let db = null;

export async function downloadAnki() {
    await initDb();
    await createPackages();
}

async function initDb() {
    SQL = await initSqlJs({
        locateFile: file => '/sql-wasm.wasm'
    });
    db = new SQL.Database();
}

async function createPackages() {
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
            // [1, "all", [1]]
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
        let deck = new Deck(deckId, `Deck::${name}`);
        let filteredCards = list.filter(card => card[2] === name.replaceAll(' ', '_'));

        for (let card of filteredCards) {
            deck.addNote(standardModel.note([card[0], card[1]]));
        }

        ankiPackage.addDeck(deck);
    }

    ankiPackage.writeToFile('phase6-vocab.apkg');

    // let deck = new Deck(1762166929594, "Root::Test Deck")
    // let deck2 = new Deck(1772169229595, "Root::Test Deck 2")

    // deck.addNote(standardModel.note(['this is front', 'this is back']))
    // deck2.addNote(standardModel.note(['front of deck 2', 'back of deck 2']))

    // let ankiPackage = new Package()
    // ankiPackage.setSqlJs(db)  // Pass the Database instance, not the SQL library
    // ankiPackage.addDeck(deck)
    // ankiPackage.addDeck(deck2)

    // ankiPackage.writeToFile('output.apkg')
}