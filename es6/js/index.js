'use strict';


// Class Puppy
class Puppy {
    // Constructor: takes in an img url, and a sound
    constructor(
        img = "https://www.thesprucepets.com/thmb/UGZpTl4N27XY8JppKyNzyqvKDa0=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/16_Love-5bb4c12bc9e77c00263933b3.jpg",
        sound = "meow") {
        this.img = img;
        this.sound = sound;
    }

    // Method for "speaking" using responsiveVoice
    bark() {
        responsiveVoice.speak(this.sound);
    }

    // Render a Div that you can click on to bark
    render() {
        let puppyCard = $("<div>");
        puppyCard.css("background-image", `url("${this.img}")`);
        puppyCard.attr("class", "puppyCard");
        puppyCard.click((d) => {
            this.bark();
        })
        return puppyCard;
    }
}

// Class Form
class PuppyForm {
    // Contructor: takes in a callback function you can do
    constructor(callback) {
        this.callback = callback;
    }

    // Render: build the form with submit event
    render() {
        // Build form and input elements
        let form = $('<form>');
        let urlInput = $('<input class="url">');
        urlInput.attr({
            type: "text",
            placeholder: "Puppy URL...",
            class: "form-control"
        });
        let soundInput = $('<input class="sound">');
        soundInput.attr({
            type: "text",
            placeholder: "Sound to make...",
            class: "form-control"
        });
        form.append(urlInput);
        form.append(soundInput);
        form.append($('<button class="btn btn-primary mb-3" type="submit">Add a puppy!</button>'));

        // On submit, do the callback function
        form.on('submit', (event) => {
            event.preventDefault();
            this.callback(urlInput.val(), soundInput.val());
            return false;
        });
        return form;
    }
}

// Class for the app
class PuppyApp {
    // Constructor: takes in a parent element and list of puppies
    constructor(parentElement, puppyList) {
        this.parentElement = parentElement;
        this.puppyList = puppyList;
    }

    // Add puppy: pushes new data into list of puppies and re-renders the app
    addPuppy(img, sound) {
        this.puppyList.push({
            url: img,
            sound: sound
        });
        this.render();
    }

    // Render;
    render() {
        // Empty parent element
        this.parentElement.empty();

        // Create and render a new form
        let form = new PuppyForm(this.addPuppy.bind(this));
        this.parentElement.append(form.render());

        // Append puppy list element to parent (in a wrapper div)
        let puppyWrapper = $("<div>");
        // desctructuring puppyInfo
        this.puppyList.forEach((puppyInfo) => {
            let newPuppy = new Puppy(puppyInfo.img, puppyInfo.sound);
            puppyWrapper.append(newPuppy.render());
        })
        this.parentElement.append(puppyWrapper);

    }
}

// Create a new app with a single puppy

let pupList = [
    {
        url: "https://thedailyshep.com/wp-content/uploads/2017/06/puppy-2357418_1280.jpg",
        sound: "awww"
    }
]

// Render the app
let app = new PuppyApp($('#content'), pupList);
