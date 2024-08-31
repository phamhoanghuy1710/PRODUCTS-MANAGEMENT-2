module.exports =  (objectPagination,query,countProducts)=>{
    if (query.page){
        objectPagination.currentPage = parseInt(query.page);
    }
    objectPagination.skip = (objectPagination.currentPage-1)*objectPagination.limitItems;
    // totalPage
    const totalPage = Math.ceil(countProducts/objectPagination.limitItems);
    objectPagination.totalPage = totalPage;
    // totalpage
    return objectPagination;
}