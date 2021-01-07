import axios from "axios";

//DEV
const server = "https://apiceluladigitalhm.qualicorp.com.br";
const apiKeyOperadoras= "1b2f206d-26e9-4fcc-8be6-1c1ed19f00bc";
const apiKeyRedeReferenciadas= "2bb30205-520c-4721-9290-b2dc862b32bf";
const apiKeyFatoresModeradores="2e1b29c8-6153-45dd-af7a-a0eb111c37ab";
const apiKeyEntidades="b5539012-ed84-43f6-96d0-2f59f7bc208f";
const apiKeyPublicoAlvo="f2578d0c-423e-4c9f-8cd9-5b5f8bed946f"; 
const apiKeyInformacoesAdicionaisPorPlano="ddfca8f5-064b-4db6-b3f2-30f27a92d2e4";
const apiKeyCep="b0f0f3ac-a1c2-4f99-882b-8df176ba97c5"; 
const apiKeyPlanos="ddfca8f5-064b-4db6-b3f2-30f27a92d2e4";
const apiKeyPlanosIdPorFatura="ddfca8f5-064b-4db6-b3f2-30f27a92d2e4";
const apiKeyAddLead = "99045a7c-56b8-46b2-ad29-7aa128989b90"
var current_date = (new Date()).valueOf().toString();
var random = Math.random().toString();

const headers = {
  "Content-Type": "application/json",
};
const newHash =(s) => {
  let hash =s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);    
  return (hash < 0 ? hash * -1 : hash)
}

const apiQualicorp= {
  async operadoras(uf, cidade, entidade) {
    let oper = [];
    const url = `${server}/qvenda/operadoras/${entidade}?uf=${uf}&cidade=${cidade}&api-key=${apiKeyOperadoras}`
    await axios
      .get(url)
      .then(function (res) {
      
        oper = res.data;
      
      })
      .catch(function (error) {
        console.log(error);
      });
    return oper;
  },

  async redeReferenciadas(idProdutoFatura, tipo ) {
    //TIPO = hospital ou laboratorio
    let resRedeReferenciada = [];
    const url = `${server}/qvenda/rede-referenciadas/${idProdutoFatura}/${tipo}?api-key=${apiKeyRedeReferenciadas}`;
    await axios
      .get(url)
      .then(function (res) {
        
        resRedeReferenciada = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return resRedeReferenciada;
  },

  async fatoresModeradores(idProdutoFatura) {
    let statusFatoresModeradores = [];
    const url = `${server}/fatores-moderadores/${idProdutoFatura}?api-key=${apiKeyFatoresModeradores}`;
    await axios
      .get(url)
      .then(function (res) {
        statusFatoresModeradores = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusFatoresModeradores;
  },

  async entidades(publicoAlvo, uf, cidade) {
    let statusEntidades = [];
    const url = `${server}/qvenda/entidades/?publicoAlvo=${publicoAlvo}&uf=${uf}&cidade=${cidade}&api-key=${apiKeyEntidades}`;
    await axios
      .get(url)
      .then(function (res) {
        statusEntidades = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusEntidades;
  },
  async publicoAlvo(uf, cidade) {
    let statusPublicoAlvo = [];
    const url = `${server}/qvenda/publicos-alvo?uf=${uf}&cidade=${cidade}&api-key=${apiKeyPublicoAlvo}`;
    await axios
      .get(url)
      .then(function (res) {
        statusPublicoAlvo = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusPublicoAlvo;
  }, 
  async informacoesAdicionaisPorPlano(idProdutoFatura) {
    let statusInformacoesAddPlano = [];
    const url = `${server}/qvenda/planos/${idProdutoFatura}/informacoesAdicionais?api-key=${apiKeyInformacoesAdicionaisPorPlano}`;
    await axios
      .get(url)
      .then(function (res) {
        statusInformacoesAddPlano = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusInformacoesAddPlano;
  },
  async endereco(cep) {
    let statusEndereco = [];
    const url = `${server}/qvenda/enderecos/cep/${cep}?api-key=${apiKeyCep}`;
    await axios
      .get(url)
      .then(function (res) {
        statusEndereco = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusEndereco;
  },
  async listarPlanos(plano) {
    let planos = [];

    const url = `${server}/qvenda/planos/lista?api-key=${apiKeyPlanos}`;
    await axios
      .post(url, plano)
      .then(function (res) {
        if(res.status == 200)
            planos = res.data;
        else
            planos = []
      })
      .catch(function (error) {
        console.log(error);
      });
    return planos;
  },
  
  async addLead(cotation) {
    
    let resposta = [];
    const url = `https://qualitech.qualicorp.com.br/api-focus-lead/adicionar-lead?api-key=${apiKeyAddLead}`;
    let date = new Date()
    // console.log(date.getDate())
    let day  = (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()) 
    let month = (date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1)
    let hour = (date.getHours() < 10 ? `0${date.getHours()}` : date.getHours())
    let minutes = (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes())
    let seconds = (date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds())
    let miliseconds = (date.getMilliseconds())
    let dateHour = `${date.getFullYear()}-${month}-${day} ${hour}:${minutes}:${seconds}`
    let beneficiarios = []
    let dateBirthBeneficiarios = []
    if(cotation.plan.beneficiarios){
    await ((cotation.plan.beneficiarios)).filter((val)=>{ 
                                          return (val.chave != cotation.user.nome && 
                                                  val.dataNascimento != cotation.user.date_birth
                                                ) 
                                          }).map((val) => 
                                          {
                                            beneficiarios.push({
                                            DATA_NASC: val.dataNascimento,
                                            VALOR_PLANO: "0"
                                          })


                                          dateBirthBeneficiarios.push(val.dataNascimento)
                                          
                                        })
    }
   
    let lead = {
      leads:[{
        ID_LEAD: newHash(`${new Date()}${(cotation.user.cpf ? cotation.user.cpf.replace(/[^0-9]/g,'') : cotation.user.cnpj.replace(/[^0-9]/g,'') )}`),
        NM_ORIGEM: "Solicitação",
        GRUPO_ORIGEM: "Solicitação",
        ORIGEM_INTEGRACAO: `Bidu/Thinkseg - ${cotation.user.cpf ? "Adesão" : "PME"}`,
        DH_CAPTURA_LEAD_ORIGEM: dateHour,
        NOME: "teste",
        EMAIL: "teste@teste.com",
        TELEFONE_PRINCIPAL:cotation.user.telefone.replace(/[^0-9]/g,''),
        TELEFONE_SECUNDARIO: "",
        MIDIA_VEICULO: "",
        MIDIA_FORMATO: "",
        MIDIA_CAMPANHA: null,
        MIDIA_CONTEUDO: null,
        UF: cotation.user.estado,
        MUNICIPIO: cotation.user.cidade,
        PROFISSAO: (cotation.user.profissao ? cotation.user.profissao : ""),
        ENTIDADE: (cotation.plan.entidade ? cotation.plan.entidade: ""),
        OPERADORA: (cotation.plan.operadora ? cotation.plan.operadora : ""),
        TIPO_ACOMODACAO: ( cotation.plan.acomodacao ? cotation.plan.acomodacao : ""),
        REEMBOLSO: ( cotation.plan.reembolso ?  cotation.plan.reembolso : "" ),
        CPF: (cotation.user.cpf ? cotation.user.cpf.replace(/[^0-9]/g,''): ""),
        NOME_EMPRESA:"teste",
        CNPJ:(cotation.user.cnpj ? cotation.user.cnpj.replace(/[^0-9]/g,''): ""),
        DATA_NASCIMENTO: (cotation.user.date_birth ? cotation.user.date_birth : ""),
        NUMERO_VIDAS: (cotation.plan.beneficiarios && cotation.plan.beneficiarios.length > 0 ? cotation.plan.beneficiarios.length : cotation.user.qtdeVidas),
        DEPENDENTES: beneficiarios,
        DT_NASC_DEP: dateBirthBeneficiarios,
        PLANO: ( cotation.plan.nomePlano ? cotation.plan.nomePlano : ""),
        VALOR_PLANO_SIMULADO: ( cotation.plan.valorTotal ? cotation.plan.valorTotal : ""),
        LEAD_CLICK_TO_CALL: true,
        HORA_CLICK_TO_CALL: `${hour}:${minutes}:${seconds}:${miliseconds}`,
        LEAD_CHAT: false,
        HORA_CHAT: null,
        LEAD_DETALHE_PLANO: false,
        HORA_DETALHE_PLANO: null,
        LEAD_SOLICITACAO: true,
        HORA_SOLICITACAO: null,
        LEAD_PEDIDOONLINE: false,
        HORA_PEDIDOONLINE: null,
        LEAD_MOBILE: true,
        HORA_MOBILE: null
      }]
    }
    // console.log(cotation)
    // console.log('lead', lead)

    await axios
      .put(url, lead)
      .then(function (res) {
        resposta = res
      })
      .catch(function (error) {
        console.log(error);
      });
    return resposta;
  },
  
  
  async planosIdPorFatura(params) {
    let statusPlanosIdPorFatura = [];
    const url = `${server}/qvenda/planos/lista?api-key=${apiKeyPlanosIdPorFatura}`;
    await axios
      .post(url, params)
      .then(function (res) {
        // console.log(res)
        if(res.status == 200)
            statusPlanosIdPorFatura.push(res.data);
      })
      .catch(function (error) {
        return statusPlanosIdPorFatura;
      });
    return statusPlanosIdPorFatura;
  },

};

export { apiQualicorp };
