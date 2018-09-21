module.exports={
    CHANGE_PASSWORD:{
        SUCCESS:{
            code:200,
            message:'Change password success'
        },
        FAILED:{
            EMPTY:{
                code:404,
                message:'Password is empty'
            },
            NOT_MATCH:{
                code:404,
                message:'Password is incorrect'
            }
        }
    },
    GET_USER:{
        SUCCESS:{
            code:200,
            message:'Get user success'
        },
        FAILED:{
            code:404,
            message:'User not found'
        }
    }
}