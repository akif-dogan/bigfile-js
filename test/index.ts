import * as chai from "chai";
import Api from "../src/common/lib/api";
import NodeCryptoDriver from "../src/common/lib/crypto/node-driver";
import Network from "../src/common/network";
import Silo from "../src/common/silo";
import Transactions from "../src/common/transactions";
import Wallets from "../src/common/wallets";

import { bigfileInstance, initInstance } from "./_bigfile";

const expect = chai.expect;

const bigfile = bigfileInstance();

describe("Initialization", function () {
  this.timeout(100000);

  it("should have components", function () {
    expect(bigfile.api).to.be.an.instanceOf(Api);

    expect(bigfile.transactions).to.be.an.instanceOf(Transactions);

    expect(bigfile.wallets).to.be.an.instanceOf(Wallets);

    expect(bigfile.network).to.be.an.instanceOf(Network);

    expect(bigfile.crypto).to.be.an.instanceOf(NodeCryptoDriver);

    expect(bigfile.silo).to.be.an.instanceOf(Silo);
  });

  it("should handle default ports", function () {
    expect(initInstance({ port: 1234 }).api.config.port).to.equal(1234);
    expect(initInstance({ protocol: "http" }).api.config.port).to.equal(80);
    expect(initInstance({ protocol: "https" }).api.config.port).to.equal(443);
    expect(initInstance({}).api.config.port).to.equal(80);
  });

  it("should handle the default host", function () {
    expect(initInstance({}).api.config.host).to.equal("127.0.0.1");
    expect(
      initInstance({ host: "specific-host.example" }).api.config.host
    ).to.equal("specific-host.example");
  });
});

describe("Network Info", function () {
  it("should get network info", async function () {
    this.timeout(10000);

    const info = await bigfile.network.getInfo();
    const peers = await bigfile.network.getPeers();

    expect(info).to.be.an("object");

    expect(Object.keys(info)).to.contain.members([
      "height",
      "current",
      "release",
      "version",
      "blocks",
    ]);

    expect(info.height).to.be.a("number").greaterThan(0);

    expect(peers).to.be.an("array");
  });
});

// describe('API ', ()=> {
//   it('tests that API can POST requests', async function(){

//   })
// })
