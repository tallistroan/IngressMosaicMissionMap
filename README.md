# Ingress Mosaic Mission Map
This project is a web map for visualizing the so called banner-/mosaic-missions within the game Ingress. 
A live version of this code containing mosaics in Munich, Germany can be found at http://ingress.tallistroan.de

**Hinweis:** Eine deutsche Anleitung ist weiter unten zu finden.

---

English Version:
## How to create your own map
Feel free to fork this project to create a web map for your city/region.

Basically you need, of course, some MB of webspace somewhere to make your map available to other agents. No database access is needed.

#### Preparations before including your first mosaic
For the background map you need an API-Token from www.mapbox.com
Their free plan should be sufficient for a mission map with a normal number of views. 
Copy your API-Key into the [index.html](index.html) file.

Change also the parameters (bounds, maptype, min/maxZoom, setView) in the file [index.html](index.html) for initializing the map according to your needs.

You also need the [exportMosaics script](exportScript/exportMosaics.js) to get the mosaic data.
Because it is no IITC-plugin but instead a simple script you have to paste into the developer console 
of Google Chrome, knowledge in using the console can be beneficial.
Having basic knowledge in creating a website is also an advantage because almost every change has to be made directly in code files.

Before you can export your mosaic, it is necessary to delete the already cached missions.
Load your IITC, open the developer console, paste the script into the Console tab and press Enter to run it.
Close the small windows with the provided buttons. The tab with the IITC should reload when everything is done.
Hint: You can also delete them manually under Resources > Local Storage > plugins-missions-missioncache

#### Export the mosaic from the intel
When the preparations are done execute the following steps:
* Select all missions that belong to the mosaic in ascending order (starting with number 1, 2, ...)
* Customize the first five variables in the script as described in the comments directly above them
* Run the customized script in the developer console
* Copy the data from the new window 'KML File' into a new file with the displayed filename (in general it is mosaicName.kml).
  Copy this .kml file to the folder [kml](/kml). This file can be downloaded by the user for further use in external programs.
* Copy the data from the new window 'GeoJSON Output' into a .js file.
  You can also copy all mosaics into one file called [missions.js](missions.js)
  If you use multiple files don't forget to link them in the [index.html](index.html) and [overview.html](overview.html)
* Copy an image (e.g. a screenshot from the scanner app) from the mosaic called 'mosaicName.jpg' into the [pics folder](pics). Use the same mosaicName you used in the export script.
* Close the windows by using the 'Delete Mission Cache and Reload Intel Map' button. The Intel tab should automatically reload then.
  **Attention:** When you clicked the button, the locally cached mission will be deleted, so make sure you copied and saved the exports before that, otherwise you need to select all single missions again.

#### Adjustments in [index.html](index.html)

For all upcoming changes you must use the same values for mosaicID, mosaicName and mosaicTitle which you already used in the export script.
Please find the exact spots where to put the following code fragments by looking at the provided example codes in the files.
           
* Include the new mosaic in the menu-list as follows:
``` html
<li><a href="index.html?id=mosaicID">mosaicTitle</a></li>
```
* Include an entry into the function showStartPortals() as follows:
``` javascript
markers.addLayer( L.geoJson(mosaicName_startMissions.features[0], {
                  pointToLayer: startMissionStyle,
                  onEachFeature: onEachPointOverview
                }));
```
* Within the switch-statement create a new case:
``` javascript
case "mosaicID":
  prepareMission(mosaicName_mission, mosaicName_startMissions);
  break;
```            

#### Adjustments in [overview.html](overview.html)

* Include the new mosaic in the menu-list as follows:
``` html
<li><a href="#id=mosaicID">mosaicTitle</a></li>
```
* Include the mosaic at the begin of the script part as follows:
``` javascript
addMissions(mosaicName_startMissions.features[0], mosaicName_mission, 'a');
```
#### Done

Now everything is done and you new mosaic should be visible at the map. If you wish to export another mosaic
just skip the described preparation tasks and start directly with the next steps.

In case of errors/mosaics not showing at the map, the error messages in the developer console can be of great help to locate the problem.


#### Special cases

When two or more missions start at the same portal you can avoid 
overlapping of the number labels by manually adjusting the properties 'missionNumber'
in the exported geojson-variable mosaicName_startMissions. 
In case you need to change the value for the first mission
you also need to adjust the cases in the functions *startMissionStyle* and *onEachStartPoint* in [index.html](index.html). Example:
``` javascript
function startMissionStyle(feature, latlng) {
  switch (feature.properties.missionNumber) {
    case "1, 6": // special pattern when mission 1 and 6 starting at the same portal
    case 1: // default value
    [...]
```
---
Deutsche Version
## Wie erstelle ich eine eigene Karte
Der Code darf gerne geforkt werden um eine eigene Version für deine Stadt/Region zu erstellen.

Grundsätzlich benötigst du natürlich irgendwo einen Webspace auf das du dein Projekt hochladen kannst.

#### Vorbereitung vor dem Export des ersten Mosaiks
Du benötigst einen API-Token von www.mapbox.com
Die kostenlose Variante ist i.d.R. ausreichend für eine Mosaikkarte.
Kopiere deinen API-Token in die Datei [index.html](index.html)

Passe außerdem die Parameter (bounds, maptype, min/maxZoom, setView) die für die Initialisierung der 
Karte benötigt werden in der Datei [index.html](index.html) entsprechend deiner Region an.

Außerdem brauchst du das [exportMosaics Skript](exportScript/exportMosaics.js) um die Mosaikdaten im passenden Format zu bekommen.
Das Skript ist kein IITC Plugin, sondern ein Skript welches direkt über die Entwickler-Konsole ausgeführt werden muss.
Daher sind Kenntnisse bzgl. der Konsole vorteilhaft. Außerdem sind auch grundlegende Kenntnisse in der Webentwicklung gut,
da die meisten Änderungen direkt im Code durchgeführt werden.

Vor dem Export ist es notwendig die früheren, lokal zwischengespeicherten Missionen zu löschen.
Führe dazu einfach das Skript einmal aus und schließe die Ergebnisfenster dann mit den entsprechenden Buttons.
Wenn der Intel-Tab im Anschluss automatisch neugeladen wurde, war das Löschen erfolgreich
Hinweis: Man kann den Cache auch per Hand unter Resources > Local Storage > plugins-missions-missioncache löschen.

#### Mosaik-Export
Sobald die Vorbereitungen abgeschlossen sind, führe folgenden Schritte durch:
* Wähle in der IITC alle Missionen des Mosaiks in aufsteigender Reihenfolge aus (beginnend mit 1, 2, ...)
* Passe die ersten fünf Variablen im Skript entsprechend der Erklärungen direkt darüber an. 
  Die Werte dieser Variablen werden außerdem im folgenden teilweise zum Einbinden in die Website verwendet. Stelle daher sicher, dass du für ein Mosaik immer die selben Werte verwendest.
* Führe das angepasste Skript in der Konsole aus
* Kopiere die Daten aus dem Fenster 'KML File' in eine neue Datei und speichere sie unter dem angezeigten Dateinamen ab (standardmößig ist das mosaicName.kml)
  Kopiere diese .kml Datei außerdem in den Ordner [kml](kml). Die .kml Datei ist nur dafür da, dass sich der Nutzer diese später runterladen kann und
  in anderen Programmen weiter verwenden kann.
* Kopiere die Daten aus dem Fenster 'GeoJSON Output' in eine .js Datei
  Standardmäßig werden alle Mosaikdaten in der Datei [missions.js](missions.js) gespeichert
  Natürlich kannst du auch andere Datei verwenden, vergiss dann aber nicht sie entsprechend in [index.html](index.html) und [overview.html](overview.html) einzubinden.
* Kopiere ein Bild des Mosaiks (z.b. ein Scanner Screenshot) mit dem Namen mosaicName.jpg in den Ordner [pics](pics).
* Schließe die Fenster mit dem 'Delete Mission Cache and Reload Intel Map' button. **Achtung:** Wenn du diesen Button benutzt, werden alle lokal gespeicherten Mosaikdaten gelöscht.
  Stelle daher sicher, dass du die Daten entsprechend kopiert und gesichert hast, sonst muss du alle einzelnen Missionen nochmals aufrufen bevor du sie exportieren kannst.
  
#### Anpassungen in [index.html](index.html)

Für alle folgenden Änderungen musst du die selben Werte mosaicID, mosaicName und mosaicTitle benutzen, die du im Skript eingetragen hattest
Für die genaue Stelle der Anpassungen schau bitte im vorhandenen Code nach, denn weil sich der Code kurzfristig ändern kann, macht eine Zeilenangabe wenig Sinn.
           
* Binde das Mosaik in der Menü-Übersicht wie folgt ein:
``` html
<li><a href="index.html?id=mosaicID">mosaicTitle</a></li>
```
* Erstelle folgenden neuen Eintrag in der Funktion showStartPortals():
``` javascript
markers.addLayer( L.geoJson(mosaicName_startMissions.features[0], {
                  pointToLayer: startMissionStyle,
                  onEachFeature: onEachPointOverview
                }));
```
* Erstelle einen neuen case innerhalb des switch-Blocks:
``` javascript
case "mosaicID":
  prepareMission(mosaicName_mission, mosaicName_startMissions);
  break;
```            

#### Anpassungen in [overview.html](overview.html)

* Binde das Mosaik in der Menü-Übersicht wie folgt ein:
``` html
<li><a href="#id=mosaicID">mosaicTitle</a></li>
```
* Binde des Mosaik zu Beginn des script-Blocks wie folgt ein:
``` javascript
addMissions(mosaicName_startMissions.features[0], mosaicName_mission, 'a');
```
#### Geschafft

Jetzt sollte das Mosaik auf der Karte sichtbar sein. Wenn du noch weitere Mosaike einbinden willst, führe einfach die Schritte ab dem Kapitel Mosaik-Export nochmals aus.

Sollten Fehler auftreten bzw. das Mosaik nicht sichtbar sein, kann die Auswertung der Fehlermeldungen in der Entwickler-Konsole sehr hilfreich sein.


#### Spezialfall
Wenn mehrere Missionen an einem Portal starten, kann durch die Anpassungen der properties missionNumber in der exportierten Variable mosaicName_startMissions
das Überlagern der Labels verhindert werden. Wenn z.B. Mission 3 und 8 am selben Portal starten, löschen sie den Eintrag für Mission 8 komplett und ändern die
missionNumber von Mission 3 von 3 auf "3, 8".

Wenn am Startportal der ersten Mission des Mosaiks noch weitere Missionen starten, 
müssen die Fälle in der Funktion startMissionStyle in der datei [index.html](index.html) angepasst werden. Beispiel:
``` javascript
function startMissionStyle(feature, latlng) {
  switch (feature.properties.missionNumber) {
    case "1, 6": // Spezial-Fall wenn Mission 1 und 6 am gleichen Portal starten
    case 1: // default Wert
    [...]
```
