import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createRoom = async(req,res)=>{
    try {
        await prisma.room.create({
            data:{
                name:req.body.name,
                price:parseInt(req.body.price)
            },
        })
        return res.json({
            message:"success"
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({error:err.message})
        
    }
}

export const  getAllRoom = async(req,res)=>{
    try {
        const results = await prisma.room.findMany({
            orderBy:{
                id:"desc"
            },
            where:{
                status:"use"
            }
        })
        return res.send({results:results})

    } catch (err) {
        console.log(err)
        res.status(500).send({error : err.message})
        
    }
}

export const removeRoom = async(req,res)=>{
    try {
        await prisma.room.update({
            data:{
                status:"delete",
            },
            where:{
                id:parseInt(req.params.id)
            }
        })

        return res.json({message:"success"})

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error:err.message
        })
        
    }
}
export const updateRoom = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    await prisma.room.update({
      where: { id: id },
      data: {
        name: req.body.name,
        price: parseInt(req.body.price)
      }
    })

    return res.json({ message: "success" })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: err.message })
  }
}