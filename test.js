url = "www.youtube.com"
url2 = "https://www.youtube.com/"

function getbaseurl(str){
    if(str.includes("https://")){
        let url = new URL(str);
        return url.origin;
    }else {
        let url = new URL("https://"+str);
        return url.origin;
    }
    
}


console.log(getbaseurl(url) || true);

