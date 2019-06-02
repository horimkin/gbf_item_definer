function getList($) {
    var elements = $(".contents").children('.list1').children()
    // 末尾のコメントフォームを除去
    elements = elements.not(elements.last())

    var list = analyzeList($, elements, 1)
    list = formatList(list)

    return list
}

function analyzeList($, elements, depth){
    depth++
    var next = '.list' + depth
    var list = new Array()
    elements.each(function (i, elm) {
        var name = $(this).children('a').text()
        if ($(this).children(next).length > 0) {
            var lowerCategory = analyzeList($, $(this).children(next).children(), depth)
            var names = new Array(lowerCategory.length).fill(name)
            names.forEach(function(name, i){
              list.push ([name].concat(lowerCategory[i]))})
        } else {
            list.push ([name])
        }
    })
 
    return list
}

function formatList(list) {
    var maxLen = 0
    list.forEach(function (elm, i) {
        if (maxLen < elm.length) {
            maxLen = elm.length
        }
    })

    // 下位のカテゴリがない部分を""で埋める
    list = list.map(function (elm, i) {
        var padding = (new Array(maxLen - elm.length).fill(""))
        return elm.concat(padding)
    })
 
    return list
}

function getItemTable($) {
    var tables = $('#body').children(".ie5").children()
    var data = new Array(tables.length)
    tables.each(function(i, table){
        var items = $(this).children("tbody").children()        
        data[i] = new Array()
        items.each(function (j, item) {
            if ($(this).children().length <= 1) {
                return true
            }
            var imgTitle = $(this).children().eq(0).children().first().attr("title")
            var itemName = $(this).children().eq(1).text()

            data[i].push([imgTitle, itemName])
        })
    })
    
    return data
}

function mergeData(list, items) {
    var data = new Array()
    list.forEach(function (listElm, i) {
        items[i].forEach(function (item, j) {
            data.push(listElm.concat(item))
        })
    })    

    return data
}
