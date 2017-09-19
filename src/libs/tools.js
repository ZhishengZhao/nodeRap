module.exports = {
    getIndexs: function(row, column, cell) {
        var len = cell.className.length;
        var colIndex = parseInt(cell.className.substr(len - 1) - 1) % 5;
        var rowIndex = cell.closest('tr').rowIndex;
        // console.log('当前点击的是第'+colIndex+'列, 第'+rowIndex+'行')
        return {
            rowIndex: rowIndex,
            colIndex: colIndex
        };
    },

    getUrl: function(url) {
        var origin = window.location.origin.split(':');
        origin.pop();
        origin.join('');
        url = origin.join(':') + ':3000/' + url;
        return url;
    }
};