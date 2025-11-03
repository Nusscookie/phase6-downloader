# phase6-downloader
This is being developed to give users an opportunity to download their vocubalary from phase6.
It is mainly designed for downloading existing libraries like books.

## How to use it
- Visit the [website](https://phase6-downloader.netlify.app) to use the latest stable version.
- Open your Phase6 web app, go to the library of the desired book you want to export, open developer tools (F12), 
navigate to the network tab, delete and refresh everything if necessary and watch out for requests called cardList 
and unitsFiltered. 
- Click on them and go to the response tab. Copy the responses and paste them into the text fields. 
- Click "Download CSV" or "Download APKG" to download the desired file type.
- Double-click the .apkg file to import into Anki.
- To import your .csv file into Anki, create a new deck, click on it and go to File and Import. Select your .csv file and use the comma as a seperator. Make sure HTML is allowed (some cards use it). Now select the prefered note type and assign the front, back and tags to the columns shown above.

The advantage of using .apkg files is that the programm automatically structures the library according
to the books inventory.

## Acknowledge
This tool is legal because you are only capable of downloading vocabulary if you have bought the book on phase6 
(which implies you have a phase6 account). It will never be able to also use the audio files since they are
belonging the phase6.

## License
[GNU GPLv3](LICENSE)<br>
Copyright (c) Nusscookie
