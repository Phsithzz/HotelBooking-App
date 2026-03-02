import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getRentAll = async(req,res)=>{
    try {
        const results = await prisma.roomRent.findMany({
            include:{
                RoomRentDetail:{
                    include:{
                        Room:true
                    }
                }
            }
        })
        return res.json({
            results:results
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error:err.message
        })
        
    }
}

export const isRent = async (req, res) => {
  try {
    const roomId = parseInt(req.body.roomId)
    const checkinDate = new Date(req.body.checkinDate)
    const checkoutDate = new Date(req.body.checkoutDate)

    const row = await prisma.roomRentDetail.findMany({
      where: {
        roomId: roomId,
        RoomRent: {
          AND: [
            {
              checkinDate: {
                lt: checkoutDate,   
              },
            },
            {
              checkoutDate: {
                gt: checkinDate,   
              },
            },
          ],
        },
      },
      include: {
        RoomRent: true,
      },
    })

    return res.json({
      results: row,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: err.message,
    })
  }
}

export const rentRoom = async(req,res)=>{
    try {
      
        const rooms = req.body.rooms
        
        const roomRent = await prisma.roomRent.create({
            data:{
                customerName:req.body.customerName,
                customerPhone:req.body.customerPhone,
                rentDate:new Date(),
                checkinDate:new Date(req.body.checkinDate),
                checkoutDate:new Date(req.body.checkoutDate)
            }
        })

        for(let i = 0;i<rooms.length;i++){
            const roomId = rooms[i]

            await prisma.roomRentDetail.create({
                data:{
                    roomId:roomId,
                    roomRentId:roomRent.id
                }
            })
        }

        return res.json({
            message:"success"
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            error :err.message
        })
        
    }
}