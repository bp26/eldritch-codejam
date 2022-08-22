import ancientsData from './data/ancients.js'

let current_ancient = 'azathoth'


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

console.log(countCards())






