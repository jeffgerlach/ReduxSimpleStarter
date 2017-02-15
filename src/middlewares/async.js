export default function({ dispatch }) {
  return next => action => {
    // if action doesn't have payload or .then property, don't care, forward on
    if(!action.payload || !action.payload.then) {
      return next(action);
    }

    //make sure the action's promise resolves
    action.payload
      .then(function(response) {
        // create a new action with the old type, but replace
        // the promise with the response data
        const newAction = { ...action, payload: response };
        // dispatch action from very top of the middlewares again
        dispatch(newAction);
      });
  }
}
