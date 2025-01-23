const { build } = require("esbuild");
const {
  author,
  bugs,
  description,
  homepage,
  icon,
  main,
  name,
  repository,
  version,
} = require("../package.json");
const copy = require("./esbuild-plugins/copy");
const merge = require("./esbuild-plugins/merge");
const path = require("path");
const textReplace = require("./esbuild-plugins/textReplace");

build({
  bundle: true,
  entryPoints: [main],
  external: ["underscore"],
  minify: false,
  outfile: `./dist/${name}.user.js`,
  platform: "browser",
  plugins: [
    copy({
      "./src/meta.js": [`./dist/${name}.meta.js`, `./dist/${name}-dev.meta.js`],
    }),
    textReplace({
      filePaths: [`./dist/${name}-dev.meta.js`],
      patterns: {
        __dev_javascript__: `file:${path.join(path.resolve(__dirname, ".."), "dist", `${name}-dev.user.js`)}`,
        __public_name__: "__public_name__ (dev)",
        "// @downloadURL.*\n": "",
        "// @supportURL.*\n": "",
        "// @updateURL.*\n": "",
      },
    }),
    textReplace({
      filePaths: [`./dist/${name}.meta.js`, `./dist/${name}-dev.meta.js`],
      patterns: {
        __author__: author,
        __description__: description,
        __dist_directory__: repository.distDirectory,
        __home_page__: homepage,
        __icon__: icon,
        __name__: name,
        __public_name__: "GrepoConqueror",
        __support_url__: bugs.url,
        __version__: `${version}`,
      },
    }),
    textReplace({
      filePaths: [`./dist/${name}.meta.js`],
      patterns: {
        "// @require.*__dev_javascript__\n": "",
      },
    }),
    merge({
      destination: `./dist/${name}-dev.user.js`,
      source: [`./dist/${name}.user.js`],
    }),
    merge({
      destination: `./dist/${name}.user.js`,
      source: [`./dist/${name}.meta.js`, `./dist/${name}.user.js`],
    }),
  ],
});
