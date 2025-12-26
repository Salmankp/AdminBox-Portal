export const setToaster = (data) => ({
    type: 'setToaster',
    data
  });

  export const unsetToaster = () => ({
    type: 'unsetToaster'
  });
  
  export const loggedIn = () => ({
    type: 'LoggedIn'
  });
  
  export const loggedOut = () => ({
    type: 'LoggedOut'
  });