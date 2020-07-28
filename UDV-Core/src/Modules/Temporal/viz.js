import * as vis from 'vis-network';

export class NetworkManagerSingleton {
    constructor(start_mode="default",
                id_network="mynetwork",
                id_button_location="mybuttons",
                hidden_button="mode"){
    /**
     * Constructor for singleton
     */
        const instance = this.constructor.instance;
        if(instance){
            return instance;
        }
        else{
            this.network = null;
            this.data = {"nodes": null,
                         "edges": null,
                         "groups": null};
            this.list_option = null;
            this.has_changed = true;
            this.current_mode = start_mode;
            this.id_network = id_network;
            this.id_button_location = id_button_location;
            this.hidden_button = hidden_button;

            this.constructor.instance = this;
        }

    }

    destroy() {
    /**
     * Kill the simulation network  
     */
        if (this.network !== null) {
          this.network.destroy();
          this.network = null;
        }
    }

    init(){
        this.destroy();

        const options = this.list_option[0].visNetwork;
        const container = document.getElementById(this.id_network);
        this.network = new vis.Network(container, this.data, options);

        this.has_changed = false;
    }

    add_event(callback){
        this.network.on("selectNode", function (params) {
            let nodeId = this.getNodeAt(params.pointer.DOM);
            let node = this.body.nodes[nodeId];
            let time = node.options.name;
            callback(time);
            });

        this.network.on("selectEdge", function (params) {
            let edgeId = this.getEdgeAt(params.pointer.DOM);
            let connectedNodesId = this.getConnectedNodes(edgeId);
            let from_time = this.body.nodes[connectedNodesId[0]].options.name;
            let to_time = this.body.nodes[connectedNodesId[1]].options.name;
            let time = (from_time/1 + to_time/1) / 2 ;
            callback(time);
            });
    }
}
