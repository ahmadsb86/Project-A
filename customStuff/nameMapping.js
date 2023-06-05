const rankMap = (inp)=>{
    const map = {
        'iron1': 'Iron 1',
        'iron2': 'Iron 2',
        'iron3': 'Iron 3',
        'bronze1': 'Bronze 1',
        'bronze2': 'Bronze 2',
        'bronze3': 'Bronze 3',
        'silver1': 'Silver 1',
        'silver2': 'Silver 2',
        'silver3': 'Silver 3',
        'gold1': 'Gold 1',
        'gold2': 'Gold 2',
        'gold3': 'Gold 3',
        'platinum1': 'Platinum 1',
        'platinum2': 'Platinum 2',
        'platinum3': 'Platinum 3',
        'loading': 'Loading ...',
        'unranked': 'Unranked'
    }

    return map[inp]
}

const ranks = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum']

export {rankMap, ranks};