if (process.argv.length !== 7) {
    console.log(`
      You gave ${process.argv.length - 2} arguments(s) to the program
  
      Please provide 5 arguments for
      
      weight (kg), 
      height (m), 
      age, 
      wether you exercise daily (yes or no)
      and your gender (m or f)
      
      Example:
  
      $ node index.js 82 1.79 32 yes m
    `);
  
    process.exit();
  }
  

const weightInKg = parseInt(process.argv[2]);
const heightInM = parseFloat(process.argv[3]);
const age = parseInt(process.argv[4]);
const dailyExercise = process.argv[5];
const gender = process.argv[6];


if(isNaN(weightInKg) || isNaN(heightInM) || isNaN(age)){
  
    console.log(`Please make sure weight, height and age are numbers:

    weight (kg) example: 82 | your input: ${process.argv[2]}
    height (m) example 1.79 | your input: ${process.argv[3]}
    age (years) example 32  | your input: ${process.argv[4]} 

    $ node index.js 82 1.79 32 yes m
    `);
    
    process.exit();    
}

if (age <20){
    console.log(`
    This BMI calculator was designed to be used by people older than 20

    BMI is calculated differently for young people.

    Please visit: https://en.wikipedia.org/wiki/Body_mass_index#Children_(aged_2_to_20)

    For more information
  `);

  process.exit();
}

// check if weight is lower than 30 kg OR higher than 300 kg

if(weightInKg < 30 || weightInKg > 300){
    console.log(`Please enter a weight in kgs
    
    Your weight of ${weightInKg} kgs does not fall in the range between 30 kg and 300 kg

    If you weight is below 30 kg or over 300 kg seek professional medical help
  `);

  process.exit();
}

// check wether dailyExercise was answered with "yes" or "no"
if(dailyExercise !== "yes" && dailyExercise !== "no"){
    console.log(`
    Please specify wether you exercise daily with yes or no

    You entered: ${dailyExercise}

    (Don't worry, we won't judge you if you enter no)
  `);

  process.exit();
}
//The formula for BMI is weight (kg)/ height (m) x height (m)
const BMI = weightInKg / (heightInM * heightInM)

//Ideal BMI is 22.5
//The formula for idealWeight is 22.5 x height (m) x height (m)
const idealWeightInKg = 22.5 * heightInM * heightInM;

//Convert height in meter to centimeter
const heightInCm = heightInM * 100;

// The formula for Basal Metabolic Rate (BMR) is: 10 x weight (kg) + 6.25 x height (cm) - 5 x age
// const BMR = 10 * weightInKg + 6.25  * heightInCm - 5 * age;

var BMR;
 if(gender === "m" )
 {
    BMR = 10 * weightInKg + 6.25  * heightInCm - 5 * age + 50;
 } else{

    BMR = 10 * weightInKg + 6.25  * heightInCm - 5 * age - 150;
 }

// Calories for a normal lifestyle is BMR * 1.4
// const dailyCalories = BMR * 1.4;
//using ternary operator to set BMI
const dailyCalories = dailyExercise === "Yes" ? BMR * 1.6 : BMR * 1.4;


// Formula to lose weight who weigh too much weight 
const weightToLoseKg =  weightInKg - idealWeightInKg;  

//The time(weeks) it will take to reach ideal weight
// Using Math.abs to make dietWeeks a positive number
const dietWeeks = Math.abs(weightToLoseKg / 0.5);

//The amount of calories you need to consume while dieting
var dietCalories;
if(weightToLoseKg > 0){
    dietCalories = dailyCalories - 500;
}else{ 
    dietCalories = dailyCalories + 500;
}

    console.log(`
    **************
    BMI Calculator
    **************
    
    age: ${age} years
    height: ${heightInM} m
    weigh: ${weightInKg} kg
    do you excericise daily?: ${dailyExercise}
    gender : ${gender}
    
    
    ****************
    FACING THE FACTS
    ****************
    
    Your BMI is ${Math.round(BMI)}
    
    
    A BMI under 18.5 is considered underweight
    A BMI above 25 is considered overweight
    
    Your ideal weight is ${Math.round(idealWeightInKg)}KG
    
    With a normal lifestyle you burn ${Math.round(dailyCalories)} calaries a day
    
    
    **********
    DIET PLAN
    **********
    
    If you want to reach your ideal weight of ${Math.round(idealWeightInKg)}KG
    
    Eat ${Math.round(dietCalories)} calaries a day
    
    For ${Math.round(dietWeeks)} weeks
    `);
    
