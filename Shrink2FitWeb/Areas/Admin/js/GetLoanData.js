/// <reference path="../assets/plugins/plupload-2.1.2/js/plupload.full.min.js" />
/// <reference path="../assets/plugins/plupload-2.1.2/js/plupload.dev.js" />
$(function () {
    $('#load-loan-data').click(function () {
        var id = $(this).closest('tr').find('#orderid').val();
        $.ajax({
            url: '/admin/Search/GetLoanDataList',
            type: 'POST',
            data: { orderlabel: id },
            success: function (data) {

                $('#accordion').html(data);
            }
        });
    });

    //var uploader = new plupload.Uploader({
    //    runtimes: 'gears,html5,flash,silverlight,browserplus',
    //    browse_button: 'pickfiles',
    //    container: 'upload-file',
    //    max_file_size: '20mb',
    //    max_file_count: 1,
    //    multi_selection: false,
    //    url: '/admin/results/ProcessResultExcel'

    //});

    //uploader.bind('FileUploaded', function (up, file, res) {
    //    var data = $.parseJSON(res.response);
    //    if (data.success) {
    //        alert("Upload successful");
    //    }
    //    else {
    //        alert(data.message);
    //    }
    //});

    //uploader.init();

    //$('#upload').click(function () {
    //    uploader.start();
    //    return false;
    //});




});