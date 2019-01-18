import React from "react";
import Helmet from "react-helmet";

import Layout from '../components/layout';
import Testimonials from '../components/Testimonials';

import landing01 from "../assets/img/landing-01.png";
import logo from "../assets/img/logo.png";
import { animateScroll as scroll } from "react-scroll";

class HomePage extends React.Component {
    scrollToDiv(id) {
        var div = document.querySelector(`#${id}`);
        var offsetTop = div.offsetTop;
        scroll.scrollTo(offsetTop, { duration: 250 });
    }

    render() {
        const siteTitle = "Amora";
        return (
            <Layout>
                <Helmet title={siteTitle} />
                <div className="wrapper">
                    <div className="parallax filter-gradient blue section-colorful hero-image" data-color="blue">
                        <div className="parallax-background banner-parallax"></div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3 header-logo">
                                    <img src={logo} width="175" height="175" />
                                </div>
                                <div className="col-md-9">
                                    <div className="description">
                                        <h1>A vida anda muito corrida pra se alimentar bem?</h1>
                                        <h3>Chegou ao lugar certo!</h3>
                                        <h5>
                                            Conheça a Amora: <br /> A sua nova plataforma de alimentação saudável! </h5>
                                        <a className="btn-section" onClick={(e) => this.scrollToDiv('presentation')}>Saiba mais</a>
                                    </div>
                                </div>
                                <a className="scroll-anchor" onClick={(e) => this.scrollToDiv('presentation')}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="section section-features section-motivation section-light" id="presentation">
                        <div className="container" data-aos="zoom-in">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="description">
                                        <section className="header-text">Por que criamos a Amora?</section>
                                    </div>
                                    <div className="advantages">
                                        <ul>
                                            <li>
                                                <span>
                                                    Foo foo foo foo foo foo foo foo.
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    Foo foo foo foo foo foo foo foo.
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    Foo foo foo foo foo foo foo foo.
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    Foo foo foo foo foo foo foo foo.
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    Foo foo foo foo foo foo foo foo.
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn-section btn-primary" onClick={(e) => this.scrollToDiv('academical-services')}>
                                            Para você
                                        </button>
                                        <button className="btn-section btn-primary" onClick={(e) => this.scrollToDiv('academical-services')}>
                                            Para produtores
                                        </button>
                                        <button className="btn-section btn-primary" onClick={(e) => this.scrollToDiv('academical-services')}>
                                            Para restaurantes
                                        </button>
                                        <button className="btn-section btn-primary" onClick={(e) => this.scrollToDiv('academical-services')}>
                                            Para entregadores
                                        </button>
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
                    </div>
                    <div className="section section-features section-subscribe section-no-padding" id="subscribe">
                        <div className="parallax filter-gradient blue" data-color="blue">
                            <div className="parallax-background banner-parallax"></div>
                            <div className="info">
                                <br />
                                <br />
                                <br />
                                <h1><br />Vamos lorem ipsum! </h1>
                                <br />
                                <br />
                                <section className="subscribe">
                                    <input type="text" className="subscribe-input" id="subscribe-input" placeholder="Teu endereço de e-mail" />
                                </section>
                                <button className="btn-subscribe" id="subscribe-btn"> Vamos juntos!  </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout >
        );
    }
}

export default HomePage;