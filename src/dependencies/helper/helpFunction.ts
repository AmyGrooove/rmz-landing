export const shortAddress = (id?: string) => {
  if (id) {
    return `${id.slice(0, 4)}***${id.slice(-4)}`;
  } else {
    return "";
  }
};

export const addThousandComma = (num: string | number, decimalCount = 4) => {
  let result;
  const [integer, fraction] = num.toString().split(".");
  const integerWithComma = integer.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  result = integerWithComma;
  if (integer.length < 8 && !!fraction) {
    result = `${integerWithComma}.${fraction.slice(0, decimalCount)}`;
  }

  if (integer === "0" && !!fraction) {
    result = `${integerWithComma}`;
  }

  return result;
};

export const copyToClipboard = (value: string): void => {
  const el = document.createElement("textarea");
  el.value = value;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};
