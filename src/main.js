var mainModule = {
    init: function () {
        this.overlyProgressBar.init();  
    },
    overlyProgressBar: {
    progressBar:'.progress .progress-bar',
    skill:'.skill',
        init: function () {
            var me = this;


           $(me.progressBar).animate({width:  $(me.progressBar).attr("aria-valuenow") + "%"}, 7000);

            $(me.skill).css("left",
                function () {
                    return  $(me.progressBar).attr("aria-valuenow") + "%";
                }
            )
        }
    }
}

$(function () {
	mainModule.init();
});
