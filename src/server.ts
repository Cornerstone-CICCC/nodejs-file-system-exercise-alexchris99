// Check the README.md file for instructions to the exercise
import fs from "fs" // fs to read the file
import http from "http" // http to create the server
import dotenv from "dotenv"// to get access to the .env info and vars
import path from "path"// to create the path to the directory


dotenv.config()// to acces the PORT var

const server = http.createServer((request, responce) =>{// server paths

    const viewImagedir = "images/veryhappydog.jpg" // dir of the target image
    const docsDirectory = path.join(__dirname,"", viewImagedir) // path to join the server.js and the dir target of the image

    

    // view image
    if(request.url === "/view-image"){ // url path of the image
        fs.readFile(docsDirectory,(err, data)=>{ // read the file and get err and data
            if(err){// in case we hav an error
                responce.writeHead(500, {"content-type":"text/plain"})// type text/plain
                responce.end("Not found")
                return
            }
            // if we dont have an error we retun the image
            responce.writeHead(200,{"content-type":"image/jpeg"})// the type image/jpeg
            responce.end(data)
        })
        return
    }

    //404 fallback
    responce.writeHead(404,{"content-type": "text/plain"})
    responce.end("Not found")
    return
})

const PORT = process.env.PORT || 3500

server.listen(PORT, () =>{
    console.log(`Server running in port ${PORT}`)
})