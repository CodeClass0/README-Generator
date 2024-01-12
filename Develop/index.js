//Global variables
const  inquirer = require("inquirer"); //This calls the inquirer package
const fs = require('fs'); //This calls the filesystem package

//This is an array of objects that are matched against once we have the user's license selection.
const licenseArray = [{
    value: "Apache License 2.0",
    icon: "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
},
{
    value: "GNU General Public License v3.0",
    icon: "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
},
{
    value: "MIT License",
    icon: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
},
{
    value: "BSD 2-Clause 'Simplified' License",
    icon: "[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)",
},
{
    value: "BSD 3-Clause 'New' or 'Revised' License",
    icon: "[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)",
},
{
    value: "Boost Software License 1.0",
    icon: "[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)",
},
{
    value: "Creative Commons Zero v1.0 Universal",
    icon: "[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)",
},
{
    value: "Eclipse Public License 2.0",
    icon: "[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)",
},
{
    value: "GNU Affero General Public License v3.0",
    icon: "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)",
},
{
    value: "GNU General Public License v2.0",
    icon: "[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)",
},
{
    value: "GNU Lesser General Public License v2.1",
    icon: "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)",
},
{
    value: "Mozilla Public License 2.0",
    icon: "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)",
},
{
    value: "The Unilicense",
    icon: "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)",
}];


//This is what prompts the user. It runs through a series of questions and returns a usable object.
async function promptUser(){
    return inquirer.prompt([
        {
            type:'input',
            name: "projectTitle",
            message: "Enter your project title: ",
        },
        {
            type:"input",
            name:"description",
            message:"Enter your Description section: ",
        },
        {
            type:"input",
            name:"installation",
            message:"Enter your Installation Instructions section: ",
        },
        {
            type:"input",
            name:"usage",
            message:"Enter your Usage section: ",
        },
        {//This is a list, rather than an input so that we can provide a badge for the user's selection. 
            type:"list",
            name:"license",
            message:"Select your License: ",
            choices: [{ 
                value: "Apache License 2.0",
            },
            {
                value: "GNU General Public License v3.0",
            },
            {
                value: "MIT License",
            },
            {
                value: "BSD 2-Clause 'Simplified' License",
            },
            {
                value: "BSD 3-Clause 'New' or 'Revised' License",
            },
            {
                value: "Boost Software License 1.0",
            },
            {
                value: "Creative Commons Zero v1.0 Universal",
            },
            {
                value: "Eclipse Public License 2.0",
            },
            {
                value: "GNU Affero General Public License v3.0",
            },
            {
                value: "GNU General Public License v2.0",
            },
            {
                value: "GNU Lesser General Public License v2.1",
            },
            {
                value: "Mozilla Public License 2.0",
            },
            {
                value: "The Unilicense",
            }]
        },
        {
            type:"input",
            name:"contributing",
            message:"Enter your Contributing section: ",
        },
        {
            type:"input",
            name:"tests",
            message:"Enter your Tests section: ",
        },
        {
            type:"input",
            name:"question",
            message:"Enter your Questions section: ",
        },
    ])
}


//This function creates a file with the information we pass to it as a final step in creating the README. 
//We don't check for an existing README because writeToFile() will either create a file, or overwrite an existing file.
function writeToFile(fileName, markdown) {
    fs.writeFile(fileName, markdown, (err) =>
    err ? console.log(err) : console.log("Your README has been populated!"));
}

//THis function compares the users license choice against an array of choices, and returns the correct icon string.
function sortIcon(data){
    for (let i = 0; i < licenseArray.length; i++){
        if (licenseArray[i].value === data){        
            return licenseArray[i].icon;
        }
    }
}

// Here we initialize the app and call the async promptUser function.
// It must be asynchronous because we have to wait for the user to finish enterring information.
async function init() {
    const data = await promptUser().then((data => {
        const icon = sortIcon(data.license);
        const markdown = generateMarkdown(data,icon);
        writeToFile("README.md", markdown);
    }));
}

//Here we generate markdown data, populating it with all of the data gained from the user.
function generateMarkdown(data,icon){
    return `# ${data.projectTitle}
${data.description}
## Table of Contents:
 - [Installation](#item-one)
 - [Usage](#item-two)
 - [License](#item-three)
 - [Contributing](#item-four)
 - [Tests](#item-five)
 - [Questions](#item-six)

<a id="item-one"></a>
## Installation
${data.installation}
<a id="item-two"></a>
## Usage
${data.usage}
<a id="item-three"></a>
## License

${icon}

<a id="item-four"></a>
## Contributing
${data.contributing}
<a id="item-five"></a>
## Tests
${data.tests}
<a id="item-six"></a>
## Questions
${data.question}
`
}

// Function call to initialize app
init();
