import { ADD_LEAD } from "./types";
// import * as API from "../../services/bd/CadastrarCotacao";

const addLead = (pre_lead) => ({
  type: ADD_LEAD,
  pre_lead,
});

const endereco = {
  cep: "12345-678",
  rua: "Rua Teste",
  bairro: "Bairro Teste",
  numero: "123",
  complemento: "BL A AP 10",
  cidade: "São Paulo",
  estado: "SP",
};

export const adicionarLeadCotacao = () => {
  return (dispatch) => {
    // dispatch(addLead());
    // API.CadastrarCotacaoBd("cotacao/pre_lead").then((res) => {
    //   console.log("Lead", res.idCotacao);
    //   API.CadastrarCotacaoBd("cotacao/endereco/residencia", endereco).then(
    //     (res) => {
    //       console.log("Endereço:", res.idEndereco);
    //     }
    //   );
    // });
  };
};
