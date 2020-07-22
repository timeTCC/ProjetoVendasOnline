-------------------Deletar DATABASES--------------
DROP DATABASE nome_da_tabela;

DROP TABLE productTable;

-------------------Criar DATABASES----------------
CREATE DATABASE lojaOnline;

-------------------Selecionar DATABASES-----------
USE lojaOnline;

-------------------Criar TABELA USERS-------------
CREATE TABLE usersTable(
    userId INT NOT NULL AUTO_INCREMENT,
    nameUser char(50) NOT NULL,
    cpfUser INT NOT NULL,
    phoneUser INT NOT NULL,
    emailUser char(30) NOT NULL,
    passwordUser char(20) NOT NULL,
    profileUser char(20) NOT NULL,
    PRIMARY KEY (userId),
    FOREIGN KEY (profileUser) REFERENCES profileTable(profileUser)
);

-------------------Criar TABELA PERFIL-------------
CREATE TABLE profileTable(    
    profileUser char(20) NOT NULL,
    PRIMARY KEY (profileUser)
);

-------------------Criar TABELA ENDEREÇO-------------
CREATE TABLE addressTable(
    addressId INT NOT NULL AUTO_INCREMENT,
    zipCodeUser INT NOT NULL,
    addressUser char(50) NOT NULL,
    numberAddressUser INT NOT NULL,
    districtUser char(50) NOT NULL,
    cityUser char(50) NOT NULL,
    stateUser char(50) NOT NULL,
    userId INT NOT NULL,
    PRIMARY KEY (addressId),
    FOREIGN KEY (userId) REFERENCES usersTable(userId)
);

-------------------Criar TABELA PEDIDO-------------
CREATE TABLE requestTable(
    requestId INT NOT NULL AUTO_INCREMENT,
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

-------------------Criar TABELA PRODUTO-------------
CREATE TABLE productTable(
    productId INT NOT NULL AUTO_INCREMENT,
    nameProd char(50) NOT NULL,
    stockProd INT NOT NULL,
    priceProd FLOAT NOT NULL,
    imageProd char(50) NOT NULL,
    previewProd INT NOT NULL,
    department char(50) NOT NULL,   
    FOREIGN KEY (department) REFERENCES departmentTable(department),
    PRIMARY KEY (productId)
);

-------------------Criar TABELA ITENS DO DEPARTAMENTO-----------
CREATE TABLE departmentTable(
    department char(50) NOT NULL,
    PRIMARY KEY (department)
);

-------------------Mostrar TABELAS----------------
SHOW TABLES;

-------------------Select TABELAS-----------------
SELECT * FROM productTable;

-------------------Iserir na TABELA usuarios admin-
INSERT INTO usersTable(nameUser, cpfUser, phoneUser, emailUser, passwordUser, profileUser)
VALUES ('Karina', 123456789, 1199999999, 'karina@karina.com', 123456, 'admin');

---------------------Alterar a tabela modificando---------------
ALTER TABLE usersTable
MODIFY COLUMN emailUser char(30) NOT NULL;

---------------------Alterar a tabela modificando colunas----------
ALTER TABLE productTable
ADD previewProd INT NOT NULL;