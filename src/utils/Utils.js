// define a function for changing the button text. It accepts 4 params (the 2 last are optional with default texts)
export function renderLoading(
  isLoading,
  button,
  buttonText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

// define a universal function that accepts a request function, event and a default loading text
function handleSubmit(request, evt, loadingText = "Saving...") {
  // You need to prevent the default action in any submit handler
  evt.preventDefault(); // the button is always available inside `event` as `submitter`

  const submitButton = evt.submitter; // fix the initial button text
  const initialText = submitButton.textContent; // change the button text before requesting
  renderLoading(true, submitButton, initialText, loadingText);
  // call the request function to be able to use the promise chain
  request()
    .then(() => {
      // any form should be reset after a successful response
      // evt.target is the form in any submit handler
      evt.target.reset();
    }) // console.error is used to handle errors if you don’t have any other ways for that
    // we need to catch possible errors
    .catch(console.error) // and in finally we need to stop loading
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}
