var initialState = {
    data: 12
}

export const ApplicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SAMPLE_TYPE":
            return {
                ...state, data: action.payload
            }

        default:
            return state;
    }
}