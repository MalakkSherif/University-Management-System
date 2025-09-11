const{body}=require('express-validator')
let Validation=[
    body('title').notEmpty().withMessage('Title is required').isLength({min:3}).withMessage('Title must be at least 3 chars'),
    body('department').notEmpty().withMessage('Department is required').isLength({min:3}).withMessage('Department must be at least 3 chars'),
    body('staffId').notEmpty().withMessage('StaffId is required')
]
module.exports={Validation}