import React from 'react';
import screens from "../assets/img/telas.png";
import { animateScroll as scroll } from "react-scroll";

class Benefits extends React.Component {
  scrollToDiv(id) {
      var div = document.querySelector(`#${id}`);
      var offsetTop = div.offsetTop;
      scroll.scrollTo(offsetTop, { duration: 250 });
  }

  render() {
    return (
      <div id="services">
        <div className="container">
          <div className="row">
            <div className="four columns invisible">
              <img src={screens}/>
            </div>
            <div className="eight columns">
              <h4 className="text-header">Benefícios</h4>
                <div className="row">
                  <div className="six columns">
                    <div className="bar"></div>
                    <h4 className="text-subheader">Visibilidade</h4>
                    <p>Conheça todos os freteiros à disposição.</p>
                  </div>
                  <div className="six columns">
                    <div className="bar"></div>
                    <h4 className="text-subheader">Valor</h4>
                    <p>Compare os valores e o custo/benefício.</p>
                  </div>
                </div>
                <div className="row">
                  <div className="six columns">
                    <div className="bar"></div>
                    <h4 className="text-subheader">Segurança <br /></h4>
                    <p>Tenha seus pertences transportados com segurança.</p>
                  </div>
                  <div className="six columns">
                    <div className="bar"></div>
                    <h4 className="text-subheader">Confiança</h4>
                    <p>Avalie seu freteiro para compartilhar a experiência.</p>
                  </div>
                </div>
                {/*<div className="text-center">
                  <br />
                  <br />
                  <button onClick={(e) => this.scrollToDiv('subscribe')} className="btn-primary btn-section">Quero me cadastrar!</button>
                  <br />
                </div>*/}
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Benefits
