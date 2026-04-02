import { Request, Response } from "express";
import { catchAsyncHandeller } from "../utils/handeller/catchAsyncHandeller";
import { bookingServices } from "../services/booking.services";

// =====================================================Initiate Booking========================================

const initiateBooking = catchAsyncHandeller(
  async (req: Request, res: Response) => {
    const bookingData = req.body;

    const { paymentUrl, transactionId } =
      await bookingServices.bookingInitialization(bookingData);
    res.status(200).json({
      success: true,
      message: "Booking and payment initialized successfully",
      transactionId: transactionId,
      paymentUrl: paymentUrl,
    });
  },
);

// ========================================Avalabe rooms For Booking=================================================

const checkAvailableRoomsById = catchAsyncHandeller(
  async (req: Request, res: Response) => {
    const { roomId } = req.params;
    const blockedDates = await bookingServices.getBookedDatesForRoomByRoomId(
      roomId as string,
    );

    res.status(200).json({
      success: true,

      data: blockedDates,
    });
  },
);

// ======================================== chek booking rooms by user id=================================================

const checkbookingRoomsByUserId = catchAsyncHandeller(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const bookedRooms = await bookingServices.getBookedRoomsByUserId(
      id as string,
    );

    res.status(200).json({
      success: true,

      data: bookedRooms,
    });
  },
);
// =====================================filter booking===========================================

const getFilteredBookings = async (req: Request, res: Response) => {
  const result = await bookingServices.filterBookings(req.query);
  res.status(200).json(result);
};

const cancelBooking = catchAsyncHandeller(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await bookingServices.cancelBookingService(id as string);

    res.status(200).json({
      message: "Booking has been successfully cancelled",
      success: true,
      booking: result.booking,
    });
  },
);

// ========================Exxport Controller=============================
export const bookingController = {
  initiateBooking,
  checkAvailableRoomsById,
  cancelBooking,
  getFilteredBookings,
  checkbookingRoomsByUserId,
};
