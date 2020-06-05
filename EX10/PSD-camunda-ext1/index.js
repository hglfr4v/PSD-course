const { 
    Client,
    logger,
    Variables,
    File
} = require("camunda-external-task-client-js");

const config ={
    baseUrl: "http://localhost:8080/engine-rest",
    use: logger
};

const client = new Client(config);

client.subscribe("invoiceCreator", async function({task, taskService}){
    const date = new Date();
    const invoice = await new File({ localPath: "invoice.txt"}).load();
    const minute = date.getMinutes();
    const variables = new Variables().setAll({
        invoice,
        date
    })

    if(minute % 2 === 0){
        await taskService.complete(task, variables);
    }else {
         await taskService.complete(task, null, variables);
    }
})