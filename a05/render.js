/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <Hunter Finger>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Copy your code from a04 to render the hero card
    return `
            <div class = "render">
                <div class = "card">
                    <div class = "hero-image" style = "background-color: ${hero.backgroundColor}">
                        <img src = "${hero.img}" alt = "hero-image"></img>   
                    </div>
                    <div class = "content">
                        <p style = "color: ${hero.color}"> ${hero.name} </p>
                        <p> ${hero.first + ' ' + hero.last}
                        <span> ${'First seen:' + hero.firstSeen.getMonth() + hero.firstSeen.getDate() + hero.firstSeen.getFullYear()}</span>
                        <p> ${hero.description}</p>
                    </div>
                    <button class = "editbut" which-hero = "${hero.id}">Edit</button>
                    
                
                </div>
            </div>
            `
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Copy your code from a04 to render the hero edit form
    const heroDate = hero.firstSeen;
    return `<form id = "editForm">
            <div class = "field">
                <label class = "label">Hero Name</label>
                <div class = "control">
                    <input id="name" class = "input" type = "text" value = "${hero.name}"></input>
                </div>
            </div>
            <div class = "field">
                <label class = "label">First Name</label>
                <div class = "control">
                    <input id = "first" class = "input" type = "text" value = "${hero.first}"></input>
                </div>
            </div>
            <div class = "field">
                <label class = "label">Last Name</label>
                <div class = "control">
                    <input id = "last" class = "input" type = "text" value = "${hero.last}" ></input>
                </div>
            </div>
            <div class = "field">
                <label class = "label">Description</label>
                <div class = "control">
                    <textarea id = "description" class = "textarea" >${hero.description}</textarea> 
                </div>
            </div>
            <div class = "field">
                <label class = "label">First Seen</label>
                <div class = "control">
                    <input id = "firstSeen" type = "date" value = "${heroDate.getFullYear()}-${heroDate.getMonth().toString().padStart(2,'0')}-01" ></input>
                </div>
            </div>
            <button class = "save" type = "submit" which-hero = "${hero.id}">Save</button>
            <button class = "cancel" which-hero = "${hero.id}">Cancel</button>
        </form>
        `
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    event.preventDefault()
    const id = event.target.getAttribute("which-hero");
    const calledit = renderHeroEditForm(heroicData.find(h => h.id == id));
    $('#root').append(calledit);
    event.target.parentNode.parentNode.remove();
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    event.preventDefault();
    const id = event.target.getAttribute("which-hero");
    const render = renderHeroCard(heroicData.find(h => h.id == id));
    $('#editForm').replaceWith(render);


};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
    event.preventDefault();
    const id = event.target.getAttribute("which-hero");
    const name = $('#name').val();
    const first = $('#first').val();
    const last = $('#last').val();
    const desc = $('#description').val();
    const firstSeen = $('#firstSeen').val();

    let editedhero = heroicData.find(h => h.id == id);
    editedhero.name = name;
    editedhero.first = first;
    editedhero.last = last;
    editedhero.description = desc;
    editedhero.firstSeen = new Date(firstSeen.slice(0,4), firstSeen.slice(5,7));
    const newHeroCard = renderHeroCard(editedhero);
    $('#editForm').replaceWith(newHeroCard);
};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part
    let supers = $('<div class = columns is-multiline/>');
    for(let i = 0; i < heroes.length; i++){
        supers.append(renderHeroCard(heroes[i]));
    }
    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part
    $root.addClass('container').append(supers);
    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button
    $root.on('click', '.editbut', handleEditButtonPress);
    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form
    $root.on('click', '.save', handleEditFormSubmit);
    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
    $root.on('click', '.cancel', handleCancelButtonPress);
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
