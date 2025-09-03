import { AuthRequest } from "../middleware/authMiddleware.js"
import { Response } from "express"
import Ticket from "../models/ticketModel.js";

const createTicket = async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    const hasPrem = req.prem;

    if (!userId) {
        return res.status(401).json({
            msg: "Unauthorized"
        })
    };

    const { pnr, busName, busNo, seatNo, price, compatibleGender, src, destination, deptDate, arrivalDate, deptTime, arrivalTime, status } = req.body;
    if (!pnr || !busName || !busNo || !seatNo || !price || !compatibleGender || !src || !destination || !deptDate || !arrivalDate || !deptTime || !arrivalTime) {
        return res.status(400).json({
            msg: "Bad Request"
        })
    }

    try {
        const ticket = new Ticket({
            ownerId: userId,
            pnr,
            busServiceProviderName: busName,
            busNo,
            seatNo,
            price,
            compatibleGender,
            srcCity: src,
            destinationCity: destination,
            deptDate, arrivalDate, deptTime, arrivalTime, status: status
        });


        if (hasPrem && status === "auction") {
            const deptDateTime = new Date(`${deptDate}T${deptTime}`);
            const now = new Date();

            if (deptDateTime.getTime() - now.getTime() > 24 * 60 * 60 * 1000) {
                ticket.auction.startTime = now;
                ticket.auction.endTime = new Date(deptDateTime.getTime() - 24 * 60 * 60 * 1000);
            }
        };
        await ticket.save();

        return res.status(201).json({
            msg: "Ticket created Successfuklly",
            ticket: ticket
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error",
            error: error as String
        })
    }

}



export default { createTicket };