// Create a client instance
const clientId = "53fd4cb4b5b36500eea20577@5o6l5YyW5Y+R"
const jwt = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODUwOTYxMDAsImRhdGEiOnsidWlkIjoibGlua0A1M2ZkNGNiNGI1YjM2NTAwZWVhMjA1NzdANW82bDVZeVc1WStSIiwiY2xpZW50SWQiOiI1M2ZkNGNiNGI1YjM2NTAwZWVhMjA1NzdANW82bDVZeVc1WStSIiwiaW5mbyI6eyJ1c2VybmFtZSI6IuaOpeWMluWPkSJ9LCJhY2Nlc3MiOiJBQ1RJVkUiLCJyb2xlIjoiVEVMRVBSRVNFTkNFIiwiaG9zdElkIjoiZmNiMTVkM2M3MmRhYzExNzkzYjFlN2I3MjExZDViNmIiLCJyb2JvdElkIjoiNjg4ZDc4Zjc3NGEyODhhYzBjOTI1ZDY0M2U2YmRmZGUiLCJwcm9qZWN0SWQiOiI2NDVjYTU5ZWE2NmUxMWQ3NmQxOTgzY2MifSwiaXNzIjoiVEVNSV9TRVJWRVIiLCJhdWQiOiJURUxFUFJFU0VOQ0UiLCJleHAiOjE2ODUwOTY0MDB9.3cde0oKyF_vZ0jd1XMKXWez-CQ0dS-OTKg_3a_dGZOnKAdAPTVYeKiUiAv-7yNyI4kiLlnj3WjZGqIoCZBsQSRVv11RmI9uK7ki41_57QN-DseLmzTTbZf8EgNsfv07ag_H3HFd9J0BUE0z6iqlNgNZU-0bMLyUMyYL1L6KfIrFVXRCnPEvBvp5-aWbWleL8tNuJVJJkiLebCM7fYg2vYrBHg_j9NTFKu3wk688uF5XlLxeZc1kSnqO7bcQ4WjmwIBZ1vEvdib8euRnsKu45oj8DyMEORrCtJmISC3BXr0cxT-riuWEddcyFVaMO9Qa6MrlStBUm0eSC7z_z_wo5ArSqxB0JUKyqldno7RKeyA4gwTsRIC-jOLJGEsERBlCnn6DHGTJWVVqRD0W1QHEM4EDJ14iJpcavpfq6pzB9VeiqhHXgoEDY_ZL_cHHYtNzkVx8GgEJekZXNoTsY7-dkXlHxyTk5wLPshvkVAuBB0MyOySrKPB1d-oVZX01nENXn6h-Cn1h2BJZLb7ef1B6xzQuknk29RcdKtCWynnu--5uKpS6eAZBCjZYD84M2oZjq6qYTubo1ODqG5OJ6BCzGE-D_f1DzOhwxmReK5SameAPjWUG_C2PXN2egsRlTzjMrI21dp5pFjbFhORu-g0ZFF8zCkE62AtlJT3uKtsSi4-U"


const clientId1 = "e8fead0e0e3f8deac9c867ca@5Lik5bm05Y2K"
const jwt1 = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODUwOTM1MTEsImRhdGEiOnsidWlkIjoibGlua0BlOGZlYWQwZTBlM2Y4ZGVhYzljODY3Y2FANUxpazVibTA1WTJLIiwiY2xpZW50SWQiOiJlOGZlYWQwZTBlM2Y4ZGVhYzljODY3Y2FANUxpazVibTA1WTJLIiwiaW5mbyI6eyJ1c2VybmFtZSI6IuS4pOW5tOWNiiJ9LCJhY2Nlc3MiOiJBQ1RJVkUiLCJyb2xlIjoiVEVMRVBSRVNFTkNFIiwiaG9zdElkIjoiZmNiMTVkM2M3MmRhYzExNzkzYjFlN2I3MjExZDViNmIiLCJyb2JvdElkIjoiNjg4ZDc4Zjc3NGEyODhhYzBjOTI1ZDY0M2U2YmRmZGUiLCJwcm9qZWN0SWQiOiI2NDVjYTU5ZWE2NmUxMWQ3NmQxOTgzY2MiLCJyZWZyZXNoQ291bnRlciI6MX0sImlzcyI6IlRFTUlfU0VSVkVSIiwiYXVkIjoiVEVMRVBSRVNFTkNFIiwiZXhwIjoxNjg1MDkzODExfQ.09HoeJ18VpJ7yqSQHnsWpF_RFyjKO4sjhFn-eyoufZjNCRuPNHVoE2vckZ2c0vNPxt189ZpmHyQbEVMIUAXJDCNIMA1_SQs6WW4eYnd0elBw_H7Myk5o7MZsSJzm8MIxR4nNGIv_i9SMCBMX1M_e7W4nUHZ4Vt_uhJNBtpPH_zu3KZPXHwZHJtUmyle2KC80nbyXa0hel4yTfbqAGU-S5ZbfmpE3R5T-zFSsq2C63RreMhw35M_jXK9_55GlImRHCeJKUkgctFlmZmy89BvrAH9Y8Ckbd3nfIe-qd-20GCuVTlWQ6rhQeN6tRfxg_D5alBjrXNC4-2NN0uQ0YWYMjsHgbyc4UIU0LsrEsF9N_0-BS-0VEYtmL1kfhvuCypdIpubLBCVVEsMj1MzRTVMmUTKuSFJnmdhgw9X7feWS5glpb4P4lJPzbb4W67U2cbKnNd2He1n_K3IHa5CZwY-4gOFyXECOLIYlAjQ8uvtp2jRx3tny1j3ErUiIXGaxzpRhF07mx8yKb_TxyyJHLVQLLLrW5_zB3l2I69WpQE7vTJTPyM91k-9q9R33gDPSm2szbTFPdxYd0GkPZaFSflEdBM5KQj3vUfGUC2LF9dOKctqzhNB8jIQm-VpzpP2EhdJM_GYeRA68ziMXh0lQOzUnlK3ncbythR3EzG0S2sjGGxw"

client = new Paho.Client('broker-chn-tok-stg-wss.dev.temi.cloud', 443, clientId);

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({
    onSuccess:onConnect,
    onFailure:onFailure,
    userName: clientId,
    password: jwt,
    keepAliveInterval: 20,
    cleanSession: true,
    useSSL: true,
    useSSL: true,
    mqttVersion: 3,
    willMessage: generateLastWillMessage(clientId),
    reconnect: false,
});

function generateLastWillMessage (){
  let lwt = new Paho.Message('offline')
  lwt.qos = 1
  lwt.retained = true
  lwt.destinationName = `client/${clientId}/webplatform/status`
  return lwt
}

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  // client.subscribe("World");
  // message = new Paho.MQTT.Message("Hello");
  // message.destinationName = "World";
  // client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  console.log('onConnectionLost', responseObject)
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
}

function onFailure(err) {
    console.log('onFailure', err)
}