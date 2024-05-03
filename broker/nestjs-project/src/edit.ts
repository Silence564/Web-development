import * as fs from "fs";

function editBrokerById(id, data) {
    let store = require('../JSON/brokers.json');
    for (let i = 0; i < store.length; i++) {
        if (store[i].id === id){
            store[i] = {
                id: id,
                name: data.name,
                money: data.money,
            };
            console.log(store);
            fs.writeFileSync('/home/kent/Веб технологии 3 курс/web5/nestjs-project/JSON/brokers.json', JSON.stringify(store));
            return;
        }
    }
}

function addStockToBroker(broker, stock, cost, count) {
    console.log("ADD: " + stock + " to " + broker);
    let brokers = require('../JSON/brokers.json');
    for (let i = 0; i < brokers.length; i++){
        if (brokers[i].name == broker){
            brokers[i].money = Number((brokers[i].money - cost*count).toFixed(2));
            let isStockStored = false;
            for (let j = 0; j < brokers[i].stocks.length; j++) {
                if (brokers[i].stocks[j].stock == stock){
                    brokers[i].stocks[j].count += count;
                    brokers[i].stocks[j].bought = Number((brokers[i].stocks[j].bought + cost*count).toFixed(2));
                    isStockStored = true;
                    break;
                }
            }
            if (!isStockStored){
                brokers[i].stocks[brokers[i].stocks.length] = {
                    "stock": stock,
                    "bought": cost,
                    "count": 1
                }
            }
            break;
        }
    }
    fs.writeFileSync('/home/kent/Веб технологии 3 курс/web5/nestjs-project/JSON/brokers.json', JSON.stringify(brokers));
}

function sellStock(broker, stock, cost, count) {
    console.log("DELETE: " + stock + " to " + broker);
    let brokers = require('../JSON/brokers.json');
    for (let i = 0; i < brokers.length; i++){
        if (brokers[i].name == broker){
            brokers[i].money = Number((brokers[i].money + cost*count).toFixed(2));
            for (let j = 0; j < brokers[i].stocks.length; j++) {
                if (brokers[i].stocks[j].stock == stock){
                    brokers[i].stocks[j].count -= count;
                    if (!brokers[i].stocks[j].count)
                        brokers[i].stocks[j].bought = 0;
                    else
                        brokers[i].stocks[j].bought = Number((brokers[i].stocks[j].bought - cost*count).toFixed(2));
                    break;
                }
            }
            break;
        }
    }
    fs.writeFileSync('/home/kent/Веб технологии 3 курс/web5/nestjs-project/JSON/brokers.json', JSON.stringify(brokers));
}

function addNewBroker(newBroker) {
    let store = require('../JSON/brokers.json');
    let newId = store.length > 0 ? 1 + parseInt(store[store.length - 1].id) : 0;

    store.push({
        id: newId.toString(),
        name: newBroker.name,
        money: newBroker.money,
        photo: '5'
    });

    fs.writeFileSync('/home/kent/Веб технологии 3 курс/web5/nestjs-project/JSON/brokers.json', JSON.stringify(store));
}

function deleteBroker(id) {
    let store = require('../JSON/brokers.json');
    let index = 0;
    for (let broker of store) {
        console.log(broker);
        if (broker.id === id)
            break;
        ++index;
    }
    store.splice(index, 1);
    fs.writeFileSync('/home/kent/Веб технологии 3 курс/web5/nestjs-project/JSON/brokers.json', JSON.stringify(store));
}

function find_person(name, password){
    let brokers = require('../JSON/brokers.json');
    for (const broker of brokers) {
        if (broker.name === name && broker.password === password)
            return {
                status: true,
                money: broker.money,
                stocks: broker.stocks
            };
    }
    return {status: false};
}

function getBroker(name) {
    let brokers = require('../JSON/brokers.json');
    for (const broker of brokers) {
        if (broker.name === name)
            return broker;
    }
    return {};
}

export {addNewBroker, deleteBroker, editBrokerById, find_person, getBroker, addStockToBroker, sellStock};