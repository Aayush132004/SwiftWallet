"use server"
import {getServerSession} from"next-auth";
import {authOptions} from "../auth";

import prisma from "@repo/db/client";

export async function pspTransfer(amount: number, recipient: string) {
    const session = await getServerSession(authOptions);
    const sender=session?.user?.id;

    if (!sender) {
       return{
        message:"Error while sending"
       }
    }
    const receiver=await prisma.user.findFirst({
        where:{
            number:recipient
        }
    })

    if(!receiver){
        return{
            message:"Recipient not found"
        }
    }

    await prisma.$transaction(async(tx)=>{
        
        //locking all senders row during transaction
        //to avoid parallel money sending from this person to multiple people
        //simultaneously which will lead to negative balance
        //thus making sequentially sending money to multiple people possible but not simultaneously
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(sender)} FOR UPDATE`;

        const senderBalance=await tx.balance.findUnique({
            where:{
                userId:Number(sender)
            }
        })
        if(!senderBalance || senderBalance.amount<amount){
            throw new Error("Insufficient balance")
        }
        
        // await new Promise(r => setTimeout(r, 4000));
        await tx.balance.update({
            where:{
                userId:Number(sender)
            },
            data:{
                amount:{
                    decrement:amount
                }
            }
        })

        await tx.balance.update({
            where:{
                userId:Number(receiver.id)
            },
            data:{
                amount:{
                    increment:amount
                }
            }
            }
        
        )
        await tx.p2pTransfer.create({
            data: {
                amount: amount,
                timestamp: new Date(),
                fromUserId: Number(sender),
                toUserId: Number(receiver.id)
            }
        })
    })

}






