import React from 'react';
import Carousel from "nuka-carousel";

class Testimonials extends React.Component {
    forceResize() {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 500);
    }
    render() {
        this.forceResize();
        return (
            <article>
                <div className="carousel slide" data-ride="carousel" id="quote-carousel">
                    <div className="carousel-inner text-center">
                        <Carousel initialSlideHeight={100} speed={250} framePadding={"35px"}
                            renderCenterLeftControls={({ previousSlide }) => (
                                <button className="carousel-btn" onClick={previousSlide}><i className="fa fa-chevron-left"></i></button>
                            )}
                            renderCenterRightControls={({ nextSlide }) => (
                                <button className="carousel-btn" onClick={nextSlide}><i className="fa fa-chevron-right"></i></button>
                            )}>
                            <div className="item">
                                <blockquote>
                                    <div className="row">
                                        <div className="col-sm-8 col-sm-offset-2">
                                            <p>
                                                O serviço da Review Academics foi de extrema importância nesse período tão estressante da entrega de trabalho de conclusão de curso e final de semestre. Desde o primeiro contato com a equipe fui super bem atendida, tiraram todas as minhas dúvidas e explicaram (com muita simpatia) como funcionava o serviço. Fiquei surpresa com a parte da comunicação, a cada etapa que eles terminavam foram me colocando a par da situação do trabalho e me deixando mais tranquila. Com a agilidade da entrega da revisão, formatação do trabalho e tradução do abstract, a equipe conseguiu me trazer mais segurança, o que reduziu a minha ansiedade e me deixou mais confiante!
                                            </p>
                                            <small>Graduação em Letras – UNISINOS</small>
                                        </div>
                                    </div>
                                </blockquote>
                            </div>
                            <div className="item">
                                <blockquote>
                                    <div className="row" style={{ marginTop: "30px" }}>
                                        <div className="col-sm-8 col-sm-offset-2">
                                            <p>
                                                Solicitei serviços de revisão e formatação de um projeto de mestrado e artigo para apresentação em evento e fiquei bem satisfeita com o resultado. Primeiramente, pela atenção da prestadora do serviço, que sempre esteve me apoiando e atenta a todos os detalhes, segundo, pela agilidade do serviço. Além da preocupação com a agilidade, responsabilidade e bem estar do cliente, a prestadora também concedeu dicas preciosas para meu projeto. Indico os profissionais!
                                            </p>
                                            <small>Mestrado em Letras - UNIRITTER</small>
                                        </div>
                                    </div>
                                </blockquote>
                            </div>
                            <div className="item">
                                <blockquote>
                                    <div className="row" style={{ marginTop: "30px" }}>
                                        <div className="col-sm-8 col-sm-offset-2">
                                            <p>
                                                Muito acima do esperado! A Review Academics se mostrou atenciosa e preocupada com todas as necessidades do meu trabalho e sugestões do meu orientador desde o primeiro contato. Não poderia ter caído em mãos mais gentis e experientes. Só tenho a agradecer e afirmo com toda honestidade: com preço justo e entregas adiantadas, vale cada centavo!
                                            </p>
                                            <small>Graduação em Psicologia - UFRGS</small>
                                        </div>
                                    </div>
                                </blockquote>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </article>
        )
    }
}

export default Testimonials