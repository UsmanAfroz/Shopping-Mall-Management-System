export interface IShops {
    shopName: string,
    shopNumber: number,
    floorNumber: number,
    shopType: string,
    Status: string,
    ownerPersonalInformation: {
        firstName: string,
        lastName: string,
        dob: string,
        Address: string,
        cnic: number,
    },
    isArchive: boolean
}