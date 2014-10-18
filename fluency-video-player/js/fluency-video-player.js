$(document).ready(function(){

	//Edit this data objec for user content
	
	var data = {
				pageTitle: "Your Page title here",
					navItems:	[
						{	vidId:"ch01",		//name of video without file extension (.mp4, .ogg)
							chName:"",			//video main title
							chText:""}			//video subtitle
						]};

	//No need to edit below this line!

	var videoSizeControl = 	(function(){


									var wide = $('.videoPlayerWindow').width();
									var self = $('body').width();
									if (self > 768) {
										$('#thisVideo').width(wide);
										$('.navButton').css('margin-left', '0px');
										$('#navBarHeader').css('margin-left', '0px');
									}else{
										wide = wide * .96;
										var edge = self * .019;
										$('#thisVideo').width(wide);
										$('.navButton').css({
											'margin-left': edge+'px',
											'margin-right': edge+'px'
										});
										$('#navBarHeader').css({
											'margin-left': edge+'px',
											'margin-right': edge+'px'
										});
									}
							
								});

	$(document).ready(videoSizeControl);
	$(window).resize(videoSizeControl);

	var pageTitleTemplate = "{{pageTitle}}";
	var navTemplate =	"{{#navItems}}"+
							"<div class='navButton'>"+
								"<li name='{{vidId}}'><img src='videos/{{vidId}}"+".jpg'><div class='navButtonText'><h3>{{chName}} </h3><p>{{chText}} </p></div></li>"+
							"</div>"+
						"{{/navItems}}";
	var pageTitleHtml = Mustache.to_html(pageTitleTemplate,data);
	var navTemplateHtml = Mustache.to_html(navTemplate,data);

	$('#titleBar').html(pageTitleHtml);

	$('#navBarData').html(navTemplateHtml);

	$("#navBarData li").on('click',function() {
	
		var selectedVideo = $(this).attr('name');
		var videoPlayerHtml =	"<video id='thisVideo' controls preload='none' autoplay>"+
									"<source src='videos/"+selectedVideo+".mp4' type='video/mp4' />"+
									"<source src='videos/"+selectedVideo+".ogg' type='video/ogg' />" +
								"</video>";

		$('div.videoPlayerWindow').html(videoPlayerHtml);

		videoSizeControl();
		$('body,html').animate({scrollTop: 80}, 500);
			return false;
	});
});

