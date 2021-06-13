## [1.4.2](https://github.com/netlify-labs/netlify-plugin-lighthouse/compare/v1.4.1...v1.4.2) (2020-09-10)


### Bug Fixes

* report relevant error on invalid jsons ([#80](https://github.com/netlify-labs/netlify-plugin-lighthouse/issues/80)) ([7417e91](https://github.com/netlify-labs/netlify-plugin-lighthouse/commit/7417e9170ba9865fb63ea1a34878b21bd5245232))

### [2.1.2](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/compare/v2.1.1...v2.1.2) (2021-06-13)


### Bug Fixes

* replace http-server by express to enable gzip compression ([#222](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/issues/222)) ([a1962e5](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/commit/a1962e57de1a13c98436646355f72019f4beca79))

### [2.1.1](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/compare/v2.1.0...v2.1.1) (2021-06-07)


### Bug Fixes

* **deps:** update dependency chalk to v4.1.1 ([a7ef976](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/commit/a7ef976d9a211be51cd6f02702b712d52127a18b))
* **deps:** update dependency chrome-launcher to ^0.14.0 ([ac5599a](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/commit/ac5599a10463ef04b76c7d1c530cf404deaa510a))
* **deps:** update dependency dotenv to v10 ([#206](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/issues/206)) ([5fe5ce8](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/commit/5fe5ce8a893c9f5224fbbe9b219d8e1217c2c38b))
* **deps:** update dependency dotenv to v9 ([#195](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/issues/195)) ([da1fdca](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/commit/da1fdca91778a4b00b008b9af465cd7260c413dd))
* **deps:** update dependency dotenv to v9.0.2 ([c10486b](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/commit/c10486bb5561181c23efeb6c96df1a24f0b08938))
* **deps:** update dependency lighthouse to v7.4.0 ([852f93a](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/commit/852f93a182cce99dd8d3386638c860901807ff4c))
* **deps:** update dependency lighthouse to v7.5.0 ([a620593](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/commit/a62059372805284660e9db143f8d81919c0a3239))
* **deps:** update dependency lighthouse to v8 ([#216](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/issues/216)) ([5481656](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/commit/5481656bd50e11068012a872926733564d4ac5ca))
* **deps:** update dependency puppeteer to v10 ([#217](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/issues/217)) ([0a163bb](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/commit/0a163bbd066f0702cfa72720a5a27be0808af44d))
* **deps:** update dependency puppeteer to v9 ([#185](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/issues/185)) ([272ed72](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/commit/272ed7267374059eb4c6e516f4f3050d00438390))

## [2.1.0](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/compare/v2.0.0...v2.1.0) (2021-04-21)


### Features

* allow publishing the generated html repo ([#180](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/issues/180)) ([53886d5](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/commit/53886d592ac017f44e7959954b7ab2bcbd517b10))

## [2.0.0](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/compare/v1.4.3...v2.0.0) (2021-03-03)


### ⚠ BREAKING CHANGES

* **deps:** update dependency lighthouse to v7 (#134)
* drop support for Node 10 (#165)

### Bug Fixes

* **deps:** update dependency lighthouse to v7 ([#134](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/issues/134)) ([9ee4580](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/commit/9ee4580368ec16a9f9895e9038d3301acbe582fe))


### Miscellaneous Chores

* drop support for Node 10 ([#165](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/issues/165)) ([f750f58](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/commit/f750f5895c5993b75520a0c83ef5e85277479287))

### [1.4.3](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/compare/v1.4.2...v1.4.3) (2021-03-01)


### Bug Fixes

* **deps:** update dependency puppeteer to v7 ([#153](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/issues/153)) ([9da372f](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/commit/9da372f9b0a69f111a0036c57210f1e3bf8297eb))
* **deps:** update dependency puppeteer to v8 ([#162](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/issues/162)) ([d5668d0](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/commit/d5668d08a8ed756846477a5d6fb00b31df31677d))
* **docs:** align readme with plugins installation flow ([fe5d80e](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/commit/fe5d80eb3ccaa1760ada523778be2d0c626e19cf))
* **docs:** update local dev instructions ([#151](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/issues/151)) ([3841d96](https://www.github.com/netlify-labs/netlify-plugin-lighthouse/commit/3841d960f55e215392fbacd739f2fdc4708ec2ab))

## [1.4.1](https://github.com/netlify-labs/netlify-plugin-lighthouse/compare/v1.4.0...v1.4.1) (2020-09-03)


### Bug Fixes

* use onPostBuild instead of onSuccess ([#75](https://github.com/netlify-labs/netlify-plugin-lighthouse/issues/75)) ([e998d06](https://github.com/netlify-labs/netlify-plugin-lighthouse/commit/e998d06c6e2e3041001a8fd70f4b1716c8d86c90))

# [1.4.0](https://github.com/netlify-labs/netlify-plugin-lighthouse/compare/v1.3.2...v1.4.0) (2020-07-22)


### Bug Fixes

* **deps:** update dependency puppeteer to v5.2.1 ([#54](https://github.com/netlify-labs/netlify-plugin-lighthouse/issues/54)) ([176049b](https://github.com/netlify-labs/netlify-plugin-lighthouse/commit/176049ba7b45d10c82c3e9afb4fdd86204ac82a4))


### Features

* list relevant audits on category failure ([#56](https://github.com/netlify-labs/netlify-plugin-lighthouse/issues/56)) ([6b9a854](https://github.com/netlify-labs/netlify-plugin-lighthouse/commit/6b9a854189f489b65ebf63d384ca0d82bbe56ce5))

## [1.3.2](https://github.com/netlify-labs/netlify-plugin-lighthouse/compare/v1.3.1...v1.3.2) (2020-07-13)


### Bug Fixes

* only set env.DEBUG_COLORS='true' for the plugin ([#51](https://github.com/netlify-labs/netlify-plugin-lighthouse/issues/51)) ([b2ace7e](https://github.com/netlify-labs/netlify-plugin-lighthouse/commit/b2ace7e15ce36084414d96dd0a7abb7a75948b54))

## [1.3.1](https://github.com/netlify-labs/netlify-plugin-lighthouse/compare/v1.3.0...v1.3.1) (2020-07-13)


### Bug Fixes

* **lighthouse:** hide logs timestamp when running in tty ([#50](https://github.com/netlify-labs/netlify-plugin-lighthouse/issues/50)) ([b2187ca](https://github.com/netlify-labs/netlify-plugin-lighthouse/commit/b2187cac4413f993a8b27a47c49b0dfe48f9f044))

# [1.3.0](https://github.com/netlify-labs/netlify-plugin-lighthouse/compare/v1.2.2...v1.3.0) (2020-07-12)


### Features

* support multiple audits urls and paths ([#45](https://github.com/netlify-labs/netlify-plugin-lighthouse/issues/45)) ([74dd46d](https://github.com/netlify-labs/netlify-plugin-lighthouse/commit/74dd46d5e36bb168e7b1bdb600d23a8deee93cdc))

## [1.2.2](https://github.com/netlify-labs/netlify-plugin-lighthouse/compare/v1.2.1...v1.2.2) (2020-07-05)


### Bug Fixes

* **deps:** update dependency lighthouse to v6.1.0 ([#34](https://github.com/netlify-labs/netlify-plugin-lighthouse/issues/34)) ([b12f94e](https://github.com/netlify-labs/netlify-plugin-lighthouse/commit/b12f94ebea0f2a6bc430289f453e5351621fdf30))
* **deps:** update dependency puppeteer to v4.0.1 ([#35](https://github.com/netlify-labs/netlify-plugin-lighthouse/issues/35)) ([191c086](https://github.com/netlify-labs/netlify-plugin-lighthouse/commit/191c086dd9ef33d17ed81554fc3b3e33cb75e9d2))
* **deps:** update dependency puppeteer to v5 ([#39](https://github.com/netlify-labs/netlify-plugin-lighthouse/issues/39)) ([a1dbd9a](https://github.com/netlify-labs/netlify-plugin-lighthouse/commit/a1dbd9a497402e205bc788ff1c847820935a02e4))

## [1.2.1](https://github.com/netlify-labs/netlify-plugin-lighthouse/compare/v1.2.0...v1.2.1) (2020-06-21)


### Bug Fixes

* **logger:** pass colors=true to debug module ([#30](https://github.com/netlify-labs/netlify-plugin-lighthouse/issues/30)) ([d54f4ae](https://github.com/netlify-labs/netlify-plugin-lighthouse/commit/d54f4ae2bed3aef12110ac627b56cadb6a6ff28d))

# [1.2.0](https://github.com/netlify-labs/netlify-plugin-lighthouse/compare/v1.1.0...v1.2.0) (2020-06-21)


### Bug Fixes

* **deps:** update dependency puppeteer to v4 ([#27](https://github.com/netlify-labs/netlify-plugin-lighthouse/issues/27)) ([86670f2](https://github.com/netlify-labs/netlify-plugin-lighthouse/commit/86670f2eb11d101774f3b1feba727244138b347e))


### Features

* enable lighthouse logging ([#29](https://github.com/netlify-labs/netlify-plugin-lighthouse/issues/29)) ([9225cdd](https://github.com/netlify-labs/netlify-plugin-lighthouse/commit/9225cddcbc366ae18ded5b7e5f2d50d7a0ae5e09))

# [1.1.0](https://github.com/netlify-labs/netlify-plugin-lighthouse/compare/v1.0.1...v1.1.0) (2020-06-11)


### Features

* add overview messaging ([#20](https://github.com/netlify-labs/netlify-plugin-lighthouse/issues/20)) ([be94a37](https://github.com/netlify-labs/netlify-plugin-lighthouse/commit/be94a37ea9460cd32582a5ce5e64af8ea8663eca))

## [1.0.1](https://github.com/netlify-labs/netlify-plugin-lighthouse/compare/v1.0.0...v1.0.1) (2020-06-11)


### Bug Fixes

* report error to failBuild ([#19](https://github.com/netlify-labs/netlify-plugin-lighthouse/issues/19)) ([334a282](https://github.com/netlify-labs/netlify-plugin-lighthouse/commit/334a282244bcd1b733ff9004d0c738585dddf6df))
* **package.json:** add bugs and repository fields ([#16](https://github.com/netlify-labs/netlify-plugin-lighthouse/issues/16)) ([03d957d](https://github.com/netlify-labs/netlify-plugin-lighthouse/commit/03d957dcf4345103c79400a18801b7e9d7e7b019))

# 1.0.0 (2020-06-10)


### Bug Fixes

* stringify summary ([#13](https://github.com/netlify-labs/netlify-plugin-lighthouse/issues/13)) ([cbe937a](https://github.com/netlify-labs/netlify-plugin-lighthouse/commit/cbe937a7a77f92e915eca5c122a2cba7597d24ed))
