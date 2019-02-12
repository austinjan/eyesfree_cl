import {} from '../actions';

const initialState = {
  devices: [{}],
};
const deviceSettingReducer = (preState = initialState, action) => {
  switch (action) {
    case ADD_DEVICE:
    // return Object.assign({}, preState, { authenticated: true });
    case SCAN_DEVICE:
      const account = action.data || null;
    // return Object.assign({}, preState, { account });
    case SAVE_DEVICE:
    default:
      return initialState;
  }
};

export default deviceSettingReducer;
