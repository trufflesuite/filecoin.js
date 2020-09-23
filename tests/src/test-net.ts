import assert from "assert";

import { LOTUS_AUTH_TOKEN } from "../tools/testnet/credentials/credentials";
import { JsonRpcProvider } from '../../src/providers/JsonRpcProvider';
import { HttpJsonRpcConnector } from '../../src/connectors/HttpJsonRpcConnector';
import { WsJsonRpcConnector } from '../../src/connectors/WsJsonRpcConnector';

const httpConnector = new HttpJsonRpcConnector({ url: 'http://localhost:8000/rpc/v0', token: LOTUS_AUTH_TOKEN });
const wsConnector = new WsJsonRpcConnector({ url: 'ws://localhost:8000/rpc/v0', token: LOTUS_AUTH_TOKEN });

describe.only("Common tests", function() {
  it("should check connectedness of peer ID [http]", async function() {
    const provider = new JsonRpcProvider(httpConnector);
    const peerId = await provider.id();
    const connectedness = await provider.netConnectedness(peerId);
    assert.strictEqual(typeof connectedness === 'number', true, 'invalid connectedness of peer ID');
  });

  it("should check connectedness of peer ID [ws]", async function() {
    const provider = new JsonRpcProvider(wsConnector);
    const peerId = await provider.id();
    const connectedness = await provider.netConnectedness(peerId);
    assert.strictEqual(typeof connectedness === 'number', true, 'invalid connectedness of peer ID');
    await provider.release();
  });

  it("should get net peers [http]", async function() {
    const provider = new JsonRpcProvider(httpConnector);
    const peers = await provider.netPeers();
    assert.strictEqual(Array.isArray(peers), true, 'invalid net peers');
  });

  it("should get net peers [ws]", async function() {
    const provider = new JsonRpcProvider(wsConnector);
    const peers = await provider.netPeers();
    assert.strictEqual(Array.isArray(peers), true, 'invalid net peers');
    await provider.release();
  });

  // it.only("should connect to addr [http]", async function() {
  //   const provider = new JsonRpcProvider(httpConnector);
  //   const peers = await provider.netPeers();
  //   const result = await provider.netConnect(peers[0]);
  // });
  //
  // it.only("should connect to addr [ws]", async function() {
  //   const provider = new JsonRpcProvider(wsConnector);
  //   const peers = await provider.netPeers();
  //   const result = await provider.netConnect(peers[0]);
  //   await provider.release();
  // });

  it("should get listen addr info [http]", async function() {
    const provider = new JsonRpcProvider(httpConnector);
    const addr = await provider.netAddrsListen();
    const valid = typeof addr.ID === 'string' && Array.isArray(addr.Addrs);
    assert.strictEqual(valid, true, 'invalid listen addr info');
  });

  it("should get listen address [ws]", async function() {
    const provider = new JsonRpcProvider(wsConnector);
    const addr = await provider.netAddrsListen();
    const valid = typeof addr.ID === 'string' && Array.isArray(addr.Addrs);
    assert.strictEqual(valid, true, 'invalid listen addr info');
    await provider.release();
  });

  it("should find peer [http]", async function() {
    const provider = new JsonRpcProvider(httpConnector);
    const peers = await provider.netPeers();
    const addrInfo = await provider.findPeer(peers[0].ID);
    const valid = typeof addrInfo.ID === 'string' && Array.isArray(addrInfo.Addrs);
    assert.strictEqual(valid, true, 'invalid listen addr info');
  });

  it("should find peer [ws]", async function() {
    const provider = new JsonRpcProvider(wsConnector);
    const peers = await provider.netPeers();
    const addrInfo = await provider.findPeer(peers[0].ID);
    const valid = typeof addrInfo.ID === 'string' && Array.isArray(addrInfo.Addrs);
    assert.strictEqual(valid, true, 'invalid listen addr info');
    await provider.release();
  });
});
