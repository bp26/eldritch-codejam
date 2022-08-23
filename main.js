import ancientsData from './data/ancients.js'
import greenCards from './data/mythicCards/green/index.js'
import blueCards from './data/mythicCards/blue/index.js'
import brownCards from './data/mythicCards/brown/index.js'

let game_on = false
let current_ancient = 'azathoth'
let current_difficulty = 'easy'
const stagesArray = []


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


/*-------------- Get arrays for difficulty options --------------------*/

function getDifficultyArrays() {                             

    const initialArrays = shuffleInitialArrays()
    const cardsCount = countCards()
    switch(current_difficulty) {
        case 'very easy':
            return getHighArrays('easy')    // start with easy, then normal
        case 'easy':
            return getMiddleArrays('hard')  // not hard
        case 'normal':
            return getNormalArrays()
        case 'hard':
            return getMiddleArrays('easy')  // not easy
        case 'very hard':
            return getHighArrays('hard')   // start with hard, then normal
    }


    function getNormalArrays() {                                   // for normal difficulty
        return {
            'greenCards':  _.shuffle(initialArrays.greenCards.slice(0, cardsCount.greenCards)),
            'blueCards':  _.shuffle(initialArrays.blueCards.slice(0, cardsCount.blueCards)),
            'brownCards':  _.shuffle(initialArrays.brownCards.slice(0, cardsCount.brownCards))
        }
    }
    

    function getMiddleArrays(difficulty) {                         // for easy and hard difficulties
        const green = initialArrays.greenCards.filter(item => item.difficulty !== difficulty)
        const blue = initialArrays.blueCards.filter(item => item.difficulty !== difficulty)
        const brown = initialArrays.brownCards.filter(item => item.difficulty !== difficulty)
        return {
            'greenCards':  _.shuffle(green.slice(0, cardsCount.greenCards)),
            'blueCards':  _.shuffle(blue.slice(0, cardsCount.blueCards)),
            'brownCards':  _.shuffle(brown.slice(0, cardsCount.brownCards))
        }
    }
    

    function getHighArrays(difficulty) {                         // for very easy and very hard difficulties
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
}

/*-------------------------------------------------------------*/


function getStages() {
    const current_object = getAncient()
    const finalArray = getDifficultyArrays()
    


    function setStage(stage) {
        const stageData = current_object[stage]
        const stageArray = []
        for (let key in stageData) {
            for (let i = 0; i < stageData[key]; i++) {
                stageArray.push(finalArray[key].pop())
            }
        }
        return _.shuffle(stageArray)
    }

    stagesArray.push(setStage('firstStage'), setStage('secondStage'), setStage('thirdStage'))
}

function popCards() {
    stagesArray.forEach(stage => {
        stage.pop()
    })
}



getStages()
console.log(stagesArray)












