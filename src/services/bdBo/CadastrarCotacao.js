import axios from "axios";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
};

const apiCheckout = axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/https://bidu-api-banco.thinkserver.thinkseg.com/auto/",
});

export const CadastrarCotacaoBd = (quote, body) =>
  apiCheckout
    .post(quote, {
      method: "POST",
      headers,
      body: body,
    })
    .then((res) => res.data);
