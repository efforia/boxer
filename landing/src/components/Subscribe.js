import React from 'react'
import Mailchimp from 'react-mailchimp-form'

class Subscribe extends React.Component {
  render() {
    return (
      <div className="row text-center">
        <h1><br />Eu quero um frete </h1>
        <Mailchimp
        action='https://fretefacil.us20.list-manage.com/subscribe/post?u=4acd3bfc9b0d30cdec21595e4&amp;id=09474778be'
        fields={[
          {
            name: 'EMAIL',
            placeholder: 'Email',
            type: 'email',
            required: true
          }
        ]}
        message={
          {
            sending: "Enviando...",
            success: "Obrigado por se inscrever!",
            error: "Um erro inesperado aconteceu.",
            empty: "Você precisa escrever um e-mail.",
            duplicate: "Muitas tentativas sobre o mesmo e-mail.",
            button: "Inscrever"
          }
        }/>
        <br /><br /><br />
      </div>
    )
  }
}

export default Subscribe
