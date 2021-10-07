import { Address, BigInt, Bytes, store } from "@graphprotocol/graph-ts";
import { Contract } from "../generated/Contract/Contract";
import { Aavegotchi, Statistic, User } from "../generated/schema";
import { AAVEGOTCHI_CONTRACT, BIGINT_ONE, BIGINT_ZERO } from "./constants";

export function getOrCreateUser(address: Address): User {
    let user = User.load(address.toHexString());
    if(user == null) {
        user = new User(address.toHexString());
        user.save();
        increaseUniqueUsers();
    }

    return user;
}

export function getOrCreateAavegotchi(id: BigInt): Aavegotchi {
    let gotchi = Aavegotchi.load(id.toString())
    if(gotchi == null) {
        gotchi = new Aavegotchi(id.toString());
        gotchi.save();
        increaseBridgedGotchis();
    }

    return gotchi;
}

export function removeGotchi(id: BigInt): void {
    store.remove("Aavegotchi", id.toString())
    decreaseBridgedGotchis();
}

export function removeUser(userId: string): void {
    store.remove("User", userId);
}

export function transferGotchi(gotchi: Aavegotchi, to: User): void {
    gotchi.owner = to.id;
    gotchi.save();
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

export function getOrCreateStats(): Statistic {
    let stats = Statistic.load(BIGINT_ZERO.toString());
    if(stats == null) {
        stats = new Statistic(BIGINT_ZERO.toString());
        stats.bridgedGotchis = BIGINT_ZERO;
        stats.uniqueUsers = BIGINT_ZERO;
        stats.save();
    }

    return stats;
}

export function increaseBridgedGotchis(): void {
    let stats = getOrCreateStats();
    stats.bridgedGotchis = stats.bridgedGotchis.plus(BIGINT_ONE);
    stats.save();
}

export function decreaseBridgedGotchis(): void {
    let stats = getOrCreateStats();
    stats.bridgedGotchis = stats.bridgedGotchis.minus(BIGINT_ONE);
    stats.save();
}

export function increaseUniqueUsers(): void {
    let stats = getOrCreateStats();
    stats.uniqueUsers = stats.uniqueUsers.plus(BIGINT_ONE);
    stats.save();
}