class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "4d56d901-fb31-44ec-9737-2c59f5a75d18",
      },
    }).then((res) => res.json());
  }

  // other methods for working with the API
}

export default Api;
