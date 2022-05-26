use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Quiz {
    pub Name: String,
    pub results: Vec<Result>,
    pub questions: Vec<Question>,
}

#[derive(Serialize, Deserialize)]
pub struct Result {
    pub name: String,
    pub count: u32,
}

#[derive(Serialize, Deserialize)]
pub struct Question {
    pub question: String,
    pub answers: Vec<Answer>,
}

#[derive(Serialize, Deserialize)]
pub struct Answer {
    pub answer: String,
    pub isRight: bool,
}
