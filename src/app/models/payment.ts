export interface Payment{
    paymentId:number
    customerId:number
    rentId:number
    amountPaid:number
}

export class PaymentPost{
    paymentId:number
    customerId:number
    rentId:number
    amountPaid:number
}

export interface PaymentCard{
    cardId :number
    customerId:number 
    cardNumbers :string
    validMonth :number
    validYear :number
    cvv :number
}