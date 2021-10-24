const db = require('../models');
const User = db.user;

  exports.information = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
    .then(data => {
      if(data){
        res.send(data);
      }
      else{
        res.status(404).send({message: 'Can not find with id ' + id });
      }
    })
    .catch(err => {
      res.status(500).send({message: err.message});
    })
  };

  exports.updateinfor = (req, res) => {
    // update require:
    // - x-access-tokens
    // - email
    // - firstname
    // - lastname
    // - phone
    // - birthday
    const id = req.params.id;

    User.update(req.body, 
      {where: {id: id}}
    )
    .then(number => {
      if (number ==1)
      res.send({message: 'User Information updated successful!', success: true});
      else
      {
        res.send({message: 'User Information updated Error. Check your Request.body or your user is empty!', success: false});
      }
    });
  };

  exports.changepassword = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
      where: {id: id}
    })
    .then(number => {
      if (number ==1)
      res.send({message: 'User Password updated successful!', success: true});
      else
      {
        res.send({message: 'User Password updated Error. Check your Request.body or your user is empty!', success: false});
      }
    })

  };
  
  
  
  
  
  //test
  exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  }