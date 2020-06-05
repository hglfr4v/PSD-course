const fs = require("fs");
const {
    Client,
    logger,
    Variables,
    File
} = require("camunda-external-task-client-js");

const config = {
    baseUrl: "http://localhost:8080/engine-rest",
    use: logger
};

const client = new Client(config)

client.subscribe("transactionRefusal", async function({
    task,
    taskService
}){
    const date = new Date();
    const amount = task.variables.get("amount");
    const name = task.variables.get("name");
    const surname = task.variables.get("surname");
    const username = task.variables.get("utente");
    fs.writeFileSync('warning.txt',
    "Greetings dear " + `${name}` + `${surname}` +
    "My name  is " + `${username}` + 
    "We are srry  to inform  you that the amount of " + `${amount}` +
    " is  not sufficient, please retry. Message generated on: " + `${date}`);

    const message  = await new  File({
        localPath: "./warning.txt"
    }).load();

    const  variables = new Variables().setAll({
        message,
        date
    })

    await taskService.complete(task, variables);

})

 