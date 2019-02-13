import { TOGGLE_TABLE_EDITING } from '../actions/appStateActions';

const initialState = {
  tableEditing: false,
};
const appStateReducer = (preState = initialState, action) => {
  switch (action.type) {
    case TOGGLE_TABLE_EDITING:
      return Object.assign({}, preState, {
        tableEditing: !preState.tableEditing,
      });
    default:
      return initialState;
  }
};

export default appStateReducer;
