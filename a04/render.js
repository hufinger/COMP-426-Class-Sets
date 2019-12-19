import { rootCertificates } from "tls";

/**
 * Course: COMP 426
 * Assignment: a04
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
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<div>${hero.name}</div>`;
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
                    <button>Edit</button>
                    
                
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
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;
    const firstSeen = hero.firstSeen
    return `<section class = "edit">
        <form>
            <div class = "field">
                <label class = "label">Hero Name</label>
                <div class = "control">
                    <input class = "input" type = "text" value = "${hero.name}"></input>
                </div>
            </div>
            <div class = "field">
                <label class = "label">First Name</label>
                <div class = "control">
                    <input class = "input" type = "text" value = "${hero.first}"></input>
                </div>
            </div>
            <div class = "field">
                <label class = "label">Last Name</label>
                <div class = "control">
                    <input class = "input" type = "text" value = "${hero.last}"></input>
                </div>
            </div>
            <div class = "field">
                <label class = "label">Description</label>
                <div class = "control">
                    <textarea class = "textarea">${hero.description}</textarea> 
                </div>
            </div>
            <div class = "field">
                <label class = "label">First Seen</label>
                <div class = "control">
                    <input type = "date" value = "${firstSeen.getFullYear()}-0${firstSeen.getMonth()}-01"></input>
                </div>
            </div>
            <button class = "save" type = "submit">Save</button>
            <button class = "cancel">Cancel</button>
        </form>
    </section>`
};



/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    let supers = $('<div class = columns is-multiline/>');
    for(let i = 0; i < heroes.length; i++){
        supers.append(renderHeroCard(heroes[i]));
    }
    // TODO: Append the hero cards to the $root element
    $root.addClass('container heroes').append(supers);
    // Pick a hero from the list at random
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];

    // TODO: Generate the hero edit form using renderHeroEditForm()
    const edits = renderHeroEditForm(randomHero);
    // TODO: Append the hero edit form to the $root element
    $root.append(edits);
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
