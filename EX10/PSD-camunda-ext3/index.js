const {
    Client,
    logger,
    Variables,
    File
} = require("camunda-external-task-client-js");

const config = {
    baseUrl : "http://localhost:8080/engine-rest",
    use: logger
} 

const client = new Client(config);

const handler = async ({task, taskService}) => {
      const defaultScore = task.variables.get("defaultScore");

      // set process variable 'creditScores'
      const creditScores = [defaultScore, 9, 1, 4, 10];
      const processVariables = new Variables()
          .set("creditScores", creditScores)
          .set("bar", new Date());

      // complete the task
      try {
          await taskService.complete(task, processVariables);
          console.log("I completed my task successfully!!");
      } catch (e) {
          console.error(`Failed completing my task, ${e}`);
      }
};



client.subscribe("creditScoreChecker", handler);

client.subscribe("loanGranter", async function({task,  taskService}){
    await taskService.complete(task);
});

client.subscribe("requestRejecter", async function ({
    task,
    taskService
}) {
    await taskService.complete(task);
});