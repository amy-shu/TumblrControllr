(function() {
  console.log('running')
  var post_number = 1;

  if (document.URL.replace("https://www.tumblr.com/", "").slice(0, 6) === "reblog") {
    setTimeout(function(){
      $("#post_controls > div > button").click();
    }, 2000);
  } else if (document.URL == "https://www.tumblr.com/dashboard") {
    chrome.runtime.sendMessage({type: "reset"})
  }

  chrome.runtime.sendMessage({type: "getNum"}, function(response) {
    // console.log(response.num);
    loadagain(response.num);
  }); 

  function loadagain(number) {
    $("#new_post_buttons").remove();
    $("#right_column").remove();
    $("#search_field").remove();
    $(".post_container").hide();
    $(".post_container:nth-of-type(" + number.toString() + ")").show();
    var child = $(".post_container:nth-of-type(" + number.toString() + ") .post_container");
    console.log(child)
    if ( child !== null) {
      child.show();
    }
    window.scroll(0, 0);
  }

  function next() {
    chrome.runtime.sendMessage({type: "addPost"}, function(response) {
      // console.log(response.num);
      // console.log(response.load);
      if (response.load == "forward") {
        var nextlink = $("#next_page_link")[0].href; 
        window.location.replace(nextlink);     
      } else {
        loadagain(response.num);
      }
    });   
  }  

  function previous() {
    chrome.runtime.sendMessage({type: "minusPost"}, function(response) {
      // console.log(response.num);
      // console.log(response.load);
      if (response.load == "backward") {
        var prevlink = $("#previous_page_link")[0].href; 
        window.location.replace(prevlink);     
      } else {
        loadagain(response.num);
      }
    }); 
  } 

//go to next post once h is pressed, 104
  $(document).bind('keypress', function(e) {
    if(e.keyCode == 104) {        
      next();
    }
  });

//go to previous post once g is pressed, 103
  $(document).bind('keypress', function(e) {
    if(e.keyCode == 103) {
      previous();
    }
  });

//like the post once a is pressed, 97
  $(document).bind('keypress', function(e) {
    if(e.keyCode == 97) {
      chrome.runtime.sendMessage({type: "getNum"}, function(response) {
        // console.log(response.num);
        $(".post_container:nth-of-type(" + response.num + ") .post_controls_inner > div ~ div").click();
      });   
    }
  });  

//press reblog button once r is pressed, 114
  $(document).bind('keypress', function(e) {
    if(e.keyCode == 114) {
      chrome.runtime.sendMessage({type: "getNum"}, function(response) {
        // console.log(response.num);
        var rebloglink = $(".post_container:nth-of-type(" + response.num + ") .post_controls_inner > a")[0].href;
        window.location.replace(rebloglink);
      });   
    }
  });  

//goes to the beginning once q is pressed, 113
  $(document).bind('keypress', function(e) {
    if(e.keyCode == 113) {
      window.location.replace("https://www.tumblr.com/dashboard");
    }
  });

//scrolls up when z is pressed, 122
  $(document).bind('keypress', function(e) {
    if(e.keyCode == 122) {
      window.scrollBy(0, 100);
    }
  });

//scrolls down when x is pressed, 120
  $(document).bind('keypress', function(e) {
    if(e.keyCode == 120) {
      window.scrollBy(0, -100);
    }
  });  
}).call(this);



