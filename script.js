// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

function getLearnerData(course, ag, submissions) {
    scoreArr = [];
    let totScore = [];
    let ptPoss = [];
    let totPtPoss = [];
    let today = new Date();
    let eachAvg = 0;
    let totalScore = 0;
    let totalPossScore = 0;
    let avgWgt = 0;
    let result = [];
    let finalObj = {};

    try {
        // console.log("submission is",submissions);
        // If course id doesnt match assignment group course id
        if (course.id != ag.course_id) {
            throw new Error('Invalid input: Assignment Group does not belong to its course.Course ids should match.');
        }
        //if course ids are not a number
        if (typeof course.id != 'number' && typeof ag.course_id != 'number') {
            throw new Error('Invalid input: Course Id must be a number.');
        }
        // Calling a function that returns unique and valid learner ids 
        learnerArr = [];
        // learnerArr = getUniqueLearnerId(submissions);

        for (let i = 0; i < submissions.length; i++) {
            // console.log("Learner id is",submissions[i].learner_id);
            // Adding all learner ids in an array
            learnerArr[i] = submissions[i].learner_id;

            // Checking if learner id is a number
            if (typeof learnerArr[i] != 'number') {
                throw new Error('Invalid input: Learner Id should be a number');
            }
        }


        // // getting unique learner ids
        learnerArr = [...new Set(learnerArr)];
        // console.log(learnerArr);
        today = today.toISOString().split('T')[0];
        //for each learner
        for (let i = 0; i < learnerArr.length; i++) {
            // console.log(`learner id is ${learnerArr[i]}`);
            finalObj.id = learnerArr[i];
            // console.log("final obj is", finalObj);
            // iterate over each element in the array 'assignments' in object 'ag'
            ag.assignments.forEach((asgmnt, k) => {

                // iterate over each element in the array submissions to get learner details

                submissions.forEach((learner, j) => {
                    // match assignment ids- if id of assignment is same as assignment id of learner>>grab points possible & score 
                    // for assignment 1 and learner 125 get 50 and 47
                    //For assignment 2 and learner 125 get 150 and 150

                    // Check if assignment ids are number
                    if (typeof asgmnt.id != 'number' && typeof learner.learner_id != "number") {
                        throw new Error('Invalid input: Assignment Id should be a number');
                    }
                    if (asgmnt.id == learner.assignment_id && learnerArr[i] == learner.learner_id) {
                        // points possible cant be zero and has to be a number and learner scores have to be number too
                        if (asgmnt.points_possible <= 0 | typeof asgmnt.points_possible != 'number') {
                            throw new Error('Invalid input: Total points must be a number greater than zero.');

                        }
                        if ( typeof learner.submission.score != 'number'){
                            throw new Error('Invalid input: Score must be a number.');
                        }
                        // ptPoss[j] = asgmnt.points_possible;
                        // scoreArr[j] = learner.submission.score;

                        //due date has to be valid date without time format-----------------------------
                        // if valid date is entered then !NaN (valid date) returns true
                        // for invalid date-get time returns NaN
                        //     if(isNaN(new Date(asgmnt.due_at).getTime())==true)
                        //     {
                        //         throw new Error('Invalid input: Enter due date in YYYY/MM/DD or MM/DD/YYYY format');
                        //     }
                        // //submitted date has to be valid date without time format-------------------------
                        // // for invalid date-get time returns NaN
                        // if (isNaN(new Date(learner.submission.submitted_at).getTime()) == true) {
                        //     throw new Error('Invalid input: Enter submitted date in YYYY/MM/DD or MM/DD/YYYY format');
                        // }
                        ptPoss[j] = asgmnt.points_possible;
                        scoreArr[j] = learner.submission.score;

                        //Check if assignment is due in future, then exclude it in else statement
                        if (asgmnt.due_at < today) {
                            // if submitted late substract 10% but include it
                            if (asgmnt.due_at < learner.submission.submitted_at) {
                                //substract 10% from max possible points
                                scoreArr[j] = scoreArr[j] - (.1 * ptPoss[j]);

                            }

                            //Find that assignment's avg weight    
                            eachAvg = (scoreArr[j] / ptPoss[j]).toFixed(2);
                            finalObj[learner.assignment_id] = eachAvg;
                            //  console.log("final obj is", finalObj);

                            // console.log("Each avg is",eachAvg);                   
                            totalScore += scoreArr[j];
                            totalPossScore += ptPoss[j];
                            // console.log("total score so far", totalScore);
                            // console.log("Total possible points so far", totalPossScore);
                            // console.log(`score array for learner so far ${learnerArr[i]}is:${totScore}`)
                            // console.log(`Points possible array for learner so far ${learnerArr[i]}is:${totPtPoss}`)                    
                        }
                    }

                });
                // console.log("total score so far", totalScore);
                // console.log("Total possible points so far", totalPossScore);
                avgWgt = (totalScore / totalPossScore).toFixed(2);
                // console.log("Total Avg weight is", avgWgt);           
                finalObj.avg = avgWgt;
                //console.log("final obj is", finalObj);

            })

            totScore = [];
            totAsgmt = [];
            totPtPoss = [];
            avgWgt = 0;
            totalScore = 0;
            totalPossScore = 0;
            //created a shallow copy of my object
            // Without this my result array was being over written by second object data.
            // result.concat() copies the array 
            result.push({ ...finalObj });
        }//end of 1st learner
        return result;
    }
    catch (error) {
        console.error('Error caught:', error.message);
    }
}
let result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
// if any error occurs in the function it will return results array as undefined after logging the error in catch block.
// Skip logging result array if undefined 
if (result) {
    console.log(result);
}

// This function will return unique learner ids
// function getUniqueLearnerId(submissions){
//     for (let i = 0; i < submissions.length; i++) {
//         // console.log("Learner id is",submissions[i].learner_id);
//         // Adding all learner ids in an array
//         learnerArr[i] = submissions[i].learner_id;

//         // Checking if learner id is a number
//         if (typeof learnerArr[i] != 'number') {
//             throw new Error('Invalid input: Learner Id should be a number');
//         }
//     }
//     // getting unique learner ids
//     learnerArr = [...new Set(learnerArr)];
//     return(learnerArr);
// }