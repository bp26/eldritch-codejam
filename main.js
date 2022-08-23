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
            return getVeryArrays(initialArrays, cardsCount, 'easy')
        case 'easy':
            return getEasyArrays(initialArrays, cardsCount)
        case 'normal':
            return getNormalArrays(initialArrays, cardsCount)
        case 'hard':
            return getHardArrays(initialArrays, cardsCount)
        case 'very hard':
            return gerVeryHardArrays(initialArrays, cardsCount, 'hard')
    }
}

function getVeryArrays(initialArrays, cardsCount, difficulty) {

    const greenCards = initialArrays.greenCards
    const blueCards = initialArrays.blueCards
    const brownCards = initialArrays.brownCards

    console.log(blueCards.filter(item => item.difficulty === 'easy'))

    function filterArrays (array, arrayName, cardsCount) {
        if (array.length < cardsCount[arrayName]) {
            return array.filter(item => item.difficulty === difficulty).slice(0).concat(array.filter(item => item.difficulty === 'normal').slice(0, (cardsCount[arrayName] - array.length - 1)))
        } else {
            return array.filter(item => item.difficulty === 'easy').slice(0, cardsCount[arrayName])
        }
    }

    return {
        'greenCards':  _.shuffle(filterArrays(greenCards, 'greenCards', cardsCount)),
        'blueCards':  _.shuffle(filterArrays(blueCards, 'blueCards', cardsCount)),
        'brownCards': _.shuffle(filterArrays(brownCards, 'brownCards', cardsCount))
    }
}

function getEasyArrays(initialArrays, cardsCount) {
    const green = initialArrays.greenCards.filter(item => item.difficulty !== 'hard')
    const blue = initialArrays.blueCards.filter(item => item.difficulty !== 'hard')
    const brown = initialArrays.brownCards.filter(item => item.difficulty !== 'hard')

    return {
        'greenCards':  _.shuffle(green.slice(0, cardsCount.greenCards)),
        'blueCards':  _.shuffle(blue.slice(0, cardsCount.blueCards)),
        'brownCards':  _.shuffle(brown.slice(0, cardsCount.brownCards))
    }
}

function getNormalArrays(initialArrays, cardsCount) {
    return {
        'greenCards':  _.shuffle(initialArrays.greenCards.slice(0, cardsCount.greenCards)),
        'blueCards':  _.shuffle(initialArrays.blueCards.slice(0, cardsCount.blueCards)),
        'brownCards':  _.shuffle(initialArrays.brownCards.slice(0, cardsCount.brownCards))
    }
}

function getHardArrays(initialArrays, cardsCount) {
    const green = initialArrays.greenCards.filter(item => item.difficulty !== 'easy')
    const blue = initialArrays.blueCards.filter(item => item.difficulty !== 'easy')
    const brown = initialArrays.brownCards.filter(item => item.difficulty !== 'easy')

    return {
        'greenCards':  _.shuffle(green.slice(0, cardsCount.greenCards)),
        'blueCards':  _.shuffle(blue.slice(0, cardsCount.blueCards)),
        'brownCards':  _.shuffle(brown.slice(0, cardsCount.brownCards))
    }
}

function getVeryHardArrays(initialArrays, cardsCount) {

}

console.log(countCards())
console.log(getVeryArrays(shuffleInitialArrays(), countCards(), 'easy'))


function getFinalArrays() {
    
}












