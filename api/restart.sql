DELETE FROM Answer;
DELETE FROM Questions;
DELETE FROM Quizzes;
DELETE FROM sqlite_sequence;

INSERT INTO sqlite_sequence (name, seq)
VALUES ("Questions", 0), ("Answer", 0); 