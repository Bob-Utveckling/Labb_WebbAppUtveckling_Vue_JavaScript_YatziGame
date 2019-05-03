function readSingleFile(evt) {
    //https://www.htmlgoodies.com/beyond/javascript/read-text-files-using-the-javascript-filereader.html
    var f = evt.target.files[0];
    if (f) {
        var r = new FileReader();
        r.onload = function(e) {
            var contents = e.target.result;
            alert ("Got the file.n"
            + "name: " + f.name + "n"
            + "type: " + f.type + "n"
            + "size: " + f.size + "bytesn"
            + "starts with: " + contents.substr(1,contents.indexOf("n")))
            }
        r.readAsText(f);
    } else {
        alert ("Failed to load file");            
    }
}
//readSingleFile("PlayerCard.json");

function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
      result = xmlhttp.responseText;
    }
    return result;
  }