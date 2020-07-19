-------------------Deletar DATABASES--------------
DROP DATABASE nome_da_tabela;

DROP TABLE users;

-------------------Criar DATABASES----------------
CREATE DATABASE lojaOnline;

-------------------Selecionar DATABASES-----------
USE lojaOnline;

-------------------Criar TABELA USERS-------------
CREATE TABLE users(
    userId INT NOT NULL AUTO_INCREMENT,
    nameUser char(20) NOT NULL,
    cpfUser INT NOT NULL,
    phoneUser INT NOT NULL,
    emailUser char(20) NOT NULL,
    passwordUser char(20) NOT NULL,    
    PRIMARY KEY (userId)
);

-------------------Mostrar TABELAS----------------
SHOW TABLES;

-------------------Select TABELAS-----------------
SELECT * FROM users;

-------------------Iserir na TABELA usuarios admin-
INSERT INTO users(userName, userPassword, userPokemon)
VALUES ('kakinha', '12345', 3);

---------------------Alterar a tabela ---------------
ALTER TABLE users
MODIFY COLUMN userPassword char(20) NOT NULL;