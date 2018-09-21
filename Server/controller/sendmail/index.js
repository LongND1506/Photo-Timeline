const nodemailer=require('nodemailer')
module.exports={
    sendMail:(sendto,title,html)=>{
        let transporter=nodemailer.createTransport({
            port:567,
            secure:false,
            service:'gmail',
            auth:{
                user: '14520487@gm.uit.edu.vn',
                pass: '225709318'
            }
        })
        let mailOption={
            from:'longpro40@gmail.com',
            to:sendto,
            subject:title,
            html:html
        }
        return new Promise((resolve,reject)=>{
            transporter.sendMail(mailOption,(err,info)=>{
                if(err)
                    reject(err)
                else
                    {
                         resolve(info)
                    }
                
            })
        })
        
    }
}