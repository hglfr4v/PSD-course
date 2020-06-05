const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const bodyParser = require("body-parser");
const petRoutes = require('./routes/pet');

const port = process.env.PORT || 5000;
const app = express();
const swaggerOptions = {
    swaggerDefinition:{
        info: {
            version: "1.0.0",
            title: "PSD API",
            description: "API for the PSD coourse",
            contact: {
                name: "Francesco Vona"
            },
            servers: ["http://localhost:5000"]
        }
    }, 
    apis: ["./routes/pet.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(petRoutes);

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
    
})



