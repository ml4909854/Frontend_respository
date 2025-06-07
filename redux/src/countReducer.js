


const countReducer = (state = 0 , action)=>{
        switch (action.type) {
            case "I":
                return state+1
                break;
            case "D":
                return state-1
                break;
            default:
                 return state
                break;
        }
}

export default countReducer