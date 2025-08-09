// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 452,
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
        learner_id: 125, // line uip with assignment 2
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
    const result = [];

    let today = "2025-08-07"

    // console.log(`Course Info`, CourseInfo);
    // console.log(`Assignment Group(ag)`, AssignmentGroup);
    // console.log(`Submissions`, submissions);

    return result;
}



const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

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
courseMatch(CourseInfo, AssignmentGroup);

// Function to grab and seperate learner info

function learnerList(LearnerSubmissions) {
    let learnerArray = []
    for (let id of LearnerSubmissions) {
        learnerArray.push(id.learner_id)
    }

    return [...new Set(learnerArray)];

}

let learners = learnerList(LearnerSubmissions);
console.log(learners)
// Function that creates an array for the assignments

function assignmentList(AssignmentGroup) {
    return AssignmentGroup.assignments
}

const assignmentsArray = assignmentList(AssignmentGroup)

console.log(assignmentsArray)
///guide me step by step on how to grab unique keys from several objects nested in an array and add them to and empty array