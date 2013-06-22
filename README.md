# jQuery Cascade Plugin

this is a simple jQuery plugin for cascading drop downs with the following features:
* filling a single drop down depending on multiple drop downs.
* adding extra arguments.
* specifying a request type (GET or POST). 
* specifying a function to be executed before starting the request.
* specifying a function to be executed after completing the request.


## Options:

#### dependent (required):
the ID of the dependent drop down.

#### url (required):
the url from where to get the data.

#### textKey (required):
the key that will be used for getting the text of an item after parsing the returned result.

#### valueKey (required):
the key that will be used for getting the value of an item after parsing the returned result.

#### argName (required):
the argument name to be used when sending request.

#### onError:
the function to be executed if an error occured while sending the request.

#### onComplete:
the function to be executed after request is complete.

#### beforeRequest
the function to be executed before the request starts.

#### defualtItemText:
the text to be used for the default item in the dependent drop down.

#### extraParam:
an object that contains the extra parameters to be send with the request (for example `{param1 : value1}`).

#### additionalDDL:
an array of objects (just the argument name and the ID of the drop down) that represents the additional drop downs to send its values with the request (for example `[{ argName: "val2", ID: "additionalDDL1" }, { argName: "val3", ID: "additionalDDL2" }]`).

#### requestType:
a string that represents the request type (GET or POST), the default request type is GET.

## Sample usage:

```javascript
$("#Combo2").cascade({
    url: "/Data/GetData",
    dependendent: "Combo3",
    textKey: "Text",
    valueKey: "Value",
    defualtItemText: "select an item",
    argName: "val1",
    additionalDDL: [{ argName: "val2", ID: "Combo1" }],
    beforeRequest: function () { alert("before satrt"); },
    onComplete: function () { alert("complete"); },
    requestType: "POST"
});
```