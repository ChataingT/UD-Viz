import { $3DTemporalVersion } from '../3DTILES_temporal/3DTemporalVersion';


export class VersionsManager {
    constructor(versions) {
        this.versions = this.parseVersion(versions);
    }

    parseVersion(versions){

        const parsedVersion = [];

        let version;
        let item;
        for (let i = 0; i < versions.length; i++) {
            item = versions[i];
            version = new $3DTemporalVersion(item);
            parsedVersion.push(version);

        }
        return parsedVersion
    }
}

