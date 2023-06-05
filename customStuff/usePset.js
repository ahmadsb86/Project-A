import { getStorage } from "./useDB";

export const getQuestion = async (problem_id)=>{
    const res = await getStorage('Problems', problem_id);
    return res;
}

export const searchQuestion = async (rank, topic)=>{
    return ['a', 'b']
}

export const getTopics = async (rank)=>{
    return {
        Iron: ['Variables', 'Loops', 'Conditions'],
        Bronze: ['More stuff', 'other stuff'],
        Silver: ['More stuff', 'other stuff'],
        Gold: ['More stuff', 'other stuff'],
        Platinum: ['More stuff'],
        'loading': []
    }[rank]
}