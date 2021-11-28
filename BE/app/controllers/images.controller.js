const fs = require("fs");
const db = require("../models");

const Image = db.image;

exports.uploadFiles = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    const inputImage = fs.readFileSync(
      __basedir + "/resources/static/assets/uploads/" + req.file.filename
    );

    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      alt: req.file.originalname,
      path: __basedir + "/resources/static/assets/uploads/" + req.file.filename,
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/resources/static/assets/tmp/" + image.name,
        // image.data
        inputImage
      );
      console.log(3);
      return res.status(201).send({image: image});
    });
  }catch (error) {
    console.log(error);
    return res.status(500).send(`Error when trying upload images: ${error}`);
  }
};

exports.getImages = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Image.findOne(
    {
      where: {id: id},
    }
  )
  .then((image) => {
      if(image){
        const inputImage = fs.readFileSync(
          image.path
        );
        var imagebase64 = Buffer.from(inputImage).toString("base64");
    
        image.hello = "hello";
        // res.contentType('image/png');
        res.status(200).send("data:image/png;base64,"+imagebase64);
      }
      else{
        res.status(404).send({message: 'Not Found'});
      }
  })
  .catch((err) => {
    res.status(500).send(err.message);
  })
}
