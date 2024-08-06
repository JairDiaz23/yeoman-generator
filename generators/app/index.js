const Generator = require('yeoman-generator');
const path = require("path");

module.exports = class extends Generator {
  isPathProvided = false;
  folder = "src/components";

  // Useful to provide flags when running the generator.
  constructor(args, opts) {
    super(args, opts);
    this.option("skipPath")
  }

  initializing() {
    this.log("Working!")
  }

  // Where you prompt users for options
  async prompting() {

    // In case the path is not skipped provide the folder location for generated files.
    if (this.options.skipPath === undefined) {
      const { componentPath } = await this.prompt([
        {
          name: "componentPath",
          message: "Component path:"
        }
      ]);
      this.componentPath = componentPath;
      this.folder = componentPath;
    }

    const { componentName } = await this.prompt([
        {
          name: "componentName",
          message: "Component name:"
        }
      ]);
    this.componentName = componentName;
    this.config.set("componentName", this.componentName); // Save the componentName in yo-rc.json
  }

  // Where you write the generator specific files (routes, controllers, etc)
  // In this case a react component is created with the component name provided.
  writing() {
    this.fs.copyTpl(
        this.templatePath("Component.js"),
        this.destinationPath(path.resolve(this.folder,`${this.componentName}.js`)),
          { componentName: this.componentName }
        );
    }
};
