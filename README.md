#  @BOHR/changelogger

CLI tool for creating, updating and maintaining CHANGELOG files.

`@BOHR/changelogger` makes it easy to keep your `version` of `package.json` up-to-date, generate CHANGELOG data, store it in a reusable `json` file, and finally automatically generate a CHANGELOG file (in `markdown`) coherent with each `version` of your project.

The structure of the data generated with `@BOHR/changelogger` adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) and the resulting project follows the specification of [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

This tool is still under development, `PR`s are welcome!

## Installation

The easiest way to use `@BOHR/changelogger` is to intall it globally:

    npm i -g @BOHR/changelogger

or

    yarn global add @BOHR/changelogger


## Usage

Open a terminal window on the location where the `package.json` file of your project is located.

Run: `bohr-cglg --[updateType]`, where `updateType` can be:

- `p` (e.g. `bohr-cglg --p`): for patch updates (-> 0.0.**X**).
- `f` (e.g. `bohr-cglg --f`): for minor updates (-> 0.**X**.0).
- `m` (e.g. `bohr-cglg --m`): for major updates (-> **X**.0.0).

*Passing the `updateType` argument is currently mandatory, failing to do so will throw a fatal error.*

The CLI will then ask you whether you want to:

- `Make a new changelog entry`
- `Build the CHANGELOG.md file`

The first option will guide you thorugh the process of adding all the updates info.
The second option will generate the `markdown` file right away in the current working project.

## License

MIT.