import { writeFile } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { readPackageJSON } from './read-package-json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJsonOutputPath = resolve(__dirname, '../package/package.json');

const packageJson = readPackageJSON();

// Keys that we want to remove, which are not usefull for the final package that the user consumes.
const keysToRemove = ['private', 'devDependencies', 'optionalDependencies', 'scripts', 'config'];
for (const key of keysToRemove) {
  delete packageJson[key];
}

writeFile(packageJsonOutputPath, JSON.stringify(packageJson, null, '\t') + '\n', error => {
  if (error) throw error;
});
