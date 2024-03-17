export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';


export interface CounterState {
    data:number;
    title:string;
}

export interface counterReduceActionInput{
    type:string;
}

const initialState:CounterState={
    data:42,
    title:'Yarc'
}

export default function counterReducer(state=initialState,action:counterReduceActionInput){
    console.log(action)
    switch(action.type){
        case INCREMENT_COUNTER:
            return {...state,data:state.data+1};
        case DECREMENT_COUNTER:
            return {...state,data:state.data-1};
    }
    return state;

}