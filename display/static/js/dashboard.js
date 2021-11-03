$(function() {
    $('.panel-form').hide();
    $('#panel-type').change(function() {
        var val = $(this).val();

        $('.panel-form').hide();
        $('#panel-form-' + val).show();
    })
})