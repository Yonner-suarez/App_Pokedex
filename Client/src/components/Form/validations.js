const validations = (form, errors, setErrors) => {
  //creo una variable en la cual gurde una copia de errors que me envian por paramentro
  const error = { ...errors };

  //valido que el nombre del pokemon no venga vaicio, que sea una string, no tenga una logitud mayor a 15, si todas estas condiciones se cumplen se vaciará la prop name de error
  if (!form.name) {
    error.name = "Input the name";
  } else if (typeof form.name !== "string") {
    error.name = "Name invalid";
  } else if (form.name.length > 15) {
    error.name = "Name too long";
  } else {
    error.name = "";
  }

  //de igual manera hago las siguientes validaciones para el resto del formulario
  if (!form.image) {
    error.image = "Input link of image";
  } else if (
    !/^(ftp|http|https):\/\/[^ "]+$/ ||
    !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|svg|jpeg)/.test(form.image)
  ) {
    error.image = "Link invalid";
  } else {
    error.image = "";
  }
  if (!form.vida) {
    error.vida = "Input Hp of your Pokemon";
  } else if (typeof form.vida !== "number") {
    error.vida = "The hp must be a number";
  } else if (!/^[1-9]?[0-9]{1}$|^100$/.test(form.vida)) {
    error.vida = "Hp between 1 to 100";
  } else {
    error.vida = "";
  }

  if (!form.ataque) {
    error.ataque = "Input Atack";
  } else if (typeof form.ataque !== "number") {
    error.ataque = "The hp must be a number";
  } else if (!/^[1-9]?[0-9]{1}$|^100$/.test(form.ataque)) {
    error.ataque = "Hp between 1 to 100";
  } else {
    error.ataque = "";
  }

  if (!form.defensa) {
    error.defensa = "Input Defense";
  } else if (typeof form.defensa !== "number") {
    error.defensa = "The hp must be a number";
  } else if (!/^[1-9]?[0-9]{1}$|^100$/.test(form.defensa)) {
    error.defensa = "Hp between 1 to 100";
  } else {
    error.defensa = "";
  }

  if (!form.velocidad) {
    error.velocidad = "Input speed";
  } else if (typeof form.velocidad !== "number") {
    error.velocidad = "The hp must be a number";
  } else if (!/^[1-9]?[0-9]{1}$|^100$/.test(form.velocidad)) {
    error.velocidad = "Hp between 1 to 100";
  } else {
    error.velocidad = "";
  }

  if (!/^[1-9]?[0-9]{1}$|^70$/.test(form.altura)) {
    error.altura = "Height between 1 to 100";
  } else {
    error.altura = "";
  }
  if (!/^[1-9]?[0-9]{1}$|^70$/.test(form.peso)) {
    error.peso = "Weight between 1 to 100";
  } else {
    error.peso = "";
  }
  if (!Array.isArray(form.tipo)) {
    error.tipo = "no se reconoce el tipo ingresado";
  } else {
    error.tipo = "";
  }
  // por ultimo seteo el estado errors pasandole la variable error
  setErrors(error);
};

export default validations;
