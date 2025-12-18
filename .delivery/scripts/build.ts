'use strict';

import { execSync } from 'node:child_process';

const commands: string[] = [
    'npm run test:foundation',
    'npm run lint',
    'rimraf ./.delivery/.builds/dist',
    'rimraf ./.delivery/builds/.temp',
    'tsc -p ./.delivery/configuration/tsconfig.json',
    'npx esbuild src/index.ts --bundle --platform=node --target=node18 --format=cjs --outfile=.delivery/.builds/dist/code/index.cjs',
    'npm run package:de-alias',
    'npm run package:bundle:copy'
];

try {
    commands.forEach((cmd) => {
        console.log(`Running: ${cmd}`);
        execSync(cmd, { stdio: 'inherit' });
    });
} catch (_error) {
    const error = _error as Error;

    console.error(`Error running command: ${error.message}`);

    process.exit(1);
}
