CREATE TABLE newsletter_users (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    email TEXT NOT NULL,
    password TEXT,
    date_created TIMESTAMP NOT NULL DEFAULT now()
);

ALTER TABLE newsletterurls
    ADD COLUMN
        author INTEGER REFERENCES newsletter_users(id)
        ON DELETE SET NULL;

ALTER TABLE newsletterurls 
RENAME COLUMN author TO user_ref_id;