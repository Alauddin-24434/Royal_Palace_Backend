import { AppError } from "../error/appError";
import { IAmenities } from "../interfaces/amenities.interface";
import AmenitiesModel from "../mongoSchema/amenitiSchema";

// =============================================Create Amenitie=====================================================
const crateAmenitie = async (serviceData: IAmenities) => {
  const extistingService = await AmenitiesModel.findOne({
    name: serviceData.name,
  });
  if (extistingService) {
    throw new AppError("Service already exists for this room", 400);
  }

  const cratedService = await AmenitiesModel.create(serviceData);
  return cratedService;
};

// ===============================================Find all Amenities=======================================================
const getAllAmenities = async () => {
  const services = await AmenitiesModel.find({ isActive: true });
  return services;
};

// ==================================================Delete Amenitie by Id=======================================================

const deleteAmenities = async (id: string) => {
  const extistingService = await AmenitiesModel.findOne({
    _id: id,
  });
  if (!extistingService) {
    throw new AppError("Service does not exist", 400);
  }

  const deleteService = await AmenitiesModel.deleteOne({ _id: id });
  return deleteService;
};
// ===============================================Update service by Id=======================================================
const updateAmenitie = async (id: string, payload: Partial<IAmenities>) => {
  const existingService = await AmenitiesModel.findById(id);

  if (!existingService) {
    throw new AppError("Service not found", 404);
  }

  const updatedService = await AmenitiesModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedService;
};

// ==============================export service=============================
export const amenitieServices = {
  crateAmenitie,
  getAllAmenities,
  updateAmenitie,
  deleteAmenities,
};
