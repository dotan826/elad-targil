
let data = [];
let levelColor = ["lightgreen", "lightskyblue", "lightslategray", "lightcoral"];

/**
 * Fetch data from server - [This exercise is local so fetch retrieve Local JSON File]
 */
fetch('./data.json').then(response => {     // fetch data from server
    return response.json();                       // convert json into javascript object
}).then(dataFromServer => {
    data = dataFromServer;                        // save array to local variable
    if(data.length > 0){
        let containerElement = document.createElement("div");
        containerElement.setAttribute("id", "data");
        document.getElementById('container').appendChild(createListOfElements(data, containerElement, 0));   // build elements for view
    }
    else{
        window.alert("There is no data to show.");    // warning
    }

})

/**
 * This function is Recursive, it takes array of objects and builds list of elements inside elements.
 * @param arrayOfObjects The array of objects from server.
 * @param parentElement The parent element which receive the final element to the view.
 * @param level The number which indicate how deep are we inside the recursion - for color purposes.
 */
function createListOfElements(arrayOfObjects, parentElement, level) {
    for(let x=0; x<arrayOfObjects.length; x++) {                             // in each array, move on each object
        let mainElement = createSingleElement(arrayOfObjects[x], level);     // build first element
        if("subData" in arrayOfObjects[x]){
            createListOfElements(arrayOfObjects[x]["subData"], mainElement, level + 1);   // if there is sub Array, then iterate it too.
        }
        parentElement.appendChild(mainElement);   // each time we go on object without sub array, then append him to parent
    }
    return parentElement;   // return parent that contains all of him children elements
}

/**
 * This function builds new single element
 * @param singleObject The object with the id, name, url.
 * @return {HTMLDivElement} The new Element.
 * @param level The number which indicate how deep are we inside the recursion - for color purposes.
 */
function createSingleElement(singleObject, level) {
    let siteElement = document.createElement("div");
    siteElement.setAttribute("class", "siteElement");                                // add class for css
    siteElement.setAttribute("style", "background: " + levelColor[level] + ";");     // add style for css

    let id = document.createElement("div");
    id.innerText = "Id : " + singleObject["id"];
    siteElement.appendChild(id);                                         // add id

    let name = document.createElement("div");
    name.innerText = "Site Name : " + singleObject["name"];
    siteElement.appendChild(name);                                       // add site name

    let url = document.createElement("a");
    url.innerText = "Site Url : " + singleObject["name"];
    url.setAttribute("href", "https://" + String(singleObject["url"]));
    url.setAttribute("target", "_blank");
    siteElement.appendChild(url);                                       // add site url

    return siteElement;
}




