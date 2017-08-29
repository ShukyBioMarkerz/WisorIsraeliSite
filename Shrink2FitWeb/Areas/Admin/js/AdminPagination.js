
pagination = {
    currentPage: 1,
    itemsPerPage: 15,
    maxPages: 1,
    getpageUrl: "",
    tableID: "",
    init: function (tableID, ajaxUrl) {
        this.getpageUrl = ajaxUrl;
        this.tableID = tableID;
    },
    getPage: function (targetPage) {
        var table = this.tableID;
        var itemsPerPage = this.itemsPerPage;
        $.ajax({
            url: this.getpageUrl,
            type: "POST",
            data: { pageNumber: targetPage, itemsPerPage: itemsPerPage },
            success: function (data) {
                $('#' + table + " tbody").html(data);
                var firstIndex = (targetPage - 1) * itemsPerPage + 1;
                var lastIndex = (firstIndex - 1) + $('#' + table + " tbody tr").length;
                var range = firstIndex + "-" + lastIndex;
                $('.itemsRange').html(range);
            }
        });
    }

}