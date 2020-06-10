# Netlify Plugin Lighthouse

A Netlify plugin to generate a lighthouse report for every deploy

## Usage

This plugin can be included via npm. Install it as a dependency with the following command:

```bash
npm install --save "@netlify/plugin-lighthouse"
```

To use a build plugin, create a `plugins` in your `netlify.toml` like so:

```toml
[[plugins]]
package = "@netlify/plugin-lighthouse"
  [plugins.inputs]
  # optional, defaults to scanning the current built version of the site
  audit_url = 'https://www.my-custom-site.com'
  # optional, fails build when a category is below a threshold
  [plugins.inputs.thresholds]
    performance = 0.9
    accessibility = 0.9
    best-practices = 0.9
    seo = 0.9
    pwa = 0.9
```

## Running Locally

Create a `.env` file based on the [example](.env.example) and run
```bash
npm run local
```
