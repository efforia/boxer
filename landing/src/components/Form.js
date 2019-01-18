import React from 'react'

class Form extends React.Component {
    render() {
        return (
          <div className="section section-features section-subscribe section-no-padding" id="subscribe">
            <div className="parallax filter-gradient blue" data-color="blue">
              <div className="parallax-background banner-parallax"></div>
              <div className="info">
                <br />
                <br />
                <br />
                <h1><br />Eu quero fazer frete </h1>
                <br />
                <br />
                <section className="subscribe">
                  <input type="text" className="subscribe-input" id="subscribe-input" placeholder="Teu endereço de e-mail" />
                  <input type="text" className="subscribe-input" id="subscribe-input" placeholder="Nome" />
                  <input type="text" className="subscribe-input" id="subscribe-input" placeholder="Endereço completo" />
                  <input type="text" className="subscribe-input" id="subscribe-input" placeholder="Telefone para contato" />
                  {/*<input type="text" className="subscribe-input" id="subscribe-input" placeholder="Teu endereço de e-mail" />
                  <input type="text" className="subscribe-input" id="subscribe-input" placeholder="Teu endereço de e-mail" />*/}
                </section>
                <button className="btn-subscribe" id="subscribe-btn"> Cadastrar  </button>
              </div>
            </div>
          </div>
        );
    }
}

export default Form
