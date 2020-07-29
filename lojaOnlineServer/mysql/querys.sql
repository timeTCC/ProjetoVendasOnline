-------------------Deletar DATABASES--------------
DROP DATABASE lojaonline;

DROP TABLE productTable;

-------------------Criar DATABASES----------------
CREATE DATABASE lojaOnline;

-------------------Selecionar DATABASES-----------
USE lojaOnline;

-------------------Criar TABELA USERS-------------
CREATE TABLE usersTable(
    userId INT AUTO_INCREMENT,
    nameUser char(100) NOT NULL,
    cpfUser char(14) NOT NULL,
    phoneUser char(14) NOT NULL,
    emailUser char(100) NOT NULL,
    passwordUser char(20) NOT NULL,
    profileUser char(20) NOT NULL,
    PRIMARY KEY (userId)
);

-------------------Criar TABELA ENDEREÇO-------------
CREATE TABLE addressTable(
    addressId INT AUTO_INCREMENT,
    zipCodeUser INT NOT NULL,
    addressUser char(100) NOT NULL,
    numberAddressUser INT NOT NULL,
    districtUser char(100) NOT NULL,
    cityUser char(50) NOT NULL,
    stateUser char(50) NOT NULL,
    userId INT NOT NULL,
    PRIMARY KEY (addressId),
    FOREIGN KEY (userId) REFERENCES usersTable(userId)
);

-------------------Criar TABELA ITENS DO DEPARTAMENTO-----------
CREATE TABLE departmentTable(
    department char(50) NOT NULL,
    PRIMARY KEY (department)
);

-------------------Criar TABELA ITENS DO SUBDEPARTAMENTO-----------
CREATE TABLE subdepartmentTable(
    subdepartment char(50) NOT NULL,
    department char(50) NOT NULL,
    FOREIGN KEY (department) REFERENCES departmentTable(department),
    PRIMARY KEY (subdepartment)    
);

-------------------Criar TABELA PRODUTO-------------
CREATE TABLE productTable(
    productId INT AUTO_INCREMENT,
    nameProd char(100) NOT NULL,
    stockProd INT NOT NULL,
    priceProd FLOAT NOT NULL,
    imageProd LONGBLOB,
    -- imageProd LONGBLOB NOT NULL, PARA TESTE NEM NOT NULL
    previewProd BIGINT NOT NULL,
    subdepartment char(50) NOT NULL,
    codgProd BIGINT NOT NULL,   
    FOREIGN KEY (subdepartment) REFERENCES subdepartmentTable(subdepartment),
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
SELECT * FROM productTable;

-------------------Iserir na TABELA usuarios admin-
INSERT INTO subdepartmentTable(subdepartment, department)
VALUES ('geladeiras', 'eletrodomesticos');

---------------------mostrar a estrutura da tabela---------------

DESCRIBE productTable;

---------------------Alterar a tabela modificando---------------
ALTER TABLE productTable
MODIFY COLUMN previewProd BIGINT NOT NULL;

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