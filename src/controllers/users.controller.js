import User from '../models/user'
import config from '../config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


//CODE FOR HANDLING THE LOGIN REQUESTS ############################################################
export const postLogin = async (req,res) => {
    //Validating the req returned values for user and credential
    if(req?.user !== null && req?.password !== null){
        User.findOne({where:{
            user: req.body?.user
        }})
        .then(user => {
            if(user === null){
                //USER DOESN'T EXIST 
                //cancel the operation
                return res.status(401).json({
                    message: 'Verificación fallida'
                })               
            } 
            
            //USER EXISTS 
            //SO... VERIFY PASSWORD HASH COMPARE            
            bcrypt.compare(req.body.password, user.credential, (err,result) => {
                if(err){
                    return res.status(401).json({
                        message: 'Verificación fallida'
                    })
                }
                if(result){
                    //mail and password matched
                    //GENERATE TOKEN USING JWT
                    const token = jwt.sign({
                        email: user.user,
                        userId: user.id
                    }, 
                    config.jwtKey,
                    {
                        expiresIn: "1h"
                    })//JWT SIGN
                    //If point reached, correct credentials
                    return res.status(200).json({
                        message: 'Credenciales verificadas',
                        token: token
                    })
                }
                res.status(401).json({
                    message: 'Verificación fallida'
                })
            })//bcrypt
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
                      
    } else { //CAMPOS INCOMPLETOS
        return res.status(400).json({
            msg:"Bad request. Porfavor llene todos los campos"
        })
    }
}

//CODE FOR HANDLING THE SIGNUP REQUESTS ############################################################
export const postSignup = async (req,res) => {
    User.findOne({where:{
        user: req.body?.user
    }})
    .then(user => {
        //Verify if mail is in use
        if(user !== null){
            return res.status(409).json({
                message: 'El usuario no se encuentra disponible'
            })
        } 
        //Inits hash proces to store the password securely
        bcrypt.hash(req.body?.password, 10, (err, hash) => {
            if(err) {
                //Failed to hash, operation dropped
                return res.status(500).json({
                    error: err
                })
            }
            //Hash successful
            //Create and insert data received
            User.create({        
                user: req.body?.user,
                credential: hash,
                description: req.body?.description,
                privileges: req.body?.privileges,  
            })
            .then( result => {
                res.status(201).json({
                message: 'Usuario registrado con éxito'
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                error: err
                })
            })
        
        })            
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err})
    }
)}
