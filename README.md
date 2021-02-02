# Netlify Plugin Lighthouse

A Netlify plugin to generate a lighthouse report for every deploy

## Usage

You can install this plugin in the Netlify UI from this [direct in-app installation link](https://app.netlify.com/plugins/@netlify/plugin-lighthouse/install) or from the [Plugins directory](https://app.netlify.com/plugins).

You can also install it manually:

From your project's base directory, use npm, yarn, or any other Node.js package manager to add the plugin to `devDependencies` in `package.json`.

```bash
npm install -D @netlify/plugin-lighthouse
```

Then add the plugin to your `netlify.toml` configuration file:

```toml
[[plugins]]
  package = "@netlify/plugin-lighthouse"

  # optional, fails build when a category is below a threshold
  [plugins.inputs.thresholds]
    performance = 0.9
    accessibility = 0.9
    best-practices = 0.9
    seo = 0.9
    pwa = 0.9
```

By default, the plugin will serve and audit the build directory of the site.
You can customize the behavior via the `audits` input:

```toml
[[plugins]]
  package = "@netlify/plugin-lighthouse"

  [plugins.inputs.thresholds]
    performance = 0.9

  # to audit a sub path of the build directory
  # route1 audit will use the top level thresholds
  [[plugins.inputs.audits]]
    path = "route1"

  # to audit a specific absolute url
  [[plugins.inputs.audits]]
    url = "https://www.example.com"

    # you can specify thresholds per audit
    [plugins.inputs.audits.thresholds]
      performance = 0.8
```

## Running Locally

Fork and clone this repo.

Create a `.env` file based on the [example](.env.example) and run

```bash
yarn install
yarn local
```
