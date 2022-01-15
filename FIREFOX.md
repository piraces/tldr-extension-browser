# Generating the XPI file for the Firefox extension

This extension has a script in the `./scripts` folder named `generateFirefoxExtension.sh` which is executed in the publish pipeline in order to generate the final XPI to publish to the Firefox Add-ons store.

This script executes different `npm` script in order to build the extension for production mode, delete all unneeded files and generate the final `manifest.json`.


The following tools are used with the following purposes:
- `npm`: generate the final extension files and clean unneeded files.
- `jq`: replacements inside the `manifest.json` file to make it cross-browser supported.
- `find`: removal of unneeded files.
- `zip`: generate the final bundled extension in `.xpi` format.