const example = {
    name: "Petshop Focinho Feliz",
    email: "focinho.feliz@gmail.com",
    description: "O lar do seu pet!",
    password: "123456",
    merchantType: "PETSHOP",
    phone: "(51)98321-1234",
    operation: {
        closingTime: "19:00",
        openingTime: "10:00",
        days: ["sunday", "monday", "tuesday"]
    },
    services: [{
        description: "Dogwalker",
        prices: {
            "PUPPY": 12.00,
            "P": 14.00,
            "M": 15.00,
            "G": 16.00,
            "GG": 20.00,
        }
    }],
    transportsPet: true,
    paymentData: {
        holder: "Gustavo Souza da Silva",
        bankCode: "023",
        bankAgency: "0312",
        bankAccount: "000088762"
    },
    rating: 4.5,
    address: {
        vicinity: "Avenida Guarapuera",
        number: "32",
        neighbourhood: "Bairro Parque Guarujá",
        city: "Porto Alegre",
        state: "RS",
        country: "Brazil",
        complement: "Loja 402",
        location: { lat: -27.234234, lng: -51.829828 },
        postalCode: "92808-001",
    },
    taxDocument: "32.718.788/0001-62",
    taxDocumentType: "CNPJ",
    role: "MERCHANT"
};

module.exports = example;