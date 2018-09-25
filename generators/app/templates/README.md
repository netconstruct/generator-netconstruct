# Project Information

- CMS: N/A

- Functional Specifications: N/A

- Jira Board: N/A

- Trello Board: N/A

- Slack channel: N/A

- Preview URL: N/A

- Live URL: N/A

- Database: N/A

- Design link: N/A

- Lead Developer(s): N/A

___

# How to run the project

## Clone the project

1. Create a new folder under C:\Projects\ `new project name`

2. Use the command line or a Git GUI to clone the project:

	```git clone https://netconstruct.visualstudio.com/DefaultCollection/ProjectName/_git/ . ```

3. Once the project has been cloned, install all the frontend dependencies.

## Install Dependencies

1. If you already have `nodejs` and `yarn` install go to step 3.

2. If you don't have `nodejs` or `yarn` install on your machine install https://nodejs.org/en/ **(LTS version)** and https://yarnpkg.com/en/
  (npm gets install with nodejs).

3. For Kentico - Open a command line editor and type the following commands:

  ```cd C:\Project\ProjectName\CMS\SiteFiles\src```

  ```run npm i or yarn```

  For Umbraco - Open a command line editor and type the following commands:

  ```cd C:\Project\Netc.ProjectName.Web\SiteFiles\src```

  ```run npm i or yarn```


## Frontend folder in Kentico
All the frontend files are located under `C:\Project\ProjectName\CMS\SiteFiles\src`

## Frontend folder in Umbraco
All the frontend files are located under `C:\Project\NetC.ProjectName.Web\SiteFiles\src`

## Frontend tasks

This project is using `gulp`, `webpack` and has a `style guide`


List of tasks available:
* `gulp` - run the CMS on http://localhost:3000 to enable webpack features like hot reload 
* `gulp build-dev` - build all the assets (css, js etc) for development 
* `gulp build-uat` - build all the assets (css, js etc) for preview
* `gulp build-dev` - build all the assets (css, js etc) for production
* `gulp styleguide` - run the Style Guide on http://localhost:4000
* `gulp build-styleguide` - build all the assets (css, js etc) and generates a static HTML Style Guide

The primary frontend task is:
* `gulp styleguide`

## Frontend style guide
This project includes a style guide based on `Fractal` tool:
https://fractal.build/

Please read the following **core-concepts** to familiarise yourself with `Fractal`:
1. https://fractal.build/guide/core-concepts/views
2. https://fractal.build/guide/core-concepts/context-data
3. https://fractal.build/guide/core-concepts/configuration-files
4. https://fractal.build/guide/core-concepts/naming
5. https://fractal.build/guide/core-concepts/statuses

**Please note that we use `.hbs` file extension for views and `json` format for context-data configuration.**

For more information please follow the documentation link:
https://fractal.build/guide

## Third party dependencies and integration