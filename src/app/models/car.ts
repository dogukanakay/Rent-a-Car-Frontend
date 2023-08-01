export interface Car{
    carId:number
    carName:string
    brandName:string
    colorName:string
    modelYear:number
    dailyPrice:number
}

export interface CarPost{
    id:number
    brandId:number
    colorId:number
    modelYear:number
    dailyPrice:number
    description:string
}