import React, {useEffect} from 'react'
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import {useAuthContext} from '../hooks/useAuthContext'

//components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  const {workouts,dispatch} = useWorkoutsContext();
  //sacamos al user del state
  const {user} = useAuthContext();

  useEffect(() => {
    //Se crea una función para el fetch porque se 
    //require una funcion asincrona y no se puede usar el async
    //directamente en el useEffect
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts',{
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      });
      const json = await response.json();
      if(response.ok){
        dispatch({type:'SET_WORKOUTS',payload:json});
      }
    }
    if(user){
      fetchWorkouts();
    }
    
  }, [dispatch,user]);
  return (
    <div className='home'>
      <div className="workouts">
        {workouts && workouts.map((workout)=>(
          <WorkoutDetails key={workout._id} workout={workout}/>
        )
        )}
      </div>
      <WorkoutForm/>
    </div>
  )
}

export default Home