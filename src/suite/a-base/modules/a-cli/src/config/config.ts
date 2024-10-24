import { VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
  return {
    helper: {
      chalk: {
        options: { level: 2 },
      },
      boxen: {
        options: { padding: 1, margin: 1, align: 'center', borderColor: 'yellow', borderStyle: 'round' },
      },
      lerna: {
        registry: {
          locales: {
            'en-us': null,
            'zh-cn': 'https://registry.npmmirror.com',
          },
        },
      },
    },
    template: {
      render: {
        fileMapping: {
          gitignore: '.gitignore',
          _gitignore: '.gitignore',
          '_.gitignore': '.gitignore',
          '_package.json': 'package.json',
          '_.eslintrc': '.eslintrc',
          '_.eslintignore': '.eslintignore',
          '_.npmignore': '.npmignore',
          '_.eslintrc.js': '.eslintrc.js',
          '_jsconfig.json': 'jsconfig.json',
          '_tsconfig.json': 'tsconfig.json',
          '_tsconfig.base.json': 'tsconfig.base.json',
          '_tsconfig.build.json': 'tsconfig.build.json',
        },
        ignore: ['.DS_Store'],
      },
    },
  };
};
