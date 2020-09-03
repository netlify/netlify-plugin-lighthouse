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
