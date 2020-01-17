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


function writeFeed(callback) {

getFeed(function (feedResponse) {

   var div = $('<div/>')
       .addClass('grid-sizer')
       .appendTo('#facebook');



   var postID;
   var postEmbedURL;



   var k = 1
   var l = 1

   $.each(feedResponse.data, function(key, value) {
     l++
     postID = $(this.id).selector.split("_")[1];
     postEmbedURL ="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FBCLawLib%2Fposts%2F"+postID+"&width=350"
     if (k==1) {
       firstPostID = postID
       k++
     }


     var div = $('<div/>')
       .attr('id', postID)
       .addClass('facebookPost')
       .addClass('grid-item')
       .appendTo('#facebook');

      var fbInner = $('<div>')
        .addClass('fbInner')
        .appendTo(div);


      var more = $('<div>')
         .addClass('fbMore')
         .addClass('fbToggle')
         .text('More')
         .appendTo(fbInner);

      var less = $('<div>')
          .addClass('fbLess')
          .addClass('fbToggle')
          .text('Less')
          .appendTo(fbInner);

      var frame = $('<iframe>')
        .attr('src', postEmbedURL)
        .attr({"height":"800px","scrolling":"no", "frameborder":"0", "allowTransparency":"true", "allow":"encrypted-media"})
        .appendTo(fbInner);



   });

   $('#fb-feed-container').show();









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

    $('.fbMore').click(function() {
          $(this)
            .hide()
            .parent()
            .toggleClass('open')
            .animate({height: "500px"},300, function(){$grid.masonry('layout')})
            .parent()
            .toggleClass('open')
            .find('.fbLess')
            .show();
      });

    $('.fbLess').click(function() {
            $(this)
            .hide()
            .parent()
            .toggleClass('open')
            .animate({height: "200px"},300, function(){$grid.masonry('layout')})
            .parent()
            .toggleClass('open')
            .find('.fbMore')
            .show();
        });


 });
 };


 writeFeed(function() {

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
