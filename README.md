# Netlify Plugin Lighthouse

A Netlify plugin to run Lighthouse for every deploy.

## Installation options

You can install the plugin manually using your site's `netlify.toml` file or the Netlify UI. 

We recommend installing the Lighthouse plugin with a `netlify.toml` file for the most customization, including the option to:
    - [Run Lighthouse for different site paths, such as the contact page and site home page](#run-lighthouse-for-different-site-paths)
    - [Generate Lighthouse results in a different language](#generate-lighthouse-results-in-a-different-language)
    - [Run Lighthouse for a desktop device](#run-lighthouse-for-a-desktop-device)

### Install plugin through the Netlify UI

For UI-based installation, you can install this plugin from the [Integrations Hub](https://www.netlify.com/integrations/lighthouse/), the [Plugins directory](https://app.netlify.com/plugins) for your site, or through this [direct installation link](https://app.netlify.com/plugins/@netlify/plugin-lighthouse/install).

### Install plugin with a `netlify.toml` file

To install the plugin manually:

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

  # optional, deploy the lighthouse report to a path under your site
  [plugins.inputs]
    output_path = "reports/lighthouse.html"
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

    # you can specify output_path per audit, relative to the path
    output_path = "reports/route1.html"

  # to audit a specific absolute url
  [[plugins.inputs.audits]]
    url = "https://www.example.com"

    # you can specify thresholds per audit
    [plugins.inputs.audits.thresholds]
      performance = 0.8
```

Example `netlify.toml` file that audits the site root path and a contact page:

```
[[plugins]]
  package = "@netlify/plugin-lighthouse"

  # Generate a Lighthouse report for the site's root path
  [[plugins.inputs.audits]]
  path = ""

  # Generate a Lighthouse report for the contact site path
  [[plugins.inputs.audits]]
  path = "contact"

```

The lighthouse report results are automatically printed to the **Deploy log** in the Netlify UI. For example:

```
2:35:07 PM: ────────────────────────────────────────────────────────────────
2:35:07 PM:   2. onPostBuild command from @netlify/plugin-lighthouse
2:35:07 PM: ────────────────────────────────────────────────────────────────
2:35:07 PM: ​
2:35:07 PM: Serving and scanning site from directory dist

...

2:35:17 PM: {
2:35:17 PM:   results: [
2:35:17 PM:     { title: 'Performance', score: 0.91, id: 'performance' },
2:35:17 PM:     { title: 'Accessibility', score: 0.93, id: 'accessibility' },
2:35:17 PM:     { title: 'Best Practices', score: 0.93, id: 'best-practices' },
2:35:17 PM:     { title: 'SEO', score: 0.81, id: 'seo' },
2:35:17 PM:     { title: 'Progressive Web App', score: 0.4, id: 'pwa' }
2:35:17 PM:   ]
2:35:17 PM: }
```

We currently support the following settings, which are passed directly to Lighthouse:

```
[[plugins]]
  package = "@netlify/plugin-lighthouse"

  [plugins.inputs.settings]
    preset = "desktop" # Optionally run Lighthouse using a desktop configuration
    locale = "es" # Any Lighthouse-supported locale, used to generate reports in a different language
```

## Running Locally

Fork and clone this repo.

Create a `.env` file based on the [example](.env.example) and run

```bash
yarn install
yarn local
```

## Lighthouse Score Visualizations (Labs feature)

When you install the [Lighthouse Build Plugin](https://app.netlify.com/plugins/@netlify/plugin-lighthouse/install) on your site and enable this experimental feature, you can view the Lighthouse scores for each of your builds on your site's Deploy Details page with a much richer format.

<img width="1400" alt="Deploy view with Lighthouse visualizations" src="https://user-images.githubusercontent.com/79875905/160019039-c3e529de-f389-42bc-a3d4-458c90d59e6a.png">

If you have multiple audits (directories, paths, etc) defined in your build, we will display a roll-up of the average Lighthouse scores for all the current build's audits plus the results for each individual audit.

<img width="1400" alt="Deploy details with multiple audit Lighthouse results" src="https://user-images.githubusercontent.com/79875905/160019057-d29dffab-49f3-4fbf-a1ac-1f314e0cd837.png">

Some items of note:

- The [Lighthouse Build Plugin](https://app.netlify.com/plugins/@netlify/plugin-lighthouse/install) must be installed on your site(s) in order for these score visualizations to be displayed.
- This Labs feature is currently only enabled at the user-level, so it will need to be enabled for each individual team member that wishes to see the Lighthouse scores displayed.

Learn more in our official [Labs docs](https://docs.netlify.com/netlify-labs/experimental-features/lighthouse-visualization/).

We have a lot planned for this feature and will be adding functionality regularly, but we'd also love to hear your thoughts. Please [share your feedback](https://netlify.qualtrics.com/jfe/form/SV_1NTbTSpvEi0UzWe) about this experimental feature and tell us what you think.
