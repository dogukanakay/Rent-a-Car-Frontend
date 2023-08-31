export interface Rental extends RentalFilter{
    brandName:string
    customerName:string
    rentDate:Date
    returnDate:Date
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

export class RentalFilter{
    carId?:number
    customerId?:number
}