# 🧼 Commitlint Config

How to write good commit messages that are self-explanatory and pass the commitlint default validations.

A good typical commit message will have the following structure:

```
<type>(<scope?>): <subject!>
<BLANK LINE>
<body?>
<BLANK LINE>
<footer?>
```

## Type

The `type` is mandatory and determines the intent of the change. Here are possible values:

- `build`: changes affecting build systems or external dependencies
- `ci` updating configuration files for continuous integration and deployment services
- `chore` updating grunt tasks etc.; no production code change
- `docs` documentation-only changes
- `feat` a new feature
- `fix` a bug fix
- `perf` a code change that improves performance
- `refactor` a code change that neither fixes a bug nor adds a feature
- `style` changes that do not affect the meaning of the code (white-space, formatting, missing semicolons, etc.)
- `test` adding missing tests or correcting existing tests

## Scope

A scope is an optional value that provides additional contextual information about the change. For example, when the modules name, npm package, or particular routine was affected.

The scope, when present, must be contained within parenthesis.

## Subject

The subject is the headline of the commit. It should summarise in one sentence the nature of change.

For the subject, consider the following rules:

- do not capitalize the first letter
- no dot ( . ) at the end

## Body

The body is an optional space to provide additional information about the change, its motivation, and what was done. As it is the case of the subject, the body is written in the present tense.

## Footer

Lastly, the footer is an optional placeholder for referential information, e.g., alert for breaking changes or refer ticket numbers or references.

Breaking changes should start with the words “BREAKING CHANGE:” with space or two newlines.

## Examples

```
fix(bazel): construct a manifest file even when warnings are emitted
```

```
feat(payment): add a new endpoint to calculate taxes

This allows the payment module to calculate taxes for an order based on the order information. Currently only US sales tax and European VAT are supported

Refs #45621
```

---

[Back to README](../README.md)
