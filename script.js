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

    // console.log(`Course Info`, CourseInfo);
    // console.log(`Assignment Group(ag)`, AssignmentGroup);
    // console.log(`Submissions`, submissions);

    return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
// console.log(result);

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

console.log(assignmentsArr)

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

    for(let asn of assignmentsArr){
        if (asn.due_at > today) {
            continue;
        }
        validAssignment.push(asn.id)
    }

    return validAssignment

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


// console.log(validSubmissionsForLearner(learnerSubs, assignments));


/// Function to find assignment by its ID

function findAssignmentById(assignmentArr, assignments_id){
    for(let assignment of assignmentArr){
        if(assignment.id == assignments_id){
            return assignment
        }
    }
}

// console.log(findAssignmentById(assignmentsArr, 1))