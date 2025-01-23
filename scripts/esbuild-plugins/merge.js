/* eslint-disable @typescript-eslint/no-var-requires */
const { promises } = require('fs');
const OS = require('os');

const merge = (option = {}) => ({
  name: 'esbuild-plugin-merge-files',
  setup(build) {
    build.onEnd(async () => {
      const fileContents = [];
      for (const filePath of option.source) {
        const text = await promises.readFile(filePath, { encoding: 'utf-8' });
        fileContents.push(text);
      }

      const fileContent = fileContents.join(OS.EOL);
      await promises.writeFile(option.destination, fileContent, 'utf8');
    });
  },
});

module.exports = merge;
