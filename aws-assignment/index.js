var express = require('express');
const AWS = require('aws-sdk');
//*/ get reference to S3 client 
var s3 = new AWS.S3();
const Client=require('pg').Pool
const parser = require('lambda-multipart-parser');
var crypto = require('crypto');
var sharp = require('sharp');

const client=new Client({
    host:"postgres.cdpx0vqczikw.us-east-1.rds.amazonaws.com",
    port:5432,
    user:"postgres",
    password:"Passw0rd",
    database:"postgres"
});


// exports.handler = async (event) => {
//     // TODO implement
//     return new Promise(async(reslove,reject)=>{
//       await client.query("select * from customer",(error,response)=>{
//             return reslove({
//   headers:{

//     "Content-Type":"application/json",
//     "Access-Control-Allow-Origin":"*"
// },
//             body:JSON.stringify(response.rows)
//         });
//       });
//     });
// };


// exports.handler = async (event) => {
//     // TODO implement
//     var id = event.queryStringParameters.id;
//     console.log(id)
//     return new Promise(async(reslove,reject)=>{
//       await client.query("select * from customer where cust_id=$1",[id],(error,response)=>{
        
//             return reslove({
//               headers:{
//                                 "Content-Type":"application/json",
//                             },
//             body:JSON.stringify(response.rows)
//         });
//       });
//     });
// };






// exports.handler = async (event,callback) => {
//     // TODO implement
//     const result = await parser.parse(event);
//     console.log(result.files);
//     console.log(result)
//     const image=result.files[0]
//     let decodeImage=Buffer.from(image.content,'base64');
//     const date=new Date();
//     const newdate=date.toISOString().replace("T","_").replace(/:/g,"-").replace(".","-");
//     var filePath="images/"+newdate+".jpeg";
//     // var fileName="http://customerimagebucket.s3-website-us-east-1.amazonaws.com/"+"images/"+newdate+".jpeg";
//     var fileName="images/"+result.cust_name+newdate+".jpeg"
//     var params={
//       "Body":decodeImage,
//       "Bucket":"customerimagebucket",
//       "Key":filePath,
//       "ContentType":'image'
//     };
//     await s3.putObject(params).promise();
//     var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
//       var mystr = mykey.update(result.cust_password, 'utf8', 'hex')
//       mystr += mykey.final('hex');

//     return new Promise(async(reslove,reject)=>{
//       await client.query("insert into customer_data(cust_name,cust_email,cust_password,cust_mno,cust_image) values($1,$2,$3,$4,$5)",[result.cust_name,result.cust_email,mystr,result.cust_mno,fileName],(error,response)=>{
//           console.log("addedbefore")
//           return reslove({
//             headers:{
//               "Content-Type":"application/json"
//             },
//             body:JSON.stringify("Added"),
            
          
//         });
        

//       });
//     });
// };

//post data
// exports.handler = async (event, callback) => {
//   // TODO implement
//   const result = await parser.parse(event);
//   console.log(result.files);
//   console.log(result)
//   var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
//   var mystr = mykey.update(result.cust_password, 'utf8', 'hex')
//   mystr += mykey.final('hex');
   
//      var filePath = "images/" + result.files[0].filename
//       var params = {
//       "Body": result.files[0].content,
//       "Bucket": "customerimagedata",
//       "Key": filePath,  
//       'Content-Type': 'image/png' ,
     
//    };
   
//    await s3.upload(params, function(err, data){
//     if(err) {
//         callback(err, null);
//     } else {
//         let response = {
//      "statusCode": 200,
//      "headers": {
//          "my_header": "multipart/form-data"
//      },
//      "body": JSON.stringify(data),
//     //  "isBase64Encoded": false
//  };
//         callback(null, response);
//  }
//  }).promise();

//   return new Promise(async(reslove,reject)=>{
//     await client.query("insert into customer(cust_name,cust_email,cust_password,cust_mno,cust_image) values($1,$2,$3,$4,$5)",[result.cust_name,result.cust_email,mystr,result.cust_mno,filePath],(error,response)=>{
//           return reslove({
//           body:JSON.stringify("Added")
//       });
//     });
//   });
// };














exports.handler = async (event,callback) => {
    // TODO implement
    const result = await parser.parse(event);
    console.log(result.files);
    console.log(result)
    const image=result.files[0]
    let decodeImage=Buffer.from(image.content,'base64');
    const date=new Date();
    const newdate=date.toISOString().replace("T","_").replace(/:/g,"-").replace(".","-");
    var filePath="images/"+newdate+".jpeg";
    var filePath1="avatars/"+newdate+".jpeg";
    // var fileName="http://customerimagebucket.s3-website-us-east-1.amazonaws.com/"+"images/"+newdate+".jpeg";

    var fileName="images/"+result.cust_name+newdate+".jpeg"
    //for image uploading into s3 bucket
    var params={
      "Body":decodeImage,
      "Bucket":"images-harshil",
      "Key":filePath,
      "ContentType":'image'
    };
    await s3.putObject(params).promise();

  //for creating and uploading thumbnill image
    const scaleByHalf = await sharp(decodeImage)
    .metadata()
    .then(({ width=100 }) => sharp(decodeImage)
      .resize(Math.round(width * 0.5))
      .toBuffer()
  );
  var params1={
    "Body":scaleByHalf,
    "Bucket":"images-harshil",
    "Key":filePath1,
    "ContentType":'image'
  };
  await s3.putObject(params1).promise();

  //for encription the password
    var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
      var mystr = mykey.update(result.cust_password, 'utf8', 'hex')
      mystr += mykey.final('hex');
  var filenameimage="https://images-harshil.s3.amazonaws.com/"+filePath;
    return new Promise(async(reslove,reject)=>{
      await client.query("insert into customer(cust_name,cust_email,cust_password,cust_mno,cust_image) values($1,$2,$3,$4,$5)",[result.cust_name,result.cust_email,mystr,result.cust_mno,filenameimage],(error,response)=>{
          console.log("addedbefore")
          return reslove({
            headers:{
                  "Content-Type":"application/json",
                  "Access-Control-Allow-Origin":"*"
              },
            body:JSON.stringify("Added"),
        });
        

      });
    });
};