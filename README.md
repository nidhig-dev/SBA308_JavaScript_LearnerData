## About The Project

Create a script that gathers data, processes it, and then outputs a consistent result as described by a specification. 

## Input-
 * Provided with four different types of data:
```
A CourseInfo object:

{
  "id": number,
  "name": string,
}

An AssignmentGroup object:
{
  "id": number,
  "name": string,
  // the ID of the course the assignment group belongs to
  "course_id": number,
  // the percentage weight of the entire assignment group
  "group_weight": number,
  "assignments": [AssignmentInfo],
}

Each AssignmentInfo object within the assignments array:
{
  "id": number,
  "name": string,
  // the due date for the assignment
  "due_at": Date string,
  // the maximum points possible for the assignment
  "points_possible": number,
}

An array of LearnerSubmission objects:
{
    "learner_id": number,
    "assignment_id": number,
    "submission": {
      "submitted_at": Date string,
      "score": number
    }
}
```
#### Output-
An array with a collection of objects containing:

``` {
    // the ID of the learner 

    "id": number,

    // the learner’s total, weighted average, in which assignments with more points_possible should be counted for more 
    e.g. a learner with 50/100 on one assignment and 190/200 on another
    would have a weighted average score of 240/300 = 80%.
    
    "avg": number,

    // each assignment should have a key with its ID, and the value associated with it should be the percentage that the learner scored on the assignment (submission.score / points_possible)
    '1': number,
    '2': number,

    <assignment_id>: number,
   
}
```

``` 
const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0 // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833 // late: (140 - 15) / 150
    }
  ];
  ```

## Validation Checks

- If an AssignmentGroup does not belong to its course (mismatching course_id), 

- What if points_possible is 0? You cannot divide by zero. 

- What if a value that you are expecting to be a number is instead a string? 

- Check for date format.

- If an assignment is not yet due, do not include it in the results or the average. 

- If the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.

## Requirements


- ✅Declare variables properly using let and const where appropriate.	5%
- ✅Use operators to perform calculations on variables and literals.	5%
- Use strings, numbers, and Boolean values cached within variables.	5%
- ✅Use at least two if/else statements to control program flow. Optionally, use at least one switch statement.	10%
- ✅Use try/catch statements to manage potential errors in the code, such as incorrectly formatted or typed data being fed into your program.	5%
- ✅Utilize at least two different types of loops.	5%
- ✅Utilize at least one loop control keyword such as break or continue.	3%
- ✅Create and/or manipulate arrays and objects.	10%
- ✅Demonstrate the retrieval, manipulation, and removal of items in an array or properties in an object.	5%
- ✅Use functions to handle repeated tasks.	10%
- ✅Program outputs processed data as described above. Partial credit will be earned depending on the level of adherence to the described behavior.	20%
- ✅Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).	10%
- ✅Commit frequently to the git repository.	5%
- ✅Include a README file that contains a description of your application.	2%

## Reflection

#### 1. What could you have done differently during the planning stages of your project to make the execution easier?

  * I could have created different functions first that were doing their designated task individually and then connected them all in the main function for better modulariztion.

#### 2. What would you add to, or change about your application if given more time?
  * I would like to modularize it better. If I had more time, I would re-structure my code better.


