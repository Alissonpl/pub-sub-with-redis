const redis = require("redis");
const client = redis.createClient({
  url: "redis://localhost:6379/",
  password: "eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81",
});
client.connect();

client.on("error", (error) => {
  console.error(error);
});

async function publish(channel, value) {
  console.log("Message sent!");
  return client.publish(channel, JSON.stringify(value));
}
const subscriber = client.duplicate();

subscriber.connect();

async function subscribe(channelSubscribed, callback) {
  subscriber.subscribe(channelSubscribed, (message) => {
    console.log("Message arrived!");
    callback(message);
  });
}

module.exports = {
  publish,
  subscribe,
};
