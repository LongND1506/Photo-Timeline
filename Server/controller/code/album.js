module.exports={
    GET:{
        SUCCESS:{
            code:200,
            message:'Get albums success'
        },
        FAILED:{
            code:404,
            message:'Get albums failed'
        }
    },
    UPLOAD:{
        SUCCESS:{
            code:200,
            message:'Upload image success'
        },
        FAILED:{
            FILE_EMPTY:{
                code:404,
                message:'File is empty,'
            },
            INVALID_FILE_FORMAT:{
                code:404,
                message:'Incorrect image format'
            }
        }
    },
    UPDATE:{
        SUCCESS:{
            code:200,
            message:'Update success'
        },
        FAILED:{
            code:404,
            message:'Update failed'
        }
    },
    ADD_IMAGE:{
        SUCCESS:{
            code:200,
            message:'Add image success'
        },
        FAILED:{
            NOT_FOUND:{
                code:404,
                message:'Album not found'
            },
            FILE_EMPTY:{
                code:404,
                message:'File empty'
            }
        }
    },
    DELETE_IMAGE:{
        SUCCESS:{
            code:200,
            message:'Delete image success'
        },
        FAILED:{
            NOT_FOUND:{
                code:404,
                message:'Image not found'
            }
        }
    },
    DELETE:{
        SUCCESS:{
            code:200,
            message:'Delete success'
        },
        FAILED:{
            code:404,
            message:'Album not found,Delete failed'
        }
    }
}