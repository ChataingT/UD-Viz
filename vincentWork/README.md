# UDV : Urban Data Viewer

UDV is a JavaScript client based on [iTowns](https://github.com/itowns/itowns) allowing to visualize, analyse and interact with urban data.
You can find install notes [here](https://github.com/MEPP-team/UDV/blob/master/install.md).

Server-side tools can be found [here](https://github.com/MEPP-team/UDV-server).

## Demo
Online demos (alas only visible on the [Lyon1](https://sciences.univ-lyon1.fr/)/[INSA-Lyon](https://www.insa-lyon.fr/en/) campus):
 - [UDV](http://rict.liris.cnrs.fr/UDVDemo-2/UDV/UDV-Core/)
 - [Vilo3D](http://rict.liris.cnrs.fr/Vilo3D/UDV/Vilo3D/)

## Current features (regrouped by Modules) :

### Camera Controller

* **Left-click + drag** : User "grabs" the ground (cursor stays at the same spot on the ground) to translate camera on XY axis.
* **Right-click + drag** : camera rotation around the focus point (ground point at the center of the screen), clamped to avoid going under ground level.
* **Mousewheel** : smooth zoom toward the ground point under the mouse cursor, adjusted according to the ground distance (zoom is faster the further from the ground and cannot go through the ground).
* **Mousewheel click** (middle mouse button) : "Smart Zoom". Camera smoothly moves and rotates toward target ground point, at fixed orientation and adjusted distance.
* **S** : moves and orients camera to the start view
* **T** : moves and orients camera to top view (high altitude and pointing toward the center of the city)

The camera controller has been merged into itowns ([PR](https://github.com/iTowns/itowns/pull/454)) and is now PlanarControls. It features an animation of camera movement and orientation (called "travel" in the code) which we use to orient the camera with a document (document **oriented view**).

### ConsultDoc

* Display of documents in a 3D representation of the city, in superposition
* Filtered research (research by keyword, attribute and/or temporal research)
* All documents are loaded from an external data server and can be accessed using the **Document Browser** window.

More information about this module can be found [here](https://github.com/sophiaab/UDV/tree/new_contribute/UDV-Core/src/Modules/ConsultDoc)

### Temporal

* Basic slider + input field to select a date
* Ability to navigate between key dates (arrow buttons)
* When we enter a document "oriented view", the date is updated to match the document's date
* Key dates correspond to a temporal version of the 3d models for the "Îlot du Lac"

### Guided Tour

* A Guided Tour is a succession of Steps (document + text) that the user can follow
* Each step triggers the oriented view of its document, and opens this doc in the doc browser
* Ability to navigate between steps of a tour (previous, next) and to start/exit a tour
* Support for multiple guided tours, all loaded from a csv file (visite.csv)

### Contribute

* Possibility to create a new document
* Possibility to edit and delete existing documents

More information about this module can be found [here](https://github.com/sophiaab/UDV/tree/new_contribute/UDV-Core/src/Extensions/Contribute)

### Others

* Help, About : windows with text and links

### GUI

* Multiple windows (document browser, guided tour, temporal, help, about)
* Each window can be open / closed by clicking on its button
* The display is weakly responsive : best used with 16/9 or 16/10 resolution, and width between 1400px and 1900px. Using browser zoom (ctrl + / ctrl -) can help adjusting static elements (text and button size).
