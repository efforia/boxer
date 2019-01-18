import React from 'react'

class Form extends React.Component {
  subscribe() {
    alert("Obrigado!")
  }
    render() {
        return (
          <div className="section section-features section-subscribe section-no-padding" id="subscribe">
            <div className="parallax filter-gradient blue" data-color="blue">
              <div className="parallax-background banner-parallax"></div>
              <div className="info">
              <div className="col-md-6">
                <br />
                <h1><br />Eu faço frete </h1>
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
                <button className="btn-subscribe" id="subscribe-btn" onClick={(e) => this.subscribe(e)}> Cadastrar  </button>
              </div>
              <div className="col-md-6">
                <br />
                <h1><br />Eu quero um frete </h1>
                <br />
                <br />
                <section className="subscribe" id="mc_embed_signup">
                  <form action="https://fretefacil.us20.list-manage.com/subscribe/post?u=4acd3bfc9b0d30cdec21595e4&amp;id=09474778be" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
                    <div id="mc_embed_signup_scroll">
                      <div class="mc-field-group">
                        {/*<label for="mce-EMAIL">Email Address </label>*/}
                        <input type="email" value="" name="EMAIL" className="required email subscribe-input" id="mce-EMAIL" placeholder="Teu endereço de e-mail"/>
                      </div>
                      {/*<div id="mce-responses" class="clear">
                        <div class="response" id="mce-error-response" style="display:none"></div>
                        <div class="response" id="mce-success-response" style="display:none"></div>
                      </div>
                      <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_4acd3bfc9b0d30cdec21595e4_09474778be" tabindex="-1" value=""></div>*/}
                      <div class="clear">
                        <input type="submit" value="Saber mais" name="subscribe" id="mc-embedded-subscribe" className="btn-subscribe"/>
                      </div>
                    </div>
                  </form>
                </section>
              </div>
              <br />
              <br />
              </div>
            </div>
          </div>
        );
    }
}

export default Form
