const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');
const numberGuessingGameElement = document.getElementById('number-guessing-game');

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

function getUsername() {
     var username = prompt("Please enter your username:");
     return username;
 }

function downloadJSON(data, filename) {
     var blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
     var url = URL.createObjectURL(blob);
 
     var a = document.createElement('a');
     a.href = url;
     a.download = filename;
     document.body.appendChild(a);
     a.click();
     setTimeout(function() {
         document.body.removeChild(a);
         window.URL.revokeObjectURL(url);  
     }, 0); 
 }
 
 var playerUsername = getUsername();

 // Example usage
 var playerData = [
     {
         "username": playerUsername,
         "minutes_played": 0,
         "score": 0,
         "level": 0
     },
 ];
  
 downloadJSON(playerData, 'player_data.json');
 

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  optionButtonsElement.innerHTML = ''; // Clear existing buttons

  textNode.options.forEach((option, index) => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('btn');
      button.dataset.optionIndex = index; // Store option index as data attribute
      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });

  // Show/hide number guessing game
  if (textNode.id === 811) {
    numberGuessingGameElement.style.display = 'block'; // Show number guessing game
  } else {
    numberGuessingGameElement.style.display = 'none'; // Hide number guessing game
  }
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  
  // Show the next text node
  const nextTextNode = textNodes.find(node => node.id === nextTextNodeId);
  if (nextTextNode) {
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
  } else {
    console.error(`Text node with id ${nextTextNodeId} not found!`);
  }
}

// Function to start the number guessing game
function startNumberGuessingGame() {
  // Number guessing game logic
  const input = document.querySelector(".input-field input"),
    guess = document.querySelector(".guess"),
    checkButton = document.querySelector(".input-field button"),
    remainChances = document.querySelector(".chances");

  input.focus();

  let randomNum = Math.floor(Math.random() * 100);
  let chance = 10;

  checkButton.addEventListener("click", () => {
    chance--;
    let inputValue = input.value;
    if (inputValue == randomNum) {
      guess.textContent = "Congratulations! You guessed the number.";
      showTextNode(817);
    } else if (inputValue > randomNum && inputValue < 100) {
      [guess.textContent, remainChances.textContent] = ["Your guess is high", chance];
      guess.style.color = "#333";
    } else if (inputValue < randomNum && inputValue > 0) {
      [guess.textContent, remainChances.textContent] = ["Your guess is low", chance];
      guess.style.color = "#333";
    } else {
      [guess.textContent, remainChances.textContent] = ["Your number is invalid", chance];
      guess.style.color = "#DE0611";
    }
    if (chance == 0) {
      [checkButton.textContent, input.disabled, inputValue] = ["Replay", true, ""];
      [guess.textContent, guess.style.color] = ["You lost the game", "#DE0611"];
    }
    if (chance < 0) {
      window.location.reload();
    }
  });
}
const numberGuessingButton = document.querySelector('.number-guessing-button');
if (numberGuessingButton) {
  numberGuessingButton.addEventListener('click', startNumberGuessingGame);
}


const textNodes = [
     {
          id: 1,
          text: "You wander through the foggy streets of Havenbrook. You are a stranger here and the air is heavy with tension. Standing by a the half-shattered windows of a shop, you get the feeling you're being watched. You spot a nearby church.",
          options: [
               {
                    text: "Take refuge in the church",
                    nextText: 2,
               },
               {
                    text: "Keep wandering the streets",
                    nextText: 102,
               },
               {
                    text: "Check your reflection in the window",
                    nextText: 202,
               },
               {
                    text: "Head towards the supermarket",
                    nextText: 302,
               }
          ]
     },
     {
          id: 2,
          text: "You enter the decrepit church, the rotted wooden walls creak as the wind howls. You hear rustling behind you. ",
          options: [
               {
                    text: "Turn around",
                    nextText: 3,
               },
               {
                    text: "Run out the back door",
                    nextText: 4,
               },
               {
                    text: "Hide behind the stairs",
                    nextText: 800,
               }
          ]

     },
     {
          id: 3,
          text: "You turn around and are faced by a huge, groaning blob of flesh. Stitches cover its body connecting multiple shriveled heads. Its large claw-like hands reach towards you, slashing your arm. Blood comes gushing out of you",
          options: [
               {
                    text: "Try to fight the creature",
                    requiredState: (currentState) => !currentState.Injured,
                    nextText: 6,
               },
               {
                    text: "Run up the stairs",
                    requiredState: (currentState) => !currentState.Injured,
                    nextText: 5,
               },
               {
                    text: "Struggle against the creature",
                    requiredState: (currentState) => currentState.Injured,
                    nextText: 6,
               }
          ]
     },
     {
          id: 4,
          text: "You manage to escape the church, not looking behind you for even a second. Whatever that thing was in the darkness, it seems like it isn't following you. You find yourself in a small alleyway. As you walk further along, the alley forks two directions",
          options: [
               {
                    text: "Turn left",
                    nextText: 7,
               },
               {
                    text: "Turn right",
                    nextText: 8,
               }

          ]
     },
     {
          id: 5,
          text: "You dash quickly up the stairs in fear. You find nothing up there but a dead end and a window. It sounds like whatever was behind you is getting closer",
          options: [
               {
                    text: "Turn around to face the creature",
                    nextText: 6,
               },
               {
                    text: "Jump out of the window",
                    nextText: 9,
               }
          ]
     },
     {
          id: 6,
          text: "You struggle against the creature, its claws cutting into your flesh. You reach forward and try to strike back but the creature is unmoving. Slowly you start to feel faint. The pain fades.",
          options: [
               {
                    text: "...",
                    nextText: 10,
               }
          ]
     },
     {
          id: 7,
          text: "You decide to take the left path and continue down it. The alley is filled with an unsettling silence. You pass a deep pool of blood with an unnaturally bright colour. The smell turns your stomach. As you walk, you reflect on the circumstances that led you here. For months reports had been pouring out of this isolated town of empty streets and screams in the night. The fog never seeming to fade. You came here in search of a story, armed with nothing but your camera. You begin to question if this was a good idea",
          options: [
               {
                    text: "Check camera",
                    requiredState: (currentState) => !currentState.CameraUnlock,
                    nextText: 13,
               },
               {
                    text: "Proceed",
                    requiredState: (currentState) => currentState.CameraUnlock,
                    nextText: 11,
               }
          ]
     },
     {
          id: 8,
          text: "You decide to take the right path and continue down it. The tension in the air is thick. You pass a large slice of seemingly human flesh. Upon closer inspection, it appears to be several smaller pieces of dead flesh stitched together crudely. As you walk, you decide to leave it be. You reflect on the circumstances that led you here. For months reports had been pouring out of this isolated town of empty streets and screams in the night. The fog never seeming to fade. You came here in search of a story, armed with nothing but your camera. You begin to question if this was a good idea",
          options: [
               {
                    text: "Check camera",
                    requiredState: (currentState) => !currentState.CameraUnlock,
                    nextText: 13,
               },
               {
                    text: "Proceed",
                    requiredState: (currentState) => currentState.CameraUnlock,
                    nextText: 12,
               }
          ]

     },
     {
          id: 9,
          text: "You make jump out the window, broken glass cutting at your arms. You land safely but injured on the grass below. You get the sense that you just narrowly avoided an untimely demise",
          options: [
               {
                    text: "Proceed",
                    setState: {Injured: true},
                    nextText: 4,
               }
          ]
     },
     {
          id: 10,
          text: "Slowly, darkness fully envelops your vision. You succumb to your injuries as the creature looms over you.",
          options: [
               {
                    text: "Game Over",
                    nextText: -1,
               }
          ]
     },
     {
          id: 11,
          text: "You continue down the left path and find yourself outside the supermarket",
          options: [
               {
                    text: "Explore the supermarket",
                    nextText: 302,
               },
               {
                    text: "Reconsider your options",
                    nextText: 900,
               }
          ]
     },
     {
          id: 12,
          text: "You continue down the right path following it. It heads back to the main street",
          options: [
               {
                    text: "Continue back to the main street",
                    nextText: 107,
               },
               {
                    text: "Reconsider your options",
                    nextText: 900,
               }
          ]
     },
     {
          id: 13,
          text: "You decide to check your trusty camera for damages. All good, thankfully, on the outside at least",
          options: [
               {
                    text: "Open the camera",
                    nextText: 14,
               }
          ]
     },
     {
          id: 14,
          text: "You open it up to find yourself with only a small bit of film left, good for two photos maybe. On closer inspection, the remaining film is glowing a deep green, as if radiating with some kind of energy. You wonder what would happen if you take a picture",
          options: [
               {
                    text: "Take a picture of a nearby wall",
                    nextText: 15,
               },
               {
                    text: "Take a picture of your hand",
                    nextText: 16,
               }
          ]
     },
     {
          id: 15,
          text: "The shutter clicks. You wait for the film to develop. The photograph comes out, showing the wall but unlike it appears in reality. In the photo, the wall is covered with frantic markings of the word 'help' over and over again, seemingly written in blood. You drop the photo in fear. You look up and find that the two paths from earlier crossing again, giving you a chance to continue down your initial path or to switch to the other. You have enough film left for one more photo.",
          options:
          [
               {
                    text: "Continue, following the left path",
                    setState: {Camera: true},
                    setState: {CameraUnlock: true},
                    nextText: 11,
               },
               {
                    text: "Continue, following the right path",
                    setState: {Camera: true},
                    setState: {CameraUnlock: true},
                    nextText: 12,
               }

          ]
     },
     {
     id: 16,
          text: "The shutter clicks. You wait for the film to develop. The photograph comes out, showing your hand but slathered in blood, creeping down your wrists. You drop the photo out of fear and try to not think about it. You have enough film left for one more photo.",
          options:
          [
               {
                    text: "Continue, following the left path",
                    setState: {Camera: true},
                    setState: {CameraUnlock: true},
                    nextText: 11,
               },
               {
                    text: "Continue, following the right path",
                    setState: {Camera: true},
                    setState: {CameraUnlock: true},
                    nextText: 12,
               }

          ]
     },
     {
          id: 102,
          text: "You decide to stay on the main street, that creeping feeling still looming behind you. You hear rustling in a nearby bin",
          options: [
               {
                    text: "Check the bin",
                    nextText: 103,
               },
               {
                    text: "Ignore it",
                    nextText: 104,
               }
          ]
     },
     {
          id: 103,
          text: "You open the bin, finding it full of bats that fly towards you. They attack you, overwhelming you instantly.",
          options: [
               {
                    text: "Fight back",
                    nextText: 105,
               },
               {
                    text: "Run away",
                    nextText: 106,
               }
          ]
     },
     {
          id: 104,
          text: "You slowly back away from the bin, deciding that finding out what's inside isn't worth the trouble",
          options: [
               {
                    text: "Return to the main street",
                    nextText: 107,
               },
               {
                    text: "Head to the church",
                    nextText: 2,
               }
          ]
     },
     {
          id: 105,
          text: "You decide to stand your ground agaist the bats as they swarm you. They slash at you with their razor sharp talons",
          options: [
               {
                    text: "Swing wildly",
                    requiredState: (currentState) => !currentState.Injured,
                    setState: {Injured: true},
                    nextText: 108,
               },
               {
                    text: "Assume a defensive position",
                    requiredState: (currentState) => !currentState.Injured,
                    nextText: 109,
               },
               {
                    text: "Try to run",
                    requiredState: (currentState) => !currentState.Injured,
                    nextText: 110,
               },
               {
                    text: "Struggle helplessly",
                    requiredState: (currentState) => currentState.Injured,
                    nextText: 111,
               }
          ]
     },
     {
          id: 106,
          text: "In a panic, you flee from the swarm of bats, running to a nearby house. You quickly shut the door on them, pressing your back against the door until they're gone.",
          options: [
               {
                    text: "Explore the house",
                    nextText: 206,
               },
               {
                    text: "Exit the house through the back",
                    nextText: 112,
               },
          ]
     },
     {
          id: 107,
          text: "You make it back to the main street. You spot several different locations of interest.",
          options:
          [
               {
                    text: "Check the house in front of you",
                    requiredState: (currentState) => !currentState.HouseComplete,
                    nextText: 206,
               },
               {
                    text: "Check the Church",
                    requiredState: (currentState) => !currentState.ChurchComplete,
                    nextText: 2,
               },
               {
                    text: "Check the nearby supermarket",
                    requiredState: (currentState) => !currentState.SupermarketComplete,
                    nextText: 340,
               },
               {
                    text: "Stay on the main street",
                    requiredState: (currentState) => !currentState.BinComplete,
                    nextText: 102,
               },
          ]
     },
     {
          id: 108,
          text: "The bats swarm you, your efforts to fight back prove fruitless. Eventually, they fly past you. You've sustained several injuries, but at least you're alive.",
          options: [
               {
                    text: "Check the bin properly",
                    nextText: 113,
               },
               {
                    text: "Leave while you have the chance",
                    nextText: 104,
               }
          ]
     },
     {
          id: 109,
          text: "Instead of trying to fight off the bats, you assume a defensive position, protecting your vital organs. The bats pass by you eventually, leaving you with only minor cuts and bruises.",
          options: [
               {
                    text: "Check the bin properly",
                    nextText: 113,
               },
               {
                    text: "Leave while you have the chance",
                    nextText: 104,
               }
          ]
     },
     {
          id: 110,
          text: "You run as fast as you can from the swarm of bats, not looking behind you. The bats slowly dissipate, leaving you with minor injuries",
          options:
          [
               {
                    text: "Proceed",
                    nextText: 107,
               }
          ]
     },
     {
          id: 111,
          text: "Due to your previous injuries, you are unable to put up a fight against the horde of bats. You blood pools on the floor. You collapse. The light slowly fades.",
          options:
          [
               {
                    text: "Game Over",
                    nextText: -1,
               }
          ]
     },
     {
          id: 112,
          text: "As you leave the house through the back door, you reflect on the circumstances that led you here. For months reports had been pouring out of this isolated town of empty streets and screams in the night. The fog never seeming to fade. You came here in search of a story, armed with nothing but your camera. You begin to question if this was a good idea",
          options: [
               {
                    text: "Check camera",
                    requiredState: (currentState) => !currentState.CameraUnlock,
                    nextText: 114,
               },
               {
                    text: "Go back inside the house",
                    requiredState: (currentState) => currentState.CameraUnlock,
                    nextText: 250,
               },
               {
                    text: "Head back to the main street",
                    requiredState: (currentState) => currentState.CameraUnlock,
                    nextText: 107,
               }
          ]
     },
     {
          id: 113,
          text: "You look inside the bin and find a small crowbar. Would you like to take it with you?",
          options: [
               {
                    text: "Yes",
                    requiredState: (currentState) => !currentState.Crowbar,
                    setState: {Crowbar: true},
                    nextText: 118,
               },
               {
                    text: "No",
                    requiredState: (currentState) => !currentState.Crowbar,
                    nextText: 119,
               },
               {
                    text: "...",
                    requiredState: (currentState) => currentState.Crowbar,
                    nextText: 120,
               }
          ]
     },
     {
          id: 114,
          text: "You decide to check your trusty camera for damages. All good, thankfully, on the outside at least",
          options: [
               {
                    text: "Open the camera",
                    nextText: 115,
               }
          ]
     },
     {
          id: 115,
          text: "You open it up to find yourself with only a small bit of film left, good for two photos maybe. On closer inspection, the remaining film is glowing a deep green, as if radiating with some kind of energy. You wonder what would happen if you take a picture",
          options: [
               {
                    text: "Take a picture of a nearby wall",
                    nextText: 116,
               },
               {
                    text: "Take a picture of your hand",
                    nextText: 117,
               }
          ]
     },
     {
          id: 116,
          text: "The shutter clicks. You wait for the film to develop. The photograph comes out, showing the wall but unlike it appears in reality. In the photo, the wall is covered with frantic markings of the word 'help' over and over again, seemingly written in blood. You drop the photo in fear. You look up and find that the two paths from earlier crossing again, giving you a chance to continue down your initial path or to switch to the other. You have enough film left for one more photo.",
          options: [
               {
                    text: "Go back inside the house",
                    setState: {Camera: true},
                    requiredState: (currentState) => !currentState.KitchenDone,
                    nextText: 206,
               },
               {
                    text: "Head back to the main street",
                    setState: {Camera: true},
                    nextText: 107,
               },
               {
                    text: "Go back inside the house",
                    setState: {Camera: true},
                    requiredState: (currentState) => currentState.KitchenDone,
                    nextText: 210,
               }

          ]
     },
     {
     id: 117,
          text: "The shutter clicks. You wait for the film to develop. The photograph comes out, showing your hand but slathered in blood, creeping down your wrists. You drop the photo out of fear and try to not think about it. You have enough film left for one more photo.",
          options: [
               {
                    text: "Go back inside the house",
                    setState: {Camera: true},
                    requiredState: (currentState) => !currentState.HouseComplete,
                    requiredState: (currentState) => !currentState.KitchenDone,
                    nextText: 206,
               },
               {
                    text: "Head back to the main street",
                    setState: {Camera: true},
                    nextText: 107,
               },
               {
                    text: "Go back inside the house",
                    setState: {Camera: true},
                    requiredState: (currentState) => !currentState.HouseComplete,
                    requiredState: (currentState) => currentState.KitchenDone,
                    nextText: 210,
               }


          ]
     },
     {
          id: 118,
          text: "You grab the crowbar from the bin, might come in handy after all. Where to next?",
          options: [
               {
                    text: "Head back to the main street",
                    setState: {BinComplete: true},
                    nextText: 107,
               },
               {
                    text: "Explore the alley further",
                    nextText: 121,
               }
          ]
     },
     {
          id: 119,
          text: "You decide to leave the crowbar alone, just in case",
          options: [
               {
                    text: "Head back to the main street",
                    setState: {BinComplete: true},
                    nextText: 107,
               }
          ]
     },
     {
          id: 120,
          text: "You already have a crowbar, no need to carry a second one",
          options: [
               {
                    text: "Head back to the main street",
                    setState: {BinComplete: true},
                    nextText: 107,
               },
               {
                    text: "Explore the alley further",
                    nextText: 121,
               }
          ]
     },
     {
          id: 121,
          text: "You head further into the alley. As you walk, you notice that you aren't actually getting any closer to the end. It's as though the alley is constantly getting longer. A chill runs down your back.",
          options: [
               {
                    text: "Proceed?",
                    nextText: 122,
               },
               {
                    text: "Turn back",
                    nextText: 123,
               },
               {
                    text: "Use camera",
                    requiredState: (currentState) => currentState.Camera,
                    nextText: 124,
               },
          ]
     },
     {
          id: 122,
          text: "Seeing no other real option, you continue down the seemingly endless alley. The alley seems to repeat over and over. After several minutes, you come across the first sign of something different. A wooden doll of a young ballerina.",
          options: [
               {
                    text: "Stop to look at the doll",
                    nextText: 125,
               },
               {
                    text: "Keep moving",
                    nextText: 126,
               }
          ]
     },
     {
          id: 123,
          text: "You turn around, attempting to go back the way you came. After a while of walking that way, you realise that you're still heading for the same alley ending you were before. It seems you've made no progress at all.",
          options: [
               {
                    text: "...",
                    nextText: 122,
               }
          ]
     },
     {
          id: 124,
          text: "You take a picture with your camera, in hopes it will reveal some way out due to the special film you found earlier. The camera flashes, revealing a loose brick in the wall beside you. You move the brick and that section of wall collapses.",
          options: [
               {
                    text: "Go through the hole in the wall",
                    setState: {Camera: false},
                    nextText: 130,
               }
          ]
     },
     {
          id: 125,
          text: "You stop to look at the doll for a moment. Seems perfectly ordinary. You make eye contact with it for a few seconds then suddenly, it lunges at you.",
          options: [
               {
                    text: "Run away",
                    nextText: 127,
               },
               {
                    text: "Try to fight back",
                    nextText: 128,
               },
               {
                    text: "Hit it with the crowbar",
                    requiredState: (currentState) => currentState.Crowbar,
                    nextText: 129,
               }

          ]
     },
     {
          id: 126,
          text: "You decide to leave the doll alone but as you turn your back on it, it lunges at you",
          options: [
               {
                    text: "Run away",
                    nextText: 127,
               },
               {
                    text: "Try to fight back",
                    requiredState: (currentState) => !currentState.Injured,
                    nextText: 128,
               },
               {
                    text: "Hit it with the crowbar",
                    requiredState: (currentState) => currentState.Crowbar,
                    requiredState: (currentState) => !currentState.Injured,
                    nextText: 129,
               },
               {
                    text: "Struggle against the doll",
                    requiredState: (currentState) => currentState.Injured,
                    nextText: 131,
               }

          ]
     },
     {
          id: 127,
          text: "You try to run but run out of stamina quickly. The doll's pursuit is unceasing. It's right behind you once again",
          options: [
               {
                    text: "Hit it with the crowbar",
                    requiredState: (currentState) => currentState.Crowbar,
                    requiredState: (currentState) => !currentState.Injured,
                    nextText: 129,
               },
               {
                    text: "Struggle against the doll",
                    requiredState: (currentState) => !currentState.Crowbar,
                    requiredState: (currentState) => !currentState.Injured,
                    nextText: 128,
               },
               {
                    text: "Struggle against the doll",
                    requiredState: (currentState) => currentState.Injured,
                    nextText: 131,
               }
          ]
     },
     {
          id: 128,
          text: "You're quickly overpowered by the doll. It tears off your arms, then your legs. You slowly bleed out on the floor",
          options: [
               {
                    text: "...",
                    nextText: -1,
               }
          ]
     },
     {
          id: 129,
          text: "You swing the crowbar as hard as you can at the doll. It shatters like glass but leaves the crowbar bent out of shape. You decide it's no longer worth carrying. You spot something shiny in the remains of the doll",
          options: [
               {
                    text: "Pick it up",
                    setState: {TKey: true},
                    setState: {Crowbar: false},
                    nextText: 132,
               },
               {
                    text: "Ignore it",
                    setState: {Crowbar: false},
                    nextText: 133,
               }
          ]
     },
     {
          id: 130,
          text: "You go through the hole and end up back where you started, just outside the alley. All seems to be normal, relatively speaking.",
          options: [
               {
                    text: "Return to the main street",
                    requiredState: (currentState) => currentState.CameraUnlock,
                    nextText: 107,
               },
               {
                    text: "Check camera",
                    requiredState: (currentState) => !currentState.CameraUnlock,
                    nextText: 134,
               }
          ]
     },
     {
          id: 131,
          text: "Due to your previous injuries, the doll overpowers you before you have a chance to fight back. You fall to your knees as the light slowly fades.",
          options: [
               {
                    text: "...",
                    nextText: -1,
               }
          ]
     },
     {
          id: 132,
          text: "In the debris left by the now broken doll, you find a small key. It has a tag attatched but there is no writing on it. You wonder if there is hidden writing",
          options: [
               {
                    text: "Use your camera on the tag",
                    requiredState: (currentState) => currentState.Camera,
                    nextText: 135,
               },
               {
                    text: "Pocket the key and move on",
                    nextText: 133,
               }

          ]
     },
     {
          id: 133,
          text: "You look up and see that a hole has opened up in the wall of the endless alleyway",
          options: [
               {
                    text: "Leave the alley",
                    nextText: 130,
               }
          ]
     },
     {
          id: 134,
          text: "You decide to check your trusty camera for damages. All good, thankfully, on the outside at least",
          options: [
               {
                    text: "Open the camera",
                    nextText: 136,
               }
          ]
     },
     {
          id: 135,
          text: "You take a picture of the key's tag. The photo develops and shows that the tag includes a place name and and a set of initials: 'Town Hall, A.T'",
          options: [
               {
                    text: "Pocket the key and move on",
                    setState: {THall: true},
                    setState: {Camera: false},
                    nextText: 133,
               }
          ]
     },
     {
          id: 136,
          text: "You open it up to find yourself with only a small bit of film left, good for two photos maybe. On closer inspection, the remaining film is glowing a deep green, as if radiating with some kind of energy. You wonder what would happen if you take a picture",
          options: 
          [
               {
                    text: "Take a picture of a nearby wall",
                    nextText: 137,
               },
               {
                    text: "Take a picture of your hand",
                    nextText: 138,
               }
          ]
     },
     {
          id: 137,
          text: "The shutter clicks. You wait for the film to develop. The photograph comes out, showing the wall but unlike it appears in reality. In the photo, the wall is covered with frantic markings of the word 'help' over and over again, seemingly written in blood. You drop the photo in fear. You look up and find that the two paths from earlier crossing again, giving you a chance to continue down your initial path or to switch to the other. You have enough film left for one more photo.",
          options:
          [
               {
                    text: "Return to the main street",
                    setState: {Camera: true},
                    setState: {CameraUnlock: true},
                    nextText: 107,
               }

          ]
     },
     {
     id: 138,
          text: "The shutter clicks. You wait for the film to develop. The photograph comes out, showing your hand but slathered in blood, creeping down your wrists. You drop the photo out of fear and try to not think about it. You have enough film left for one more photo.",
          options:
          [
               {
                    text: "Return to the main street",
                    setState: {Camera: true},
                    setState: {CameraUnlock: true},
                    nextText: 107,
               },
               {
                    text: "Reconsider your options",
                    nextText: 900,
               }
          ]
     },
     {
          id: 202,
          text: "It's you.",
          options:
          [
               {
                    text: "Take a closer look",
                    nextText: 203,
               }
          ]
     },
     {
          id: 203,
          text: "In your reflection, in the corner of your eye you spot what appears to be a little girl staring at you. A chill runs down your back.",
          options: [
               {
                    text: "Run",
                    nextText: 204,
               },
               {
                    text: "Do nothing",
                    nextText: 205,
               }
          ]
     },
     {
          id: 204,
          text: "Getting a bad feeling, you run as fast as you can from the girl. You run inside a nearby house, attempting to barricade the door. It seems as though you're safe for now.",
          options: [
               {
                    text: "Explore the house",
                    nextText: 206,
               },
               {
                    text: "Exit the house through the back",
                    nextText: 112,
               },
          ]
     },
     {
          id: 205, 
          text: "Seeing the girl in your reflection, you become paralysed with fear. The last thing you see before everything goes dark is her lunging towards you at an impossible speed. When you wake up, you're inside a walk-in fridge, chained to the ground",
          options: [
               {
                    text: "Attempt to break free",
                    requiredState: (currentState) => !currentState.Injured,
                    nextText: 320,
               },
               {
                    text: "Attempt to break free",
                    requiredState: (currentState) => currentState.Injured,
                    nextText: 321
               }
          ]
     },
     {
          id: 206,
          text: "You decide to explore the house. In the kitchen you find unwashed pots and pans. Whoever lived here left in a hurry. Looks like there's nothing of use in the kitchen. Where to next?",
          options: [
               {
                    text: "Check the bedroom",
                    nextText: 207
               },
               {
                    text: "Check the garage",
                    nextText: 208,
               },
               {
                    text: "Head out the back of the house",
                    nextText: 112,
               }
          ]
     },
     {
          id: 207,
          text: "You head into the bedroom and search the place. You open a cupboard and find a suspicious looking letter. It doesn't seem like there's much else up here.",
          options: [
               {
                    text: "Read the letter",
                    nextText: 209,
               },
               {
                    text: "Check the garage instead",
                    nextText: 208,
               }
          ]
     },
     {
          id: 208,
          text: "You head into the garage and find very little. No car and very little in the way of tools. You do however, find a crowbar. Take it?",
          options: [
               {
                    text: "Take the crowbar",
                    requiredState: (currentState) => !currentState.Crowbar,
                    setState: {Crowbar: true},
                    nextText: 211,
               },
               {
                    text: "Check the bedroom instead",
                    nextText: 207,
               },
               {
                    text: "Leave the crowbar",
                    requiredState: (currentState) => currentState.Crowbar,
                    nextText: 212,
               }
          ]
     },
     {
          id: 209,
          text: "The letter reads the following: To my dear Emily, I understand your concerns about the recent disturbances but I urge you to stay here in Havebrook. Please come meet with me in the town hall, I can guarantee your safety. Your friend, Mayor Taylor.",
          options: 
          [
          {
               text: "Continue",
               nextText: 213,
          }
     ]
     },
     {
          id: 210,
          text: "You head back inside the house. Where would you like to explore next?",
          options: [
               {
                    text: "Check the bedroom",
                    nextText: 207
               },
               {
                    text: "Check the garage",
                    nextText: 208,
               },
          ]
     },
     {
          id: 211,
          text: "You pick up the crowbar and add it to your bag. Might come in handy later",
          options: [
               {
                    text: "Continue",
                    nextText: 213,
               }
          ]
     },
     {
          id: 212,
          text: "Since you already have a crowbar on you, it doesn't make sense to carry another one. You decide to check the bedroom instead",
          options: [
               {
                    text: "Check the bedroom",
                    nextText: 207,
               }
          ]
     },
     {
          id: 213,
          text: "Suddenly, the entire building starts to shake as if there is an earthquake. You run outside quickly and manage to make it out unharmed",
          options: [
               {
                    text: "Return to the main street",
                    requiredState: (currentState) => currentState.CameraUnlock,
                    nextText: 107,
               },
               {
                    text: "Check camera",
                    requiredState: (currentState) => !currentState.CameraUnlock,
                    nextText: 114,
               }
          ]
     },
     {
          id: 800,
          text: "You take a chance and hide away under the stairs, pressing up hard against the wall of the cupboard. You find a secret passage behind the wall The creature you were evading eventually passes by.",
          options: [
               {
                    text: "Exit the cupboard",
                    nextText: 801,
               },
               {
                    text: "Explore the hidden passage",
                    nextText: 802,
               }
          ]
     },
     {
          id: 801,
          text: "You slowly exit the cupboard, hoping that the creature from ealier doesn't show up again.",
          options: [
               {
                    text: "Head out the back door",
                    nextText: 4,
               },
               {
                    text: "Try to explore more of the church",
                    nextText: 803,

               },
               {
                    text: "Explore the hidden passage anyway",
                    nextText: 802,
               }
          ]
     },
     {
          id: 802,
          text: "You go through the secret passage, leading to a network of underground tunnels so vast that it must cover the entire town. You find what seems to be a small office for maintenance.",
          options: [
               {
                    text: "Keep going down the passage",
                    nextText: 804,
               },
               {
                    text: "Explore the office",
                    nextText: 805,
               }
          ]
     },
     {
          id: 803,
          text: "You explore more of the church, stumbling upon a glass container with an axe inside, reserved for fires.",
          options: [
               {
                    text: "Take the axe",
                    setState: {Axe: true},
                    nextText: 806,
               },
               {
                    text: "Leave it",
                    nextText: 806,
               }
          ]
     },
     {
          id: 804,
          text: "You continue down the underground passage until you feel a chill down your spine. You quickly turn around only to be faced with a tall pale man. His presence is chilling but ethereal, as though he isn't really there.",
          options: [
               {
                    text: "Stay still",
                    nextText: 807,
               },
               {
                    text: "Run away",
                    requiredState: (currentState) => !currentState.Injured,
                    setState: {Injured: true},
                    nextText: 808,
               },
               {
                    text: "Try to run away",
                    requiredState: (currentState) => currentState.Injured,
                    nextText: 809,
               }
          ]

     },
     {
          id: 805,
          text: "You enter the office, finding a desk with some documents on top and two locked containers. Inside the containers are a set of keys and a music box.",
          options: [
               {
                    text: "Read the documents",
                    nextText: 810
               },
               {
                    text: "Try to open the key container",
                    nextText: 811,
               },
               {
                    text: "Try to open the music box container",
                    nextText: 812,
               }
          ]

     },
     {
          id: 806,
          text: "You head towards the back of the church, the rustling sound returns. You decide its best to leave now while you have the chance",
          options: [
               {
                    text: "Leave out the back door",
                    nextText: 4,
               }
          ]
     },
     {
          id: 807,
          text: "The man speaks: 'Answer these three riddles and you may pass. I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
          options: [
               {
                    text: "Echo",
                    nextText: 814,
               },
               {
                    text: "Whisper",
                    nextText: 813,
               },
               {
                    text: "Music",
                    nextText: 813,
               },
               {
                    text: "Thought",
                    nextText: 813,
               }
          ]
     },
     {
          id: 808,
          text: "You try to run away from the man and at first he doesn't persue you. After you make some distance you turn around and see his arm stretching out to grab you. His fingers sink into your shoulder like a hook, drawing lots of blood. You're pulled back towards him.",
          options: [
               {
                    text: "Listen to the man",
                    nextText: 807,
               }
          ]
     },
     {
          id: 809,
          text: "You try to run away but due to your previous injuries the man quickly catches you. You feel the light slowly fade from your eyes",
          options: [
               {
                    text: "...",
                    nextText: -1,
               }
          ]
     },
     {
          id: 810,
          text: "You start to read the documents, hoping to make some sense of what has been happening in this town. They detail a large meteor landing nearby a few years back, not long after strange things started happening. Birds flying away, cattle suddenly dying in mass. That was just the start.",
          options: [
               {
                    text: "Keep reading",
                    nextText: 815,
               },
               {
                    text: "Take the documents with you",
                    setState: {Docs: true},
                    nextText: 816
               }
          ]
     },
     {
          id: 811,
          text: "You go to open the container that holds a key. As you start to touch the lock, the other container which contains a music box locks completely. Looks like you have to live with yoir choice.",
          options: [
          { 
               text: "Open",
               nextText: 817,
          },
          {
               text: "Leave",
               nextText: 821,
          }
          ]
     },
     {
          id: 812,
          text: "You go to open the container that holds a music box. As you start to touch the lock, the other container which contains a key locks completely. Looks like you have to live with yoir choice.",
          options: [
               {
                    text: "Open",
                    nextText: 820,
               },
               {
                    text: "Leave",
                    nextText: 821,
               }
          ]
     },
     {
          id: 813,
          text: "The man speaks: 'Incorrect.' A flash of light, a spark and a loud bang. Then everything goes black",
          options: [
               {
                    text: "...",
                    nextText: -1,
               }
          ]
     },
     {
          id: 814,
          text: "The man speaks: 'Correct, now the next riddle. I can be cracked, made, told, and played. What am I?",
          options: [
               {
                    text: "Joke",
                    nextText: 813,
               },
               {
                    text: "Egg",
                    nextText: 813,
               },
               {
                    text: "Code",
                    nextText: 822,
               },
               {
                    text: "Game",
                    nextText: 813,
               }
          ]
     },
     {
          id: 815,
          text: "You read on. The conditions in the town get worse. People start to go missing. Strange sitings of creatures that can't be explained. There's no pattern to the sitings either. The mayor and her husband insist everything is ok but lock themselves in the town hall. People who haven't gone missing start to leave the town en masse. Seems like the town hall is a good place to check. ",
          options: [
               {
                    text: "Take the documents with you",
                    setState: {Docs: true},
                    nextText: 816
               },
          ]
     },
     {
          id: 816,
          text: "You put the documents in your bag, considering your next move",
          options: [
          {
               text: "Try to open the key container",
               nextText: 811,
          },
          {
               text: "Try to open the music box container",
               nextText: 812,
          },
          {
               text: "Leave the office",
               nextText: 804,
          }
          ]
     },
     {
          id: 817,
          text: "You opened the container and got the key. It has a tag attatched but there is no writing on it. You wonder if there is hidden writing",
          options: [
               {
                    text: "Use your camera on the tag",
                    requiredState: (currentState) => currentState.Camera,
                    nextText: 818,
               },
               {
                    text: "Pocket the key and move on",
                    nextText: 819,
               }
               ]
          }, 
          {
               id: 818,
               text: "You take a picture of the key's tag. The photo develops and shows that the tag includes a place name and and a set of initials: 'Town Hall, H.G'",
               options: [
                    {
                         text: "Pocket the key and move on",
                         setState: {THall: true},
                         setState: {Camera: false},
                         nextText: 819,
                    }
               ]
          },
          {
               id: 819,
               text: "You pocket the key and leave the office, heading back to the tunnels.",
               options: [
                    {
                         text: "Continue",
                         nextText: 804,
                    }
               ]
          },
          {
               id: 820,
               text: "You take the music box and put it in your bag. You're not entirely sure what made you choose it over the key but you hope it was the right choice.",
               options: [
                    {
                         text: "Check the documents.",
                         requiredState: (currentState) => !currentState.Docs,
                         setState: {Containers: true},
                         setState: {MusicBox: true},
                         nextText: 810,
                    },
                    {
                         text: "Leave the office",
                         setState: {Containers: true},
                         setState: {MusicBox: true},
                         nextText: 804,
                    }
               ]
          },
          {
               id: 821,
               text: "You decide to leave the container alone",
               options: [
                    {
                         text: "Check the documents.",
                         requiredState: (currentState) => !currentState.Docs,
                         setState: {Containers: true},
                         nextText: 810,
                    },
                    {
                         text: "Leave the office",
                         setState: {Containers: true},
                         nextText: 804,
                    }
               ]

          },
          {
               id: 822,
               text: "The man speaks: 'Correct, now the next riddle. I'm not alive, but I can grow. I don't have lungs, but I need air. Water is poison to me. What am I?",
               options: [
                    {
                         text: "Ice",
                         nextText: 813,
                    },
                    {
                         text: "Shadows",
                         nextText: 813,
                    },
                    {
                         text: "Plants",
                         nextText: 813,
                    },
                    {
                         text: "Fire",
                         setState: {BasementComplete: true},
                         setState: {ChurchComplete: true},
                         nextText: 823,
                    }

               ]
          },
          {
               id: 823,
               text: "The man speaks: 'Three correct answers. You may pass.' His prescence fades, allowing you to continue. You follow the tunnels until you find a ladder. Going up, you find yourself back near the town's main street.",
               options: [
               {
                    text: "Decide on a new area to explore",
                    nextText: 107,
               },
               {
                    text: "Reconsider your options",
                    nextText: 900,
               }
          ]
          },
          {
               id: 1000,
               text: "The End",
               options: [
                    {
                         text: "Restart?",
                         nextText: -1,
                    }
               ]
          }
]

startGame()