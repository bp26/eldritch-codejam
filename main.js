import ancientsData from './data/ancients.js'
import greenCards from './data/mythicCards/green/index.js'
import blueCards from './data/mythicCards/blue/index.js'
import brownCards from './data/mythicCards/brown/index.js'


let current_ancient = 'azathoth'
let current_difficulty = 'hard'


function getAncient() {
    return ancientsData.filter(item => {
        return item.id === current_ancient
    })[0]
}

function countCards() {
    const current_object = getAncient()
    return {
        'greenCards': current_object.firstStage.greenCards + current_object.secondStage.greenCards + current_object.thirdStage.greenCards,
        'blueCards': current_object.firstStage.blueCards + current_object.secondStage.blueCards + current_object.thirdStage.blueCards,
        'brownCards': current_object.firstStage.brownCards + current_object.secondStage.brownCards + current_object.thirdStage.brownCards   
    }
}

function shuffleInitialArrays() { 
    return {
        'greenCards': _.shuffle(greenCards),
        'blueCards': _.shuffle(blueCards),
        'brownCards': _.shuffle(brownCards)
    }
}

function getDifficultyArrays() {
    const initialArrays = shuffleInitialArrays()
    const cardsCount = countCards()
    switch(current_difficulty) {
        case 'very easy':
            return getHighArrays(initialArrays, cardsCount, 'easy')
        case 'easy':
            return getMiddleArrays(initialArrays, cardsCount, 'hard')
        case 'normal':
            return getNormalArrays(initialArrays, cardsCount)
        case 'hard':
            return getMiddleArrays(initialArrays, cardsCount, 'easy')
        case 'very hard':
            return getHighArrays(initialArrays, cardsCount, 'hard')
    }
}

function getNormalArrays(initialArrays, cardsCount) {
    return {
        'greenCards':  _.shuffle(initialArrays.greenCards.slice(0, cardsCount.greenCards)),
        'blueCards':  _.shuffle(initialArrays.blueCards.slice(0, cardsCount.blueCards)),
        'brownCards':  _.shuffle(initialArrays.brownCards.slice(0, cardsCount.brownCards))
    }
}

function getMiddleArrays(initialArrays, cardsCount, difficulty) {
    const green = initialArrays.greenCards.filter(item => item.difficulty !== difficulty)
    const blue = initialArrays.blueCards.filter(item => item.difficulty !== difficulty)
    const brown = initialArrays.brownCards.filter(item => item.difficulty !== difficulty)

    return {
        'greenCards':  _.shuffle(green.slice(0, cardsCount.greenCards)),
        'blueCards':  _.shuffle(blue.slice(0, cardsCount.blueCards)),
        'brownCards':  _.shuffle(brown.slice(0, cardsCount.brownCards))
    }
}

function getHighArrays(initialArrays, cardsCount, difficulty) {

    const greenCards = initialArrays.greenCards
    const blueCards = initialArrays.blueCards
    const brownCards = initialArrays.brownCards

    function filterArrays (array, arrayName, cardsCount) {
        const difficultyArray = array.filter(item => item.difficulty === difficulty)
        if (difficultyArray.length < cardsCount[arrayName]) {
            return [...difficultyArray.slice(0), ...array.filter(item => item.difficulty === 'normal').slice(0, cardsCount[arrayName] - difficultyArray.length)]
        } else {
            return difficultyArray.slice(0, cardsCount[arrayName])
        }
    }

    return {
        'greenCards':  _.shuffle(filterArrays(greenCards, 'greenCards', cardsCount)),
        'blueCards':  _.shuffle(filterArrays(blueCards, 'blueCards', cardsCount)),
        'brownCards': _.shuffle(filterArrays(brownCards, 'brownCards', cardsCount))
    }
}


console.log(countCards())
console.log(getHighArrays(shuffleInitialArrays(), countCards(), 'easy'))


function getFinalArrays() {
    
}











