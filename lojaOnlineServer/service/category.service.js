function populateFistLevel(list, categoryList) {
    list.forEach((categoryInList) => {
        if(!categoryInList.department){
            categoryList.push({
                categoryName: categoryInList.subdepartment,
                subCategories: []
            })
        }
    });
}

// [{ categoryName: 'Eletrodomesticos', subCategories: [{ categoryName: 'Geladeira', subCategories: []}, { categoryName: 'Fogão', subCategories: []} ] }]

function findChildrenForFather(list, category) {
    list.forEach((categoryInList) => {
        if(categoryInList.department === category.categoryName) {
            category.subCategories.push({
                categoryName: categoryInList.subdepartment,
                subCategories: [],
            })
        }
    });
    category.subCategories.forEach((child) => {
        findChildrenForFather(list, child);
    });
}


module.exports = {
    populateFistLevel,
    findChildrenForFather,    
}