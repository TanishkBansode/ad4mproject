import Ad4mConnectUI from "@coasys/ad4m-connect";
import { LinkQuery } from "@coasys/ad4m";
const ui = Ad4mConnectUI({
  appName: "Ad4mproject",
  appDesc: "Trying AD4M",
  appDomain: "ad4m.dev",
  appIconPath: "https://i.ibb.co/GnqjPJP/icon.png",
  capabilities: [
    {
      with: { domain: "*", pointers: ["*"] },
      can: ["*"],
    },
  ],
    hosting: false,	
});
// Authentication

const authTitle = document.getElementById("auth");
const connectionTitle = document.getElementById("connection");
const button = document.getElementById("button");

connectionTitle!.innerText = ui.connectionState;
authTitle!.innerText = ui.authState;

button!.addEventListener("click", () => {
  ui.connect();
});


ui.addEventListener("connectionstatechange", (e) => {
  console.log("Connection state event:", e);
  connectionTitle!.innerText = ui.connectionState;
});

ui.addEventListener("authstatechange", (e) => {
  console.log("Authentication state event:", e);

  authTitle!.innerText = ui.authState;
});

// Agent

const client = await ui.getAd4mClient();
// const me = await client.agent.me();
// console.log("Me:", me);
const { did, perspective } = await client.agent.me();
console.log("DID: ", did)
console.log("Perspective: ", perspective)


// Expression
const url = await client.expression.create("Hello World!", "literal");
console.log("URL:", url)
const expression = await client.expression.get(url);
console.log("Expression: ", expression)


// Perspective
const perspective1 = await client.perspective.add("My Notes");
console.log("Perspective: ", perspective1)

const link = {
  source: "did:key:zQ3shv5VUAbtY5P1jGsPzy7L27FTxeDv2hnhVp9QT3ALNCnQ2",
  predicate: "sioc://likes",
  target: "literal://ad4m",
};
perspective1.add(link)

const allLinks = await perspective1.get(
  new LinkQuery({ predicate: "sioc://likes" })
);

console.log("AllLinks: ", allLinks)