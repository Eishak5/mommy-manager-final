const actions = {
    GET_ONBOARDING_BEGIN: "GET_ONBOARDING_BEGIN",
    GET_ONBOARDING_SUCCESS: "GET_ONBOARDING_SUCCESS",
    GET_ONBOARDING_FAILURE: "GET_ONBOARDING_FAILURE",
    GET_USER_INFORMATION_BEGIN: "GET_USER_INFORMATION_BEGIN",
    GET_USER_INFORMATION_SUCCESS: "GET_USER_INFORMATION_SUCCESS",
    GET_USER_INFORMATION_FAILURE: "GET_USER_INFORMATION_FAILURE",
    SIGNUP_BEGIN: "SIGNUP_BEGIN",
    SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
    SIGNUP_FAILURE: "SIGNUP_FAILURE",
    LOGIN_BEGIN: "LOGIN_BEGIN",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_FAILURE",
    TODO_BEGIN: "TODO_BEGIN",
    TODO_SUCCESS: "TODO_SUCCESS",
    TODO_FAILURE: "TODO_FAILURE",
    TODO_FILTER_BEGIN:"TODO_FILTER_BEGIN",
    TODO_FILTER_SUCCESS:"TODO_FILTER_SUCCESS",
    TODO_FILTER_FAILURE:"TODO_FILTER_FAILURE",
    LOCATION_SUCCESS: "LOCATION_SUCCESS",
    HoURLY_WEATHER_BEGIN:"HoURLY_WEATHER_BEGIN",
    HoURLY_WEATHER_SUCCESS:"HoURLY_WEATHER_SUCCESS",
    HoURLY_WEATHER_FAILURE:"HoURLY_WEATHER_FAILURE",
    CURRENT_USER_BEGIN:"CURRENT_USER_BEGIN",
    CURRENT_USER_SUCCESS:"CURRENT_USER_SUCCESS",
    CURRENT_USER_FAILURE:"CURRENT_USER_FAILURE",
    CURRENT_USER_LOGOUT:"CURRENT_USER_LOGOUT",

    getOnBoardingBegin: () => ({ type: actions.GET_ONBOARDING_BEGIN }),
    getOnBoardingSuccess: (data) => ({ type: actions.GET_ONBOARDING_SUCCESS, data }),
    getOnBoardingFailure: (error) => ({ type: actions.GET_ONBOARDING_FAILURE, error }),
    getUserInformationBegin: () => ({ type: actions.GET_USER_INFORMATION_BEGIN }),
    getUserInformationSuccess: (data) => ({ type: actions.GET_USER_INFORMATION_SUCCESS, data }),
    getUserInformationFailure: (error) => ({ type: actions.GET_USER_INFORMATION_FAILURE, error }),
    signupBegin: () => ({ type: actions.SIGNUP_BEGIN }),
    signupSuccess: (data) => ({ type: actions.SIGNUP_SUCCESS, data }),
    signupFailure: (error) => ({ type: actions.SIGNUP_FAILURE, error }),
    loginBegin: () => ({ type: actions.LOGIN_BEGIN }),
    loginSuccess: (data) => ({ type: actions.LOGIN_SUCCESS, data }),
    loginFailure: (error) => ({ type: actions.LOGIN_FAILURE, error }),
    todoBegin: () => ({ type: actions.TODO_BEGIN }),
    todoSuccess: (data) => ({ type: actions.TODO_SUCCESS, data }),
    todoFailure: (error) => ({ type: actions.TODO_FAILURE, error }),
    todoFilterBegin: () => ({ type: actions.TODO_FILTER_BEGIN }),
    todoFilterSuccess: (data) => ({ type: actions.TODO_FILTER_SUCCESS, data }),
    todoFilterFailure: (error) => ({ type: actions.TODO_FILTER_FAILURE, error }),  
    locationSuccess: (data) => ({ type: actions.LOCATION_SUCCESS, data }),
    hourlyWeatherBegin: () => ({ type: actions.HoURLY_WEATHER_BEGIN }),
    hourlyWeatherSuccess: (data) => ({ type: actions.HoURLY_WEATHER_SUCCESS, data }),
    hourlyWeatherFailure: (error) => ({ type: actions.HoURLY_WEATHER_FAILURE, error }),
    currentUserBegin: () => ({ type: actions.CURRENT_USER_BEGIN }),
    currentUserSuccess: (data) => ({ type: actions.CURRENT_USER_SUCCESS, data }),
    currentUserFailure: (error) => ({ type: actions.CURRENT_USER_FAILURE, error }),
    currentUserLogout: () => ({ type: actions.CURRENT_USER_LOGOUT }),
    
}

export default actions