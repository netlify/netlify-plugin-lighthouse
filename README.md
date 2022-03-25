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

## Running Locally

Fork and clone this repo.

Create a `.env` file based on the [example](.env.example) and run

```bash
yarn install
yarn local
```
## Lighthouse Score Visualizations (Labs feature)

<img width="1400" alt="Deploy view with Lighthouse visualizations" src="https://user-images.githubusercontent.com/79875905/160019039-c3e529de-f389-42bc-a3d4-458c90d59e6a.png">

If you have the Lighthouse Build Plugin installed, you can now view the Lighthouse scores for your builds on your site's Deploy page by enabling the Lighthouse Visualizations feature under Labs. 

<img width="1400" alt="Labs UI" src="https://user-images.githubusercontent.com/79875905/160018999-0fde5619-15c9-4622-99a2-6ec64fc69826.png">

If you have multiple audits (directories, paths, etc) defined in your build, we will display a roll-up of the average Lighthouse scores for all the current build's audits plus the results for each individual audit.

<img width="1400" alt="Deploy details with multiple audit Lighthouse results" src="https://user-images.githubusercontent.com/79875905/160019057-d29dffab-49f3-4fbf-a1ac-1f314e0cd837.png">

Some items of note:
- The Lighthouse Build Plugin must be installed on your site(s) in order for these score visualizations to be displayed.
- To view Lighthouse scores in the Netlify UI, you must [enable the feature through your Netlify settings](https://www.netlify.com/blog/2021/03/31/test-drive-netlify-beta-features-with-netlify-labs/). 
- This Labs feature is currently only enabled at the user-level, so each Netlify team member must enable the feature before they can view the Lighthouse scores in the UI.

We have a lot planned for this feature and will be adding functionality regularly, but we'd also love to hear your thoughts. Please click the "Give feedback" link under the Lighthouse scores to tell us what you think.
