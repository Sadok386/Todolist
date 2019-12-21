# MIASHS-M2-TP3-Projet

## Clone project

Run `git clone https://github.com/Sadok386/Todolist.git` to download the project.

## Get package using npm

Run `npm install` to download packages needed for the project
Be sur to run this in `Todolist` folder.

## Start server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## About Voice speech
It seems `webkitSpeechRecognition` is only working with Chrome for the moment.
Src: `https://github.com/mdn/web-speech-api/issues/3`
     `https://stackoverflow.com/questions/39784986/speechrecognition-is-not-working-in-firefox`

### Important 
Also, when you click on the microphone icon, there is a problem with synchronization, the voiceSpeech work but the form is not update so when it finish recording you'll juste have to move your mouse in any direction on the form. This will force the div to update and display the word you spelled.

## Functionnality
LocalStorage
Remove All
Speech recognition
Edit Title
