module.exports = {
  // TODO: Check these plugins for eslint - read about their rules -
  // 'eslint-plugin-import': '^2.22.1',
  // 'eslint-plugin-jsx-a11y': '^6.4.1',
  // 'eslint-plugin-sonarjs': '^0.5.0',

  // Project settings
  env: {
    browser: true, // Browser project
  },

  // Specifies the ESLint parser
  // https://www.npmjs.com/package/@typescript-eslint/parser
  parser: '@typescript-eslint/parser',

  // Specifies the ESLint parser parser options
  parserOptions: {
    project: 'tsconfig.json', // Typescript Lang Config - https://www.typescriptlang.org/tsconfig
    tsconfigRootDir: '.',
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    // sourceType: 'module',
    // ecmaFeatures: { jsx: true }
  },

  settings: {
    react: {
      pragma: 'React', //  Tells eslint-plugin-react that is Pragma to use, default to 'React'
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    // Tells eslint-plugin-react which Components used as alternatives to <a> for linking, eg. <Link to={ url } />
    linkComponents: ['Hyperlink', { name: 'Link', linkAttribute: 'to' }],
    componentWrapperFunctions: [
      // The name of any function used to wrap components, e.g. Mobx `observer` function.
      // If this isn't set, components wrapped by these functions will be skipped.
      // 'observer', // `property`
      // 'styled', // `property`
      // {'property': 'styled'}, // `object` is optional
      // {'property': 'observer', 'object': 'Mobx'},
    ],
  },

  plugins: [
    '@typescript-eslint/eslint-plugin', // same as @typescript-eslint
    'eslint-plugin-react', // same as react
    'eslint-plugin-react-hooks', // same as hooks
    'eslint-plugin-unicorn', // same as unicorn
    'eslint-plugin-prettier', // same as prettier
  ],

  extends: [
    // Uses the recommended rules from eslint
    'eslint:recommended',

    // Uses the recommended rules from @eslint-plugin-react
    'plugin:react/recommended',

    // Uses the recommended rules from @eslint-plugin-react-hooks
    'plugin:react-hooks/recommended',

    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',

    // Uses to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'eslint-config-prettier', // same as prettier

    // Uses eslint-config-prettier to disable ESLint rules which can conflict with Prettier
    // from 'eslint-plugin-unicorn'
    // On prettier 8.0.0 - this plug have been merged into one! (prettier)
    // 'eslint-config-prettier/unicorn', // same as prettier/unicorn

    // Uses eslint-config-prettier to disable ESLint rules which can conflict with Prettier
    // from 'eslint-plugin-react'
    // On prettier 8.0.0 - this plug have been merged into one! (prettier)
    // 'eslint-config-prettier/react', // same as prettier/react

    // Uses eslint-config-prettier to disable ESLint rules  which can conflict with Prettier
    // from '@typescript-eslint/eslint-plugin'
    // On prettier 8.0.0 - this plug have been merged into one! (prettier)
    // 'eslint-config-prettier/@typescript-eslint', // as prettier/@typescript-eslint

    // Enables eslint-plugin-prettier and eslint-config-prettier.
    // This will display prettier errors as ESLint errors.
    // Make sure this is always the last configuration in the extends array.
    'plugin:prettier/recommended',
  ],

  ignorePatterns: [
    './node_modules/*',

    'coverage',

    'build',
    'build-config',
    'ci-scripts',

    '*.css',
    '*.json',
    '*.html',
    '*.md',
    '*.lock',
    '.eslintrc.js',
    '.prettierrc.js',
    'git-workflow-diagram.png',
  ],

  // ESLint rules - https://eslint.org/docs/rules/
  rules: {
    'react-hooks/rules-of-hooks': 'error', // For checking rules of hooks
    'react-hooks/exhaustive-deps': 'off',
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. '@typescript-eslint/explicit-function-return-type': 'off',n

    // Plugin - plugin:@typescript-eslint/recommended re-wright ===
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
    '@typescript-eslint/no-shadow': ['error'],
    // '@typescript-eslint/explicit-module-boundary-types': 'off', // for react component lifecycle methods

    'no-unused-vars': 'off', // note you must disable the base rule as it can report incorrect errors (should use '@typescript-eslint/no-unused-vars')
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],

    // Plugin - - plugin:@typescript-eslint/recommended add rules ===
    // TODO: check fix - for changing multiple rules in name-convention
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        custom: {
          regex: '^T[A-Z]',
          match: true,
        },
      },
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
        prefix: ['T'],
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
        custom: {
          regex: '^E[A-Z]',
          match: true,
        },
      },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
      },
    ],

    // Plugin - plugin:react/recommended re-wright ===
    'react/prop-types': 'off', // ignore prop-types in mixed JS/TypeScript
    'react/jsx-pascal-case': [
      'error',
      {
        // enforce PascalCase for userIdentities-defined JSX components
        allowAllCaps: false,
        ignore: [''],
      },
    ],
    'react/jsx-tag-spacing': [
      'error',
      {
        // validate whitespace in and around the JSX opening and closing brackets (fixable)
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'allow',
      },
    ],
    'react/jsx-wrap-multilines': [
      'error', // prevent missing parentheses around multilines JSX (fixable)
      {
        declaration: 'parens',
        assignment: 'parens',
        return: 'parens',
        arrow: 'parens',
        condition: 'ignore',
        logical: 'ignore',
        prop: 'ignore',
      },
    ],
    'react/jsx-equals-spacing': ['error', 'never'], // disallow or enforce spaces around equal signs in JSX attributes (fixable)
    'react/jsx-first-prop-new-line': ['error', 'multiline'], // ensure proper position of the first property in JSX (fixable)

    // Plugin - plugin:react add rules ===
    'react/button-has-type': 'error', // forbid 'button' element without an explicit 'type' attribute
    'react/no-array-index-key': 'warn', // prevent usage of Array index in keys

    // Plugin - plugin:unicorn add ===
    'unicorn/custom-error-definition': 'error', // enforce correct Error subclassing. (fixable)
    'unicorn/empty-brace-spaces': 'error', // enforce no spaces between braces. (fixable)
    'unicorn/error-message': 'error', // enforce passing a message value when creating a built-in error.
    // TODO: discuss do we need 'unicorn/expiring-todo-comments' && 'unicorn/filename-case' rules
    // 'unicorn/expiring-todo-comments': [ // add expiration conditions to TODO comments.
    //   'error',
    //   {
    //     'ignoreDatesOnPullRequests': true,
    //     'terms': ['TODO', 'FIXME'],
    //     'ignore': [
    //       '#\\d+',
    //       /issue-\d+/i
    //     ]
    //   }
    // ],
    // 'unicorn/filename-case': [ // enforce a case style for filenames
    //   'error',
    //   {
    //     'cases': {
    //       'camelCase': true
    //     }
    //   }
    // ],
    // 'unicorn/no-nested-ternary': 'warn', // disallow nested ternary expressions
    'unicorn/no-array-instanceof': 'error', // require Array.isArray() instead of instanceof Array (fixable)
    'unicorn/prefer-includes': 'error', // prefer .includes() over .indexOf() when checking for existence or non-existence (fixable)

    // ESLint-recommended re-wright ===
    // Best Practices
    // 'complexity': ['error', 6], // enforce a maximum cyclomatic complexity allowed in a program
    'dot-location': ['error', 'property'], // Enforce newline before and after dot (dot-location)
    'no-multi-spaces': [
      'error',
      {
        // disallow multiple spaces
        exceptions: {
          Property: true,
          VariableDeclarator: true,
          ImportDeclaration: true,
        },
      },
    ],
    'jsx-quotes': ['error', 'prefer-single'],

    // ESLint add rules ===
    // Possible Errors
    'no-unsafe-optional-chaining': 'warn', // disallow use of optional chaining in contexts where the undefined value is not allowed
    'require-atomic-updates': 'error', // disallow assignments that can lead to race conditions due to usage of await or yield
    // Best Practices
    'accessor-pairs': 'error', // require grouped accessor pairs in object literals and classes
    'array-callback-return': 'error', // enforce return statements in callbacks of array methods
    'block-scoped-var': 'error', // enforce the use of variables within the scope they are defined
    'class-methods-use-this': 'off', // enforce that class methods utilize this (can be warn)
    'consistent-return': 'warn', // require return statements to either always or never specify values
    'default-case': 'error', // require default cases in switch statements
    'default-case-last': 'error', // enforce default clauses in switch statements to be last
    'default-param-last': 'error', // enforce default parameters to be last
    'grouped-accessor-pairs': 'error', // require grouped accessor pairs in object literals and classes
    'guard-for-in': 'warn', // require for-in loops to include an if statement
    'max-classes-per-file': ['error', 3], // enforce a maximum number of classes per file
    'no-alert': 'error', // disallow the use of alert, confirm, and prompt
    'no-caller': 'error', // disallow the use of arguments.caller or arguments.callee
    'no-constructor-return': 'error', // disallow returning value from constructor
    'no-else-return': 'error', // disallow return before else
    'no-eq-null': 'error', // disallow Null Comparisons
    'no-eval': 'error', // disallow eval
    'no-implied-eval': 'error', // disallow Implied eval
    // off for react comp with arrow fn in prop
    'no-invalid-this': 'off', // disallow this keywords outside of classes or class-like objects
    'no-labels': 'error', // disallow Labeled Statements
    'no-lone-blocks': 'error', // disallow Unnecessary Nested Blocks
    'no-loop-func': 'warn', // disallow Functions in Loops
    'no-magic-numbers': [
      'warn',
      {
        ignore: [0, 1],
        ignoreArrayIndexes: true,
      },
    ],
    'no-new': 'error', // disallow new For Side Effects
    'no-new-func': 'error', // disallow Function Constructor
    'no-new-wrappers': 'error', // disallow Primitive Wrapper Instances
    'no-nonoctal-decimal-escape': 'error', // disallow \8 and \9 escape sequences in string literals
    'no-proto': 'error', // disallow Use of proto
    // Turn off 'no-param-reassign' for correct use createSlice from '@reduxjs/toolkit'
    'no-param-reassign': 'error', // disallow Reassignment of Function Parameters
    'no-script-url': 'error', // disallow Script URLs
    'no-self-compare': 'warn', // disallow Self Compare
    'no-sequences': 'warn', // disallow Use of the Comma Operator
    'no-useless-call': 'error', // disallow unnecessary .call and .apply
    'no-useless-concat': 'error', // disallow unnecessary concatenation of strings
    // 'no-void': 'error', // disallow use of the void operator - check with ts
    'require-await': 'error', // disallow async functions which have no await expression
    // Variables
    // Disable 'no-shadow' rule as it can report incorrect errors with TS
    'no-shadow': 'off', // disallow variable declarations from shadowing variables declared in the outer scope
    // 'no-undefined': 'warn', // disallow the use of undefined as an identifier
    // Stylistic Issues
    'no-duplicate-imports': 'error', // disallow duplicate module imports
    'no-var': 'error', // require let or const instead of var
    'object-shorthand': ['warn', 'always'], // require Object Literal Shorthand Syntax
    'prefer-const': 'error', // require const declarations for variables that are never reassigned after declared
    'prefer-template': 'error', // suggest using template literals instead of string concatenation
    'rest-spread-spacing': ['error', 'never'], // enforce spacing between rest and spread operators and their expressions
    'yield-star-spacing': ['error', 'after'], // enforce spacing around the * in yield* expressions
    'no-nested-ternary': 'off', // turn off because use - 'unicorn/no-nested-ternary'
    // Prettier integration
    'prettier/prettier': [
      'warn',
      {},
      {
        usePrettierrc: true,
      },
    ],
    // Next rules of eslint prettier/prettier can conflict with prettier
    // Don't use it - keep it for prettier
    // quotes: [
    //   // enforce the consistent use of either backticks, double, or single quotes
    //   'error',
    //   'single',
    //   { avoidEscape: true, allowTemplateLiterals: false },
    // ],
    // 'max-len': [
    //   // enforce a maximum line length
    //   'error',
    //   {
    //     code: 120,
    //     tabWidth: 2,
    //     ignoreUrls: true,
    //     ignoreStrings: true,
    //     ignoreTemplateLiterals: true,
    //   },
    // ],
  },
};
