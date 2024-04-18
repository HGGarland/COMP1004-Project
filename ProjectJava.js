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
                    nextText: 250,
               },
               {
                    text: "Head back to the main street",
                    setState: {Camera: true},
                    nextText: 107,
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
                    nextText: 250,
               },
               {
                    text: "Head back to the main street",
                    setState: {Camera: true},
                    nextText: 107,
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
          text: "You take a picture of the key's tag. The photo develops and shows that the tag reads: 'Town Hall'",
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
                    nextText: 107,
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
]

startGame()