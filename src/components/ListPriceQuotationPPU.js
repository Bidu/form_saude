import React, { Component } from "react";
import { ConvertCurrency, GTM } from "../helpers";
import Grid from "@material-ui/core/Grid";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link, Redirect } from "react-router-dom";
import Title from "./Title";
import CloseIcon from "@material-ui/icons/Close";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import ListPriceQuotationServices from "./ListPriceQuotationServices";

const marks_fipe = {
  85: {
    style: {
      left: "6px",
    },
    label: "85%",
  },
  95: "95%",
  110: {
    style: {
      left: "auto",
      right: "-19px",
    },
    label: "110%",
  },
};
const marks_guincho = {
  200: {
    style: {
      left: "12px",
    },
    label: "200km",
  },
  400: "400km",
  600: {
    style: {
      left: "auto",
      right: "-28px",
    },
    label: "ilimitado",
  },
};
const marks_carro_reserva = {
  1: "7",
  2: "15",
  3: "30",
  4: "45",
};
const marks_vidros = {
  1: {
    style: {
      left: "32px",
    },
    label: "sem cobertura",
  },
  2: "básica*",
  3: {
    style: {
      left: "auto",
      right: "-30px",
    },
    label: "completa*",
  },
};
const marks_franquia = {
  1: {
    style: {
      left: "17px",
    },
    label: "reduzida",
  },
  2: "básica*",
  3: {
    style: {
      left: "auto",
      right: "-29px",
    },
    label: "ampliada",
  },
};
const marks_coberturas = {
  1: {
    style: {
      left: "39px",
    },
    label: "incêndio e roubo",
  },
  2: {
    style: {
      right: "-70px",
      left: "auto",
    },
    label: "incêndio e roubo + colisão",
  },
};
const marks_danos_materiais = {
  10: {
    style: {
      left: "8px",
    },
    label: "10mil",
  },
  50: {
    style: {
      right: "-18px",
      left: "auto",
    },
    label: "50mil",
  },
};
const marks_danos_corporais = {
  10: {
    style: {
      left: "8px",
    },
    label: "10mil",
  },
  50: {
    style: {
      right: "-18px",
      left: "auto",
    },
    label: "50mil",
  },
};
const marks_danos_morais = {
  5: {
    style: {
      left: "6px",
    },
    label: "5mil",
  },
  50: {
    style: {
      right: "-18px",
      left: "auto",
    },
    label: "50mil",
  },
};
const marks_morte_acidente = {
  5: {
    style: {
      left: "6px",
    },
    label: "5mil",
  },
  50: {
    style: {
      right: "-18px",
      left: "auto",
    },
    label: "50mil",
  },
};
const marks_invalidez_acidente = {
  5: {
    style: {
      left: "6px",
    },
    label: "5mil",
  },
  50: {
    style: {
      right: "-18px",
      left: "auto",
    },
    label: "50mil",
  },
};
function log(value) {
  // console.log(value);
}

export class ListPriceQuotationPPU extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      lightbox_custom: false,
      lightbox_details: false,
      lightbox_agree: false,
      fipe: 85,
      guincho: 200,
      ar_condicionado: false,
      roubo_furto: 1,
      vidros: 1,
      colisao: 1,
      coberturas: 1,
      danos_materiais_check: false,
      danos_materiais: 10,
      danos_corporais_check: false,
      danos_corporais: 10,
      danos_morais_check: false,
      danos_morais: 5,
      morte_acidente_check: false,
      morte_acidente: 5,
      invalidez_acidente_check: false,
      invalidez_acidente: 5,
      redirect: false,
      cotacao: JSON.parse(this.props.quote),
      loading: false,
    };
    this.escExitLightbox = this.escExitLightbox.bind(this);
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  onFipeChange = (value) => {
    log(value);
    this.setState({
      fipe: value,
    });
  };
  onGuinchoChange = (value) => {
    log(value);
    this.setState({
      guincho: value,
    });
  };
  onRouboFurtoChange = (value) => {
    log(value);
    this.setState({
      roubo_furto: value,
    });
  };
  onVidrosChange = (value) => {
    log(value);
    this.setState({
      vidros: value,
    });
  };
  onColisaoChange = (value) => {
    log(value);
    this.setState({
      franquia: value,
    });
  };
  onCoberturasChange = (value) => {
    log(value);
    this.setState({
      coberturas: value,
    });
  };
  onDanosMateriaisChange = (value) => {
    log(value);
    this.setState({
      danos_materiais: value,
    });
  };
  onDanosCorporaisChange = (value) => {
    log(value);
    this.setState({
      danos_corporais: value,
    });
  };
  onDanosMoraisChange = (value) => {
    log(value);
    this.setState({
      danos_morais: value,
    });
  };
  onMorteAcidenteChange = (value) => {
    log(value);
    this.setState({
      morte_acidente: value,
    });
  };
  onInvalidezAcidenteChange = (value) => {
    log(value);
    this.setState({
      invalidez_acidente: value,
    });
  };

  handleChangeSwitch = (name) => (event) => {
    this.setState({
      ...this.state,
      [name]: event.target.checked,
    });
  };
  BtnCustomClose = () => {
    this.setState({ lightbox_custom: false });
    this.lightboxBehaviorClose();
  };
  BtnCustomOutClose = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      this.setState({ lightbox_custom: false });
      this.lightboxBehaviorClose();
    }
  };
  BtnCustomboxOpen = (e) => {
    e.preventDefault();
    this.setState({ lightbox_custom: true });
    this.lightboxBehaviorOpen();
  };

  lightboxBehaviorClose() {
    let shadesEl = document.querySelector("body");
    shadesEl.classList.remove("active-lightbox");
  }
  lightboxBehaviorOpen() {
    let shadesEl = document.querySelector("body");
    shadesEl.classList.add("active-lightbox");
  }

  BtnLightboxDetailsClose = (e) => {
    e.preventDefault();
    this.setState({ lightbox_details: false });
    this.lightboxBehaviorClose();
  };
  BtnLightboxDetailsOutClose = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      this.setState({ lightbox_details: false });
      this.lightboxBehaviorClose();
    }
  };
  BtnLightboxDetailsOpen = () => {
    this.setState({ lightbox_details: true });
    this.lightboxBehaviorOpen();
    /*Google Tag Manager*/
    // window.dataLayer.push({
    //   event: GTM("Cotacao_VerDetalhes"),
    // });
    /*End Google Tag Manager*/
  };
  BtnLightboxAgreeCloseX = (e) => {
    e.preventDefault();
    this.setState({ lightbox_agree: false });
    this.lightboxBehaviorClose();
  };
  BtnLightboxAgreeClose = (e) => {
    e.preventDefault();

    /*Google Tag Manager*/
    // window.dataLayer.push({
    //   event: GTM("Cotacao_MsgImportantes_NConcordo"),
    // });
    /*End Google Tag Manager*/

    this.setState({ lightbox_agree: false });
    this.lightboxBehaviorClose();
  };
  BtnLightboxAgreeOutClose = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      this.setState({ lightbox_agree: false });
      this.lightboxBehaviorClose();
    }
  };
  BtnLightboxAgreeOpen = (e) => {
    this.setState({ lightbox_agree: true });
    this.lightboxBehaviorOpen();
  };

  BtnRedirectCheckout = (e) => {
    localStorage.removeItem("@bidu2/transmissao");
    /*Google Tag Manager*/
    // window.dataLayer.push({
    //   event: GTM("Cotacao_MsgImportantes_Concordo"),
    // });
    /*End Google Tag Manager*/

    this.lightboxBehaviorClose();
    this.setState({ redirect: true });

    localStorage.setItem(
      "@bidu2/dados_cotacao",
      JSON.stringify({
        susep: this.state.cotacao.susep,
        preco: this.state.cotacao.resultadoCotacao.premioTotal,
        idProtocolo: this.state.cotacao.resultadoCotacao.idProtocolo,
        coberturas: this.state.cotacao.resultadoCotacao.coberturas,
        servicos: this.state.cotacao.resultadoCotacao.servicos,
        fipe: this.state.cotacao.resultadoCotacao.coberturaFipe,
        planosPagamento: "CREDITCARD",
        valorKm: this.state.cotacao.resultadoCotacao.valorKm,
      })
    );

    localStorage.setItem("@bidu2/idPPU", e);
  };

  escExitLightbox(event) {
    if (event.keyCode === 27) {
      this.lightboxBehaviorClose();
      this.setState({
        lightbox_custom: false,
        lightbox_details: false,
        lightbox_agree: false,
      });
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.escExitLightbox, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escExitLightbox, false);
  }

  render() {
    const {
      lightbox_custom,
      lightbox_details,
      lightbox_agree,
      fipe,
      guincho,
      ar_condicionado,
      ar,
      vidros,
      franquia,
      coberturas,
      danos_materiais_check,
      danos_materiais,
      danos_corporais_check,
      danos_corporais,
      danos_morais_check,
      danos_morais,
      morte_acidente_check,
      morte_acidente,
      invalidez_acidente_check,
      invalidez_acidente,
      redirect,
      cotacao,
    } = this.state;
    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: `/checkout/${localStorage.getItem("@bidu2/idcotacao")}`,
            state: { parcelas: "" },
          }}
        />
      );
    }
    return (
      <>
        {cotacao.statusComunicacao === "SUCESSO" && (
          <Grid key={cotacao.susep} item xs={12} sm={6}>
            <div className="list-price-quotation">
              <div className="logo-container">
                <figure className="logo-think">
                  <img
                    alt="Thinkseg"
                    src={`${require(`../assets/img/${cotacao.susep}.svg`)}`}
                  />
                </figure>
              </div>
              {cotacao.susep !== 4952 && (
                <div class="warning-quote">Seguro Completo</div>
              )}

              <Grid item spacing={0} className="table-header" container>
                <Grid item xs={6}>
                  <>
                    <span className="first-label">PayPerUse</span>
                    <span className="ppu-label">Pague quanto usa</span>
                  </>
                </Grid>
                <Grid item xs={6} className="txt-right">
                  <span className="top-label">Assinatura</span>

                  <span className="valor-parcela">
                    {ConvertCurrency(cotacao.resultadoCotacao.premioTotal)}
                  </span>
                </Grid>
              </Grid>

              <ListPriceQuotationServices cotacao={cotacao} />

              <Grid item spacing={0} className="table-footer" container>
                <Grid item xs={3}>
                  {/*<span className="bottom-links bottom-links-ppu">
                    Seguro completo
                  </span>*/}
                </Grid>
                <Grid
                  item
                  xs={6}
                  className="txt-center relative itens-center px05"
                >
                  <div
                    className="btn-comprar"
                    onClick={(e) =>
                      cotacao.resultadoCotacao.mensagens == null
                        ? this.BtnLightboxAgreeOpen(cotacao.id)
                        : this.BtnRedirectCheckout(cotacao.uuidPpu)
                    }
                  >
                    Comprar
                  </div>
                </Grid>
                <Grid item xs={3} className="txt-right">
                  <a
                    href="#"
                    onClick={(e) => this.BtnLightboxDetailsOpen(e)}
                    className="bottom-links"
                  >
                    Ver detalhes
                  </a>
                </Grid>
              </Grid>
            </div>
          </Grid>
        )}

        {lightbox_details && (
          <div
            className="custom lightbox"
            onClick={this.BtnLightboxDetailsOutClose}
          >
            <div className="content">
              <div className="header-title">
                <Title bold="Ver detalhes"></Title>
                <div
                  onClick={this.BtnLightboxDetailsClose}
                  className="btn-close"
                >
                  <CloseIcon />
                </div>
              </div>
              <div className="entry">
                <p className="subtitle bold">
                  Detalhes e assistências do seguro ThinkSeg
                </p>
                {cotacao.resultadoCotacao.valorKm && (
                  <p>
                    <span className="bold">Valor do KM Rodado</span>
                    <br />

                    <>
                      <span>{`R$ ${cotacao.resultadoCotacao.valorKm
                        .toFixed(2)
                        .replace(".", ",")}`}</span>
                      <br />
                    </>
                  </p>
                )}
                <p>
                  <span className="bold">Coberturas</span>
                </p>
                {cotacao.resultadoCotacao.coberturas
                  .filter((v) => v.valor !== 0)
                  .map((q, index) => (
                    <p key={index}>
                      <span className="bold">{q.descricao}</span>
                      <br />
                      {ConvertCurrency(q.valor)}
                    </p>
                  ))}
                {cotacao.resultadoCotacao.coberturaFipe && (
                  <p>
                    <span className="bold">Cobertura da FIPE</span>
                    <br />
                    <span>{cotacao.resultadoCotacao.coberturaFipe}%</span>
                  </p>
                )}
                <p>
                  <span className="bold">Valor da franquia</span> <br />
                  {cotacao.resultadoCotacao.franquias &&
                    cotacao.resultadoCotacao.franquias.map(
                      (v) =>
                        v.valor !== 0 && (
                          <>
                            <span>
                              {v.tipo + " - " + ConvertCurrency(v.valor)}
                            </span>
                            <br />
                          </>
                        )
                    )}
                </p>{" "}
                <p>
                  <span className="bold">Serviços e Assistências</span>
                  <br />
                  {cotacao.resultadoCotacao.servicos.map((q, index) => (
                    <>
                      <span key={index}>{q.descricao}</span>
                      <br />
                    </>
                  ))}
                </p>
              </div>
            </div>
          </div>
        )}

        {lightbox_agree && (
          <div
            className="custom lightbox"
            onClick={this.BtnLightboxAgreeOutClose}
          >
            <div className="content">
              <div className="header-title">
                <Title bold="IMPORTANTE"></Title>
                <div
                  onClick={this.BtnLightboxAgreeCloseX}
                  className="btn-close"
                >
                  <CloseIcon />
                </div>
              </div>
              <div className="entry">
                <p className="subtitle bold">
                  Atenção!
                  <br /> Mensagem da ThinkSeg. <br />
                  Leia atentamente!
                </p>
                {/*cotacao.resultadoCotacao.mensagens*/}
                <p>Obrigado por contratar seu seguro ThinkSeg!</p>
                <FormGroup row>
                  <div className="buttons">
                    <button
                      className="btn-outline"
                      onClick={this.BtnLightboxAgreeClose}
                    >
                      Não concordo
                    </button>
                    <button
                      className="btn-outline"
                      onClick={(e) => this.BtnRedirectCheckout(cotacao.uuidPpu)}
                    >
                      Concordo
                    </button>
                  </div>
                </FormGroup>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
