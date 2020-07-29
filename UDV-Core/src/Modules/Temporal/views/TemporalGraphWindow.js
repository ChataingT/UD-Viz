import { Window } from "../../../Utils/GUI/js/Window";
import { NetworkManagerSingleton } from "../viz";
import './TemporalWindow.css';

// TODO: MANAGE DATES WITH MOMENT

/**
 * Constructor for TemporalWindow Class
 * Handles the GUI part enabling the user to specify the chosen "time" (moment or
 * date) of observation for displayal of the (3D) scene.
 * Note that it is not the Temporal View's responsability to
 * alter/modify/update the scene according to the user specified moment (but
 * only to trigger the possible hook-ups).
 * This View represents a timestamp with the Moment.js library.
 * @param refreshCallback : callback to be called when the time has changed.
 * @param options : optional parameters (min time, max time and current time)
 */
export class TemporalGraphWindow extends Window {
    constructor(refreshCallback, options = {}) {
        super('temporal', 'Temporal Graph Navigation', false);

        // Minimum and maximum times that can be displayed by this occurence
        this.minTime = options.minTime || 2009;
        this.maxTime = options.maxTime || 2015;

        // The currently selected timestamp
        this.currentTime = options.currentTime || 2009;

        // The timestep used to increment or decrement time with the slide buttons.
        // Note that timeStep is a "duration" as opposed to a timestamp.
        this.timeStep = options.timeStep || 1;

        this.refreshCallback = refreshCallback;

        // graph
        this.networkManagerSingleton = new NetworkManagerSingleton();
        this.networkManagerSingleton.option = options.temporalWindow.option;
    }

    get innerContentHtml() {
        return /*html*/`
            <div id="temporalWindow">
            <p id="mybuttons">
            <input type="hidden" id="mode" value="default" />
            </p>
            <div id="mynetwork"></div>
            </div>
        `;
    }

    windowCreated() {
        // Magical code to center an absolute positionned window
        this.window.style.setProperty('left', '0');
        this.window.style.setProperty('right', '0');
        this.window.style.setProperty('margin-left', 'auto');
        this.window.style.setProperty('margin-right', 'auto');
        // Put it at the bottom of the page
        this.window.style.setProperty('top', 'unset');
        this.window.style.setProperty('bottom', '0');
        this.window.style.setProperty('margin-bottom', 'auto');
        // Window size and center text
        this.window.style.setProperty('width', '700px');
        this.window.style.setProperty('height', '215px');
//        this.window.style.setProperty('height', '115px');
        this.window.style.setProperty('text-align', 'center');

        // Add graph
        this.networkManagerSingleton.init();
        this.networkManagerSingleton.add_event((param)=>{this.changeTime(param)});
    }

    // change the current date and sync the temporal version to this new date
    changeTime(time) {
        this.currentTime = time;

        // Eventually inform who it may concern (e.g. an associated iTowns layer)
        // that the currentTime has changed:
        this.refreshCallback(this.currentTime);
    }

}
