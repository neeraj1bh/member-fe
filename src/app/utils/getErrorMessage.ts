const getErrorMessage = (error: any) => {
  if (error.response) {
    return error.response.data.message.toString();
  }
  if (error.request) {
    return "Failed to send request";
  }
  return error.message;
};

export default getErrorMessage;
