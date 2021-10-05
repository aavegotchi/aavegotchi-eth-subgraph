import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { Contract } from "../generated/Contract/Contract";
import { Aavegotchi, User } from "../generated/schema";
import { AAVEGOTCHI_CONTRACT } from "./constants";

export function getOrCreateUser(address: Address): User {
    let user = User.load(address.toHexString());
    if(user == null) {
        user = new User(address.toHexString());
        user.save();
    }

    return user;
}

export function getOrCreateAavegotchi(id: BigInt): Aavegotchi {
    let gotchi = Aavegotchi.load(id.toString())
    if(gotchi == null) {
        gotchi = new Aavegotchi(id.toString());
        gotchi.save();
    }

    return gotchi;
}

export function linkGotchiToUser(gotchi: Aavegotchi, user: User): void {
    if(gotchi.owner != user.id) {
        gotchi.owner = user.id;
        gotchi.save();
    }
}

export function getUserGotchis(user: User): Array<BigInt> {
    let contract = Contract.bind(Address.fromString("0x1906fd9c4ac440561f7197da0a4bd2e88df5fa70"));
    let gotchiCall = contract.try_tokenIdsOfOwner(Address.fromString(user.id));
    if(gotchiCall.reverted) {
        return []
    }

    return gotchiCall.value;
}

export function changeOwnerOf(gotchi: Aavegotchi, newUser: User): void {
    gotchi.owner = newUser.id;
    gotchi.save();
}