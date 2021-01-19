import axios from "axios";

const server = "https://api-banco-dados-dot-bidu-digital-dev.appspot.com";


const headers = {
    "Content-Type": "application/json",
  };

  const apiBdBo= {

   
    async pesquisarSegurado(segurado) {
        let response = [];
        const url = `${server}/cliente/produto/2`;
        let documento = { documento: (segurado.cpf ? segurado.cpf : segurado.cnpj) }
        await axios
          .post(url, documento)
          .then( async function  (res) {
            response.push(res.data);
            if(res.status == 200 && res.data)
            {
               await apiBdBo.atualizarSegurado( segurado, res.data.id ) 
            }
            else{
                await apiBdBo.criarSegurado(segurado)   
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        return response;
      },


    async criarSegurado(segurado) {
        let response = [];
        if(segurado.date_birth)
          var {date_birth} = segurado

          let dateTime = new Date(`${date_birth} 00:00:00` ).getTime()
        let person = {
             "nome": ( segurado.cpf ? segurado.nome : `${segurado.nome} / ${segurado.nomecontato}`) ,
             "documento": ( segurado.cpf ? segurado.cpf : segurado.cnpj ) ,
             "tipoPessoa":( segurado.cpf ? "FISICA": "JURIDICA"),
             "email":segurado.email,
             "telefone": segurado.telefone,
             "dataNascimento": ( segurado.cpf ? dateTime : "" ),          
             "profissoes":( segurado.cpf ? segurado.profissao : "")
           }
        const url = `${server}/segurado/saude`;
        await axios
          .post(url, person)
          .then(function (res) {
            response.push(res.data);
            apiBdBo.criarEnderecoSegurado(segurado, res.data.insuredId)
          })
          .catch(function (error) {
            console.log(error);
          });
        return response;
      },

      async atualizarSegurado(segurado, person_id) {
        let response = [];
        let updatePerson = {
                                "tipoPessoa":( segurado.cpf == "" ? "JURIDICA": "FISICA" ),
                                "email":segurado.email,
                                "telefone":segurado.telefone,
                                "profissoes": segurado.profissao
                           }
        const url = `${server}/segurado/${ person_id }/saude`;
        await axios
          .put(url, updatePerson)
          .then(function (res) {
            response.push(res.data);
            apiBdBo.criarEnderecoSegurado(segurado, person_id)
          })
          .catch(function (error) {
            console.log(error);
          });
        return response;
      },

      async criarEnderecoSegurado(segurado, person_id) {
        let response = [];
        let address = {
            "idPessoa" : person_id,
            "cidade":segurado.cidade,
            "estado":segurado.estado
          }
        const url = `${server}/saude/endereco/residencia`;
        await axios
          .post(url, address)
          .then(function (res) {
           let person = {
             person_id: person_id,
             address_id: res.data.idAddress
           }
           localStorage.setItem("@bidu2/databduser",  JSON.stringify(person) )
            response.push(res.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        return response;
      },









      async postCotation(data){
        let response = [];
        let {address_id, person_id} = JSON.parse(localStorage.getItem("@bidu2/databduser"))

        let payload = {
          ...data.user,
          planoEscolhido: data.user.cnpj ? "" : data.plan,
          payloadQualicorp: data.payloadQualicorp.leads[0]
        }
      


        let jsonCotation = {	
            "idEndereco": address_id,
            "idPessoa": person_id,
            "idProduto": data.user.cnpj ? "" : data.plan.idProdutoFatura,
            "cotacao": payload
        }


        const url = `${server}/produto/2/cotacao/cotacao`;
        await axios
          .post(url, jsonCotation)
          .then(function (res) {
            response = res;
          })
          .catch(function (error) {
            console.log(error);
          });
        return response; 
      }

  }
  

  export default apiBdBo