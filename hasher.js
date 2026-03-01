const crypto=require('crypto');
const fs=require('fs');
require('dotenv').config();

UserAndPasswords=[
    [process.env.LEVEL1USERNAME,process.env.LEVEL1PASSWORD],
    [process.env.LEVEL2USERNAME,process.env.LEVEL2PASSWORD],
    [process.env.LEVEL3USERNAME,process.env.LEVEL3PASSWORD],
    [process.env.LEVEL4USERNAME,process.env.LEVEL4PASSWORD]
];

fs.writeFileSync('./databases/Login.DB',"",error=>{
    if(error){
        console.log("Failed to purge Login.DB");
    }
});

function makeHash(input){
    const hash=crypto.createHash('sha256').update(input).digest('hex');
    return hash;
}

for(let i=0;i<=3;i++){
    fs.appendFileSync('./databases/Login.DB',makeHash(UserAndPasswords[i][0])+" "+makeHash(UserAndPasswords[i][1])+" "+(i+1)+"\n",error=>{
        if (error){
            console.log("Failed to write to Login.DB at UserAndPasswords index", i, "with error:", error)
        }
    });
}

module.exports={makeHash};