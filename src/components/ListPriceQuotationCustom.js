import React, { Component } from "react";
import { ConvertCurrency } from "../helpers";
import Grid from "@material-ui/core/Grid";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import Title from "./Title";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link, Redirect } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

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

export class ListPriceQuotationCustom extends Component {
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
      carro_reserva: 1,
      vidros: 1,
      franquia: 1,
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
      cotacao: JSON.parse(this.props.quote)[0],
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
  onCarroReservaChange = (value) => {
    log(value);
    this.setState({
      carro_reserva: value,
    });
  };
  onVidrosChange = (value) => {
    log(value);
    this.setState({
      vidros: value,
    });
  };
  onFranquiaChange = (value) => {
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
  };
  BtnLightboxAgreeClose = (e) => {
    e.preventDefault();
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
  BtnLightboxAgreeOpen = () => {
    this.setState({ lightbox_agree: true });
    this.lightboxBehaviorOpen();
  };
  BtnRedirectCheckout = () => {
    this.lightboxBehaviorClose();
    this.setState({ redirect: true });
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

  UpdateCustomQuote = () => {
    this.props.getQuote(this.state);
    this.lightboxBehaviorClose();
  };

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
      return <Redirect to={`/checkout/${localStorage.getItem("@bidu2/idcotacao")}`}/>;
    }
    return (
      <>
        <div className="list-price-quotation custom">
          <div className="logo-container">
            <figure className="logo-hdmi">
              <img alt="hdmi" src={`${require("../assets/img/hdmi.png")}`} />
            </figure>
          </div>
          <Grid item spacing={0} className="table-header" container>
            <Grid item xs={6}>
              <>
                <span className="top-label">Valor total</span>
                <span className="valor-total">
                  {ConvertCurrency(cotacao.resultadoCotacao.premioTotal)}
                </span>
              </>
            </Grid>
            <Grid item xs={6} className="txt-right">
              <span className="top-label">Até 00x sem juros</span>
              <span className="valor-parcela">R$ 0.000,00</span>
            </Grid>
          </Grid>

          <table className="table-body">
            <tbody>
              <tr>
                <td className="coberturas">
                  <figure className="icon">
                    <img
                      alt="hdmi"
                      src={`${require("../assets/img/svg-icons/guincho.svg")}`}
                    />
                  </figure>
                  <br />
                  Guincho
                </td>

                <td className="coberturas">
                  <figure className="icon">
                    <img
                      alt="hdmi"
                      src={`${require("../assets/img/svg-icons/carro-reserva.svg")}`}
                    />
                  </figure>
                  <br />
                  Carro reserva
                </td>

                <td className="coberturas">
                  <figure className="icon">
                    <img
                      alt="hdmi"
                      src={`${require("../assets/img/svg-icons/vidros.svg")}`}
                    />
                  </figure>
                  <br />
                  Vidro
                </td>
                <td className="coberturas">
                  <figure className="icon">
                    <img
                      alt="hdmi"
                      src={`${require("../assets/img/svg-icons/economiza.svg")}`}
                    />
                  </figure>
                  <br />
                  Franquia
                </td>
              </tr>
              <tr>
                <td>
                  {cotacao.resultadoCotacao.servicos.some(
                    (q) => q.tipo === "GUINCHO_24H"
                  ) ? (
                    <CheckCircleIcon color="primary" />
                  ) : (
                    <CancelIcon color="secondary" />
                  )}
                </td>
                <td>
                  {cotacao.resultadoCotacao.servicos.some(
                    (q) => q.tipo === "CARRO_RESERVA"
                  ) ? (
                    <CheckCircleIcon color="primary" />
                  ) : (
                    <CancelIcon color="secondary" />
                  )}
                </td>
                <td>
                  {cotacao.resultadoCotacao.servicos.some(
                    (q) => q.tipo === "VIDROS_BASICOS"
                  ) ? (
                    <CheckCircleIcon color="primary" />
                  ) : (
                    <CancelIcon color="secondary" />
                  )}
                </td>

                <td>
                  <span className="franquia">
                    {cotacao.resultadoCotacao.franquias
                      .filter((t) => t.tipo === "CASCO")
                      .map((v) => ConvertCurrency(v.valor))}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <Grid item spacing={0} className="table-footer" container>
            <Grid item xs={3}>
              <a
                href="#"
                className="bottom-links"
                onClick={(e) => this.BtnCustomboxOpen(e)}
              >
                Customizar
              </a>
            </Grid>
            <Grid item xs={6} className="txt-center relative itens-center px05">
              <div className="btn-comprar" onClick={this.BtnLightboxAgreeOpen}>
                Comprar
              </div>
            </Grid>
            <Grid item xs={3} className="txt-right">
              <a
                href="#"
                title="Ver detalhes"
                onClick={(e) => this.BtnLightboxDetailsOpen(e)}
                className="bottom-links"
              >
                Ver detalhes
              </a>
            </Grid>
          </Grid>
        </div>

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
                  Detalhes e assistências do seguro *NOME DA SEGURADORA*
                </p>
                <p>
                  <span className="bold">Cobertura</span>
                  <br />
                  Incêndio
                  <br />
                  Roubo e Furto
                  <br />
                  Colisão e Danos Causados pela Natureza
                </p>
                <p>
                  <span className="bold">Coberturas de Vidros</span>
                  <br />
                  Sem cobertura de vidros.
                </p>
                <p>
                  <span className="bold">Danos materiais</span>
                  <br />
                  R$ 100.000,00
                </p>
                <p>
                  <span className="bold">Morte por acidente</span>
                  <br />
                  R$ 5.000,00
                </p>
                <p>
                  <span className="bold">Danos corporais</span>
                  <br />
                  R$ 100.000,00
                </p>
                <p>
                  <span className="bold">Assistência por invalidez</span>
                  <br />
                  R$ 5.000,00
                </p>
                <p>
                  <span className="bold">Danos morais</span>
                  <br />
                  R$ 40.000,00
                </p>
                <p>
                  <span className="bold">Cobertura da FIPE</span>
                  <br />
                  100.0%
                </p>
                <p>
                  <span className="bold">Serviços e Assistências</span>
                  <br />
                  - Guincho 400 km
                  <br />
                  - Socorro mecânico e guincho para reboque do veículo
                  <br />
                  - Assistência ou reboque em caso de falta de combustível (Pane
                  seca)
                  <br />
                  - Assistência profissional para troca de pneus
                  <br />- Serviços de chaveiro para o veículo
                </p>
              </div>
            </div>
          </div>
        )}

        {lightbox_custom && (
          <div className="custom lightbox" onClick={this.BtnCustomOutClose}>
            <div className="content">
              <div className="header-title mb1">
                <Title bold="Customizar"></Title>
                <div onClick={this.BtnCustomClose} className="btn-close">
                  <CloseIcon />
                </div>
              </div>
              <div className="infos">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <label className="block mb1">Cobertura Fipe</label>
                    <div className="range-bar">
                      <Slider
                        min={85}
                        max={110}
                        name="fipe"
                        marks={marks_fipe}
                        step={null}
                        value={this.state.fipe}
                        onChange={this.onFipeChange}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <p className="bold pt05">Assistência</p>
                  </Grid>
                  <Grid item xs={12}>
                    <label className="block mb1">Guincho</label>
                    <div className="range-bar">
                      <Slider
                        min={200}
                        max={600}
                        name="guincho"
                        marks={marks_guincho}
                        step={null}
                        value={this.state.guincho}
                        onChange={this.onGuinchoChange}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="range ar">
                      <div className="pb05">
                        <label className="block pb05">Carro reserva</label>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={ar_condicionado}
                              onChange={this.handleChangeSwitch(
                                "ar_condicionado"
                              )}
                              value={ar_condicionado}
                              name="ar_condicionado"
                              color="primary"
                            />
                          }
                          label="Com ar"
                        />
                      </div>
                    </div>
                    <div className="range-bar">
                      <Slider
                        min={1}
                        max={4}
                        name="carro_reserva"
                        marks={marks_carro_reserva}
                        step={null}
                        value={this.state.carro_reserva}
                        onChange={this.onCarroReservaChange}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <label className="block mb1">Cobertura de vidros</label>
                    <div className="range-bar">
                      <Slider
                        min={1}
                        max={3}
                        name="vidros"
                        marks={marks_vidros}
                        step={null}
                        value={this.state.vidros}
                        onChange={this.onVidrosChange}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="remark">
                      <p>
                        *Básica: Para-brisas dianteiros, traseiros e laterais
                        <br />
                        *Completa: Para-brisas dianteiros, traseiros e laterais
                        + retrovisores, faróis dianteiros e traseiros
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <label className="block mb1">Franquia</label>
                    <div className="range-bar">
                      <Slider
                        min={1}
                        max={3}
                        name="franquia"
                        marks={marks_franquia}
                        step={null}
                        value={this.state.franquia}
                        onChange={this.onFranquiaChange}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <label className="block mb1">Coberturas</label>
                    <div className="range-bar">
                      <Slider
                        min={1}
                        max={2}
                        name="coberturas"
                        marks={marks_coberturas}
                        step={null}
                        value={this.state.coberturas}
                        onChange={this.onCoberturasChange}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <p className="bold pt05">Cobertura de terceiros</p>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="switch-range">
                      <FormControlLabel
                        control={
                          <Switch
                            checked={danos_materiais_check}
                            onChange={this.handleChangeSwitch(
                              "danos_materiais_check"
                            )}
                            value={danos_materiais_check}
                            name="danos_materiais_check"
                            color="primary"
                          />
                        }
                        label="Danos materiais"
                      />
                      <div className="value">{danos_materiais} mil</div>
                    </div>
                    {danos_materiais_check && (
                      <div className="range-bar pt05">
                        <Slider
                          min={10}
                          max={50}
                          name="danos_materiais"
                          marks={marks_danos_materiais}
                          step={1}
                          value={this.state.danos_materiais}
                          onChange={this.onDanosMateriaisChange}
                        />
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <div className="switch-range">
                      <FormControlLabel
                        control={
                          <Switch
                            checked={danos_corporais_check}
                            onChange={this.handleChangeSwitch(
                              "danos_corporais_check"
                            )}
                            value={danos_corporais_check}
                            name="danos_corporais_check"
                            color="primary"
                          />
                        }
                        label="Danos corporais"
                      />
                      <div className="value">{danos_corporais} mil</div>
                    </div>
                    {danos_corporais_check && (
                      <div className="range-bar pt05">
                        <Slider
                          min={10}
                          max={50}
                          name="danos_corporais"
                          marks={marks_danos_corporais}
                          step={1}
                          value={this.state.danos_corporais}
                          onChange={this.onDanosCorporaisChange}
                        />
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <div className="switch-range">
                      <FormControlLabel
                        control={
                          <Switch
                            checked={danos_morais_check}
                            onChange={this.handleChangeSwitch(
                              "danos_morais_check"
                            )}
                            value={danos_morais_check}
                            name="danos_morais_check"
                            color="primary"
                          />
                        }
                        label="Danos morais"
                      />
                      <div className="value">{danos_morais} mil</div>
                    </div>
                    {danos_morais_check && (
                      <div className="range-bar pt05">
                        <Slider
                          min={5}
                          max={50}
                          name="danos_morais"
                          marks={marks_danos_morais}
                          step={1}
                          value={this.state.danos_morais}
                          onChange={this.onDanosMoraisChange}
                        />
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <p className="bold pt05">Cobertura de passageiros</p>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="switch-range">
                      <FormControlLabel
                        control={
                          <Switch
                            checked={morte_acidente_check}
                            onChange={this.handleChangeSwitch(
                              "morte_acidente_check"
                            )}
                            value={morte_acidente_check}
                            name="danos_morais_check"
                            color="primary"
                          />
                        }
                        label="Morte por acidente"
                      />
                      <div className="value">{morte_acidente} mil</div>
                    </div>
                    {morte_acidente_check && (
                      <div className="range-bar pt05">
                        <Slider
                          min={5}
                          max={50}
                          name="morte_acidente"
                          marks={marks_morte_acidente}
                          step={1}
                          value={this.state.morte_acidente}
                          onChange={this.onMorteAcidenteChange}
                        />
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <div className="switch-range">
                      <FormControlLabel
                        control={
                          <Switch
                            checked={invalidez_acidente_check}
                            onChange={this.handleChangeSwitch(
                              "invalidez_acidente_check"
                            )}
                            value={invalidez_acidente_check}
                            name="invalidez_acidente_check"
                            color="primary"
                          />
                        }
                        label="Invalidez por acidente"
                      />
                      <div className="value">{invalidez_acidente} mil</div>
                    </div>
                    {invalidez_acidente_check && (
                      <div className="range-bar pt05">
                        <Slider
                          min={5}
                          max={50}
                          name="invalidez_acidente"
                          marks={marks_invalidez_acidente}
                          step={1}
                          value={this.state.invalidez_acidente}
                          onChange={this.onInvalidezAcidenteChange}
                        />
                      </div>
                    )}
                  </Grid>
                </Grid>
              </div>
              <div className="actions">
                <Link className="btn-next" onClick={this.UpdateCustomQuote}>
                  Continuar compra
                </Link>
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
                <div onClick={this.BtnLightboxAgreeClose} className="btn-close">
                  <CloseIcon />
                </div>
              </div>
              <div className="entry">
                <p className="bold subtitle">
                  Atenção!
                  <br />
                  Mensagem da SulAmérica. <br />
                  Leia atentamente!
                </p>
                <p>
                  Lorem Ipsum é simplesmente uma simulação de texto da indústria
                  tipográfica e de impressos, e vem sendo utilizado desde o
                  século XVI, quando um impressor desconhecido pegou uma bandeja
                  de tipos e os embaralhou para fazer um livro de modelos de
                  tipos.
                </p>
                <p>
                  Lorem Ipsum é simplesmente uma simulação de texto da indústria
                  tipográfica e de impressos, e vem sendo utilizado desde o
                  século XVI, quando um impressor desconhecido pegou uma bandeja
                  de tipos e os embaralhou para fazer um livro de modelos de
                  tipos.
                </p>
                <p>
                  Lorem Ipsum é simplesmente uma simulação de texto da indústria
                  tipográfica e de impressos, e vem sendo utilizado desde o
                  século XVI, quando um impressor desconhecido pegou uma bandeja
                  de tipos e os embaralhou para fazer um livro de modelos de
                  tipos.
                </p>
                <p>
                  Lorem Ipsum é simplesmente uma simulação de texto da indústria
                  tipográfica e de impressos, e vem sendo utilizado desde o
                  século XVI, quando um impressor desconhecido pegou uma bandeja
                  de tipos e os embaralhou para fazer um livro de modelos de
                  tipos.
                </p>
                <p>
                  Lorem Ipsum é simplesmente uma simulação de texto da indústria
                  tipográfica e de impressos, e vem sendo utilizado desde o
                  século XVI, quando um impressor desconhecido pegou uma bandeja
                  de tipos e os embaralhou para fazer um livro de modelos de
                  tipos.
                </p>
                <p>
                  Lorem Ipsum é simplesmente uma simulação de texto da indústria
                  tipográfica e de impressos, e vem sendo utilizado desde o
                  século XVI, quando um impressor desconhecido pegou uma bandeja
                  de tipos e os embaralhou para fazer um livro de modelos de
                  tipos.
                </p>
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
                      onClick={this.BtnRedirectCheckout}
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
