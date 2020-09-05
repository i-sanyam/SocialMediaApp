## TABLES in DB

### tb_posts
```sql
CREATE TABLE `socialdb`.`tb_posts` ( `post_id` INT NOT NULL AUTO_INCREMENT , `author_id` INT NOT NULL , `text` TEXT NOT NULL , `no_likes` INT NOT NULL DEFAULT '0' , `no_comments` INT NOT NULL DEFAULT '0' , `is_deleted` BOOLEAN NOT NULL DEFAULT FALSE , `creation_datetime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `updated_datetime` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`post_id`), INDEX (`creation_datetime`), INDEX (`author_id`)) ENGINE = InnoDB;
```

### tb_comments
```sql
CREATE TABLE `socialdb`.`tb_comments` ( `comment_id` INT NOT NULL AUTO_INCREMENT , `post_id` INT NOT NULL , `author_id` INT NOT NULL , `text` TEXT NOT NULL , `no_likes` INT NOT NULL DEFAULT '0' , `is_deleted` BOOLEAN NOT NULL DEFAULT FALSE , `creation_datetime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `updated_datetime` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`comment_id`), INDEX (`post_id`), INDEX (`creation_datetime`)) ENGINE = InnoDB;
```

### tb_follow_relationship
```sql
CREATE TABLE `socialdb`.`tb_follow_relationship` ( `relation_id` INT NOT NULL AUTO_INCREMENT , `user_id` INT NOT NULL , `followed_id` INT NOT NULL , `is_followed` BOOLEAN NOT NULL DEFAULT TRUE , `creation_datetime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `updated_datetime` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`relation_id`), INDEX (`creation_datetime`), INDEX (`user_id`), INDEX (`followed_id`)) ENGINE = InnoDB;
```

### tb_users
```sql
CREATE TABLE `socialdb`.`tb_users` ( `user_id` INT NOT NULL AUTO_INCREMENT , `first_name` VARCHAR(50) NOT NULL , `last_name` VARCHAR(50) NULL DEFAULT NULL , `password` TINYTEXT NOT NULL , `username` VARCHAR(40) NOT NULL , `phone` VARCHAR(10) NULL DEFAULT NULL , `email` TINYTEXT NULL DEFAULT NULL , `is_active` BOOLEAN NOT NULL DEFAULT TRUE , `creation_datetime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `updated_datetime` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`user_id`), UNIQUE (`username`)) ENGINE = InnoDB;
```