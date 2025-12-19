# Auto-approve safe commands

# This file configures which commands should be automatically approved
# without requiring user confirmation.

## Safe Commands (Auto-approved):
- git status
- git branch
- git log
- git diff
- npm install (dependencies only)
- amplify status
- amplify push (after manual confirmation of changes)

## Commands that ALWAYS require approval:
- git push
- npm publish
- amplify delete
- rm -rf
- Any command that modifies production data

## Note:
The AI assistant will use `SafeToAutoRun: true` for commands
that are read-only or have minimal side effects.
