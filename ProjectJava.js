const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
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
                    nextText: 250,
               },
               {
                    text: "Exit the house through the back",
                    next: 112,
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
                    nextText: 250,
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
                    nextText: 114,
               }
          ]
     },
     {
          id: 113,
          text: "You look inside the bin and find a small crowbar. Would you like to take it with you?",
          options: 
          [
               {
                    text: "Yes",
                    requiredState: (currentState) => !currentState.Crowbar,
                    setState: {Crowbar: true},
                    nextText: 4764,
               },
               {
                    text: "No",
                    requiredState: (currentState) => !currentState.Crowbar,
                    nextText: 9839999,
               },
               {
                    text: "...",
                    requiredState: (currentState) => currentState.Crowbar,
                    nextText: 738627627637,
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
          options:
          [
               {
                    text: "Go back inside the house",
                    nextText: 11,
               },
               {
                    text: "Head back to the main street",
                    nextText: 12,
               }

          ]
     },
     {
     id: 117,
          text: "The shutter clicks. You wait for the film to develop. The photograph comes out, showing your hand but slathered in blood, creeping down your wrists. You drop the photo out of fear and try to not think about it. You have enough film left for one more photo.",
          options:
          [
               {
                    text: "Go back inside the house",
                    nextText: 11,
               },
               {
                    text: "Head back to the main street",
                    nextText: 12,
               }

          ]
     },
     {
          id: 202,
          text: "It's you.",
          options: [
               {
                    text: "Take a closer look",
                    nextText: 203,
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
                    text: "Run up the stairs",
                    nextText: 5,
               }
          ]

     },
     {
          id: 3,
          text: "You turn around and are faced by a huge, groaning blob of flesh. Stitches cover its body connecting multiple shriveled heads. Its large claw-like hands reach towards you, slashing your arm. Blood comes gushing out of you",
          options: [
               {
                    text: "Try to fight the creature",
                    nextText: 6,
               },
               {
                    text: "Run up the stairs",
                    nextText: 5,
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
                    text: "Close your eyes",
                    nextText: 10,
               },
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
                    nextText: 13,
               }
          ]
     },
     {
          id: 8,
          text: "You decide to take the right path and continue down it. The tension in the air is thick. You pass a large slice of seemingly human flesh. Upon closer inspection, it appears to be several smaller pieces of dead flesh stitched together crudely. As you walk, you decide to leave it be. You reflect on the circumstances that led you here. For months reports had been pouring out of this isolated town of empty streets and screams in the night. The fog never seeming to fade. You came here in search of a story, armed with nothing but your camera. You begin to question if this was a good idea",
          options: [
               {
                    text: "Check camera",
                    nextText: 13,
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
                    nextText: 999,
               }
          ]
     },
     {
          id: 12,
          text: "You continue down the right path following it. It heads back to the main street",
          options: [
               {
                    text: "Continue back to the main street",
               },
               {
                    text: "Reconsider your options",
                    nextText: 999,
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
                    nextText: 11,
               },
               {
                    text: "Continue, following the right path",
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
                    nextText: 11,
               },
               {
                    text: "Continue, following the right path",
                    nextText: 12,
               }

          ]
     },
]

startGame()