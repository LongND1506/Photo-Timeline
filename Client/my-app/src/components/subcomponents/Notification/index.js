import {
    NotificationManager
  } from "react-light-notifications";
export const Notifi={
    success:(content)=>NotificationManager.success({title:'Success!',message:content,timeOut:2500}),
    warning:(content)=>NotificationManager.warning({title:'Warning!',message:content,timeOut:2500}),
    error:(content)=>NotificationManager.error({title:'Error!',message:content,timeOut:2500}),
    info:(content)=>NotificationManager.info({title:'Info!',message:content,timeOut:2500})
}