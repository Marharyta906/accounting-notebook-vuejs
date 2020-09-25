import http from "../http-common";

class TransactionsDataService {
  getAll() {
    return http.get("/transactions");
  }

  get(id) {
    return http.get(`/transactions/${id}`);
  }

}

export default new TransactionsDataService();