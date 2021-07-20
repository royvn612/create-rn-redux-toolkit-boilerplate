const {generateTemplateFiles} = require('generate-template-files');

generateTemplateFiles([
  {
    option: 'Create Redux Module',
    defaultCase: '(camelCase)', // Fixed!
    entry: {
      folderPath: './tools/templates/modules/',
    },
    stringReplacers: ['__module__'],
    output: {
      path: './src/redux/__module__(kebabCase)s',
      pathAndFileNameDefaultCase: '(kebabCase)',
    },
    onComplete: results => {
      console.log(`results`, results);
      console.log(`Need to update file: rootReducer!`);
      console.log(`Need to update file: schema!`);
      console.log(`Need to update file: source constant!`);
    },
  },
]);
