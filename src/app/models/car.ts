export interface Car extends CarDetailFilter{
    carId:number
    locationName:string
    className:string
    brandName:string
    modelName:string
    gearTypeName:string
    fuelTypeName:string
    colorName:string
    modelYear:number
    dailyPrice:number
    findexScore:number
    description:string
}

export interface CarPost{
    carId:number
    brandId:number
    colorId:number
    modelYear:number
    dailyPrice:number
    description:string
}


export interface CarDetailFilter{
    locationId?:number
    brandId?:number
    modelId?:number
    gearId?:number
    fuelId?:number
    colorId?:number
    rentDate?:Date
    returnDate?:Date
}