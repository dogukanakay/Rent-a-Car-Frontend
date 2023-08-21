export interface Rental extends RentalFilter{
    brandName:string
    customerName:string
    rentDate:Date
    returnDate:Date
}

export interface RentalPost{
    carId:number
    customerId:number
    rentDate:Date
    returnDate:Date
}

export class RentalFilter{
    carId?:number
    customerId?:number
}