# 🚀 HopOn – Smart, Secure & Flexible Travel Solution

**HopOn** is a **next-gen travel platform** designed to make intercity travel **affordable, secure, and stress-free**.  
It solves the chaos of **ticket shortages, fraud risks, and high cancellation fees** by integrating **ride-sharing, ticket exchanges, AI insights, and strong security measures** into one seamless solution.

---

## 🌟 Features

✅ **Ride-Sharing & Car-Pooling**  
- Find or offer rides with verified travelers.  
- **Driver approval system** lets car owners accept or reject requests.  
- Rate rides and passengers for trust & safety.

✅ **Dynamic Ticket Exchange with Auctions**  
- Resell tickets securely at fixed prices or via **real-time auctions**.  
- Seat allocation is **automatically locked** to prevent overbooking.

✅ **Escrow Payment System**  
- Payments are **held in escrow** until the buyer successfully travels, reducing scams.  
- Refunds are auto-triggered if a seller fails to deliver.

✅ **KYC & Identity Verification**  
- Mandatory ID verification for sellers.  
- Adds a “Verified Seller” badge for credibility.

✅ **Blurred Ticket Uploads for Security**  
- Sensitive ticket details (QR codes, PNR, barcodes) are **blurred by default**.  
- Buyers only see full details **after purchase**.

✅ **Fraud Prevention & Anti-Scam Tools**  
- Tickets are **PNR-verified via APIs**.  
- System prevents sellers from listing **duplicate tickets**.  
- Buyers cannot screenshot/view tickets before completing payment.

✅ **Concurrency Handling for Last Seats**  
- **MongoDB Transactions** ensure that only one buyer can book a seat if limited inventory exists.

✅ **Smart Travel Search**  
- Aggregates **bus, train, flight, and carpool options**.  
- Get **real-time pricing, availability, and AI-based predictions**.

---

## 🎯 Problems Solved

| Problem                                                                                  | Solution                                                                                       |
|------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| Fraudulent ticket resale                                | KYC, ticket PNR verification, escrow payments                                                 |
| Multiple buyers paying for the last ticket/seat         | MongoDB Transactions & atomic seat locking                                                    |
| Sellers reselling the same ticket multiple times        | Unique PNR enforcement & real-time validation                                                 |
| Buyers misusing sensitive ticket details before purchase| Blurred tickets with hidden QR codes                                                          |
| Refund disputes                                         | Escrow system ensures payment is only released when buyer confirms ticket validity            |
| Lack of trust between strangers in carpooling           | Mutual driver-passenger ratings, identity verification                                        |

---

## 🔍 How It Works

### Tickets Reselling

1. **Seller Uploads Ticket:** Upload a PDF, OCR extracts details (PNR, seat, timings).  
2. **AI-Powered Security Check:** Validate PNR & blur sensitive details.  
3. **Buyer Bids:** If the seller has the premium version of platform, the seller can setup an auction for the tickets. User with highest bid gets the tickets, and ticket is locked in escrow.  

4. **Buyer Buys:** If the seller doesn't have the premium version of platform, the buyer can buy the tickets directly.
5. **Ticket Access:** Buyer gets the **full ticket** only after payment.  
6. **Escrow Release:** Payment is released to the seller once travel is completed.  

### Car Pooling
1. **Driver Creates Carpool Request:** Driver creates a carpool request with the passengers.
2. **Passengers Books:** Passengers book seats for the carpool.
3. **Driver Approves:** Driver approves the booking.
4. **Passenger Pays:** After journey is completed, the passenger pays for the carpool.

---

## 🛠️ Tech Stack

| Component             | Technology Stack                                |
|----------------------|-------------------------------------------------|
| **Frontend**         | React.js / Next.js, TailwindCSS, Redux          |
| **Backend**          | Node.js, Express.js, TypeScript                 |
| **Database**         | MongoDB + Transactions for concurrency          |
| **Authentication**   | Clerk/Auth0 or Firebase Auth                    |
| **Payments**         | Stripe/Razorpay (with escrow logic)             |
| **KYC Verification** | Onfido/IDfy APIs                                |
| **OCR Extraction**   | Tesseract.js or Google Vision API               |
| **Hosting**          | Vercel (Frontend), AWS/GCP/Azure (Backend)      |
| **Notifications**    | Twilio, SendGrid, Firebase Cloud Messaging      |

---

## 🔐 Security Features

- 🔒 **Escrow-Based Payment Protection** – Buyers only pay once they have a valid ticket.  
- 🪪 **Mandatory KYC for Sellers** – Only verified users can sell tickets.  
- 🖼️ **Blurred Sensitive Ticket Details** – Prevents misuse before purchase.  
- 🔑 **JWT Authentication & RBAC** – Role-based access for admins, drivers, and passengers.  
- 🔗 **End-to-End Encryption** – Sensitive details stored securely.  
- 🔍 **PNR Verification APIs** – Detect fake or invalid tickets.  

---

## 🧑‍🤝‍🧑 Team 
| Name | Role |
|------------------------|-----------------------------------------------------| 
| **Avishkar Dhanorkar** | Project Manager, Frontend Developer | 
| **Need Some** | Frontend Developer |