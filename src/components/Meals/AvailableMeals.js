import {useState,useEffect} from 'react';
import axios from "axios";
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {

  const [dum_meal,setMealdata]=useState([]);
  const [data_loading,setDataLoader]=useState(true);

  useEffect(() =>{
    try {
        axios.get('https://api-project-391044883508.firebaseio.com/Meals.json')
        .then(res => {
          for(let key in  res.data) {
            setMealdata((data) => [...data,{id: key , name : res.data[key].name, description : res.data[key].description, price : res.data[key].price}]);    
          }
          setDataLoader(false);
        });  
    }catch(error){
      //throw new Error(error);
    }

   },[]);
  
  const mealsList = dum_meal.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {data_loading ? <p>Loading....</p> : <ul>{mealsList}</ul> }
      </Card>
    </section>
  );
};

export default AvailableMeals;
