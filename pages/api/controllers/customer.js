const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Controller = require('./controller');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

import Customer from "../models/customer";

class CustomerController extends Controller {
    
    constructor(req,res,next) {
        super(req,res,next);
        const { db } = await connectToDatabase();
    }

    registerCustomer = () => {
        const { 
            name, 
            email , 
            password, 
        } = this.req.body;
        const register = async () => {
            const customerId = uuidv4();
            const customer = new Customer({
                id: customerId,
                name,
                email,
                password: bcrypt.hashSync(password,10)
            });

            try {
                const customerCreated = await Customer.create(customer);
                return this.res.status(200).json({
                    customerCreated
                });
            } catch (err) {
                return this.res.status(500).send(`Error: ${err.message}`);
            }
        }
        register();
    }
}