// console.log('Js is working');

//Utility function
//1.function to get DOM element from String 
function getElemfromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

//Initializing no of parameters
let addedParamCount = 0;

//Hide parameters box initially 
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

//If the user clicks on params radio button, hide the Json box
let parmasType = document.getElementById('paramsType');
parmasType.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
});

//If the user clicks on json radio button , hide the params box 
let jsonType = document.getElementById('jsonType');
jsonType.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
});


//If user clicks on + button , add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `  <div class="form-row my-2">
                       <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                        </div>
                        <div class="col-md-4">
                         <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                        </div>
                      <button class="btn btn-primary deleteParam">-</button>
                    </div>`;

    addedParamCount++;
    //Convert the element string to DOM node 
    let paramElement = getElemfromString(string);
    //Appending paramElement as a child in params Div
    params.appendChild(paramElement);

    //add an eventlistener to remove the parameter by clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            // alert('do you want to delete param?');  
            e.target.parentElement.remove()

        })
    }
});


//If user clicks submit button get all user input values and get ready to call fetch api 
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    //showing please wait message in response box for user to wait for response 

    document.getElementById('responsePrism').innerHTML = "Please wait getting response ...";

    //grabbing values of input and radio buttons
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;


    //If user selects params options instead of Json collect all parameters in an Object

    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        //converting data into string object bcuz originally it is object and json type is also string object
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    //console log all values for debugging
    console.log('url:', url);
    console.log('requestType:', requestType);
    console.log('contentType:', contentType);
    console.log('data is:', data);

    //If the request type is GET
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(reponse => reponse.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    }

    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(reponse => reponse.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            })
    }
});



