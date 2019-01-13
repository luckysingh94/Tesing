var objAll={
    //Accordian
    Accordian:'._accord',
    data:'data-action',
    dataExpend:'expand',
    all:'._close-accord',
    removeModal:'._xn-glh-modal',
    closeModal:'._xn-glh-close',
};

$(function () {
    "use strict";
    $(function () {
        $(".preloader").fadeOut();
    });
    jQuery(document).on('click', '.mega-dropdown', function (e) {
        e.stopPropagation()
    });

    $(".nav-toggler").click(function () {
        $("body").toggleClass("show-sidebar");
        $(".nav-toggler i").toggleClass("ti-menu");
        $(".nav-toggler i").addClass("ti-close");
    });
    var set = function () {
        var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
        var topOffset = 55;
        if (width < 1170) {
            $("body").addClass("mini-sidebar");
            $('.navbar-brand span').hide();
            $(".sidebartoggler i").addClass("ti-menu");
        }
        else {
            $("body").removeClass("mini-sidebar");
            $('.navbar-brand span').show();
        }
        var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $(".page-wrapper").css("min-height", (height) + "px");
        }
    };
    $(window).ready(set);
    $(window).on("resize", set);

    $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
        $(".app-search").toggle(200);
    });

    $("body").trigger("resize");

    $('a[data-action="collapse"]').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.card').find('[data-action="collapse"] i').toggleClass('ti-minus ti-plus');
        $(this).closest('.card').children('.card-body').collapse('toggle');
    });

    $('a[data-action="expand"]').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.card').find('[data-action="expand"] i').toggleClass('mdi-arrow-expand mdi-arrow-compress');
        $(this).closest('.card').toggleClass('card-fullscreen');
    });

    //Accordian
    $(document).on('click',objAll.Accordian,function (event) {
        event.preventDefault();
        $(this).parent().siblings().find('i:nth-child(2)').removeClass('fa-angle-up').addClass('fa-angle-down');
        $(this).parent().siblings().find(objAll.Accordian).siblings().slideUp('fast');
        $(this).parent().siblings().find(objAll.Accordian).attr(objAll.data, 'collapse');
        $(this).find('i:nth-child(2)').removeClass('fa-angle-down fa-angle-up').addClass($(this).attr(objAll.data) == objAll.dataExpend ? 'fa-angle-down' : 'fa-angle-up');
        $(this).attr(objAll.data, $(this).attr(objAll.data) == objAll.dataExpend ? 'collapse' : objAll.dataExpend);
        $(this).siblings().slideToggle('fast');
    });
    $(objAll.all).click(function (event) {
        event.preventDefault();
        $(this).parent().parent().siblings().find('i:nth-child(2)').removeClass('fa-angle-up').addClass('fa fa-angle-down');
        $(this).attr(objAll.data, $(this).attr(objAll.data) == objAll.dataExpend ? 'collapse' : objAll.dataExpend);
        $(this).parent().parent().siblings().find(objAll.Accordian).siblings().slideUp('fast');
        $(this).parent().parent().siblings().find(objAll.Accordian).attr(objAll.data, 'collapse');
    });
//Close Model
    $(document).on('click',objAll.closeModal,function (event) {
        event.preventDefault();
        rmodal();

    });
});

function cmodal(h,c,s) {
    let modal='<div class="_xn-glh-model modal-backdrop fade show"></div>\n' +
        '<div class="modal _xn-glh-model fade show" style="display: block; padding-right: 15px;">\n' +
        '    <div class="modal-dialog '+s+'">\n' +
        '        <div class="modal-content">\n' +
        '            <div class="modal-header">\n' +
        '                <h4 class="modal-title text-white">'+h+'</h4>\n' +
        '                <button type="button" class="_xn-glh-close close">×</button>\n' +
        '            </div>\n' +
        '            <div class="modal-body"> '+c+'</div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';
    $('body').append(modal);

}
function rmodal() {
    $(objAll.removeModal).remove();

}

