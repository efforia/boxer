import React from 'react'
import landing01 from "../assets/img/landing-01.png";
import landing02 from "../assets/svg/frete.svg";
import { animateScroll as scroll } from "react-scroll";


class Content extends React.Component {
  scrollToDiv(id) {
      var div = document.querySelector(`#${id}`);
      var offsetTop = div.offsetTop;
      scroll.scrollTo(offsetTop, { duration: 250 });
  }
  render() {
    return (
      <React.Fragment>
        <div id="border">
          <div className="row">
          <div className="twelve columns">
            <img alt="Borda decorativa" src={landing02}/>
          </div>
          </div>
        </div>
        <div id="presentation" class="bottom">
          <div className="container">
            <div className="row align">

              <div className="eight columns bottom-spacing">
                  <br/>
                  <p className="text-highlight">
                    Precisa transportar seus equipamentos, móveis ou
                    qualquer outra coisa pela cidade? Conheça os
                    freteiros, seu valor e escolha o frete ideal para você.
                  </p>
                  <button onClick={(e) => this.scrollToDiv('services')}>
                    Benefícios
                  </button>
                  <button onClick={(e) => this.scrollToDiv('subscribe')} className="button-primary">
                    Cadastre-se
                  </button>
              </div>
              <div className="four columns bottom">
                <img alt="Plano de fundo" src={landing01} />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Content
