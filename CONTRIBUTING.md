# Contributing

## Setup

First fork this project and install dependencies:

```bash
git clone <your-forked-repo>
yarn install
git checkout -b my-fix
```

If you are using an M1 Macbook, you might encounter an error while the `puppeteer` dependency installs the chromium browser. If this happens, try removing your `node_modules` folder and running:

```bash
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
yarn install
unset PUPPETEER_SKIP_CHROMIUM_DOWNLOAD
node node_modules/puppeteer/install.js
```

Once you're up and running, fix some code and:

```bash
git commit -m "fix: fixed this bug"
git push origin my-fix
```

Lastly, open a pull request on Github.

## Releasing

This repo uses [semantic versioning](https://semver.org/) with the help of [release-please](https://github.com/googleapis/release-please).
We use [release-please](https://github.com/googleapis/release-please) workflow for releases. The [workflow](./.github/workflows/release-please.yml) is responsible for:

- Creating release PRs
- Once release PRs are merged it:
  - creates a release [tag](https://github.com/netlify/netlify-plugin-lighthouse/releases)
  - publishes the new version to [npm](https://www.npmjs.com/package/@netlify/plugin-lighthouse)
  - creates an update PR in [plugins](https://github.com/netlify/plugins)

Things to be aware of:

- use [conventional commits](https://www.conventionalcommits.org/)
- Only `feat` and `fix` commits will be released. `chore` commits will not create a release PR
- To jump versions e.g `v2.0` to `v3.0` make sure to indicate that in your PR by having a `Release-As` in the commit message e.g `Release-As: 3.0.0`. See ["How do I change the version number?"](https://github.com/googleapis/release-please#how-do-i-change-the-version-number) docs in release-please.

#### Steps

1. Merge your feature or bug fix PR
2. Release please creates a release PR
3. Merge the release PR
4. Verify that the new version is available in npm
5. Go to plugins and merge the version update PR
