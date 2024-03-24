import actions from "./GlobalActions";
const { GET_ONBOARDING_BEGIN,
    GET_ONBOARDING_SUCCESS,
    GET_ONBOARDING_FAILURE,
    GET_USER_INFORMATION_BEGIN,
    GET_USER_INFORMATION_SUCCESS,
    GET_USER_INFORMATION_FAILURE,
    SIGNUP_BEGIN,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGIN_BEGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    TODO_BEGIN,
    TODO_SUCCESS,
    TODO_FAILURE,
    LOCATION_SUCCESS,
    TODO_FILTER_BEGIN,
    TODO_FILTER_SUCCESS,
    TODO_FILTER_FAILURE,
    HoURLY_WEATHER_BEGIN,
    HoURLY_WEATHER_SUCCESS,
    HoURLY_WEATHER_FAILURE,
    CURRENT_USER_BEGIN,
    CURRENT_USER_SUCCESS,
    CURRENT_USER_FAILURE,
    CURRENT_USER_LOGOUT
} = actions
export const initialValue = {
    onBoardLoading: false,
    onBoarding: null,
    error: null,
    user: null,
    userLoading: false,
    signupLoading: false,
    loginLoading: false,
    todoLoading: false,
    todos: null,
    location: {},
    hourlyWeather: {},
    hourlyWeatherLoading: false,
    todoFilterLoading: false,
    todoFilter: null,
    currentUserLoading: false,
    currentUser: null,
    colorMode: false,
    signInWithEmailPassword: (email, password) => { },
    signUpWithEmailPassword: (email, password) => { },
    signInWithGoogle: () => { },
    changeColorMode: () => { },
    signInWithFacebook: () => { },
    getTodos: () => { },
    logout: () => { },
    getPermissions: () => { },
    addTodo: (data) => { },
    deleteTodo: (todoId) => { },
    getCurrentUser: () => { },
    updateCurrentUser: (id, data) => { },
    updateTodo: (todoId, updatedTodo) => { },
    getTodosbyDate: (currentDate) => { },
}
const reducer = (state, action) => {
    const { type, data, error } = action
    switch (type) {

        case LOCATION_SUCCESS:
            return {
                ...state,
                location: data,
            }
        case GET_USER_INFORMATION_BEGIN:
            return {
                ...state,
                userLoading: true,
            }
        case GET_USER_INFORMATION_SUCCESS:
            return {
                ...state,
                userLoading: false,
                user: data
            }
        case GET_USER_INFORMATION_FAILURE:
            return {
                ...state,
                userLoading: false,
                error: error
            }
        case GET_ONBOARDING_BEGIN:
            return {
                ...state,
                onBoardLoading: true
            }
        case GET_ONBOARDING_SUCCESS:
            return {
                ...state,
                onBoardLoading: false,
                onBoarding: data
            }
        case GET_ONBOARDING_FAILURE:
            return {
                ...state,
                onBoardLoading: false,
                error: error
            }
        case SIGNUP_BEGIN:
            return {
                ...state,
                signupLoading: true
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                signupLoading: false
            }
        case SIGNUP_FAILURE:
            return {
                ...state,
                signupLoading: false,
                error: error
            }
        case LOGIN_BEGIN:
            return {
                ...state,
                loginLoading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginLoading: false,
                user: data
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                loginLoading: false,
                error: error
            }

        case TODO_BEGIN:
            return {
                ...state,
                todoLoading: true
            }
        case TODO_SUCCESS:
            return {
                ...state,
                todoLoading: false,
                todos: data
            }
        case TODO_FAILURE:
            return {
                ...state,
                todoLoading: false,
                error: error
            }
        case TODO_FILTER_BEGIN:
            return {
                ...state,
                todoFilterLoading: true
            }
        case TODO_FILTER_SUCCESS:
            return {
                ...state,
                todoFilterLoading: false,
                todoFilter: data
            }
        case TODO_FILTER_FAILURE:
            return {
                ...state,
                todoFilterLoading: false,
                error: error
            }
        case HoURLY_WEATHER_BEGIN:
            return {
                ...state,
                hourlyWeatherLoading: true
            }
        case HoURLY_WEATHER_SUCCESS:
            return {
                ...state,
                hourlyWeatherLoading: false,
                hourlyWeather: data
            }
        case HoURLY_WEATHER_FAILURE:
            return {
                ...state,
                hourlyWeatherLoading: false,
                error: error
            }
        case CURRENT_USER_BEGIN:
            return {
                ...state,
                currentUserLoading: true
            }
        case CURRENT_USER_SUCCESS:
            return {
                ...state,
                currentUserLoading: false,
                currentUser: data
            }
        case CURRENT_USER_FAILURE:
            return {
                ...state,
                currentUserLoading: false,
                error: error
            }
        case CURRENT_USER_LOGOUT:
            return {
                ...initialValue
            }
        default:
            return state
    }
}
export default reducer