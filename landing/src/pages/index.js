import React from "react";
import Helmet from "react-helmet";
import { animateScroll as scroll } from "react-scroll";


import Benefits from '../components/Benefits';
import Subscribe from '../components/Subscribe';
import Form from '../components/Form';
import Content from '../components/Content';
import Layout from '../components/layout';
import Jumbotron from '../components/Jumbotron';

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
            <Jumbotron/>
            <Content/>
            <Benefits/>
            <Subscribe/>
            <Form/>
          </Layout>
        );
    }
}

export default HomePage;
