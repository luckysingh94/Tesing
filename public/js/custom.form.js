var ObjForm={
    form:'._form',
};

$(function () {
    "use strict";
   $(document).on('submit',ObjForm.form,function (e) {
       e.preventDefault();
       var $this=$(this);
       removeError($this);
       $.ajax({
           url: $(this).attr('action'),
           type: 'POST',
           data: $(this).serialize(),
           dataType: 'JSON',
           success: function (data){
               if (data.e)
               {
                   $.each(data.d,function (k,v) {
                       addError($this,k,v);
                   });
               }
               else {
                   alert(data.d);
                   window.location.replace(data.r);
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
    t.find(c).parent().addClass(ObjForm.danger);
    t.find(c).after(printError(v));
}
function printError($i)
{
    return '<div class="form-control-error font-weight-bold font-12 text-left text-danger">'+$i+'</div>';
}
function removeError(t)
{
    t.find('.'+ObjForm.danger).removeClass(ObjForm.danger);
    t.find(ObjForm.errDiv).remove();
}
