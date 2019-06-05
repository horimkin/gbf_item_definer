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

            data[i].push([convertImgTitle(imgTitle), itemName])
        })
    })
    
    return data
}

function convertImgTitle(title) {
    // 不要な文字列を除去する(初出の数値.jpgへ変換)
    // パターン例
    // recovery1.jpg recovery_2003.jpg   lowson2001.jpg
    // charaLB_1.jpg skillplus_10001.jpg recycling1.jpg
    // 20241_2.jpg   1313_.jpg           10069_new.jpg
    // k20611.jpg    k_20231.jpg
    if (title) {
        return title.replace(/(^\D*)(\d+)([_]*\w*)/, "$2")
    } else {
        return title
    }
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
