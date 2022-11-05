export const sample = () => {
    return (dispatch) => {
        dispatch({ type: "SAMPLE_TYPE", payload: 10 })
    }
}