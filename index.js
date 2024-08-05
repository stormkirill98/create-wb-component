#!/usr/bin/env node

console.log(process.argv, __dirname, __filename)

const fs = require('fs');
const path = require('path');

const componentDir = process.argv[2];
const componentName = process.argv[3];

if (!componentDir || !componentName) {
  console.error('Please provide a component directory and a component name.');
  process.exit(1);
}

const toPascalCase = (str) => {
  return str.replace(/(\w)(\w*)/g,
    (_, firstChar, rest) => firstChar.toUpperCase() + rest.toLowerCase()
  ).replace(/[-_]/g, '');
};

const pascalCaseComponentName = toPascalCase(componentName);

const tsxTemplate = `
import classnames from 'classnames/bind';
import styles from './index.module.scss';

const BLOCK_NAME = '${pascalCaseComponentName}';
const cn = classnames.bind(styles);

export const ${pascalCaseComponentName} = () => {
  return (
    <div className={cn(BLOCK_NAME)}>
       ${pascalCaseComponentName}
    </div>
  );
};
`
const scssTemplate = `
.${pascalCaseComponentName} {
  display: block;
}
`;

const componentPath = path.join(componentDir, componentName);
const componentFiles = {
  'index.module.scss': scssTemplate,
  'index.tsx': tsxTemplate
};

fs.mkdirSync(componentPath, { recursive: true });

Object.entries(componentFiles).forEach(([file, content]) => {
  fs.writeFileSync(path.join(componentPath, file), content.trim());
});

const indexPath = path.join(componentDir, 'index.ts');
const indexContent = `export * from './${componentName}';\n`;

if (fs.existsSync(indexPath)) {
  fs.appendFileSync(indexPath, indexContent);
} else {
  fs.writeFileSync(indexPath, indexContent);
}

console.log(`Component '${componentName}' created successfully in '${componentDir}'.`);
