import { DARK, LIGHT, TOGGLE } from "../actions/actions";


const DarkModeReducer = (state = { darkMode: false }, action) => {
    switch (action.type) {
        case LIGHT: {
            return {
                darkMode: false,
            };
        }
        case DARK: {
            return {
                darkMode: true,
            };
        }
        case TOGGLE: {
            return {
                darkMode: !state.darkMode,
            };
        }
        default:
            return state;
    }
};

export default DarkModeReducer;