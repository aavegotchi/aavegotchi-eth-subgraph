import {
  Transfer
} from "../generated/Contract/Contract"
import { ZERO_ADDRESS } from "./constants";
import { 
  getOrCreateAavegotchi, 
  getOrCreateUser, 
  removeGotchi, 
  transferGotchi 
} from "./helper"

export function handleTransfer(event: Transfer): void {  

  if(event.params._to.toHexString() == ZERO_ADDRESS) {
    removeGotchi(event.params._tokenId);
    let oldUser = getOrCreateUser(event.params._from);
    let gotchisOwned = oldUser.gotchisOwned;
    if(gotchisOwned == null || gotchisOwned.length == 0) {
      // removeUser(oldUser.id);
    }
  } else {
    let gotchi = getOrCreateAavegotchi(event.params._tokenId);
    let newOwner = getOrCreateUser(event.params._to);
    transferGotchi(gotchi, newOwner);
  }
}
