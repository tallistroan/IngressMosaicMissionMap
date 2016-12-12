**Please note**: This readme could be a bit outdated at the moment, so the steps for setting up your own map might be a bit different. I'm currently rewriting the entire code and will update it here, as soon as I have a running version of it.

# Ingress Mosaic Mission Map
This project is a web map for visualizing the so called banner-/mosaic-missions within the game Ingress. 
A live version of this code containing mosaics in Munich, Germany can be found at http://ingress.tallistroan.de/muenchen

## How to create your own map
Feel free to fork this project to create a web map for your city/region.

Basically you need, of course, some MB of webspace somewhere to make your map available to other agents. No database is needed.

#### Preparations before including your first mosaic
For the background map, you need an API-Token from www.mapbox.com
Their free plan should be sufficient for a mission map with a normal number of views. 
Copy your API-Key into the options.js file.

Change also the parameters (bounds, maptype, min/maxZoom, setView) in the file index.html for initializing the map according to your needs.

You also need the exportMosaics.js to get the mosaic data. Because it is no IITC-plugin but instead a simple script you have to paste into the developer console 
of Google Chrome, knowledge in using the console can be beneficial.
Having basic knowledge in creating a website is also an advantage because almost every change has to be made directly in code files.

Before you can export your mosaic, it is necessary to delete the already cached missions.
Load your IITC, open the developer console, paste the script into the Console tab and press Enter to run it.
Close the small windows with the provided buttons. The tab with the IITC should reload when everything is done.
Hint: You can also delete them manually under Resources > Local Storage > plugins-missions-missioncache

#### Export the mosaic from the intel
When the preparations are done execute the following steps:
* Select all missions that belong to the mosaic in ascending order
* Customize the first five variables in the export script as described in the comments directly above them
* Run the customized script in the developer console
* Download all provided files and copy them to the according folders 'geojson'/'kml'
* Copy the text from the textbox to the file startpoints.geojson (pay attention to the correct geojson structure)
  **Attention:** When you clicked the button, the locally cached mission will be deleted, so make sure you copied and saved the exports before that, otherwise you need to select all single missions again.

#### Adjustments in index.html
Adjust the menu structure if necessary and add/delete the basis for mosaics with different numbers of missions.

#### Done

Now everything is done and you new mosaic should be visible at the map. If you wish to export another mosaic
skip the preparation tasks and start [directly with the export](#export-the-mosaic-from-the-intel).

In case of errors/mosaics not showing at the map, the error messages in the developer console can be of great help to locate the problem.