const{body}=require('express-validator')
let Validation=[
    body('title').notEmpty().withMessage('Title is required').isLength({min:3}).withMessage('Title must be at least 3 chars'),
    body('department').notEmpty().withMessage('Department is required').isLength({min:3}).withMessage('Department must be at least 3 chars'),
    body('instructor').notEmpty().withMessage('Instructor is required').isLength({min:3}).withMessage('Instructor must be at least 3 chars')
]
module.exports={Validation}