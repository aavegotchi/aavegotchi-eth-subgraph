import { BigInt, log } from "@graphprotocol/graph-ts"
import {
  Contract,
  ERC1155SendToBridge,
  ERC721SendToBridge,
  DiamondCut,
  OwnershipTransferred,
  ApprovalForAll,
  TransferBatch,
  TransferFromParent,
  TransferSingle,
  TransferToParent,
  URI,
  Approval,
  ApprovalForAll1,
  Transfer
} from "../generated/Contract/Contract"
import { getOrCreateUser, getUserGotchis } from "./helper"

// export function handleERC1155SendToBridge(event: ERC1155SendToBridge): void {
//   // Entities can be loaded from the store using a string ID; this ID
//   // needs to be unique across all entities of the same type
//   let entity = ExampleEntity.load(event.transaction.from.toHex())

//   // Entities only exist after they have been saved to the store;
//   // `null` checks allow to create entities on demand
//   if (!entity) {
//     entity = new ExampleEntity(event.transaction.from.toHex())

//     // Entity fields can be set using simple assignments
//     entity.count = BigInt.fromI32(0)
//   }

//   // BigInt and BigDecimal math are supported
//   entity.count = entity.count + BigInt.fromI32(1)

//   // Entity fields can be set based on event parameters
//   entity.depositor = event.params.depositor
//   entity.receiver = event.params.receiver

//   // Entities can be written to the store with `.save()`
//   entity.save()

//   // Note: If a handler doesn't require existing field values, it is faster
//   // _not_ to load the entity from the store. Instead, create it fresh with
//   // `new Entity(...)`, set the fields that should be updated and save the
//   // entity back to the store. Fields that were not set or unset remain
//   // unchanged, allowing for partial updates to be applied.

//   // It is also possible to access smart contracts from mappings. For
//   // example, the contract that has emitted the event can be connected to
//   // with:
//   //
//   // let contract = Contract.bind(event.address)
//   //
//   // The following functions can then be called on this contract to access
//   // state variables and other data:
//   //
//   // - contract.balanceOf(...)
//   // - contract.getApproved(...)
//   // - contract.isApprovedForAll(...)
//   // - contract.name(...)
//   // - contract.ownerOf(...)
//   // - contract.symbol(...)
//   // - contract.tokenByIndex(...)
//   // - contract.tokenIdsOfOwner(...)
//   // - contract.tokenURI(...)
//   // - contract.totalSupply(...)
//   // - contract.TRANSFER_ERC1155_BATCH_EVENT_SIG(...)
//   // - contract.WITHDRAW_ERC721_BATCH_EVENT_SIG(...)
//   // - contract.rootChainManager(...)
//   // - contract.balanceOf(...)
//   // - contract.balanceOfBatch(...)
//   // - contract.balancesWithItemTypes(...)
//   // - contract.isApprovedForAll(...)
//   // - contract.uri(...)
// }

export function handleERC721SendToBridge(event: ERC721SendToBridge): void {
  let user = getOrCreateUser(event.transaction.from);
}

export function handleDiamondCut(event: DiamondCut): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {
    let user = getOrCreateUser(event.params._owner);
    // let gotchis = getUserGotchis(user);
    // for(let i=0;i<gotchis.length;i++) {
    //   log.info(gotchis[i].toString(), [])
    // }


}

export function handleTransferBatch(event: TransferBatch): void {}

export function handleTransferFromParent(event: TransferFromParent): void {}

export function handleTransferSingle(event: TransferSingle): void {}

export function handleTransferToParent(event: TransferToParent): void {}

export function handleURI(event: URI): void {}

export function handleApproval(event: Approval): void {
  let user = getOrCreateUser(event.params._owner);
}

export function handleApprovalForAll1(event: ApprovalForAll1): void {}

export function handleTransfer(event: Transfer): void {}
