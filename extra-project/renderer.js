const fs = require('fs');

function mergeValues(values, content) {
    for(var key in values) {
        content = content.replace("{{" + key + "}}", values[key]);
    }
    return content;
}

function view(templateName, values, reponse) {
    //Read from the template file
    var fileContents = fs.readFileSync('./files/' + templateName + '.html', {encoding: "utf8"});
    //Insert values in to the content
    fileContents = mergeValues(values, fileContents);
    //Write out the contents to the response
    reponse.write(fileContents);
  }

module.exports.view = view;