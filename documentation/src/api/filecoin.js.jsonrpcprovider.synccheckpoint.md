---
id: filecoin.js.jsonrpcprovider.synccheckpoint
title: JsonRpcProvider.syncCheckpoint() method
hide_title: true
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[filecoin.js](./filecoin.js.md) &gt; [JsonRpcProvider](./filecoin.js.jsonrpcprovider.md) &gt; [syncCheckpoint](./filecoin.js.jsonrpcprovider.synccheckpoint.md)

## JsonRpcProvider.syncCheckpoint() method

marks a blocks as checkpointed, meaning that it won't ever fork away from it.

<b>Signature:</b>

```typescript
syncCheckpoint(tipSetKey: TipSetKey): Promise<string>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  tipSetKey | TipSetKey |  |

<b>Returns:</b>

Promise&lt;string&gt;