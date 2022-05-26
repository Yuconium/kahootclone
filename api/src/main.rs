#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
use rocket::*;
use rocket_contrib::json::Json;
use serde::{Deserialize, Serialize};

pub mod StructSchema;
pub mod db;

use db::{check_if_duplicate, fill_in_the_Answers, fill_in_the_Quiz, get_quiz_from_db};
use StructSchema::Quiz;

use rocket::http::Method; // 1.

use rocket_cors::{
    AllowedHeaders,
    AllowedOrigins,
    Cors,
    CorsOptions, // 3.
    Error,       // 2.
};

fn make_cors() -> Cors {
    let allowed_origins = AllowedOrigins::some_exact(&[
        // 4.
        "http://localhost:3000/",
        "http://127.0.0.1:8080",
        "http://localhost:8000",
        "http://0.0.0.0:8000",
    ]);

    CorsOptions {
        // 5.
        allowed_origins,
        allowed_methods: vec![Method::Get, Method::Post]
            .into_iter()
            .map(From::from)
            .collect(), // 1.
        allowed_headers: AllowedHeaders::all(),
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors()
    .expect("error while building CORS")
}

#[derive(Serialize, Deserialize)]
pub struct Response {
    status: String,
    message: String,
}
impl Response {
    fn ok(msg: &str) -> Self {
        Response {
            status: "Success".to_string(),
            message: msg.to_string(),
        }
    }
    fn err(msg: &str) -> Self {
        Response {
            status: "Error".to_string(),
            message: msg.to_string(),
        }
    }
}

#[post("/postQuiz", format = "application/json", data = "<Quiz>", rank = 3)]
fn postQuiz(Quiz: Json<Quiz>) {
    fill_in_the_Quiz(Quiz);
} 
 

#[get("/quiz/<Name>", rank=1)]
fn getQuiz(Name: String) -> Json<Quiz> {
    
    Json(get_quiz_from_db(Name))    

}




#[get("/echo/<Name>", rank = 2)]
fn checkDuplicate(Name: String) -> Json<Response> {
    Json(Response::ok(match check_if_duplicate(Name.as_str()) {
        Some(x) => "true",
        None => "false",
    }))
}

fn main() {
    rocket::ignite()
        .mount("/", routes![checkDuplicate, postQuiz, getQuiz])
        .attach(make_cors())
        .launch();
}
