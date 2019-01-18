const example = {
    name: "Gustavo Souza",
    email: "gustavo.souza@gmail.com",
    password: "123456",
    phone: "(51)98321-1234",
    address: {
        vicinity: "Avenida Guarapuera",
        number: "32",
        neighbourhood: "Bairro Parque Guarujá",
        city: "Porto Alegre",
        state: "RS",
        country: "Brazil",
        complement: "Casa",
        location: { lat: -27.234234, lng: -51.829828 },
        postalCode: "92808-001",
    },
    taxDocument: "098.123.432-99",
    taxDocumentType: "CPF",
    orders: [],
    paymentData: {
        holder: "Gustavo Souza da Silva",
        bankCode: "023",
        bankAgency: "0312",
        bankAccount: "000088762"
    },
    pets: [{
        name: "Thor",
        description: "Possui problemas de asma.",
        age: 12,
        temper: "Amigável",
        size: "P"
    }],
    facebook: {
        id: '0123919239123'
    },
    role: "CUSTOMER",
    favoriteMerchants: []
};

module.exports = example;