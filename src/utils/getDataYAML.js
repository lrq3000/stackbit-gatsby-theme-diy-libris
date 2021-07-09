import _ from 'lodash';
const fs = require('fs');
import safeLoadAll from 'js-yaml';

export default function getDataYAML(dataPath) {
    // Get data directly from yaml files instead of GraphQL through this.props
    dataPath = _.trim(dataPath, '/');
    // read data from yaml file
    let data = null;
    try {
        let fileContents = fs.readFileSync(dataPath, 'utf8');
        let data = safeLoadAll(fileContents);
    } catch (e) {
    }
    return data;
}
