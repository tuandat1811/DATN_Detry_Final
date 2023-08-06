CREATE TABLE users
(
    id SERIAL,
    name varchar(255) NOT NULL,
	  email varchar(255) NOT NULL,
		username VARCHAR(255) NOT null,
		password VARCHAR(255) NOT NULL,
		phone VARCHAR(255) DEFAULT null,
		avatar TEXT DEFAULT null,
		type VARCHAR(255) NOT NULL, 
		status VARCHAR(255) NOT NULL,
		company_id INTEGER DEFAULT 0,
    created_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    updated_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id)
);
ALTER TABLE users ADD CONSTRAINT users_unique UNIQUE (id, email, username, phone);

CREATE TABLE company
(
    id SERIAL,
    name varchar(255) NOT NULL,
	  email varchar(255) NOT NULL,
		phone VARCHAR(255) DEFAULT null,
		avatar TEXT DEFAULT null,
	  logo TEXT DEFAULT null,
		status VARCHAR(255) NOT NULL,
    created_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    updated_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    CONSTRAINT classes_pkey PRIMARY KEY (id)
);
ALTER TABLE company ADD CONSTRAINT company_unique UNIQUE (id, email, phone);


CREATE TABLE topics
(
    id SERIAL,
    name varchar(255) NOT NULL,
	  avatar TEXT NULL,
		user_id integer DEFAULT 0,
		company_id integer DEFAULT 0,
    created_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    updated_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    CONSTRAINT topics_pkey PRIMARY KEY (id)
);
ALTER TABLE topics ADD CONSTRAINT topics_unique UNIQUE (id);


CREATE TABLE questions
(
    id SERIAL,
    name varchar(255) NOT NULL,
	  content_question TEXT NULL,
		user_id integer DEFAULT 0,
		topic_id integer DEFAULT 0,
    created_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    updated_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    CONSTRAINT questions_pkey PRIMARY KEY (id)
);
ALTER TABLE questions ADD CONSTRAINT questions_unique UNIQUE (id);

CREATE TABLE answers
(
    id SERIAL,
	  content_answer TEXT NULL,
		user_id integer DEFAULT 0,
		question_id integer DEFAULT 0,
    created_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    updated_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    CONSTRAINT answers_pkey PRIMARY KEY (id)
);
ALTER TABLE answers ADD CONSTRAINT answers_unique UNIQUE (id);

CREATE TABLE results
(
    id SERIAL,
    name varchar(255) NOT NULL,
	  content_result TEXT NULL,
		user_id integer DEFAULT 0,
		question_id integer DEFAULT 0,
		answer_id integer DEFAULT 0,
		point integer DEFAULT 0,
    created_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    updated_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    CONSTRAINT results_pkey PRIMARY KEY (id)
);
ALTER TABLE results ADD CONSTRAINT results_unique UNIQUE (id);
