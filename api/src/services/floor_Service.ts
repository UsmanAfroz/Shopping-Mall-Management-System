import { Floor } from '../models/floor';

export const floors = async () => {
  const floors = await Floor.find();
  return floors;
};
export const addFloor = async (floorData: object) => {
  const floor = new Floor(floorData);
  await floor
    .save()
    .then((res) => console.log('RES', res))
    .catch((err) => console.log('err', err));
  return floor;
};

// export const update = async (id: any, data: IShops) => {
//     const updated = await Shop.findOneAndUpdate({ '_id': id },
//         {
//             $set: {
//                 'shopName': data.shopName,
//                 'floorNumber': data.floorNumber,
//                 'shopNumber': data.shopNumber,
//                 'shopType': data.shopType,
//                 'Status': data.Status,
//                 'ownerPersonalInformation.cnic': data.ownerPersonalInformation.cnic,
//                 'ownerPersonalInformation.firstName': data.ownerPersonalInformation.firstName,
//                 'ownerPersonalInformation.lastName': data.ownerPersonalInformation.lastName,
//                 'ownerPersonalInformation.dob': data.ownerPersonalInformation.dob,
//                 'ownerPersonalInformation.Address': data.ownerPersonalInformation.Address
//             },
//         });
//     return updated;
// }

export const deleteFloor = async (id: any) => {
  const del = await Floor.findByIdAndDelete({ _id: id });
  return del;
};
