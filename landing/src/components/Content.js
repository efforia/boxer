import React from 'react'
import landing01 from "../assets/img/landing-01.png";
import logo from "../assets/img/logo.png";
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
          <div className="section section-features section-motivation section-light" id="presentation">
              <div className="container" data-aos="zoom-in">
                  <div className="row">
                      <div className="col-md-6">
                          <div className="description">
                              <section className="header-text">Por que criamos o Frete Fácil?</section>
                          </div>
                          <div className="advantages">
                            <br/>
                              <p className="text-highlight">
                                Precisa transportar seus equipamentos, móveis ou
                                qualquer outra coisa pela cidade? Conheça os
                                freteiros, seu valor e escolha o frete ideal para você.
                              </p>
                              <br/>
                          </div>
                          <div className="text-center">
                              <button className="btn-section btn-primary" onClick={(e) => this.scrollToDiv('academical-services')}>
                                Benefícios
                              </button>
                              <button onClick={(e) => this.scrollToDiv('subscribe')} className="btn-primary btn-section">
                                Cadastre-se
                              </button>
                              {/*<button className="btn-section btn-primary" onClick={(e) => this.scrollToDiv('academical-services')}>
                                  Para produtores
                              </button>
                              <button className="btn-section btn-primary" onClick={(e) => this.scrollToDiv('academical-services')}>
                                  Para restaurantes
                              </button>
                              <button className="btn-section btn-primary" onClick={(e) => this.scrollToDiv('academical-services')}>
                                  Para entregadores
                              </button>*/}
                          </div>
                      </div>
                      <div className="col-md-5 col-md-offset-1 hidden-xs hidden-sm">
                          <img className="right-image" src={landing01} />
                      </div>
                  </div>
              </div>
          </div>
          <div className="section section-features section-colorful section-user" id="academical-services">
              <div className="container" data-aos="zoom-in">
                  <h4 className="header-text text-center">Para você</h4>
                  <div className="row">
                      <div className="col-md-3">
                          <div className="card card-blue">
                              <div className="icon">
                                  <i className="fa fa-list"></i>
                              </div>
                              <div className="text">
                                  <h4>Visibilidade</h4>
                                  <p className="text-center">Conheça todos os freteiros à disposição.</p>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="card card-blue">
                              <div className="icon">
                                  <i className="fa fa-refresh"></i>
                              </div>
                              <h4>Valor</h4>
                              <p className="text-center">Compare os valores e o custo/benefício.</p>
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="card card-blue">
                              <div className="icon">
                                  <i className="fa fa-search"></i>
                              </div>
                              <h4>Segurança <br /></h4>
                              <p className="text-center">Tenha seus pertences transportados com segurança.</p>
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="card card-blue">
                              <div className="icon">
                                  <i className="fa fa-bar-chart"></i>
                              </div>
                              <h4>Confiança <br /></h4>
                              <p className="text-center">Avalie seu freteiro para compartilhar a experiência.</p>
                          </div>
                      </div>
                  </div>
                  <div className="text-center">
                      <br />
                      <br />
                      <a onClick={(e) => this.scrollToDiv('subscribe')} className="btn-primary btn-section">Quero me cadastrar!</a>
                      <br />
                  </div>
              </div>
          </div>
          {/*<div className="section section-features section-light section-user" id="academical-services">
              <div className="container" data-aos="zoom-in">
                  <h4 className="header-text text-center">Para produtores orgânicos</h4>
                  <div className="row">
                      <div className="col-md-3">
                          <div className="card card-blue">
                              <div className="icon">
                                  <i className="fa fa-list"></i>
                              </div>
                              <div className="text">
                                  <h4>Lorem</h4>
                                  <p>Lorem Ipsum dollem fabricsom de ideiasom sit amet.</p>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="card card-blue">
                              <div className="icon">
                                  <i className="fa fa-refresh"></i>
                              </div>
                              <h4>Ipsum</h4>
                              <p>Lorem Ipsum dollem fabricsom de ideiasom sit amet.</p>
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="card card-blue">
                              <div className="icon">
                                  <i className="fa fa-search"></i>
                              </div>
                              <h4>Dollem <br /></h4>
                              <p>Lorem Ipsum dollem fabricsom de ideiasom sit amet.</p>
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="card card-blue">
                              <div className="icon">
                                  <i className="fa fa-bar-chart"></i>
                              </div>
                              <h4>Sit <br /></h4>
                              <p>Lorem Ipsum dollem fabricsom de ideiasom sit amet.</p>
                          </div>
                      </div>
                  </div>
                  <div className="text-center">
                      <br />
                      <br />
                      <a onClick={(e) => this.scrollToDiv('subscribe')} className="btn-primary btn-section">Quero me cadastrar!</a>
                      <br />
                  </div>
              </div>
          </div>
          <div className="section section-features section-colorful section-user" id="academical-services">
              <div className="container" data-aos="zoom-in">
                  <h4 className="header-text text-center">Para restaurantes</h4>
                  <div className="row">
                      <div className="col-md-3">
                          <div className="card card-blue">
                              <div className="icon">
                                  <i className="fa fa-list"></i>
                              </div>
                              <div className="text">
                                  <h4>Lorem</h4>
                                  <p>Lorem Ipsum dollem fabricsom de ideiasom sit amet.</p>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="card card-blue">
                              <div className="icon">
                                  <i className="fa fa-refresh"></i>
                              </div>
                              <h4>Ipsum</h4>
                              <p>Lorem Ipsum dollem fabricsom de ideiasom sit amet.</p>
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="card card-blue">
                              <div className="icon">
                                  <i className="fa fa-search"></i>
                              </div>
                              <h4>Dollem <br /></h4>
                              <p>Lorem Ipsum dollem fabricsom de ideiasom sit amet.</p>
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="card card-blue">
                              <div className="icon">
                                  <i className="fa fa-bar-chart"></i>
                              </div>
                              <h4>Sit <br /></h4>
                              <p>Lorem Ipsum dollem fabricsom de ideiasom sit amet.</p>
                          </div>
                      </div>
                  </div>
                  <div className="text-center">
                      <br />
                      <br />
                      <a onClick={(e) => this.scrollToDiv('subscribe')} className="btn-primary btn-section">Quero me cadastrar!</a>
                      <br />
                  </div>
              </div>
          </div>
          <div className="section section-features section-light section-user" id="academical-services">
              <div className="container" data-aos="zoom-in">
                  <h4 className="header-text text-center">Para entregadores</h4>
                  <div className="row">
                      <div className="col-md-3">
                          <div className="card card-blue">
                              <div className="icon">
                                  <i className="fa fa-list"></i>
                              </div>
                              <div className="text">
                                  <h4>Lorem</h4>
                                  <p>Lorem Ipsum dollem fabricsom de ideiasom sit amet.</p>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="card card-blue">
                              <div className="icon">
                                  <i className="fa fa-refresh"></i>
                              </div>
                              <h4>Ipsum</h4>
                              <p>Lorem Ipsum dollem fabricsom de ideiasom sit amet.</p>
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="card card-blue">
                              <div className="icon">
                                  <i className="fa fa-search"></i>
                              </div>
                              <h4>Dollem <br /></h4>
                              <p>Lorem Ipsum dollem fabricsom de ideiasom sit amet.</p>
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="card card-blue">
                              <div className="icon">
                                  <i className="fa fa-bar-chart"></i>
                              </div>
                              <h4>Sit <br /></h4>
                              <p>Lorem Ipsum dollem fabricsom de ideiasom sit amet.</p>
                          </div>
                      </div>
                  </div>
                  <div className="text-center">
                      <br />
                      <br />
                      <a onClick={(e) => this.scrollToDiv('subscribe')} className="btn-primary btn-section">Quero me cadastrar!</a>
                      <br />
                  </div>
              </div>
          </div>*/}
          </React.Fragment>
        )
    }
}

export default Content
