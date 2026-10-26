# Retirement and preservation notes

Status: retired; cleanup proposed for review before private archival.

The owner confirmed on 2026-10-26 that the old deployments and credentials are unused. This repository is retained as historical learning/reference material. It is not maintained or approved for production use.

## This cleanup

- Identified contact strings in first-party source/docs/output are replaced with reserved example data. Original project and contributor attribution is preserved.
- The original implementation, licenses and learning history are preserved except for the explicitly listed safety/privacy changes.

## Validation

- Changed JavaScript/JSX is parsed; changed JSON and source maps are checked for valid JSON.
- The proposed working tree is checked for recognized secrets, excluding preserved third-party dependency trees. This is a bounded check, not a guarantee of secret absence.
- Full legacy builds, dependency upgrades, live-service tests and WCAG conformance testing are outside this retirement cleanup.

## Before archive or any future reuse

- Merge only after reviewing this PR. Visibility and archive settings are separate actions and have not been changed here.
- Earlier commits, pull-request diffs, external clones and commit-author metadata are unchanged. Current-source cleanup does not remove historical disclosure.
- History rewriting requires a separate explicit decision; no force-push or history rewrite is part of this PR.
- Restore only in an isolated local environment with fresh private credentials, after a new security/dependency/accessibility review.
