/*------------------Imports--------------------*/

import ancientsData from './data/ancients.js'
import difficulties from './data/difficulties.js'
import greenCards from './data/mythicCards/green/index.js'
import blueCards from './data/mythicCards/blue/index.js'
import brownCards from './data/mythicCards/brown/index.js'

/*----------Select elements from DOM------------*/

const ancientCollection = document.querySelectorAll('.ancient')
const difficultyList = document.querySelector('.difficulty-list')
const difficultyChoiceCollection = document.querySelectorAll('.difficulty-choice')
const cardMainFeatures = document.querySelector('.card-main-features')
const cardShuffleButton = document.querySelector('.card-shuffle-button')

const cardPopButoon = document.querySelector('.card-pop-button')
const cardReveal = document.querySelector('.card-reveal')

const stageTitleCollection = document.querySelectorAll('.stage-title')
const countGreenCollection = document.querySelectorAll('.count-green')
const countBlueCollection = document.querySelectorAll('.count-blue')
const countBrownCollection = document.querySelectorAll('.count-brown')

/*-----------------Variables---------------------*/

let game_on = false
let current_ancient
let current_difficulty
const stagesArray = []

/*-----------------Functions-----------------------*/

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



function setCardImage() {
    if (stagesArray[2].length === 0) {return false}
    const card = popCards()
    console.log(`${card.id} - ${card.difficulty} difficulty`)

    const img = new Image()
    img.src = card.cardFace;
    img.onload = () => {
    cardReveal.style.backgroundImage = `url('${img.src}')`;
    };

    function popCards() {
        if (stagesArray[0].length > 0) {
            return stagesArray[0].pop()
        } else if (stagesArray[1].length > 0) {
            return stagesArray[1].pop()
        } else if (stagesArray[2].length > 0) {
            return stagesArray[2].pop()
        } 
    }
}

function trackCards() {
    stagesArray.forEach((stage, index) => {
        let green = 0
        let blue = 0
        let brown = 0

        stage.forEach(card => {
            if (card.color === 'green') {green++}
            else if (card.color === 'blue') {blue++}
            else if (card.color === 'brown') {brown++}
        })
        
        setCardCount()

        function setCardCount() {
            countGreenCollection[index].textContent = green
            countBrownCollection[index].textContent = brown
            countBlueCollection[index].textContent = blue
        }
    })
}

function trackStages() {
    stagesArray.forEach((stage, index) => {
        stage.length === 0 ? stageTitleCollection[index].classList.add('stage-title-empty') : stageTitleCollection[index].classList.remove('stage-title-empty')
    })
}

function cleanStagesArray() {
    stagesArray.length = 0
}

function setPopButtonBg() {
    if (stagesArray[2].length !== 0) {
        cardPopButoon.style.backgroundImage = "url('./assets/mythicCardBackground.png')"; 
    } else {
        cardPopButoon.style.backgroundImage = 'none'
    }
}

/*----------------------Event-listeners--------------------*/

ancientCollection.forEach((ancient, index) => {
    ancient.addEventListener('click', () => {
        current_ancient = ancientsData[index].id
        setHighlightForAncient()

        difficultyList.classList.remove('difficulty-list-hidden')
        if (game_on === true) {cardShuffleButton.classList.remove('card-shuffle-button-hidden')}
        cardMainFeatures.classList.add('card-main-features-hidden')

        cardReveal.style.backgroundImage = 'none';
    })

    function setHighlightForAncient() {
        ancientCollection.forEach((newAncient, newIndex) =>  {
            newIndex === index ? newAncient.classList.add('ancient-chosen') : newAncient.classList.remove('ancient-chosen') 
        })
    }
})

difficultyChoiceCollection.forEach((difficulty, index) => {
    difficulty.addEventListener('click', () => {
        current_difficulty = difficulties[index].id
        setHighlightForDifficultyChoice()

        cardShuffleButton.classList.remove('card-shuffle-button-hidden')
        cardMainFeatures.classList.add('card-main-features-hidden')

        cardReveal.style.backgroundImage = 'none';

        game_on = true
    })

    function setHighlightForDifficultyChoice() {
        difficultyChoiceCollection.forEach((newDifficulty, newIndex) =>  {
            newIndex === index ? newDifficulty.classList.add('difficulty-choice-chosen') : newDifficulty.classList.remove('difficulty-choice-chosen') 
        })
    }
})

cardShuffleButton.addEventListener('click', () => {
    cleanStagesArray()
    getStages()
    trackCards()
    trackStages()
    setPopButtonBg()

    cardShuffleButton.classList.add('card-shuffle-button-hidden')
    cardMainFeatures.classList.remove('card-main-features-hidden')
})

cardPopButoon.addEventListener('click', () => {
    setCardImage()
    trackCards()
    trackStages()
    setPopButtonBg()
})













