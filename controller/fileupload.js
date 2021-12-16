const{google}=require('googleapis');
const path =require('path')
const fs = require('fs')

const Client_ID='859572158752-9o0fej694da89iogmvm0o4cdv9le7jfs.apps.googleusercontent.com';
const Client_Serect ='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';
const Redirect_URI='https://developers.google.com/oauthplayground';

const Refresh_Token='1//04I8Ut0EFbBUUCgYIARAAGAQSNwF-L9IrHGuS3O0XTLmwVSG9TBTpqeRFod_XVaIElQ9eOEdelrClYYRzpbayfBBR5K1HgZm9mAM';

const oauth2client =new google.auth.OAuth2(
	Client_ID,
	Client_Serect,
	Redirect_URI
);

oauth2client.setCredentials({refresh_token: Refresh_Token})

const drive =google.drive({ 
	version: 'v3',
	auth: oauth2client
})


var fileId=''
exports.fileupload=(req, res) => {
	try{    
		if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
        }); 
        let file = req.files.file;
        await uploadFile(file);
    }
    catch (error){
        console.log(error);
        res.status(500).json({msg:"err"});
    } 


}
async function uploadFile(file){
	try{
		const response =await drive.files.create({
			requestBody:{
				name:file.name,
				mimeType: file.mimetype,
			},
			media:{
				mimeType:file.mimetype,
				body:fs.createReadStream(file.path),
			},
		});
		console.log(response.data.id);
		fileId=response.data.id;
	}catch(err){
		console.log(err.message);
	}
}

//uploadFile();

// async function deleteFile(){
// 	try{
// 		const response =await drive.files.delete({
// 			fileId:'',
// 		});
// 		console.log(reponse.data,response.status);
// 	}catch(err){
// 		console.log(err.message);
// 	}
// }

// deleteFile();

async function genratePublicUrl(){
	try{
		fileId='1-Tckhd2H0-bLcKGX84wqbRGNv7lNa_Mr'
		await drive.permissions.create({
			fileId:'1-Tckhd2H0-bLcKGX84wqbRGNv7lNa_Mr',
			requestBody:{
				role: 'reader',
				type: 'anyone'
			}
		});
		//contentLink 是下載
		const result = await drive.files.get({
			fileId:fileId,
			fields:'webViewLink, webContentLink',
		});
		console.log(result.data);
	}catch(err){
		console.log(err.message);
	}
}
//genratePublicUrl();