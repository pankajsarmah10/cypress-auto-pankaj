import { NEW_ARRIVALS } from "./constants";


const utilityFunctions = {
    getFirstInStockNewArrival() {
        let obj =  NEW_ARRIVALS.find((el) => {
            if(el.IN_STOCK == true){
                return el;
            }
        })
        return obj;
    },
}

export default {...utilityFunctions};
