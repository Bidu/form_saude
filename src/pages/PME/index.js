import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser } from "../../store/actions/user";
import { FormatDocument, DateToTimestamp, GTM } from "../../helpers";
import apiCEP from "../../services/cep/";
import Wrapper from "../../components/wrapper";
import { Steps } from "../../components/steps";
import Title from "../../components/Title";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import { Link, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withFormik } from "formik";
import * as Yup from "yup";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { apiQualicorp } from "../../services/bdBo";
import {bruf} from "../../services/bruf";
import TermosUso from '../../components/TermosUso'

import "./PME.css"
import {
  textMaskPhone,
  textMaskNumber,
  textMaskCpf,
  textMaskCEP,
  onlyNumbers,
  CheckCPF,
  onlyLetters,
  nameField,
  CheckCNPJ,
  textMaskCnpj
} from "../../helpers/user";

import { checkValidateRadios } from "../../helpers";
import Loading from "../../components/loading";
import { CadastrarCotacaoBd } from "../../services/bd/CadastrarCotacao";

import { createBrowserHistory } from "history";
import { entities } from "../../helpers/entities";
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      // request: true,
      //redirect: false,
      cep: "",
      occupations: [],
      entities: [],
      option: null,
      usuario: {
        cpf: "",
        nome: "",
        politicamente_exp: false,
        email: "",
        telefone: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        cep: "",
        estado: "",
        uf: "",
        complemento: "",
        date_birth: "",
        nasc_dia: "",
        nasc_mes: "",
        nasc_ano: "",
        genero: "",
        profissao: "",
        escolaridade: "",
        moradia: false,
      },
      dependents: [],
      faixaEtaria: [
       {id:1, desc: '0 a 18 anos'},
       {id: 2, desc: '19 a 23 anos'},
       {id: 3, desc: '24 a 28 anos'},
       {id: 4, desc: '29 a 33 anos'},
       {id: 5, desc: '34 a 38 anos'},
       {id: 6, desc:  '39 a 43 anos'},
       {id: 7, desc: '44 a 48 anos'},
       {id: 8, desc: '49 a 53 anos'},
       {id: 9, desc: '54 a 58 anos'},
       {id: 10, desc:'59 anos ou +'}
      ],
      pessoasPorFaixa: Array.from(new Array(10), (x, i) => i+1),
      pessoasAddFaixaEtaria: [],
      storage: JSON.parse(localStorage.getItem("@bidu2/user")),
      qtdeVidas: 2,
      cidadesDisabled : true,
      estado: bruf,
      cidades : []
    };
    this.handleCEP = this.handleCEP.bind(this);
  }

  async componentDidMount() {

    this.setState({estado: bruf})
    this.props.values.qtdeVidas = 2
    this.props.values.profissao = "Selecione";

    const storage = JSON.parse(localStorage.getItem("@bidu2/user"));
    delete storage.cep 
    delete storage.entidade 
    delete storage.operadora 
    delete storage.profissao
    delete storage.dependents

    localStorage.setItem("@bidu2/user", JSON.stringify(storage))

    if (storage.length !== 0) {
      this.setState(storage);
      this.props.setValues(storage);
    }
    this.props.setStatus(false);
  }


  handleFaixaEtaria = async (pessoasAddFaixaEtaria, event) =>{
  
   let now = new Date()
   //ANO VALIDO PARA A FAIXA ETARIA ESCOLHIDA
   let year = (now.getFullYear() - (parseInt(pessoasAddFaixaEtaria.desc.substr(0,2)) + 2))
   let date_birth = `${year}-${now.getMonth() + 1}-${now.getDate()}`
  
    

   if( (this.state.pessoasAddFaixaEtaria.filter((e) => e.id == pessoasAddFaixaEtaria.id)).length > 0)
   {
      let deleteItem = this.state.pessoasAddFaixaEtaria.filter((e) => e.id != pessoasAddFaixaEtaria.id)
        
        await this.setState({pessoasAddFaixaEtaria: [...deleteItem , {
                                                                      id: pessoasAddFaixaEtaria.id,
                                                                      desc: pessoasAddFaixaEtaria.desc,
                                                                      qtde: event.target.value,
                                                                      date_birth: date_birth
                                                                    }] })
        
   } else{

     await    this.setState({ pessoasAddFaixaEtaria:
         [...this.state.pessoasAddFaixaEtaria,
         {
           id: pessoasAddFaixaEtaria.id,
           desc: pessoasAddFaixaEtaria.desc,
           qtde: event.target.value,
           date_birth: date_birth
         }
         ]
       })
   }


        

      setTimeout(() => {
        this.props.values.beneficiarios = []
        this.state.pessoasAddFaixaEtaria.map((val) => {
          for (let index = 0; index < val.qtde; index++) {
              this.props.values.beneficiarios = [...this.props.values.beneficiarios, {
                chave: "FUNCIONARIO",
                dataNascimento: val.date_birth
              }]
          }})
      }, 1000);
    
  }
  


  handleCEP = (e) => {
    const cep = e.target.value;
    if (cep.length == 9) {
      this.setState({
        cep,
      });
      //if (this.state.cep.length === 8) {
      setTimeout(() => {
        this.getAddress();
      }, 500);
      //}
    } else {
      this.setState({
        usuario: {
          ...this.state.usuario,
          rua: "",
          cidade: "",
          bairro: "",
          estado: "",
          cep: "",
          uf: "",
        },
        loading: false,
      });
      this.props.values.rua = "";
      delete this.props.values.profissao;
    }
  };
  getAddress = async (e) => {
    this.setState({ loading: true });
    let content = await apiQualicorp.endereco(this.state.cep.replace("-", ""));
    if (content && content.data) {
      await this.getOccupations(content.data);

      this.setState({
        usuario: {
          ...this.state.usuario,
          rua: content.data.logradouro,
          cidade: content.data.cidade,
          bairro: content.data.bairro,
          estado: content.data.estado,
          cep: content.data.cep,
          uf: content.data.estado,
        },
        loading: false,
      });
      this.props.values.rua = content.data.logradouro;
      this.props.values.cidade = content.data.cidade;
      this.props.values.bairro = content.data.bairro;
      this.props.values.estado = content.data.estado;
      this.props.values.cep = content.data.cep;
      this.props.values.uf = content.data.estado;
    } else {
      this.setState({
        usuario: {
          ...this.state.usuario,
          cep: undefined,
        },
        loading: false,
      });
    }
  };

  getOccupations = async (address) => {
    this.setState({
      loading: true,
      occupations: [],
      occupationsFalse: true,
    });
    let occupations = await apiQualicorp.publicoAlvo(
      address.estado,
      address.cidade
    );
    if (occupations && occupations.data && occupations.data.length > 0) {
      this.setState({ occupations: occupations.data });
    } else {
      this.setState({
        occupations: [],
        occupationsFalse: false,
      });
    }
  };

  getEntities = async (uf, cidade, profissao) => {
    this.setState({
      loading: true,
      entities: [],
      entitiesFalse: true,
    });

    let entities = await apiQualicorp.entidades(uf, cidade, profissao);

    if (entities && entities.data && entities.data.length > 0) {
      this.setState({
        entities: entities.data,
        loading: false,
      });
    } else {
      this.setState({
        entities: [],
        loading: false,
        entitiesFalse: false,
      });
    }
  };
  getOperator = async (entitie, uf, cidade) => {
    this.setState({
      loading: true,
      operadoras: [],
      operadorasFalse: true,
    });

    let operadoras = await apiQualicorp.operadoras(uf, cidade, entitie);
    

    if (operadoras && operadoras.data && operadoras.data.length > 0) {
      this.setState({
        operadoras: operadoras.data,
        loading: false,
      });
    } else {
      this.setState({
        operadoras: [],
        loading: false,
        operadorasFalse: false,
      });
    }
  }



  handleChange = (event) => {
    if (event.target.name == "profissao") {
      this.props.values.profissao = event.target.value;
      this.getEntities(
        this.props.values.profissao,
        this.props.values.uf,
        this.props.values.cidade
      );
    }
    if (event.target.name == "entidade") {
      this.props.values.entidade = event.target.value;
      this.getOperator(
        this.props.values.entidade,
        this.props.values.uf,
        this.props.values.cidade
      );
    }
    if (event.target.name == "operadora") {
      this.props.values.operadora = event.target.value;
    }

    this.setState({
      usuario: {
        ...this.state.usuario,
        [event.target.name]: event.target.value,
      },
    });
  };
  handleChangeSwitch = (name) => (event) => {
    this.setState({
      ...this.state,
      [name]: event.target.checked,
    });
  };

  renderDay(dia) {
    return <MenuItem value={dia}>{dia}</MenuItem>;
  }
  renderYear(ano) {
    return <MenuItem value={ano}>{ano}</MenuItem>;
  }

  handleSubmitBkp = (e) => {
    e.preventDefault();
    // const { usuario } = this.state;
    // this.props.adicionaUser(usuario);
    this.setState({ redirect: true });
  };


  setDependents = (dependents) => {
    this.setState({dependents})
    this.props.values.dependents = dependents;

  }

  setIncrementOrDecrement = (operator) =>{
      switch (operator) {
        case "+":
          let numPos = parseInt(this.props.values.qtdeVidas)
          if(numPos < 3000){
            numPos += 1
            this.props.values.qtdeVidas = numPos
            this.setState({qtdeVidas : numPos})
          }
          break;
        case "-":
          let numNeg = parseInt(this.props.values.qtdeVidas)
          if(numNeg >  2){
           numNeg -= 1
           this.props.values.qtdeVidas = numNeg
          this.setState({qtdeVidas : numNeg})
          }
          break;
    
        default:
          break;
      }

  }

  render() {
    const { loading, redirect, usuario, storage } = this.state;
    let dias = [];
    for (let i = 1; i <= 31; i++) {
      dias.push(i);
    }
    let minOffset = 0,
      maxOffset = 80;
    let thisYear = new Date().getFullYear();
    let anos = [];
    for (let x = 0; x <= maxOffset; x++) {
      anos.push(thisYear - x);
    }

    const {
      status,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleSubmit,
    } = this.props;

    if (this.props.status) {
      return <Redirect to="/sucesso" />;
    }

    return (
      <>
        <Wrapper>
          <Steps step1={true} step2={true} />
          <Title text="Plano de" bold="Saúde" />
          <p></p>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.props.values.nome ? this.props.values.nome : ""}
                  type="text"
                  id="nome"
                  name="nome"
                  label="Nome da Empresa"
                  placeholder="Corporation SA"
                  autoFocus={true}
                  fullWidth
                  onChange={handleChange}
                  onBlur={this.handleChange}
                  helperText={touched.nome ? errors.nome : ""}
                  error={touched.nome && Boolean(errors.nome)}
                  InputProps={{
                    inputComponent: onlyLetters,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={
                    this.props.values.cnpj ? this.props.values.cnpj : usuario.cnpj
                  }
                  id="cnpj"
                  name="cnpj"
                  label="CNPJ"
                  placeholder="00.000.000/0000-00"
                  fullWidth
                  margin="20px"
                  onChange={handleChange}
                  onBlur={this.handleChange}
                  helperText={touched.cnpj ? errors.cnpj : ""}
                  error={touched.cnpj && Boolean(errors.cnpj)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent: textMaskCnpj,
                    autoComplete: "nope"
                  }}
                
                />
              </Grid>

              

              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.props.values.nomecontato ? this.props.values.nomecontato : ""}
                  id="nomecontato"
                  name="nomecontato"
                  label="Nome para contato"
                  placeholder="O nome do contato"
                  fullWidth
                  onChange={handleChange}
                  onBlur={this.handleChange}
                  helperText={touched.nomecontato ? errors.nomecontato : ""}
                  error={touched.nomecontato && Boolean(errors.nomecontato)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    autoComplete: "nope"
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
              <FormControl component="fieldset"> 
               <InputLabel shrink id="estado">
                Estado
              </InputLabel>
              <Autocomplete
               
                id="estado"
                name="estado"
                clearOnEscape
                options={bruf}
                getOptionLabel={(option) => option.nome}
                renderInput={(params) => <TextField {...params} style={{marginTop:0}} label="Estado" margin="normal"  helperText={touched.estado ? errors.estado : ""}
                error={touched.estado && Boolean(errors.estado)} />}
                onChange={(event, newValue) => {
                  
                  if(newValue && newValue.cidades){
                    this.props.values.estado = newValue.sigla
                    this.setState({cidades: newValue.cidades})
                  }
                }}
                InputProps={{
                  autoComplete: "nope"
                }}
                
               
              />
              </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                  <FormControl component="fieldset" className="price-quote"> 
                  <InputLabel shrink id="cidade">
                    Cidade
                  </InputLabel>
                  <Autocomplete
                      
                      id="cidade"
                      name="cidade"
                      clearOnEscape
                      options={this.state.cidades}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => <TextField {...params} style={{marginTop:0}} label="Cidade" margin="normal"  helperText={touched.cidade ? errors.cidade : ""}
                      error={touched.cidade && Boolean(errors.cidade)} />}
                      onChange={(event, newValue) => {
                          this.props.values.cidade = newValue
                      }}
                      InputProps={{
                        autoComplete: "nope"
                      }}
                    />
                  </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.props.values.email ? this.props.values.email : ""}
                  id="email"
                  name="email"
                  label="Email"
                  placeholder="contato@corporation.com"
                  fullWidth
                  onChange={handleChange}
                  onBlur={this.handleChange}
                  helperText={touched.email ? errors.email : ""}
                  error={touched.email && Boolean(errors.email)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    autoComplete: "nope"
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={
                    this.props.values.telefone ? this.props.values.telefone : ""
                  }
                  id="phone"
                  name="telefone"
                  label="Celular"
                  placeholder="(00) 00000-0000"
                  fullWidth
                  onChange={handleChange}
                  onBlur={this.handleChange}
                  helperText={touched.telefone ? errors.telefone : ""}
                  error={touched.telefone && Boolean(errors.telefone)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent: textMaskPhone,
                    autoComplete: "nope"
                  }}
                />
              </Grid>
             

              {loading && <Loading />}
            </Grid>
            <br />
            {/* {this.state.operadorasFalse == true && this.state.operadoras.length > 0 && ( */}
              <>
                <div className="vidas">
                  <Title text="Quantidade de" bold="vidas" />
                </div>
                <div className="texto-vidas">
                  <p>
                  Para quantas pessoas deseja contratar, entre depentes ou
                  funcionários
                  </p>
                </div>
                <div >
                  {
                    <Grid container xs={12}>
                      <div className="qtd-vidas-container">
                        <Grid item xs={3} className="btn-container">
                          <div className="less-botao">
                            <Button
                              onClick={ () =>  this.setIncrementOrDecrement("-")}>
                              <p className="button_text_menos"> - </p>
                            </Button>
                          </div>
                        </Grid>
                        <Grid item xs={3} >
                          <TextField
                            name="qtdevidas"
                            fullWidth
                            labelId="qtdevidas"
                            id="qtdevidas"
                            type="number"
                            value={
                              ( this.props.values.qtdeVidas ?  this.props.values.qtdeVidas : this.state.qtdeVidas)
                            }
                            InputProps={{ inputProps: { min: 2, max: 3000 } }}
                            onChange={ (event) => { 
                              this.props.values.qtdeVidas = event.target.value
                              this.setState({qtdeVidas: event.target.value})
                              
                            }}
                            onBlur={this.handleChange}
                            
                          />
                        </Grid>
                        <Grid item xs={3}className="btn-container">
                          <div class="less-botao-mais">
                          <Button
                            onClick={ () =>  this.setIncrementOrDecrement("+")}>
                              <p className="button_text_mais"> + </p></Button>
                          </div>
                        </Grid>
                      </div> 
                    </Grid>
                  
                  /* O JSX ABAIXO FUNCIONA
                  NA PRIMEIRA VERSÃO PARA VIDAS POR FAIXA ETARIA, CASO TENHA CURIOSIDADE, 
                  BASTA DESCOMENTAR O CODIGO ABAIXO*/

                  /* <Grid container xs={10} spacing={3} >
                  {this.state.faixaEtaria.map((e, key)=>(
                    
                    <Grid item xs={'2,5'}  key={key}>
                    <>
                    <InputLabel shrink id={e.id}>
                    {e.desc}
                    </InputLabel>
                    <TextField
                    name={e.id}
                    fullWidth
                    labelId={e.id}
                    id={e.id}
                    type="number"
                    value={
                      (this.state.pessoasAddFaixaEtaria.filter((val) => val.id == e.id)).length > 0 ? this.state.pessoasAddFaixaEtaria.filter((val) => val.id == e.id)[0].qtde : ""
                    }
                    InputProps={{ inputProps: { min: 0 } }}
                    onChange={ (event) => this.handleFaixaEtaria(e, event)}
                    onBlur={this.handleChange}
                    className="select-faixa-etaria"
                    />
                    
                    </>
                    </Grid>
                    ))}
                  </Grid> */}
                    </div>
                    <div className="texto-vidas texto-vidas-aviso">
                      <p>
                      Mínimo de 2 pessoas para planos PME*
                      </p>
                    </div>
                  
                    <div className="actions pme-actions">
                  
                      <TermosUso optinChange={(props) => this.setState({optin: props})}/>
                      {this.state.optin == false &&
                      <Button
                        type="submit"
                        className="btn-next about-btn-next"
                        disabled={this.state.optin == false ? false : true }
                      >
                        Quero uma cotação
                      </Button>
                      }
                    </div>
                  </>
                {/* )}  */}
          </form>
          <div className="actions mt0">
            <Link className="btn-back" to="/">
              <KeyboardBackspaceIcon /> Voltar
            </Link>
          </div>
        </Wrapper>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.infos,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    adicionaUser: (user) => dispatch(addUser(user)),
    //adicionarLead: () => dispatch(adicionarLeadCotacao()),
    //addLead: (send) => dispatch(postBo('auto/segurado', send))
  };
};

const Form = withFormik({
  mapPropsToValues: ({
    cnpj,
    nome,
    email,
    telefone,
    cidade,
    estado,
    nomecontato

  }) => {
    return {
      cnpj: cnpj || "",
      nome: nome || "",
      email: email || "",
      telefone: telefone || "",
      cidade: cidade || "",
      estado: estado || "",
      nomecontato: nomecontato || ""
    };
  },
  validationSchema: Yup.object().shape({
    cnpj: Yup.string()
      .min(14, "CNPJ precisa ter no mínimo 14 caracteres")
      .test("cnpj", "Informe um CNPJ válido", (value) => {
        if(value == undefined)
          return false
        else
          return CheckCNPJ(value);
      }),

    nome: Yup.string()
      .required("Obrigatório")
      .max(200, "Nome é muito longo")
      .test("nome", "Informe um nome válido", (value) => {
        return nameField(value);
      }),
    email: Yup.string()
      .email("Digite um e-mail válido")
      .required("E-mail é obrigatório"),
    telefone: Yup.string()
      .min(15, "O telefone deve ter no mínimo 11 dígitos")
      .required("Telefone é obrigatório"),
    cidade: Yup.string()
      .required("Cidade é obrigatório"),
    estado: Yup.string()
      .required("Estado é obrigatório"),
    nomecontato: Yup.string()
      .required("Nome para contato é obrigatório"),
  }),


  handleSubmit: async (
    values,
    { props, setStatus, setValues, setSubmitting, setLoading }
  ) => {
    // setLoading(true)

    values.uf = values.estado
    localStorage.setItem("@bidu2/user", [JSON.stringify(values)]);

    let cotationSelect = {
      user: values,
      plan: values
    }
    
    let res = await  apiQualicorp.addLead(cotationSelect)
    
    
      if(res.status == 200)
          setStatus(true);  
    
    
    

    setSubmitting(false);
  },
})(About);

export default connect(mapStateToProps, mapDispatchToProps)(Form);
