export function Capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function indexSource(name) {
  return `
import { Router } from 'express'
import { create } from './create'
import { read } from './read'
import { update } from './update'

const router = Router()

router.use('/api/${name}', read)
router.use('/api/${name}', create)
router.use('/api/${name}', update)


export { router as ${name}Router }
`;
}

export function readSource(name) {
  return `import { Request, Response, Router } from "express";
import {
  currentUser,
  requireAdmin,
  requireAuth,
  validateRequest,
} from "../../middlewares";
import { ${Capitalize(name)} } from "../../models";

const router = Router();

/**
 * @swagger
 * /api/${name}/{id}:
 *  get:
 *    summary: Fetch single ${name} by ID or all ${name}
 *    tags: [${Capitalize(name)}]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: false
 *        schema:
 *          type: string
 *        description: id
 *    responses:
 *      200:
 *        description: ${name} fetch successfull
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/${Capitalize(name)}'
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              $$ref: "#/components/schemas/BadRequest"
 */

router.get(
  "/:id?",

    async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            let ${name}
            if (id) ${name} = await ${Capitalize(name)}.findOne({ _id: id })
            else ${name} = await ${Capitalize(name)}.find()

            res.status(200).json(${name})
          
        } catch (error) {
            throw new Error('Something went wrong')
        }
    });

export { router as read };
`;
}

export function updateSource(name) {
  return `import { Request, Response, Router } from 'express'
import { BadRequestError } from '../../errors'
import {
  currentUser,
  requireAdmin,
  requireAuth,
  validateRequest,
} from '../../middlewares'

import { ${Capitalize(name)} } from '../../models'

const router = Router()

/**
 * @swagger
 * /api/${name}/update:
 *  put:
 *    summary: Update your ${name}
 *    tags: [${Capitalize(name)}]
 *    security:
 *      - jwt: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/${Capitalize(name)}"
 *    responses:
 *      200:
 *        description: Update Successful
 *        content:
 *          application/json:
 *            schema:
 *            $ref: "#/components/schemas/${Capitalize(name)}"
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              $$ref: "#/components/schemas/BadRequest"
 */

router.put(
  '/update',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
 
    const existingUser = req.currentUser

    if (!existingUser) {
      throw new BadRequestError('User not found')
    }
    const ${name}: any = await ${Capitalize(
    name
  )}.findOne({ user: existingUser.id })

    if (!${name}) {
      throw new BadRequestError('${name} not found')
    }

    await ${Capitalize(name)}.findOneAndUpdate(
      { user: existingUser.id },req.body)

    const updated${name}: any = await ${Capitalize(
    name
  )}.findOne({ user: existingUser.id })
  

    if (!updated${name}) {
      throw new BadRequestError('Something went wrong')
    }

    res.status(201).json(updated${name})
 
  })

export { router as update }

`;
}

export function createSource(name) {
  return `
import { Request, Response, Router } from 'express'
import mongoose from 'mongoose'
import { BadRequestError } from '../../errors'
import {
  currentUser,
  requireAdmin,
  requireAuth,
  validateRequest,
} from '../../middlewares'

import { ${Capitalize(name)} } from '../../models'

const router = Router()
                                                                    
/**
 * @swagger
 * /api/${name}/create:
 *  post:
 *    summary: Create your ${name}
 *    tags: [${Capitalize(name)}]
 *    security:
 *      - jwt: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/${Capitalize(name)}"
 *    responses:
 *      201:
 *        description:  Creation successful
 *        content:
 *          application/json:
 *            schema:
 *            $ref: "#/components/schemas/${Capitalize(name)}"
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              $$ref: "#/components/schemas/BadRequest"
 */

router.post(
  '/create',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
   
    const existingUser = req.currentUser

    if (!existingUser) {
      throw new BadRequestError('User not found')
    }

    const  ${name} = await ${Capitalize(name)}.create({
      user: mongoose.Types.ObjectId(existingUser.id),
     ...req.body
    })

    if (!${name}) {
      throw new BadRequestError('${Capitalize(name)} not found')
    }

    res.status(200).send(${name})
  }
)
export { router as create }
`;
}
