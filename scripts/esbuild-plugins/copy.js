// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

const copy = (filePaths = {}) => ({
  name: "esbuild-plugin-copy-file",
  setup(build) {
    build.onEnd(async () => {
      for (const key in filePaths) {
        for (const destination of filePaths[key]) {
          await fs.promises.copyFile(key, destination);
        }
      }
    });
  },
});

module.exports = copy;
