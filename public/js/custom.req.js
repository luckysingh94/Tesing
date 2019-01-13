var objReq={
    form:'._form',
};

$(function () {
    "use strict";

    $(document).on('submit',objReq.form,function (e) {
        e.preventDefault();
        alert('hello');
        var $this=$(this);
        removeError($this);
        // $.ajax({
        //     url: $this.attr('action'),
        //     type: 'POST',
        //     data: $this.serialize(),
        //     dataType: 'JSON',
        //     success: function (data){
        //         if (data.e)
        //         {
        //             $.each(data.d,function (k,v) {
        //                 addError($this,k,v);
        //             });
        //         }
        //         else {
        //             // window.location.replace(data.d);
        //         }
        //     },error:function (data) {
        //         console.log(data);
        //     }
        // });
    });
});

function addError(t,k,v)
{
    var c=$('.'+k);
    t.find(c).parent().addClass(objReq.danger);
    t.find(c).after(printError(v));
}
function printError($i)
{
    return '<div class="form-control-error font-weight-bold font-12 text-left text-danger">'+$i+'</div>';
}
function removeError(t)
{
    t.find('.'+objReq.danger).removeClass(objReq.danger);
    t.find(objReq.errDiv).remove();
}
