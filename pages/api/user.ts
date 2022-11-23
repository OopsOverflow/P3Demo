import  prisma  from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST'){
        return res.status(400).json( { message: "Only POST allowed"});
    }

    try {
        const user: Prisma.UserCreateInput = JSON.parse(req.body);
        const savedUser = await prisma.user.create({ data: user });
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: "Error" });
    }

}

export default handler;