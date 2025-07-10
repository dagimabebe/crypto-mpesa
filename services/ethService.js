import ethUtil from 'ethereumjs-util';

export function verifyEthSignature(ethAddress, signature, message) {
  try {
    const msgBuffer = Buffer.from(message);
    const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
    const signatureBuffer = ethUtil.toBuffer(signature);
    const sigParams = ethUtil.fromRpcSig(signatureBuffer);
    const pubKey = ethUtil.ecrecover(
      msgHash,
      sigParams.v,
      sigParams.r,
      sigParams.s
    );
    const addrBuf = ethUtil.pubToAddress(pubKey);
    const recovered = ethUtil.bufferToHex(addrBuf);
    return recovered.toLowerCase() === ethAddress.toLowerCase();
  } catch (err) {
    return false;
  }
}
