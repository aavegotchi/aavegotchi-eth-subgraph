import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { Contract } from "../generated/Contract/Contract";
import { Aavegotchi, User } from "../generated/schema";
import { AAVEGOTCHI_CONTRACT } from "./constants";

export function getOrCreateUser(address: Bytes): User {
    let user = User.load(address.toString());
    if(user == null) {
        user = new User(address.toString());
        user.save();
    }

    return user;
}

export function getOrCreateAavegotchi(id: BigInt): Aavegotchi {
    let gotchi = Aavegotchi.load(id.toHexString())
    if(gotchi == null) {
        gotchi = new Aavegotchi(id.toHexString());
        gotchi.save();
    }

    return gotchi;
}

export function getUserGotchis(user: User): Array<BigInt> {
    let contract = Contract.bind(Address.fromString("0x1906fd9c4ac440561f7197da0a4bd2e88df5fa70"));
    let gotchiCall = contract.try_tokenIdsOfOwner(Address.fromString(user.id));
    if(gotchiCall.reverted) {
        return []
    }

    return gotchiCall.value;
}

