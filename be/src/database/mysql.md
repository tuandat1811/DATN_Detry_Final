CREATE TABLE users
(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
	  email varchar(255) NOT NULL,
		username varchar(255) NOT NULL,
		password varchar(255) NOT NULL,
		phone VARCHAR(255) DEFAULT null,
		avatar TEXT DEFAULT null,
		type VARCHAR(255) NOT NULL, 
		status VARCHAR(255) NOT NULL,
		company_id INTEGER,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`) USING BTREE
);

CREATE TABLE company
(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
	  email varchar(255) NOT NULL,
		phone VARCHAR(255),
		avatar TEXT DEFAULT null,
		logo TEXT DEFAULT null,
		status VARCHAR(255) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`) USING BTREE
);

CREATE TABLE topics
(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
	  user_id INT DEFAULT 0,
		company_id INT DEFAULT 0,
		avatar TEXT DEFAULT null,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`) USING BTREE
);


CREATE TABLE questions
(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
	  user_id INT DEFAULT 0,
		topic_id INT DEFAULT 0,
		content_question text,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`) USING BTREE
);


CREATE TABLE answers
(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	  user_id INT DEFAULT 0,
		question_id INT DEFAULT 0,
		content_answer text,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`) USING BTREE
);

CREATE TABLE results
(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	  user_id INT DEFAULT 0,
		question_id INT DEFAULT 0,
		answer_id INT DEFAULT 0,
		point INT DEFAULT 0,
		time TIMESTAMP, 
		content_result text,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`) USING BTREE
);