use crate::StructSchema::{Answer, Question, Quiz};
use serde::{Deserialize, Serialize};

use rsqlite::*;

use rocket_contrib::json::Json;

fn get_last_inserted_row(table: &str) -> i64 {
    let conn = Database::open("quizzes.db").unwrap();

    let last_inserted_row: i32 = conn
        .collect("SELECT seq FROM sqlite_sequence WHERE name='?';", (table))
        .unwrap();

    last_inserted_row as i64
}

pub fn fill_in_the_Answers(answers: &Vec<Answer>, conn: &rsqlite::Database) -> i64 {
    let last: i32 = conn
        .collect("SELECT seq FROM sqlite_sequence WHERE name='Answer';", ())
        .unwrap();
    let last_inserted_Answer: i64 = last as i64;

    for i in answers.iter() {
        let isRight: i64 = {
            if i.isRight == false {
                0
            } else {
                1
            }
        };

        conn.execute(
            "INSERT INTO Answer(isRight, Answer, ID) VALUES(?, ?, ?)",
            (isRight, i.answer.as_str(), last_inserted_Answer),
        );

        println!("{}", i.answer);
    }
    last_inserted_Answer
}

pub fn fill_in_the_Questions(questions: &Vec<Question>) -> i64 {
    let mut AnswerID: i64 = 0;
    let conn = Database::open("quizzes.db").unwrap();

    let last: i32 = conn
        .collect(
            "SELECT seq FROM sqlite_sequence WHERE name='Questions';",
            (),
        )
        .unwrap();

    let last_inserted_Question: i64 = last as i64;

    for q in questions.iter() {
        AnswerID = fill_in_the_Answers(&q.answers, &conn);
        let question: &str = &q.question;
        conn.execute(
            "INSERT INTO Questions(Question, AnswersID, ID) VALUES(?, ?, ?);",
            (question, AnswerID, last_inserted_Question),
        );
    }
    last_inserted_Question
}

pub fn check_if_duplicate(name: &str) -> std::option::Option<std::string::String> {
    let conn = Database::open("quizzes.db").unwrap();
    conn.collect(
        /* the format
        function is used instead of the params argument
        in .collect() because .collect() dont work with
        params*/
        &format!("SELECT Name FROM Quizzes WHERE Name='{}'", name),
        (),
    )
    .unwrap()
}

pub fn fill_in_the_Quiz(quiz: Json<Quiz>) {
    let conn = Database::open("quizzes.db").unwrap();

    let QuestionsID: i64 = fill_in_the_Questions(&quiz.questions);
    let Name: &str = &quiz.Name;
    conn.execute(
        "INSERT INTO Quizzes(Name, ResultsID, QuestionsID) VALUES(?, ?, ?)",
        (Name, QuestionsID, QuestionsID),
    );
}

pub fn select_rows<T: rsqlite::Collectable, A: std::fmt::Display>(
    field: &str,
    table: &str,
    indicator: Option<A>,
    searchcolumn: Option<&str>,
    conn: &rsqlite::Database
) -> Vec<T> {
    let mut new_vec = Vec::new();
    match indicator {
        Some(x) => conn.for_each(
            &format!("SELECT {} FROM {} WHERE {}='{}'", field, table, searchcolumn.unwrap(), x),
            (),
            |result: T| { 
                println!("Hello");
                new_vec.push(result);
            }
        ),
        None => conn.for_each(
            &format!("SELECT {} FROM {}", field, table),
            (),
            |result: T| {
                new_vec.push(result);
            }
        ) 
    };
    new_vec
}
pub fn select<T: rsqlite::Collectable, A: std::fmt::Display>(
    field: &str,
    table: &str,
    indicator: Option<A>,
    searchcolumn: Option<&str>,
    conn: &rsqlite::Database
) -> T {
    match indicator { 
        Some(x) => {
            
            conn.collect(
            &format!("SELECT {} FROM {} WHERE {}='{}'", field, table, searchcolumn.unwrap(), x),
            ()
        ).unwrap()},
        None => {conn.collect(
            &format!("SELECT {} FROM {}", field, table),
            ()
            
        ).unwrap()}
    }
}

pub fn get_quiz_from_db(name: String) ->  Quiz {
    let conn = Database::open("quizzes.db").unwrap();
    let mut newQuiz: Quiz = Quiz {
        Name: name.clone(),
        results: Vec::new(),
        questions: Vec::<Question>::new()

    };
    let quizID: i32 = select("QuestionsID", "Quizzes", Some(name), Some("Name"), &conn);
    let questionIDs: Vec<(String, i32)> = select_rows("Question, AnswersID", "Questions", Some(quizID), Some("ID"), &conn);
    println!("{}", questionIDs.len());

    for (name, id) in questionIDs.iter() {
        println!("name: {} id: {}", name, id);
        let answerIDs: Vec<(String, i32)> = select_rows("Answer, isRight", "Answer", Some(id), Some("ID"), &conn);
        let mut Answers = Vec::new();
        for (name, isRight) in answerIDs.iter() {
            let bool: bool = {
                if isRight == &1 { 
                    true
                } else {
                    false
                }
            }; 
            Answers.push( 
                Answer {
                    answer: name.to_string(),
                    isRight: bool
                }
            )
        }  
        newQuiz.questions.push(
            Question {
                question: name.to_string(),
                answers: Answers
            })
    }


    newQuiz
}