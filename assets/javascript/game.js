$(document).ready(function() {

    var characters = {
        "char1": {
                    id: "char1",
                    name: "Captain America",
                    health: 120,
                    attack: 8,
                    attackBack: 10,
                    imgUrl:"assets/images/capt.jpg"
        },
        "char2": {
                    id: "char2",
                    name:"Hulk",
                    health: 100,
                    attack: 12,
                    attackBack: 15,
                    imgUrl:"assets/images/hulk.jpg"
        },
        "char3": {
                    id: "char3",
                    name:"Iron Man",
                    health: 150,
                    attack: 10,
                    attackBack: 20,
                    imgUrl:"assets/images/ironman.jpg"
        },
        "char4": {
                    id: "char4",
                    name: "Thor",
                    health: 180,
                    attack: 14,
                    attackBack: 25,
                    imgUrl:"assets/images/thor.jpg"
        }
    };

    var chosenAttacker = {};
    var chosenDefender = {};
    var chosen;

    //function to play punch audio
    function punchAudio () {

      var punchAudio = document.getElementById("punchAudio"); 
      punchAudio.play();
    }

    //function to play winning audio
    function youWinAudio () {

      var winAudio = document.getElementById("winAudio"); 
      winAudio.play();
    }

    //function to play loser audio
    function youLoseAudio () {
      
      var loseAudio = document.getElementById("loseAudio"); 
      loseAudio.play();
    }

    //function to play loser audio
    function cheerAudio () {
  
      var cheerAudio = document.getElementById("cheerAudio"); 
      cheerAudio.play();
    }

    //function to check if object is empty
    function isEmpty(obj) {
      for(var key in obj) {

          if(obj.hasOwnProperty(key))
              return false;
      }

      return true;
    }

    //function to restart the game
    function restart() {

      $(document).on("click", "#restart", function() {

        location.reload(true);

      });
    }

    //function to add defenders to fight with
    function addDefender(chosen) {

      //save chosen defender
      chosenDefender = characters[chosen];

      //add chosen defender to fight area
      var divDefender = $("#defender");
      var divCharacter = $("<div class='char-name'>").text(chosenDefender.name);
      var divHealth = $("<div class='char-health'>").text(chosenDefender.health);
      var image = $("<img src='" + chosenDefender.imgUrl + "'>");
      $("#chosen-defender").text("Defender");

      divDefender.append(divCharacter);
      divDefender.append(image);
      divDefender.append(divHealth);

      //hide remaining characters
      $("h4").text("Time to fight!!");
      fight();
    }

    //click on character to start
    $(document).on("click", ".character", function() {

      var newAttack = 0;
      var counter = 0;
      var attackBack = 0;

      var divDefender = $("#defender");
      divDefender.empty();

      var divResult = $("#result");
      divResult.empty();

      //check if attacker has been chosen to set initial values and move to fight area
      if (isEmpty(chosenAttacker)) {

        //save chosen attacker
        chosen = $(this).attr('id');
        chosenAttacker = characters[chosen];

        //add chosen attacker to fight area
        var divAttacker = $("#attacker");
        var divCharacter = $("<div class='char-name'>").text(chosenAttacker.name);
        var divHealth = $("<div class='char-health'>").text(chosenAttacker.health);
        var image = $("<img src='" + chosenAttacker.imgUrl + "'>");
        $("#chosen-attacker").text("Attacker");

        divAttacker.append(divCharacter);
        divAttacker.append(image);
        divAttacker.append(divHealth);

        //hide chosen attacker
        $(this).remove();
        
      }

      //checks if defender has been chosen to set initials values and move to fight area
      else if (isEmpty(chosenDefender)) {

        $("h4").text("Choose a defender:");
        //save chosen defender
        chosen = $(this).attr('id');
        chosenDefender = characters[chosen];

        $(this).remove();
  
        //add chosen defender to fight area
        var divCharacter = $("<div class='char-name'>").text(chosenDefender.name);
        var divHealth = $("<div class='char-health'>").text(chosenDefender.health);
        var image = $("<img src='" + chosenDefender.imgUrl + "'>");
        $("#chosen-defender").text("Defender");
  
        divDefender.append(divCharacter);
        divDefender.append(image);
        divDefender.append(divHealth);
  
        //hide remaining characters
        $("h4").text("Time to fight!!");

        //add attack button
        var attackButton = $("<button id='attack'>Attack</button>");
        var divFight = $("#fight");

        divFight.append(attackButton);

        attack = chosenAttacker.attack;
        attackBack = chosenDefender.attackBack;

        $(document).on("click", "#attack", function (){

          //health values
          var divHealthAttacker = $('#attacker').find('.char-health');
          var attackersHealth = parseInt(divHealthAttacker.text());
          var divHealthDefender = $('#defender').find('.char-health');
          var defendersHealth = parseInt(divHealthDefender.text());

          if (attackersHealth > 0) {

            punchAudio();
            newAttack = newAttack + 1;

            if (newAttack > 1) {
              counter = counter * 2;
            }

            else {
              counter = chosenAttacker.attack;
            }
              
            //reset health values
            attackersHealth = attackersHealth - attackBack;
            defendersHealth = defendersHealth - counter;

            //add new value of health to corresponding div
            divHealthAttacker.text(attackersHealth);
            divHealthDefender.text(defendersHealth);

            //result message
            divResult.text ("You attacked " + chosenDefender.name + " for " + counter + " damage. " + 
                            chosenDefender.name + " attacked you back for " + attackBack + " damage.");

          }

          if (defendersHealth < 0) {

            chosenAttacker.attack = chosenAttacker.attack + 4;
            divHealthDefender.text(0);

            var defendersLeft = $("#characters").find($(".character")).length;

            if (defendersLeft == 0) {

              youWinAudio()
              //result message
              divResult.text ("You have defeted " + $('#defender').find('.char-name').text() + ". You won the game "
                            +"press restart to play again ");

              divResult.append($($("<button id='restart'>Restart</button>")));

              restart();
            }

            else {

              cheerAudio();
              //result message
              divResult.text ("You have defeted " + $('#defender').find('.char-name').text() + ". You can choose to fight another "
              +"enemy. Your attack power has been increased");
            }

            chosenAttacker.health = attackersHealth;

            $("#attack").remove();
            chosenDefender = {};
            newAttack = 0;
            counter = 0;
            attackBack = 0;
          }

          if (attackersHealth <= 0) {

            divHealthDefender.text(0);

            youLoseAudio();
            //result message
            divResult.text ("You have been defeted. GAME OVER!!" );

            $("#attack").remove();

            //add reset button
            divResult.append($($("<button id='restart'>Restart</button>")));

            restart();
          }
          
        });
      }
    });
  });
