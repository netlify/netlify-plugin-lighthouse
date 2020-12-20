# Contributing

## Setup

First fork this project

```bash
git clone <your-forked-repo>
yarn install
git checkout -b my-fix
```

Then fix some code and

```bash
git commit -m "added this feature"
git push origin my-fix
```

Lastly, open a pull request on Github.

## Releasing

1. Merge the release PR
2. Switch to the default branch `git checkout master`
3. Pull latest changes `git pull`
4. Publish the package `npm publish`
