import axios from "axios";

const server = "https://api-banco-dados-dot-bidu-digital-dev.appspot.com/auto";


const headers = {
    "Content-Type": "application/json",
  };

  const apiBdBo= {

   
    async pesquisarSegurado(segurado) {
        let response = [];
        const url = `${server}/segurado`;
        let cpf = { documento: segurado.cpf}
        await axios
          .post(url, cpf)
          .then( async function  (res) {
            response.push(res.data);
            console.log(res.data.length)
            if(res.status == 200 && res.data)
            {
               await this.atualizarSegurado( segurado, res.data.id ) 
            }
            else{
                // await apiBdBo.criarSegurado(segurado)   
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        return response;
      },


    async criarSegurado(segurado) {
        let response = [];
        let {date_birth} = segurado
        let dateTime = new Date(`${date_birth} 00:00:00` )
        let person = {
            "nome": segurado.nome,
             "documento": ( segurado.cpf == "" ? segurado.cnpj : segurado.cpf ) ,
             "tipoPessoa":( segurado.cpf == "" ? "JURIDICA": "FISICA"),
             "email":segurado.email,
             "telefone": segurado.telefone,
             "dataNascimento": dateTime,
             "genero":"",
             "profissoes":segurado.profissao,
             "tipoResidencia":"",
             "perfilEducacional":""
           }
        const url = `${server}/segurado/saude`;
        await axios
          .post(url, person)
          .then(function (res) {
            console.log(res);
            response.push(res.data);
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
            console.log(res);
            response.push(res.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        return response;
      },

      async criarEnderecoSegurado(endereco) {
        let response = [];
        let address = {
            "idPessoa" : 12595,
            "cidade":"São Paulo",
            "estado":"SP"
          }
        const url = `${server}/saude/endereco/residencia`;
        await axios
          .post(url, endereco)
          .then(function (res) {
            console.log(res);
            response.push(res.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        return response;
      },









      async postCotation(cotation){
        let response = [];

        let jsonCotation = {	
            "idEndereco": 1713,
            "idPessoa": 12595,
            "cotacao": {"cpf":"107.755.726-40","nome":"vinicius oliveira","email":"v.cezar21@gmail.com","telefone":"(31) 98930-8060","profissao":"Advogado","entidade":"AASP","date_birth":"1991-12-21","cidade":"São Paulo","estado":"SP","opt":true,"operadoras":[[{"id":92693118000160,"name":"BRADESCO","entite":"AASP"}]],"dependents":[{"id":1,"nome":"maria clara","nascimento":"2017-12-21","idade":3},{"id":2,"nome":"davi do galo","nascimento":"2021-04-30","idade":0}],"estadoCompleto":"São Paulo","entities":[{"id":"AASP","nome":"ASSOCIACAO DOS ADVOGADOS DE SAO PAULO","cnaeEmpresaOperacional":false},{"id":"ABRABDIR","nome":"ASSOCIACAO BRASILEIRA DE ADVOGADOS E BACHAREIS EM DIREITO ABRABDIR","cnaeEmpresaOperacional":false,"tipo":"Fechada","taxa":{"existeTaxa":false,"valor":0},"fichaFiliacao":true},{"id":"ABRACEM","nome":"ASSOCIACAO BRASILEIRA DE CONSULTORES EMPRESARIAIS E PROFISSIONAIS LIBERAIS","cnaeEmpresaOperacional":false,"tipo":"Aberta","taxa":{"existeTaxa":false,"valor":0},"fichaFiliacao":true},{"id":"CAASP","nome":"CAIXA DE ASSISTENCIA DOS ADVOGADOS DE SAO PAULO","cnaeEmpresaOperacional":false}]}
        }


        const url = `${server}/saude/endereco/residencia`;
        await axios
          .post(url, cotation)
          .then(function (res) {
            console.log(res);
            response.push(res.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        return response; 
      }

  }
  

  export default apiBdBo