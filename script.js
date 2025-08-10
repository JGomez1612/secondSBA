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
        learner_id: 125, // line up with assignment 1
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125, // line up with assignment 2
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125, // line up with assignment 3
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25", // early submit
            score: 400
        }
    },
    {
        learner_id: 132, // line up with assignment 1
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132, // line up with assignment 2
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07", // late
            score: 140
        }
    }

];

function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
    const result = []

    // Get all learner IDs
    const learners = learnerList(submissions);

    // Get valid assignments for this assignment group
    const validAssigns = validAssignments(ag.assignments);

    for (let learnerID of learners){
        // Submissions for learners
        const learnerSubs = getSubmissionByLearner(learnerID, submissions);

        // Filter valid submissions for learner
        const validSubs = validSubmissionsForLearner(learnerSubs, validAssigns);

        // Get score object
        const learnerGrade = learnerScoreObj(learnerID, validSubs, ag.assignments);

        // Push to result
        result.push(learnerGrade)
    }

    return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);

// Helper Functions --------------------------------------------------------------------

// Function to check & match CourseInfo ID to AssignmentGroup course ID

function courseMatch(CourseInfo, AssignmentGroup) {
    try {
        if (CourseInfo.id === AssignmentGroup.course_id) {
            console.log('The IDs match!')
        } else {
            throw "Error - The IDs are off! Try again PAL!"
        }
    } catch (error) {
        console.log(error)
    }
}
// courseMatch(CourseInfo, AssignmentGroup);

// Function that creates an array for the assignments

function assignmentsArray(AssignmentGroup) {
    return AssignmentGroup.assignments
}

const assignmentsArr = assignmentsArray(AssignmentGroup)

// console.log(assignmentsArr)

// Function to grab and seperate learner info

function learnerList(LearnerSubmissions) {
    let learnerArray = []
    for (let id of LearnerSubmissions) {
        learnerArray.push(id.learner_id)
    }

    return [...new Set(learnerArray)];

}

let learners = learnerList(LearnerSubmissions);
// console.log(learners)

// Function that grabs submissions by learnerID

function getSubmissionByLearner(learnerID, submissions) {
    const learnerSubs = [];

    for (let i = 0; i < submissions.length; i++) {
        const submission = submissions[i];
        if (submission.learner_id === learnerID) {
            learnerSubs.push(submission);
        }
    }

    return learnerSubs

}

// console.log(getSubmissionByLearner(125, LearnerSubmissions));

// Function that checks and validates the due dates of the assignments

function validAssignments(assignmentsArr) {
    const today = "2025-08-08";
    let validAssignment = [];

    for(let assignment of assignmentsArr){
        if (assignment.due_at > today) {
            continue;
        }
        validAssignment.push(assignment.id)
    }

    return validAssignment

}

// Function to check if assignment is late

function isLate(submitted_at, due_at) {
    return submitted_at > due_at;
}

let assignments = validAssignments(AssignmentGroup.assignments)
// console.log(assignments);

// Function that filters submissions to return assignment_ids that are in valid assignments

function validSubmissionsForLearner(learnerSubs,validAssignments){
    let validSubs = []

    learnerSubs.forEach(sub => {
        if(validAssignments.indexOf(sub.assignment_id) !== -1){
            validSubs.push(sub)
        }
    });
    return validSubs
}

const learnerSubs = getSubmissionByLearner(125, LearnerSubmissions);
const validSubs = validSubmissionsForLearner(learnerSubs, assignments)

// console.log(validSubs);


/// Function to find assignment by its ID

function findAssignmentById(assignmentArr, assignments_id){
    for(let assignment of assignmentArr){
        if(assignment.id == assignments_id){
            return assignment
        }
    }
}

// console.log(findAssignmentById(assignmentsArr, 1))

// Function that averages the total score using the totalPossiblePoints

function averageTotalScore(validSubs, assignmentArr){
    let totalScore = 0;
    let totalPossiblePoints = 0;

    for(let i = 0; i < validSubs.length; i++){
        let matchingAssignment = findAssignmentById(assignmentArr, validSubs[i].assignment_id);
        totalPossiblePoints += matchingAssignment.points_possible;
        totalScore += validSubs[i].submission.score
    }

    return totalScore / totalPossiblePoints

}

// console.log(averageTotalScore(validSubs, AssignmentGroup.assignments));


function learnerScoreObj(learnerID, validSubs, assignmentArr){
    const learnerGradeObj = { id: learnerID };

    let totalScore = 0;
    let totalPoints = 0;

    const latePenalty = 15; // 10% penalty for late submissions

    for(let sub of validSubs) {
        let matchingAssignment = findAssignmentById(assignmentArr, sub.assignment_id);
        if (!matchingAssignment) continue;

        const submittedDate = sub.submission.submitted_at;
        const dueDate = matchingAssignment.due_at;

        let rawScore = sub.submission.score;
        let adjustedScore = rawScore;

        if(submittedDate > dueDate) {
            adjustedScore = rawScore - latePenalty;
        }

        totalPoints += matchingAssignment.points_possible
        totalScore += adjustedScore

        learnerGradeObj[sub.assignment_id] = adjustedScore / matchingAssignment.points_possible
    }

   learnerGradeObj.avg = totalScore / totalPoints
   return learnerGradeObj;

}

learnerGrade = learnerScoreObj(125, validSubs, AssignmentGroup.assignments)

// console.log(learnerGrade)