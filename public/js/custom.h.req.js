var objHReq={
    //error
    danger:'has-danger',
    errDiv:'.form-control-error',
    
    sendIinvite:'._sinvite',
};
$(function () {
    "use strict";

    $(document).on('click',objHReq.sendIinvite,function (e) {
        e.preventDefault();
        var $this=$(this);
        removeError($this);
        $.ajax({
            url: $this.data('l'),
            type: 'POST',
            data: {_token:$this.data('t'),_k:$this.data('k')},
            dataType: 'JSON',
            success: function (data){
                if (data.e)
                {
                    $.each(data.d,function (k,v) {
                        addError($this,k,v);
                    });
                }
                else {
                    window.location.replace(data.d);
                }
            },error:function (data) {
                console.log(data);
            }
        });
    });

});

function addError(t,k,v)
{
    var c=$('.'+k);
    t.find(c).parent().addClass(objHReq.danger);
    t.find(c).after(printError(v));
}
function printError($i)
{
    return '<div class="form-control-error font-weight-bold font-12 text-left text-danger">'+$i+'</div>';
}
function removeError(t)
{
    t.find('.'+objHReq.danger).removeClass(objHReq.danger);
    t.find(objHReq.errDiv).remove();
}
