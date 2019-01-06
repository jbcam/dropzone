export default class BinaryService {

    constructor() {
        this.baseUrl = 'https://fhirtest.uhn.ca/baseDstu3/Binary';
    }

    upload(file) {
        return fetch(this.baseUrl, { method: 'POST', body: file })
            .then(response => {
                return response.status == 201
            });
    }

    findTotal() {
      return fetch(`${this.baseUrl}?_summary=count`)
      .then(response => response.json())
      .then((data) => {
          return data.total;
      })
    }
}
