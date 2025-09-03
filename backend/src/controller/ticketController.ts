import { AuthRequest } from "../middleware/authMiddleware.js"
import { Response, Request } from "express"
import Ticket from "../models/ticketModel.js";
import mongoose from "mongoose";

const createTicket = async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    const hasPrem = req.prem;

    if (!userId) {
        return res.status(401).json({
            msg: "Unauthorized"
        })
    };

    const { pnr, busName, busNo, seatNo, price, compatibleGender, src, destination, deptDate, 
        arrivalDate, deptTime, arrivalTime, status } = req.body;

    if (!pnr || !busName || !busNo || !seatNo || !price || !compatibleGender || !src || 
        !destination || !deptDate || !arrivalDate || !deptTime || !arrivalTime) {
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

const getTickets = async (req: Request, res: Response) => {
    try {
        const { src, destination } = req.body;
        if (!src || !destination) {
            return res.status(400).json({
                msg: "Bad Request"
            })
        };

        const tickets = await Ticket.find({
            srcCity: src,
            destinationCity: destination
        });

        if (!tickets) {
            return res.status(404).json({
                msg: "Not Found"
            })
        }

        return res.status(200).json({
            tickets: tickets
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                msg: "Bad Request"
            })
        };

        const tickets = await Ticket.findById(id);

        if (!tickets) {
            return res.status(404).json({
                msg: "Not Found"
            })
        }

        return res.status(200).json({
            tickets: tickets
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}

const updateTicket = async (req: AuthRequest, res: Response) => {

    const userId = req.userId;
    const { id, seatNo, busName, busNo, compatibleGender, } = req.body;
    if (!userId || !id) {
        return res.status(400).json({
            msg: "Bad Request"
        })
    }

    try {
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).json({
                msg: "Not Found"
            })
        };

        if (userId != ticket.ownerId.toString()) {
            return res.status(401).json({
                msg: "You have not the authority to update the ticket"
            })
        }

        ticket.busNo = busNo || ticket.busNo;
        ticket.busServiceProviderName = busName || ticket.busServiceProviderName;
        ticket.compatibleGender = compatibleGender || ticket.compatibleGender;
        ticket.seatNo = seatNo || ticket.seatNo;
        await ticket.save();

        return res.status(200).json({
            msg: "ticket updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}

const deleteTicket = async (req: AuthRequest, res: Response) => {

    const userId = req.userId;
    const { id } = req.body;
    if (!userId || !id) {
        return res.status(400).json({
            msg: "Bad Request"
        })
    }

    try {
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).json({
                msg: "Not Found"
            })
        };

        if (userId != ticket.ownerId.toString()) {
            return res.status(401).json({
                msg: "You have not the authority to update the ticket"
            })
        }

        await ticket.deleteOne();

        return res.status(200).json({
            msg: "ticket deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}

const markSold = async (req: AuthRequest, res: Response) => {

    const userId = req.userId;
    const { id } = req.body;
    if (!userId || !id) {
        return res.status(400).json({
            msg: "Bad Request"
        })
    }

    try {
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).json({
                msg: "Not Found"
            })
        };

        if (userId != ticket.ownerId.toString()) {
            return res.status(401).json({
                msg: "You have not the authority to update the ticket"
            })
        }

        ticket.status = "sold";
        await ticket.save();

        return res.status(200).json({
            msg: "ticket marked as sold successfully"
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}



export default { createTicket, getTickets, getById, updateTicket, deleteTicket, markSold };