////////////////////////////////////////////////////////////////////////////////
// Page State
//
// Contains all information pertaining to the page's state that is not
// stored in other business objects (controls).
////////////////////////////////////////////////////////////////////////////////
var app = app || {};

app.model = function (model) {
    // tag collection
    model.pagestate = {
        // mediaid for the last played video
        lastPlayed: null
    };
    
    return model;
}(app.model || {});

