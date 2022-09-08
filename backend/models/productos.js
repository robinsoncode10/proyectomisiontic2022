var AdminSchema = schema({
    producto: {type: String, required: true},
    precio: {type: String, required: true},
    imagen: {type: String, required: true},
    password: {type: String, required: true},
    rol: {type: String, required: true}
});
