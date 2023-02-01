import { createStore } from 'redux'
import chgThemeReducer from "./reducers/chgThemeReducer";
const store = createStore(chgThemeReducer);

export default store