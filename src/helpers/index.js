import { isMobile } from "mobile-device-detect";

export function StringCaptalize(str) {}

export function ConvertCurrency(number) {
  let value = parseFloat(number);
  let real = value.toFixed(2).split(".");
  real[0] = "R$ " + real[0].split(/(?=(?:...)*$)/).join(".");
  return real.join(",");
}

export function currencyFormatInput(num) {
  let value = parseFloat(num);
  let real = value.toFixed(2).split(".");
  real[0] = real[0].split(/(?=(?:...)*$)/).join(".");
  return real.join(",");
}

export function checkValidateRadios(field, props) {
  if (props.submitCount > 0) {
    if (props.errors[field]) {
      return "validate-radio-button";
    }
  }
}

export function checkBoxValidate(field, props) {
  if (props.submitCount > 0) {
    if (props.errors[field]) {
      return "invalid-checkbox";
    }
  }
}

export const onlyNumbers = (e, n) => {
  e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, n);
};

export function ConvertToNumber(number) {
  let value = parseInt(number);
  return value;
}

export function FormatDocument(number) {
  if (number) {
    let value = number.replace(/[^\d]+/g, "");
    return value;
  }
}
export function FormatDocument2(number) {
  if (number) {
    let value = number.replace(/[^\d]+/, "");
    return value;
  }
}

export function DateToTimestamp(date) {
  let myDate = date;
  myDate = myDate.split("-");
  let newDate = myDate[1] + "/" + myDate[0] + "/" + myDate[2];
  return new Date(newDate).getTime();
}

export function FuteDateCheckout(value) {
  let days = value;
  let date = new Date();
  let res = date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  let d = new Date(res);
  let month = d.getMonth() + 1;
  let day = d.getDate();

  let future =
    (day < 10 ? "0" : "") +
    day +
    "-" +
    (month < 10 ? "0" : "") +
    month +
    "-" +
    d.getFullYear();
  // console.log(future);
  return DateToTimestamp(future);
}

export const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export function GTM(e) {
  return isMobile ? `BD_MB_NL_AutoNovo_${e}` : `BD_IT_NL_AutoNovo_${e}`;
}
