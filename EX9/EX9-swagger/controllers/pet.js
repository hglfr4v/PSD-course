exports.getPets = (req,res, next) => {
    res.status(200).json({
        pets: [{
            name: "Jack",
            breed: "dog"
        }, {
            name: "Pippo",
            breed: "parrot"
        }]
    })
}

exports.postPet = (req,res, next) => {
    const name = req.body.name;
    const breed = req.body.breed;

    res.status(201).json({
        message: "Pet added successfully!",
        post: {
            id: new Date().toISOString(),
            name: name,
            breed: breed
        }
    });
};