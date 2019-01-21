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
      number: "",
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
          <div className="section section-features section-subscribe section-no-padding" id="subscribe">
            <div className="parallax filter-gradient blue" data-color="blue">
              <div className="parallax-background banner-parallax"></div>
              <div className="info">
                <h1>Eu faço frete </h1>
                <section className="subscribe">
                  <input type="text" className="subscribe-input" name="street" onChange={this.handleChange} placeholder="Endereço completo" />
                  <input type="number" className="subscribe-input" name="number" onChange={this.handleChange} placeholder="Número" />
                  <input type="text" className="subscribe-input" name="neighbourhood" onChange={this.handleChange} placeholder="Bairro" />
                  <input type="text" className="subscribe-input" name="city" onChange={this.handleChange} placeholder="Cidade" />
                  <input type="text" className="subscribe-input" name="state" onChange={this.handleChange} placeholder="Estado" />
                  <input type="text" className="subscribe-input" name="postalCode" onChange={this.handleChange} placeholder="Código Postal" />
                  <input type="email" className="subscribe-input" name="email" onChange={this.handleChange} placeholder="Teu endereço de e-mail" />
                  <input type="text" className="subscribe-input" name="name" onChange={this.handleChange} placeholder="Nome completo" />
                  <input type="text" className="subscribe-input" name="phone" onChange={this.handleChange} placeholder="Telefone para contato" />
                  <input type="password" className="subscribe-input" name="password" onChange={this.handleChange} placeholder="Senha" />
                  <input type="text" className="subscribe-input" name="birthDate" onChange={this.handleChange} placeholder="Data de nascimento" />
                  <input type="text" className="subscribe-input" name="number" onChange={this.handleChange} placeholder="Registro de CPF/CNPJ" />
                </section>
                <button className="btn-subscribe" id="subscribe-btn" onClick={(e) => this.subscribe(e)}> Cadastrar  </button>
              </div>
            </div>
          </div>
        );
    }
}

export default Form
