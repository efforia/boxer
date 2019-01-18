import React from "react";
import Helmet from "react-helmet";

import Form from '../components/Form';
import Content from '../components/Content';
import Layout from '../components/layout';
import Testimonials from '../components/Testimonials';

import landing01 from "../assets/img/landing-01.png";
import logo from "../assets/img/logo.svg";
import { animateScroll as scroll } from "react-scroll";

class HomePage extends React.Component {
    scrollToDiv(id) {
        var div = document.querySelector(`#${id}`);
        var offsetTop = div.offsetTop;
        scroll.scrollTo(offsetTop, { duration: 250 });
    }

    render() {
        const siteTitle = "Frete Fácil";
        return (
          <Layout>
            <Helmet title={siteTitle} />
            <div className="wrapper">
              <div className="parallax filter-gradient blue section-colorful hero-image" data-color="blue">
                <div className="parallax-background banner-parallax"></div>
                <div className="container">
                  <div className="row text-center">
                    <div className="col-md-12">
                      <img src={logo} style={{ width: "50vw" }}/>
                      <h3 style={{ "color": "white", "text-transform": "uppercase", "font-weight": "lighter" }}>Simplifique seu transporte!</h3>
                      <a className="btn-section" onClick={(e) => this.scrollToDiv('presentation')}>Saiba mais</a>
                    </div>
                    {/*<div className="col-md-9">
                      <div className="description">
                        <h3>Chegou ao lugar certo!</h3>
                        <h5> Conheça o Frete Fácil: <br /> A sua nova plataforma de alimentação saudável! </h5>

                      </div>
                    </div>*/}

                  </div>
                </div>
              </div>
              <Content/>
              <Form/>
            </div>
          </Layout>
        );
    }
}

export default HomePage;
