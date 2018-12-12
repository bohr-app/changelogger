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

Because `@BOHR/changelogger` handles some `git` operations via the command line, you also need to have installed the `git` CLI. To install it, please refer to [Getting Started - Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).


## Usage

Open a terminal window where the `package.json` file of your project is located.

Run: `bohr-cglg`, the CLI will then ask you whether you want to:

- `Make a new changelog entry`
- `Build the CHANGELOG.md file`

The first option will guide you through the process of adding all the updates info.
The second option will generate the `markdown` file right away in the current working project.

#### Options

| Arg | Type | Description | Default |
|--------|------|-------------|---------|
| `p` | `string` | `optional` - sets `updateType` to `patch` (e.g. `bohr-cglg --p`) | `undefined` |
| `f` | `string` | `optional` - sets `updateType` to `minor` (e.g. `bohr-cglg --f`) | `undefined` |
| `m` | `string` | `optional` - sets `updateType` to `major` (e.g. `bohr-cglg --m`) | `undefined` |

*If the `updateType` argument is omitted, the CLI will ask to pick it.*

## License

MIT.