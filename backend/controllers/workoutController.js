const Workout = require('../models/Workout');
const mongoose = require('mongoose');

//get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({createdAt: -1});
  res.status(200).json(workouts);
}

//get a single workout
const getWorkout = async (req,res)=>{
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({err:'Invalid ID'});
  }

    const workout = await Workout.findById(id);

  if(!workout){
    return res.status(404).json({err:'No such workout'});
  }

  res.status(200).json(workout);
}


//create a new workout

const createWorkout = async (req, res) => {
   const {title,reps,load} = req.body;

   let emptyFields = [];
   if(!title){
    emptyFields.push('title');
   }
   if(!load){
    emptyFields.push('load');
   }
   if(!reps){
    emptyFields.push('reps');
   }
   if(emptyFields.length > 0){
    return res.status(400).json({error:'Please fill in all the fields',emptyFields});
   }

   //add doc to the db
  try {
    const workout =  await Workout.create({title,reps,load});
    res.status(201).json(workout)
    
  } catch (err) {
    res.status(400).json({error:err.message})
    
  }
};

//delete a workout
const deleteWorkout = async (req,res)=>{
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'Invalid ID'});
  };
  const workout = await Workout.findByIdAndDelete(id);
  if(!workout){
    return res.status(404).json({error:'No such workout'});
  }
  res.status(200).json(workout);

}


//update a workout

const updateWorkout = async (req, res) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({err:'Invalid ID'});
  };

  const workout = await Workout.findOneAndUpdate({_id:id},{
    // $set:req.body
    ... req.body
  },{new:true});
  if(!workout){
    return res.status(404).json({err:'No such workout'});
  }
  res.status(200).json(workout);
}

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
};