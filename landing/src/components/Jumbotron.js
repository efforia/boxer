import React from 'react';
import Background from "../assets/img/backgrounds/bg-01.jpg";
import logo from "../assets/img/logo.svg";

class Jumbotron extends React.Component {
  scrollToDiv(id) {
      var div = document.querySelector(`#${id}`);
      var offsetTop = div.offsetTop;
      scroll.scrollTo(offsetTop, { duration: 250 });
  }

    render() {
        return (
          <div id="jumbotron" style={{ backgroundImage: `url(${Background})` }}>
            <div className="orange top">
              <div className="container">
                <div className="row text-center">
                  <div className="twelve columns">
                    <img src={logo} alt="Logo do Frete Fácil" style={{ width: "60vw" }}/>
                    <h5 className="text-logo">Simplifique seu transporte!</h5>
                    {/*<button className="btn-section" onClick={(e) => this.scrollToDiv('presentation')}>Saiba mais</button>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>

        )
    }
}

export default Jumbotron
