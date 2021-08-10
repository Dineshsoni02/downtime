const userData = JSON.parse(localStorage.getItem("downTime")) || {};

const initialState = {
  Auth: userData._id ? true : false,
  uid: userData._id,
  name: userData.name,
  email: userData.email,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      const myState = { ...state };
      myState.Auth = true;
      myState.uid = action.uid;
      myState.name = action.name;
      myState.email = action.email;
      return myState;
    }
    case "LOGOUT": {
      const myState = { ...state };
      myState.auth = false;
      myState.name = "";
      myState.id = "";
      myState.email = "";
      localStorage.removeItem("downTime");
      return myState;
    }
    default:
      const myState = { ...state };
      return myState;
  }
};
export default reducer;
