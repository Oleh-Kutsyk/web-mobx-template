/* eslint-disable no-console */
const fs = require('fs');

// TODO: add support key word for change log.
// Or add https://www.conventionalcommits.org/en/v1.0.0/
// Setup example - https://adarshaacharya.com.np/blog/setup-husky-precommit-hooks
// VSCode - https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits

// const commitMessageKeyWords = [
//   // (http://keepachangelog.com)
//   'added:',
//   'changed:',
//   'deprecated:',
//   'removed:',
//   'fixed:',
//   'security:',
//   // (https://www.conventionalcommits.org)
//   'chore:',
//   'docs:',
//   'refactor:',
//   'style:',
//   'test:',
// ];

const filename = process.env.HUSKY_GIT_PARAMS || process.argv[2]; // file '.git/COMMIT_EDITMSG'

const lines = fs.readFileSync(filename, { encoding: 'utf-8' }).split('\n');

const subjectWords = lines[0].split(' ');
const firstSubjectWord = subjectWords.shift();

// Convert "123 some message" to "[TRAD-123] some message"
if (/^\d+/.test(firstSubjectWord)) {
  lines[0] = `[TRAD-${firstSubjectWord}] ${subjectWords.join(' ')}`;
}

// Convert "TRAD-123 some message" to "[TRAD-123] some message"
if (/^TRAD-\d+/.test(firstSubjectWord)) {
  lines[0] = `[${firstSubjectWord}] ${subjectWords.join(' ')}`;
}

if (!/^(\[TRAD-\d+\]|Merge )/.test(lines[0])) {
  // eslint-disable-next-line no-console
  console.error(
    '\x1b[31m %s\x1b[0m',
    '✖',
    'Your commit message should start with a Jira reference, e.g. [TRAD-123]'
  );

  process.exit(1);
}

fs.writeFileSync(filename, lines.join('\n'), {
  encoding: 'utf-8',
});
