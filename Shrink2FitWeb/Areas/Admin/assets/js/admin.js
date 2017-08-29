$(document).ready(function () {
    adminControl.init();

    //$("ul.acc-menu li").click(function () {
    //    var href = $(this).find('a').attr('href');
    //    var tabName = $(this).attr('id');
    //    adminControl.switchContent(href, tabName, '');
    //    return false;
    //});
})

adminControl = {

    selectedTab:"",

    init: function () {
        selectedTab = "index";
    },

    switchContent: function (href, tabName, vars) {
        selectedTab = tabName;

        $.ajax({
            url: href,
            data: vars,
            success: function (data) {
                $('#page-content').html(data);
                $('ul.acc-menu li.activeLeftMenu').removeClass('activeLeftMenu');
                $('ul.acc-menu li#' + tabName).addClass("activeLeftMenu");
            }
        });

        
    }
}