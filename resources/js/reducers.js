export function rootReducer(
    state = { timeLine: [], genres: [], bookDetail: {} },
    action
) {
    switch(action.type) {
        case "SET_TIMELINE":
            return { ...state, timeLine: action.timeLine };
        
        case "SET_GENRES":
            return { ...state, genres: action.genres };

        case "SET_BOOK_DETAIL":
            return { ...state, bookDetail: action.bookDetail };
        case "SET_AUTH_TOKEN":
            return { ...state, token: action.token };
    }
    return state;
}
