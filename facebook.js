window.fbAsyncInit = function() {
 function dayOfWeekAsString(dayIndex) {
     return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex];
 }
 function monthAsString(monthIndex) {
   return ["January","February","March","April","May","June","July","August","September","October","November","December"][monthIndex];
 }



   FB.init({
     appId      : '1744135619181438',//add your app ID
     xfbml      : true,
     version    : 'v2.7'
   });
   FB.AppEvents.logPageView();

 function getFeed (callback) {
 FB.api(
         '13803164549/feed',//or use your feed ID
         {access_token: '1744135619181438|OItwAPAv2d8-p32E-sSqHXQR4vE'},//add your access token
         function(feedResponse) {
           if (callback) {
             callback(feedResponse);
           }
         }
       );
 }

 function getPost (postID, callback) {
 FB.api(
         postID,
         {access_token: '1744135619181438|OItwAPAv2d8-p32E-sSqHXQR4vE',//add your access token
         fields: 'attachments,full_picture,picture,message,story,description,name,link,permalink_url,created_time'
         },
         function(postResponse) {
           if (callback) {
             callback(postResponse);
           }
         }
       );
 }

function writeFeed(callback) {

getFeed(function (feedResponse) {

   var div = $('<div/>')
       .addClass('grid-sizer')
       .appendTo('#facebook');



   var postID;
   var postMessage;
   var postImage;
   var firstPostID;
   var postLinkName;
   var postLink;
   var postPermaLink;
   var postDate;
   var postDayofWeek;
   var postDay;
   var postMonth;
   var postYear;
   var formattedDate;
   var postHeadCheck;
   var imageCheck;


   var k = 1
   var l = 1

   console.log(feedResponse);
   $.each(feedResponse.data, function(key, value) {
     l++
     postID = $(this.id).selector;
     if (k==1) {
       firstPostID = postID
       k++
     }


     var div = $('<div/>')
       .attr('id', postID)
       .addClass('facebookPost')
       .addClass('grid-item')
       .appendTo('#facebook');

     getPost(postID, function(postResponse){
       console.log(postResponse);

       if (postResponse.attachments.data[0]["subattachments"]) {
         postImage=postResponse.attachments.data[0].subattachments.data[0].media.image.src;
         imageCheck="attachment"
      }
      else {
        postImage = postResponse.full_picture;
        imageCheck="picture"
      }

       postLink = postResponse.link;
       postLinkName = postResponse.name;
       postPermaLink = postResponse.permalink_url;

       postDate= new Date(Date.parse(postResponse.created_time));
       postDay = postDate.getDate();
       postDayofWeek=dayOfWeekAsString(postDate.getDay());
       postMonth=monthAsString(postDate.getMonth());
       postYear=postDate.getFullYear();
       formattedDate = postDayofWeek +", "+postMonth+" "+postDay+", "+postYear;



       postMessage=(postResponse.message || postResponse.description || postResponse.story );
       postHeadCheck='noPostHead';

       currentPostID=postResponse.id;
       var imgDiv = $('<div/>')
         .addClass('facebook-image')
         .addClass(imageCheck);
       if (postImage == null) {
         var noImageText = $('<p>');
         if(postLinkName == null) {
         postHead=postMessage;
         postHeadCheck='hasPostHead';
         if(postMessage.length>35) {
           postHead = postHead.replace(/^(.{30}[^\s]*).*/, "$1")+"...";;
         }
         $(noImageText)
           .text(postHead)
           .addClass('postHead')
           .appendTo(imgDiv);
         }
         else {
         $(noImageText)
           .text(postLinkName)
           .addClass('postLink')
           .appendTo(imgDiv);
         }
       }
       else {
       var img = $('<img/>')
         .attr('src',postImage)
         .addClass('facebookImage')
         .appendTo(imgDiv);
       }
       $(imgDiv).appendTo(div);

       var textDiv = $('<div/>')
         .addClass('facebookText');


       var fbP = $('<p>')
         .addClass('postFull')
         .html(anchorme.js(postMessage))
         .addClass(postHeadCheck)
         .appendTo(textDiv);

       var dateP =	$('<p>')
         .addClass('postDate')
         .text(formattedDate)
         .appendTo(textDiv);


       var fbLink = $('<a>')
         .html('<img src="https://www.bc.edu/content/dam/bc1/schools/law/js/library/facebook/fb-icon-60x60.png"></img>')
         .addClass('facebookLink')
         .attr('href', postPermaLink)
         .appendTo(textDiv);
       $(textDiv).appendTo(div);




       if (l==26) {
       callback && callback();
       }

       if (currentPostID == firstPostID)	{
         $(".facebookPost:nth-child(2)").addClass('fb-current');
         var postText =$("#"+currentPostID).find(".facebookText").html();
         $('#fb-text').empty().html(postText);
         if (postText.length < 300) {
           $('#fb-text .postFull').css({'font-size':'32px', 'line-height':'40px'})
         }
         else {
           $('#fb-text .postFull').css({'font-size':'16px', 'line-height':'26px'})
         }


       }	$('#fb-feed-container').show();

     });

   });





 });
 };


 writeFeed(function() {

 $('.facebookPost').click(function() {
   $('.fb-current').removeClass('fb-current');
   var currentText = $(this).addClass('fb-current').find('.facebookText').html();
   $('#fb-text').empty().html(currentText);
   if (currentText.length < 300) {
     $('#fb-text .postFull').css({'font-size':'32px', 'line-height':'48px'})
   }
   else {
     $('#fb-text .postFull').css({'font-size':'16px', 'line-height':'26px'})
   }


   $('#fb-text').stop().animate({opacity:.7},"100", function() {
     $(this).animate({opacity:1},"400");
   });




 });
 // init Masonry
 var $grid = $('.grid').masonry({
 // options...
   columnWidth: '.grid-sizer',
   itemSelector: '.grid-item',
   percentPosition:true,
   transitionDuration: '2.0s'
 });
 //layout Masonry after each image loads
 $grid.imagesLoaded().progress( function() {
   $grid.masonry('layout');
 });





 });
 };




 (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

$( document ).ready(function() {




});
