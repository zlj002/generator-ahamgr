function getPageBtns(viewName) {
    let data = JSON.parse(window.sessionStorage.getItem('userPermission'))
    var page = {};
    var check = function (viewName, menus) {
        if (menus) {
            menus.forEach((item) => {
                if (item.viewName == viewName) {
                    page = item;
                    return false;
                } else if (item.children && item.children.length > 0) {
                    check(viewName, item.children)
                }
            })
        }
    }
    check(viewName, data);
    return page;
}

function checkBtns(viewName, code) {
    var view = getPageBtns(viewName)
    var btns = view.children
    var result = false
    btns.forEach((item) => {
        if (item.code == code) {
            result = true
            return false
        }
    })
    return result
}
export { getPageBtns,checkBtns }