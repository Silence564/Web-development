declare function editBrokerById(id: any, data: any): void;
declare function addStockToBroker(broker: any, stock: any, cost: any, count: any): void;
declare function sellStock(broker: any, stock: any, cost: any, count: any): void;
declare function addNewBroker(newBroker: any): void;
declare function deleteBroker(id: any): void;
declare function find_person(name: any, password: any): {
    status: boolean;
    money: any;
    stocks: any;
} | {
    status: boolean;
    money?: undefined;
    stocks?: undefined;
};
declare function getBroker(name: any): any;
export { addNewBroker, deleteBroker, editBrokerById, find_person, getBroker, addStockToBroker, sellStock };
