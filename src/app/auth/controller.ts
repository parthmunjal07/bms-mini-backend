import type { Request, Response } from "express";
import { signupPayloadModel } from "./models.js";
import { db } from "../../db/index.js";
import { usersTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { error } from "node:console";
import { createHmac, randomBytes } from "node:crypto";

class AuthenticationController {
    public async handleSignUp(req: Request, res: Response){

        // check by zod validation
        const validationResult = await signupPayloadModel.safeParseAsync(req.body)
        if (validationResult.error) return res.status(400).json({message: "Body validaton failed", error: validationResult.error}) 
        // take the data
        const {firstName, lastName, email, password} = validationResult.data
        // check duplicate email
        const userEmailResult = await db.select().from(usersTable).where(eq(usersTable.email, email))
        if (userEmailResult.length > 0) return res.status(400).json({message: "Email; already Registered", error: "duplicate entry"})
        //password hashing
        const salt = randomBytes(32).toString('hex')
        const hash = createHmac('sha256', salt).update(password).digest('hex')

        const [result] = await db.insert(usersTable).values({
            firstName,
            lastName,
            email,
            password: hash,
            salt
        }).returning({id: usersTable.id})

        return res.status(201).json({ message: 'user has been created successfully', data: { id: result?.id } })

    }
    public async handleSignIn(req: Request, res: Response){

    }
    public async handleMe(req: Request, res: Response){

    }
}