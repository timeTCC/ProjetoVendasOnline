-------------------Deletar DATABASES--------------
DROP DATABASE lojaonline;

DROP TABLE usersTable;

-------------------Criar DATABASES----------------
CREATE DATABASE lojaOnline;

-------------------Selecionar DATABASES-----------
USE lojaOnline;

-------------------Criar TABELA USERS-------------
CREATE TABLE usersTable(
    userId INT AUTO_INCREMENT,
    nameUser char(255) NOT NULL,
    cpfUser char(14) NOT NULL,
    phoneUser char(14) NOT NULL,
    emailUser char(255) NOT NULL,
    passwordUser char(20) NOT NULL,
    profileUser char(20) NOT NULL,
    PRIMARY KEY (userId)
);

INSERT INTO usersTable(nameUser, cpfUser, phoneUser, emailUser, passwordUser, profileUser)
VALUES ('kakinha', '41846625889', '1198989898', 'kakinha@kakinha.com', 'kakinha123', 'client');

-------------------Criar TABELA ENDEREÇO-------------
CREATE TABLE addressTable(
    addressId INT AUTO_INCREMENT,
    zipCodeUser INT NOT NULL,
    addressUser char(255) NOT NULL,
    numberAddressUser INT NOT NULL,
    districtUser char(255) NOT NULL,
    cityUser char(50) NOT NULL,
    stateUser char(50) NOT NULL,
    userId INT NOT NULL,
    PRIMARY KEY (addressId),
    FOREIGN KEY (userId) REFERENCES usersTable(userId)
);

-------------------Criar TABELA ITENS DO SUBDEPARTAMENTO-----------
CREATE TABLE categoryTable(
    categoryId INT AUTO_INCREMENT,
    subdepartment char(50) NOT NULL,
    department char(50),    
    PRIMARY KEY (categoryId)
);

-------------------Criar TABELA PRODUTO-------------
CREATE TABLE productTable(
    productId INT AUTO_INCREMENT,
    nameProd char(100) NOT NULL,
    stockProd INT NOT NULL,
    priceProd FLOAT NOT NULL,
    -- imageProd LONGBLOB,
    imageProd LONGBLOB NOT NULL,
    previewProd BIGINT NOT NULL,
    categoryId INT,
    codgProd BIGINT NOT NULL,
    descriptionProd TEXT NOT NULL,   
    FOREIGN KEY (categoryId) REFERENCES categoryTable(categoryId),
    PRIMARY KEY (productId)
);

-------------------Criar TABELA PEDIDO-------------
CREATE TABLE requestTable(
    requestId INT AUTO_INCREMENT,
    userId INT NOT NULL,
    dateRealized INT NOT NULL,
    dateDelivery INT NOT NULL, 
    FOREIGN KEY (userId) REFERENCES usersTable(userId),
    PRIMARY KEY (requestId)
);


-------------------Criar TABELA ITENS DO PEDIDO-------------
CREATE TABLE itemsRequestTable(
    requestId INT NOT NULL,
    productId INT NOT NULL,
    amountProd INT NOT NULL,    
    FOREIGN KEY (requestId) REFERENCES requestTable(requestId),
    FOREIGN KEY (productId) REFERENCES productTable(productId)
);

-------------------Mostrar TABELAS----------------
SHOW TABLES;

-------------------Select TABELAS-----------------
SELECT * FROM categoryTable;

-------------------Iserir na TABELA usuarios admin-
INSERT INTO usersTable(subdepartment, department)
VALUES ('geladeiras', 'eletrodomesticos');

---------------------mostrar a estrutura da tabela---------------

DESCRIBE usersTable;

SELECT * FROM productTable;

SELECT * FROM usersTable;

---------------------Alterar a tabela modificando---------------
ALTER TABLE usersTable
MODIFY COLUMN passwordUser char(255) NOT NULL;

---------------------Alterar a tabela acrescentando colunas----------
ALTER TABLE productTable
ADD descriptionProd char(150) NOT NULL;

---------------------Alterar a tabela excluindo colunas----------
ALTER TABLE usersTable 
DROP COLUMN profileUser;


ALTER TABLE usersTable 
DROP CONSTRAINT profileUser;

ALTER TABLE usersTable DROP FOREIGN KEY profileUser;

ALTER TABLE usersTable DROP INDEX profileUser;

ALTER TABLE productTable drop primary key, add primary key(codgProd);

SET FOREIGN_KEY_CHECKS = 0;