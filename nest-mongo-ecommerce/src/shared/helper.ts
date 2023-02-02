export class Helper{
    static customFileName(req,file,cb){

        let custumFile=file.originalname.split(".")[0];
       
       let fileExtension =""
       if(file.mimetype.indexOf("jpeg")>-1){
           fileExtension=".jpg"
       }else if(file.mimetype.indexOf("png")>-1){
           fileExtension=".png"
       }

       custumFile=custumFile+fileExtension;
       cb(null,custumFile)
    }

    static filePath(req,file,cb){
        cb(null,"../../../Web/angular/src/assets")
    }


}