var objHC={
    profile:'._xn-glh-profile',

    // showVisitTime:'._svt',
    visitingTime:'._visitingtime',
    addMoreVisitTime:'._admorevt',
    Accordian:'._accord',
    dataExpend:'.expand',
    removeSchedule:'._xn-glh-remove',

    allhc:'.all-hospital',
    status:'._xn-glh-status',

    onOff:'._xn-glh-on-off',
    addScheduleTime:'._svtpa',
    removeScheduleTime:'._xn-remove-schedule',
    addMoreSchedule:'._admoresch',

    showAllHosClinic:'._all-hos-clinic',
    filterPracticeAt:'._filter-practice-at',
    searchHosClinic:'._search-hos-clinic',
    moreLess:'._xn-glh-more-less span',
    submithospital:'._add-hospital-form',
    //error
    danger:'has-danger',
    errDiv:'.form-control-error',
    filterHospital:'._filterhospital',
    hospitalList:'._xn-glh-ul-list',
    searchlist:'._xn-glh-li',
    searchAddr:'._search-addr-details',
    cityList:'._xn-glh-city-list',
    cityDataList:'._xn-glh-data-list',
    submitVisitingTimeForm:'._visiting-time-form',
    addMoreScheduleForm:'._xn-ihr-add-more',
    closeWindowModel:'._xn-ihr-overlay',
    closeSweetAlert:'.showSweetAlert',
    cancel:'._cancel',
    deleteScheduleOption:'._xn-glh-delete',


};
$(function () {
    allHosClinic();
    allSchedule();
    "use strict";
    $(document).on('click', 'a', function (event) {

        event.preventDefault();

        window.open($(this).attr('href'), '_self');
    });
    $(document).on('click', objHC.profile, function (event) {
        event.preventDefault();
        window.open($(this).data('href'), '_self');
    });
    $(document).on('click', objHC.showVisitTime, function (e) {
        e.preventDefault();
        var $this = $(this);
        addVisitingForm($this.data('k'));
        $this.remove();

    });
    $(document).on('click', objHC.addMoreVisitTime, function (e) {
        e.preventDefault();
        var $this = $(this);
        $(objHC.Accordian).attr('data-action', 'collapse');
        $(objHC.Accordian).siblings().slideUp();
        $(objHC.Accordian).find('i:nth-child(2)').removeClass('fa-angle-up').addClass('fa fa-angle-down');
        $('._visitingtime').html(addVisitTime($this.parents().eq(4), $this.data('k')));
        $(objHC.addMoreScheduleForm).addClass('hide');

    });
    $(document).on('click', objHC.removeSchedule, function (e) {
        e.preventDefault();
        var $this = $(this);
        $this.parents().eq(1).remove();
        var $rm = $('._visitingtime').find(objHC.Accordian);
        if ($rm.length < 2) {
            $('._xn-glh-remove').html(' ').removeClass('_xn-glh-remove');
            $(objHC.addMoreScheduleForm).removeClass('hide');

            // $(objHC.Accordian).siblings().find('._addbtn').html('<button type="submit" class="btn btn-success _admorevt" data-k="1"><i class="fa fa-plus"></i> Add More</button>');
        }
    });
    $(document).on('click', objHC.allhc, function (e) {
        e.preventDefault();
        var $type = ['All', 'Hospital', 'Clinic'];
        var $this = $(this);
        var $typeno = parseInt($this.attr('data-type'));
        var $typen = $typeno + 1;
        var $typestatus = ['All', 'Active', 'Inactive'];
        var $typenostatus = parseInt($(objHC.status).attr('data-type'));

        if ($typen < 3) {
            $this.html($type[$typen]);
            $this.attr('data-type', $typen);
            var $var = $type[$typen];
            filterHosClinic($this, $var, $typestatus[$typenostatus]);

        } else {
            $this.html($type[0]);
            $this.attr('data-type', 0);
            $var = $type[0];
            filterHosClinic($this, $var, $typestatus[$typenostatus]);

        }
    });
    $(document).on('click', objHC.status, function (e) {
        e.preventDefault();
        var $type = ['All', 'Inactive', 'Active'];
        var $this = $(this);
        var $typeno = parseInt($this.attr('data-type'));
        var $typen = $typeno + 1;
        var $typestatus = ['All', 'Hospital', 'Clinic'];
        var $typenostatus = parseInt($(objHC.allhc).attr('data-type'));
        if ($typen < 3) {


            $this.removeClass('badge-success');
            $this.addClass('badge-danger');
            $this.html($type[$typen]);
            $this.attr('data-type', $typen);
            var $val = $type[$typen];
            filterHosClinic($this, $typestatus[$typenostatus], $val);

        } else {
            $this.removeClass('badge-danger');
            $this.addClass('badge-success');
            $this.html($type[0]);
            $this.attr('data-type', 0);
            var $val = $type[0];
            filterHosClinic($this, $typestatus[$typenostatus], $val);

        }


    });
    $(document).on('click', objHC.onOff, function (event) {
        event.preventDefault();
        var $this = $(this);
        if ($this.hasClass('_xn-glh-off'))
            $this.removeClass('_xn-glh-off').addClass('_xn-glh-on').text('ON');
        else
            $this.removeClass('_xn-glh-on').addClass('_xn-glh-off').text('OFF');


    });
    $(document).on('click', objHC.addScheduleTime, function (e) {
        e.preventDefault();
        var $this = $(this);
        $.ajax({
            url: $this.data('l'),
            type: 'POST',
            data: {_token: $this.data('t'), _t: $this.data('type')},
            dataType: 'JSON',
            success: function (data) {
                $this.remove();
                $(objHC.visitingTime).html(data.d);
            }, error: function (data) {
                console.log(data);
            }
        });
    });

    $(document).on('click', objHC.moreLess, function (event) {
        event.preventDefault();
        if ($(this).hasClass('_xn-glh-more')) {
            $('._xn-glh-hos-content').css({'height': 'auto'});
            $(this).removeClass('_xn-glh-more').addClass('_xn-glh-less').html('Less');
        } else {
            $('._xn-glh-hos-content').css({'height': ''});
            $(this).addClass('_xn-glh-more').removeClass('_xn-glh-less').html('More');
        }

    })
    //Submit hospital
    $(document).on('submit', objHC.submithospital, function (e) {
        e.preventDefault();
        var $this = $(this);
        removeError($this);
        $.ajax({
            url: $this.attr('action'),
            type: 'POST',
            data: $this.serialize(),
            dataType: 'JSON',
            success: function (data) {
                if (data.e) {
                    $.each(data.d, function (k, v) {
                        addError($this, k, v);
                    });
                } else {
                    addVisitingForm(data.d);
                    $this.parent().html(data.f);
                }
            },
            error: function (data) {
                console.log(data);
            }
            //
        });
    });

    //----------------------Search Hospital and Clinic---------------
    //Search Hospital and clinic

    $(document).on('keyup', objHC.searchHosClinic, function (e) {
        e.preventDefault();
        var $this = $(this);
        $.ajax({
            url: $this.data('l'),
            type: 'POST',
            data: {_token: $this.data('t'), _val: $(this).val(), _val1: $(objHC.filterHospital).val()},
            dataType: 'JSON',
            success: function (data) {
                $($this).parent().find(objHC.hospitalList).html(data);
                $($this).parent().find(objHC.hospitalList).removeClass("hide");
            }, error: function (data) {

                console.log(data);
            }
        });
    });
    //select search item

    $(document).on('click', objHC.searchlist, function (e) {
        e.preventDefault();
        $(objHC.searchHosClinic).val($(this).text());
        $(objHC.hospitalList).addClass("hide");
        $(objHC.filterHospital).attr('disabled', 'disabled');
        $(objHC.searchHosClinic).attr('disabled', 'disabled');
        var $this = $(this);
        $.ajax({
            url: $this.data('l'),
            type: 'POST',
            data: {_token: $this.data('t'), _k: $(this).data('k'), _t: $(this).data('type')},
            dataType: 'JSON',
            success: function (data) {
                $(objHC.submithospital).html(data);
            }, error: function (data) {

                console.log(data);
            }
        });
    });

    //----------------------End Search Hospital and Clinic---------------

    //--------------------Address---------------------------------
    //Search Address
    $(document).on('keyup',objHC.searchAddr,function (e) {
        e.preventDefault();
        var $this=$(this);
        $.ajax({
            url: $this.data('l'),
            type: 'POST',
            data: {_token:$this.data('t'),_val:$(this).val(),_t:$(this).data('type')},
            dataType: 'JSON',
            success: function (data){
                $($this).parent().find(objHC.cityDataList).html(data);
                $($this).parent().find(objHC.cityDataList).removeClass("hide");
            },error:function (data) {
                console.log(data);
            }
        });
    });
    //select search addr item
    $(document).on('click',objHC.cityList,function (e) {
        e.preventDefault();
        $(this).parents().eq(2).find(objHC.searchAddr).val($(this).text());
        $(objHC.cityDataList).addClass("hide");
    });
    //--------------------End Address---------------------------------

    $(document).on('click', '.add-hospital', function (e) {
        e.preventDefault();
        var $this = $(this);
        $(objHC.searchHosClinic).val(null);

        $(objHC.filterHospital).attr('disabled', 'disabled');
        $(objHC.searchHosClinic).attr('disabled', 'disabled');
        $(objHC.hospitalList).addClass("hide");
        $.ajax({
            url: $this.data('l'),
            type: 'POST',
            data: {_token: $this.data('t'), _t: $(this).data('type')},
            dataType: 'JSON',
            success: function (data) {
                $(objHC.submithospital).html(data);
            }, error: function (data) {
                console.log(data);
            }
        });
    });
    //----------------------End Search Hospital and Clinic---------------

    //--------------------Address---------------------------------
    //Search Address
    $(document).on('keyup', objHC.searchAddr, function (e) {
        e.preventDefault();
        var $this = $(this);
        $.ajax({
            url: $this.data('l'),
            type: 'POST',
            data: {_token: $this.data('t'), _val: $(this).val(), _t: $(this).data('type')},
            dataType: 'JSON',
            success: function (data) {
                $($this).parent().find(objHC.cityDataList).html(data);
                $($this).parent().find(objHC.cityDataList).removeClass("hide");
            }, error: function (data) {
                console.log(data);
            }
        });
    });
    //select search addr item
    $(document).on('click', objHC.cityList, function (e) {
        e.preventDefault();
        if ($(this).parents().eq(2).find('._city')) {
            $(this).parents().eq(2).find('._city').val($(this).text());
            $(objHC.cityDataList).addClass("hide");
        } else if ($(this).parents().eq(2).find('._state')) {
            $(this).parents().eq(2).find('._state').val($(this).text());
            $(objHC.cityDataList).addClass("hide");
        } else if ($(this).parents().eq(2).find('._zip')) {
            $(this).parents().eq(2).find('._zip').val($(this).text());
            $(objHC.cityDataList).addClass("hide");
        } else if ($(this).parents().eq(2).find('._country')) {
            $(this).parents().eq(2).find('._country').val($(this).text());
            $(objHC.cityDataList).addClass("hide");
        }
    });
    //--------------------End Address---------------------------------

    //Submit hospital
    $(document).on('submit', objHC.submitVisitingTimeForm, function (e) {
        e.preventDefault();
        var $this = $(this);
        removeError($this);
        $.ajax({
            url: $this.attr('action'),
            type: 'POST',
            data: $this.serialize(),
            dataType: 'JSON',
            success: function (data) {
                if (data.e) {
                    $.each(data.d, function (k, v) {
                        addError($this, k, v);
                    });
                } else {
                    $('._all-schedule-time').html(data.d);
                    $(objHC.addMoreScheduleForm).removeClass();
                    $(objHC.visitingTime).html('');
                }
            },
            error: function (data) {
                console.log(data);
            }
            //
        });
    });

    $(document).on('change', '#_allselect', function (e){
        if (this.checked) {
            $(this).parents().eq(1).find('._date').prop("checked", true);
        }
        else
        {
            $(this).parents().eq(1).find('._date').prop("checked", false);
        }
    });
    //cancel delete window
    $(document).on('click',objHC.cancel,function (e) {
       e.preventDefault();
       deleteWindow();
    });
    //delete option
    $(document).on('click', objHC.deleteScheduleOption, function (e) {
        e.preventDefault();
        var $this = $(this);
        $.ajax({
            url: $this.data('l'),
            type: 'POST',
            data: {_token: $this.data('t'), _k: $(this).data('k')},
            dataType: 'JSON',
            success: function (data) {
                $("body").append(deleteOption(data.m,data.d));
            }, error: function (data) {
                console.log(data);
            }
        });
    });
});

function addVisitTime($this,$id) {
    var $hrs='';
    var $min='<option value="0">0</option>';
    for (var i=1;i<=59;i++)
    {
        if(i<=12)
        {
            $hrs+='<option value="'+i+'">'+i+'</option>';
        }
        $min+='<option value="'+i+'">'+i+'</option>';
    }
    return '<input hidden name="_practiceid" value="'+$id+'">' +
        '<div class="m-b-20">\n' +
        '<div data-action="collapse" class="bg-white border-bottom _accord _xn-glh-p-20-10 font-20 font-weight-normal"> Visiting Time <span class="_xn-glh-remove"><i class="fa fa-times"></i> Remove</span><i class="pull-right fa fa-angle-down font-20 right-arrow"></i></div>\n' +
        '<div class="bg-white p-10 hide">\n                    ' +
        '<div class="card m-0">\n                        ' +
        '<div class="card-body">\n                            ' +
        '<h5 class="box-title font-bold m-0">Visiting Time</h5>\n                            ' +
        '<form class="">\n                                ' +
        '<div class="row m-b-10 m-t-10">\n                                    ' +
        '<div class="col-md-4">\n                                        ' +
        '<h5>Days</h5>\n                                        ' +
        '<div class="form-group m-0">\n                                            ' +
        '<div class="_xn-glh-visit"><input type="checkbox" id="_allselect" value=""><label for="_allselect" class="m-r-10 m-l-5">Select All</label></div>\n' +
        '<div class="_xn-glh-visit"><input type="checkbox" class="_date" id="Mon" name="_weeks[]" value="1"> <label for="Mon" class="m-r-10 m-l-5">Mon</label></div>\n ' +
        '<div class="_xn-glh-visit"><input type="checkbox" class="_date" id="Tue" name="_weeks[]" value="2"> <label for="Tue" class="m-r-10 m-l-5">Tue</label></div>\n ' +
        '<div class="_xn-glh-visit"><input type="checkbox" class="_date" id="Wed" name="_weeks[]" value="3"> <label for="Wed" class="m-r-10 m-l-5">Wed</label></div>\n ' +
        '<div class="_xn-glh-visit"><input type="checkbox" class="_date" id="Thu" name="_weeks[]" value="4"> <label for="Thu" class="m-r-10 m-l-5">Thu</label></div>\n ' +
        '<div class="_xn-glh-visit"><input type="checkbox" class="_date" id="Fri" name="_weeks[]" value="5"> <label for="Fri" class="m-r-10 m-l-5">Fri</label></div>\n ' +
        '<div class="_xn-glh-visit"><input type="checkbox" class="_date" id="Sat" name="_weeks[]" value="6"> <label for="Sat" class="m-r-10 m-l-5">Sat</label></div>\n ' +
        '<div class="_xn-glh-visit"><input type="checkbox" class="_date" id="Sun" name="_weeks[]" value="7"> <label for="Sun" class="m-r-10 m-l-5">Sun</label></div>\n ' +
        '<div class="_days"></div>\n' +
        '</div>\n' +
        '</div>\n' +
        '<div class="col-md-8">\n' +
        '<h5>Timing</h5>\n' +
        '<div class="row">\n' +
        '<div class="col-md-6">\n' +
        '<div class="form-group">\n ' +
        '<p>From</p>\n ' +
        '<select title="hour" class="m-b-10 form-control _fhrs" style="width: 30%" name="_fhrs">\n ' +
        '<option value="">Hrs</option>\n\n ' +$hrs+
        '</select>\n ' +
        '<select title="minute" class="m-b-10 form-control _fmin" style="width: 30%" name="_fmin">\n' +
        '<option value="">Min</option>\n' +$min+
        '</select>\n ' +
        '<select title="type" class="m-b-10 form-control _ftime" style="width: 20%" name="_ftime">\n ' +
        '<option value="AM">AM</option>\n' +
        '<option value="PM">PM</option>\n' +
        '</select>\n' +
        '<div class="_from"></div>\n\n' +
        '</div>\n' +
        '</div>\n' +
        '<div class="col-md-6">\n' +
        '<div class="form-group">\n' +
        '<p>To</p>\n' +
        '<select title="hour" class="m-b-10 form-control _ehrs" style="width: 30%" name="_ehrs">\n' +
        '<option value="">Hrs</option>\n' +$hrs+
        '</select>\n' +
        '<select title="minute" class="m-b-10 form-control _emin" style="width: 30%" name="_emin">\n' +
        '<option value="">Min</option>\n' +$min+
        '</select>\n   ' +
        '<select title="type" class="m-b-10 form-control _etime" style="width: 20%" name="_etime">\n' +
        '<option value="AM">AM</option>\n' +
        '<option value="PM">PM</option>\n ' +
        '</select>\n' +
        '<div class="_end"></div>\n' +
        '</div>\n' +
        '</div>\n\n' +
        '</div>\n ' +
        '<div class="row m-t-20">\n ' +
        '<div class="col-md-6 ">\n ' +
        '<div class="form-group ">\n ' +
        '<label>Consultation Fee</label><br>\n  ' +
        '<select class="m-b-10 form-control _currency" name="_currency" style="max-width: 90px">\n' +
        '<option value="INR">INR</option>\n ' +
        '<option value="USD">USD</option>\n  ' +
        '</select>\n' +
        '<input type="text" class="form-control _consfee" placeholder="2000" name="_consfee" style="max-width: 235px">\n' +
        '</div>\n' +
        '</div>\n' +
        '<div class="col-md-6">\n' +
        '<div class="form-group ">\n' +
        '<label>Set Time Interval</label>\n ' +
        '<input type="text" class="form-control _interval" placeholder="per patient per min" name="_interval">\n ' +
        '</div>\n ' +
        '</div>\n' +
        '</div>\n ' +
        '</div>\n' +
        '</div>\n' +
        '</form>\n' +
        '<div class="form-actions text-right">\n' +
        '<button type="submit" class="btn btn-success">Save</button>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>';
}


//all request
function allHosClinic() {
    var $this=$(objHC.showAllHosClinic);
    $.ajax({
        url: $this.data('l'),
        type: 'GET',
        dataType: 'JSON',
        success: function (data){
            $(objHC.showAllHosClinic).html(data)
        },error:function (data) {
            console.log(data);
        }
    });
}
function filterHosClinic($this,$val,$val1) {
    $.ajax({
        url: $this.data('l'),
        type: 'POST',
        data: {_token:$this.data('t'),_val:$val,_val1:$val1},
        dataType: 'JSON',
        success: function (data){
            $(objHC.showAllHosClinic).html(data)
        },error:function (data) {
            console.log(data);
        }
    });
}

//error
function addError(t,k,v)
{
    var c=$('.'+k);
    t.find(c).parent().addClass(objHC.danger);
    t.find(c).after(printError(v));
}
function printError($i)
{
    return '<div class="form-control-error font-weight-bold font-12 text-left text-danger">'+$i+'</div>';
}
function removeError(t)
{
    t.find('.'+objHC.danger).removeClass(objHC.danger);
    t.find(objHC.errDiv).remove();
}
function addVisitingForm($k) {
    var $this=$(objHC.visitingTime);
    $.ajax({
        url: $this.data('l'),
        type: 'POST',
        data: {_token:$this.data('t'),_k:$k},
        dataType: 'JSON',
        success: function (data){
            if(data.e)
            {
                $('._all-schedule-time').html(data.f);
                $(objHC.addMoreScheduleForm).html(data.a);
            }
            else
            {
                $(objHC.visitingTime).html(data);
                $(objHC.addMoreScheduleForm).addClass('hide');
            }
        },error:function (data) {
            console.log(data);
        }
    });
}
function deleteWindow() {
    $('body').find(objHC.closeSweetAlert).remove();
    $('body').find(objHC.closeWindowModel).remove();
}
function deleteOption($m,$a) {
    return '<div class="_xn-ihr-overlay" style="display: block"></div>\n' +
        '    <div class="sweet-alert showSweetAlert visible " data-animation="pop" data-timer="null" style=" display: block; margin-top: -168px;">\n' +
        '        <h2>'+$m+'</h2>\n' +
        '\n' +
        '        <div>\n' +
        '            <button class="btn bg-success _cancel">Cancel</button>\n' +
        '            \n' +$a+
        '        </div>' +
        '         <div class=""></div>  ' +
        '    </div>';
}
function allSchedule() {
    var $this=$('._xn-all-schedule');
    // alert($this.data('k'))
    $.ajax({
        url: $this.data('l'),
        type: 'POST',
        data:{_token:$this.data('t'),_t:$this.data('type'),_k:$this.data('k')},
        dataType: 'JSON',
        success: function (data){
            $('._xn-all-schedule').html(data)
        },error:function (data) {
            console.log(data);
        }
    });
}

