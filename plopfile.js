// export default function (plop) {
module.exports = function (plop) {
  // controller generator
  plop.setGenerator('crud', {
    description: 'Generate CRUD nestjx ',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Entity name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/modules/{{dashCase name}}/{{dashCase name}}.controller.admin.ts',
        templateFile: '_devtify/plop-templates/controller.admin.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{dashCase name}}/{{dashCase name}}.controller.client.ts',
        templateFile: '_devtify/plop-templates/controller.client.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{dashCase name}}/{{dashCase name}}.service.ts',
        templateFile: '_devtify/plop-templates/service.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{dashCase name}}/{{dashCase name}}.module.ts',
        templateFile: '_devtify/plop-templates/module.hbs',
      },
      {
        type: 'append',
        path: 'src/app.module.ts',
        pattern: 'append_here',
        template: '\t\t{{pascalCase name}}Module,',
      },
      {
        type: 'append',
        path: 'src/app.module.ts',
        pattern: 'import_module_here',
        template: `import { {{pascalCase name}}Module } from "./modules/{{dashCase name}}/{{dashCase name}}.module";`,
      },
      {
        type: 'add',
        path: 'src/entities/{{dashCase name}}.ts',
        templateFile: '_devtify/plop-templates/entity.hbs',
      },
      {
        type: 'append',
        path: 'src/entities/index.ts',
        pattern: 'entity_here',
        template: `export * from "./{{dashCase name}}";`,
      },
    ],
  });
};
