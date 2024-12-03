'use strict';

import general from './general.json' assert {type: 'json'};
import b64 from './b64.json' assert {type: 'json'};
import authentication_schemes from './authentication-schemes.json' assert {type: 'json'};

export default {
    general,
    b64,
    authentication_schemes
};

export {
    general,
    b64,
    authentication_schemes
};