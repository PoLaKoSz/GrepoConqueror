// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

const textReplace = ({ filePaths = [], patterns = {} }) => ({
  name: "esbuild-plugin-replace-content",
  setup(build) {
    build.onEnd(async () => {
      for (const filePath of filePaths) {
        let fileContent = await fs.promises.readFile(filePath, {
          encoding: "utf-8",
        });
        for (const key in patterns) {
          let result = patterns[key];
          if (typeof result === "object") {
            result = await fs.promises.readFile(result.path, {
              encoding: "utf-8",
            });
          }

          const regex = new RegExp(`${key}`, "g");
          fileContent = fileContent.replace(regex, result);
        }

        await fs.promises.writeFile(filePath, fileContent, "utf8");
      }
    });
  },
});

module.exports = textReplace;
