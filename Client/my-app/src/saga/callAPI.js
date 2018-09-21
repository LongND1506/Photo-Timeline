export function callApi(url,method='GET',body,token=localStorage.getItem('token')){
    let res= fetch(url,{
      headers:{
      "Content-Type":"application/json",
      "Access-Control-Request-Headers":"",
      "Authorization":token
    },
      method:method,
      body:JSON.stringify(body)
    }).then((respone)=>respone.json())
    return res
}
