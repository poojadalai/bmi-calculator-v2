
function calculateBMI(weightInKg, heightInM){
    return weightInKg / (heightInM * heightInM);

}

function calculateBMR(weight, height, ageOfUser, genderOfUser){
    const heightInCm = height * 100;

    let BMR;
    if(genderOfUser === "m")
    {
        BMR = 10 * weight + 6.25  * heightInCm - 5 * ageOfUser + 50;
    } else{

        BMR = 10 * weight + 6.25  * heightInCm - 5 * ageOfUser - 150;
    }
    return BMR;
}


function calculateIdealWeight(height){
    return 22.5 * height * height;
}

function calculateDailyCalories(basalMetabolicRate, basalMetabolicExercise){
    return basalMetabolicExercise === "yes" ? basalMetabolicRate * 1.6 : basalMetabolicRate * 1.4;
}

function calculateDietWeeks(weightToLose){
    return Math.abs(weightToLose / 0.5);
}

function calculateDietCalories(weightToLose, caloriesUsedDaily) {
    return weightToLose > 0 ? caloriesUsedDaily - 500 : caloriesUsedDaily + 500;
}

function validateNumberOfInputs(argv){
    if (argv.length !== 7) {
        console.log(`
          You gave ${argv.length - 2} arguments(s) to the program
      
          Please provide 5 arguments for
          
          weight (kg), 
          height (m), 
          age (years), 
          wether you exercise daily (yes or no)
          and your gender (m or f)
          
          Example:
      
          $ node index.js 82 1.79 32 yes m
        `);
    
        process.exit();
      }
    }

function validateWeightHeightAndAge(weight, height, ageOfUser, argv){

    if(isNaN(weight) || isNaN(height) || isNaN(ageOfUser) || weight == 0 || height == 0 || ageOfUser == 0){
        console.log(`Please make sure weight, height and age are numbers and should not be zero:

        weight (kg) example: 82 | your input: ${argv[2]}
        height (m) example 1.79 | your input: ${argv[3]}
        age (years) example 32  | your input: ${argv[4]} 

        $ node index.js 82 1.79 32 yes m
    `);

      process.exit();    
    }

    if(ageOfUser < 20){
        console.log(`
        This BMI calculator was designed to be used by people older than 20
    
        BMI is calculated differently for young people.
    
        Please visit: https://en.wikipedia.org/wiki/Body_mass_index#Children_(aged_2_to_20)
    
        For more information
      `);
    
      process.exit();
    }

    if(weight < 30 || weight > 300)
    {
        console.log(`Please enter a weight in kgs
    
        Your weight of ${weight} kgs does not fall in the range between 30 kg and 300 kg
    
        If you weight is below 30 kg or over 300 kg seek professional medical help
      `);
    
      process.exit();
    }
}

function validateDailyExercise(doesUserExercise){
    if(doesUserExercise !== "yes" && doesUserExercise !=="no"){
        console.log(`
        Please specify wether you exercise daily with yes or no

        You entered: ${dailyExercise}
    
        (Don't worry, we won't judge you if you enter no) `);
    }
}

function validateGender(userGender){
    if(userGender === "f" && doesUserExercise ==="m"){
        console.log(`
        Please specify wether you are a male 'm' or female 'f'

        You entered: ${dailyExercise}
    
        (Don't worry, we won't judge you if you enter no) `);
    }
}


function formatOutput(userObject){

    console.log(`
    **************
    BMI Calculator
    **************
    
    age: ${userObject.age} years
    height: ${userObject.heightInM} m
    weigh: ${userObject.weightInKg} kg
    do you excericise daily?: ${userObject.dailyExercise}
    gender : ${userObject.gender}
    
    
    ****************
    FACING THE FACTS
    ****************
    
    Your BMI is ${Math.round(userObject.BMI)}
    
    
    A BMI under 18.5 is considered underweight
    A BMI above 25 is considered overweight
    
    Your ideal weight is ${Math.round(userObject.idealWeightInKg)}KG
    
    With a normal lifestyle you burn ${Math.round(userObject.dailyCalories)} calaries a day
    
    
    **********
    DIET PLAN
    **********
    
    If you want to reach your ideal weight of ${Math.round(userObject.idealWeightInKg)}KG
    
    Eat ${Math.round(userObject.dietCalories)} calaries a day
    
    For ${Math.round(userObject.dietWeeks)} weeks
    `);
    
}


function bmiCalcultor(){

    validateNumberOfInputs(process.argv);
    const weightInKg = parseInt(process.argv[2]);
    const heightInM = parseFloat(process.argv[3]);
    const age = parseInt(process.argv[4]);
    const dailyExercise = process.argv[5];
    const gender = process.argv[6];

    validateWeightHeightAndAge(weightInKg, heightInM, age, process.argv);
    validateDailyExercise(dailyExercise);
    validateGender(gender);


    const BMI = calculateBMI(weightInKg, heightInM)
    const BMR = calculateBMR(weightInKg, heightInM, age, gender)
    const idealWeightInKg = calculateIdealWeight(heightInM);
    const dailyCalories = calculateDailyCalories(BMR, dailyExercise)
    const weightToLoseKg =  weightInKg - idealWeightInKg; 
    const dietWeeks = calculateDietWeeks(weightToLoseKg);
    const dietCalories = calculateDietCalories(weightToLoseKg, dailyCalories);

    const user = {
        weightInKg: weightInKg,
        heightInM : heightInM,
        age : age,
        dailyExercise : dailyExercise,
        BMI : BMI,
        gender : gender,
        idealWeightInKg : idealWeightInKg,
        dailyCalories: dailyCalories,
        dietWeeks : dietWeeks,
        dietCalories : dietCalories,
        weightToLoseKg :weightToLoseKg,
    }

    const output = formatOutput(user);

    console.log(output);
}


bmiCalcultor()