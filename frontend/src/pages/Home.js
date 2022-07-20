import React, {useEffect} from 'react'
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'

//components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  const {workouts,dispatch} = useWorkoutsContext();
  useEffect(() => {
    //Se crea una función para el fetch porque se 
    //require una funcion asincrona y no se puede usar el async
    //directamente en el useEffect
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts');
      const json = await response.json();
      if(response.ok){
        dispatch({type:'SET_WORKOUTS',payload:json});
      }
    }
    fetchWorkouts();
    
  }, [dispatch]);
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