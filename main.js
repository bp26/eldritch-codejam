import ancientsData from './data/ancients.js'
import greenCards from './data/mythicCards/green/index.js'
import blueCards from './data/mythicCards/blue/index.js'
import brownCards from './data/mythicCards/brown/index.js'



let current_ancient = 'azathoth'
let current_difficulty = 'normal'


function getAncient() {
    return ancientsData.filter(item => {
        return item.id === current_ancient
    })[0]
}

function countCards() {
    const current_object = getAncient()
    return {
        'greenCardsCount': current_object.firstStage.greenCards + current_object.secondStage.greenCards + current_object.thirdStage.greenCards,
        'blueCardsCount': current_object.firstStage.blueCards + current_object.secondStage.blueCards + current_object.thirdStage.blueCards,
        'brownCardsCount': current_object.firstStage.brownCards + current_object.secondStage.brownCards + current_object.thirdStage.brownCards   
    }
}

function shuffleInitialArrays() { 
    return {
        'greenCards': _.shuffle(greenCards),
        'blueCards': _.shuffle(blueCards),
        'brownCards': _.shuffle(brownCards)
    }
}

function getFinalArrays() {
    const cardsCount = countCards()
    const initialArrays = shuffleInitialArrays()
    switch(current_difficulty) {
        case 'normal':
            return getNormalArray(cardsCount, initialArrays)
    }
}

function

function getNormalArray(cardsCount, initialArrays) {
    const green = []
    const blue = []
    const brown = []


    for (let i = 0; i < cardsCount.greenCardsCount; i++) {
        green.push(initialArrays.greenCards.pop())
    } 
    for (let i = 0; i < cardsCount.blueCardsCount; i++) {
        green.push(initialArrays.blueCards.pop())
    } 
    for (let i = 0; i < cardsCount.brownCardsCount; i++) {
        green.push(initialArrays.greenCards.pop())
    } 
}

console.log(getFinalArrays())








