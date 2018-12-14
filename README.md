#  @BOHR/changelogger

CLI tool for creating, updating and maintaining CHANGELOG files. _Because everyone needs to changelog once in a while_.

`@BOHR/changelogger` makes it easy to keep your `version` of `package.json` up-to-date, generate CHANGELOG data, store it in a reusable `json` file, and finally automatically generate a CHANGELOG file (in `markdown`).

The structure of the log data generated with `@BOHR/changelogger` adheres to the [Semantic Versioning](https://semver.org/spec/v2.0.0.html) specifications and the resulting CHANGELOG file is based on the guidelines by [Keep a Changelog](https://keepachangelog.com/en/1.0.0/). Updated files are also automatically committed (you can opt-out) to `git`, following the [GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html) branching model (you can opt-out).

This tool is under development, `PR`s are welcome!

## Installation

The easiest way to use `@BOHR/changelogger` is to intall it globally:

    npm i -g @BOHR/changelogger

or

    yarn global add @BOHR/changelogger

`@BOHR/changelogger` handles some `git` operations via the command line. To perform such `git` operations, you also need to have installed the `git` CLI. To install it, please refer to [Getting Started - Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). Alternatively, you may skip all git-related operations with `--sg`.


## Usage

Open a terminal window where the `package.json` file of your project is located.

Run: `bohr-cglg`, the CLI will then ask you whether you want to:

- `Make a new changelog entry`
- `Build the CHANGELOG.md file`

### Making a new changelog entry

After selecting the option `Make a new changelog entry`, you will be guided through the process of creating a new version of your progect, and all related operations.

#### Versioning

`@BOHR/changelogger` will ask you what kind of update you are making, based on the [Semantic Versioning](https://semver.org/spec/v2.0.0.html) specifications:

- _patch_: for making backwards-compatible bug fixes;
- _minor_: for adding one or more functionalities in a backwards-compatible manner;
- _major_: for making incompatible API changes.

You can also skip this step by setting the `updateType` variable when running the command `bohr-cglg` (see #Options).

You will then be asked what kind of change you want to add to the logger:

- _added_: for new features;
- _changed_: for changes in existing functionality;
- _deprecated_: for soon-to-be removed features;
- _removed_: for now removed features;
- _fixed_: for any bug fixes;
- _security_: in case of vulnerabilities.

You will then be asked to enter the description of the new log item. Be sure to [write good git commit messages](https://juffalow.com/other/write-good-git-commit-message)!

`@BOHR/changelogger` will then ask you if you want to

- `Add another change`: takes you back to the change type selection to repeath the process for a new log entry;
- `Save changes and update the CHANGELOG`: updates the `version` in `package.json`, saves all new changes in `changelog.json` under the new version number with the current date (YYYY-MM-DD) and generates the CHANGELOG file in `markdown`.

#### Git and GitFlow support

`@BOHR/changelogger` makes it easy to commit all newly created or modified files, and follow the GitFlow branching model in the process.

Before starting the update process, `@BOHR/changelogger` will check if there are files to commit in the current `branch`. If so, it will ask you for a message, it will then `commit` and `push` them to the remote repository.

Unless you opt-out of GitFlow (see #Options), `@BOHR/changelogger` will also:

- merge on develop the current `feature` branch (if compliant with the structure `feature/[name-of-the-feature]`);
- delete the local and the remote `feature` branch;
- create a new release branch (`release/[version-number]`);
- `commit` and `push` all changes.

#### Options

| Arg | Type | Description | Default |
|--------|------|-------------|---------|
| `p` | `[string]` | sets `updateType` to `patch` | `undefined` |
| `f` | `[string]` | sets `updateType` to `minor` | `undefined` |
| `m` | `[string]` | sets `updateType` to `major` | `undefined` |
| `sg` | `[boolean]` | skips all git operations | `false` |
| `sf` | `[boolean]` | skips all GitFlow operations | `false` |

Usage esample:

    bohr-cglg --p

*If the `updateType` argument is omitted, the CLI will ask to pick it.*

### Building the CHANGELOG.md file

You can manually rebuild the CHANGELOG file by selecting the second option after running `bohr-cglg`. 

`@BOHR/changelogger` will generate the `markdown` file right away in the current working project based on the contents of `changelog.json`.

## License

MIT.