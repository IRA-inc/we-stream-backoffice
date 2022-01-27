export function authHeader(){
    let user_token = JSON.stringify(sessionStorage.getItem('user_token')).replace(/"/g,"");

    if(user_token){
        return "Bearer " + user_token;
    }else{
        return{};
    }
}