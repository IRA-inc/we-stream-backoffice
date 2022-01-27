
export const handleAppError = (response) => {
  if (response && response.data) {
    const data = response.data.data instanceof Array
      ? response.data.data
      : [response.data.data];
    if (data) {
      // @ts-ignore
      let message = data;
      if (message) {
        return message;
      }
    }
  }
  if (navigator && navigator.onLine) {
    return 'An error has occured, please contact VosPlay custumer support'
  }
  return 'Error, Please Make sure you are connected to the internet';
};