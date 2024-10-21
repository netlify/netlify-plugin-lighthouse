## [3.2.0](https://github.com/netlify/netlify-plugin-lighthouse/compare/v3.1.0...v3.2.0) (2022-08-01)


### Features

* feat: reduce summary sent to only id and score ([#448](https://github.com/netlify/netlify-plugin-lighthouse/issues/448)) ([969cc58](https://github.com/netlify/netlify-plugin-lighthouse/commit/969cc589c33f53925ea26d47ae31a7d3152c58c0))

## [6.0.1](https://github.com/netlify/netlify-plugin-lighthouse/compare/v6.0.0...v6.0.1) (2024-10-21)


### Bug Fixes

* skip is-crawlable audit when running onSuccess against DEPLOY_URL ([#621](https://github.com/netlify/netlify-plugin-lighthouse/issues/621)) ([4be7b46](https://github.com/netlify/netlify-plugin-lighthouse/commit/4be7b464f1d48bd818488d97f2d24b093ccf31c7))

## [6.0.0](https://github.com/netlify/netlify-plugin-lighthouse/compare/v5.0.0...v6.0.0) (2024-01-30)


### ⚠ BREAKING CHANGES

* mark compatible with Node v20 and up ([#612](https://github.com/netlify/netlify-plugin-lighthouse/issues/612))

### Features

* mark compatible with Node v20 and up ([#612](https://github.com/netlify/netlify-plugin-lighthouse/issues/612)) ([0681a72](https://github.com/netlify/netlify-plugin-lighthouse/commit/0681a7289f7e951d1c375027c7ee7a3ef9dae447))


### Bug Fixes

* remove typo ([#611](https://github.com/netlify/netlify-plugin-lighthouse/issues/611)) ([4f40958](https://github.com/netlify/netlify-plugin-lighthouse/commit/4f40958669851002aece0d004ef86a971ba99567))

## [5.0.0](https://github.com/netlify/netlify-plugin-lighthouse/compare/v4.1.1...v5.0.0) (2023-07-13)


### ⚠ BREAKING CHANGES

* Run plugin on live deploy URL by default  ([#588](https://github.com/netlify/netlify-plugin-lighthouse/issues/588))

### Features

* Run plugin on live deploy URL by default  ([#588](https://github.com/netlify/netlify-plugin-lighthouse/issues/588)) ([1116f78](https://github.com/netlify/netlify-plugin-lighthouse/commit/1116f782aefe3fac65f02724d39c0dd1a52da872))

## [4.1.1](https://github.com/netlify/netlify-plugin-lighthouse/compare/v4.1.0...v4.1.1) (2023-04-21)


### Bug Fixes

* Fix chrome-launcher error preventing reports being generated ([#573](https://github.com/netlify/netlify-plugin-lighthouse/issues/573)) ([ae6e28e](https://github.com/netlify/netlify-plugin-lighthouse/commit/ae6e28e9be9311328f7b4cb6a893db1b01ac7e37))

## [4.1.0](https://github.com/netlify/netlify-plugin-lighthouse/compare/v4.0.7...v4.1.0) (2023-04-13)


### Features

* Allow plugin to run onSuccess with toml setting or env var LIGHTHOUSE_RUN_ON_SUCCESS ([#570](https://github.com/netlify/netlify-plugin-lighthouse/issues/570)) ([7de67f4](https://github.com/netlify/netlify-plugin-lighthouse/commit/7de67f4418a7062401fbdf04daee521ab7a9c08a))

## [4.0.7](https://github.com/netlify/netlify-plugin-lighthouse/compare/v4.0.6...v4.0.7) (2023-01-25)


### Bug Fixes

* **deps:** Revert "fix(deps): Upgrade puppeteer using cache utils ([#540](https://github.com/netlify/netlify-plugin-lighthouse/issues/540))" ([#544](https://github.com/netlify/netlify-plugin-lighthouse/issues/544)) ([7ea7fb9](https://github.com/netlify/netlify-plugin-lighthouse/commit/7ea7fb96d06181b5f88598c57e7d523089ef2b7d))

## [4.0.6](https://github.com/netlify/netlify-plugin-lighthouse/compare/v4.0.5...v4.0.6) (2023-01-24)


### Bug Fixes

* **deps:** Upgrade puppeteer using cache utils ([#540](https://github.com/netlify/netlify-plugin-lighthouse/issues/540)) ([f831eb1](https://github.com/netlify/netlify-plugin-lighthouse/commit/f831eb1ead7e0705e432ea5d7c6b1168a5db83c6))

### Miscellaneous Chores

* **chore:** Internal refactor to use ES modules ([#533](https://github.com/netlify/netlify-plugin-lighthouse/pull/533)) ([bbb55c9](https://github.com/netlify/netlify-plugin-lighthouse/commit/bbb55c9decbe3923add6ea6008d2be3ba03fd6f2))

## [4.0.5](https://github.com/netlify/netlify-plugin-lighthouse/compare/v4.0.4...v4.0.5) (2023-01-16)


### Bug Fixes

* **deps:** Revert "fix(deps) upgrade puppeteer to v 19.5.2 ([#532](https://github.com/netlify/netlify-plugin-lighthouse/issues/532))" ([#536](https://github.com/netlify/netlify-plugin-lighthouse/issues/536)) ([a319044](https://github.com/netlify/netlify-plugin-lighthouse/commit/a319044517c49d0f60d4f330ccba2756643bb929))

## [4.0.4](https://github.com/netlify/netlify-plugin-lighthouse/compare/v4.0.3...v4.0.4) (2023-01-16)

### Bug Fixes

* **deps:** update dependency puppeteer to v19.5.2 ([#532](https://github.com/netlify/netlify-plugin-lighthouse/pull/532)) ([fa216b2](https://github.com/netlify/netlify-plugin-lighthouse/commit/fa216b249cbf4a7c7128c8fa323639a73a1246b2))
### Miscellaneous Chores

* **deps:** update dependency prettier to v2.8.2 ([#530](https://github.com/netlify/netlify-plugin-lighthouse/issues/530)) ([2adadfe](https://github.com/netlify/netlify-plugin-lighthouse/commit/2adadfed5476c3bc73156894c1200caa383ed036))

## [4.0.3](https://github.com/netlify/netlify-plugin-lighthouse/compare/v4.0.2...v4.0.3) (2022-11-17)


### Bug Fixes

* **deps:** update dependency lighthouse to v9.6.8 ([#512](https://github.com/netlify/netlify-plugin-lighthouse/issues/512)) ([1edb983](https://github.com/netlify/netlify-plugin-lighthouse/commit/1edb9832df2ee413e6eb97a06c45cce4a985c5a2))

## [4.0.2](https://github.com/netlify/netlify-plugin-lighthouse/compare/v4.0.1...v4.0.2) (2022-10-27)


### Bug Fixes

* Surface runtime errors in Deploy Log and Deploy Summary ([#505](https://github.com/netlify/netlify-plugin-lighthouse/issues/505)) ([77ccef3](https://github.com/netlify/netlify-plugin-lighthouse/commit/77ccef381d1311a8f42cd881b3b28c1aee762cdf))

## [4.0.1](https://github.com/netlify/netlify-plugin-lighthouse/compare/v4.0.0...v4.0.1) (2022-10-10)


### Bug Fixes

* **deps:** update dependency express to v4.18.2 ([#489](https://github.com/netlify/netlify-plugin-lighthouse/issues/489)) ([5afd383](https://github.com/netlify/netlify-plugin-lighthouse/commit/5afd383e7fa2f98992f8cbb53f50a1abf02c26a6))
* **deps:** update dependency puppeteer to v18.2.1 ([#491](https://github.com/netlify/netlify-plugin-lighthouse/issues/491)) ([eeb38de](https://github.com/netlify/netlify-plugin-lighthouse/commit/eeb38ded8ad88735b9b0a9e44f78f51e049a269c))

## [4.0.0](https://github.com/netlify/netlify-plugin-lighthouse/compare/v3.7.1...v4.0.0) (2022-10-07)


### ⚠ BREAKING CHANGES

* The `path` audit input option no longer affects the served directory for an audit. Use `serveDir` instead. Use `path` to specify the sub directory or `html` file within the served directory that should be audited.

### Features

* Allow running lighthouse on other pages available in publish folder ([#487](https://github.com/netlify/netlify-plugin-lighthouse/issues/487)) ([ea0856b](https://github.com/netlify/netlify-plugin-lighthouse/commit/ea0856b0980576942a0862b69d5b140a9b8025b3))


### Bug Fixes

* **deps:** update dependency dotenv to v16.0.3 ([#480](https://github.com/netlify/netlify-plugin-lighthouse/issues/480)) ([c204252](https://github.com/netlify/netlify-plugin-lighthouse/commit/c204252a18f63181381b6b0f7c5e5b34b5c9560e))

## [3.7.1](https://github.com/netlify/netlify-plugin-lighthouse/compare/v3.7.0...v3.7.1) (2022-10-04)


### Bug Fixes

* Reduce scope of 'installable' test ([#483](https://github.com/netlify/netlify-plugin-lighthouse/issues/483)) ([d88fd09](https://github.com/netlify/netlify-plugin-lighthouse/commit/d88fd09fe2135d935e7e9b4e5d39e04bfb207991))

## [3.7.0](https://github.com/netlify/netlify-plugin-lighthouse/compare/v3.6.0...v3.7.0) (2022-10-03)


### Features

* send reports on threshold failure ([#479](https://github.com/netlify/netlify-plugin-lighthouse/issues/479)) ([2001e7e](https://github.com/netlify/netlify-plugin-lighthouse/commit/2001e7e1ac15a2c875cb78fdb66ee8b44b3af4ab))

## [3.6.0](https://github.com/netlify/netlify-plugin-lighthouse/compare/v3.5.0...v3.6.0) (2022-09-30)


### Features

* adds reporting around installable status and config settings ([#476](https://github.com/netlify/netlify-plugin-lighthouse/issues/476)) ([37ddec7](https://github.com/netlify/netlify-plugin-lighthouse/commit/37ddec7614497022a180f0c3c2c45643ac841754))

## [3.5.0](https://github.com/netlify/netlify-plugin-lighthouse/compare/v3.4.1...v3.5.0) (2022-09-29)


### Features

* Add initial support for Lighthouse settings ([#474](https://github.com/netlify/netlify-plugin-lighthouse/issues/474)) ([587f9d6](https://github.com/netlify/netlify-plugin-lighthouse/commit/587f9d6276def4017b9d430b596cd407911be3e5))


### Bug Fixes

* adds score rounding to avoid floating point errors ([#473](https://github.com/netlify/netlify-plugin-lighthouse/issues/473)) ([8b2f4cf](https://github.com/netlify/netlify-plugin-lighthouse/commit/8b2f4cfdf3d0197b731acd5dd7e86c3ed8ac9ff2))
* **deps:** update dependency dotenv to v16.0.2 ([#462](https://github.com/netlify/netlify-plugin-lighthouse/issues/462)) ([d76b6a6](https://github.com/netlify/netlify-plugin-lighthouse/commit/d76b6a611948778b2c5b158d51e5bd1217ee951d))
* **deps:** update dependency lighthouse to v9.6.7 ([#463](https://github.com/netlify/netlify-plugin-lighthouse/issues/463)) ([43dfe6d](https://github.com/netlify/netlify-plugin-lighthouse/commit/43dfe6db2d05316183ca3e00a71b136e1ca6da2f))
* **deps:** update dependency puppeteer to v18 ([#472](https://github.com/netlify/netlify-plugin-lighthouse/issues/472)) ([bf1c432](https://github.com/netlify/netlify-plugin-lighthouse/commit/bf1c432db1f4269ca0f2bed828a2cbf8c3256127))

## [3.4.1](https://github.com/netlify/netlify-plugin-lighthouse/compare/v3.4.0...v3.4.1) (2022-09-21)


### Bug Fixes

* run replacements function before HTML minification ([#469](https://github.com/netlify/netlify-plugin-lighthouse/issues/469)) ([1e74d86](https://github.com/netlify/netlify-plugin-lighthouse/commit/1e74d86bc0d18a084ea6802e3e4b92b427386b72))

## [3.4.0](https://github.com/netlify/netlify-plugin-lighthouse/compare/v3.3.0...v3.4.0) (2022-09-21)


### Features

* Add support for theme matching and scroll reporting via `postMessage` ([#461](https://github.com/netlify/netlify-plugin-lighthouse/issues/461)) ([42822bc](https://github.com/netlify/netlify-plugin-lighthouse/commit/42822bca390d90f2573fc98ff9c4c33adf2c697d))

## [3.3.0](https://github.com/netlify/netlify-plugin-lighthouse/compare/v3.2.1...v3.3.0) (2022-08-26)


### Features

* inject theme-querying snippets to each report ([#455](https://github.com/netlify/netlify-plugin-lighthouse/issues/455)) ([646a06d](https://github.com/netlify/netlify-plugin-lighthouse/commit/646a06d2098377421fa667f8be69cbf85f73684b))


### Bug Fixes

* **deps:** update dependency lighthouse to v9.6.5 ([#447](https://github.com/netlify/netlify-plugin-lighthouse/issues/447)) ([72fe792](https://github.com/netlify/netlify-plugin-lighthouse/commit/72fe792abb8e84c4d2b9521a3a544203148b09b6))
* **deps:** update dependency lighthouse to v9.6.6 ([#456](https://github.com/netlify/netlify-plugin-lighthouse/issues/456)) ([194b212](https://github.com/netlify/netlify-plugin-lighthouse/commit/194b212db2cb138a6a685bc558527e0abfb60fa6))
* **deps:** update dependency puppeteer to v16 ([#451](https://github.com/netlify/netlify-plugin-lighthouse/issues/451)) ([a0b315e](https://github.com/netlify/netlify-plugin-lighthouse/commit/a0b315e29af70eae5d367d2326d05975f675a769))
* **deps:** update dependency puppeteer to v16.2.0 ([#457](https://github.com/netlify/netlify-plugin-lighthouse/issues/457)) ([19c9ee8](https://github.com/netlify/netlify-plugin-lighthouse/commit/19c9ee8fa5e2b596791f7ed12d1f40b5a682085d))

## [3.2.1](https://github.com/netlify/netlify-plugin-lighthouse/compare/v3.2.0...v3.2.1) (2022-08-09)


### Bug Fixes

* account for missing summary ([#452](https://github.com/netlify/netlify-plugin-lighthouse/issues/452)) ([e926936](https://github.com/netlify/netlify-plugin-lighthouse/commit/e9269364bbd59dc30f05f2a525aac845cdc8c89d))

## [3.1.0](https://github.com/netlify/netlify-plugin-lighthouse/compare/v3.0.1...v3.1.0) (2022-07-27)


### Features

* extract the full html report ([#440](https://github.com/netlify/netlify-plugin-lighthouse/issues/440)) ([0395dac](https://github.com/netlify/netlify-plugin-lighthouse/commit/0395dacf006d64a8cc8933c677e53bccc1653b43))


### Bug Fixes

* **deps:** update dependency puppeteer to v15.4.2 ([088882f](https://github.com/netlify/netlify-plugin-lighthouse/commit/088882fac2ac9c401e0a4c042403b411c683349f))
* **deps:** update dependency puppeteer to v15.5.0 ([#446](https://github.com/netlify/netlify-plugin-lighthouse/issues/446)) ([5e5ef31](https://github.com/netlify/netlify-plugin-lighthouse/commit/5e5ef3170593e80d4c10be703d1f17cd2a3d8b8b))

## [3.0.1](https://github.com/netlify/netlify-plugin-lighthouse/compare/v3.0.0...v3.0.1) (2022-07-12)


### Bug Fixes

* **deps:** update dependency dotenv to v16 ([#376](https://github.com/netlify/netlify-plugin-lighthouse/issues/376)) ([aff5309](https://github.com/netlify/netlify-plugin-lighthouse/commit/aff5309fd410a7abfd6a6409bba32a110e7964c0))
* **deps:** update dependency puppeteer to v15 ([#436](https://github.com/netlify/netlify-plugin-lighthouse/issues/436)) ([15118d0](https://github.com/netlify/netlify-plugin-lighthouse/commit/15118d0a03e82900284132bcd0d1b55046301bd7))
* specify node version `>=14.15 <18` ([#439](https://github.com/netlify/netlify-plugin-lighthouse/issues/439)) ([30cb14d](https://github.com/netlify/netlify-plugin-lighthouse/commit/30cb14d1ad721f15e48cefbdf23dc81bf6aa2ca9))

## [3.0.0](https://github.com/netlify/netlify-plugin-lighthouse/compare/v2.1.3...v3.0.0) (2022-07-07)


### Features

* upgrade Lighthouse and node ([#422](https://github.com/netlify/netlify-plugin-lighthouse/issues/422)) ([be93d56](https://github.com/netlify/netlify-plugin-lighthouse/commit/be93d56b5172774f3096d4aa97069d9e75d36832))

### ⚠ BREAKING CHANGES

* **deps:** update dependency lighthouse to v9 (#422)
* drop support for Node 12. add support for node 16 (#422)

### Bug Fixes

* **deps:** update dependency express to v4.17.3 ([4458347](https://github.com/netlify/netlify-plugin-lighthouse/commit/4458347c583f22abef7703c7124124d6a5392a95))
* **deps:** update dependency puppeteer to v13.1.2 ([af97807](https://github.com/netlify/netlify-plugin-lighthouse/commit/af978071179a152df6e02298350f6b2680c482df))
* **deps:** update dependency puppeteer to v13.1.3 ([73459cb](https://github.com/netlify/netlify-plugin-lighthouse/commit/73459cb6adce80d80162310da180af155f39a4b3))
* **deps:** update dependency puppeteer to v13.3.1 ([5a61a72](https://github.com/netlify/netlify-plugin-lighthouse/commit/5a61a7280d63b0925f854e451b8b6eceb9ab8d8b))
* **deps:** update dependency puppeteer to v13.4.0 ([efab3d9](https://github.com/netlify/netlify-plugin-lighthouse/commit/efab3d9107d72ce01b6ad7d0328c0f40261dafa8))
* **deps:** update dependency puppeteer to v13.4.1 ([16cdb32](https://github.com/netlify/netlify-plugin-lighthouse/commit/16cdb32d77d36f8e25aebdb2147035e3d240106e))
* **deps:** update dependency puppeteer to v13.5.1 ([d900737](https://github.com/netlify/netlify-plugin-lighthouse/commit/d90073704a6b1937ac5244636479e1358fcc73ba))
* **deps:** update dependency puppeteer to v13.5.2 ([c0f07fb](https://github.com/netlify/netlify-plugin-lighthouse/commit/c0f07fbc38f7bf415e3befac026d2cb741d432cb))
* update changelog to reflect already released ([#430](https://github.com/netlify/netlify-plugin-lighthouse/issues/430)) ([5825fdb](https://github.com/netlify/netlify-plugin-lighthouse/commit/5825fdbb3584a494dbe08b30bbe83e91bcfdb33f))

### [2.1.3](https://github.com/netlify/netlify-plugin-lighthouse/compare/v2.1.2...v2.1.3) (2022-01-10)


### Bug Fixes

* **deps:** update dependency chalk to v4.1.2 ([b4c1baf](https://github.com/netlify/netlify-plugin-lighthouse/commit/b4c1baf3ddb298fc9053fc30b10ab95bd724b98d))
* **deps:** update dependency chrome-launcher to ^0.15.0 ([a04050c](https://github.com/netlify/netlify-plugin-lighthouse/commit/a04050c5ed853fa06ffb580f7e299149b312597d))
* **deps:** update dependency chrome-launcher to v0.14.2 ([96f4f87](https://github.com/netlify/netlify-plugin-lighthouse/commit/96f4f8723bd57a48cbc780890aa92749471c77a3))
* **deps:** update dependency express to v4.17.2 ([94a9737](https://github.com/netlify/netlify-plugin-lighthouse/commit/94a973766852ca44ad80eb62327bd7f90ead80a1))
* **deps:** update dependency lighthouse to v8.2.0 ([7820eee](https://github.com/netlify/netlify-plugin-lighthouse/commit/7820eee8e86c40b49ab28fd7ba8ac8f8135a8e9e))
* **deps:** update dependency lighthouse to v8.3.0 ([e18ba36](https://github.com/netlify/netlify-plugin-lighthouse/commit/e18ba3605541a3b8112e4bb66e947ace47f7fbad))
* **deps:** update dependency lighthouse to v8.5.1 ([12316ad](https://github.com/netlify/netlify-plugin-lighthouse/commit/12316ad61a88460e2cb1f134050de3d3a93f6322))
* **deps:** update dependency lighthouse to v8.6.0 ([56a440f](https://github.com/netlify/netlify-plugin-lighthouse/commit/56a440f934999c0dd66432e0d5224ff879795184))
* **deps:** update dependency puppeteer to v13 ([#342](https://github.com/netlify/netlify-plugin-lighthouse/issues/342)) ([1b44c45](https://github.com/netlify/netlify-plugin-lighthouse/commit/1b44c45cb7686689e29756f379640a5937bad215))

### [2.1.2](https://www.github.com/netlify/netlify-plugin-lighthouse/compare/v2.1.1...v2.1.2) (2021-06-13)


### Bug Fixes

* replace http-server by express to enable gzip compression ([#222](https://www.github.com/netlify/netlify-plugin-lighthouse/issues/222)) ([a1962e5](https://www.github.com/netlify/netlify-plugin-lighthouse/commit/a1962e57de1a13c98436646355f72019f4beca79))

### [2.1.1](https://www.github.com/netlify/netlify-plugin-lighthouse/compare/v2.1.0...v2.1.1) (2021-06-07)


### Bug Fixes

* **deps:** update dependency chalk to v4.1.1 ([a7ef976](https://www.github.com/netlify/netlify-plugin-lighthouse/commit/a7ef976d9a211be51cd6f02702b712d52127a18b))
* **deps:** update dependency chrome-launcher to ^0.14.0 ([ac5599a](https://www.github.com/netlify/netlify-plugin-lighthouse/commit/ac5599a10463ef04b76c7d1c530cf404deaa510a))
* **deps:** update dependency dotenv to v10 ([#206](https://www.github.com/netlify/netlify-plugin-lighthouse/issues/206)) ([5fe5ce8](https://www.github.com/netlify/netlify-plugin-lighthouse/commit/5fe5ce8a893c9f5224fbbe9b219d8e1217c2c38b))
* **deps:** update dependency dotenv to v9 ([#195](https://www.github.com/netlify/netlify-plugin-lighthouse/issues/195)) ([da1fdca](https://www.github.com/netlify/netlify-plugin-lighthouse/commit/da1fdca91778a4b00b008b9af465cd7260c413dd))
* **deps:** update dependency dotenv to v9.0.2 ([c10486b](https://www.github.com/netlify/netlify-plugin-lighthouse/commit/c10486bb5561181c23efeb6c96df1a24f0b08938))
* **deps:** update dependency lighthouse to v7.4.0 ([852f93a](https://www.github.com/netlify/netlify-plugin-lighthouse/commit/852f93a182cce99dd8d3386638c860901807ff4c))
* **deps:** update dependency lighthouse to v7.5.0 ([a620593](https://www.github.com/netlify/netlify-plugin-lighthouse/commit/a62059372805284660e9db143f8d81919c0a3239))
* **deps:** update dependency lighthouse to v8 ([#216](https://www.github.com/netlify/netlify-plugin-lighthouse/issues/216)) ([5481656](https://www.github.com/netlify/netlify-plugin-lighthouse/commit/5481656bd50e11068012a872926733564d4ac5ca))
* **deps:** update dependency puppeteer to v10 ([#217](https://www.github.com/netlify/netlify-plugin-lighthouse/issues/217)) ([0a163bb](https://www.github.com/netlify/netlify-plugin-lighthouse/commit/0a163bbd066f0702cfa72720a5a27be0808af44d))
* **deps:** update dependency puppeteer to v9 ([#185](https://www.github.com/netlify/netlify-plugin-lighthouse/issues/185)) ([272ed72](https://www.github.com/netlify/netlify-plugin-lighthouse/commit/272ed7267374059eb4c6e516f4f3050d00438390))

## [2.1.0](https://www.github.com/netlify/netlify-plugin-lighthouse/compare/v2.0.0...v2.1.0) (2021-04-21)


### Features

* allow publishing the generated html repo ([#180](https://www.github.com/netlify/netlify-plugin-lighthouse/issues/180)) ([53886d5](https://www.github.com/netlify/netlify-plugin-lighthouse/commit/53886d592ac017f44e7959954b7ab2bcbd517b10))

## [2.0.0](https://www.github.com/netlify/netlify-plugin-lighthouse/compare/v1.4.3...v2.0.0) (2021-03-03)


### ⚠ BREAKING CHANGES

* **deps:** update dependency lighthouse to v7 (#134)
* drop support for Node 10 (#165)

### Bug Fixes

* **deps:** update dependency lighthouse to v7 ([#134](https://www.github.com/netlify/netlify-plugin-lighthouse/issues/134)) ([9ee4580](https://www.github.com/netlify/netlify-plugin-lighthouse/commit/9ee4580368ec16a9f9895e9038d3301acbe582fe))


### Miscellaneous Chores

* drop support for Node 10 ([#165](https://www.github.com/netlify/netlify-plugin-lighthouse/issues/165)) ([f750f58](https://www.github.com/netlify/netlify-plugin-lighthouse/commit/f750f5895c5993b75520a0c83ef5e85277479287))

### [1.4.3](https://www.github.com/netlify/netlify-plugin-lighthouse/compare/v1.4.2...v1.4.3) (2021-03-01)


### Bug Fixes

* **deps:** update dependency puppeteer to v7 ([#153](https://www.github.com/netlify/netlify-plugin-lighthouse/issues/153)) ([9da372f](https://www.github.com/netlify/netlify-plugin-lighthouse/commit/9da372f9b0a69f111a0036c57210f1e3bf8297eb))
* **deps:** update dependency puppeteer to v8 ([#162](https://www.github.com/netlify/netlify-plugin-lighthouse/issues/162)) ([d5668d0](https://www.github.com/netlify/netlify-plugin-lighthouse/commit/d5668d08a8ed756846477a5d6fb00b31df31677d))
* **docs:** align readme with plugins installation flow ([fe5d80e](https://www.github.com/netlify/netlify-plugin-lighthouse/commit/fe5d80eb3ccaa1760ada523778be2d0c626e19cf))
* **docs:** update local dev instructions ([#151](https://www.github.com/netlify/netlify-plugin-lighthouse/issues/151)) ([3841d96](https://www.github.com/netlify/netlify-plugin-lighthouse/commit/3841d960f55e215392fbacd739f2fdc4708ec2ab))

## [1.4.2](https://github.com/netlify/netlify-plugin-lighthouse/compare/v1.4.1...v1.4.2) (2020-09-10)


### Bug Fixes

* report relevant error on invalid jsons ([#80](https://github.com/netlify/netlify-plugin-lighthouse/issues/80)) ([7417e91](https://github.com/netlify/netlify-plugin-lighthouse/commit/7417e9170ba9865fb63ea1a34878b21bd5245232))

## [1.4.1](https://github.com/netlify/netlify-plugin-lighthouse/compare/v1.4.0...v1.4.1) (2020-09-03)


### Bug Fixes

* use onPostBuild instead of onSuccess ([#75](https://github.com/netlify/netlify-plugin-lighthouse/issues/75)) ([e998d06](https://github.com/netlify/netlify-plugin-lighthouse/commit/e998d06c6e2e3041001a8fd70f4b1716c8d86c90))

# [1.4.0](https://github.com/netlify/netlify-plugin-lighthouse/compare/v1.3.2...v1.4.0) (2020-07-22)


### Bug Fixes

* **deps:** update dependency puppeteer to v5.2.1 ([#54](https://github.com/netlify/netlify-plugin-lighthouse/issues/54)) ([176049b](https://github.com/netlify/netlify-plugin-lighthouse/commit/176049ba7b45d10c82c3e9afb4fdd86204ac82a4))


### Features

* list relevant audits on category failure ([#56](https://github.com/netlify/netlify-plugin-lighthouse/issues/56)) ([6b9a854](https://github.com/netlify/netlify-plugin-lighthouse/commit/6b9a854189f489b65ebf63d384ca0d82bbe56ce5))

## [1.3.2](https://github.com/netlify/netlify-plugin-lighthouse/compare/v1.3.1...v1.3.2) (2020-07-13)


### Bug Fixes

* only set env.DEBUG_COLORS='true' for the plugin ([#51](https://github.com/netlify/netlify-plugin-lighthouse/issues/51)) ([b2ace7e](https://github.com/netlify/netlify-plugin-lighthouse/commit/b2ace7e15ce36084414d96dd0a7abb7a75948b54))

## [1.3.1](https://github.com/netlify/netlify-plugin-lighthouse/compare/v1.3.0...v1.3.1) (2020-07-13)


### Bug Fixes

* **lighthouse:** hide logs timestamp when running in tty ([#50](https://github.com/netlify/netlify-plugin-lighthouse/issues/50)) ([b2187ca](https://github.com/netlify/netlify-plugin-lighthouse/commit/b2187cac4413f993a8b27a47c49b0dfe48f9f044))

# [1.3.0](https://github.com/netlify/netlify-plugin-lighthouse/compare/v1.2.2...v1.3.0) (2020-07-12)


### Features

* support multiple audits urls and paths ([#45](https://github.com/netlify/netlify-plugin-lighthouse/issues/45)) ([74dd46d](https://github.com/netlify/netlify-plugin-lighthouse/commit/74dd46d5e36bb168e7b1bdb600d23a8deee93cdc))

## [1.2.2](https://github.com/netlify/netlify-plugin-lighthouse/compare/v1.2.1...v1.2.2) (2020-07-05)


### Bug Fixes

* **deps:** update dependency lighthouse to v6.1.0 ([#34](https://github.com/netlify/netlify-plugin-lighthouse/issues/34)) ([b12f94e](https://github.com/netlify/netlify-plugin-lighthouse/commit/b12f94ebea0f2a6bc430289f453e5351621fdf30))
* **deps:** update dependency puppeteer to v4.0.1 ([#35](https://github.com/netlify/netlify-plugin-lighthouse/issues/35)) ([191c086](https://github.com/netlify/netlify-plugin-lighthouse/commit/191c086dd9ef33d17ed81554fc3b3e33cb75e9d2))
* **deps:** update dependency puppeteer to v5 ([#39](https://github.com/netlify/netlify-plugin-lighthouse/issues/39)) ([a1dbd9a](https://github.com/netlify/netlify-plugin-lighthouse/commit/a1dbd9a497402e205bc788ff1c847820935a02e4))

## [1.2.1](https://github.com/netlify/netlify-plugin-lighthouse/compare/v1.2.0...v1.2.1) (2020-06-21)


### Bug Fixes

* **logger:** pass colors=true to debug module ([#30](https://github.com/netlify/netlify-plugin-lighthouse/issues/30)) ([d54f4ae](https://github.com/netlify/netlify-plugin-lighthouse/commit/d54f4ae2bed3aef12110ac627b56cadb6a6ff28d))

# [1.2.0](https://github.com/netlify/netlify-plugin-lighthouse/compare/v1.1.0...v1.2.0) (2020-06-21)


### Bug Fixes

* **deps:** update dependency puppeteer to v4 ([#27](https://github.com/netlify/netlify-plugin-lighthouse/issues/27)) ([86670f2](https://github.com/netlify/netlify-plugin-lighthouse/commit/86670f2eb11d101774f3b1feba727244138b347e))


### Features

* enable lighthouse logging ([#29](https://github.com/netlify/netlify-plugin-lighthouse/issues/29)) ([9225cdd](https://github.com/netlify/netlify-plugin-lighthouse/commit/9225cddcbc366ae18ded5b7e5f2d50d7a0ae5e09))

# [1.1.0](https://github.com/netlify/netlify-plugin-lighthouse/compare/v1.0.1...v1.1.0) (2020-06-11)


### Features

* add overview messaging ([#20](https://github.com/netlify/netlify-plugin-lighthouse/issues/20)) ([be94a37](https://github.com/netlify/netlify-plugin-lighthouse/commit/be94a37ea9460cd32582a5ce5e64af8ea8663eca))

## [1.0.1](https://github.com/netlify/netlify-plugin-lighthouse/compare/v1.0.0...v1.0.1) (2020-06-11)


### Bug Fixes

* report error to failBuild ([#19](https://github.com/netlify/netlify-plugin-lighthouse/issues/19)) ([334a282](https://github.com/netlify/netlify-plugin-lighthouse/commit/334a282244bcd1b733ff9004d0c738585dddf6df))
* **package.json:** add bugs and repository fields ([#16](https://github.com/netlify/netlify-plugin-lighthouse/issues/16)) ([03d957d](https://github.com/netlify/netlify-plugin-lighthouse/commit/03d957dcf4345103c79400a18801b7e9d7e7b019))

# 1.0.0 (2020-06-10)


### Bug Fixes

* stringify summary ([#13](https://github.com/netlify/netlify-plugin-lighthouse/issues/13)) ([cbe937a](https://github.com/netlify/netlify-plugin-lighthouse/commit/cbe937a7a77f92e915eca5c122a2cba7597d24ed))
