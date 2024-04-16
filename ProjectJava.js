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
          text: "TEST - You wander through the foggy streets of Havenbrook. You are a stranger here and the air is heavy with tension. Standing by a the half-shattered windows of a shop, you get the feeling you're being watched. You spot a nearby church.",
          options: [
               {
                    text: "Take refuge in the church",
                    setState: {ChurchVisit: true},
                    nextText: 2,
               },
               {
                    text: "Keep wandering the streets",
                    nextText: 102,
               },
               {
                    text: "Check your reflection in the window",
                    nextText: 202,
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
                    requiredState: (currentState) => !currentState.Injured,
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
          text: "You slowly back away from the shaking bin, deciding that finding out what's inside isn't worth the trouble",
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
          text: "You decide to stand your ground agaist the bats as they swarm you",
          options: [
               {
                    text: "Swing wildly",
                    nextText: 108,
               },
               {
                    text: "Protect your vital points",
                    nextText: 109,
               },
               {
                    text: "Attack patiently",
                    nextText: 110,
               },
               {
                    text: "Try to run",
                    nextText: 111,
               }
          ]
     },
     {
          id: 106,
          text: "In a panic, you flee from the swarm of bats, running to a nearby house. You quickly shut the door on them, pressing your back against the door until they're gone"
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
                    requiredState: (currentState) => currentState.ChurchVisit,
                    nextText: 3,
               },
               {
                    text: "Run out the back door",
                    requiredState: (currentState) => currentState.ChurchVisit,
                    setState: {ChurchVisit: false},
                    nextText: 4,
               },
               {
                    text: "Run up the stairs",
                    requiredState: (currentState) => currentState.ChurchVisit,
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
                    text: "Keep walking",
                    nextText: 11,
               },
               {
                    text: "Check camera",
                    nextText: 13,
               }
          ]
     },
     {
          id: 8,
          text: "You decide to take the right path and continue down it. The tension in the air is thick. You pass a large slice of seemingly human flesh. Upon closer inspection, it appears to be several smaller pieces of dead flesh stitched together crudely. A you walk, you decide to leave it be. You reflect on the circumstances that led you here. For months reports had been pouring out of this isolated town of empty streets and screams in the night. The fog never seeming to fade. You came here in search of a story, armed with nothing but your camera. You begin to question if this was a good idea",
          options: [
               {
                    text: "Keep walking",
                    nextText: 12,
               },
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
          text: "Left",
     },
     {
          id: 12,
          text: "Right",
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