import React from 'react'

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      username: "",
      birthDate: "",
      password: "",
      phone: "",
      vicinity: "",
      street: "",
      neighbourhood: "",
      city: "",
      state: "",
      country: "",
      complement: "",
      postalCode: "",
      type: "",
      number: "",
      pictures: [],
      role: ["CUSTOMER"],
      roles: ["CUSTOMER"]
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  subscribe(event) {
    // console.log(this.state)
    let data = this.state
    data.username = data.email
    data.address = {
      vicinity: data.neighbourhood,
      street: data.street,
      number: data.number,
      neighbourhood: data.neighbourhood,
      city: data.city,
      state: data.state,
      country: "Brasil",
      postalCode: data.postalCode,
      location: { lng: 0, lat: 0 },
    }
    data.documents = {
      type: "CNPJ",
      number: data.number
    }
    delete data.number
    delete data.street
    delete data.city
    delete data.state
    delete data.neighbourhood
    delete data.vicinity
    delete data.postalCode
    delete data.country
    // console.log(data)

    fetch('/user/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc2NDM2NzExNTI2ZTAwMTQyMjNkZGYiLCJpYXQiOjE1NDgwOTI1MTF9.Yj2kyy18vYKAY7ap_sCeMkflMk4yJ9yhmWDWtFnHFdU'
      },
      body: JSON.stringify(data)
    })//.then((response) => console.log(response.json()))
    alert("Obrigado!")
  }
  render() {
    return (
      <div id="subscribe">
        <div className="container">
          <h3 className="text-center">Eu faço frete</h3>
          <form className="subscribe">
            <div className="row">
              <div className="nine columns">
                <label for="streetInput">Endereço completo</label>
                <input
                type="text"
                id="streetInput"
                name="street"
                onChange={this.handleChange}
                placeholder="Praça Montevideo"
                />
              </div>
              <div className="three columns">
                <label for="numberStreetInput">Complemento</label>
                <input
                type="text"
                id="numberStreetInput"
                name="number"
                onChange={this.handleChange}
                placeholder="10"
                />
              </div>
            </div>
            <div className="row">
              <div className="three columns">
                <label for="neighbourhoodInput">Bairro</label>
                <input
                type="text"
                id="neighbourhoodInput"
                name="neighbourhood"
                onChange={this.handleChange}
                placeholder="Centro Histórico"
                />
              </div>
              <div className="four columns">
                <label for="cityInput">Cidade</label>
                <input
                type="text"
                id="cityInput"
                name="city"
                onChange={this.handleChange}
                placeholder="Porto Alegre"
                />
              </div>
              <div className="two columns">
                <label for="stateInput">Estado</label>
                <input
                type="text"
                id="stateInput"
                name="state"
                onChange={this.handleChange}
                placeholder="RS"
                />
              </div>
              <div className="three columns">
                <label for="postalCodeInput">Código Postal</label>
                <input
                type="text"
                id="postalCodeInput"
                name="postalCode"
                onChange={this.handleChange}
                placeholder="00000-000"
                />
              </div>
            </div>
            <div className="row">
              <div className="four columns">
                <label for="emailInput">Endereço de E-mail</label>
                <input
                type="email"
                id="emailInput"
                name="email"
                onChange={this.handleChange}
                placeholder="ola@exemplo.com.br"
                />
              </div>
              <div className="four columns">
                <label for="passwordInput">Senha</label>
                <input
                type="password"
                id="passwordInput"
                name="password"
                onChange={this.handleChange}
                />
              </div>
              <div className="four columns">
                <label for="phoneInput">Telefone para contato</label>
                <input
                type="text"
                id="phoneInput"
                name="phone"
                onChange={this.handleChange}
                placeholder="(00) 0000-0000"
                />
              </div>
            </div>
            <div className="row">
              <div className="seven columns">
                <label for="nameInput">Nome Completo</label>
                <input
                type="text"
                id="nameInput"
                name="name"
                onChange={this.handleChange}
                placeholder="Insira seu nome completo"
                />
              </div>
              <div class="two columns">
                <label for="birthInput">Nascimento</label>
                <input
                type="text"
                id="birthInput"
                name="birthDate"
                onChange={this.handleChange}
                placeholder="00/00/0000"
                />
              </div>
              <div class="three columns">
                <label for="taxInput">Registro de CPF/CNPJ</label>
                <input
                type="text"
                id="taxInput"
                name="number"
                onChange={this.handleChange}
                placeholder="000.000.000-00"
                />
              </div>
            </div>
            <div className="row text-center">
              <label for="descriptionMessage" style={{ textAlign: "left" }}>Informações Adicionais</label>
              <textarea class="u-full-width" placeholder="Insira informações sobre se tem baú, o veículo é aberto ou fechado..." id="descriptionMessage"></textarea>
              <br/>
              <button className="button-primary" onClick={(e) => this.subscribe(e)}> Cadastrar </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Form
