export interface Rental extends RentalDetailFilter{
    rentId:number
    brandName:string
    modelName:string
    gearTypeName:string
    fuelTypeName:string
    customerName:string
    rentDate:Date
    returnDate:Date
    returnDateActual?:Date
    totalPrice:number
}

export class RentalPost{
    carId:number
    pickUpLocationId:number
    dropOffLocationId:number
    customerId:number
    rentDate:Date
    returnDate:Date
    totalPrice:number
}

export class RentalDetailFilter{
    carId?:number
    customerId?:number
}