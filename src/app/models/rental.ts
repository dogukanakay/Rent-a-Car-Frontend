export interface Rental{
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

export interface RentalFilter{
    carId?:number
    customerId?:number
}